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
          new/5,
          is_a/1,
          from_template/1,
          from_template/5,
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
          use_engine/2,
          use_shot/2,
          consume_energy/2
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
          use_energy/2,
          hit/2
        ]).
-ignore_xref([
              add_module/2,
              coords/3,
              fleet/2,
              fly/3,
              from_template/1,
              id/2 ,
              modules/1,
              modules/2,
              move/3,
              new/5,
              remove_module/2,
              save/1,
              select/1,
              use_energy/2,
              x/2,
              y/2]).


-record(unit, {id, fleet, x, y, modules = [], destroyed = false, code}).

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

new(X, Y, Fleet, Modules, Code) ->
    create(epic_uuid:v4(), X, Y, Fleet, Modules, Code).

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

create(Id, X, Y, Fleet, Modules, Code) when is_binary(Id), is_integer(X), is_integer(Y), is_list(Modules) ->
    #unit{
       id = Id,
       x = X,
       y = Y,
       fleet = Fleet,
       modules = Modules,
       code = Code
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
    from_template(0,0, nil, Modules, <<"">>).

from_template(X, Y, Fleet, Modules, Code) when is_integer(X), is_integer(Y), is_list(Modules) ->
    ModuleIDs = create_modules(Modules),
    Unit = explode(new(X, Y, Fleet, ModuleIDs, Code)),
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

hit(#unit{modules = OriginalModules} = Unit, Damage) ->
    {NewModules, _, Events} =
        lists:foldl(fun (Module, {Modules, RemainingDamage, Partial}) ->
                            {NewModule, NewDamage, MewPartial} =
                                module:hit(Module, RemainingDamage, Partial, random:uniform()),
                            {[NewModule | Modules], NewDamage, MewPartial}
                    end, {[], Damage, []}, module_sort(OriginalModules)),
    NewUnit = Unit#unit{modules= NewModules},
    Hull = module:integrety(hull(NewUnit)),
    DamagedUnit = if
                      Hull =< 0 -> destroyed(NewUnit, true);
                      true -> NewUnit
                  end,
    {DamagedUnit, lists:reverse(Events)}.

use_energy(Unit, Energy) ->
    AvailableEnergy = available_energy(Unit),
    if
        AvailableEnergy >= Energy ->
            consume_energy(Unit, Energy);
        true ->
            {error, not_enough_energy}
    end.

use_engine(Unit, Range) ->
    AvailableRange = available_range(Unit),
    if
        AvailableRange >= Range ->
            %%INFO("use_engine, moved"),
            consume_engine_usage(Unit, Range);
        true ->
            %%INFO("use_engine, too little range."),
            {error, not_enough_energy}
    end.

use_shot(Unit = #unit{modules = Modules}, Weapon) ->
    R = lists:foldl(fun (Module, {searching, Ms}) ->
                            case module:id(Module) of
                                MID when MID =:= Weapon ->
                                    case module:get(Module, fire_rate) of
                                        0 ->
                                            {error, no_shots_left};
                                        _ ->
                                            Module1 = module:use_shot(Module),
                                            [Module1 | Ms]
                                    end;
                                _ ->
                                    {searching, [Module | Ms]}
                            end;
                        (_Module, {error, no_shots_left} = E) ->
                            E;
                        (Module, Ms) when is_list(Ms) ->
                            [Module | Ms]
                    end, {searching, []}, Modules),
    case R of
        Ms when is_list(Ms) ->
            Unit#unit{modules = Ms};
        {searching, _Ms} ->
            {error, not_found};
        {error, no_shots_left} ->
            {error, no_shots_left}
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

get(#unit{x = X}, x) ->
    X;
get(#unit{code = Code}, code) ->
    Code;
get(#unit{y = Y}, y) ->
    Y;
get(#unit{id = Id}, id) ->
    Id;
get(#unit{destroyed = Destroyed}, destroyed) ->
    Destroyed;
get(#unit{} = Unit, mass) ->
    mass(Unit);
get(#unit{} = Unit, range) ->
    available_range(Unit);
get(#unit{} = Unit, energy) ->
    available_energy(Unit);
get(#unit{fleet = Fleet}, fleet) ->
    Fleet.
