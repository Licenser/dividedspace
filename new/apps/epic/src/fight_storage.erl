%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  8 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(fight_storage).
-behaviour(gen_server).

%% API
-export([start_link/3]).
-ignore_xref([start_link/3]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3, set_unit/2,
         get_unit_with_context/2,
         get_ids/1, count/1]).

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
start_link(Units, Fight, Map) ->
    gen_server:start_link(?MODULE, [Units, Fight, Map], []).

get_unit(Pid, Id) ->
    gen_server:call(Pid, {get, Id}).

get_unit_with_context(Pid, Id) ->
    gen_server:call(Pid, {get_with_context, Id}).

set_unit(Pid, Unit) ->
    gen_server:cast(Pid, {set, Unit}).

%% set_unit(Pid, Id, Unit) ->
%%     gen_server:cast(Pid, {set, Id, Unit}).

get_ids(Pid) ->
    gen_server:call(Pid, get_ids).

count(Pid) ->
    gen_server:call(Pid, count).


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
init([Units, Fight, Map]) ->
    lager:info("Initializing Fight Storage"),
    %%io:format("~p~n", [{Units, Fight, Map}]),
    L0 = epic_lua:init(),
    L1 = luerl:set_table([epic],
                         [{dbg,
                           fun (V, St) ->
                                   lager:debug("[lua](~p) -> ~p",
                                               [Fight, V]),
                                   io:format("[lua] ~p~n", [V]),
                                   fight_server:add_event(
                                     Fight,
                                     [{type, log},
                                      {message, list_to_binary(io_lib:format("[dbg] ~s", V))}]),
                                   {[ok], St}
                           end},
                          {log,
                           fun (V, St) ->
                                   lager:info("[lua](~p) -> ~p",
                                              [Fight, V]),
                                   io:format("[lua] ~p~n", [V]),
                                   %% fight_server:add_event(
                                   %%   Fight,
                                   %%   [{type, log},
                                   %%    {message, list_to_binary(io_lib:format("[log] ~s", V))}]),
                                   {[ok], St}
                           end}], L0),
    LBase = L1,
    {ok, #state{
            units =
                dict:map(
                  fun (Id, Unit) ->
                          lager:debug("Creating Unit ~p ~p", [Id, Unit]),
                          U = create_unit(Fight, Map, self(), Id),
                          LU = luerl:set_table([unit], U, LBase),
                          Code = unit:get(Unit, code),
                          {ok, Chunk, LU1} = luerl:load(Code, LU),
                          {LU1, Chunk, Unit}
                  end, Units),
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
handle_call(count, _From, #state{units = Units} = State) ->
    R = dict:fold(fun (_, {_, _, Unit}, {A, B}) ->
                          case {unit:destroyed(Unit), unit:fleet(Unit)} of
                              {true, _} ->
                                  {A, B};
                              {_, <<"one">>} ->
                                  {A + 1, B};
                              {_, <<"two">>} ->
                                  {A, B + 1}
                          end
                  end, {0, 0}, Units),
    {reply, {ok, R}, State};
handle_call({get, Id}, _From, #state{units = Units} = State) ->
    lager:info("Get Unit ~p", [Id]),
    {ok, {_, _, Unit}} = dict:find(Id, Units),
    {reply, Unit, State};
handle_call({get_with_context, Id}, _From, #state{units = Units} = State) ->
    lager:info("Get Unit with Context: ~p", [Id]),
    {ok, Unit} = dict:find(Id, Units),
    {reply, Unit, State};
handle_call(get_ids, _From, #state{ids = Ids} = State) ->
    lager:info("Get all unit IDs"),
    {reply, Ids, State};
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
handle_cast({set, Unit}, #state{units = Units} = State) ->
    lager:info("Updating Unit"),
    {noreply, State#state{units = dict:update(unit:id(Unit),
                                              fun ({Context, Code, _Old}) ->
                                                      %%DBG({Old, Unit}),
                                                      {Context, Code, Unit}
                                              end,
                                              Units)}};
%%fix_ids(Ids, Units)}};

%% handle_cast({set, Id, Unit}, #state{units = Units, ids = Ids} = State) ->
%%     lager:info("Updating Unit", [Id]),
%%     {noreply, State#state{units = dict:store(Id,
%%                                              fun ({Context, _Old}) ->
%%                                                      %%DBG({Old, Unit}),
%%                                                      {Context, Unit}
%%                                              end, Units), ids = Ids}};
%%fix_ids(Ids, Units)}};

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

%%fix_ids(Ids, Unit) ->
%%    case unit:destroyed(Unit) of
%%        true -> Id = unit:id(Unit),
%%                lists:filter(fun (I) ->
%%                                     I =/= Id
%%                             end, Ids);
%%        _ -> Ids
%%    end.

unit_getter(Storage, UnitId, Field) ->
    fun (_, St) ->
            lager:info("[~p:get] ~p", [UnitId, Field]),
            U = get_unit(Storage, UnitId),
            Res = unit:get(U, Field),
            lager:debug("[~p:get]  => ~p", [UnitId, Res]),
            {[Res], St}
    end.

weapon_getter(Weapon, Attr) ->
    fun (_, St) ->
            lager:info("Get on Weapon ~p ~p", [Weapon, Attr]),
            Res = module:get(Weapon, Attr),
            %%DBG({"returning", Res}, [], [script]),
            {[Res], St}
    end.

add_accessors(T, _, []) ->
    T;

add_accessors(T, AccessorFun, [V | R]) ->
    lager:info("[~p] Adding acccessor ~p", [T, V]),
    T1 = [{V, AccessorFun(V)} | T],
    add_accessors(T1, AccessorFun, R).

create_foe(Storage, UnitId) ->
    lager:info("[~p] Create Foe", [UnitId]),
    add_accessors([], fun(V) -> unit_getter(Storage, UnitId, V) end,
                  [x, y, id, fleet, mass, destroyed]).

closest_foe_fun(Storage, Map, UnitId) ->
    fun ([], St) ->
            lager:info("[~p] closest_foes/0", [UnitId]),
            U = get_unit(Storage, UnitId),
            Foes = map_server:closest_foes(Map, U),
            Fs = [ create_foe(Storage, F) || {F, _} <- Foes ],
            %%io:format("Foes: ~p~n", [Fs]),
            {[Fs], St};
        ([MinRange, MaxRange], St) ->
            lager:info("[~p] closest_foes/2", [UnitId]),
            U = get_unit(Storage, UnitId),
            Foes = map_server:closest_foes(Map, U,
                                           {MinRange, MaxRange}),
            Fs = [ create_foe(Storage, F) || {F, _} <- Foes ],
            %%DBG({"returning", Fs}, [], [script]),
            {[Fs], St};
        ([MinRange, MaxRange, MinMass, MaxMass], St) ->
            lager:info("[~p] closest_foes/4", [UnitId]),
            U = get_unit(Storage, UnitId),
            Foes = map_server:closest_foes(Map, U,
                                           {MinRange, MaxRange},
                                           {MinMass, MaxMass}),
            Fs = [ create_foe(Storage, F) || {F, _} <- Foes ],
            %%DBG({"returning", Fs}, [], [script]),
            {[Fs], St}

    end.

dist_fun(Storage, UnitId) ->
    fun ([Target], St) ->
            lager:info("[~p] dist/1", [UnitId]),
            U = get_unit(Storage, UnitId),
            {ok, [TargetId], St1} = do_call(Target, id, [], St),
            TargetUnit = get_unit(Storage, TargetId),
            R = unit:distance(U, unit:coords(TargetUnit)),
            {[R], St1};
        ([X, Y], St) ->
            lager:info("[~p] dist/2", [UnitId]),
            U = get_unit(Storage, UnitId),
            R = unit:distance(U, {X, Y}),
            {[R], St}
    end.

weapons_fun(FightPid, Storage, Map, UnitId) ->
    fun ([], St) ->
            lager:info("[~p] weapons/0", [UnitId]),
            U = get_unit(Storage, UnitId),
            W = unit:modules_of_kind(U, weapon),
            Ws = [ create_weapon(FightPid, Storage, UnitId, Weapon, Map)
                   || Weapon <- W ],
            %%DBG({"returning", Ws}, [], [script]),
            {[Ws], St}
    end.

create_unit(FightPid, Map, Storage, UnitId) ->
    lager:debug("[~p] Create Unit: ~p", [FightPid, UnitId]),
    U0 = create_foe(Storage, UnitId),
    U1 = add_accessors(U0, fun(V) -> unit_getter(Storage, UnitId, V) end,
                       [range, energy]),
    [{closest_foes, closest_foe_fun(Storage, Map, UnitId)},
     {dist, dist_fun(Storage, UnitId)},
     {weapons, weapons_fun(FightPid, Storage, Map, UnitId)},
     {move, move_fun(FightPid, Storage, Map, UnitId)},
     {intercept, intercept_fun(FightPid, Storage, Map, UnitId)} |
      U1].

create_weapon(FightPid, Storage, UnitId, Weapon, Map) ->
    lager:info("[~p] Create Weapon: ~p", [UnitId, Weapon]),
    WeaponO = [{fire, fire_fun(FightPid, Storage, UnitId, Weapon, Map)}],
    add_accessors(WeaponO, fun(V) -> weapon_getter(Weapon, V) end,
                  [integrety, accuracy, variation, range, rotatability,
                   damage, fire_rate]).

intercept(FightPid, Storage, Map, UnitId, Destination, Distance) ->
    lager:debug("[intercept] ~p -> ~p @~p", [UnitId, Destination, Distance]),
    Unit = get_unit(Storage, UnitId),
    Dist = unit:distance(Unit, Destination),
    if
        Distance /= Dist ->
            lager:info("[intercept] Not optimal distance: ~p =/= ~p",
                       [Distance, Dist]),
            EngineRange = unit:available_range(Unit),
            Start = unit:coords(Unit),
            %%Range = min(abs(Dist - Distance), EngineRange),
            {X, Y, R} = map_server:best_distance(Map, Start, Destination, Distance, EngineRange),
            lager:debug("[intercept] next stop: ~p:~p ~p", [X, Y, R]),
            map_server:move_unit(Map, Unit, X, Y),
            Unit2 = case  unit:use_engine(Unit, R) of
                        {error, Error} ->
                            lager:warning("Can't move: ~p", [Error]),
                            Unit;
                        Res ->
                            unit:coords(Res, {X, Y})
                    end,
            set_unit(Storage, Unit2),
            fight_server:add_event(FightPid, [{type, move}, {unit, UnitId}, {position, [{x, X}, {y, Y}]}]),
            {ok, {X, Y}};
        true ->
            {ok, unit:coords(Unit)}
    end.


move_fun(FightPid, Storage, Map, UnitId) ->
    fun ([X, Y], St) ->
            lager:info("[~p:move] ~p:~p ", [UnitId, X, Y]),
            intercept(FightPid, Storage, Map, UnitId, {X, Y}, 0),
            %% TODO: return something sensible
            {[ok], St}
    end.

do_call(Tab, E, Args, St) when is_atom(E) ->
    do_call(Tab, atom_to_binary(E, utf8), Args, St);

do_call(Tab, E, Args, St) ->
    case lists:keyfind(E, 1, Tab) of
        {E, {function, F}} ->
            {Res, St1} = F(Args, St),
            {ok, Res, St1};
        _ ->
            {error, no_function}
    end.

intercept_fun(FightPid, Storage, Map, UnitId) ->
    fun ([Target, Range], St) ->
            lager:info("[~p:intercept] ~p @~p", [UnitId, Target, Range]),
            %%io:format("[~p:intercept] ~p @~p~n", [UnitId, Target, Range]),
            {ok, [TargetId], St1} = do_call(Target, id, [], St),
            %%DBG({TargetId}, [], [script]),
            TargetUnit = get_unit(Storage, TargetId),
            %%DBG({TargetUnit}, [], [script]),
            Coords = unit:coords(TargetUnit),
            intercept(FightPid, Storage, Map, UnitId, Coords, Range),
            %% TODO: return something sensible
            {[ok], St1}
    end.

fire_fun(FightPid, Storage, UnitId, Weapon, Map) ->
    fun ([Target], St) ->
            lager:info("[~p:fire] ~p", [UnitId, Target]),
            U = get_unit(Storage, UnitId),
            {ok, [TargetId], St1} = do_call(Target, id, [], St),
            TargetUnit = get_unit(Storage, TargetId),
            case unit:destroyed(TargetUnit) of
                false ->
                    handle_weapon(FightPid, Storage, Weapon, U, TargetUnit, Map);
                true ->
                    ok
            end,
            {[ok], St1}
    end.

handle_weapon_hit(FightPid, Storage, {ok, true, _Data}, Attacker, Target, Damage, Map) ->
    AttackerId = unit:id(Attacker),
    TargetId = unit:id(Target),
    %%INFO({"Weapon Hit", AttackerId, TargetId}),
    %%DBG({Attacker, Target, Energy, Damage}),
    {NewTarget, TargetMessages} = unit:hit(Target, Damage),
    set_unit(Storage, NewTarget),
    OldHull = module:integrety(unit:hull(Target)),
    NewHull = module:integrety(unit:hull(NewTarget)),
    fight_server:add_event(FightPid, [{type, target}, {unit, AttackerId}, {target, TargetId}]),
    fight_server:add_event(FightPid, [{type, attack}, {unit, AttackerId}, {target, TargetId}, {damage, OldHull - NewHull}, {partials, TargetMessages}]),
    if
        NewHull =< 0 ->
            %%INFO({"Unit Destroyed", TargetId}),
            map_server:remove_unit(Map, NewTarget),
            set_unit(Storage, unit:destroyed(Target, true)),
            fight_server:add_event(FightPid, [{type, destroyed}, {unit, TargetId}]);
        true -> true
    end,
    ok;

handle_weapon_hit(FightPid, _Storage, {ok, false, _Data}, Attacker, Target, _Damage, _Map) ->
    AttackerId = unit:id(Attacker),
    TargetId = unit:id(Target),
    %%INFO({"Weapon Miss", AttackerId, TargetId}),
    %%DBG({Attacker, Target, Energy}),
    fight_server:add_event(FightPid, [{type, target}, {unit, AttackerId}, {target, TargetId}]).


handle_weapon(FightPid, Storage, Weapon, Attacker, Target, Map) ->
    Energy = module:energy_usage(Weapon),
    case unit:consume_energy(Attacker, Energy) of
        {error, not_enough_energy} ->
            {error, not_enough_energy};
        Attacker1 ->
            handle_weapon1(FightPid, Storage, Weapon, Attacker1, Target, Map)
    end.

handle_weapon1(FightPid, Storage, Weapon, Attacker, Target, Map) ->
    WeaponId = module:id(Weapon),
    case unit:use_shot(Attacker, WeaponId) of
        {error, E} ->
            {error, E};
        Attacker1 ->
            handle_weapon2(FightPid, Storage, Weapon, Attacker1, Target, Map)
    end.

handle_weapon2(FightPid, Storage, Weapon, Attacker, Target, Map) ->
    %%io:format("Attacker: ~p~n", [Attacker]),
    %% We have all changes done to the attacker in the prior functions
    %% we now save it.
    set_unit(Storage, Attacker),
    %%INFO({"Handle weapon"}),
    R = module:fire_weapon(Weapon, Attacker, Target),
    Damage = module:damage(Weapon),
    %%DBG({R, Energy, Damage}),
    handle_weapon_hit(FightPid, Storage, R, Attacker, Target, Damage, Map).
