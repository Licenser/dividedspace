-module(ds_web_api_fleet).

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

%% Implementation

get_sub_handler(Parents, This, [<<"shiptype">>]) ->
    {[{fleet, This} | Parents], ds_web_api_fleet_shiptype, undefined};

get_sub_handler(Parents, This, [<<"shiptype">>, Id]) ->
    {[{fleet, This} | Parents], ds_web_api_fleet_shiptype, list_to_integer(binary_to_list(Id))};

get_sub_handler(Parent, This, []) ->
    {Parent, ds_web_api_fleet, This}.

delete(Id) ->
    case pgapp:equery("DELETE FROM fleets WHERE id = $1", [Id]) of
        {ok, 1} ->
            true;
        {ok, 0} ->
            false;
        _Error ->
            false
    end.

forbidden(Id, UId) ->
    case pgapp:equery("SELECT user_id FROM fleets WHERE id = $1", [Id]) of
        {ok, _, [{UId}]} ->
            true;
        {ok, _, []} ->
            true
    end.

exists(Id) ->
    case pgapp:equery("SELECT count(*) FROM fleets WHERE id = $1", [Id]) of
        {ok, _, [{1}]} ->
            true;
        _ ->
            false
    end.

create(UId, [{user, UId}]) ->
    {ok, _, _, [{TypeId}]} =
        pgapp:equery("INSERT INTO fleets (user_id) VALUES ($1) RETURNING id", [UId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    {<<"/api/v1/user/", UIdStr/binary, "/fleet/", Location/binary>>, TypeId}.

%%Internal

list_resources() ->
    {ok, _, SIds} =
        pgapp:equery("SELECT id, name FROM fleets", []),
    List = lists:map(fun ({Id, Name}) ->
                             [{<<"id">>, Id},
                              {<<"name">>, Name}]
                     end, SIds),
    {ok, List}.

list_resources_for_parent([{user, UId}]) ->
    {ok, _, SIds} =
        pgapp:equery("SELECT id, name FROM fleets WHERE user_id = $1", [UId]),
    List = lists:map(fun ({Id, Name}) ->
                             [{<<"id">>, Id},
                              {<<"name">>, Name}]
                     end, SIds),
    {ok, List}.

get_owner(Id) ->
    {ok, _, [{Owner}]} =
        pgapp:equery("SELECT user_id FROM fleets where id = $1", [Id]),
    {ok, Owner}.

get_data(Id) ->
    {ok, get_obj(Id)}.

put_data(Id, Obj) ->
    {<<"user_id">>, UserId} = lists:keyfind(<<"user_id">>, 1, Obj),
    {<<"name">>, Name} = lists:keyfind(<<"name">>, 1, Obj),
    {ok, _, _, [{FleetId, UserId, Name}]} =
        pgapp:equery("UPDATE fleets SET user_id = $2, name = $3 " ++
                         "WHERE id = $1 RETURNING id, user_id, name", [Id, UserId, Name]),
    {ok,
     [{<<"id">>, FleetId},
      {<<"user_id">>, UserId},
      {<<"name">>, Name}]}.

get_obj(Id) ->
    {ok, _, [{RespId, UserId, Name}]} =
        pgapp:equery("SELECT id, user_id, name FROM fleets WHERE id = $1", [Id]),
    {ok, _, ShipIds} =
        pgapp:equery("SELECT fleet_shiptype.id, shiptypes.id, " ++
                         "shiptypes.name, fleets.id, fleet_shiptype.count FROM fleets " ++
                         "JOIN fleet_shiptype ON (fleet_shiptype.fleet_id = fleets.id) " ++
                         "join shiptypes ON (shiptypes.id = fleet_shiptype.shiptype_id) " ++
                         "WHERE fleets.id = $1", [Id]),
    List = lists:map(fun ({CId, SId, SName, FId, Count}) ->
                             [{<<"id">>, CId},
                              {<<"shiptype_id">>, SId},
                              {<<"fleet_id">>, FId},
                              {<<"name">>, SName},
                              {<<"count">>, Count}]
                     end, ShipIds),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"name">>, Name},
     {<<"shiptypes">>, List}].
