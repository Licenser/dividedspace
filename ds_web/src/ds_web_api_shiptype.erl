-module(ds_web_api_shiptype).
-export([init/3]).

%-include("ds_web.hrl").
-record(session,{
	  uid,
	  name = <<"">>,
	  admin
	 }).

-record(state, {
	  db,
	  session,
	  path,
	  method,
	  id
	  }).

-export([rest_init/2,
	 is_authorized/2,
	 forbidden/2,
	 allowed_methods/2,
	 content_types_provided/2,
	 content_types_accepted/2,
	 post_is_create/2,
	 create_path/2,
	 charsets_provided/2,
	 delete_resource/2,
	 delete_completed/2,
	 resource_exists/2,
	 options/2
	]).

-export([to_json/2,
	 from_json/2
	]).

init({tcp, http}, Req, Opts) ->
    {upgrade, protocol, cowboy_http_rest}.

handle(Req, State) ->
    {ok, Req, State}.

terminate(Req, State) ->
    ok.

%% REST

%% Init Section
rest_init(Req, [Db]) ->
    Session = ds_web_session:get(Req),
    {[<<"api">>, <<"v1">>, <<"shiptype">> | Path], _} = cowboy_http_req:path(Req),
    Id = case Path of
	     [] -> undefined;
	     [IdStr] -> 
		 list_to_integer(binary_to_list(IdStr))
	 end,
    {Method, _} = cowboy_http_req:method(Req),
    {ok, Req, #state{
	   session = Session,
	   method = Method,
	   path = Path,
	   id = Id,
	   db = Db
	  }}.

post_is_create(Req, State) ->
    {true, Req, State}.

allow_missing_post(Req, State) ->
    {false, Req, State}.

allowed_methods(Req, State) ->
    Methods = ['GET', 'HEAD', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    {Methods, Req, State}.

charsets_provided(Req, State) ->
    Charsets = [<<"*">>],
    {Charsets, Req, State}.

content_types_provided(Req, State) ->
    ContentTypes = [
		    {{<<"application">>, <<"json">>, []}, to_json},
		    {{<<"application">>, <<"json">>, [{<<"charset">>,<<"UTF-8">>}]}, to_json}
		   ],
    {ContentTypes, Req, State}.

content_types_accepted(Req, State) ->
    ContentTypes = [
		    {{<<"application">>, <<"json">>, []}, from_json},
		    {{<<"application">>, <<"json">>, [{<<"charset">>,<<"UTF-8">>}]}, from_json}
		   ],
    {ContentTypes, Req, State}.


%% Implementation

delete_resource(Req,  #state{id = Id,
			     db=Db} = State) ->
    case pgsql:equery(Db, "DELETE FROM shiptypes WHERE id = $1", [Id]) of
	{ok, 1} ->
	    {true, Req, State};
	{ok, 0} ->
	    {false, Req, State};
	E -> 
	    {false, Req, State}
    end.

delete_completed(Req,  #state{id = Id,
			      db=Db} = State) ->
    {true, Req, State}.
    
options(Req, State) ->
    {ok, Req, State}.

is_authorized(Req, #state{session = undefined} = State) ->
    {true, Req, State};

is_authorized(Req, #state{session = #session{admin = 1}} = State) ->
    {true, Req, State};

is_authorized(Req, #state{path = []} = State) ->
    {true, Req, State};

is_authorized(Req, #state{id = Id,
			  session = #session{uid = UId},
			  db=Db} = State) ->
    case pgsql:equery(Db, "SELECT user_id FROM shiptypes WHERE id = $1", [Id]) of
	{ok, _, [{UId}]} -> 
	    {true, Req, State};
	{ok, _, []} ->
	    {true, Req, State}
    end;

is_authorized(Req, State) ->
    {false, Req, State}.

forbidden(Req, State) ->
    {false, Req, State}.

resource_exists(Req, #state{id = undefined} = State) ->
    {true, Req, State};

resource_exists(Req, #state{
		  id = Id,
		  db = Db
		 } = State) ->
    case pgsql:equery(Db, "SELECT count(*) FROM shiptypes WHERE id = $1", [Id]) of
	{ok, _, [{1}]} ->
	    {true, Req, State};
	_ -> 
	    {false, Req, State}
    end.


create_path(Req, #state{id = undefined,
		  session = undefined,
		  db = Db} = State) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO shiptypes (user_id) VALUES ($1) RETURNING id", [1]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    
    {<<"/api/v1/shiptype/", Location/binary>>, Req, State#state{id = TypeId}};

create_path(Req, #state{id = undefined,
		  session = #session{uid = UId},
		  db = Db} = State) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO shiptypes (user_id) VALUES ($1) RETURNING id", [UId]),
    {ok, Req, State#state{id = TypeId}}.

%% Callbacks

to_json(Req, State) ->
    {list_to_binary(mochijson2:encode(get_data(State))), Req, State}.

from_json(Req, State) ->
    {ok, Body, Req2} = cowboy_http_req:body(Req),
    {struct, Data} = mochijson2:decode(Body),
    RespBody = list_to_binary(mochijson2:encode(put_data(Data, State))),
    {ok, Req3} = cowboy_http_req:set_resp_body(RespBody, Req2),
    {ok, Req3, State}.

%%Internal


get_data(#state{id = undefined,
		session = #session{admin = 0,
				   uid = UId},
		db = Db}) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM shiptypes WHERE user_id = $1", [UId]),
    ds_web_api_handler:flatten_sql_res(SIds);

get_data(#state{id = undefined,
		db = Db}) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM shiptypes", []),
    ds_web_api_handler:flatten_sql_res(SIds);


get_data(#state{id = Id, 
		db = Db}) ->
    get_obj(Db, Id).

put_data(Obj, #state{id = Id,
		     session = undefined,
		     db = Db} = State) ->
    put_data(Obj, State#state{session = #session{uid = 1}});

put_data(Obj, #state{id = Id,
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
    ScriptId = case lists:keyfind(<<"script_id">>, 1, Obj) of
		   {<<"script_id">>, SId} ->
		       SId;
		   false ->
		       null
	       end,
    {ok, _, _, [{RespId, UserId, Name, ScriptId}]} = 
	pgsql:equery(Db, "UPDATE shiptypes SET user_id = $2, name = $3, script_id = $4" ++ 
			 "WHERE id = $1 RETURNING id, user_id, name, script_id", [Id, UserId, Name, ScriptId]),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"name">>, Name},
     {<<"script_id">>, ScriptId}].

get_obj(Db, Id) ->
    {ok, _, [{RespId, UserId, Name, ScriptId}]} =
	pgsql:equery(Db, "SELECT id, user_id, name, script_id FROM shiptypes WHERE id = $1", [Id]),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"name">>, Name},
     {<<"script_id">>, ScriptId}].


%{http_req,1,cowboy_tcp_transport,keepalive,'POST',{1,1},undefined,[<<"localhost">>],undefined,<<"localhost">>,8080,[<<"api">>,<<"v1">>,<<"shiptype">>],undefined,<<"/api/v1/shiptype">>,undefined,<<>>,[],[{'Content-Length',<<"20">>},{'Host',<<"localhost">>},{'User-Agent',<<"Jakarta Commons-HttpClient/3.1">>},{'Content-Type',<<"application/json">>},{'Accept-Encoding',<<"gzip,deflate">>}],[],undefined,waiting,<<"{\"name\":\"Test Type\"}">>,waiting,[],<<>>,{1,crash}}
