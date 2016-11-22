-module(ds_web_api_fight).

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

get_sub_handler(Parent, This, []) ->
    {Parent, ds_web_api_fight, This}.

delete(Id) ->
    case pgapp:equery("DELETE FROM fights WHERE id = $1", [Id]) of
        {ok, 1} ->
            true;
        {ok, 0} ->
            false;
        _Error ->
            false
    end.

forbidden(Id, UId) ->
    case pgapp:equery("SELECT user_id FROM fights WHERE id = $1", [Id]) of
        {ok, _, [{UId}]} ->
            true;
        {ok, _, []} ->
            true
    end.

exists(Id) ->
    case pgapp:equery("SELECT count(*) FROM fights WHERE id = $1", [Id]) of
        {ok, _, [{1}]} ->
            true;
        _ ->
            false
    end.

create(_UID, _Path) ->
    Location = epic_uuid:v4(),
    {<<"/api/v1/fight/", Location/binary>>, Location}.

%%Internal

list_resources() ->
    {ok, _, SIds} =
        pgapp:equery("SELECT fights.id, " ++
                         "fleet_a.name AS fleet_a_name, " ++
                         "fleet_a.id AS fleet_a_id, " ++
                         "user_a.name AS user_a_name, " ++
                         "user_a.id AS user_a_id, " ++
                         "fleet_b.name AS fleet_b_name, " ++
                         "fleet_b.id AS fleet_b_id, " ++
                         "user_b.name AS user_b_name, " ++
                         "user_b.id AS user_b_id " ++
                         "FROM fights " ++
                         "JOIN fleets AS fleet_a ON (fights.fleet_a = fleet_a.id) " ++
                         "JOIN fleets AS fleet_b ON (fights.fleet_b = fleet_b.id) " ++
                         "JOIN users AS user_a ON (fleet_a.user_id = user_a.id) " ++
                         "JOIN users AS user_b ON (fleet_b.user_id = user_b.id)", []),
    List = lists:filter(fun ({Id, _, _, _, _, _, _, _, _}) ->
                                case ds_web_center:get_fight_server(Id) of
                                    error ->
                                        pgapp:equery("DELETE FROM fights " ++
                                                         "WHERE id = $1", [Id]),
                                        false;
                                    {ok, _} ->
                                        true
                                end
                        end, SIds),
    List2 = lists:map(fun ({Id,
                            FleetAName, FleetAId, UserAName, UserAId,
                            FleetBName, FleetBId, UserBName, UserBId
                           }) ->
                              [{<<"id">>, Id},
                               {<<"fleets">>,
                                [
                                 [{<<"id">>, FleetAId},
                                  {<<"name">>, FleetAName},
                                  {<<"user">>,
                                   [{<<"id">>, UserAId},
                                    {<<"name">>, UserAName}]}],
                                 [{<<"id">>, FleetBId},
                                  {<<"name">>, FleetBName},
                                  {<<"user">>,
                                   [{<<"id">>, UserBId},
                                    {<<"name">>, UserBName}]}]]}]
                      end, List),
    {ok, List2}.

list_resources_for_parent([{user, UId}]) ->
    {ok, _, SIds} =
        pgapp:equery("SELECT fights.id, " ++
                         "fleet_a.name AS fleet_a_name, " ++
                         "fleet_a.id AS fleet_a_id, " ++
                         "user_a.name AS user_a_name, " ++
                         "user_a.id AS user_a_id, " ++
                         "fleet_b.name AS fleet_b_name, " ++
                         "fleet_b.id AS fleet_b_id, " ++
                         "user_b.name AS user_b_name, " ++
                         "user_b.id AS user_b_id, " ++
                         "FROM fights " ++
                         "JOIN fleets AS fleet_a ON (fights.fleet_a = fleet_a.id) " ++
                         "JOIN fleets AS fleet_b ON (fights.fleet_b = fleet_b.id) " ++
                         "JOIN users AS user_a ON (fleet_a.user_id = user_a.id) " ++
                         "JOIN users AS user_b ON (fleet_b.user_id = user_b.id) " ++
                         "WHERE user_a.id = $1 OR user_b.id = $1",
                     [UId]),
    List = lists:map(fun ({Id,
                           FleetAName, FleetAId, UserAName, UserAId,
                           FleetBName, FleetBId, UserBName, UserBId
                          }) ->
                             [{<<"id">>, Id},
                              {<<"fleets">>,
                               [
                                [{<<"id">>, FleetAId},
                                 {<<"name">>, FleetAName},
                                 {<<"user">>,
                                  [{<<"id">>, UserAId},
                                   {<<"name">>, UserAName}]}],
                                [{<<"id">>, FleetBId},
                                 {<<"name">>, FleetBName},
                                 {<<"user">>,
                                  [{<<"id">>, UserBId},
                                   {<<"name">>, UserBName}]}]]}]
                     end, SIds),
    {ok, List}.

get_owner(Id) ->
    {ok, _, [{Owner}]} =
        pgapp:equery("SELECT user_id FROM fights WHERE id = $1", [Id]),
    {ok, Owner}.

get_data(Id) ->
    {ok, get_obj(Id)}.

put_data(Id, Obj) ->
    {<<"fleet_a">>, FleetAId} = lists:keyfind(<<"fleet_a">>, 1, Obj),
    {<<"fleet_b">>, FleetBId} = lists:keyfind(<<"fleet_b">>, 1, Obj),
    {ok, _, _, [{Id, FleetAId, FleetBId}]} =
        pgapp:equery("INSERT INTO fights (id, fleet_a, fleet_b) "++
                         "VALUES ($1, $2, $3) " ++
                         "RETURNING id, fleet_a, fleet_b",
                     [Id, FleetAId, FleetBId]),
    FleetA = explode_fleet(FleetAId),
    FleetB = explode_fleet(FleetBId),
    ds_web_center:add_fight(Id, FleetA, FleetB),
    {ok, [{<<"id">>, Id},
          {<<"fleet_a">>, FleetAId},
          {<<"fleet_b">>, FleetBId}]}.

get_obj(Id) ->
    {ok, _, [{Id,
              FleetAName, FleetAId, UserAName, UserAId,
              FleetBName, FleetBId, UserBName, UserBId}]} =
        pgapp:equery("SELECT fights.id, " ++
                         "fleet_a.name AS fleet_a_name, " ++
                         "fleet_a.id AS fleet_a_id, " ++
                         "user_a.name AS user_a_name, " ++
                         "user_a.id AS user_a_id, " ++
                         "fleet_b.name AS fleet_b_name, " ++
                         "fleet_b.id AS fleet_b_id, " ++
                         "user_b.name AS user_b_name, " ++
                         "user_b.id AS user_b_id " ++
                         "FROM fights " ++
                         "JOIN fleets AS fleet_a ON (fights.fleet_a = fleet_a.id) " ++
                         "JOIN fleets AS fleet_b ON (fights.fleet_b = fleet_b.id) " ++
                         "JOIN users AS user_a ON (fleet_a.user_id = user_a.id)  " ++
                         "JOIN users AS user_b ON (fleet_b.user_id = user_b.id) " ++
                         "WHERE fights.id = $1",
                     [Id]),
    [{<<"id">>, Id},
     {<<"fleets">>,
      [
       [{<<"id">>, FleetAId},
        {<<"name">>, FleetAName},
        {<<"user">>,
         [{<<"id">>, UserAId},
          {<<"name">>, UserAName}]}],
       [{<<"id">>, FleetBId},
        {<<"name">>, FleetBName},
        {<<"user">>,
         [{<<"id">>, UserBId},
          {<<"name">>, UserBName}]}]]}].


                                                % c("ds_web/src/ds_web_api_fight")

explode_fleet(Id) ->
    {ok, _, Res} =
        pgapp:equery("SELECT fleet_shiptype.count, "
                     "shiptypes.id, "
                     "modules.name, "
                     "scripts.code "
                     "FROM fleet_shiptype "
                     "JOIN modules ON (modules.ship_id = fleet_shiptype.shiptype_id) "
                     "JOIN shiptypes ON (shiptypes.id = fleet_shiptype.shiptype_id) "
                     "JOIN scripts ON (scripts.id = shiptypes.script_id) "
                     "WHERE fleet_shiptype.fleet_id = $1",
                     [Id]),
    %%io:format("Res: ~p => ~p~n", [Id, Res]),
    {Count, _, Ships}
        = lists:foldl(
            fun ({Count, SID, Module, _Code},
                 {C, SID, [{Count, Modules, Code} | R]}) ->
                    {C, SID, [{Count, [Module | Modules], Code}| R]};
                  ({Count, SID, Module, Code}, {C, _Id, R}) ->
                    {C + Count, SID, [{Count, [Module], Code} | R]}
              end, {0, undefined, []}, Res),
    {Count, Ships}.
