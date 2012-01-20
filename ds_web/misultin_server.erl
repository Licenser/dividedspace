
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
	{'GET', ["fight", FightId]} ->
	    Req:ok(fight(FightId));
	{'GET', ["admin"]} ->
	    admin();
	{'GET', ["login"]} ->
	    Req:file("./htdocs/login.html");
	{'GET', ["logut"]} ->
	    Req:file([Req:delete_cookie(SessionName)],
		     filename:join(["./htdocs/login.html"]));
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

fight(FightID) ->
	    .
