-module(ds_web_center).

-define(CENTER, {global,center_server}).

-export([call/1,
         cast/1,
         get_epic_servers/0,
         get_modules/1,
         get_epic_pid/1,
         add_fight/3,
         get_fight_server/1
        ]).


call(Call) ->
    gen_server:call(?CENTER, Call).

cast(Cast) ->
    gen_server:cast(?CENTER, Cast).

get_modules(Type) ->
    call({get_modules, Type}).

get_epic_servers() ->
    R = call(get_epic_servers),
    R.

get_epic_pid(UUID) ->
    R = call({get_server_pid, UUID}),
    R.

get_fight_server(UUID) ->
    R = call({get_fight, UUID}),
    R.

add_fight(UUID, TeamA, TeamB) ->
    cast({add_fight, UUID, [TeamA, TeamB]}).
