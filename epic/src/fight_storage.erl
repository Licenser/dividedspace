%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  8 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(fight_storage).
-include_lib("alog_pt.hrl").
-behaviour(gen_server).

-include("../../erlv8/include/erlv8.hrl").

%% API
-export([start_link/4]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3, get_unit/2, set_unit/2, set_unit/3,
         get_unit_with_context/2,
         get_ids/1]).

-define(SERVER, ?MODULE). 

-record(state, {units, ids}).

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
start_link(Units, VM, Fight, Map) ->
    gen_server:start_link(?MODULE, [Units, VM, Fight, Map], []).

get_unit(Pid, Id) ->
    gen_server:call(Pid, {get, Id}).

get_unit_with_context(Pid, Id) ->
    gen_server:call(Pid, {get_with_context, Id}).

set_unit(Pid, Unit) ->
    gen_server:cast(Pid, {set, Unit}).

set_unit(Pid, Id, Unit) ->
    gen_server:cast(Pid, {set, Id, Unit}).

get_ids(Pid) ->
    gen_server:call(Pid, get_ids).



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
init([Units, VM, Fight, Map]) ->
    ?INFO({"Initializing Fight Storage"}),
    ?DBG({Units, VM, Fight, Map}),
    {ok, #state{units = dict:map(fun (Id, Unit) ->
					 ?DBG({"Creating Unit", Id, Unit}),
                                         Context = erlv8_context:new(VM),
                                         ContextGlobal = erlv8_context:global(Context),
                                         ContextGlobal:set_value("unit", create_unit(Fight, Map, self(), VM, Id)),
                                         ContextGlobal:set_value("dbg", fun (#erlv8_fun_invocation{}, V) ->
                                                                                ?DBG({"JS-LOG(~p:~p)> ~p.~n"}, [Fight, Id, V])
                                                                        end),

                                         ContextGlobal:set_value("log", fun (#erlv8_fun_invocation{}, V) ->
                                                                                ?INFO({"JS-LOG(~p:~p)> ~p.~n"}, [Fight, Id, V])
                                                                        end),
                                         {Context, Unit}
                                 end,Units),
                ids = dict:fetch_keys(Units)}}.

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
handle_call({get, Id}, _From, #state{units = Units} = State) ->
    ?INFO({"Get Unit", Id}),
    {ok, {_, Unit}} = dict:find(Id, Units),
    {reply, Unit, State};
handle_call({get_with_context, Id}, _From, #state{units = Units} = State) ->
    ?INFO({"Get Unit with Context", Id}),
    {ok, Unit} = dict:find(Id, Units),
    {reply, Unit, State};
handle_call(get_ids, _From, #state{ids = Ids} = State) ->
    ?INFO({"Get all unit IDs"}),
    {reply, Ids, State};
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
handle_cast({set, Unit}, #state{units = Units, ids = Ids} = State) ->
    ?INFO({"Updating Unit"}),
    {noreply, State#state{units = dict:update(unit:id(Unit), 
                                              fun ({Context, Old}) ->
						      ?DBG({Old, Unit}),
                                                      {Context, Unit}
                                              end,
                                              Units), ids = Ids}}; %fix_ids(Ids, Units)}};
handle_cast({set, Id, Unit}, #state{units = Units, ids = Ids} = State) ->
    ?INFO({"Updating Unit", Id}),
    {noreply, State#state{units = dict:store(Id,
                                             fun ({Context, Old}) ->
						     ?DBG({Old, Unit}),
                                                     {Context, Unit}
                                             end, Units), ids = Ids}}; %fix_ids(Ids, Units)}};
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

%fix_ids(Ids, Unit) ->
%    case unit:destroyed(Unit) of
%        true -> Id = unit:id(Unit),
%                lists:filter(fun (I) ->
%                                     I =/= Id
%                             end, Ids);
%        _ -> Ids
%    end.

unit_getter(Storage, UnitId, Field) ->
    fun (#erlv8_fun_invocation{}, _) ->
	    ?INFO({"JS Get on Unit", UnitId, Field}),
            U = fight_storage:get_unit(Storage, UnitId),
            Res = unit:get(U, Field),
	    ?DBG({"returning", Res})
    end.

weapon_getter(Weapon, Attr) ->
    fun (#erlv8_fun_invocation{}, _) ->
	    ?INFO({"JS Get on Weapon", Weapon, Attr}),
            Res = module:get(Weapon, Attr),
	    ?DBG({"returning", Res})
    end.

add_accessors(Object, _, []) ->
    Object;

add_accessors(Object, AccessorFun, [V | R]) ->
    ?INFO({"Adding acccessor", Object, V}),
    Object:set_value(erlang:atom_to_list(V), AccessorFun(V)),
    add_accessors(Object, AccessorFun, R).

create_foe(Storage, VM, UnitId) ->
    ?INFO({"Create Foe", UnitId}),
    Unit = erlv8_vm:taint(VM, erlv8_object:new([])),
    add_accessors(Unit, fun(V) -> unit_getter(Storage, UnitId, V) end, [x, y, id, fleet, mass]),
    Unit.

create_unit(FightPid, Map, Storage, VM, UnitId) ->
    ?INFO({FightPid, "Create Unit", UnitId}),
    Unit = create_foe(Storage, VM, UnitId),
    add_accessors(Unit, fun(V) -> unit_getter(Storage, UnitId, V) end, [range, energy]),
    Unit:set_value("closest_foes", fun (#erlv8_fun_invocation{}, _) ->
					   ?INFO({"JS closest_foes", UnitId}),
                                           U = fight_storage:get_unit(Storage, UnitId),
                                           Foes = map_server:closest_foes(Map, U),
                                           Fs = [ create_foe(Storage, VM, F) || {F, _} <- Foes ],
					   ?DBG({"returning", Fs}),
                                           erlv8_vm:taint(VM, ?V8Arr(Fs))
				   end),
    Unit:set_value("weapons", fun (#erlv8_fun_invocation{}, _) ->
				      ?INFO({"JS weapons", UnitId}),
                                      U = fight_storage:get_unit(Storage, UnitId),
                                      W = unit:modules_of_kind(U, weapon),
                                      Ws = [ create_weapon(FightPid, Storage, VM, UnitId, Weapon, Map) || Weapon <- W ],
				      ?DBG({"returning", Ws}),
                                      erlv8_vm:taint(VM, ?V8Arr(Ws))
                              end),
    Unit:set_value("move", move_fun(FightPid, Storage, Map, UnitId)),
    Unit:set_value("intercept", intercept_fun(FightPid, Storage, Map, UnitId)),
    Unit.

create_weapon(FightPid, Storage, VM, UnitId, Weapon, Map) ->
    ?INFO({"Create Weapon", UnitId, Weapon}),
    WeaponO = erlv8_vm:taint(VM, erlv8_object:new([
                                                   {"fire", fire_fun(FightPid, Storage, UnitId, Weapon, Map)}
                                                  ])),
    add_accessors(WeaponO, fun(V) -> weapon_getter(Weapon, V) end, [integrety, accuracy, variation, range, rotatability, damage]).

intercept(FightPid, Storage, Map, UnitId, Destination, Distance) ->
    ?DBG({"intercept>", UnitId, Destination, Distance}),
    Unit = fight_storage:get_unit(Storage, UnitId),
    Dist = unit:distance(Unit, Destination),
    if
	Distance =/= Dist ->
	    ?INFO({"intercept> Not optimal distance", Distance, Dist}),
            EngineRange = unit:available_range(Unit),
            Start = unit:coords(Unit),
            Range = min(Dist - Distance, EngineRange),
            {X, Y, R} = map_server:best_distance(Map, Start, Destination, Range, Distance),
	    ?DBG({"intercept> next stop", X, Y, R}),
            map_server:move_unit(Map, Unit, X, Y),
            NewUnit = unit:coords(unit:use_engine(Unit, R), {X, Y}),
            fight_storage:set_unit(Storage, NewUnit),
            fight_server:add_event(FightPid, [{type, move}, {unit, UnitId}, {position, [{x, X}, {y, Y}]}]),
            {ok, {X, Y}};
	true -> {ok, Destination}
    end.


move_fun(FightPid, Storage, Map, UnitId) ->
    fun (#erlv8_fun_invocation{}, [X, Y]) ->
	    ?INFO({"JS move", UnitId, X, Y}),
            intercept(FightPid, Storage, Map, UnitId, {X, Y}, 0)
    end.

intercept_fun(FightPid, Storage, Map, UnitId) ->
    fun (#erlv8_fun_invocation{}, [Target, Range]) ->
	    ?INFO({"JS intercept", UnitId, Target, Range}),
            TargetIdFun = Target:get_value("id"),
            TargetId = TargetIdFun:call(),
            TargetUnit = fight_storage:get_unit(Storage, TargetId),
            Coords = unit:coords(TargetUnit),
            intercept(FightPid, Storage, Map, UnitId, Coords, Range)
    end.

fire_fun(FightPid, Storage, UnitId, Weapon, Map) ->
    fun (#erlv8_fun_invocation{}, [Target]) ->
	    ?INFO({"JS fire", UnitId, Target}),
            U = fight_storage:get_unit(Storage, UnitId),
            TargetIdFun = Target:get_value("id"),
            TargetId = TargetIdFun:call(),
            TargetUnit = fight_storage:get_unit(Storage, TargetId),
            handle_weapon(FightPid, Storage, Weapon, U, TargetUnit, Map)
    end.

handle_weapon_hit(FightPid, Storage, {ok, true, _Data}, Attacker, Target, Energy, Damage, Map) ->
    AttackerId = unit:id(Attacker),
    TargetId = unit:id(Target),
    ?INFO({"Weapon Hit", AttackerId, TargetId}),
    ?DBG({Attacker, Target, Energy, Damage}),
    fight_storage:set_unit(Storage, unit:consume_energy(Attacker, Energy)),
    {NewTarget, TargetMessages} = unit:hit(Target, Damage),
    fight_storage:set_unit(Storage, NewTarget),
    OldHull = module:integrety(unit:hull(Target)),
    NewHull = module:integrety(unit:hull(NewTarget)),
    fight_server:add_event(FightPid, [{type, target}, {unit, AttackerId}, {target, TargetId}]),
    fight_server:add_event(FightPid, [{type, attack}, {unit, AttackerId}, {target, TargetId}, {damage, OldHull - NewHull}, {partials, TargetMessages}]),
    if 
        NewHull =< 0 -> 
	    ?INFO({"Unit Destroyed", TargetId}),
	    map_server:remove_unit(Map, NewTarget),
	    fight_storage:set_unit(Storage, unit:destroyed(Target, true)),
	    fight_server:add_event(FightPid, [{type, destroyed}, {unit, TargetId}]);
        true -> true
    end,
    ok;

handle_weapon_hit(FightPid, Storage, {ok, false, _Data}, Attacker, Target, Energy, _Damage, _Map) ->
    AttackerId = unit:id(Attacker),
    TargetId = unit:id(Target),
    ?INFO({"Weapon Miss", AttackerId, TargetId}),
    ?DBG({Attacker, Target, Energy}),
    fight_server:add_event(FightPid, [{type, target}, {unit, AttackerId}, {target, TargetId}]),
    fight_storage:set_unit(Storage, unit:consume_energy(Attacker, Energy)).

handle_weapon(FightPid, Storage, Weapon, Attacker, Target, Map) ->
    ?INFO({"Handle weapon"}),
    R = module:fire_weapon(Weapon, Attacker, Target),
    Energy = module:energy_usage(Weapon),
    Damage = module:damage(Weapon),
    ?DBG({R, Energy, Damage}),
    handle_weapon_hit(FightPid, Storage, R, Attacker, Target, Energy, Damage, Map).
