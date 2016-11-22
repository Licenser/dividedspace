-module(ds_web_websocket_handler).
-behaviour(cowboy_websocket_handler).


-export([init/3,
         handle/2,
         terminate/3]).
-export([websocket_init/3,
         websocket_handle/3,
         websocket_info/3,
         websocket_terminate/3]).

-record(state, {fight}).


                                                %init({_Any, http}, Req, []) ->
init({_Any, http}, Req, _Opts) ->
    %%INFO({"init fight"}),
    {U, Req2} = cowboy_req:header(<<"upgrade">>, Req),
    case U of
        undefined -> {ok, Req2, undefined};
        <<"websocket">> -> {upgrade, protocol, cowboy_websocket};
        <<"WebSocket">> -> {upgrade, protocol, cowboy_websocket}
    end.

handle(Req, State) ->
    %%INFO({"handle fight"}),
    {[{id, Fight}], Req2} = cowboy_req:bindings(Req),
    {ok, Page} = fight_dtl:render([{fightid, Fight}]),
    {ok, Req3} = cowboy_req:reply(200, [], Page, Req2),
    {ok, Req3, State}.

terminate(_Req, _State, _) ->
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% initializes the websocket server
%% @end
%%--------------------------------------------------------------------
websocket_init(_Any, Req, []) ->
    %%INFO({"fight ws init"}),
    {[{id, Fight}], Req2} = cowboy_req:bindings(Req),
    {ok, FPid} = center_server:get_fight(Fight),
    gen_server:cast(FPid, {subscribe, self()}),
    Req3 = cowboy_req:compact(Req2),
    {ok, Req3, #state{fight = FPid}, hibernate}.

websocket_handle(_Any, Req, State) ->
    {ok, Req, State}.

websocket_info({send, Data}, Req, State) ->
    %%NOTICE({"Sending data", Data}),
    {reply, {text, mochijson2:encode(Data)}, Req, State, hibernate};

websocket_info(_Info, Req, State) ->
    %%WARNING({"unknwon websocket info", Info}),
    {ok, Req, State, hibernate}.

websocket_terminate(_Reason, _Req, #state{fight = Fight} = _State) ->
    gen_server:cast(Fight, {unsubscribe, self()}),
    ok.
