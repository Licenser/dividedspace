-module(ds_web_api_fleet_shiptype).

-behaviour(ds_web_api_behaviour).

%%-include("ds_web.hrl").

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

get_sub_handler(Parent, This, []) ->
    {Parent, ds_web_api_module, This}.


delete(Id) ->
    case pgapp:equery("DELETE FROM fleet_shiptype WHERE id = $1", [Id]) of
        {ok, 1} ->
            true;
        _ ->
            false
    end.

forbidden(Id, UId) ->
    case pgapp:equery("SELECT user_id FROM fleet_shiptype WHERE id = $1", [Id]) of
        {ok, _, [{UId}]} ->
            true;
        {ok, _, []} ->
            true
    end.

exists(Id) ->
    case pgapp:equery("SELECT count(*) FROM fleet_shiptype WHERE id = $1", [Id]) of
        {ok, _, [{1}]} ->
            true;
        _ ->
            false
    end.

create(UId, [{fleet, FId}, {user, UId}]) ->
    {ok, _, _, [{TypeId}]} =
        pgapp:equery("INSERT INTO fleet_shiptype (fleet_id) " ++
                         "VALUES ($1) RETURNING id", [FId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    FIdStr = list_to_binary(io_lib:format("~p", [FId])),
    {<<"/api/v1/user/", UIdStr/binary, "/fleet/", FIdStr/binary, "/shiptype/", Location/binary>>, TypeId}.

%%Internal

list_resources() ->
    {ok, _, SIds} =
        pgapp:equery("SELECT fleet_shiptype.id, fleet_id, shiptype_id, count, shiptypes.name " ++
                         "FROM feet_shiptype " ++
                         "JOIN shiptypes ON (shiptypes.id = fleet_shiptype.shiptype_id)", []),
    List = lists:map(fun ({Id, FleetId, ShipId,Count, Name}) ->
                             [{<<"id">>, Id},
                              {<<"fleet_id">>, FleetId},
                              {<<"shiptype_id">>, ShipId},
                              {<<"count">>, Count},
                              {<<"ship_name">>, Name}]
                     end, SIds),
    {ok, List}.

list_resources_for_parent([{fleet, FId}, {user, _UId}]) ->
    {ok, _, SIds} =
        pgapp:equery("SELECT fleet_shiptype.id, fleet_id, shiptype_id, count, shiptypes.name " ++
                         "FROM feet_shiptype " ++
                         "JOIN shiptypes ON (shiptypes.id = fleet_shiptype.shiptype_id) " ++
                         "WHERE fleet_id = $1", [FId]),
    List = lists:map(fun ({Id, FleetId, ShipId,Count, Name}) ->
                             [{<<"id">>, Id},
                              {<<"fleet_id">>, FleetId},
                              {<<"shiptype_id">>, ShipId},
                              {<<"count">>, Count},
                              {<<"ship_name">>, Name}]
                     end, SIds),
    {ok, List}.

get_owner(Id) ->
    {ok, _, [{Owner}]} =
        pgapp:equery("SELECT fleets.user_id FROM feet_shiptype " ++
                         "JOIN fleets ON fleets.id = feet_shiptype.fleet_id " ++
                         "WHERE id = $1", [Id]),
    {ok, Owner}.

get_data(Id) ->
    {ok, get_obj(Id)}.

put_data(Id, Obj) ->
    {<<"fleet_id">>, FleetId} = lists:keyfind(<<"fleet_id">>, 1, Obj),
    {<<"shiptype_id">>, ShipId} = lists:keyfind(<<"shiptype_id">>, 1, Obj),
    {<<"count">>, Count} = lists:keyfind(<<"count">>, 1, Obj),
    {ok, _, _, [{RespId, FleetId, ShipId, Count}]} =
        pgapp:equery("UPDATE fleet_shiptype SET fleet_id = $2, " ++
                         "shiptype_id = $3, count = $4 " ++
                         "WHERE id = $1 RETURNING id, fleet_id, shiptype_id, count",
                     [Id, FleetId, ShipId, Count]),
    {ok, _, [{Name}]} =
        pgapp:equery("SELECT name FROM shiptypes WHERE id = $1", [ShipId]),
    {ok,
     [{<<"id">>, RespId},
      {<<"fleet_id">>, FleetId},
      {<<"shiptype_id">>, ShipId},
      {<<"count">>, Count},
      {<<"name">> , Name}]}.


get_obj(Id) ->
    {ok, _, [{RespId, ShipId, Name, FleetId, Count}]} =
        pgapp:equery("SELECT fleet_shiptype.id, shiptypes.id, " ++
                         "shiptypes.name, fleet_shiptype.count, fleet_shiptype.count " ++
                         "FROM fleet_shiptype " ++
                         "JOIN shiptypes ON (shiptypes.id = fleet_shiptype.shiptype_id) " ++
                         "WHERE fleet_shiptype.id = $1", [Id]),
    [{<<"id">>, RespId},
     {<<"fleet_id">>, FleetId},
     {<<"shiptype_id">>, ShipId},
     {<<"count">>, Count},
     {<<"name">>, Name}].
