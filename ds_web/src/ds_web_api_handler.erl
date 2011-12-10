-module(ds_web_api_handler).
-behaviour(cowboy_http_handler).
-export([init/3, handle/2, terminate/2,
	 json_reply/2,
	 get_modules/1]).

%-include("ds_web.hrl").
-record(session,{
	  uid = -1,
	  name = <<"">>,
	  admin = false
	 }).

-record(state, {db}).

init({tcp, http}, Req, [Db]) ->
    {ok, Req, #state{db=Db}}.

handle(Req, #state{db=Db} = State) ->
%    Db1 = case process_info(Db) of
%	      undefined -> ds_web_server:init_db();
%	      Else -> Else
%	  end,
    {[<<"api">>, Version | Path], _} = cowboy_http_req:path(Req),
    {Method, _} = cowboy_http_req:method(Req),
    {ok, SessionCookieName} = application:get_env(ds_web, session_name),
    {ok, SessionKey} = application:get_env(ds_web, session_key),
    Session = ds_web_session:get_session(SessionCookieName, 
					 SessionKey, Req),
    io:format("API:
  Method: ~p
  Version: ~p
  Path: ~p
  Session: ~p
  DB: ~p
  Req: ~p~n", [Method, Version, Path, Session, Db, Req]),
    {ok, Reply} = request(Method, Version, Path, Session, Db, Req),
    {ok, Reply, State#state{db=Db}}.

terminate(_Req, _State) ->
    ok.

request(_, _, _, undefined, _Db, Req) ->
    cowboy_http_req:reply(403, [], "forbidden", Req);

request('GET', _, [], _, _Db, Req) ->
    json_reply([<<"moduletype">>, <<"server">>, <<"user">>], Req);


%% ============================ \/ User

request('GET', Vsn, [<<"user">> | Rest], Session, Db, Req) ->
    ds_web_api_user:get(Vsn, Rest, Session, Db, Req);

request('POST', Vsn, [<<"user">> | Rest], Session, Db, Req) ->
    ds_web_api_user:post(Vsn, Rest, Session, Db, Req);

%% ============================ \/ Scripts

request('GET', Vsn, [<<"scripts">> | Rest], Session, Db, Req) ->
    ds_web_api_user:get(Vsn, Rest, Session, Db, Req);

request('POST', Vsn, [<<"scripts">> | Rest], Session, Db, Req) ->
    ds_web_api_user:post(Vsn, Rest, Session, Db, Req);

%% ============================ \/ Moduletype

request('GET', Vsn, [<<"moduletype">> | Rest], Session, Db, Req) ->
    ds_web_api_moduletype:get(Vsn, Rest, Session, Db, Req);

request('POST', Vsn, [<<"moduletype">> | Rest], Session, Db, Req) ->
    ds_web_api_moduletype:post(Vsn, Rest, Session, Db, Req);

%% ============================ \/ Admin Section

%% Admin only requests
request(_, _, _, #session{admin=Admin}, _Db, Req) when Admin =/= 1->
    cowboy_http_req:reply(403, [], "forbidden", _Db, Req);
request('GET', _, [<<"server">>], _Session, _Db, Req) ->
    json_reply([<<"epic">>, <<"ds_web">>], Req);

request('GET', _, [<<"server">>, <<"epic">>], _Session, _Db, Req) ->
    json_reply(get_epic_servers(), Req);

request('GET', _, [<<"server">>, <<"epic">>, UUID], _Session, _Db, Req) ->
    Pid = get_epic_pid(UUID),
    Fights = get_fights(Pid),
    FightData = lists:map(fun ({FightUUID, {State, Ticks, Time}}) ->
				  [{id, FightUUID},
				   {state, State}, {ticks, Ticks},
				   {time, Time}]
			  end,Fights),
    json_reply(FightData, Req);

request('GET', _, _, _Session, _Db, Req) -> 
    cowboy_http_req:reply(404, [], <<"Not found">>, Req).

json_reply(Data, Req) ->
    cowboy_http_req:reply(200,
			  [{<<"Content-Type">>, <<"application/json">>}], 
			  mochijson2:encode(Data),
			  Req).

call_center(Call)->
    gen_server:call({global,center_server}, Call).

get_modules(Type) ->
    call_center({get_modules, Type}).

get_epic_servers() ->
    R = call_center(get_epic_servers),
    R.

get_epic_pid(UUID) ->
    {ok, R} = call_center({get_server_pid, UUID}),
    R.

get_fights(Pid) ->
    {ok, R} = gen_server:call(Pid, list_fights),
    R.
