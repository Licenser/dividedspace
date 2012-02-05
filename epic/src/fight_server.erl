%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 26 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(fight_server).

-include_lib("alog_pt.hrl").

-behaviour(gen_server).

%% API
-export([
	 start_link/1,
	 trigger/1,
	 trigger_tick/1,
	 end_tick/1,
	 add_event/2,
	 subscribe/2,
	 unsubscribe/2,
	 status/1,
	 report/1
	]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 
-define(MAX_IDLE, 5).

-record(state, {initial_fight, fight, map, map_id, tick = 0, subscribers = [], all_tick_events = [], current_tick_events = [], tick_start = 0, tick_time = 0.0, storage, tick_in_progress = false, vm, idle_count = 0}).

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
start_link(Fight) ->
    gen_server:start_link(?MODULE, [Fight], []).

trigger(Pid) ->
    trigger_tick(Pid).
    
end_tick(Pid) ->
    gen_server:cast(Pid, end_tick).

add_event(Pid, Event) ->
    gen_server:cast(Pid, {add_event, Event}).

trigger_tick(Pid) ->
    gen_server:cast(Pid, trigger_tick).

status(Pid) ->
    gen_server:call(Pid, status).

subscribe(Pid, Subscriber) ->
    gen_server:cast(Pid, {subscribe, Subscriber}).
    
unsubscribe(Pid, Subscriber) ->
    gen_server:cast(Pid, {unsubscribe, Subscriber}).

report(Pid) ->
    gen_server:call(Pid, report).

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
init([Fight]) ->
    ?INFO({"init"}),
    ?DBG({Fight}),
    Placement = lists:foldl(fun (UnitId, L) ->
				    Unit = fight:get_unit(Fight, UnitId),
				    Name = unit:name(Unit),
				    Hull = unit:hull(Unit),
				    Integrety = module:integrety(Hull),
				    [[{type, spawn}, {data, [{id, UnitId}, {damage, 0}, {team, unit:fleet(Unit)}, {type, [{name, Name}, {hull, Integrety}]}]}] |
				     [[{type, move}, {unit, UnitId}, {position, [{x, unit:x(Unit)}, {y, unit:y(Unit)}]}] | L]]
			    end, [], fight:unit_ids(Fight)),
    Units = fight:units(Fight),
    {ok, VM} = erlv8_vm:start(),
    {ok, MapServer} = map_sup:start_child(Units),
    {ok, FightStorage} = storage_sup:start_child(Units, VM, self(), MapServer),
    ?DBG({VM, MapServer, FightStorage}),
    {ok, #state{
       vm = VM,
       initial_fight = Fight,
       fight = Fight,
       map = MapServer,
       storage = FightStorage,
       all_tick_events = Placement
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
handle_call(status, _Form, #state{tick_in_progress = false, idle_count = IdleCount} = State) when IdleCount > ?MAX_IDLE ->
    ?INFO({"ended"}),
    ?DBG({IdleCount, ?MAX_IDLE}),
    {reply, {ok, ended}, State};
handle_call(status, _Form, #state{tick_in_progress = false} = State) ->
    ?INFO({"idle"}),
    {reply, {ok, idle}, State};
handle_call(status, _Form, #state{tick_in_progress = true} = State) ->
    ?INFO({"in_turn"}),
    {reply, {ok, in_turn}, State};
handle_call(report, _From, #state{tick_in_progress = InProgress,
				  tick = Tick,
				  idle_count = IdleCount,
				  tick_time = TickTime} = State) ->
    ?INFO({"report"}),
    Status = if
		 IdleCount > ?MAX_IDLE -> ended;
		 InProgress == true -> in_turn;
		 true -> idle
	     end,
    ?DBG({Status, Tick, TickTime}),
    {reply, {ok, {Status, Tick, TickTime}}, State};
handle_call(Request, _From, State) ->
    ?WARNING({"Unknown handle call", Request}),
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
	      all_tick_events  = Ticks} = State) ->
    ?INFO({"subscribe", Subscriber}),
    Subscriber ! {send, Ticks},
    {noreply, State#state{subscribers = [Subscriber | Subscribers]}};
handle_cast(end_tick, #state{tick_in_progress = false} = State) ->
    ?INFO({"end tick, nothing to do"}),
    {noreply, State};
handle_cast(end_tick, #state{all_tick_events = Ticks,
                             current_tick_events = TickEvent,
                             tick_start = TickStart,
			     idle_count = IdleCount
                            } = State) ->

    OrderedEvents=lists:reverse(TickEvent),
    inform_subscribers(State, OrderedEvents),
    ?INFO({"tick events", TickEvent}),
    epic_server:next_fight(),
    NewIdleCount = case TickEvent of
		       [] -> IdleCount + 1;
		       _ -> 0
		   end,
    TickTime = timer:now_diff(now(), TickStart) / 1000000,
    ?INFO({"end tick (~ps)", NewIdleCount}, [TickTime]),    
    {noreply, State#state{
		tick_time = TickTime,
                current_tick_events = [],
                tick_in_progress = false,
		idle_count = NewIdleCount,
                all_tick_events = Ticks ++ OrderedEvents
               }};
handle_cast(trigger_tick, #state{tick_in_progress = true} = State) ->
    ?WARNING({"Tick triggered but one is still in progress"}),
    {noreply, State};
handle_cast(trigger_tick, #state{idle_count = IdleCount} = State) when IdleCount > ?MAX_IDLE ->
    ?INFO({"Tick triggered but we are idle"}),
    epic_server:next_fight(),
    {noreply, State};
handle_cast(trigger_tick, #state{fight = _Fight,
				 tick = Tick,
				 vm = VM,
				 storage = Storage
				} = State) ->
    ?INFO({"tricker tick and start"}),
    ?DBG({Tick, VM, Storage}),
    fight_worker:place_tick(VM, Storage, self()),
    {noreply, State#state{tick_start = now(),
			  tick = Tick + 1,
                          tick_in_progress = true}};
handle_cast({add_event, {multi, NewEvents}}, #state{current_tick_events = Tick} = State) ->
    ?INFO({"adding multi event"}),
    ?DBG({NewEvents}),
    {noreply, State#state{current_tick_events = NewEvents ++ Tick}};
handle_cast({add_event, Event}, #state{current_tick_events = Tick} = State) ->
    ?INFO({"adding event"}),
    ?DBG({Event}),    
    {noreply, State#state{current_tick_events = [Event | Tick]}};
handle_cast({unsubscribe, Pid}, 
	    #state{
	      subscribers = Subs
	      } = State) -> 
    ?INFO({"unsubscribe", Pid}),
    Subs2 = lists:delete(Pid, Subs),
    {noreply, State#state{subscribers = Subs2}};
handle_cast(Msg, State) ->
    ?WARNING({"Unknown handle cast", Msg}),
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
handle_info(Info, State) ->
    ?WARNING({"Unknown handle info", Info}),
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
    ?INFO({"inform subscriber"}),
    ?DBG({Subscribers, Data}),
    lists:map(fun (Subscriber) ->
                      Subscriber ! {send, Data}
	      end, Subscribers).
