-module(ds_web_api_fleet_shiptype).

-behaviour(ds_web_api_behaviour).

%-include("ds_web.hrl").

-export([
	 get_sub_handler/3,
	 delete/2,
	 forbidden/3,
	 create/3,
	 exists/2,
	 list_resources/1,
	 list_resources_for_parent/2,
	 get_data/2,
	 get_owner/2,
	 put_data/3]).

%% REST

%% Init Section

%% Implementation

get_sub_handler(Parent, This, []) ->
    {Parent, ds_web_api_module, This}.


delete(Db, Id) ->
    case pgsql:equery(Db, "DELETE FROM fleet_shiptype WHERE id = $1", [Id]) of
	{ok, 1} ->
	    true;
	_ -> 
	    false
    end.

forbidden(Db, Id, UId) ->
    case pgsql:equery(Db, "SELECT user_id FROM fleet_shiptype WHERE id = $1", [Id]) of
	{ok, _, [{UId}]} -> 
	    true;
	{ok, _, []} ->
	    true
    end.

exists(Db, Id) ->
    case pgsql:equery(Db, "SELECT count(*) FROM fleet_shiptype WHERE id = $1", [Id]) of
	{ok, _, [{1}]} ->
	    true;
	_ -> 
	    false
    end.

create(Db, UId, [{fleet, FId}, {user, UId}]) ->
    {ok, _, _, [{TypeId}]} =
	pgsql:equery(Db, "INSERT INTO fleet_shiptype (fleet_id) " ++
			 "VALUES ($1) RETURNING id", [FId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    FIdStr = list_to_binary(io_lib:format("~p", [FId])),
    {<<"/api/v1/user/", UIdStr/binary, "/fleet/", FIdStr/binary, "/shiptype/", Location/binary>>, TypeId}.

%%Internal

list_resources(Db) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT fleet_shiptype.id, fleet_id, shiptype_id, count, shiptypes.name " ++
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

list_resources_for_parent(Db, [{fleet, FId}, {user, _UId}]) ->
    {ok, _, SIds} =
	pgsql:equery(Db, "SELECT fleet_shiptype.id, fleet_id, shiptype_id, count, shiptypes.name " ++
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

get_owner(Db, Id) ->
    {ok, _, [{Owner}]} =
	pgsql:equery(Db, "SELECT fleets.user_id FROM feet_shiptype " ++
			 "JOIN fleets ON fleets.id = feet_shiptype.fleet_id " ++
			 "WHERE id = $1", [Id]),
    {ok, Owner}.

get_data(Db, Id) ->
    {ok, get_obj(Db, Id)}.

put_data(Db, Id, Obj) ->
    {<<"fleet_a">>, FleetA} =  lists:keyfind(<<"fleet_a">>, 1, Obj),
    {<<"fleet_b">>, FleetB} =  lists:keyfind(<<"fleet_b">>, 1, Obj),
    {ok, _, ResA} = 
	pgsql:equery(Db, "SELECT count, shiptype_id, name FROM fleet_shiptype " ++
			 "JOIN modules ON (modules.ship_id = fleet_shiptype.shiptype_id) " ++
			 "WHERE fleet_shiptype.fleet_id = $1",
		     [FleetA]),
    ShipsA = lists:foldl(fun ({Count, SId, Module}, [{Count, SId, Modules} | R]) ->
				 [{Count, SId, [Module | Modules] }| R];
			     ({Count, SId, Module}, R) ->
				 [{Count, SId, [Module]} | R]
			 end, [], ResA),
    {ok, _, ResB} = 
	pgsql:equery(Db, "SELECT count, shiptype_id, name FROM fleet_shiptype " ++
			 "JOIN modules ON (modules.ship_id = fleet_shiptype.shiptype_id) " ++
			 "WHERE fleet_shiptype.fleet_id = $1",
		     [FleetB]),
    ShipsB = lists:foldl(fun ({Count, SId, Module}, [{Count, SId, Modules} | R]) ->
				 [{Count, SId, [Module | Modules] }| R];
			     ({Count, SId, Module}, R) ->
				 [{Count, SId, [Module]} | R]
			 end, [], ResB),
    io:format("ShipsA: ~p~nShipsB: ~p~n", [ShipsA, ShipsB]),
    {ok, _, _} =
	pgsql:equery(Db, "INSERT INTO fights (id, fleet_a, fleet_b) " ++
			 "VALUES ($1, $2, $3)", [Id, FleetA, FleetB]),
    {ok, 
     [{<<"id">>, Id},
      {<<"fleet_a">>, FleetA},
      {<<"fleet_b">>, FleetB}]}.

get_obj(Db, Id) ->
    {ok, _, [{RespId, ShipId, Name, FleetId, Count}]} =
	pgsql:equery(Db, "SELECT fleet_shiptype.id, shiptypes.id, " ++
			 "shiptypes.name, fleet_shiptype.count, fleet_shiptype.count " ++
			 "FROM fleet_shiptype " ++
			 "JOIN shiptypes ON (shiptypes.id = fleet_shiptype.shiptype_id) " ++
			 "WHERE fleet_shiptype.id = $1", [Id]),
    [{<<"id">>, RespId},
     {<<"fleet_id">>, FleetId},
     {<<"shiptype_id">>, ShipId},
     {<<"count">>, Count},
     {<<"name">>, Name}].
