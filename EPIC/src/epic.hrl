-record(module_type, {id, name, integrety, specs}).

-record(module, {id, type, integrety}).

-record(unit_type, {id, name}).

-record(unit, {id, modules = []}).

-record(fleet, {id, name, units = []}).

-record(fight, {id, fleets = []}).
