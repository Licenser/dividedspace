%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 15 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(epic_center).
-include_lib("alog_pt.hrl").

%% API
-export([register/1, call/1, cast/1, get_modules/1]).

-define(SERVER, {global, center_server}).

%%%===================================================================
%%% API
%%%===================================================================

register(Pid) ->
    call({register_epic, Pid}).

get_modules(Type) ->
    call({get_modules, Type}).

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

%%%===================================================================
%%% Internal functions
%%%===================================================================

call(What) ->
    ?NOTICE({"call center", What}),
    gen_server:call(?SERVER, What). 
    

cast(What) ->
    ?NOTICE({"cast center", What}),
    gen_server:cast(?SERVER, What). 
