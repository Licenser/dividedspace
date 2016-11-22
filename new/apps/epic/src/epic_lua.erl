%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2016, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 15 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(epic_lua).

-export([init/0]).

init() ->
    L0 = luerl:init(),
    L1 = luerl:set_table([io], sandbox, L0),
    luerl:set_table([file], sandbox, L1).
