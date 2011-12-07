-module(epic_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    case application:get_key(center) of
	undefined -> undefined;
	Center -> erlang:monitor_node(Center, true),
		  net_adm:ping(Center)
    end,
    epic_sup:start_link().

stop(_State) ->
    ok.
