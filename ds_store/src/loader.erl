%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 25 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(loader).

-export([
	 load/0,
	 load/1
	]).


load() ->
    load("data/armor.erl") ++
	load("data/engines.erl") ++
	load("data/generators.erl") ++
	load("data/shields.erl") ++
	load("data/weapons.erl") ++
	load("data/hulls.erl").

load(File) ->
    {ok, Modules} = file:consult(File),
    lists:map(fun insert/1, Modules).


convert({armor, Name, Size, Mass, Integrety, HitPropability, HitPriority, DamageAbsorbtion}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_armor_spec(DamageAbsorbtion)),
    ModuleType;
convert({engine, Name, Size, Mass, Integrety, HitPropability, HitPriority, EnergyUsage, Range}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_engine_spec(EnergyUsage, Range)),
    ModuleType;
convert({shield, Name, Size, Mass, Integrety, Energy}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, 1.0, 1.0, module:new_shield_spec(Energy)),
    ModuleType;
convert({generator, Name, Size, Mass, Integrety, HitPropability, HitPriority, DischargeRate, Output, Capacity, Efficiency}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_generator_spec(Capacity, Output, Capacity, DischargeRate, Efficiency)),
    ModuleType;
convert({hull, Name, Size, Mass, Integrety, Maneuverability}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, 1.0, 0.0, module:new_hull_spec(Maneuverability)),
    ModuleType;
convert({weapon, Name, Size, Mass, Integrety, HitPropability, HitPriority, Damage, FireRate, Range, Variation, Accuracy, Rotatability, EnergyUsage}) ->
    {ok, ModuleType} = module_type:new(Name, Size, Integrety, Mass, HitPropability, HitPriority, module:new_weapon_spec(Damage, FireRate, Range, Variation, Accuracy, Rotatability, EnergyUsage)),
    ModuleType;
convert(D) ->
    D.
insert(M) ->
    storage:insert(convert(M)).
