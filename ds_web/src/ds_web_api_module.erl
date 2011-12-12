-module(ds_web_api_module).

						%-include("ds_web.hrl").
-record(session,{
	  uid,
	  name = <<"">>,
	  admin
	 }).

-record(client_state, {
	  db,
	  session,
	  property,
	  path,
	  method,
	  id
	 }).


-export([delete/1,
	 forbidden/1,
	 create/1,
	 exists/1,
	 get_data/1,
	 put_data/2]).

%% REST

%% Init Section

%% Implementation

delete(#client_state{id = Id,
		     db=Db} = State) ->
    case pgsql:equery(Db, "DELETE FROM modules WHERE id = $1", [Id]) of
	{ok, 1} ->
	    {true, State};
	{ok, 0} ->
	    {false, State};
	E -> 
	    {false, State}
    end.

forbidden(#client_state{id = Id,
			session = #session{uid = UId},
			db=Db} = State) ->
    case pgsql:equery(Db, "SELECT user_id FROM modules WHERE id = $1", [Id]) of
	{ok, _, [{UId}]} -> 
	    {true, State};
	{ok, _, []} ->
	    {true, State}
    end.

exists(#client_state{
	  id = Id,
	  db = Db
	 } = State) ->
    case pgsql:equery(Db, "SELECT count(*) FROM modules WHERE id = $1", [Id]) of
	{ok, _, [{1}]} ->
	    {true, State};
	_ -> 
	    {false, State}
    end.

create(#client_state{
	  id = undefined,
	  session = undefined,
	  db = Db} = State) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO modules (user_id) VALUES ($1) RETURNING id", [1]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    {<<"/api/v1/module/", Location/binary>>, State#client_state{id = TypeId}};

create(#client_state{
	  id = undefined,
	  session = #session{uid = UId},
	  db = Db} = State) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO modules (user_id) VALUES ($1) RETURNING id", [UId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    {<<"/api/v1/module/", Location/binary>>, State#client_state{id = TypeId}}.

%%Internal

get_data(#client_state{id = undefined,
		       session = #session{admin = 0,
					  uid = UId},
		       db = Db}) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM modules WHERE user_id = $1", [UId]),
    {ok, ds_web_api_handler:flatten_sql_res(SIds)};

get_data(#client_state{
	    id = undefined,
	    db = Db}) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM modules", []),
    {ok, ds_web_api_handler:flatten_sql_res(SIds)};


get_data(#client_state{id = Id, 
		       db = Db}) ->
    {ok, get_obj(Db, Id)}.

put_data(Obj, #client_state{id = Id,
			    session = undefined,
			    db = Db} = State) ->
    put_data(Obj, State#client_state{session = #session{uid = 1}});

put_data(Obj, #client_state{id = Id,
			    session = #session{uid = UId},
			    db = Db}) ->
    UserId = case lists:keyfind(<<"user_id">>, 1, Obj) of
		 {<<"user_id">>, AUId}  -> 
		     AUId;
		 false -> 
		     UId
	     end,
    ShipId = case lists:keyfind(<<"ship_id">>, 1, Obj) of
		 {<<"ship_id">>, SId} ->
		     SId;
		 false ->
		     null
	     end,
    Name  = case lists:keyfind(<<"name">>, 1, Obj) of
		{<<"name">>, N} ->
		    N;
		false ->
		    <<"Type ", (list_to_binary(io_lib:format("~p", [Id])))/binary>>
	    end,
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
