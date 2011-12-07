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
         add_fight/1,
         get_fight/1,
	 get_epic_servers/0,
         get_fights/0]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3]).

-define(SERVER, {global, ?MODULE}).

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

add_fight(Units) ->
    gen_server:cast(?SERVER, {add_fight, Units}).

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
    UUID = list_to_binary(uuid:to_string(uuid:v4())),
    {reply, {ok, self()}, State#state{epic_servers = dict:store(UUID, Pid, Servers)}};

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
    {noreply, State#state{fights = dict:store(uuid:to_string(UUID), Pid, Fights)}};
handle_cast({add_fight, Units}, #state{epic_servers = Servers} = State) ->
    [{_, Pid} | _] = dict:to_list(Servers),
    UUID = uuid:v4(),
    io:format("Sending: ~p.~n", [{add_fight, UUID, Units}]),
    gen_server:cast(Pid, {add_fight, UUID, Units}),
    {noreply, State};
handle_cast(tick, #state{epic_servers = Servers} = State) ->
    lists:map(fun ({_, Pid}) ->
                      gen_server:cast(Pid, tick)
              end, dict:to_list(Servers)),                      
    {noreply, State};
%    turn_server:register_fight(FPid),
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
handle_info({'DOWN', Ref, process, Pid, Reason}, #state{epic_servers = Servers} = State) ->
    io:format("Client down: ~p.~n", [Pid]),
    State = State#state{epic_servers = dict:filter(fun ({_, APid}) ->
							   APid =:= Pid
						   end, Servers)},
    {noreply, State};
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
