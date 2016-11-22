-module(epic_uuid).
-export([v4/0]).

v4() ->
    list_to_binary(uuid:uuid_to_string(uuid:get_v4())).
