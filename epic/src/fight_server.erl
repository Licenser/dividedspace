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
	 start_link/1,
	 trigger/1,
	 trigger_tick/1,
	 end_tick/1,
	 add_event/2,
	 subscribe/2,
	 unsubscribe/2,
	 status/1
	]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(state, {initial_fight, fight, map, map_id, tick = 0, subscribers = [], all_tick_events = [], current_tick_events = [], tick_start = 0, storage, tick_in_progress = false, vm}).

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
    Placement = lists:map(fun (UnitId) ->
				  Unit = fight:get_unit(Fight, UnitId),
				  Name = unit:name(Unit),
				  Hull = unit:hull(Unit),
				  Integrety = module:integrety(Hull),
				  {spawn, UnitId, unit:fleet(Unit), Name, Integrety, unit:x(Unit), unit:y(Unit)}
			  end, fight:unit_ids(Fight)),
    Units = fight:units(Fight),
    {ok, VM} = erlv8_vm:start(),
    {ok, MapServer} = map_sup:start_child(Units),
    {ok, FightStorage} = storage_sup:start_child(Units, VM, self(), MapServer),
    {ok, #state{
       vm = VM,
       initial_fight = Fight,
       fight = Fight,
       map = MapServer,
       storage = FightStorage,
       all_tick_events = [Placement]
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
handle_call(status, _Form, #state{tick_in_progress = false} = State) ->
    {reply, {ok, idle}, State};
handle_call(status, _Form, #state{tick_in_progress = true} = State) ->
    {reply, {ok, in_turn}, State};
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
	      all_tick_events  = Ticks} = State) ->
    gen_server:cast(Subscriber, {send, lists:reverse(Ticks)}),
    {noreply, State#state{subscribers = [Subscriber | Subscribers]}};
handle_cast(end_tick, #state{tick_in_progress = false} = State) ->
    {noreply, State};
handle_cast(end_tick, #state{all_tick_events = Ticks,
                             current_tick_events = TickEvent,
                             tick_start = TickStart
                            } = State) ->
    io:format("Tick time: ~fs.~n", [timer:now_diff(now(), TickStart) / 1000000]),
    epic_event:end_turn(self()),
    Event = {end_turn},
    inform_subscribers(State, TickEvent),
    {noreply, State#state{
                current_tick_events = [],
                tick_in_progress = false,
                all_tick_events = [TickEvent | Ticks]
               }};
handle_cast(trigger_tick, #state{tick_in_progress = true} = State) ->
    {noreply, State};
handle_cast(trigger_tick, #state{fight = Fight,
				 vm = VM,
                                 storage = Storage
                                } = State) ->

    epic_event:start_turn(self()),
    Event = {start_turn},
    fight_worker:place_tick(VM, Storage, self()),
    {noreply, State#state{tick_start = now(),
                          tick_in_progress = true}};
handle_cast({add_event, [Event]}, #state{current_tick_events = Tick} = State) ->
    {noreply, State#state{current_tick_events = [Event | Tick]}};
handle_cast({add_event, NewEvents}, #state{current_tick_events = Tick} = State) when is_list(NewEvents) ->
    {noreply, State#state{current_tick_events = NewEvents ++ Tick}};
handle_cast({add_event, Event}, #state{current_tick_events = Tick} = State) ->
    {noreply, State#state{current_tick_events = [Event | Tick]}};
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
                      gen_server:cast(Subscriber, {send, Data})
	      end, Subscribers).
