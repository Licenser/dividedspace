-module(ds_web_api_shiptype).

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


get_sub_handler(Parents, This, [<<"module">>]) ->
    {[{shiptype, This} | Parents], ds_web_api_module, undefined};

get_sub_handler(Parents, This, [<<"module">>, Id]) ->
    {[{shiptype, This} | Parents], ds_web_api_module, list_to_integer(binary_to_list(Id))};

get_sub_handler([Parents], This, []) ->
    {[Parents], ds_web_api_shiptype, This}.

delete(Id) ->
    R = pgapp:equery("DELETE FROM shiptypes WHERE id = $1", [Id]),
    case R of
        {ok, 1} ->
            true;
        {ok, 0} ->
            false;
        _Error ->
            false
    end.

forbidden(Id, UId) ->
    case pgapp:equery("SELECT user_id FROM shiptypes WHERE id = $1", [Id]) of
        {ok, _, [{UId}]} ->
            true;
        {ok, _, []} ->
            true
    end.

exists(Id) ->
    case pgapp:equery("SELECT count(*) FROM shiptypes WHERE id = $1", [Id]) of
        {ok, _, [{1}]} ->
            true;
        _ ->
            false
    end.

create(UId, [{user, UId}]) ->
    {ok, _, _, [{TypeId}]} =
        pgapp:equery("INSERT INTO shiptypes (user_id) VALUES ($1) RETURNING id", [UId]),
    Location = list_to_binary(io_lib:format("~p", [TypeId])),
    UIdStr = list_to_binary(io_lib:format("~p", [UId])),
    {<<"/api/v1/user/", UIdStr/binary, "/shiptype/", Location/binary>>, TypeId}.


%%Internal


list_resources() ->
    {ok, _, SIds} =
        pgapp:equery("SELECT id, name FROM shiptypes", []),
    List = lists:map(fun ({Id, Name}) ->
                             [{<<"id">>, Id},
                              {<<"name">>, Name}]
                     end, SIds),
    {ok, List}.

list_resources_for_parent([{user, UId}]) ->
    {ok, _, SIds} =
        pgapp:equery("SELECT id, name FROM shiptypes WHERE user_id = $1", [UId]),
    List = lists:map(fun ({Id, Name}) ->
                             [{<<"id">>, Id},
                              {<<"name">>, Name}]
                     end, SIds),
    {ok ,List}.

get_owner(Id) ->
    {ok, _, [{Owner}]} =
        pgapp:equery("SELECT user_id FROM shiptypes where id = $1", [Id]),
    {ok, Owner}.

get_data(Id) ->
    {ok, get_obj(Id)}.

put_data(Id, Obj) ->
    {<<"user_id">>, UserId} = lists:keyfind(<<"user_id">>, 1, Obj),
    {<<"name">>, Name} = lists:keyfind(<<"name">>, 1, Obj),
    {<<"script_id">>, ScriptId} = lists:keyfind(<<"script_id">>, 1, Obj),
    {ok, _, _, [{RespId, UserId, Name, ScriptId}]} =
        pgapp:equery("UPDATE shiptypes SET user_id = $2, name = $3, script_id = $4" ++
                         "WHERE id = $1 RETURNING id, user_id, name, script_id", [Id, UserId, Name, ScriptId]),
    {ok,
     [{<<"id">>, RespId},
      {<<"user_id">>, UserId},
      {<<"name">>, Name},
      {<<"script_id">>, ScriptId}]}.

get_obj(Id) ->
    {ok, _, [{RespId, UserId, Name, ScriptId}]} =
        pgapp:equery("SELECT id, user_id, name, script_id FROM shiptypes WHERE id = $1", [Id]),
    {ok, _, MIds} =
        pgapp:equery("SELECT id, name  FROM modules WHERE ship_id = $1", [Id]),
    List = lists:map(fun ({MId, MName}) ->
                             [{<<"id">>, MId},
                              {<<"name">>, MName}]
                     end, MIds),
    [{<<"id">>, RespId},
     {<<"user_id">>, UserId},
     {<<"name">>, Name},
     {<<"script_id">>, ScriptId},
     {<<"modules">>, List}].
