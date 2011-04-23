%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 22 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------


-record(module_type, {id, name, integrety, specs}).

-record(module, {id, type, integrety}).

-record(unit_type, {id, name}).

-record(unit, {id, modules = []}).

-record(fleet, {id, name, units = []}).

-record(fight, {id, fleets = []}).
