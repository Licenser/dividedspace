-module(ds_web_api_module).

-behaviour(ds_web_api_behaviour).

%-include("ds_web.hrl").

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

get_sub_handler(Parent, This, []) ->
    {Parent, ds_web_api_module, This}.


delete(Db, Id) ->
    case pgsql:equery(Db, "DELETE FROM modules WHERE id = $1", [Id]) of
	{ok, 1} ->
	    true;
	_ -> 
	    false
    end.

forbidden(Db, Id, UId) ->
    case pgsql:equery(Db, "SELECT user_id FROM modules WHERE id = $1", [Id]) of
	{ok, _, [{UId}]} -> 
	    true;
	{ok, _, []} ->
	    true
    end.

exists(Db, Id) ->
    case pgsql:equery(Db, "SELECT count(*) FROM modules WHERE id = $1", [Id]) of
	{ok, _, [{1}]} ->
	    true;
	_ -> 
	    false
    end.

create(Db, UId, PId) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO modules (user_id, ship_id) VALUES ($1, $2) RETURNING id", [UId, PId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    PIdStr = list_to_binary(io_lib:format("~p", [PId])),
    {<<"/api/v1/user/", UIdStr/binary, "/shiptype/", PIdStr/binary, "/module/", Location/binary>>, TypeId}.

%%Internal

list_resources(Db) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id, name FROM scripts"),
    List = lists:map(fun ({Id, Name}) ->
			     [{<<"id">>, Id},
			      {<<"name">>, Name}]
		     end, SIds),
    {ok, List}.

list_resources_for_parent(Db, PId) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id, name FROM modules WHERE ship_id = $1", [PId]),
    List = lists:map(fun ({Id, Name}) ->
			     [{<<"id">>, Id},
			      {<<"name">>, Name}]
		     end, SIds),
    {ok ,List}.

get_owner(Db, Id) ->
    {ok, _, [{Owner}]} =
	pgsql:equery(Db, "SELECT user_id FROM modules where id = $1", [Id]),
    {ok, Owner}.

get_data(Db, Id) ->
    {ok, get_obj(Db, Id)}.

put_data(Db, Id, Obj) ->
    {<<"user_id">>, UserId} = lists:keyfind(<<"user_id">>, 1, Obj),
    {<<"ship_id">>, ShipId} = lists:keyfind(<<"ship_id">>, 1, Obj),
    {<<"name">>, Name}  = lists:keyfind(<<"name">>, 1, Obj),
    {ok, _, _, [{RespId, UserId, ShipId, Name}]} = 
	pgsql:equery(Db, "UPDATE modules SET user_id = $2, ship_id = $3, name = $4" ++ 
			 "WHERE id = $1 RETURNING id, user_id, ship_id, name", [Id, UserId, ShipId, Name]),
    {ok, 
     [{<<"id">>, RespId},
      {<<"user_id">>, UserId},
      {<<"ship_id">>, ShipId},
      {<<"name">>, Name}]}.

get_obj(Db, Id) ->
    {ok, _, [{RespId, UserId, ShipId, Name}]} =
	pgsql:equery(Db, "SELECT id, user_id, ship_id, name FROM modules WHERE id = $1", [Id]),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"ship_id">>, ShipId},
     {<<"name">>, Name}].
