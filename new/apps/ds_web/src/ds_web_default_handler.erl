-module(ds_web_default_handler).
-behaviour(cowboy_http_handler).
-export([init/3, handle/2, terminate/3]).

-record(session,{
          uid = -1,
          name = <<"">>,
          admin = false
         }).

-record(state, {}).

init({tcp, http}, Req, []) ->
    {ok, Req, #state{}}.

handle(Req, State) ->
    {Path, Req1} = cowboy_req:path(Req),
    {Method, Req2} = cowboy_req:method(Req1),
    %%INFO({"defaulting", Path, Method}),
    {ok, SessionCookieName} = application:get_env(ds_web, session_name),
    {ok, SessionKey} = application:get_env(ds_web, session_key),
    {Session, Req3} = ds_web_session:get_session(SessionCookieName,
                                                 SessionKey, Req2),
    {ok, Reply} = request(Method, Path, Session, Req3, State),
    {ok, Reply, State}.

terminate(_Req, _State, _Other) ->
    ok.
request(<<"GET">>, <<"/admin">>, #session{admin=true}, Req, _State) ->
    {ok, Page} = admin_dtl:render(),
    cowboy_req:reply(200, [], Page, Req);
request(<<"GET">>, <<"/admin">>, #session{admin=false}, Req, _State) ->
    cowboy_req:reply(403, [], force_index(), Req);
request(<<"GET">>, <<"/admin">>, undefined, Req, _State) ->
    cowboy_req:reply(403, [], force_index(), Req);


request(<<"GET">>, <<"/logout">>, _, Req, _State) ->
    {ok, SessionCookieName} = application:get_env(ds_web, session_name),
    {ok, Req2} = ds_web_session:rem_session(SessionCookieName, Req),
    cowboy_req:reply(200, [], force_login(), Req2);
request(<<"GET">>, <<"/login">>, undefined, Req, _State) ->
    {ok, Page} = login_dtl:render(),
    cowboy_req:reply(200, [], Page, Req);
request(<<"GET">>, <<"/login">>, _, Req, _State) ->
    cowboy_req:reply(200, [], force_index(), Req);
request(<<"POST">>, <<"/login">>, _, Req, _) ->
    {ok, SessionCookieName} = application:get_env(ds_web, session_name),
    {ok, SessionKey} = application:get_env(ds_web, session_key),
    {{User, Pass}, Req1} = user_pass(Req),
    Res = ds_web_user:verify(User, Pass),
    case Res of
        {ok, Id, Name, Rights} ->
            Req2 = ds_web_session:set_session(SessionCookieName,
                                              SessionKey, Req1,
                                              #session{
                                                 uid = Id,
                                                 name = Name,
                                                 admin = Rights
                                                }),
            cowboy_req:reply(200, [], force_index(), Req2);
        _ ->
            {ok, Page} = login_dtl:render(),
            cowboy_req:reply(403, [], Page, Req1)
    end;

request(<<"GET">>, <<"/">>, undefined, Req, _State) ->
    cowboy_req:reply(200, [], force_login(), Req);
request(<<"GET">>, <<"/">>, #session{uid = UId}, Req, _State) ->
    {ok, Index} = index_dtl:render([{uid, UId}]),
    cowboy_req:reply(200, [], Index, Req);


request(M, P, O, Req, _) ->
    io:format("~p ~p ~p~n", [M, P, O]),
    cowboy_req:reply(404, [], "not found", Req).


user_pass(Req) ->
    {ok, Data, Req1} = cowboy_req:body_qs(Req),
    case lists:keyfind(<<"user">>, 1, Data) of
        false -> {{<<"">>,<<"">>}, Req1};
        {_, U} ->
            case lists:keyfind(<<"pass">>, 1, Data) of
                false ->
                    {{<<"">>,<<"">>}, Req1};
                {_, P} ->
                    {{U, P}, Req1}
            end
    end.

force_index() ->
    <<"
<HTML>
      <HEAD>
      <META HTTP-EQUIV=\"refresh\" CONTENT=\"0;URL=/\">
  </HEAD>
      </HTML>">>.

force_login() ->
            <<"
<HTML>
              <HEAD>
              <META HTTP-EQUIV=\"refresh\" CONTENT=\"0;URL=/login\">
  </HEAD>
              </HTML>">>.
