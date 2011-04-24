%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 22 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------


%% -------------------------------------------------------------------
%% -------------------------------------------------------------------


-record(module_type, {id, name, integrety, hit_propability, specs}).

-record(unit_type, {id, name}).

%% -------------------------------------------------------------------
%% -------------------------------------------------------------------

-record(module, {id, type, integrety, instance}).

%% -------------------------------------------------------------------
%% -------------------------------------------------------------------

-record(unit, {id, modules = []}).

-record(fleet, {id, name, units = []}).

-record(fight, {id, fleets = []}).


%% -------------------------------------------------------------------
%% -------------------------------------------------------------------


-record(hull_spec, {}).

-record(reactor_spec, {capacity, output, energy}).

-record(engine_spec, {times_used = 0}).

-record(weapon_spec, {times_used = 0}).

-record(armor_spec, {damage_absorbation}).

-record(shield_spec, {energy}).

%% -------------------------------------------------------------------
%% -------------------------------------------------------------------

-record(module_hit, {module, damage, continue, partial}).

-record(hit_result, {type, damage, hp}).
