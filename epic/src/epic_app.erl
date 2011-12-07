-module(epic_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    Core = application:get_key(center),
    if
	Core == undefined -> undefined;
	true -> erlang:monitor_node(Core, true),
		net_adm:ping(Core)
    end,
    epic_sup:start_link().

stop(_State) ->
    ok.
