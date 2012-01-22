
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
                                           handle_websocket(Ws, Server)
                                   end}, {ws_autoexit, false}]),
    erlang:monitor(process, misultin),
    {ok, #state{port = Port}}.

%% ============================ /\ GEN_SERVER CALLBACKS =====================================================


%% ============================ \/ INTERNAL FUNCTIONS =======================================================

%% ---------------------------- \/ misultin requests --------------------------------------------------------

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
