-module(ds_web_api_protocol).

-export([init/3]).

%-include("ds_web.hrl").
-record(session,{
	  uid,
	  name = <<"">>,
	  admin
	 }).

-record(state, {
	  uid,	
	  pids,
	  id,
	  method,
	  resource,
	  session,
	  module,
	  db
	 }).

-export([rest_init/2,
	 forbidden/2,
	 allowed_methods/2,
	 content_types_provided/2,
	 content_types_accepted/2,
	 post_is_create/2,
	 create_path/2,
	 charsets_provided/2,
	 delete_resource/2,
	 delete_completed/2,
	 resource_exists/2,
	 allow_missing_post/2,
	 options/2
	]).

-export([to_json/2,
	 from_json/2
	]).

init({tcp, http}, _Req, _Opts) ->
    {upgrade, protocol, cowboy_http_rest}.

%% Init Section
rest_init(Req, [Modules]) ->
    Session = ds_web_session:get(Req),
    {UserId, ResourceStr2, ResId, SubPath} = 
	case cowboy_http_req:path(Req) of
	    {[<<"api">>, <<"v1">>, <<"user">>  | Path], Req2} ->
		case Path of
		    [] -> 
			{undefined, undefined, undefined, []};
		    [UserIdStr] -> 
			{parse_id(UserIdStr), undefined, parse_id(UserIdStr), []};
		    [UserIdStr, ResourceStr] -> 
			{parse_id(UserIdStr), ResourceStr, undefined, []};
		    [UserIdStr, ResourceStr, ResIdStr | Rest] -> 
			{parse_id(UserIdStr), ResourceStr, parse_id(ResIdStr), Rest}
		end;
	    {[<<"api">>, <<"v1">> | Path], Req2} ->
		case Path of
		    [] -> 
			{undefined, undefined, undefined, []};
		    [ResourceStr] -> 
			{undefined, ResourceStr, undefined, []};
		    [ResourceStr, ResIdStr | Rest] -> 
			{undefined, ResourceStr, parse_id(ResIdStr), Rest}
		end
	end,
    {Method, Req3} = cowboy_http_req:method(Req2),
    {ResourceStr2, Module} = lists:keyfind(ResourceStr2, 1, Modules),
    {ParentIds, SubModule, SubModukeId} =
	case UserId of
	    undefined ->
		Module:get_sub_handler([], ResId, SubPath);
	    _ ->
		Module:get_sub_handler([{user, UserId}], ResId, SubPath)
	end,
    Db = ds_web_server:init_db(),
    State = #state{
      db = Db,
      uid = UserId,
      module = SubModule,
      id = SubModukeId,
      pids = ParentIds,
      method = Method,
      session = Session
     },
    {ok, Req3, State}.

post_is_create(Req, State) ->
    {true, Req, State}.

allow_missing_post(Req, State) ->
    {false, Req, State}.

allowed_methods(Req, State) ->
    Methods = ['GET', 'HEAD', 'POST', 'OPTIONS', 'DELETE', 'PUT'],
    {Methods, Req, State}.

charsets_provided(Req, State) ->
    Charsets = [<<"*">>],
    {Charsets, Req, State}.

content_types_provided(Req, State) ->
    ContentTypes = [
		    {{<<"application">>, <<"json">>, []}, to_json},
		    {{<<"application">>, <<"json">>, [{<<"charset">>,<<"UTF-8">>}]}, to_json}
		   ],
    {ContentTypes, Req, State}.

content_types_accepted(Req, State) ->
    ContentTypes = [
		    {{<<"application">>, <<"json">>, []}, from_json},
		    {{<<"application">>, <<"json">>, [{<<"charset">>,<<"UTF-8">>}]}, from_json}
		   ],
    {ContentTypes, Req, State}.

%% Implementation

%delete_resource(Req, #state{client_state = #client_state{path = []}} = State) ->
%    {false, Req, State};

delete_resource(Req, #state{
		  module = Module,
		  db = Db,
		  id = Id
		 } = State) ->
    Resp = Module:delete(Db, Id),
    {Resp, Req, State}.

delete_completed(Req, State) ->
    {true, Req, State}.

options(Req, State) ->
    {ok, Req, State}.

forbidden(Req, #state{session = undefined} = State) ->
    {false, Req, State}; % TODO: Should be false unless for testing

forbidden(Req, #state{session = #session{admin = 1}} = State) ->
    {false, Req, State};

forbidden(Req, #state{
	    uid = UId1,
	    session = #session{uid = UId2}
	   } = State)  when UId1 =/= UId2 ->
    {true, Req, State};

forbidden(Req, #state{
	    db = Db,
	    module = Module,
	    id = Id,
	    uid = UId
	   } = State) ->
    Resp = Module:forbidden(Db, Id, UId),
    {Resp, Req, State}.


resource_exists(Req, #state{
		  id = undefined
		 } = State) ->
    {true, Req, State};

resource_exists(Req, #state{
		  module = Module,
		  db = Db,
		  id = Id
		 } = State) ->
    Resp = Module:exists(Db, Id),
    {Resp, Req, State}.


create_path(Req, #state{
	      module = Module,
	      db = Db,
	      pids = PIds,
	      uid = UId
	     } = State) ->
    {Resp, Id} = Module:create(Db, UId, PIds),
    State2 = State#state{id = Id},
    {Resp, Req, State2}.

%% Callbacks

to_json(Req, #state{
	  module = Module,
	  db = Db,
	  pids = [],
	  id = undefined
	 } = State) ->
    {ok, Entety} = Module:list_resources(Db),
    Res = case mochijson2:encode(Entety) of
	      R when is_binary(R) ->
		  R;
	      R ->
		  list_to_binary(R)
	  end,
    {Res, Req, State};

to_json(Req, #state{
	  module = Module,
	  db = Db,
	  pids = PIds,
	  id = undefined
	 } = State) ->
    {ok, Entety} = Module:list_resources_for_parent(Db, PIds),
    Res = case mochijson2:encode(Entety) of
	      R when is_binary(R) ->
		  R;
	      R ->
		  list_to_binary(R)
	  end,
    {Res, Req, State};

to_json(Req,  #state{
	  module = Module,
	  db = Db,
	  id = Id
	 } = State) ->
    {ok, Entety} = Module:get_data(Db, Id),
    Res = case mochijson2:encode(Entety) of
	      R when is_binary(R) ->
		  R;
	      R ->
		  list_to_binary(R)
	  end,
    {Res, Req, State}.

from_json(Req, #state{
	    module = Module,
	    db = Db,
	    id =  Id
	   } = State) ->
    {ok, Body, Req2} = cowboy_http_req:body(Req),
    {struct, Data} = case Body of
			 <<"">> ->
			     {struct, []};
			 B ->
			     mochijson2:decode(B)
		     end,
    {ok, Entety} = Module:put_data(Db, Id, Data),
    RespBody = case mochijson2:encode(Entety) of
		   R when is_binary(R) ->
		       R;
		   R ->
		       list_to_binary(R)
	       end,
    {ok, Req3} = cowboy_http_req:set_resp_body(RespBody, Req2),
    {true, Req3, State}.

parse_id(Id) ->
    case re:run(Id, <<"^\\d+$">>,[]) of
	nomatch -> 
	    Id;
	_ -> 
	    list_to_integer(binary_to_list(Id))
    end.

