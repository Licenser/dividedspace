%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 15 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(center).

-export([start/0, start_fight/1]).

start() ->
    application:start(sasl),
    application:start(center),
    application:start(ds_web).

start_fight(N) ->
    S = trunc((N / 2) * -1),
    E = trunc(N / 2),
    Spec = ["Fighter L", "Laser", "Small Battery*", "Fighter Engine"],
    Units = lists:foldl(fun (Pos, L) ->
				Major = abs(Pos) div 20,
				Minor = Pos rem 20,                                
				[{-3 - Major, Minor, "one", Spec}, 
                                 {3 + Major, Minor, "two", Spec} | L]
			end, [], lists:seq(S, E)),
    center_server:add_fight(Units).

    
