-module(ds_web_api_module).

-behaviour(ds_web_api_behaviour).

-export([
         get_sub_handler/3,
         delete/1,
         forbidden/2,
         create/2,
         exists/1,
         list_resources/0,
         list_resources_for_parent/1,
         get_data/1,
         get_owner/1,
         put_data/2]).
%% REST

%% Init Section

%% Implementation

get_sub_handler(Parents, This, []) ->
    {Parents, ds_web_api_module, This}.


delete(Id) ->
    case pgapp:equery("DELETE FROM modules WHERE id = $1", [Id]) of
        {ok, 1} ->
            true;
        _ ->
            false
    end.

forbidden(Id, UId) ->
    case pgapp:equery("SELECT user_id FROM modules WHERE id = $1", [Id]) of
        {ok, _, [{UId}]} ->
            true;
        {ok, _, []} ->
            true
    end.

exists(Id) ->
    case pgapp:equery("SELECT count(*) FROM modules WHERE id = $1", [Id]) of
        {ok, _, [{1}]} ->
            true;
        _ ->
            false
    end.

create(UId, [{shiptype, SId}, {user, UId}]) ->
    {ok, _, _, [{TypeId}]} =
        pgapp:equery("INSERT INTO modules (user_id, ship_id) VALUES ($1, $2) RETURNING id", [UId, SId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    PIdStr = list_to_binary(io_lib:format("~p", [SId])),
    {<<"/api/v1/user/", UIdStr/binary, "/shiptype/", PIdStr/binary, "/module/", Location/binary>>, TypeId}.

%%Internal

list_resources() ->
    {ok, _, SIds} =
        pgapp:equery("SELECT id, name FROM scripts"),
    List = lists:map(fun ({Id, Name}) ->
                             [{<<"id">>, Id},
                              {<<"name">>, Name}]
                     end, SIds),
    {ok, List}.

list_resources_for_parent([{shiptype, SId} | _]) ->
    {ok, _, SIds} =
        pgapp:equery("SELECT id, name FROM modules WHERE ship_id = $1", [SId]),
    List = lists:map(fun ({Id, Name}) ->
                             [{<<"id">>, Id},
                              {<<"name">>, Name}]
                     end, SIds),
    {ok ,List}.

get_owner(Id) ->
    {ok, _, [{Owner}]} =
        pgapp:equery("SELECT user_id FROM modules where id = $1", [Id]),
    {ok, Owner}.

get_data(Id) ->
    {ok, get_obj(Id)}.

put_data(Id, Obj) ->
    {<<"user_id">>, UserId} = lists:keyfind(<<"user_id">>, 1, Obj),
    {<<"ship_id">>, ShipId} = lists:keyfind(<<"ship_id">>, 1, Obj),
    {<<"name">>, Name}  = lists:keyfind(<<"name">>, 1, Obj),
    {ok, _, _, [{RespId, UserId, ShipId, Name}]} =
        pgapp:equery("UPDATE modules SET user_id = $2, ship_id = $3, name = $4" ++
                         "WHERE id = $1 RETURNING id, user_id, ship_id, name", [Id, UserId, ShipId, Name]),
    {ok,
     [{<<"id">>, RespId},
      {<<"user_id">>, UserId},
      {<<"ship_id">>, ShipId},
      {<<"name">>, Name}]}.

get_obj(Id) ->
    {ok, _, [{RespId, UserId, ShipId, Name}]} =
        pgapp:equery("SELECT id, user_id, ship_id, name FROM modules WHERE id = $1", [Id]),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"ship_id">>, ShipId},
     {<<"name">>, Name}].
