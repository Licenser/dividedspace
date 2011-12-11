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
	  id,
	  property
	  }).

-export([rest_init/2,
	 is_authorized/2,
	 forbidden/2,
	 allowed_methods/2,
	 content_types_provided/2
	]).

-export([to_json/2]).

init({tcp, http}, Req, Opts) ->
    {upgrade, protocol, cowboy_http_rest}.

handle(Req, State) ->
    {ok, Req, State}.

terminate(Req, State) ->
    ok.

%% REST

rest_init(Req, [Db]) ->
    Session = ds_web_session:get(Req),
    {[<<"api">>, <<"v1">>, <<"shiptype">> | Path], _} = cowboy_http_req:path(Req),
    {Id, Prop} = case Path of
		     [] -> {undefined, undefined};
		     [IdStr] -> 
			 {list_to_integer(binary_to_list(IdStr)), 
			  undefined};
		     [IdStr, P] ->
			 {list_to_integer(binary_to_list(IdStr)), 
			  P}
		 end,
    {Method, _} = cowboy_http_req:method(Req),
    {ok, Req, #state{
	   session = Session,
	   method = Method,
	   path = Path,
	   id = Id,
	   property = Prop,
	   db = Db
	  }}.


allowed_methods(Req, State) ->
    Methods = ['GET', 'HEAD', 'POST', 'OPTIONS'],
    {Methods, Req, State}.

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

%returns true or false
forbidden(Req, State) ->
    {false, Req, State}.

content_types_provided(Req, State) ->
    ContentTypes = [{{<<"application">>, <<"json">>, []}, to_json}],
    {ContentTypes, Req, State}.

resource_exists(Req, #state{id = undefined} = State) ->
    {true, Req, State};

resource_exists(Req, #state{
		  id = Id,
		  property = Property,
		  db = Db
		 } = State) ->
    case pgsql:equery(Db, "SELECT count(*) FROM shiptypes WHERE id = $1", [Id]) of
	{ok, _, [{1}]} ->
	    Exists = lists:findkey(Property, 1,
				   [{undefined, true},
				    {<<"id">>, true},
				    {<<"user_id">>, true},
				    {<<"name">>, true},
				    {<<"script_id">>, true}]),
	    {true, Req, State};
	_ -> 
	    {false, Req, State}
    end.


to_json(Req, State) ->
    io:format("~p~n", [State]),
    {mochijson2:encode(get_data(State)), Req, State}.


%%Internal


get_data(#state{id = undefined,
		property = undefined,
		session = #session{admin = 0,
				   uid = UId},
		db = Db}) ->
    io:format("0~n"),
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM shiptypes WHERE user_id = $1", [UId]),
    ds_web_api_handler:flatten_sql_res(SIds);

get_data(#state{id = undefined,
		property = undefined,
		db = Db}) ->
    io:format("1~n"),
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT id FROM shiptypes", []),
    ds_web_api_handler:flatten_sql_res(SIds);


get_data(#state{id = Id, 
		property = undefined,
		db = Db}) ->
    io:format("3~n"),
    get_obj(Db, Id);

get_data(#state{id = Id, 
		property = Property,
		db = Db}) ->
    io:format("4: ~p,~p~n", [Id, Property]),
    lists:findkey(Property, 1, get_obj(Db, Id)).

get_obj(Db, Id) ->
    {ok, _, [{RespId, UserId, Name, ScriptId}]} =
	pgsql:equery(Db, "SELECT id, user_id, name, script_id FROM shiptypes WHERE id = $1", [Id]),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"name">>, Name},
     {<<"script_id">>, ScriptId}].
