%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%% Functions that handle modules, damaging, cycling etc are stored in this module.
%%% @end
%%% Created : 23 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(module).

-include("../../src/epic.hrl").

-export([is_destroyed/1, cycle/1, hit/4]).

%%%===================================================================
%%% API
%%%===================================================================

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

cycle(#module{instance = 
		  #reactor_spec{energy = Energy, 
				output = Output, 
				capacity = Capacity
			       } = Instance} = Module) ->
    Module#module{instance = Instance#reactor_spec{energy = max(Capacity, Output + Energy)}};

cycle(#module{instance = #engine_spec{} = Instance} = Module) ->
    Module#module{instance =Instance#engine_spec{times_used = 0}};

cycle(#module{instance = #weapon_spec{} = Instance} = Module) ->
    Module#module{instance = Instance#weapon_spec{times_used = 0}};

cycle(M) ->
    M.

%%--------------------------------------------------------------------
%% @doc
%% This function abstracts the logic of hitting a module, it takes
%% care of the propability of the hit and also of dealing with
%% destroyed modules. It will call hit/3
%% @spec hit(Module, Damage, Partial, Prop) -> {NewModule, NextDamage, NewPartial}
%% @end
%%--------------------------------------------------------------------

hit(#module{integrety = Integrety, type = #module_type{hit_propability = HitPropability}} = Module, 
    Damage, Partial, Prop) ->
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
    {NewModule, MaxDamage, [{impact, MaxDamage, NewIntegrety} | Partial]};

hit(#module{instance = #armor_spec{
	      damage_absorbation = DamageAbsorbation
	     }} = Module, Damage, Partial) when is_number(Damage) ->
    MaxAbsorbation = min(DamageAbsorbation, Damage),
    case damage(Module, MaxAbsorbation) of
	{#module{} = NewModule, 0} -> 
	    {NewModule, Damage, Partial};
	{#module{integrety = NewIntegrety} = NewModule, ActualAbsorbation} ->
	    {NewModule, Damage - ActualAbsorbation, [{armor_impact, ActualAbsorbation, NewIntegrety} | Partial]}
    end;

hit(#module{instance = #shield_spec{
	      energy = Energy
	     } = Instance} = Module, Damage, Partial) when is_number(Damage) ->
    ShieldDamage = min(Energy, Damage),
    PhysicalDamage = Damage - ShieldDamage,
    {#module{integrety = NewIntegrety} = NewModule, _ActualDamage} = damage(Module, PhysicalDamage),
    {NewModule#module{instance = Instance#shield_spec{
				   energy = Energy - ShieldDamage
				  }}, PhysicalDamage, case ShieldDamage of
							  0 -> Partial;
							  _ -> [{shield_impact, ShieldDamage, NewIntegrety} | Partial]
						      end};


hit(Module, Damage, Partial) when is_number(Damage) ->
    {#module{} = NewModule, _ActualDamage} = damage(Module, Damage),
    {NewModule, Damage, Partial}.

