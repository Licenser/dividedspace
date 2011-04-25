%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 24 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(module_type).

-export([
	 fields/0,
	 is_a/1,
	 select/1,
	 new/4,
	 make/5
	 ]).

-export([
	 id/1,
	 id/2,
	 integrety/1,
	 integrety/2,
	 specs/1,
	 specs/2,
	 hit_propability/1,
	 hit_propability/2,
	 mass/1,
	 mass/2
	]).

%% @type module_type() = {ID,
%%                        Name,
%%                        Integrety,
%%                        HitPropability,
%%                        Mass,
%%                        Specs}
%%   ID = binary()
%%   Name = string()
%%   Integrety = integer()
%%   HitPropability = float()
%%   Mass = integer()
%%   Specs = hull_spec() | reactor_spec() | engine_spec() |
%%           weapon_spec() | armor_spec() | shield_spec().
%%
%% <p>
%% This represents the specifica of ships hull.
%% </p>
%% <ul>
%%   <li>ID - The ID of the module type.</li>
%%   <li>Name - The Name of the module type.</li>
%%   <li>Integrety - The integrety of the module type.</li>
%%   <li>HitPropability - The chance of this module being hit.</li>
%%   <li>Mass - The mass of the Module.</li>
%%   <li>Specs - The specifica of the module type.</li>
%% </ul>
%% @end
-record(module_type, {id, name, integrety, hit_propability, mass, specs}).


%%--------------------------------------------------------------------
%% @doc
%% This function tries to fetch a ModuleType record from the database,
%% and returns it or an error.
%% @spec select(Index) -> {ok, ModuleType} |
%%                        {error, not_found}
%% @end
%%--------------------------------------------------------------------

select(Index) ->
    storage:select({module_type, Index}).

make(ID, Name, Integrety, HitPropability, Specs) ->
    #module_type{ 
     id=ID,
     name=Name,
     integrety=Integrety,
     hit_propability=HitPropability,
     specs=Specs
    }.


%%--------------------------------------------------------------------
%% @doc
%% This function creates a new module type and returns it's UUID.
%% module type.
%% @spec new(Name, Integrety, HitPropability, Specs) -> UUID
%% @end
%%--------------------------------------------------------------------

new(Name, Integrety, HitPropability, Specs) ->
    {ok, make(uuid:v4(), Name, Integrety, HitPropability, Specs)}.


specs(#module_type{specs = Specs}) ->
    Specs.
specs(ModuleType, Specs) ->
    ModuleType#module_type{specs = Specs}.


id(#module_type{id = ID}) ->
    ID.
id(ModuleType, ID) ->
    ModuleType#module_type{id = ID}.


integrety(#module_type{integrety = Integrety}) ->
    Integrety.
integrety(ModuleType, Integrety) ->
    ModuleType#module_type{integrety = Integrety}.
    
hit_propability(#module_type{hit_propability = HitPropability}) ->
    HitPropability.
hit_propability(ModuleType, HitPropability) ->
    ModuleType#module_type{hit_propability = HitPropability}.

mass(#module_type{mass = Mass}) ->
    Mass.
mass(ModuleType, Mass) ->
    ModuleType#module_type{mass = Mass}.


fields() ->
    record_info(fields,module_type).

is_a(#module_type{}) ->
    true;
is_a(_) ->
    false.

