%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%% This Server represents a unit in DS, it is started with the unit
%%% Specs as parameter and lives for a while, it works like a database
%%% cache that also incooperates the unit logic.
%%% @end
%%% Created : 22 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(unit).

%% API
-export([ % Meta
	  new/4,
	  is_a/1,
	  from_template/1,
	  from_template/4,
	  fields/0,
	  explode/1,
	  implode/1,
	  select/1,
	  save/1,
	  ensure_record/1,
	  ensure_id/1,
	  name/1,
	  hull/1,
          available_range/1,
          use_engine/2
	]).

-export([ % Getter / Setter
	  modules/1,
	  id/1,
	  id/2,
	  modules/2,
	  x/1,
	  x/2,
	  y/1,
	  y/2,
	  coords/1,
	  coords/2,
	  coords/3,
	  destroyed/1,
	  destroyed/2,
	  fleet/1,
	  fleet/2,
	  add_module/2,
	  remove_module/2,
	  modules_of_kind/2,
          get/2
	]).

-export([ % Logic
	  move/3,
	  fly/3,
	  distance/2,
	  mass/1,
	  cycle/1,
	  turn/3,
	  use_energy/2,
	  hit/2
	]).


-record(unit, {id, fleet, x, y, modules = [], destroyed = false}).

%%%===================================================================
%%% Meta
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% This function returns the record fiends of the module record.
%% @spec fields() -> UnitRecordFields
%% @end
%%--------------------------------------------------------------------
fields() ->
    record_info(fields,unit).    

%%--------------------------------------------------------------------
%% @doc
%% This function creates a new unit. Modules are not checked!
%% module type.
%% @spec new(X, Y, Fleet, Modules) -> UUID
%% @end
%%--------------------------------------------------------------------					

new(X, Y, Fleet, Modules) ->
    create(uuid:to_string(uuid:v4()), X, Y, Fleet, Modules).

%%--------------------------------------------------------------------
%% @doc
%% This function tries to fetch a Unit record from the database,
%% and returns it or an error.
%% @spec select(Index) -> {ok, Unit} |
%%                        {error, not_found}
%% @end
%%--------------------------------------------------------------------

select(ID) when is_list(ID) ->
    storage:select({unit, ID}).

is_a(#unit{}) ->
    true;
is_a(_) ->
    false.

create(Id, X, Y, Fleet, Modules) when is_list(Id), is_integer(X), is_integer(Y), is_list(Modules) ->
    #unit{
	   id = Id,
	   x = X,
	   y = Y,
	   fleet = Fleet,
	   modules = Modules
       }.

save(#unit{modules = Modules} = Unit) ->
    lists:map(fun module:save/1, Modules),
    case storage:insert(implode(Unit)) of
	{aborted, Reason} -> {stop, {save_failed, Reason}, Unit};
	{atomic, _} -> Unit
    end.

module_sort(Modules) ->
    lists:sort(fun (A, B) ->
		       module:hit_priority(A) > module:hit_priority(B)
	       end,Modules).


sort_modules(#unit{modules = Ms} = U) ->
    U#unit{modules = module_sort(Ms)}. 

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is used to explode a unit, replacing all uuids
%% by the refferenced data.
%% @spec explode(Unit) -> ExplodedUnit
%% @end
%%--------------------------------------------------------------------

explode(#unit{modules = Ms} = U) ->
    sort_modules(U#unit{modules = lists:map(fun module:explode/1,Ms)}).

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is used to implode a exploded unit, replacing all
%% exploded data to the refferencing uuid's.
%% @spec implode(Unit) -> ImplodedUnit
%% @end
%%--------------------------------------------------------------------

implode(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun module:id/1, Ms)}.

from_template(Modules) when is_list(Modules) ->
    from_template(0,0, nil, Modules).

from_template(X, Y, Fleet, Modules) when is_integer(X), is_integer(Y), is_list(Modules) ->
    ModuleIDs = create_modules(Modules),
    Unit = explode(new(X, Y, Fleet, ModuleIDs)),
    storage:insert(Unit),
    {ok, Unit}.

ensure_id(Unit) when is_list(Unit) ->
    Unit;
ensure_id(#unit{id = ID})->
    ID.

ensure_record(#unit{} = Unit)->
    Unit;
ensure_record(Unit) when is_list(Unit) ->
    {ok, U} = select(Unit),
    explode(U).


%%%===================================================================
%%% Accessor
%%%===================================================================


fleet(#unit{fleet = Fight}) ->
    Fight.

fleet(#unit{} = Unit, Fleet) when is_pid(Fleet) ->
    Unit#unit{fleet = Fleet}.

id(#unit{id = Id}) ->
    Id.

id(#unit{} = Unit, Id) when is_integer(Id) ->
    Unit#unit{id = Id}.

destroyed(#unit{destroyed = Destroyed}) ->
    Destroyed.

destroyed(#unit{} = Unit, Destroyed) when is_boolean(Destroyed) ->
    Unit#unit{destroyed = Destroyed}.

coords(#unit{x = X, y = Y}) ->
    {X, Y}.

coords(#unit{} = Unit, {X, Y}) ->
    Unit#unit{x = X, y = Y}.

coords(#unit{} = Unit, X, Y) ->
    Unit#unit{x = X, y = Y}.


x(#unit{x = X}) ->
    X.

x(#unit{} = Unit, X) when is_integer(X) ->
    Unit#unit{x = X}.

y(#unit{y = Y}) ->
    Y.

y(#unit{} = Unit, Y) when is_integer(Y) ->
    Unit#unit{y = Y}.

modules(#unit{modules = Modules}) ->
    Modules.

modules(#unit{} = Unit, Modules) when is_list(Modules)->
    Unit#unit{modules = Modules}.

add_module(#unit{modules = Modules} = Unit, Module) ->
    Unit#unit{modules = [Module | Modules]}.

remove_module(#unit{modules = Modules} = Unit, M) ->
    ModuleID = module:ensure_id(M),
    Unit#unit{modules = lists:filter(fun (Module) ->
					     module:ensure_id(Module) =/= ModuleID
				     end, Modules)}.

modules_of_kind(#unit{modules = Modules}, Kind) when is_atom(Kind) ->
    lists:filter(fun(M) ->
			Kind == module:kind(M)
		end,
		Modules).

hull(Unit) ->
    [Hull] = modules_of_kind(Unit, hull),
    Hull.

name(Unit) ->
    [Hull] = modules_of_kind(Unit, hull),
    module_type:name(module:type(Hull)).

%%%===================================================================
%%% Logic
%%%===================================================================

mass(#unit{modules = Modules}) ->
    lists:foldl(fun(Module, Sum) -> module:mass(Module) + Sum end, 0, Modules).

distance(#unit{x = X1, y = Y1}, #unit{x = X2, y = Y2}) ->
    map:distance({X1, Y1}, {X2, Y2});
distance(#unit{x = X1, y = Y1}, {X2, Y2}) ->
    map:distance({X1, Y1}, {X2, Y2}).

move(#unit{} = Unit, X, Y) when is_integer(X), is_integer(Y) ->
    Unit#unit{x = X, y = Y}.

fly(#unit{} = Unit, X, Y) when is_integer(X), is_integer(Y) ->
    move(Unit, X, Y).

cycle(#unit{modules = Modules} = Unit) ->
    Unit#unit{modules = lists:map(fun module:cycle/1, Modules)}.

update_unit(Fight, UnitId, F) ->
    fight:add_unit(Fight, F(fight:get_unit(Fight, UnitId))).

update_unit_energy(Fight, UnitId, E) ->
    update_unit(Fight, UnitId, fun (Unit) ->
				       use_energy(Unit, E)
			       end).
    

handle_weapon_hit(Fight, {ok, true, _Data}, AttackerId, TargetId, Energy, Damage) ->
    NewFight = update_unit_energy(Fight, AttackerId, Energy),
    Target = fight:get_unit(Fight, TargetId),
    {NewTarget, TargetMessages} = hit(Target, Damage),
    OldHull = module:integrety(unit:hull(Target)),
    NewHull = module:integrety(unit:hull(NewTarget)),
    M = [{hit, AttackerId, TargetId, OldHull - NewHull, TargetMessages}, {target, AttackerId, TargetId}],
    NewMessages = if 
		      NewHull =< 0 -> [{destroyed, TargetId} | M];
		      true -> M
		  end,
    {fight:add_unit(NewFight, NewTarget), NewMessages};

handle_weapon_hit(Fight, {ok, false, _Data}, AttackerId, TargetId, Energy, _Damage) ->
    {update_unit_energy(Fight, AttackerId, Energy), [{miss, AttackerId, TargetId}, {target, AttackerId, TargetId}]}.

handle_weapon(Weapon, {Fight, Messages}, Map, AttackerId, TargetId) ->
    {FightAfterIntercept, InterceptMessages} = intercept(Fight, Map, AttackerId, TargetId, Weapon),
    Attacker = fight:get_unit(FightAfterIntercept, AttackerId),
    Target = fight:get_unit(Fight, TargetId),
    {NewFight, NewMessages} = handle_weapon_hit(FightAfterIntercept, module:fire_weapon(Weapon, Attacker, Target), AttackerId, TargetId, module:energy_usage(Weapon), module:damage(Weapon)),
    {NewFight, NewMessages ++ InterceptMessages ++ Messages}.

turn(#unit{destroyed = true}, Fight, _Map) ->
    Fight;
turn(#unit{id = UnitId} = Unit, Fight, Map) ->
    Weapons = modules_of_kind(Unit, weapon),
    [{TargetId, _} | _] = map_server:closest_foes(Map, Unit),
    {NewFight, Events} = lists:foldl(fun (A, B) -> handle_weapon(A, B, Map, UnitId, TargetId) end, {Fight, []}, Weapons),
    {NewFight, Events}.

hit(#unit{modules = OriginalModules} = Unit, Damage) ->
    {NewModules, _, Events} = 
	lists:foldl(fun (Module, {Modules, RemainingDamage, Partial}) ->
			    {NewModule, NewDamage, MewPartial} = module:hit(Module, RemainingDamage, Partial, random:uniform()),
			    {[NewModule | Modules], NewDamage, MewPartial}
		    end, {[], Damage, []}, module_sort(OriginalModules)),
    {Unit#unit{modules= NewModules}, lists:reverse(Events)}.

use_energy(Unit, Energy) ->
    AvailableEnergy = available_energy(Unit),
    if 
	AvailableEnergy >= Energy -> consume_energy(Unit, Energy);
	true -> {error, not_enough_energy}
    end.

use_engine(Unit, Range) ->
    AvailableRange = available_range(Unit),
    if 
	AvailableRange >= Range -> consume_engine_usage(Unit, Range);
	true -> {error, not_enough_energy}
    end.


%%%===================================================================
%%% Internal functions
%%%===================================================================

create_modules([TypeName]) ->
    [ModuleType] = module_type:select_by_name(TypeName),
    {ok, Module} = module:new(ModuleType),
    storage:insert(Module),
    [module:id(Module)];
create_modules([TypeName | Modules]) ->
    [ModuleType] = module_type:select_by_name(TypeName),
    {ok, Module} = module:new(ModuleType),
    storage:insert(Module),
    [module:id(Module) | create_modules(Modules)].



available_energy(#unit{} = Unit) ->
    lists:foldl(fun (Generator, Energy) ->
			Energy + module:energy(Generator)
		end, 0, modules_of_kind(Unit, generator)).


available_range(#unit{} = Unit) ->
    lists:foldl(fun (Engine, Range) ->
			Range + module:engine_range(Engine)
		end, 0, modules_of_kind(Unit, engine)).

consume_energy(#unit{modules = Modules} = Unit, Energy) ->
    {0, Ms} = lists:foldl(fun (Module, {RemainingEnergy, NewModules}) ->
				  case module:kind(Module) of
				      generator -> ConsumedEnergy = min(RemainingEnergy, module:energy(Module)),
						   {RemainingEnergy - ConsumedEnergy,
						    [module:use_energy(Module, ConsumedEnergy) | NewModules]};
				      _ -> {RemainingEnergy, [Module | NewModules]}
				  end
			  end, {Energy, []}, Modules),
    Unit#unit{modules = Ms}.

consume_engine_usage(#unit{modules = Modules} = Unit, Range) ->
    {0, Ms} = lists:foldl(fun (Module, {RemainingRange, NewModules}) ->
				  case module:kind(Module) of
				      engine -> UsedRange = min(RemainingRange, module:engine_range(Module)),
						{RemainingRange - UsedRange,
						 [module:use_engine(Module, UsedRange) | NewModules]};
				      _ -> {RemainingRange, [Module | NewModules]}
				  end
			  end, {Range, []}, Modules),
    Unit#unit{modules = Ms}.


intercept(Fight, Map, AttackerId, TargetId, Weapon) ->
    Attacker = fight:get_unit(Fight, AttackerId),
    Target = fight:get_unit(Fight, TargetId),
    WeaponRange = module:weapon_range(Weapon),
    Dist = distance(Attacker, Target),
    if
	WeaponRange =/= Dist ->EngineRange = available_range(Attacker),
			       PosA = coords(Attacker),
			       PosT = coords(Target),
			       Range = min(Dist - WeaponRange, EngineRange),
			       {X, Y, R} = map_server:best_distance(Map, PosA, PosT, Range),
			       map_server:move_unit(Map, AttackerId, X, Y),
			       {update_unit(Fight, AttackerId, fun(A) ->
								       coords(use_engine(A, R), {X, Y})
							       end), [{move, AttackerId, X, Y}]}; 
	true -> {Fight, []}
    end.

get(#unit{x = X}, x) ->
    X;
get(#unit{y = Y}, y) ->
    Y;
get(#unit{id = Id}, id) ->
    Id;
get(#unit{} = Unit, mass) ->
    unit:mass(Unit);
get(#unit{} = Unit, range) ->
    unit:available_range(Unit);
get(#unit{} = Unit, energy) ->
    unit:available_energy(Unit);
get(#unit{fleet = Fleet}, fleet) ->
    Fleet.
