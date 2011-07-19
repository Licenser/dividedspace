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
    net_adm:ping(?CORE),
    epic_sup:start_link().

stop(_State) ->
    ok.
