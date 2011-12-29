-module(ds_web_api_shiptype).

%-include("ds_web.hrl").
-record(session,{
	  uid,
	  name = <<"">>,
	  admin
	 }).

-record(client_state, {
	  pid,
	  id,
	  method,
	  resource,
	  session,
	  db}).

-export([
	 get_sub_handler/3,
	 delete/2,
	 forbidden/3,
	 create/3,
	 exists/2,
	 list_resources/1,
	 list_resources_for_parent/2,
	 get_data/2,
	 get_owner/2,
	 put_data/3]).

%% Implementation


get_sub_handler(_Parent, This, [<<"module">>]) ->
    {This, ds_web_api_module, undefined};

get_sub_handler(_Parent, This, [<<"module">>, Id]) ->
    {This, ds_web_api_module, list_to_integer(binary_to_list(Id))};

get_sub_handler(Parent, This, []) ->
    {Parent, ds_web_api_shiptype, This}.


delete(Db, Id) ->
    case pgsql:equery(Db, "DELETE FROM shiptypes WHERE id = $1", [Id]) of
	{ok, 1} ->
	    true;
	{ok, 0} ->
	    false;
	E -> 
	    false
    end.

forbidden(Db, Id, UId) ->
    case pgsql:equery(Db, "SELECT user_id FROM shiptypes WHERE id = $1", [Id]) of
	{ok, _, [{UId}]} -> 
	    true;
	{ok, _, []} ->
	    true
    end.

exists(Db, Id) ->
    case pgsql:equery(Db, "SELECT count(*) FROM shiptypes WHERE id = $1", [Id]) of
	{ok, _, [{1}]} ->
	    true;
	_ -> 
	    false
    end.

create(Db, UId, UId) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO shiptypes (user_id) VALUES ($1) RETURNING id", [UId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    {<<"/api/v1/user/", UIdStr/binary, "/shiptype/", Location/binary>>, TypeId}.


%%Internal


list_resources(Db) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id, name FROM shiptypes"),
    List = lists:map(fun ({Id, Name}) ->
			     [{<<"id">>, Id},
			      {<<"name">>, Name}]
		     end, SIds),
    {ok, List}.

list_resources_for_parent(Db, UId) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id, name FROM shiptypes WHERE user_id = $1", [UId]),
    List = lists:map(fun ({Id, Name}) ->
			     [{<<"id">>, Id},
			      {<<"name">>, Name}]
		     end, SIds),
    {ok ,List}.

get_owner(Db, Id) ->
    {ok, _, [{Owner}]} =
	pgsql:equery(Db, "SELECT user_id FROM shiptypes where id = $1", [Id]),
    {ok, Owner}.

get_data(Db, Id) ->
    {ok, get_obj(Db, Id)}.

put_data(Db, Id, Obj) ->
    {<<"user_id">>, UserId} = lists:keyfind(<<"user_id">>, 1, Obj),
    {<<"name">>, Name} = lists:keyfind(<<"name">>, 1, Obj),
    <<"Type ", (list_to_binary(io_lib:format("~p", [Id])))/binary>>,
    {<<"script_id">>, ScriptId} = lists:keyfind(<<"script_id">>, 1, Obj),
    {ok, _, _, [{RespId, UserId, Name, ScriptId}]} = 
	pgsql:equery(Db, "UPDATE shiptypes SET user_id = $2, name = $3, script_id = $4" ++ 
			 "WHERE id = $1 RETURNING id, user_id, name, script_id", [Id, UserId, Name, ScriptId]),
    {ok, 
     [{<<"id">>, RespId},
      {<<"user_id">>, UserId},
      {<<"name">>, Name},
      {<<"script_id">>, ScriptId}]}.

get_obj(Db, Id) ->
    {ok, _, [{RespId, UserId, Name, ScriptId}]} =
	pgsql:equery(Db, "SELECT id, user_id, name, script_id FROM shiptypes WHERE id = $1", [Id]),
    {ok, _, MIds} = 
	pgsql:equery(Db, "SELECT id, name  FROM modules WHERE ship_id = $1", [Id]),
    List = lists:map(fun ({Id, Name}) ->
			     [{<<"id">>, Id},
			      {<<"name">>, Name}]
		     end, MIds),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"name">>, Name},
     {<<"script_id">>, ScriptId},
     {<<"modules">>, List}].
