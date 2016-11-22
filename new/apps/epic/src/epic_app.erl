-module(epic_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    case application:get_env(center) of
	{ok, Center} -> 
	    pong =  net_adm:ping(Center),
	    erlang:monitor_node(Center, true);
	_ -> ok
    end,
    epic_sup:start_link().

stop(_State) ->
    ok.
