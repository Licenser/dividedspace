-module(ds_web_websocket_handler).
-behaviour(cowboy_http_handler).
-behaviour(cowboy_http_websocket_handler).

-include_lib("alog_pt.hrl").

-export([init/3, 
	 handle/2, 
	 terminate/2]).
-export([websocket_init/3, 
	 websocket_handle/3,
	 websocket_info/3,
	 websocket_terminate/3]).

-record(state, {fight}).


%init({_Any, http}, Req, []) ->
init(_, Req, []) ->
    ?INFO({"init fight"}),
    case cowboy_http_req:header('Upgrade', Req) of
	{undefined, Req2} -> {ok, Req2, undefined};
	{<<"websocket">>, _Req2} -> {upgrade, protocol, cowboy_http_websocket};
	{<<"WebSocket">>, _Req2} -> {upgrade, protocol, cowboy_http_websocket}
    end.

handle(Req, State) ->
    ?INFO({"handle fight"}),
    {[<<"fight">>, Fight], Req2} = cowboy_http_req:path(Req),
    {ok, Page} = tpl_fight:render([fightid, Fight]),
    {ok, Req3} = cowboy_http_req:reply(200, [], Page, Req2),
    {ok, Req3, State}.

terminate(Req, _State) ->
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% initializes the websocket server
%% @end
%%--------------------------------------------------------------------
websocket_init(_Any, Req, []) ->
    ?INFO({"fight ws init"}),
    {[<<"fight">>, Fight], Req2} = cowboy_http_req:path(Req),
    {ok, FPid} = gen_server:call({global, center_server}, {get_fight, Fight}),
    gen_server:cast(FPid, {subscribe, self()}),
    Req2 = cowboy_http_req:compact(Req2),
    {ok, Req2, #state{fight = FPid}, hibernate}.


websocket_handle(_Any, Req, State) ->
    {ok, Req, State}.

websocket_info({send, Data}, Req, State) ->
    {ok, Req2} = cowboy_http_req:set_resp_body(Req, mochijson2:encode(Data)),
    {reply, Req2, State, hibernate};

websocket_info(_Info, Req, State) ->
    {ok, Req, State, hibernate}.

websocket_terminate(_Reason, _Req, #state{fight = Fight} = _State) ->
    gen_server:cast(Fight, {unsubscribe, self()}),
    ok.
