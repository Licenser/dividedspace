%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 21 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(epic_server).

-behaviour(gen_server).

%% API
-export([start_link/0, list_fights/0, add_fight/2, new_fight/1, get_fight/1]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3, start_fight/1]).

-define(SERVER, ?MODULE). 

-record(state, {fights = dict:new(), ref}).

%%%===================================================================
%%% API
%%%===================================================================

list_fights() ->
    gen_server:call(?MODULE, list_fights).


get_fight(Id) ->
    gen_server:call(?MODULE, {get_fight, Id}).

add_fight(Id, Units) ->
    gen_server:cast(?MODULE, {add_fight, Id, Units}).

new_fight(Fight) ->
    UUID = uuid:v4(),
    {ok, FPid} = fight_sup:start_child(Fight),
    add_fight(UUID, FPid),
    {ok, UUID}.

start_fight(N) ->
    gen_server:cast(?SERVER, {start_fight, N}).

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

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
    storage:init(),
    {ok, #state{fights = dict:new()}, 1000}.

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
    case dict:find(Id, Fights) of
	{ok, Fight} -> {reply, {ok, Fight}, State};
	error -> {reply, {error, not_found}, State}
    end;

handle_call(list_fights, _From, #state{fights = Fights} = State) ->
    {reply, {ok, dict:fetch_keys(Fights)}, State};
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
handle_cast({add_fight, UUID, Units}, #state{fights = Fights} = State) ->
    Us = lists:map(fun ({X, Y, Team, Spec}) ->
                           {ok, Unit} = unit:from_template(X, Y, Team, Spec),
                           Unit
                   end, Units),
    Fight = fight:new(nil, Us),
    {ok, FPid} = fight_sup:start_child(Fight),
    gen_server:cast({global, center_server}, {register_fight, UUID, FPid}),
    {noreply, State#state{fights = dict:store(UUID, FPid, Fights)}};
handle_cast(tick, #state{fights = Fights} = State) ->
    lists:map(fun ({_UUID, Pid}) ->
                      fight_server:trigger(Pid)
              end, dict:to_list(Fights)),
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
handle_info(timeout, State) ->
    {ok, Pid} = center:register(self()),
    io:format("Pid: ~p.~n", [Pid]),
    Ref = erlang:monitor(process, Pid),
    io:format("Ref: ~p.~n", [Ref]),
    {noreply, State#state{ref = Ref}};
handle_info({'DOWN', _Ref, process, _Pid, _Reason}, #state{ref = _Ref} = State) ->
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
terminate(_Reason,  #state{ref = Ref} = _State) ->
    erlang:demonitor(Ref),
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
