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
	 new/7,
	 make/8,
	 select_by_name/1,
	 ensure_id/1,
	 ensure_record/1
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
	 hit_priority/1,
	 hit_priority/2,
	 mass/1,
	 mass/2,
	 size/1,
	 size/2
	]).

%% @type module_type() = {ID,
%%                        Name,
%%                        Integrety,
%%                        HitPropability,
%%                        HitPriority,
%%                        Mass,
%%                        Specs}
%%   ID = binary()
%%   Name = string()
%%   Integrety = integer()
%%   HitPropability = float()
%%   HitPriority = float()
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
%%   <li>HitPriority - The priority of the module to be hit.</li>
%%   <li>Mass - The mass of the Module.</li>
%%   <li>Specs - The specifica of the module type.</li>
%% </ul>
%% @end
-record(module_type, {id, name, size, integrety, hit_propability, hit_priority, mass, specs}).


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

select_by_name(Name) ->
    case  storage:select(
	    module_type, [{#module_type{
			      id='$1',
			      _='_',
			      name=Name
			     }, [], ['$1']}]) of
	{ok, Rows} -> lists:map(
			fun (Id) ->
				{ok, ModuleType} = select(Id),
				ModuleType
			end, Rows);
	_ -> []
    end.
    
make(ID, Name, Size, Integrety, Mass, HitPropability, HitPriority, Specs) when
      is_binary(ID), is_list(Name), 
      is_integer(Integrety), Integrety >= 0,
      is_integer(Mass), Mass >= 0,
      is_float(HitPropability), 0 =< HitPropability,  HitPropability =< 1,
      is_float(HitPriority), 0 =< HitPriority,  HitPriority =< 1 
      ->
    #module_type{ 
      id=ID,
      name=Name,
      size=Size,
      integrety=Integrety,
      mass = Mass,
      hit_propability=HitPropability,
      hit_priority=HitPriority,
      specs=Specs
     }.


%%--------------------------------------------------------------------
%% @doc
%% This function creates a new module type and returns it's UUID.
%% module type.
%% @spec new(Name, Size, Integrety, Mass, HitPropability, HitPriority, Specs) -> {ok, Unit}
%% @end
%%--------------------------------------------------------------------

new(Name, Size, Integrety, Mass, HitPropability, HitPriority, Specs) when
      is_list(Name), 
      is_integer(Integrety), Integrety >= 0,
      is_integer(Mass), Mass >= 0,
      is_float(HitPropability), 0 =< HitPropability,  HitPropability =< 1,
      is_float(HitPriority), 0 =< HitPriority,  HitPriority =< 1 
      ->
    {ok, make(uuid:v4(), Name, Size, Integrety, Mass, HitPropability, HitPriority, Specs)}.


specs(#module_type{specs = Specs}) ->
    Specs.
specs(ModuleType, Specs) ->
    ModuleType#module_type{specs = Specs}.


id(#module_type{id = ID})->
    ID.
id(ModuleType, ID) when is_binary(ID) ->
    ModuleType#module_type{id = ID}.


integrety(#module_type{integrety = Integrety}) ->
    Integrety.
integrety(ModuleType, Integrety) when
      is_integer(Integrety), Integrety >= 0 ->
    ModuleType#module_type{integrety = Integrety}.

hit_propability(#module_type{hit_propability = HitPropability}) ->
    HitPropability.
hit_propability(ModuleType, HitPropability) when
      is_float(HitPropability), 0 =< HitPropability,  HitPropability =< 1 ->
    ModuleType#module_type{hit_propability = HitPropability}.

hit_priority(#module_type{hit_priority = HitPriority}) ->
    HitPriority.
hit_priority(ModuleType, HitPriority) when
      is_float(HitPriority), 0 =< HitPriority,  HitPriority =< 1 ->
    ModuleType#module_type{hit_priority = HitPriority}.


mass(#module_type{mass = Mass}) ->
    Mass.
mass(ModuleType, Mass) when
      is_integer(Mass), Mass >= 0 ->
    ModuleType#module_type{mass = Mass}.


size(#module_type{size = Size}) ->
    Size.
size(ModuleType, Size) when
      is_integer(Size), Size >= 0 ->
    ModuleType#module_type{size = Size}.


fields() ->
    record_info(fields,module_type).

is_a(#module_type{}) ->
    true;
is_a(_) ->
    false.

ensure_id(ModuleType) when is_binary(ModuleType) ->
    ModuleType;
ensure_id(#module_type{id = ID})->
    ID.

ensure_record(#module_type{} = ModuleType)->
    ModuleType;
ensure_record(ModuleType) when is_binary(ModuleType) ->
    {ok, M} = select(ModuleType),
    M.
