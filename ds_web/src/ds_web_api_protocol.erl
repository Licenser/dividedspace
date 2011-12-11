-module(ds_web_api_protocol).
-export([init/3]).

%-include("ds_web.hrl").
-record(session,{
	  uid,
	  name = <<"">>,
	  admin
	 }).


-record(client_state, 
	{
	  db,
	  session,
	  path,
	  method,
	  id
	  }).
			  

-record(state, {
	  client_state,
	  module
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
	 options/2
	]).

-export([to_json/2,
	 from_json/2
	]).

init({tcp, http}, _Req, _Opts) ->
    {upgrade, protocol, cowboy_http_rest}.

%% Init Section
rest_init(Req, [Module, Db]) ->
    Session = ds_web_session:get(Req),
    {[<<"api">>, <<"v1">>, _ | Path], _} = cowboy_http_req:path(Req),
    Id = case Path of
	     [] -> undefined;
	     [IdStr] -> 
		 list_to_integer(binary_to_list(IdStr))
	 end,
    {Method, _} = cowboy_http_req:method(Req),
    {ok, Req, #state{
	   module = Module,
	   client_state = #client_state{
	     session = Session,
	     method = Method,
	     path = Path,
	     id = Id,
	     db = Db}
	  }}.

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

delete_resource(Req, #state{client_state = #client_state{path = []}} = State) ->
    {false, Req, State};

delete_resource(Req, State) ->
    hand_down(Req, delete, State).



delete_completed(Req, State) ->
    {true, Req, State}.
    
options(Req, State) ->
    {ok, Req, State}.

forbidden(Req, #state{client_state = #client_state{session = undefined}} = State) ->
    {false, Req, State}; % TODO: Should be false unless for testing

forbidden(Req, #state{client_state = #client_state{session = #session{admin = 1}}} = State) ->
    {false, Req, State};

forbidden(Req, #state{client_state = #client_state{path = []}} = State) ->
    {false, Req, State};

forbidden(Req, State) ->
    hand_down(Req, forbidden, State).

resource_exists(Req, #state{client_state = #client_state{id = undefined}} = State) ->
    {true, Req, State};

resource_exists(Req, State) ->
    hand_down(Req, exists, State).


create_path(Req, State) ->
    hand_down(Req, creates, State).

%% Callbacks

to_json(Req,  #state{
	  module = Module,
	  client_state = ClientState
	 } = State) ->
    {ok, Entety} = Module:get_data(ClientState),
    {list_to_binary(mochijson2:encode(Entety)), Req, State}.

from_json(Req, #state{
	    module = Module,
	    client_state = ClientState
	   } = State) ->
    {ok, Body, Req2} = cowboy_http_req:body(Req),
    {struct, Data} = mochijson2:decode(Body),
    {ok, Entety} = Module:put_data(Data, ClientState),
    RespBody = list_to_binary(mochijson2:encode(Entety)),
    {ok, Req3} = cowboy_http_req:set_resp_body(RespBody, Req2),
    {ok, Req3, State}.

%%Internal

hand_down(Req, Function, #state{
		 module = Module,
		 client_state = ClientState
		} = State) ->
    {Resp, ClientState2} = Module:Function(ClientState),
    {Resp, Req, State#state{client_state=ClientState2}}.
