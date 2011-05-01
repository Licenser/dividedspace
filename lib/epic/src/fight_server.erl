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
	 start_link/2,
	 end_turn/3,
	 end_cycle/3,
	 add_event/2,
	 trigger_turn/1,
	 trigger_cycle/1,
	 trigger/1,
	 get_events/1,
	 subscribe/2,
	 unsubscribe/2,
	 status/1
	]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(state, {initial_fight, fight, map, map_id, events = [], running_turn = 0, running_cycle = 0, turn = 0, subscribers = [], ticks = [], tick = []}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @spec start_link(Fight, Map) -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link(Fight, Map) ->
    gen_server:start_link(?MODULE, [Fight, Map], []).

trigger(Pid) ->
    trigger_cycle(Pid).
    
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

get_events(Pid) ->
    gen_server:call(Pid, events).

status(Pid) ->
    gen_server:call(Pid, status).

subscribe(Pid, Subscriber) ->
    gen_server:cast(Pid, {subscribe, Subscriber}).
    
unsubscribe(Pid, Subscriber) ->
    gen_server:cast(Pid, {unsubscribe, Subscriber}).


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
init([Fight, MapServer]) ->
    Placement = lists:map(fun (UnitId) ->
				  Unit = fight:get_unit(Fight, UnitId),
				  Name = unit:name(Unit),
				  Hull = unit:hull(Unit),
				  Integrety = module:integrety(Hull),
				  {spawn, UnitId, unit:fleet(Unit), Name, Integrety, unit:x(Unit), unit:y(Unit)}
			 end, fight:unit_ids(Fight)),
    {ok, #state{
       initial_fight = Fight,
       fight = Fight, 
       map = MapServer,
       events = [{multi_event, Placement}],
       ticks = [Placement]
      }}.

    

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
handle_call(events, _Form, #state{events = Events} = State) ->
    {reply, Events, State};
handle_call(status, _Form, #state{running_cycle = RunningCycle,
				  running_turn = RunningTurn, 
				  turn = Turn} = State) ->
    if
	RunningCycle == RunningTurn,
	RunningTurn == Turn -> {reply, {ok, idle}, State};
	RunningCycle == RunningTurn,
	RunningTurn >= Turn -> {reply, {ok, in_turn}, State};
	RunningCycle >= RunningTurn,
	RunningTurn== Turn -> {reply, {ok, in_cycle}, State};
	true -> {reply, {error, {bad_state, RunningCycle, RunningTurn, Turn}}, State}
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
handle_cast({subscribe, Subscriber}, #state{
	      subscribers = Subscribers,
	      ticks  = Ticks} = State) ->
%    lists:map(fun (Tick) ->
%		      ws:send(Subscriber, Tick)
%	      end, lists:reverse(Ticks)),
    ws:send(Subscriber, Ticks),
    {noreply, State#state{subscribers = [Subscriber | Subscribers]}};
handle_cast({end_turn, NewFight, TurnId}, #state{running_cycle = RunningCycle,
						 running_turn = RunningTurn, 
						 turn = Turn,
						 events = Events,
						 ticks = Ticks,
						 tick = Tick
						} = State) ->
    epic_event:end_turn(self(), TurnId),
    if 
	RunningTurn =/= TurnId -> {stop, {unexpcted_turn_end, RunningTurn, TurnId}};
	TurnId  > Turn + 1 -> {stop, {turn_runaway, Turn, TurnId}};
	TurnId =< Turn -> {stop, {turn_too_slow, Turn, TurnId}};
	RunningCycle =/= TurnId -> {stop, {turn_head_of_cycle, TurnId, RunningCycle}};
	true -> Event = {end_turn, TurnId},
		inform_subscribers(State, Tick),
		{noreply, State#state{
			    fight = NewFight,
			    turn = TurnId,
			    events = [Event | Events],
			    tick = [],
			    ticks = [Tick | Ticks]
			   }}
    end;

handle_cast({end_cycle, NewFight, CycleId}, #state{running_cycle = RunningCycle,
						   running_turn = RunningTurn, 
						   turn = Turn,
						   events = Events} = State) ->
    epic_event:end_cycle(self(), CycleId),
    if 
	RunningTurn == CycleId -> {stop, {turn_started_to_early, RunningTurn, CycleId}};
	CycleId   > Turn +1 -> {stop, {cycle_runaway, Turn, CycleId}};
	CycleId  =< Turn -> {stop, {cycle_too_slow, Turn, CycleId}};
	RunningCycle =/= CycleId -> {stop, {turn_head_of_cycle, CycleId, RunningCycle}};
	true -> Event = {end_cycle, CycleId},
		fight_server:trigger_turn(self()),
		{noreply, State#state{
			    fight = NewFight,
			    events = [Event | Events]
			   }}
    end;

handle_cast(trigger_turn, #state{running_turn = RunningTurn,
				 turn = Turn,
				 fight = Fight,
				 events = Events} = State) ->

    TurnId = Turn + 1,
    epic_event:start_turn(self(), TurnId),
    if
	Turn =/= RunningTurn -> {stop, {turn_not_in_sync, Turn, RunningTurn}};
	true -> 
	    Event = {start_turn, TurnId},
	    fight_worker:place_turn(Fight, nil, TurnId, self()),
	    {noreply, State#state{running_turn = TurnId,
				  events = [Event | Events]}}
    end;

handle_cast(trigger_cycle, #state{running_cycle = RunningCycle,
				  turn = Turn,
				  fight = Fight,
				  events = Events} = State) ->
    CycleId = Turn + 1,
    epic_event:start_cycle(self(), CycleId),
    if
	Turn =/= RunningCycle -> {stop, {cycle_not_in_sync, Turn, RunningCycle}};
	true -> Event = {start_cycle, CycleId},
		fight_worker:place_cycle(Fight, CycleId, self()),
		{noreply, State#state{running_cycle = CycleId,
				  events = [Event | Events]}}
    end;
handle_cast({add_event, [Event]}, #state{events = Events, tick = Tick} = State) ->
    {noreply, State#state{events = [Event | Events], tick = [Event | Tick]}};
handle_cast({add_event, NewEvents}, #state{events = Events, tick = Tick} = State) when is_list(NewEvents) ->
    {noreply, State#state{events = NewEvents ++ Events, tick = NewEvents ++ Tick}};
handle_cast({add_event, Event}, #state{events = Events, tick = Tick} = State) ->
    {noreply, State#state{events = [Event | Events], tick = [Event | Tick]}};
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
inform_subscribers(#state{subscribers = Subscribers}, Data) ->
    lists:map(fun (Subscriber) ->
		      ws:send(Subscriber, Data)
	      end, Subscribers).
