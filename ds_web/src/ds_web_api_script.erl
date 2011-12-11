-module(ds_web_api_script).

%-include("ds_web.hrl").
-record(session,{
	  uid,
	  name = <<"">>,
	  admin
	 }).

-record(client_state, {
	  db,
	  session,
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
    case pgsql:equery(Db, "DELETE FROM scipts WHERE id = $1", [Id]) of
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
    case pgsql:equery(Db, "SELECT user_id FROM scipts WHERE id = $1", [Id]) of
	{ok, _, [{UId}]} -> 
	    {true, State};
	{ok, _, []} ->
	    {true, State}
    end.

exists(#client_state{
	  id = Id,
	  db = Db
	 } = State) ->
    case pgsql:equery(Db, "SELECT count(*) FROM scipts WHERE id = $1", [Id]) of
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
	pgsql:equery(Db, "INSERT INTO scipts (user_id) VALUES ($1) RETURNING id", [1]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    {<<"/api/v1/script/", Location/binary>>, State#client_state{id = TypeId}};

create(#client_state{
	  id = undefined,
	  session = #session{uid = UId},
	  db = Db} = State) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO scipts (user_id) VALUES ($1) RETURNING id", [UId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    {<<"/api/v1/script/", Location/binary>>, State#client_state{id = TypeId}}.

%%Internal

get_data(#client_state{id = undefined,
		session = #session{admin = 0,
				   uid = UId},
		db = Db}) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM scipts WHERE user_id = $1", [UId]),
    {ok, ds_web_api_handler:flatten_sql_res(SIds)};

get_data(#client_state{id = undefined,
		db = Db}) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM scipts", []),
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
		 {<<"user_id">>, AUId}  -> AUId;
		 false -> UId
	     end,
    Name  = case lists:keyfind(<<"name">>, 1, Obj) of
		{<<"name">>, N} ->
		    N;
		false ->
		    <<"Type ", (list_to_binary(io_lib:format("~p", [Id])))/binary>>
	    end,
    Code = case lists:keyfind(<<"code">>, 1, Obj) of
		   {<<"code">>, SId} ->
		       SId;
		   false ->
		       null
	       end,
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
