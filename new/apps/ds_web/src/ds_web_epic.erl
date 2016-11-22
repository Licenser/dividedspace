-module(ds_web_epic).


-define(CENTER, {global,center_server}).

-export([call/2,
         cast/2,
         get_fights/1
        ]).


call(Pid, Call) ->
    gen_server:call(Pid, Call).

cast(Pid, Cast) ->
    gen_server:call(Pid, Cast).

get_fights(Pid) ->
    {ok, R} = call(Pid, list_fights),
    R.
