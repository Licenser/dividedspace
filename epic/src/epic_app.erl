-module(epic_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

-define(CORE, 'dscore@schroedinger').

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    
    erlang:monitor_node(?CORE, true),
    Core = application:get_key(center),
    if
	Core == undefined -> undefined;
	true -> net_adm:ping(Core)
    end,
    epic_sup:start_link().

stop(_State) ->
    ok.
