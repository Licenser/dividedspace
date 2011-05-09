%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  4 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(worker_fsm).

-include("../../erlv8/include/erlv8.hrl").

-behaviour(gen_fsm).

%% API
-export([start_link/0, tick/4]).

%% gen_fsm callbacks
-export([init/1, waiting/2, handle_event/3,
	 handle_sync_event/4, handle_info/3, terminate/3, code_change/4]).

-define(SERVER, ?MODULE).

-define(UNIT_SCRIPT,
"
var weapons = unit.weapons;
for (var i = 0; i < weapons.length; i++) {
      log(weapons[i].range);
}
").

-record(state, {vm}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Creates a gen_fsm process which calls Module:init/1 to
%% initialize. To ensure a synchronized start-up procedure, this
%% function does not return until Module:init/1 has returned.
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    gen_fsm:start_link(?MODULE, [], []).

tick(Worker, Map, Storage, FightPid) ->
    gen_fsm:send_event(Worker, {tick, Map, Storage, FightPid}).


%%%===================================================================
%%% gen_fsm callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a gen_fsm is started using gen_fsm:start/[3,4] or
%% gen_fsm:start_link/[3,4], this function is called by the new
%% process to initialize.
%%
%% @spec init(Args) -> {ok, StateName, State} |
%%                     {ok, StateName, State, Timeout} |
%%                     ignore |
%%                     {stop, StopReason}
%% @end
%%--------------------------------------------------------------------
init([]) ->
    fight_worker:report_idle(self()),
    {ok, VM} = erlv8_vm:start(),
    {ok, waiting, #state{vm = VM}}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% There should be one instance of this function for each possible
%% state name. Whenever a gen_fsm receives an event sent using
%% gen_fsm:send_event/2, the instance of this function with the same
%% name as the current state name StateName is called to handle
%% the event. It is also called if a timeout occurs.
%%
%% @spec state_name(Event, State) ->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState}
%% @end
%%--------------------------------------------------------------------
waiting({tick, Map, Storage, FightPid}, #state{vm = VM} = State) ->
    handle_turn(Map, Storage, FightPid, VM),
    fight_server:end_tick(FightPid),
    fight_worker:report_idle(self()),
    {next_state, waiting, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a gen_fsm receives an event sent using
%% gen_fsm:send_all_state_event/2, this function is called to handle
%% the event.
%%
%% @spec handle_event(Event, StateName, State) ->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState}
%% @end
%%--------------------------------------------------------------------
handle_event(_Event, StateName, State) ->
    {next_state, StateName, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a gen_fsm receives an event sent using
%% gen_fsm:sync_send_all_state_event/[2,3], this function is called
%% to handle the event.
%%
%% @spec handle_sync_event(Event, From, StateName, State) ->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {reply, Reply, NextStateName, NextState} |
%%                   {reply, Reply, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState} |
%%                   {stop, Reason, Reply, NewState}
%% @end
%%--------------------------------------------------------------------
handle_sync_event(_Event, _From, StateName, State) ->
    Reply = ok,
    {reply, Reply, StateName, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_fsm when it receives any
%% message other than a synchronous or asynchronous event
%% (or a system message).
%%
%% @spec handle_info(Info,StateName,State)->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState}
%% @end
%%--------------------------------------------------------------------
handle_info(_Info, StateName, State) ->
    {next_state, StateName, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_fsm when it is about to
%% terminate. It should be the opposite of Module:init/1 and do any
%% necessary cleaning up. When it returns, the gen_fsm terminates with
%% Reason. The return value is ignored.
%%
%% @spec terminate(Reason, StateName, State) -> void()
%% @end
%%--------------------------------------------------------------------
terminate(_Reason, _StateName, _State) ->
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, StateName, State, Extra) ->
%%                   {ok, StateName, NewState}
%% @end
%%--------------------------------------------------------------------
code_change(_OldVsn, StateName, State, _Extra) ->
    {ok, StateName, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================


%%%===================================================================
%%% Internal functions
%%%===================================================================


handle_turn(Map, Storage, FightPid, VM) ->
    lists:map(fun (UnitId) ->
                      Unit = fight_storage:get_unit(Storage, UnitId),
                      case unit:destroyed(Unit) of
                          false -> handle_unit(FightPid, Map, Storage, UnitId, FightPid, VM);
                          true -> ok
                      end
              end, fight_storage:get_ids(Storage)).

handle_unit(FightPid, Map, Storage, UnitId, FightPid, VM) ->
    Context = erlv8_context:new(VM),
    ContextGlobal = erlv8_context:global(Context),
    ContextGlobal:set_value("unit", create_unit(FightPid, Map, Storage, FightPid, VM, UnitId)),
    ContextGlobal:set_value("log", fun (#erlv8_fun_invocation{}, V) ->
                                           io:format("JS-LOG(~p)> ~p.~n", [FightPid, V])
                                   end),
    erlv8_vm:run(VM, Context, ?UNIT_SCRIPT),
    ok.


unit_getter(Storage, UnitId, Field) ->
    fun (#erlv8_fun_invocation{}, _) ->
            U = fight_storage:get_unit(Storage, UnitId),
            unit:get(U, Field)
    end.

weapon_getter(Weapon, Attr) ->
    fun (#erlv8_fun_invocation{}, _) ->
            module:get(Weapon, Attr)
    end.
    

add_accessors(Object, _, []) ->
    Object;
add_accessors(Object, AccessorFun, [V | R]) ->
    Object:set_accessor(erlang:atom_to_list(V), AccessorFun(V)),
    add_accessors(Object, AccessorFun, R).

create_foe(Storage, VM, UnitId) ->
    Unit = erlv8_vm:taint(VM, erlv8_object:new([])),
    add_accessors(Unit, fun(V) -> unit_getter(Storage, UnitId, V) end, [x, y, id, mass, fleet]).
    
create_unit(FightPid, Map, Storage, FightPid, VM, UnitId) ->
    Unit = create_foe(Storage, VM, UnitId),
    Unit = erlv8_vm:taint(VM, erlv8_object:new([])),
    add_accessors(Unit, fun(V) -> unit_getter(Storage, UnitId, V) end, [range, energy]),
    Unit:set_accessor("weapons", fun (#erlv8_fun_invocation{}, _) ->
                                         U = fight_storage:get_unit(Storage, UnitId),
                                         W = unit:modules_of_kind(U, weapon),
                                         io:format("1~n", []),
                                         Ws = [ create_weapon(FightPid, Storage, VM, UnitId, Weapon) || Weapon <- W ],
                                         io:format("Weapons: ~p.~n", [Ws]),
                                         ?V8Arr(Ws)
                                 end),
    Unit:set_value("move", move_fun(FightPid, Storage, Map, UnitId)),
    Unit:set_value("intercept", intercept_fun(FightPid, Storage, Map, UnitId)),
    Unit.

create_weapon(FightPid, Storage, VM, UnitId, Weapon) ->
    WeaponO = erlv8_vm:taint(VM, erlv8_object:new([
                                                   {"fire", fire_fun(FightPid, Storage, UnitId, Weapon)}
                                                  ])),
    add_accessors(WeaponO, fun(V) -> weapon_getter(Weapon, V) end, [integrety, accuracy, variation, range, rotatability, damage]).

intercept(FightPid, Storage, Map, UnitId, Destination, Distance) ->
    Unit = fight_storage:get_unit(Storage, UnitId),
    Dist = unit:distance(Unit, Destination),
    if
	Distance =/= Dist ->EngineRange = unit:available_range(Unit),
                            Start = unit:coords(Unit),
                            Range = min(Dist - Distance, EngineRange),
                            {X, Y, R} = map_server:best_distance(Map, Start, Destination, Range),
                            map_server:move_unit(Map, UnitId, X, Y),
                            fight_storage:set_unit(Storage, unit:coords(unit:use_engine(Unit, R), {X, Y})),
                            fight_server:add_event(FightPid, {move, UnitId, X, Y}),
                            {ok, {X, Y}};
	Distance == Dist -> {ok, Destination}
    end.


move_fun(FightPid, Storage, Map, UnitId) ->
    fun (#erlv8_fun_invocation{}, [X, Y]) ->
            intercept(FightPid, Storage, Map, UnitId, {X, Y}, 0)
                                                % TODO: Add Event
    end.

intercept_fun(FightPid, Storage, Map, UnitId) ->
    fun (#erlv8_fun_invocation{}, [Target, Range]) ->
            TargetId = Target:get_value("id"),
            TargetUniut = fight_storage:get_unit(Storage, TargetId),
            intercept(FightPid, Storage, Map, UnitId, unit:coords(TargetUniut), Range)
    end.

fire_fun(FightPid, Storage, UnitId, Weapon) ->
    fun (#erlv8_fun_invocation{}, [Target]) ->
            U = fight_storage:get_unit(Storage, UnitId),
            TargetId = Target:get_value("id"),
            TargetUnit = fight_storage:get_unit(Storage, TargetId),
            handle_weapon(FightPid, Storage, Weapon, U, TargetUnit)
    end.

handle_weapon_hit(FightPid, Storage, {ok, true, _Data}, Attacker, Target, Energy, Damage) ->
    fight_storage:set_unit(Storage, unit:consume_energy(Attacker, Energy)),
    {NewTarget, TargetMessages} = unit:hit(Target, Damage),
    fight_storage:set_unit(Storage, NewTarget),
    AttackerId = unit:id(Attacker),
    TargetId = unit:id(Target),
    OldHull = module:integrety(unit:hull(Target)),
    NewHull = module:integrety(unit:hull(NewTarget)),
    M = [{hit, AttackerId, TargetId, OldHull - NewHull, TargetMessages}, 
         {target, AttackerId, TargetId}],
    if 
        NewHull =< 0 -> fight_server:add_event(FightPid, [{destroyed, TargetId} | M]);
        true -> fight_server:add_event(FightPid, M)
    end,
    ok;

handle_weapon_hit(_FightPid, Storage, {ok, false, _Data}, Attacker, _Target, Energy, _Damage) ->
    fight_storage:set_unit(Storage, unit:consume_energy(Attacker, Energy)).

handle_weapon(FightPid, Storage, Weapon, Attacker, Target) ->
    handle_weapon_hit(FightPid, Storage, module:fire_weapon(Weapon, Attacker, Target), Attacker, Target, module:energy_usage(Weapon), module:damage(Weapon)).
