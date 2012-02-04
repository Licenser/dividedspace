%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 25 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(loader).
-include_lib("alog_pt.hrl").

-export([
	 load/0,
	 load/1
	]).

load() ->
    load("armor") ++
	load("engine") ++
	load("generator") ++
	load("shield") ++
	load("weapon") ++
	load("hull").

load(Type) ->
    Modules = epic_center:get_modules(Type),
    lists:map(fun insert/1, Modules).

convert({armor, Name, Size, Mass, Integrety, HitPropability, HitPriority, DamageAbsorbtion}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_armor_spec(DamageAbsorbtion)),
    ?DBG({ModuleType}),
    ModuleType;
convert({engine, Name, Size, Mass, Integrety, HitPropability, HitPriority, EnergyUsage, Range}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_engine_spec(EnergyUsage, Range)),
    ?DBG({ModuleType}),
    ModuleType;
convert({shield, Name, Size, Mass, Integrety, HitPropability, HitPriority, Energy}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_shield_spec(Energy)),
    ?DBG({ModuleType}),
    ModuleType;
convert({generator, Name, Size, Mass, Integrety, HitPropability, HitPriority, DischargeRate, Output, Capacity, Efficiency}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_generator_spec(Capacity, Output, Capacity, DischargeRate, Efficiency)),
    ?DBG({ModuleType}),
    ModuleType;
convert({hull, Name, Size, Mass, Integrety, HitPropability, HitPriority, Maneuverability}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority,  module:new_hull_spec(Maneuverability)),
    ?DBG({ModuleType}),
    ModuleType;
convert({weapon, Name, Size, Mass, Integrety, HitPropability, HitPriority, Damage, FireRate, Range, Variation, Accuracy, Rotatability, EnergyUsage}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_weapon_spec(Damage, FireRate, Range, Variation, Accuracy, Rotatability, EnergyUsage)),
    ?DBG({ModuleType}),
    ModuleType;
convert(D) ->
    D.
insert(M) ->
    storage:insert(convert(M)).
