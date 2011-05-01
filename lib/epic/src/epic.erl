%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  1 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(epic).

-export([start/0]).

start() ->
    appmon:start(),
    mnesia:start(),
    application:start(epic),
    application:start(ds_web),
    loader:load(),
    Spec = ["Fighter L", "Laser", "Small Battery", "Fighter Engine", "Light FF Shield"],
    {ok, U1} = unit:from_template(0, 0, 0, Spec),
    {ok, U2} = unit:from_template(2, 0, 1, Spec),
    Fight = fight:new(nil, [U1, U2]),
    epic_server:new_fight(Fight).
