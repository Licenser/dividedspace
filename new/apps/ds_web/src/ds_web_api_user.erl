%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 10 Dec 2011 by Heinz N. Gies <licenser@licenser.net>
%%%-------------------------------------------------------------------
-module(ds_web_api_user).

%-include("ds_web.hrl").
-record(session,{
	  uid = -1,
	  name = <<"">>,
	  admin = false
	 }).


%% API
-export([get/5,
	post/5]).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

get(_Vsn, [], #session{admin=1}, Db, Req) ->
    case pgsql:equery(Db, "SELECT id FROM users", []) of
	{ok, _, UIds} -> 
	    ds_web_api_handler:json_reply(
	      ds_web_api_handler:flatten_sql_res(UIds), Req);
	_Error -> cowboy_req:reply(505, [], "error", Req)
    end;

get(_Vsn, [], #session{uid=Uid}, _Db, Req) ->
    ds_web_api_handler:json_reply([Uid], Req);


get(_Vsn, [UIdStr | Rest], #session{uid=CUId, admin= Admin}, Db, Req) ->
    ReqUId = list_to_integer(binary_to_list(UIdStr)),
    case {CUId, Admin} of
	{_, 1} -> 
	    get_for_user(ReqUId, Rest, Db, Req);
	{ReqUId, _} -> 
	    get_for_user(ReqUId, Rest, Db, Req);
	_ ->
	    cowboy_req:reply(403, [], "forbidden", Req)
    end.


post(_Vsn, _, _, _Db, Req) ->
    cowboy_req:reply(505, [], "error", Req).

%%%===================================================================
%%% Internal functions
%%%===================================================================


get_for_user(UId, [], Db, Req) ->
    case pgsql:equery(Db, "SELECT id, name, rights FROM users WHERE id = $1", [UId]) of
	{ok, _, [{RespUId, Name, Rights}]} -> 
	    ds_web_api_handler:json_reply([{id, RespUId},
					   {name, Name},
					   {rights, Rights}], Req);
	{ok, _, []} -> 
	    cowboy_req:reply(404, [], "user not found", Req);
	Error -> 
	    cowboy_req:reply(505, [], "error" ++ io_lib:format("~p", [Error]), Req)
    end;

get_for_user(UId, [<<"scripts">>], Db, Req) ->
        case pgsql:equery(Db, "SELECT id FROM scripts WHERE user_id = $1", [UId]) of
	    {ok, _, Results} -> 
		ds_web_api_handler:json_reply(ds_web_api_handler:flatten_sql_res(Results), Req);
	    Error -> 
		cowboy_req:reply(505, [], "error" ++ io_lib:format("~p", [Error]), Req)
    end;

get_for_user(UId, [<<"shiptypes">>], Db, Req) ->
        case pgsql:equery(Db, "SELECT id FROM ship_types WHERE user_id = $1", [UId]) of
	    {ok, _, Results} -> 
		ds_web_api_handler:json_reply(ds_web_api_handler:flatten_sql_res(Results), Req);
	    Error -> 
		cowboy_req:reply(505, [], "error" ++ io_lib:format("~p", [Error]), Req)
	end.
