%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  1 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(epic).

-export([start/0, start_fight/1, start_group/1, test_list/0]).

test_list() ->
    [1000, 1000, 1000, 1000,
     249, 249, 249, 249,
     249, 249, 249, 249,
     249, 249, 249, 249,
     249, 249, 249, 249,
     84, 84, 84, 84,
     84, 84, 84, 84,
     84, 84, 84, 84,
     84, 84, 84, 84,
     84, 84, 84, 84,
     84, 84, 84, 84,
     84, 84, 84, 84,
     84, 84, 84, 84].
start_fight(N) ->
    S = trunc((N / 2) * -1),
    E = trunc(N / 2),
						%    Spec = ["Fighter L", "Laser", "Small Battery", "Fighter Engine", "Light FF Shield"],
    Spec = ["Fighter L", "Laser", "Small Battery*", "Fighter Engine"],
    Units = lists:foldl(fun (Pos, L) ->
				Major = abs(Pos) div 20,
				Minor = Pos rem 20,
				{ok, U1} = unit:from_template(-3 - Major, Minor, "one", Spec),
				{ok, U2} = unit:from_template( 3 + Major, Minor, "two", Spec),
				[U1, U2 | L]
			end, [], lists:seq(S, E)),
    Fight = fight:new(nil, Units),
    epic_server:new_fight(Fight).

start_group([]) ->
    ok;
start_group([F | L]) ->
    start_fight(F),
    start_group(L).

start() ->
    appmon:start(),
    mnesia:start(),
    application:start(erlv8),
    application:start(epic),
    loader:load().
