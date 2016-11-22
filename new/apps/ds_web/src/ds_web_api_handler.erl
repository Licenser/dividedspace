-module(ds_web_api_handler).
-behaviour(cowboy_http_handler).
-export([init/3, handle/2, terminate/3,
         json_reply/2,
         flatten_sql_res/1]).

-record(session,{
          uid = -1,
          name = <<"">>,
          admin = false
         }).

-record(state, {}).

init({tcp, http}, Req, []) ->
    {ok, Req, #state{}}.

handle(Req, State) ->
    {[<<"api">>, Version | Path], _} = cowboy_req:path(Req),
    {Method, _} = cowboy_req:method(Req),
    {ok, Reply} = request(Method, Version, Path, #session{uid=1, admin=1}, Req),
    {ok, Reply, State}.

terminate(_Req, _State, _) ->
    ok.

request(_, _, _, undefined, Req) ->
    cowboy_req:reply(403, [], "forbidden", Req);

request('GET', _, [], _, Req) ->
    json_reply([<<"moduletype">>, <<"server">>, <<"user">>], Req);

%% ============================ \/ User

request('GET', Vsn, [<<"user">> | Rest], Session, Req) ->
    ds_web_api_user:get(Vsn, Rest, Session, Req);

request('GET', _Vsn, [<<"test">> | _Rest], _Session, Req) ->
    {ok, _, _, Res} =
        pgapp:equery("select count, shiptype_id, name from fleet_shiptype "
                     "JOIN modules on (modules.ship_id = fleet_shiptype.shiptype_id) "
                     "WHERE fleet_shiptype.fleet_id = $1",
                     [2]),
    Ships = lists:foldl(fun ({Count, Id, Module}, [{Count, Id, Modules} | R]) ->
                                [{Count, Id, [Module | Modules] }| R];
                            ({Count, Id, Module}, R) ->
                                [{Count, Id, [Module]} | R]
                        end, [], Res),
    json_reply(Ships, Req);


request('POST', Vsn, [<<"user">> | Rest], Session, Req) ->
    ds_web_api_user:post(Vsn, Rest, Session, Req);

%% ============================ \/ Moduletype

request('GET', Vsn, [<<"moduletype">> | Rest], Session, Req) ->
    ds_web_api_moduletype:get(Vsn, Rest, Session, Req);

request('POST', Vsn, [<<"moduletype">> | Rest], Session, Req) ->
    ds_web_api_moduletype:post(Vsn, Rest, Session, Req);

%% ============================ \/ Admin Section

%% Admin only requests
request(_, _, _, #session{admin=Admin}, Req) when Admin =/= 1->
    cowboy_req:reply(403, [], "forbidden", Req);
request('GET', _, [<<"server">>], _Session, Req) ->
    json_reply([<<"epic">>, <<"ds_web">>], Req);

request('GET', _, [<<"server">>, <<"epic">>], _Session, Req) ->
    json_reply(ds_web_center:get_epic_servers(), Req);

request('GET', _, [<<"server">>, <<"epic">>, UUID], _Session, Req) ->
    Pid = ds_web_center:get_epic_pid(UUID),
    Fights = ds_web_epic:get_fights(Pid),
    FightData = lists:map(fun ({FightUUID, {State, Ticks, Time}}) ->
                                  [{id, FightUUID},
                                   {state, State}, {ticks, Ticks},
                                   {time, Time}]
                          end,Fights),
    json_reply(FightData, Req);

request('GET', _, _, _Session, Req) ->
    cowboy_req:reply(404, [], <<"Not found">>, Req).

json_reply(Data, Req) ->
    cowboy_req:reply(200,
                          [{<<"Content-Type">>, <<"application/json">>}],
                          mochijson2:encode(Data),
                          Req).

flatten_sql_res(List) ->
    lists:map(fun ({E}) ->
                      E
              end, List).
