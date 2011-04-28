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
	  ensure_id/1
	]).

-export([ % Getter / Setter
	  modules/1,
	  modules/2,
	  x/1,
	  x/2,
	  y/1,
	  y/2,
	  fleet/1,
	  fleet/2,
	  add_module/2,
	  remove_module/2,
	  modules_of_kind/2
	]).

-export([ % Logic
	  move/3,
	  fly/3,
	  distance/2,
	  mass/1,
	  cycle/1,
	  turn/2,
	  use_energy/2,
	  hit/2
	]).


-record(unit, {id, fleet, x, y, modules = []}).

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
%% @spec new(X, Y, Modules) -> UUID
%% @end
%%--------------------------------------------------------------------					

new(X, Y, Fleet, Modules) ->
    create(uuid:v4(), X, Y, Fleet, Modules).

%%--------------------------------------------------------------------
%% @doc
%% This function tries to fetch a Unit record from the database,
%% and returns it or an error.
%% @spec select(Index) -> {ok, Unit} |
%%                        {error, not_found}
%% @end
%%--------------------------------------------------------------------

select(ID) when is_binary(ID) ->
    storage:select({unit, ID}).

is_a(#unit{}) ->
    true;
is_a(_) ->
    false.

create(Id, X, Y, Fleet, Modules) when is_binary(Id), is_integer(X), is_integer(Y), is_list(Modules) ->
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

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is used to explode a unit, replacing all uuids
%% by the refferenced data.
%% @spec explode(Unit) -> ExplodedUnit
%% @end
%%--------------------------------------------------------------------

explode(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun module:explode/1,Ms)}.

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

ensure_id(Unit) when is_binary(Unit) ->
    Unit;
ensure_id(#unit{id = ID})->
    ID.

ensure_record(#unit{} = Unit)->
    Unit;
ensure_record(Unit) when is_binary(Unit) ->
    {ok, U} = select(Unit),
    explode(U).


%%%===================================================================
%%% Accessor
%%%===================================================================


fleet(#unit{fleet = Fight}) ->
    Fight.

fleet(#unit{} = Unit, Fleet) when is_pid(Fleet) ->
    Unit#unit{fleet = Fleet}.


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
    ModuleID = module:esure_id(M),
    Unit#unit{modules = lists:filter(fun (Module) ->
					     module:esure_id(Module) =/= ModuleID
				     end, Modules)}.

modules_of_kind(#unit{modules = Modules}, Kind) when is_atom(Kind) ->
    lists:filter(fun(M) ->
			Kind == module:kind(M)
		end,
		Modules).

%%%===================================================================
%%% Logic
%%%===================================================================


mass(#unit{modules = Modules}) ->
    lists:foldl(fun(Module, Sum) -> module:mass(Module) + Sum end, 0, Modules).


distance(#unit{x = X1, y = Y1}, #unit{x = X2, y = Y2}) ->
    abs(X1 - X2) + abs(Y1 - Y2).

move(#unit{} = Unit, X, Y) when is_integer(X), is_integer(Y) ->
    Unit#unit{x = X, y = Y}.

fly(#unit{} = Unit, X, Y) when is_integer(X), is_integer(Y) ->
    move(Unit, X, Y).

cycle(#unit{modules = Modules} = Unit) ->
    Unit#unit{modules = lists:map(fun module:cycle/1, Modules)}.


turn(#unit{id = UnitID} = Unit, Fight) ->
    Weapons = modules_of_kind(Unit, weapon),
    [#unit{id = TargetID} | _] = fight:foes(Fight, Unit),
    {NewFight, Events} = lists:foldl(fun (Weapon, {NewFight, Messages}) ->
					     Attacker = fight:get_unit(NewFight, UnitID),
					     Target = fight:get_unit(NewFight, TargetID),
					     case module:fire_weapon(Weapon, Attacker, Target) of
						 {ok, true} -> {ok, NewAttacker} = use_energy(Attacker, module:energy_usage(Weapon)),
							       NewFight1 = fight:add_unit(NewFight, NewAttacker),
							       {NewTarget, TargetMessages} = hit(Target, module:damage(Weapon)),
							       {fight:add_unit(NewFight1, NewTarget), [{hit, UnitID, TargetID} | TargetMessages] ++ Messages};
						 {ok, false} -> {ok, NewAttacker} = use_energy(Attacker, module:energy_usage(Weapon)),
								{fight:add_unit(NewFight, NewAttacker), [{miss, UnitID, TargetID}| Messages]}
					     end
				     end, {Fight, []}, Weapons),
    {NewFight, Events}.

hit(#unit{modules = _Modules} = Unit, _Damage) ->
    {Unit, []}.



use_energy(Unit, Energy) ->
    AvailableEnergy = available_energy(Unit),
    if 
	AvailableEnergy >= Energy -> {ok, consume_energy(Unit, Energy)};
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
	
