-module(ds_web_api_script).
-behaviour(ds_web_api_behaviour).

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
%% REST

%% Init Section


%% Implementation

get_sub_handler(Parent, This, _Path) ->
    {Parent, ds_web_api_script, This}.

delete(Db, Id) ->
    case pgsql:equery(Db, "DELETE FROM scripts WHERE id = $1", [Id]) of
	{ok, 1} ->
	    true;
	{ok, 0} -> 
	    false;
	_Error ->
	    false
    end.

forbidden(Db, Id, UId) ->
    case pgsql:equery(Db, "SELECT user_id FROM scripts WHERE id = $1", [Id]) of
	{ok, _, [{UId}]} -> 
	    false;
	{ok, _, []} ->
	    true
    end.

exists(Db, Id) ->
    case pgsql:equery(Db, "SELECT count(*) FROM scripts WHERE id = $1", [Id]) of
	{ok, _, [{1}]} ->
	    true;
	_ -> 
	    false
    end.

create(Db, UId, [{user, UId}]) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO scripts (user_id) VALUES ($1) RETURNING id", [UId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    {<<"/api/v1/user/", UIdStr/binary, "/script/", Location/binary>>, TypeId}.

%%Internal


list_resources(Db) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id, name FROM scripts"),
    List = lists:map(fun ({Id, Name}) ->
			     [{<<"id">>, Id},
			      {<<"name">>, Name}]
		     end, SIds),
    {ok, List}.

list_resources_for_parent(Db, [{user, UId}]) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id, name FROM scripts WHERE user_id = $1", [UId]),
    List = lists:map(fun ({Id, Name}) ->
			     [{<<"id">>, Id},
			      {<<"name">>, Name}]
		     end, SIds),
    {ok ,List}.

get_owner(Db, Id) ->
    {ok, _, [{Owner}]} =
	pgsql:equery(Db, "SELECT user_id FROM scripts where id = $1", [Id]),
    {ok, Owner}.

get_data(Db, Id) ->
    {ok, get_obj(Db, Id)}.

put_data(Db, Id, Obj) ->
    {<<"user_id">>, UserId} = lists:keyfind(<<"user_id">>, 1, Obj),
    {<<"name">>, Name} = lists:keyfind(<<"name">>, 1, Obj),
    {<<"code">>, Code} = lists:keyfind(<<"code">>, 1, Obj),
    {ok, _, _, [{RespId, UserId, Name, Code}]} = 
	pgsql:equery(Db, "UPDATE scripts SET user_id = $2, name = $3, code = $4" ++ 
			 "WHERE id = $1 RETURNING id, user_id, name, code", [Id, UserId, Name, Code]),
    {ok, 
     [{<<"id">>, RespId},
      {<<"user_id">>, UserId},
      {<<"name">>, Name},
      {<<"code">>, Code}]}.

get_obj(Db, Id) ->
    {ok, _, [{RespId, UserId, Name, Code}]} =
	pgsql:equery(Db, "SELECT id, user_id, name, code FROM scripts WHERE id = $1", [Id]),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"name">>, Name},
     {<<"code">>, Code}].
