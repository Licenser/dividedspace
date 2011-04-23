%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 22 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------

-module(storage).
-include_lib("stdlib/include/qlc.hrl"). 
-include("epic.hrl").


%% API
-export([ % Global
	  init/0
	]).

-export([ % News
	  new_module_type/3,
	  new_module/1,
	  new_unit/1
	]).
-export([ % Inserts
	  insert_module_type/4,
	  insert_module/3,
	  insert_unit/2
	]).

-export([ % Selects
	  select/1,
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
%% @spec
%% @end
%%--------------------------------------------------------------------

insert(Element) ->
    Fun = fun() ->
		  mnesia:write(Element)
	  end,
    mnesia:transaction(Fun).

insert_module_type( Index, Name, Integrety, Specs) when is_integer(Integrety) ->
    insert(#module_type{ 
	      id=Index,
	      name=Name,
	      specs=Specs,
	      integrety=Integrety
	     }).

insert_module( Index, Type, Integrety) when is_integer(Integrety) ->
    insert(#module{ 
	      id=Index,
	      type=Type,
	      integrety=Integrety
	     }).

insert_unit( Index, Modules) ->
    insert(#unit{ id=Index,
		  modules=Modules}).

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

new_module_type( Name, Integrety, Specs ) when is_integer(Integrety)->
    UUID = uuid:v4(),
    insert_module_type( UUID, Name, Integrety, Specs),
    {ok, UUID}.

new_module(Type) ->
    case select_module_type(Type) of
	{ok, #module_type{integrety=Integrety}} -> 
	    UUID = uuid:v4(),
	    insert_module(UUID, Type, Integrety),
	    {ok, UUID};
	{error,not_found} -> {error, unknown_module_type}
    end.
							

new_unit(Modules) ->
    UUID = uuid:v4(),
    insert_unit( UUID, Modules),
    {ok, UUID}.
    
%%--------------------------------------------------------------------
%% @doc
%% @spec
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

select_module_type(Index) ->
    select({module_type, Index}).

select_module(Index) ->
    select({module, Index}).

select_unit(Index) ->
    select({unit, Index}).

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

implode_module(#module{type = #module_type{id = TypeID}} = M) ->
    M#module{type = TypeID};
implode_module(#module{} = M) ->
    M.

implode_unit(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun (#module{id = ID}) -> ID end, Ms)}.


%%--------------------------------------------------------------------
%% @doc
%% @spec
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

explode_unit(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun explode_module/1,Ms)}.


%%%===================================================================
%%% Internal functions
%%%===================================================================
