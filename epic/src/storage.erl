%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%% This module offers a interface to the Storage System, it is used
%%% to access the Database.
%%% @end
%%% Created : 22 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------

-module(storage).
-include_lib("stdlib/include/qlc.hrl"). 

%% API
-export([ % Global
	  init/0,
	  insert/1
	]).

-export([ % Selects
	  select/1,
	  select/2
	]).

-export([ % Data impoding and exploding
	  explode/1,
	  implode/1
	]).
	 
-record(fleet, {id, name, units = []}).

-record(fight, {id, fleets = []}).



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
    case mnesia:create_table(module_type,
			     [{ram_copies, [node()]},
			       {attributes,
				module_type:fields()}]) of
	%{atomic, ok} -> loader:load();
	R -> R
    end,
    mnesia:create_table(module,
			[ {ram_copies, [node()] },
			  {attributes,      
			   module:fields()} ]),
    mnesia:create_table(unit,
			[ {ram_copies, [node()] },
			  {attributes,      
			   unit:fields()} ]),
    mnesia:create_table(fleet,
			[ {ram_copies, [node()] },
			  {attributes,      
			   record_info(fields,fleet)} ]),
    mnesia:create_table(fight,
			[ {ram_copies, [node()] },
			  {attributes,      
			   record_info(fields,fight)} ]).

%%--------------------------------------------------------------------
%% @doc
%% This function is used to explode a database object, it replaces
%% all other object by the references to them.
%% @spec implode(Object) -> ImplodedObject
%% @end
%%--------------------------------------------------------------------

implode(Other) ->
    case module:is_a(Other) of
	true -> module:implode(Other);
	false -> case unit:is_a(Other) of
		     true -> unit:implode(Other);
		     false -> Other
		 end
    end.

%%--------------------------------------------------------------------
%% @doc
%% This function is used to explode a database object, it replaces
%% all references to another object by the data of this other database
%% object.
%% @spec explode(Object) -> ExplodedObject
%% @end
%%--------------------------------------------------------------------

explode(Other) ->
    case module:is_a(Other) of
	true -> module:explode(Other);
	false -> case unit:is_a(Other) of
		     true -> unit:explode(Other);
		     false -> Other
		 end
    end.

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
%% This wrapps the database select into a form that can easiely be6
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
	{aborted, R} -> {error, R};
	_ -> {error, not_found}
    end.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This wrapps the database select into a form that can easiely be
%% called, and returns the result or a handable error.
%% @spec select(Table, Select) -> {ok, Row} |
%%                         {error, not_found}
%% @end
%%--------------------------------------------------------------------

select(Table, Select) when is_atom(Table) ->
    Fun = 
        fun() ->
		mnesia:select(Table, Select)
        end,
    case mnesia:transaction(Fun) of      
	{atomic, Rows} -> {ok, Rows};
	{aborted, R} -> {error, R}
    end.
