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
	  pid,
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
    {[<<"api">>, <<"v1">>, <<"user">>  | Path], Req2} = cowboy_http_req:path(Req),
    {UserId, ResourceStr2, ResId, SubPath} = 
	case Path of
	    [] -> 
		{undefined, undefined, undefined, []};
	    [UserIdStr] -> 
		{list_to_integer(binary_to_list(UserIdStr)), undefined, list_to_integer(binary_to_list(UserIdStr)), []};
	    [UserIdStr, ResourceStr] -> 
		{list_to_integer(binary_to_list(UserIdStr)), ResourceStr, undefined, []};
	    [UserIdStr, ResourceStr, ResIdStr | Rest] -> 
		{list_to_integer(binary_to_list(UserIdStr)), ResourceStr, list_to_integer(binary_to_list(ResIdStr)), Rest}
	end,
    
    {Method, Req3} = cowboy_http_req:method(Req2),
    io:format("~p~n", [[ResourceStr2, Modules]]),
    {ResourceStr2, Module} = lists:keyfind(ResourceStr2, 1, Modules),
    {ParentId, SubModule, SubModukeId} = Module:get_sub_handler(UserId, ResId, SubPath),
    Db = ds_web_server:init_db(),
    State = #state{
      db = Db,
      uid = UserId,
      module = SubModule,
      id = SubModukeId,
      pid = ParentId,
      method = Method,
      session = Session
     },
    io:format("~p~n", [State]),
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
	      pid = PId,
	      uid = UId
	     } = State) ->
    {Resp, Id} = Module:create(Db, UId, PId),
    State2 = State#state{id = Id},
    io:format("State2: ~p~n", [State2]),
    {Resp, Req, State2}.

%% Callbacks

to_json(Req,  #state{
	  module = Module,
	  db = Db,
	  pid = undefiend,
	  id = undefiend
	 } = State) ->
    {ok, Entety} = Module:list_resources(Db),
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
	  pid = PId,
	  id = undefined
	 } = State) ->
    {ok, Entety} = Module:list_resources_for_parent(Db, PId),
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
    io:format("~p~n", [State]),
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
    {ok, Req3, State}.
