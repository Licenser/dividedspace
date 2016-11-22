%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%% Functions that handle modules, damaging, cycling etc are stored in this module.
%%% @end
%%% Created : 23 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(module).


-export([
         fields/0,
         select/1,
         make/4,
         new/1,
         explode/1,
         implode/1,
         is_a/1,
         get/2,
         save/1,
         reset/1]).

-export([
         id/1,
         id/2,
         type/1,
         type/2,
         integrety/1,
         integrety/2,
         instance/1,
         instance/2,
         hit_priority/1
        ]).

-export([
         kind/1,
         mass/1,
         is_destroyed/1,
         cycle/1,
         ensure_id/1,
         ensure_record/1,
         hit/4,
         energy_usage/1,
         use_shot/1,
         weapon_range/1,
         engine_range/1,
         damage/1,
         energy/1,
         use_energy/2,
         use_engine/2
        ]).

-export([
         new_hull_spec/1,
         new_armor_spec/1,
         new_engine_spec/2,
         new_shield_spec/1,
         new_generator_spec/5,
         new_weapon_spec/7
        ]).

-export([fire_weapon/3]).

-ignore_xref([
              ensure_record/1,
              id/2,
              instance/1,
              instance/2,
              integrety/2,
              is_destroyed/1,
              make/4,
              reset/1,
              select/1,
              type/2,
              weapon_range/1]).

%%%===================================================================
%%% Recors
%%%===================================================================

%% @type module() = {ID,
%%                   Type,
%%                   Integrety,
%%                   Instance}
%%   ID = binary()
%%   Type = binary() | module_type()
%%   Integrety = integer()
%%   Instance = hull_spec() | generator_spec() | engine_spec() |
%%              weapon_spec() | armor_spec() | shield_spec().
%%
%% <p>
%% This represents the specifica of ships hull.
%% </p>
%% <ul>
%%   <li>ID - The ID of the module .</li>
%%   <li>Type - The module type of the module.</li>
%%   <li>Integrety - The integrety of the module.</li>
%%   <li>Instance - A copy of the types specifica to be modified.</li>
%% </ul>
%% @end
-record(module, {id, type, integrety, instance}).


%%%-------------------------------------------------------------------
%%% Spec Records
%%%-------------------------------------------------------------------


%% @type hull_spec() = {Maneuverability}
%%   Maneuverability = float().
%%
%% <p>
%% This represents the specifica of ships hull.
%% </p>
%% <ul>
%%   <li>Maneuverability - How good can this ship manuver to evade.</li>
%% </ul>
%% @end
-record(hull_spec, {maneuverability}).

%% @type generator_spec() = {Capacity,
%%                           Output,
%%                           Energy,
%%                           DischargeRate,
%%                           Efficiency}
%%   Capacity = integer()
%%   Output = integer()
%%   Energy = integer()
%%   DischargeRate = integer()
%%   Efficiency = integer().
%%
%% <p>
%% This represents the specifica of a generator.
%% </p>
%% <ul>
%%   <li>Capacity - The maximum of energy the generator can store.</li>
%%   <li>Output - The energy produced per cycle.</li>
%%   <li>Energy - The ammount of energy currently stored in the generator.</li>
%%   <li>DischargeRate - The power this reactor can provide per cycle.</li>
%%   <li>Efficiency - The efficiencie of converting fuel into energy.</li>
%% </ul>
%% @end
-record(generator_spec, {capacity, output, energy, discharge_rate, efficiency}).


%% @type engine_spec() = {EnergyUsage, Range}
%%   EnergyUsage = integer(),
%%   Range = integer().
%%
%% <p>
%% This represents the specifica of a combat engine.
%% </p>
%% <ul>
%%   <li>EnergyUsage, Range - Number of times this engine can be used this turn.</li>
%% </ul>
%% @end
-record(engine_spec, {energy_usage, range}).

%% @type weapon_spec() = {FireRate,
%%                        Damage,
%%                        Accuracy,
%%                        Range,
%%                        Variation,
%%                        Rotatability,
%%                        EnergyUsage}
%%   FireRate = integer()
%%   Damage = integer()
%%   Accuracy = float()
%%   Variation = integer()
%%   Range = integer()
%%   Rotatability = float()
%%   EnergyUsage = integer().
%%
%% <p>
%% This represents the specifica of a weapon.
%% </p>
%% <ul>
%%   <li>TimesUsable - Number of times this weapon can be fired this turn.</li>
%%   <li>Damage - The damage the weapon does per shot.</li>
%%   <li>Accuracy - The accuracy of the weapon.</li>
%%   <li>Range - The optimal range of the weapon.</li>
%%   <li>Variation - The derivation that is posible of the optimal range.</li>
%%   <li>Rotatability - How easy it is for the weapon to track fast moving targets.</li>
%%   <li>EnergyUsage - Energy required for fiering a single shot.</li>
%% </ul>
%% @end
-record(weapon_spec, {fire_rate,
                      damage,
                      accuracy,
                      range,
                      variation,
                      rotatability,
                      energy_usage}).

%% @type armor_spec() = {DamageAbsorbation}
%%   DamageAbsorbation = integer().
%%
%% <p>
%% This represents the specifica of armor/hull plating.
%% </p>
%% <ul>
%%   <li>DamageAbsorbation - Maximal ammount of damage the armor can suffer per shot before it is penetrated.</li>
%% </ul>
%% @end
-record(armor_spec, {damage_absorbation}).

%% @type shield_spec() = {Energy}
%%   Energy = integer().
%%
%% <p>
%% This represents the specifica of energy shield.
%% </p>
%% <ul>
%%   <li>Energy - The ammount of energy stored in the shield left to absorb incoming damage.</li>
%% </ul>
%% @end
-record(shield_spec, {energy}).


%%%===================================================================
%%% API
%%%===================================================================


%%--------------------------------------------------------------------
%% @doc
%% This function returns the record fiends of the module record.
%% @spec fields() -> ModuleRecordFields
%% @end
%%--------------------------------------------------------------------
fields() ->
    record_info(fields,module).

%%--------------------------------------------------------------------
%% @doc
%% This function tests if a Structure is a Module.
%% @spec is_a(Data) -> true | false
%% @end
%%--------------------------------------------------------------------
is_a(#module{}) ->
    true;
is_a(_) ->
    false.

%%--------------------------------------------------------------------
%% @doc
%% Tests if a Module is destroyed.
%% @spec is_destroyed(Module) -> true |
%%                               false
%% @end
%%--------------------------------------------------------------------
is_destroyed(#module{integrety = Integrety}) ->
    Integrety =< 0.

%%--------------------------------------------------------------------
%% @doc
%% Cycles a module and handles it's per turn actions. This might
%% modifie the Module or it's instance specs.
%% @spec cycle(Module) -> CycledModule
%% @end
%%--------------------------------------------------------------------

cycle(Module) ->
    save_cycle(ensure_record(Module)).

save_cycle(#module{instance =
                       #generator_spec{energy = Energy,
                                       output = Output,
                                       capacity = Capacity
                                      } = Instance} = Module) ->
    Module#module{instance = Instance#generator_spec{energy = max(Capacity, Output + Energy)}};

save_cycle(#module{instance = #engine_spec{} = Instance,
                   type = Type} = Module) ->
    #engine_spec{range = Range} = module_type:specs(Type),
    Module#module{instance =Instance#engine_spec{range = Range}};

save_cycle(#module{instance = #weapon_spec{} = Instance,
                   type = Type} = Module) ->
    #weapon_spec{fire_rate = FireRate} = module_type:specs(Type),
    Module#module{instance = Instance#weapon_spec{fire_rate = FireRate}};
save_cycle(#module{} = M) ->
    M.

engine_range(#module{instance = #engine_spec{range = Range}}) ->
    Range.

use_engine(#module{instance = #engine_spec{range = Range}} = M, Used) when Used =< Range ->
    M#module{instance = #engine_spec{range = Range- Used}}.
%%--------------------------------------------------------------------
%% @doc
%% This function abstracts the logic of hitting a module, it takes
%% care of the propability of the hit and also of dealing with
%% destroyed modules. It will call hit/3
%% @spec hit(Module, Damage, Partial, Prop) -> {NewModule, NextDamage, NewPartial}
%% @end
%%--------------------------------------------------------------------

hit(#module{integrety = Integrety, type = Type} = Module,
    Damage, Partial, Prop) ->
    HitPropability = module_type:hit_propability(Type),
    if
        Integrety > 0, Prop < HitPropability ->
            hit(Module, Damage, Partial);
        true ->
            {Module, Damage, Partial}
    end.

%%%===================================================================
%%% Private functions
%%%===================================================================


%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function handles dealing damange to a Module, the integrety
%% will never fall below Zero. ActualDamage indicates how much dmanage
%% was really dealed.
%% @spec damage(Module, Damage) -> {DamagedModule, ActualDamage}
%% @end
%%--------------------------------------------------------------------


damage(#module{integrety = Integrety} = Module, Damage) when is_number(Damage) and is_number(Integrety)->
    ActualDamage = min(Integrety, Damage),
    {Module#module{integrety = Integrety - ActualDamage}, ActualDamage}.


%%--------------------------------------------------------------------
%% @private
%% @doc
%% This functions handles the situation when a Module is hit, it takes
%% case of special cases as shields or armor, it will deal damage to
%% the module.
%% The Partial parameter will be updated with possible events occured
%% during the hit.
%% @spec hit(Module, Damage, Partial) -> {NewModule, NextDamage, NewPartial}
%% @end
%%--------------------------------------------------------------------

hit(#module{instance = #hull_spec{}} = Module, Damage, Partial) when is_number(Damage) ->
    {#module{integrety = NewIntegrety} = NewModule, MaxDamage} = damage(Module, Damage),
    {NewModule, MaxDamage, [[{type, impact}, {damage, MaxDamage}, {integrety, NewIntegrety}] | Partial]};

hit(#module{instance = #armor_spec{
                          damage_absorbation = DamageAbsorbation
                         }} = Module, Damage, Partial) when is_number(Damage) ->
    MaxAbsorbation = min(DamageAbsorbation, Damage),
    case damage(Module, MaxAbsorbation) of
        {#module{} = NewModule, 0} ->
            {NewModule, Damage, Partial};
        {#module{integrety = NewIntegrety} = NewModule, ActualAbsorbation} ->
            {NewModule, Damage - ActualAbsorbation, [[{type, armor_impact}, {damage, ActualAbsorbation}, {integrety, NewIntegrety}] | Partial]}
    end;

hit(#module{instance = #shield_spec{
                          energy = Energy
                         } = Instance} = Module, Damage, Partial) when is_number(Damage) ->
    ShieldDamage = min(Energy, Damage),
    PhysicalDamage = Damage - ShieldDamage,
    {#module{integrety = NewIntegrety} = NewModule, _ActualDamage} = damage(Module, PhysicalDamage),
    ShieldEnergy = Energy - ShieldDamage,
    {NewModule#module{instance = Instance#shield_spec{
                                   energy = Energy - ShieldDamage
                                  }}, PhysicalDamage, case ShieldDamage of
                                                          0 -> Partial;
                                                          _ -> [[{type, shield_impact}, {damage, ShieldDamage}, {energy, ShieldEnergy}, {integrety, NewIntegrety}] | Partial]
                                                      end};


hit(Module, Damage, Partial) when is_number(Damage) ->
    {#module{} = NewModule, _ActualDamage} = damage(Module, Damage),
    {NewModule, Damage, Partial}.



%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is used to explode a module, replacing all uuids
%% by the refferenced data.
%% @spec explode(Module) -> ExplodedModule
%% @end
%%--------------------------------------------------------------------

explode(#module{type = Type} = M) ->
    M#module{type = module_type:ensure_record(Type)};
explode(M) ->
    {ok, M1} = select(M),
    explode(M1).

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is used to implode a exploded module, replacing all
%% exploded data to the refferencing uuid's.
%% @spec implode(Module) -> ImplodedModule
%% @end
%%--------------------------------------------------------------------

implode(#module{type = Type} = M) ->
    case module_type:is_a(Type) of
        true ->
            M#module{type = module_type:id(Type)};
        false ->
            M
    end.

%%--------------------------------------------------------------------
%% @doc
%% This function is used to reset a module to the defaults of the
%% module type. It handles exploded and non exploded Modules.
%% @spec reset(Module) -> NewModule
%% @end
%%--------------------------------------------------------------------

reset(#module{type = Type} = Module) ->
    ModuleType =
        case module_type:is_a(Type) of
            true -> Type;
            false -> {ok, Res} = module_type:select(Type),
                     Res
        end,
    Module#module{integrety = module_type:integrety(ModuleType), instance = module_type:specs(ModuleType)}.



make(ID, Type, Integrety, Specs) ->
    #module{id = ID,
            type = Type,
            integrety = Integrety,
            instance = Specs
           }.
%%--------------------------------------------------------------------
%% @doc
%% This function creates a new module, it checks if the Type passed is
%% a valid UUID and fetches it's specs and integrety to set up the
%% module up correctly.
%% module type.
%% @spec new(Type) -> UUID
%% @end
%%--------------------------------------------------------------------

new(Type) ->
    TypeID = case module_type:is_a(Type) of
                 true -> module_type:id(Type);
                 false -> Type
             end,
    case module_type:select(TypeID) of
        {ok, ModuleType} ->
            {ok, make(epic_uuid:v4(), TypeID, module_type:integrety(ModuleType), module_type:specs(ModuleType))};
        {error,not_found} -> {error, unknown_module_type}
    end.

select(ID) ->
    storage:select({module, ID}).

%%%===================================================================
%%% Accessors
%%%===================================================================

hit_priority(#module{type = Type}) ->
    module_type:hit_priority(module_type:ensure_record(Type)).


%%--------------------------------------------------------------------
%% @doc
%% Getter for module.id
%% @spec id(Module) -> ModuleId
%%       ModuleId = binary()
%% @end
%%--------------------------------------------------------------------
id(#module{id = Id}) ->
    Id.

%%--------------------------------------------------------------------
%% @doc
%% Setter for module.id
%% @spec id(module(), NewId) -> NewModule
%%       NewModule = module()
%%       NewId = binary()
%% @end
%%--------------------------------------------------------------------
id(#module{} = Module,  NewId) when is_binary(NewId) ->
    Module#module{id = NewId}.

%%--------------------------------------------------------------------
%% @doc
%% Getter for module.type
%% @spec type(Module) -> Type
%%       ModuleId = binary() | module_type()
%% @end
%%--------------------------------------------------------------------
type(#module{type = Type}) ->
    Type.

%%--------------------------------------------------------------------
%% @doc
%% Setter for module.id
%% @spec type(module(), Type) -> NewModule
%%       NewModule = module()
%%       Type = binary()
%% @end
%%--------------------------------------------------------------------
type(#module{} = Module,  Type) when is_binary(Type)->
    Module#module{type = Type}.

%%--------------------------------------------------------------------
%% @doc
%% Getter for module.type
%% @spec integrety(Module) -> Type
%%       Type = integer()
%% @end
%%--------------------------------------------------------------------
integrety(#module{integrety = Integrety}) ->
    Integrety.

%%--------------------------------------------------------------------
%% @doc
%% Setter for module.id
%% @spec integrety(module(), Integrety) -> NewModule
%%       NewModule = module()
%%       Integrety = integer()
%% @end
%%--------------------------------------------------------------------
integrety(#module{} = Module,  Integrety) when is_integer(Integrety)->
    Module#module{integrety = Integrety}.

%%--------------------------------------------------------------------
%% @doc
%% Getter for module.type
%% @spec instance(Module) -> Instance
%%       Instance = hull_spec() | generator_spec() | engine_spec() |
%%                  weapon_spec() | armor_spec() | shield_spec()
%% @end
%%--------------------------------------------------------------------
instance(#module{instance = Instance}) ->
    Instance.

%%--------------------------------------------------------------------
%% @doc
%% Setter for module.id
%% @spec instance(module(), Instance) -> NewModule
%%       NewModule = module()
%%       Instance = hull_spec() | generator_spec() | engine_spec() |
%%                  weapon_spec() | armor_spec() | shield_spec()
%% @end
%%--------------------------------------------------------------------
instance(#module{} = Module,  Instance) when is_integer(Instance)->
    Module#module{instance = Instance}.

%%--------------------------------------------------------------------
%% @doc
%% Returns the mass of the Module
%% @spec mass(module()) -> Mass
%%       Mass = integer()
%% @end
%%--------------------------------------------------------------------

mass(#module{type = Type}) ->
    module_type:mass(Type).

%%--------------------------------------------------------------------
%% @doc
%% Returns the type of the module.
%% @spec kind(module()) -> Kind
%%       Kind = hull | generator | engine |
%%              weapon | armor | shield
%% @end
%%--------------------------------------------------------------------
kind(Module) ->
    save_kind(ensure_record(Module)).

save_kind(#module{instance = #weapon_spec{}}) ->
    weapon;
save_kind(#module{instance = #engine_spec{}}) ->
    engine;
save_kind(#module{instance = #generator_spec{}}) ->
    generator;
save_kind(#module{instance = #armor_spec{}}) ->
    armor;
save_kind(#module{instance = #shield_spec{}}) ->
    shield;
save_kind(#module{instance = #hull_spec{}}) ->
    hull;
save_kind(#module{}) ->
    unknown.

fire_weapon(#module{
               type = Type,
               integrety = Integrety,
               instance = #weapon_spec{
                             accuracy = Accuracy,
                             variation = Variation,
                             range = Range,
                             rotatability = Rotatability
                            }
              }, Attacker, Target) ->
    Dist = unit:distance(Attacker, Target),
    case module_type:integrety(Type) of
        0 ->
            {ok, false, [{dist, Dist},
                         {damage_penalty, 0},
                         {attacker_maneuverability, 0},
                         {target_maneuverability, 0},
                         {aim, 0},
                         {surface, 0},
                         {aiming, 0},
                         {evade, 0},
                         {result, 0}]};
        ModuleIntegrity ->
            DamagePenalty = Integrety / ModuleIntegrity,
            [#module{instance = #hull_spec{maneuverability = ManeuvA}}] = unit:modules_of_kind(Attacker, hull),
            [#module{instance = #hull_spec{maneuverability = ManeuvT}}] = unit:modules_of_kind(Target, hull),
            Aim = (DamagePenalty * ((Accuracy * (2 + rand:uniform())) / 3)) +
                ((Variation - trunc(abs(Range - Dist))) / Variation / 2),
            Surface = math:log((math:pow(unit:mass(Target), 1/3) / max(Dist, 1)) + 1),
            Aiming =  (((ManeuvA * (2 + rand:uniform())) / 3) + Rotatability) * Aim,
            Evade = ManeuvT * (2 +rand:uniform()) / 3,
            Result = ((Aiming / Evade) * Surface),
            {ok , Result > 1, [{dist, Dist},
                              {damage_penalty, DamagePenalty},
                              {attacker_maneuverability, ManeuvA},
                              {target_maneuverability, ManeuvT},
                              {aim, Aim},
                              {surface, Surface},
                              {aiming, Aiming},
                              {evade, Evade},
                              {result, Result}]}
    end;

fire_weapon(#module{}, _, _) ->
    {error, not_a_weapon}.

weapon_range(#module{instance = #weapon_spec{range = Range}}) ->
    Range.

fire_rate(#module{instance = #weapon_spec{fire_rate = Rate}}) ->
    Rate.

energy_usage(#module{instance = #weapon_spec{energy_usage = EnergyUsage}}) ->
    EnergyUsage;

energy_usage(#module{instance = #engine_spec{energy_usage = EnergyUsage}}) ->
    EnergyUsage.

damage(#module{instance = #weapon_spec{damage = Damage}}) ->
    Damage.

energy(#module{instance = #generator_spec{energy = Energy}}) ->
    Energy.

use_energy(#module{instance = #generator_spec{energy = CurrentEnergy} = Generator} = Module, RequiredEnergy) when is_integer(RequiredEnergy), RequiredEnergy =< CurrentEnergy ->
    Module#module{instance = Generator#generator_spec{energy = CurrentEnergy - RequiredEnergy}}.

use_shot(#module{instance = #weapon_spec{fire_rate = Rate} = Weapon} = Module)
  when Rate > 0 ->
    Module#module{instance = Weapon#weapon_spec{fire_rate = Rate - 1}}.


new_armor_spec(DamageAbsorbation) ->
    #armor_spec{damage_absorbation = DamageAbsorbation}.

new_engine_spec(EnergyUsage, Range) ->
    #engine_spec{energy_usage = EnergyUsage, range = Range}.

new_generator_spec(Capacity, Output, Energy, DischargeRate, Efficiency) ->
    #generator_spec{capacity = Capacity,
                    output = Output,
                    energy = Energy,
                    discharge_rate = DischargeRate,
                    efficiency = Efficiency}.

new_shield_spec(Energy) ->
    #shield_spec{energy = Energy}.

new_hull_spec(Maneuverability) ->
    #hull_spec{maneuverability = Maneuverability}.

new_weapon_spec(Damage, FireRate, Range, Variation, Accuracy, Rotatability, EnergyUsage) ->
    #weapon_spec{damage = Damage,
                 fire_rate = FireRate,
                 range = Range,
                 variation = Variation,
                 accuracy = Accuracy,
                 rotatability = Rotatability,
                 energy_usage = EnergyUsage}.

ensure_id(Module) when is_binary(Module) ->
    Module;
ensure_id(#module{id = ID})->
    ID.

ensure_record(#module{} = Module)->
    Module;
ensure_record(Module) when is_binary(Module) ->
    {ok, M} = select(Module),
    M.

get(#module{integrety = Integrety}, integrety) ->
    Integrety;
get(#module{instance = #weapon_spec{accuracy = Accuracy}}, accuracy) ->
    Accuracy;
get(#module{instance = #weapon_spec{variation = Variation}}, variation) ->
    Variation;
get(#module{instance = #weapon_spec{range = Range}}, range) ->
    Range;
get(#module{instance = #weapon_spec{rotatability = Rotatability}}, rotatability) ->
    Rotatability;
get(#module{instance = #weapon_spec{damage = Damage}}, damage) ->
    Damage;

get(#module{instance = #weapon_spec{fire_rate = FireRate}}, fire_rate) ->
    FireRate.

save(Module) ->
    case storage:insert(implode(Module)) of
        {aborted, Reason} -> {error, Reason};
        {atomic, _} -> {ok, Module}
    end.
