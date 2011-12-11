%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@Schroedinger.local>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 10 Dec 2011 by Heinz N. Gies <licenser@Schroedinger.local>
%%%-------------------------------------------------------------------
-module(ds_web_api_script).

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
    case pgsql:equery(Db, "SELECT id FROM scripts", []) of
	{ok, _, SIds} -> 
	    ds_web_api_handler:json_reply(ds_web_api_handler:flatten_sql_res(SIds), Req);
	_Error -> cowboy_http_req:reply(505, [], "error", Req)
    end;

get(_Vsn, [], #session{uid=Uid}, Db, Req) ->
    case pgsql:equery(Db, "SELECT id FROM scripts WHERE user_id=$1", [Uid]) of
	{ok, _, SIds} -> 
	    ds_web_api_handler:json_reply(ds_web_api_handler:flatten_sql_res(SIds), Req);
	_Error -> cowboy_http_req:reply(505, [], "error", Req)
    end;

get(_Vsn, [SIdStr | Rest], #session{uid=CUId, admin= Admin}, Db, Req) ->
    ReqSId = list_to_integer(binary_to_list(SIdStr)),
    case pgsql:equery(Db, "SELECT uiser_id FROM scripts WHERE id=$1", [ReqSId]) of
	{ok, _, [{SUId}]} -> 
	        case {CUId, Admin} of
		    {_, 1} -> 
			get_for_user(ReqSId, Rest, Db, Req);
		    {SUId, _} -> 
			get_for_user(ReqSId, Rest, Db, Req);
		    _ ->
			cowboy_http_req:reply(403, [], "forbidden", Req)
		end;
	_Error -> cowboy_http_req:reply(505, [], "error", Req)
    end.

post(_Vsn, [], _, Db, Req) ->
    cowboy_http_req:reply(505, [], "error", Req);

post(_Vsn, [SIdStr | Rest], #session{uid=CUId, admin= Admin}, Db, Req) ->
    ReqSId = list_to_integer(binary_to_list(SIdStr)),
    case pgsql:equery(Db, "SELECT uiser_id FROM scripts WHERE id=$1", [ReqSId]) of
	{ok, _, [{SUId}]} -> 
	        case {CUId, Admin} of
		    {_, 1} -> 
			post_for_user(ReqSId, Rest, Db, Req);
		    {SUId, _} -> 
			post_for_user(ReqSId, Rest, Db, Req);
		    _ ->
			cowboy_http_req:reply(403, [], "forbidden", Req)
		end;
	_Error -> cowboy_http_req:reply(505, [], "error", Req)
    end.

%%%===================================================================
%%% Internal functions
%%%===================================================================


post_for_user(Id,[],Db,Req) ->    
%    mochijson2:decode(Data)
    cowboy_http_req:reply(505, [], "error", Req);

post_for_user(_,_,_, Req) ->
    cowboy_http_req:reply(505, [], "error", Req).

get_for_user(Id, [], Db, Req) ->
    case pgsql:equery(Db, "SELECT id, name, user_id, code FROM scripts WHERE id = $1", [Id]) of
	{ok, _, [{RespId, Name, UserId, Code}]} -> 
	    ds_web_api_handler:json_reply([{id, RespId},
					   {name, Name},
					   {user_id, UserId},
					   {code, Code}
					  ], Req);
	{ok, _, []} -> 
	    cowboy_http_req:reply(404, [], "not found", Req);
	Error -> 
	    cowboy_http_req:reply(505, [], "error" ++ io_lib:format("~p", [Error]), Req)
    end.
