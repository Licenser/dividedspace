-module(ds_web_api_handler).
-behaviour(cowboy_http_handler).
-export([init/3, handle/2, terminate/2]).

init({tcp, http}, Req, Opts) ->
    {ok, Req, undefined_state}.

handle(Req, State) ->
    {[<<"api">>, Version | Path], _} = cowboy_http_req:path(Req),
    {Method, _} = cowboy_http_req:method(Req),
    {ok, Reply} = request(Method, Version, Path, Req),
    {ok, Reply, State}.

terminate(Req, State) ->
    ok.

request('GET', _, [<<"server">>], Req) ->
    json_reply([<<"epic">>, <<"ds_web">>], Req);

request('GET', _, [<<"server">>, <<"epic">>], Req) ->
    json_reply(get_epic_servers(), Req);

request('GET', _, [<<"server">>, <<"epic">>, UUID], Req) ->
    Pid = get_epic_pid(UUID),
    Fights = get_fights(Pid),
    FightData = lists:map(fun ({FightUUID, {State, Ticks, Time}}) ->
				  [{id, FightUUID},
				   {state, State}, {ticks, Ticks},
				   {time, Time}]
			  end,Fights),
    json_reply(FightData, Req);

request('GET', _, _, Req) -> 
    cowboy_http_req:reply(404, [], <<"Not found">>, Req).

json_reply(Data, Req) ->
    cowboy_http_req:reply(200,
			  [{<<"Content-Type">>, <<"application/json">>}], 
			  mochijson2:encode(Data),
			  Req).

get_epic_servers() ->
    R = gen_server:call({global,center_server}, get_epic_servers),
    R.

get_epic_pid(UUID) ->
    {ok, R} = gen_server:call({global,center_server}, {get_server_pid, UUID}),
    R.

get_fights(Pid) ->
    {ok, R} = gen_server:call(Pid, list_fights),
    R.
