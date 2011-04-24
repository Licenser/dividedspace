%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%% This module offers a interface to the Storage System, it is used
%%% to access the Database.
%%% @end
%%% Created : 22 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------

-module(storage).
-include_lib("stdlib/include/qlc.hrl"). 
-include("../../src/epic.hrl").


%% API
-export([ % Global
	  init/0,
	  reset/1
	]).

-export([ % News
	  new_module_type/4,
	  new_module/1,
	  new_unit/1
	]).

-export([ % Selects
	  select_module_type/1,
	  select_module/1,
	  select_unit/1
	]).

-export([ % Explodes
	  explode_module/1,
	  explode_unit/1
	]).

-export([ % Implodes
	  implode_module/1,
	  implode_unit/1
	]).
	 


%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% This function initializes the Database and tables.
%% @spec init() -> ok
%% @end
%%--------------------------------------------------------------------


init() ->
    uuid:init(),
    mnesia:create_schema([node()]),
    mnesia:start(),
    mnesia:create_table(module_type,
			[ {disc_copies, [node()] },
			  {attributes,      
			   record_info(fields,module_type)} ]),
    mnesia:create_table(module,
			[ {disc_copies, [node()] },
			  {attributes,      
			   record_info(fields,module)} ]),
    mnesia:create_table(unit,
			[ {disc_copies, [node()] },
			  {attributes,      
			   record_info(fields,unit)} ]),
    mnesia:create_table(fleet,
			[ {disc_copies, [node()] },
			  {attributes,      
			   record_info(fields,fleet)} ]),
    mnesia:create_table(fight,
			[ {disc_copies, [node()] },
			  {attributes,      
			   record_info(fields,fight)} ]).
    




%%--------------------------------------------------------------------
%% @doc
%% This function is used to reset a module to the defaults of the
%% module type. It handles exploded and non exploded Modules.
%% @spec reset(Module) -> NewModule
%% @end
%%--------------------------------------------------------------------

reset(#module{type = #module_type{integrety = Integrety, specs = Specs}} = Module) ->
    Module#module{integrety = Integrety, instance = Specs};

reset(#module{type = TypeID} = Module) ->
    #module_type{integrety = Integrety, specs = Specs} = storage:slect_module_type(TypeID),
    Module#module{integrety = Integrety, instance = Specs}.

%%--------------------------------------------------------------------
%% @doc
%% This function creates a new module type and returns it's UUID.
%% module type.
%% @spec new_module_type(Name, Integrety, HitPropability, Specs) -> UUID
%% @end
%%--------------------------------------------------------------------

new_module_type(Name, Integrety, HitPropability, Specs) ->
    UUID = uuid:v4(),
    insert_module_type(UUID, Name, Integrety, HitPropability, Specs),
    {ok, UUID}.

%%--------------------------------------------------------------------
%% @doc
%% This function creates a new module, it checks if the Type passed is
%% a valid UUID and fetches it's specs and integrety to set up the 
%% module up correctly.
%% module type.
%% @spec new_module(Type) -> UUID
%% @end
%%--------------------------------------------------------------------

new_module(Type) ->
    case select_module_type(Type) of
	{ok, #module_type{integrety=Integrety,
			  specs=Specs}} -> 
	    UUID = uuid:v4(),
	    insert_module(UUID, Type, Integrety, Specs),
	    {ok, UUID};
	{error,not_found} -> {error, unknown_module_type}
    end.

%%--------------------------------------------------------------------
%% @doc
%% This function creates a new unit. Modules are not checked!
%% module type.
%% @spec new_unit(Modules) -> UUID
%% @end
%%--------------------------------------------------------------------
							

new_unit(Modules) ->
    UUID = uuid:v4(),
    insert_unit(UUID, Modules),
    {ok, UUID}.

%%--------------------------------------------------------------------
%% @doc
%% This function tries to fetch a ModuleType record from the database,
%% and returns it or an error.
%% @spec select_module_type(Index) -> {ok, ModuleType} |
%%                                    {error, not_found}
%% @end
%%--------------------------------------------------------------------

select_module_type(Index) ->
    select({module_type, Index}).

%%--------------------------------------------------------------------
%% @doc
%% This function tries to fetch a Module record from the database,
%% and returns it or an error.
%% @spec select_module(Index) -> {ok, Module} |
%%                               {error, not_found}
%% @end
%%--------------------------------------------------------------------

select_module(Index) ->
    select({module, Index}).

%%--------------------------------------------------------------------
%% @doc
%% This function tries to fetch a Unit record from the database,
%% and returns it or an error.
%% @spec select_unit(Index) -> {ok, Unit} |
%%                             {error, not_found}
%% @end
%%--------------------------------------------------------------------

select_unit(Index) ->
    select({unit, Index}).

%%--------------------------------------------------------------------
%% @doc
%% This function is used to implode a exploded module, replacing all
%% exploded data to the refferencing uuid's.
%% @spec implode_module(Module) -> ImplodedModule
%% @end
%%--------------------------------------------------------------------

implode_module(#module{type = #module_type{id = TypeID}} = M) ->
    M#module{type = TypeID};
implode_module(#module{} = M) ->
    M.

%%--------------------------------------------------------------------
%% @doc
%% This function is used to implode a exploded unit, replacing all
%% exploded data to the refferencing uuid's.
%% @spec implode_unit(Unit) -> ImplodedUnit
%% @end
%%--------------------------------------------------------------------

implode_unit(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun (#module{id = ID}) -> ID end, Ms)}.

%%--------------------------------------------------------------------
%% @doc
%% This function is used to explode a module, replacing all uuids
%% by the refferenced data.
%% @spec explode_module(Module) -> ExplodedModule
%% @end
%%--------------------------------------------------------------------

explode_module(#module{type = #module_type{}} = M) ->
    M;
explode_module(#module{type = TypeID} = M) ->
    {ok, Type} = select_module_type(TypeID),
    M#module{type = Type};
explode_module(M) ->
    {ok, M1} = select_module(M),
    explode_module(M1).

%%--------------------------------------------------------------------
%% @doc
%% This function is used to explode a unit, replacing all uuids
%% by the refferenced data.
%% @spec explode_unit(Unit) -> ExplodedUnit
%% @end
%%--------------------------------------------------------------------

explode_unit(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun explode_module/1,Ms)}.


%%%===================================================================
%%% Internal functions
%%%===================================================================


%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function inserts an element into the database.
%% @spec insert(Element) -> ok
%% @end
%%--------------------------------------------------------------------

insert(Element) ->
    Fun = fun() ->
		  mnesia:write(Element)
	  end,
    mnesia:transaction(Fun).

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function inserts a module type into the database.
%% @spec insert_module_type(Index, Name, Integrety, HitPropability, Specs) -> ok
%% @end
%%--------------------------------------------------------------------

insert_module_type(Index, Name, Integrety, HitPropability, Specs) ->
    insert(#module_type{ 
	      id=Index,
	      name=Name,
	      integrety=Integrety,
	      hit_propability=HitPropability,
	      specs=Specs
	     }).

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function inserts a module into the database.
%% @spec insert_module(Index, Type, Integrety, Specs) -> ok
%% @end
%%--------------------------------------------------------------------

insert_module(Index, Type, Integrety, Specs) ->
    insert(#module{ 
	      id=Index,
	      type=Type,
	      integrety=Integrety,
	      instance=Specs
	     }).

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function inserts a unit into the database.
%% @spec insert_unit(Index, Modules) -> ok
%% @end
%%--------------------------------------------------------------------

insert_unit(Index, Modules) ->
    insert(#unit{ 
	      id=Index,
	      modules=Modules
	     }).

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This wrapps the database select into a form that can easiely be
%% called, and returns the result or a handable error.
%% @spec select(Select) -> {ok, Row} |
%%                         {error, not_found}
%% @end
%%--------------------------------------------------------------------

select(Select) ->
    Fun = 
        fun() ->
		mnesia:read(Select)
        end,
    case mnesia:transaction(Fun) of      
	{atomic, [Row]} -> {ok, Row};
	_ -> {error, not_found}
    end.

