%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 15 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(center).

%% API
-export([register/1]).

-define(SERVER, {global, center_server}).

%%%===================================================================
%%% API
%%%===================================================================

register(Pid) ->
    call({register_epic, Pid}).
%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

%%%===================================================================
%%% Internal functions
%%%===================================================================

call(What) ->
    io:format("CENTER <= register: ~p~n", [What]),
    gen_server:call(?SERVER, What). 
    

cast(What) ->
    io:format("CENTER <- register: ~p~n", [What]),
    gen_server:cast(?SERVER, What). 
