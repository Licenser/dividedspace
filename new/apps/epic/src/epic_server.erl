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
-export([start_link/0]).

-export([list_fights/1, add_fight/3, new_fight/2, get_fight/2,
         next_fight/1]).
-ignore_xref([start_link/0, list_fights/0, get_fight/1, add_fight/2]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3]).

-define(SERVER, ?MODULE).

-record(state, {fights = dict:new(), ref, fights_done = [],
                fight_running=undefined, fights_pending=[], tick_status=idle}).

%%%===================================================================
%%% API
%%%===================================================================

list_fights(Pid) ->
    gen_server:call(Pid, list_fights).

next_fight(Pid) ->
    gen_server:cast(Pid, next_fight).

get_fight(Pid, Id) ->
    gen_server:call(Pid, {get_fight, Id}).

add_fight(Pid, Id, FPid) ->
    gen_server:cast(Pid, {add_fight, Id, FPid}).

register_fight(Pid, Id, FPid) ->
    gen_server:cast(Pid, {register_fight, Id, FPid}).

new_fight(Pid, Fight) ->
    UUID = epic_uuid:v4(),
    {ok, FPid} = fight_sup:start_child(Fight, Pid),
    register_fight(Pid, UUID, FPid),
    {ok, UUID}.

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    gen_server:start_link(?MODULE, [], []).

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
    %%INFO({"handle call: ", get_fight, Id}),
    case dict:find(Id, Fights) of
        {ok, Fight} ->
            {reply, {ok, Fight}, State};
        error ->
            {reply, {error, not_found}, State}
    end;
handle_call(list_fights, _From, #state{fights = Fights} = State) ->
    %%INFO({"handle call: ", list_fights}),
    Result = {ok, lists:map(fun ({UUID, Pid}) ->
                                    {ok, Report} = fight_server:report(Pid),
                                    {UUID, Report}
                            end, dict:to_list(Fights))},
    {reply, Result, State};
handle_call(_Request, _From, State) ->
    %%WARNING({"Unknown handle call", Request}),
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
handle_cast({register_fight, UUID, FPid}, #state{fights = Fights} = State) ->
    gen_server:cast({global, center_server}, {register_fight, UUID, FPid}),
    {noreply, State#state{fights = dict:store(UUID, FPid, Fights)}};
handle_cast({add_fight, UUID, Units}, #state{fights = Fights} = State) ->
    %%INFO({"handle call(add_fight)", UUID}),
    %%DBG({Units}),
    Us = lists:map(fun ({X, Y, Team, Spec, Code}) ->
                           {ok, Unit} = unit:from_template(X, Y, Team, Spec, Code),
                           Unit
                   end, Units),
    Fight = fight:new(nil, Us),
    {ok, FPid} = fight_sup:start_child(Fight, self()),
    %%io:format("Fight Pid: ~p~n", [FPid]),
    gen_server:cast({global, center_server}, {register_fight, UUID, FPid}),
    {noreply, State#state{fights = dict:store(UUID, FPid, Fights)}};
handle_cast(tick, #state{tick_status=running} = State) ->
    %%WARNING({"New Tick can't be started since old one is still running"}),
    %%DBG({State}),
    {noreply, State};
handle_cast(tick, #state{fights = Fights, tick_status=idle} = State) ->
    %%NOTICE({"Starting new Tick."}),
    FightPids = lists:map(fun ({_, Pid}) ->
                                  Pid
                          end, dict:to_list(Fights)),
    next_fight(self()),
    {noreply, State#state{fights_done=[],
                          fights_pending=FightPids,
                          fight_running=undefined,
                          tick_status=running}};
handle_cast(next_fight, #state{fights_done = Done, fight_running = Current, fights_pending = [Next | Rest]} = State) ->
    %%NOTICE({"Starting next fight.", Next}),
    fight_server:trigger(Next),
    {noreply, State#state{fights_done=[Current | Done],
                          fights_pending = Rest,
                          fight_running=Next}};
handle_cast(next_fight, #state{fights_pending = []} = State) ->
    %%NOTICE({"Ending Tick."}),
    {noreply, State#state{fights_done=[],
                          fight_running=undefined,
                          tick_status=idle}};
handle_cast(_Msg, State) ->
    %%WARNING({"Unknown handle cast", Msg}),
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
    %%NOTICE({"Registering with Center Server"}),
    {ok, Pid} = epic_center:register(self()),
    %%DBG({Pid}),
    Ref = erlang:monitor(process, Pid),
    %%DBG({Ref}),
    {noreply, State#state{ref = Ref}};
handle_info({'DOWN', Ref, process, _Pid, _Reason}, #state{ref = Ref} = State) ->
    %%WARNING({"Center Node went down", Pid, Ref, Reason}),
    {noreply, State, 1000};
handle_info(_Info, State) ->
    %%WARNING({"Unknown handle info", Info}),
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
                                                %DBG({"Terminating"}),
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
