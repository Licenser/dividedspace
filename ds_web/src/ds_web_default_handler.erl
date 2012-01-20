-module(ds_web_default_handler).
-behaviour(cowboy_http_handler).
-export([init/3, handle/2, terminate/2]).

%-include("ds_web.hrl").
-record(session,{
	  uid = -1,
	  name = <<"">>,
	  admin = false
	 }).

-record(state, {db}).

init({tcp, http}, Req, [DB]) ->
    {ok, Req, #state{db = DB}}.

handle(Req, State) ->
    {Path, _} = cowboy_http_req:path(Req),
    {Method, _} = cowboy_http_req:method(Req),
    {ok, SessionCookieName} = application:get_env(ds_web, session_name),
    {ok, SessionKey} = application:get_env(ds_web, session_key),
    Session = ds_web_session:get_session(SessionCookieName, 
					 SessionKey, Req),
    
    {ok, Reply} = request(Method, Path, Session, Req, State),
    {ok, Reply, State}.

terminate(_Req, _State) ->
    ok.
request('GET', [<<"admin">>], #session{admin=true}, Req, _State) ->
    {ok, Page} = tpl_admin:render(),
    cowboy_http_req:reply(200, [], Page, Req);
request('GET', [<<"admin">>], #session{admin=false}, Req, _State) ->
    cowboy_http_req:reply(403, [], force_index(), Req);
request('GET', [<<"admin">>], undefined, Req, _State) ->
    cowboy_http_req:reply(403, [], force_index(), Req);


request('GET', [<<"logout">>], _, Req, _State) ->
    io:format("1~n"),
    {ok, SessionCookieName} = application:get_env(ds_web, session_name),
    io:format("2~n"),
    {ok, Req2} = ds_web_session:rem_session(SessionCookieName, Req),
    io:format("3 ~p~n", [Req2]),
    cowboy_http_req:reply(200, [], force_login(), Req2);
request('GET', [<<"login">>], undefined, Req, _State) ->
    {ok, Page} = tpl_login:render(),
    cowboy_http_req:reply(200, [], Page, Req);
request('GET', [<<"login">>], _, Req, _State) ->
    cowboy_http_req:reply(200, [], force_index(), Req);
request('POST', [<<"login">>], _, Req, #state{db = DB}) ->
    {ok, SessionCookieName} = application:get_env(ds_web, session_name),
    {ok, SessionKey} = application:get_env(ds_web, session_key),    
    {User, Pass} = user_pass(Req),
    Res = ds_web_user:verify(DB, User, Pass),
    case Res of
	{ok, Id, Name, Rights} ->
	    {ok, Req2} = ds_web_session:set_session(SessionCookieName, 
						    SessionKey, Req, 
						    #session{
							      uid = Id,
							      name = Name,
							      admin = Rights
							    }),
	    io:format("~p~n", [Req2]),
	    cowboy_http_req:reply(200, [], force_index(), Req2);
	_ ->
	    {ok, Page} = tpl_login:render(),
	    cowboy_http_req:reply(403, [], Page, Req)
    end;

request('GET', [], undefined, Req, _State) ->
    cowboy_http_req:reply(200, [], force_login(), Req);
request('GET', [], #session{uid = UId}, Req, _State) ->
    {ok, Index} = tpl_index:render([{uid, UId}]),
    cowboy_http_req:reply(200, [], Index, Req);


request(_, _, _, Req, _) ->
    cowboy_http_req:reply(404, [], "not found", Req).
	
    
user_pass(Req) ->
    {Data, _} = cowboy_http_req:body_qs(Req),
    io:format("D: ~p~n", [Data]),
    case lists:keyfind(<<"user">>, 1, Data) of
	false -> {<<"">>,<<"">>};
	{_, U} -> 
	    case lists:keyfind(<<"pass">>, 1, Data) of
		false -> 
		    {<<"">>,<<"">>};
		{_, P} -> 
		    {U, P}
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
