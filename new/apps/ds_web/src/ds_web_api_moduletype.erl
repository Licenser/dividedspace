%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  9 Dec 2011 by Heinz N. Gies <licenser@licenser.net>
%%%-------------------------------------------------------------------
-module(ds_web_api_moduletype).

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


%% -define(GETTER(Official, Internal, Converter),
%%         get(_, [Official], _, _, Req) ->
%%                ModuleData = lists:map(Converter, ds_web_center:get_modules(Internal)),
%%                ds_web_api_handler:json_reply(ModuleData, Req);

%%             get(_, [Official, Name], _, _, Req) ->
%%                elem_get(Internal, Name, Converter, Req);

%%             get(_, [Official, Name, Key], _, _, Req) ->
%%                value_get(Internal, Name, Key, Converter, Req)
%%                    ).

%%%===================================================================
%%% API
%%%===================================================================

get_sub_handler(Parents, This, []) ->
    {Parents, ds_web_api_moduletype, This}.

delete(_Id) ->
    false.

forbidden(_Id, _UId) ->
    false.


exists(<<"armor">>) ->
    true;

exists(<<"engine">>) ->
    true;

exists(<<"generator">>) ->
    true;

exists(<<"hull">>) ->
    true;

exists(<<"shield">>) ->
    true;

exists(<<"weapon">>) ->
    true;

exists(_Id) ->
    false.

create(_UId, _Parents) ->
    false.

list_resources() ->
    {ok, [<<"armor">>,
          <<"engine">>,
          <<"generator">>,
          <<"hull">>,
          <<"shield">>,
          <<"weapon">>]}.

list_resources_for_parent(_Parent) ->
    {ok, [<<"armor">>,
          <<"engine">>,
          <<"generator">>,
          <<"hull">>,
          <<"shield">>,
          <<"weapon">>]}.

get_owner(_Id) ->
    {ok, all}.

get_data(Id) ->
    ModuleData = lists:map(fun convert/1, ds_web_center:get_modules(binary_to_list(Id))),
    {ok, ModuleData}.

put_data(_Id, _Obj) ->
    false.

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

%%%===================================================================
%%% Internal functions
%%%===================================================================
convert({armor, Name, Size, Mass, Integrety, HitPropability, HitPriority, DamageAbsorbtion}) ->
    [{type, <<"armor">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"damageabsorbtion">>, DamageAbsorbtion}];

convert({engine, Name, Size, Mass, Integrety, HitPropability, HitPriority, EnergyUsage, Range}) ->
    [{type, <<"engine">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"energyusage">>, EnergyUsage}, {<<"range">>, Range}];

convert({generator, Name, Size, Mass, Integrety, HitPropability, HitPriority, DischargeRate, Output, Capacity, Efficiency}) ->
    [{type, <<"generator">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"dischargerage">>, DischargeRate}, {<<"output">>, Output}, {<<"capacity">>, Capacity}, {<<"efficiency">>, Efficiency}];

convert({hull, Name, Size, Mass, Integrety, HitPropability, HitPriority, Maneuverability}) ->
    [{type, <<"hull">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"maneuverability">>, Maneuverability}];

convert({shield, Name, Size, Mass, Integrety, HitPropability, HitPriority, Energy}) ->
    [{type, <<"shield">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"energy">>, Energy}];

convert({weapon, Name, Size, Mass, Integrety, HitPropability, HitPriority, Damage, FireRate, Range, Variation, Accuracy, Rotatability, EnergyUsage}) ->
    [{type, <<"weapon">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"damage">>, Damage}, {<<"firerate">>, FireRate}, {<<"range">>, Range}, {<<"variation">>, Variation}, {<<"accuracy">>, Accuracy}, {<<"rotatability">>, Rotatability}, {<<"energyusage">>, EnergyUsage}].


%% get_module(ModuleType, Name, Converter) ->
%%     ModuleData = ds_web_center:get_modules(ModuleType),
%%     case lists:keyfind(Name, 2, ModuleData) of
%%         false ->
%%             false;
%%         Element ->
%%             Converter(Element)
%%     end.

%% elem_get(ModuleType, Name, Converter, Req) ->
%%     case get_module(ModuleType, Name, Converter) of
%%         false ->
%%             cowboy_req:reply(404, [], <<"Not found">>, Req);
%%         Element ->
%%             ds_web_api_handler:json_reply(Element, Req)
%%     end.

%% value_get(ModuleType, Name, Key, Converter, Req) ->
%%     case get_module(ModuleType, Name, Converter) of
%%         false ->
%%             owboy_http_req:reply(404, [], <<"Not found">>, Req);
%%         ModuleData ->
%%             case lists:keyfind(Key, 1, ModuleData) of
%%                 false -> cowboy_req:reply(404, [], <<"Not found">>, Req);
%%                 {_, Value} -> ds_web_api_handler:json_reply(Value, Req)
%%             end
%%     end.
