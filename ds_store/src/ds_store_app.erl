-module(ds_store_app).

-behaviour(application).

%% Application callbacks
-export([start/2, stop/1]).

%% ===================================================================
%% Application callbacks
%% ===================================================================

start(_StartType, _StartArgs) ->
    uuid:init(),
    storage:init(),
    ds_store_sup:start_link().

stop(_State) ->
    ok.
