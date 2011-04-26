%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 26 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(fight_server).

-behaviour(gen_server).

%% API
-export([
	 start_link/0,
	 end_turn/3,
	 end_cycle/3,
	 add_event/2,
	 trigger_turn/1,
	 trigger_cycle/1
	]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(state, {units = [], map, map_id, events = [], running_turn = 0, running_cycle = 0, turn = 0}).

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
    gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

end_turn(Pid, NewUnits, TurnId) ->
    gen_server:cast(Pid, {end_turn, NewUnits, TurnId}).

end_cycle(Pid, NewUnits, CycleId) ->
    gen_server:cast(Pid, {end_cycle, NewUnits, CycleId}).


add_event(Pid, Event) ->
    gen_server:cast(Pid, {add_event, Event}).

trigger_turn(Pid) ->
    gen_server:cast(Pid, trigger_turn).
    
trigger_cycle(Pid) ->
    gen_server:cast(Pid, trigger_cycle).

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
init([Units, MapServer]) ->
    {ok, #state{units = Units, map = MapServer}}.

    

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
handle_cast({end_turn, NewUnits, TurnId}, #state{running_cycle = RunningCycle,
						 running_turn = RunningTurn, 
						 turn = Turn} = State) ->
    if 
	RunningTurn =/= TurnId -> {stop, {unexpcted_turn_end, RunningTurn, TurnId}};
	TurnId -1 >= Turn -> {stop, {turn_runaway, Turn, TurnId}};
	TurnId -1 =< Turn -> {stop, {turn_too_slow, Turn, TurnId}};
	RunningCycle =/= TurnId -> {stop, {turn_head_of_cycle, TurnId, RunningCycle}};
	true -> {noreply, State#state{
			    units = NewUnits,
			    turn = TurnId
			   }}
    end;
handle_cast({end_cycle, NewUnits, CycleId}, #state{running_cycle = RunningCycle,
						 running_turn = RunningTurn, 
						 turn = Turn} = State) ->
    if 
	RunningTurn == CycleId -> {stop, {turn_started_to_early, RunningTurn, CycleId}};
	CycleId -1 >= Turn -> {stop, {cycle_runaway, Turn, CycleId}};
	CycleId -1 =< Turn -> {stop, {cycle_too_slow, Turn, CycleId}};
	RunningCycle =/= CycleId -> {stop, {turn_head_of_cycle, CycleId, RunningCycle}};
	true -> {noreply, State#state{
			    units = NewUnits
			   }}
    end;

handle_cast(trigger_turn, #state{running_turn = RunningTurn,
				 turn = Turn} = State) ->
    if
	Turn =/= RunningTurn -> {stop, {turn_not_in_sync, Turn, RunningTurn}};
	true -> 
	    fight_worker:place_turn(State, Turn + 1, self()),
	    {noreply, State#state{running_turn = Turn + 1}}
    end;
handle_cast(trigger_cycle, #state{running_cycle = RunningCycle,
				 turn = Turn} = State) ->
    if
	Turn =/= RunningCycle -> {stop, {cycle_not_in_sync, Turn, RunningCycle}};
	true -> 
	    fight_worker:place_cycle(State, Turn + 1, self()),
	    {noreply, State#state{running_cycle = Turn + 1}}
    end;
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
