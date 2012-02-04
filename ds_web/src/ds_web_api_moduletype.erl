%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@Schroedinger.local>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  9 Dec 2011 by Heinz N. Gies <licenser@Schroedinger.local>
%%%-------------------------------------------------------------------
-module(ds_web_api_moduletype).

%% API
-export([get/5,
	 post/5]).

-define(GETTER(Official, Internal, Converter),
get(_, [Official], _, _, Req) ->
    ModuleData = lists:map(Converter, ds_web_center:get_modules(Internal)),
    ds_web_api_handler:json_reply(ModuleData, Req);

get(_, [Official, Name], _, _, Req) ->
    elem_get(Internal, Name, Converter, Req);

get(_, [Official, Name, Key], _, _, Req) ->
    value_get(Internal, Name, Key, Converter, Req)
).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

get(_, [], _, _, Req) ->
    ds_web_api_handler:json_reply([<<"armor">>,	
		<<"engine">>,	
		<<"generator">>,
		<<"hull">>,
		<<"shield">>,
		<<"weapon">>], Req);

?GETTER(<<"armor">>, "armor", fun convert_armor/1);
?GETTER(<<"engine">>, "engines", fun convert_engine/1);
?GETTER(<<"generator">>, "generators", fun convert_generator/1);
?GETTER(<<"hull">>, "hulls", fun convert_hull/1);
?GETTER(<<"shield">>, "shields", fun convert_shield/1);
?GETTER(<<"weapon">>, "weapons", fun convert_weapon/1);
get('GET', _, _, _, Req) ->
    cowboy_http_req:reply(404, [], <<"Not found">>, Req);
get(_, _, _, _, Req) ->
    cowboy_http_req:reply(403, [], <<"Permission Denied">>, Req).

post(_, _, _, _, Req) ->
    cowboy_http_req:reply(403, [], <<"Permission Denied">>, Req).


%%%===================================================================
%%% Internal functions
%%%===================================================================
convert_armor ({armor, Name, Size, Mass, Integrety, HitPropability, HitPriority, DamageAbsorbtion}) ->
    [{type, <<"armor">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"damageabsorbtion">>, DamageAbsorbtion}].

convert_engine ({engine, Name, Size, Mass, Integrety, HitPropability, HitPriority, EnergyUsage, Range}) ->
    [{type, <<"engine">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"energyusage">>, EnergyUsage}, {<<"range">>, Range}].

convert_generator ({generator, Name, Size, Mass, Integrety, HitPropability, HitPriority, DischargeRate, Output, Capacity, Efficiency}) ->
    [{type, <<"generator">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"dischargerage">>, DischargeRate}, {<<"output">>, Output}, {<<"capacity">>, Capacity}, {<<"efficiency">>, Efficiency}].

convert_hull ({hull, Name, Size, Mass, Integrety, HitPropability, HitPriority, Maneuverability}) ->
    [{type, <<"hull">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"maneuverability">>, Maneuverability}].


convert_shield ({shield, Name, Size, Mass, Integrety, HitPropability, HitPriority, Energy}) ->
    [{type, <<"shield">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"energy">>, Energy}].

convert_weapon ({weapon, Name, Size, Mass, Integrety, HitPropability, HitPriority, Damage, FireRate, Range, Variation, Accuracy, Rotatability, EnergyUsage}) ->
    [{type, <<"weapon">>}, {<<"name">>, Name}, {<<"size">>, Size}, {<<"mass">>, Mass}, {<<"integrety">>, Integrety}, {<<"hitpropability">>, HitPropability}, {<<"hitpriority">>, HitPriority},
     {<<"damage">>, Damage}, {<<"firerate">>, FireRate}, {<<"range">>, Range}, {<<"variation">>, Variation}, {<<"accuracy">>, Accuracy}, {<<"rotatability">>, Rotatability}, {<<"energyusage">>, EnergyUsage}].

get_module(ModuleType, Name, Converter) ->
    ModuleData = ds_web_center:get_modules(ModuleType),
    case lists:keyfind(Name, 2, ModuleData) of
	false -> 
	    false;
	Element -> 
	    Converter(Element)
    end.

elem_get(ModuleType, Name, Converter, Req) ->
    case get_module(ModuleType, Name, Converter) of
	false -> 
	    cowboy_http_req:reply(404, [], <<"Not found">>, Req);
	Element -> 
	    ds_web_api_handler:json_reply(Element, Req)
    end.

value_get(ModuleType, Name, Key, Converter, Req) ->
    case get_module(ModuleType, Name, Converter) of
	false -> 
	    owboy_http_req:reply(404, [], <<"Not found">>, Req);
	ModuleData -> 
	    case lists:keyfind(Key, 1, ModuleData) of
		false -> cowboy_http_req:reply(404, [], <<"Not found">>, Req);
		{_, Value} -> ds_web_api_handler:json_reply(Value, Req)
	    end
    end.
