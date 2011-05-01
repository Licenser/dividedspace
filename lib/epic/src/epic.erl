%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  1 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(epic).

-export([start/0, start/1, start_fight/1]).


start_fight(N) ->
    S = trunc((N / 2) * -1),
    E = trunc(N / 2),
%    Spec = ["Fighter L", "Laser", "Small Battery", "Fighter Engine", "Light FF Shield"],
    Spec = ["Fighter L", "Laser", "Small Battery", "Fighter Engine"],
    Units = lists:foldl(fun (Pos, L) ->
				{ok, U1} = unit:from_template(0, Pos, "one", Spec),
				{ok, U2} = unit:from_template(2, Pos, "two", Spec),
				[U1 | [U2 | L]]
			end, [], lists:seq(S, E)),
    Fight = fight:new(nil, Units),
    epic_server:new_fight(Fight).

start() ->
    start(6).

start(N) ->
    appmon:start(),
    mnesia:start(),
    application:start(epic),
    application:start(ds_web),
    loader:load(),
    start_fight(N).
