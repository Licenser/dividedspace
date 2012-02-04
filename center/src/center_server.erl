%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 15 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(center_server).

-behaviour(gen_server).

%% API
-export([start_link/0, 
         tick/0,
	 add_fight/2,
         get_fight/1,
	 get_epic_servers/0,
         get_fights/0]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3]).

-define(SERVER, {global, ?MODULE}).

-define(WIDTH, 20).

-record(state, {epic_servers = dict:new(), fights = dict:new()}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    gen_server:start_link(?SERVER, ?MODULE, [], []).

add_fight(UUID, Units) ->
    gen_server:cast(?SERVER, {add_fight, UUID, Units}).


get_fights() ->
    gen_server:call(?SERVER, get_fights).

get_epic_servers() ->
    gen_server:call(?SERVER, get_epic_servers).

get_fight(Id) ->
    gen_server:call(?SERVER, {get_fight, Id}).

tick() ->
    gen_server:cast(?SERVER, tick).

%%%===================================================================
%%% gen_server callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Initializes the server
%%
%% @spec init(Args) -> {ok, State} |
%%                     {ok, State, Timeout} |
%%                     ignore |
%%                     {stop, Reason}
%% @end
%%--------------------------------------------------------------------
init([]) ->
    {ok, #state{}}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @spec handle_call(Request, From, State) ->
%%                                   {reply, Reply, State} |
%%                                   {reply, Reply, State, Timeout} |
%%                                   {noreply, State} |
%%                                   {noreply, State, Timeout} |
%%                                   {stop, Reason, Reply, State} |
%%                                   {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
handle_call({get_fight, Id}, _From, #state{fights = Fights} = State) ->
    {reply, dict:find(Id, Fights), State};
handle_call(get_fights, _From, #state{fights = Fights} = State) ->
    {reply, dict:fetch_keys(Fights), State};
handle_call(get_epic_servers, _From, #state{epic_servers = Servers} = State) ->
    {reply, dict:fetch_keys(Servers), State};
handle_call({get_server_pid, UUID}, _From, #state{epic_servers = Servers} = State) ->
    {reply, dict:find(UUID, Servers), State};
handle_call({register_epic, Pid}, _From, #state{epic_servers = Servers} = State) when is_pid(Pid) ->
    io:format("REGISTER: ~p~n", [Pid]),
    erlang:monitor(process, Pid),
    UUID = center_uuid:v4(),
    {reply, {ok, self()}, State#state{epic_servers = dict:store(UUID, Pid, Servers)}};
handle_call({get_modules, Type}, _From, State) ->
    case file:consult(filename:join(["data", Type ++ ".erl"])) of
	{ok, Modules} -> {reply, Modules, State};
	_ -> {reply, undefined, State}
    end;
handle_call(_Request, _From, State) ->
    Reply = ok,
    {reply, Reply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @spec handle_cast(Msg, State) -> {noreply, State} |
%%                                  {noreply, State, Timeout} |
%%                                  {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
handle_cast({register_fight, UUID, Pid},  #state{fights = Fights} = State) ->
    {noreply, State#state{fights = dict:store(UUID, Pid, Fights)}};
handle_cast({add_fight, UUID, [TeamA, TeamB]}, #state{epic_servers = Servers} = State) ->
    io:format("Server: ~p~n", [dict:to_list(Servers)]),
    Units = expand_fleet(one, TeamA, []),
    Units2 = expand_fleet(one, TeamB, Units),
    {Pid, _} = lists:foldl(fun ({_, ServerPid}, {OldPid, OldTime}) ->
				   io:format("~p~n", [gen_server:call(ServerPid, list_fights)]),
				   {ok, Fights} = gen_server:call(ServerPid, list_fights),
				   Time = lists:foldl(fun ({_, {_, _, FightTime}}, Total) ->
							      Total + FightTime
						      end, 0.0, Fights),
				   if
				       Time < OldTime -> {ServerPid, Time};
				       true -> {OldPid, OldTime}
				   end				       
			   end, {error, 100000.0}, dict:to_list(Servers)),
    io:format("Sending: ~p.~n", [{add_fight, UUID, Units}]),
    gen_server:cast(Pid, {add_fight, UUID, Units2}),
    {noreply, State};
handle_cast(tick, #state{epic_servers = Servers} = State) ->
    lists:map(fun ({_, Pid}) ->
                      gen_server:cast(Pid, tick)
              end, dict:to_list(Servers)),                      
    {noreply, State};
handle_cast(_Msg, State) ->
    {noreply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling all non call/cast messages
%%
%% @spec handle_info(Info, State) -> {noreply, State} |
%%                                   {noreply, State, Timeout} |
%%                                   {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
handle_info({'DOWN', _Ref, process, Pid, _Reason}, #state{epic_servers = Servers} = State) ->
    io:format("Client down: ~p.~n", [Pid]),
    NewState = State#state{epic_servers = dict:filter(fun (_, APid) ->
							      APid =/= Pid
						      end, Servers)},
    {noreply, NewState};
handle_info(_Info, State) ->
    {noreply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_server when it is about to
%% terminate. It should be the opposite of Module:init/1 and do any
%% necessary cleaning up. When it returns, the gen_server terminates
%% with Reason. The return value is ignored.
%%
%% @spec terminate(Reason, State) -> void()
%% @end
%%--------------------------------------------------------------------
terminate(_Reason, _State) ->
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================

expand_fleet(Team, {N, Units}, List) ->
    S = trunc((N / 2) * -1),
    E = trunc(N / 2),
    {Mul, TeamStr} = case Team of
			 one -> {-1, <<"one">>};
			 two -> {1, <<"two">>}
		     end,
    {_, Units2} = lists:foldl(fun ({C, Unit}, {Poss, L}) ->
				 add_unit(C, {Poss, L}, Unit, Mul, TeamStr)
			 end, {lists:seq(S, E), List}, Units),
    Units2.

add_unit(0, {Poss, L}, _Unit, _Mul, _Team) ->
    {Poss, L};

add_unit(C, {[Pos | Poss], L}, Unit, Mul, Team) ->
    Major = abs(Pos) div ?WIDTH,
    Minor = Pos rem ?WIDTH,    
    add_unit(C - 1, {Poss, [{(3 + Major)*Mul, Minor, Team, Unit} | L]}, Unit, Mul, Team).

    
    
