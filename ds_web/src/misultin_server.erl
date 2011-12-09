-module(misultin_server).
-behaviour(gen_server).

						% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3]).

						% API
-export([start_link/0, stop/0]).

						% records
-record(state, {
	  port
	 }).

-record(session,{
	  uid=-1,
	  name=""
	 }).
						% macros
-define(SERVER, ?MODULE).

%% ============================ \/ API ======================================================================

%% Function: {ok,Pid} | ignore | {error, Error}
%% Description: Starts the server.
start_link() ->
    gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

%% Function: -> ok
%% Description: Manually stops the server.
stop() ->
    gen_server:cast(?SERVER, stop).

%% ============================ /\ API ======================================================================


%% ============================ \/ GEN_SERVER CALLBACKS =====================================================

%% ----------------------------------------------------------------------------------------------------------
%% Function: -> {ok, State} | {ok, State, Timeout} | ignore | {stop, Reason}
%% Description: Initiates the server.
%% ----------------------------------------------------------------------------------------------------------
init([]) ->
%% trap_exit -> this gen_server needs to be supervised
    process_flag(trap_exit, true),
    {ok, Host} = application:get_env(dbHost),
    {ok, User} = application:get_env(dbUser),
    {ok, Pass} = application:get_env(dbPass),
    {ok, Db} = application:get_env(db),
    {ok, C} = pgsql:connect(Host, User, Pass, [{database, Db}]),
						% start misultin & set monitor
    Port = case application:get_env(port) of
	       {ok, Prt} -> Prt;
	       _ -> 8080
	   end,
    misultin:start_link([{port, Port},
                         {loop, fun(Req) -> handle_http(C, Req) end}, 
                         {ws_loop, fun (Ws) ->
                                           "/fight/" ++ Fight = Ws:get(path),
                                           {ok, FPid} = gen_server:call({global, center_server}, {get_fight, Fight}),
                                           {ok, Server} = ws_sup:start_child(Ws, FPid),
                                           handle_websocket(Ws, Server)
                                   end}, {ws_autoexit, false}]),
    erlang:monitor(process, misultin),
    {ok, #state{port = Port}}.

%% ----------------------------------------------------------------------------------------------------------
%% Function: handle_call(Request, From, State) -> {reply, Reply, State} | {reply, Reply, State, Timeout} |
%%									   {noreply, State} | {noreply, State, Timeout} |
%%									   {stop, Reason, Reply, State} | {stop, Reason, State}
%% Description: Handling call messages.
%% ----------------------------------------------------------------------------------------------------------

%% handle_call generic fallback
handle_call(_Request, _From, State) ->
    {reply, undefined, State}.

%% ----------------------------------------------------------------------------------------------------------
%% Function: handle_cast(Msg, State) -> {noreply, State} | {noreply, State, Timeout} | {stop, Reason, State}
%% Description: Handling cast messages.
%% ----------------------------------------------------------------------------------------------------------

%% manual shutdown
handle_cast(stop, State) ->
    {stop, normal, State};

%% handle_cast generic fallback (ignore)
handle_cast(_Msg, State) ->
    {noreply, State}.

%% ----------------------------------------------------------------------------------------------------------
%% Function: handle_info(Info, State) -> {noreply, State} | {noreply, State, Timeout} | {stop, Reason, State}
%% Description: Handling all non call/cast messages.
%% ----------------------------------------------------------------------------------------------------------

%% handle info when misultin server goes down -> take down misultin_gen_server too [the supervisor will take everything up again]
handle_info({'DOWN', _, _, {misultin, _}, _}, State) ->
    {stop, normal, State};

%% handle_info generic fallback (ignore)
handle_info(_Info, State) ->
    {noreply, State}.

%% ----------------------------------------------------------------------------------------------------------
%% Function: terminate(Reason, State) -> void()
%% Description: This function is called by a gen_server when it is about to terminate. When it returns,
%% the gen_server terminates with Reason. The return value is ignored.
%% ----------------------------------------------------------------------------------------------------------
terminate(_Reason, _State) ->
						% stop misultin
    misultin:stop(),
    terminated.

%% ----------------------------------------------------------------------------------------------------------
%% Func: code_change(OldVsn, State, Extra) -> {ok, NewState}
%% Description: Convert process state when code is changed.
%% ----------------------------------------------------------------------------------------------------------
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%% ============================ /\ GEN_SERVER CALLBACKS =====================================================


%% ============================ \/ INTERNAL FUNCTIONS =======================================================

%% ---------------------------- \/ misultin requests --------------------------------------------------------

handle_http(Connection, Req) ->
    SessionName = "dividedspace",
    Session = case Req:get_cookie_value(SessionName, Req:get_cookies()) of
		  undefined -> #session{};
		  V -> dec_term(V)
	      end,
    case {Req:get(method), Req:resource([lowercase, urldecode])} of
	{'GET', ["api", "v1" | Rest]} ->
	    case Session#session.uid of
		undefined -> 
		    Req:respond(403, [], "", []);
		_ ->
		    case Rest of
			["server"] ->
			    json(Req, get_epic_servers);
			["server", UUID] ->
			    Pid = get_epic_pid(list_to_binary(UUID)),
			    Fights = get_fights(Pid),
			    FightData = lists:map(fun ({FightUUID, {State, Ticks, Time}}) ->
							  [{id, list_to_binary(ds_web_uuid:to_string(FightUUID))},
							   {state, State}, {ticks, Ticks},
							   {time, Time}]
						  end,Fights),
			    json(Req, FightData);
			
			["fight"] -> 
			    1
			    %FightData = lists:map(fun ({FightUUID, {State, Ticks, Time}}) ->
			%				  list_to_binary(ds_web_uuid:to_string(FightUUID)))
		    end
	    end;
	{'GET', ["fight", FightId]} ->
	    Req:ok(fight(FightId));
	{'GET', ["admin"]} ->
	    admin();
	{'GET', ["login"]} ->
	    Req:file("./htdocs/login.html");
	{'GET', ["logut"]} ->
	    Req:file([Req:delete_cookie(SessionName)],
		     filename:join(["./htdocs/login.html"]));
		{'Post', ["login"]} ->
					       {User, Pass} = user_pass(Req),     
	    case user:verify(Connection, User, Pass) of
		{ok, Id, Name} -> 
		    Req:ok([Req:set_cookie(SessionName, 
					   enc_term(#session{
						       uid=Id,
						       name=Name
						      }), 
					   [{max_age, 365*24*3600}]), {"Content-Type", "text/html"}],
			   Req:file("./htdocs/index.html"));
		_ -> Req:file("./htdocs/login.html")
	    end;
	{'GET', ["static" | Path]} ->
	    Req:file(filename:join(["./htdocs" | Path]));
	Rest -> 
	    case Session#session.uid of
		undefined -> Req:file("./htdocs/login.html");
		Uid -> Req:file("./htdocs/index.html")
	    end 
    end.

handle_websocket(Ws, Server) ->
    receive
	{browser, Data} ->
	    ws:incoming(Server, Data),
	    handle_websocket(Ws, Server);
	closed ->
	    ws:stop(Server),
	    closed;
	_Ignore ->
	    handle_websocket(Ws, Server)
    end.

%% ---------------------------- /\ misultin requests --------------------------------------------------------

%% ============================ /\ INTERNAL FUNCTIONS =======================================================

admin() ->
    ["
<html>
	 <head>
	 <script src='/static/js/jquery-1.7.1.js' type='text/javascript' charset='utf-8'></script>
	 <script src='/static/cljs/boot.js' type='text/javascript' charset='utf-8'></script>
	 </head>
	 <body>
	 </body>
	 </html>"].

fight(FightID) ->
	    ["<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"
\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html>
		 <head>
		 <meta http-equiv='Content-type' content='text/html; charset=utf-8'>
		 <title>Divided Space</title>
		 <link href='/static/css/ds-gui.css' type='text/css' rel='stylesheet' />
		 <script src='/static/interface/lib/shapes.js' type='text/javascript' charset='utf-8'></script>
		 <script src='/static/interface/lib/draw_engine.js' type='text/javascript' charset='utf-8'></script>
		 <script src='/static/interface/lib/json2.js' type='text/javascript' charset='utf-8'></script>
		 <script src='/static/interface/ds-gui.js' type='text/javascript' charset='utf-8'></script>
		 </head>
		 <body>
		 <canvas id='fighter'>This demo needs HTML 5 Canvas.</canvas>
		 <canvas id='fire'>---</canvas>
		 <canvas id='units'>Please install a better browser.</canvas>
		 <canvas id='grid'>---</canvas>
		 <canvas id='selection'>Firefox or Safari, for example.</canvas>
		 <canvas id='osd' style='display: block'>Or both.</canvas>
		 <div id='biginfo'></div>
		 <div id='coordinates'></div>
		 <div id='info'></div>
		 <div id='controls'>
		 <div class='button' id='play' style='display: none'>Play</div>
		 <!-- <div class='button' id='next'>Next</div> -->
		 </div>
		 <script type='text/javascript' charset='utf-8'>
		 if (!Prototype.Browser.IE) {
		      var waitForImages = window.setInterval(function() {
								       for (var i = document.images.length; i--;) {
									     if (!document.images[i].complete) return;
										}
								       window.clearInterval(waitForImages);
									   DS.initialize('", FightID, "');
								      }, 500);
		     }
		    </script>
		    <img id='fighter-l-two' src='/static/images/fighter_light_blue.png' style='display: none;' />
		    <img id='fighter-l-one' src='/static/images/fighter_light_red.png' style='display: none;' />
		    </body>
		    </html>"].

aes_dec(Text) when is_binary(Text) -> 
			 Key = <<"dividedspace!!!!">>,
			 <<Size:32, IVec:16/binary, Messag/binary>> = Text,
			 <<Msg:Size/binary, _/binary>> = crypto:aes_cbc_128_decrypt(Key, IVec, Messag),
			 Msg. 


aes_enc(Text) when is_binary(Text) -> 
    MsgSize = size(Text),
    Missing = (16 - (MsgSize rem 16)) * 8,
    Key = <<"dividedspace!!!!">>, 
    IVec = crypto:aes_cbc_ivec(crypto:rand_bytes(16)),
    Enc = crypto:aes_cbc_128_encrypt(Key, IVec, <<Text/binary, 0:Missing>>),
    <<MsgSize:32, IVec:16/binary, Enc/binary>>.

enc_term(Term) ->
    binary_to_list(base64:encode(aes_enc(term_to_binary(Term)))).

dec_term(Term) ->
    binary_to_term(aes_dec(base64:decode(list_to_binary(Term)))).

json(Req, Data) ->
    Req:ok([{"Content-Type", "application/json"}],
	   mochijson2:encode(Data)).

user_pass(Req) ->
    Data=Req:parse_post(),
    User = case lists:keyfind("user", 1, Data) of
	       {ok, U} -> U;
	       _ -> ""
	   end,
    case lists:keyfind("pass", 1, Data) of
	{ok, P} -> {User, P};
	_ -> {"",""}
    end.
    
get_epic_servers() ->
    {ok, R} = gen_server:call({global,center_server}, get_epic_servers),
    R.

get_epic_pid(UUID) ->
    {ok, R} = gen_server:call({global,center_server}, {get_server_pid, UUID}),
    R.

get_fights(Pid) ->
    {ok, R} = gen_server:call(Pid, list_fights),
    R.
