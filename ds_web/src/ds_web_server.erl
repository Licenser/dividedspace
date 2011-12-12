%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@Schroedinger.local>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  9 Dec 2011 by Heinz N. Gies <licenser@Schroedinger.local>
%%%-------------------------------------------------------------------
-module(ds_web_server).

-behaviour(gen_server).

%% API
-export([start_link/0, init_db/0]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(state, {listener}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

%%%===================================================================
%%% gen_server callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Initializes the server
%%
%% @spec init(Args) -> {ok, State} |
%%                     {ok, State, Timeout} |
%%                     ignore |
%%                     {stop, Reason}
%% @end
%%--------------------------------------------------------------------
init([]) ->
    init_templates(),
    DB = init_db(),
    {ok, Port} = application:get_env(port),
    {ok, Acceptors} = application:get_env(acceptors),
    {ok, StaticPath} = application:get_env(static_dir),
    Dispatch = [
		%% {Host, list({Path, Handler, Opts})}
		{'_', [
		       {[<<"api">>, <<"v1">>, <<"shiptype">>], ds_web_api_protocol, [ds_web_api_shiptype, DB]},
		       {[<<"api">>, <<"v1">>, <<"shiptype">>, '...'], ds_web_api_protocol, [ds_web_api_shiptype, DB]},
		       {[<<"api">>, <<"v1">>, <<"script">>], ds_web_api_protocol, [ds_web_api_script, DB]},
		       {[<<"api">>, <<"v1">>, <<"script">>, '...'], ds_web_api_protocol, [ds_web_api_script, DB]},
		       {[<<"api">>, <<"v1">>, <<"module">>], ds_web_api_protocol, [ds_web_api_module, DB]},
		       {[<<"api">>, <<"v1">>, <<"module">>, '...'], ds_web_api_protocol, [ds_web_api_module, DB]},
		       cowboy_static:rule([{dir, StaticPath}, {prefix, [<<"static">>]}]),
		       {'_', ds_web_default_handler, [DB]}
		      ]}
	       ],
    %% Name, NbAcceptors, Transport, TransOpts, Protocol, ProtoOpts
    Listener = cowboy:start_listener(http, Acceptors,
				     cowboy_tcp_transport, [{port, Port}],
				     cowboy_http_protocol, [{dispatch, Dispatch}]
				    ),
    {ok, #state{listener=Listener}}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling call messages
%%
%% @spec handle_call(Request, From, State) ->
%%                                   {reply, Reply, State} |
%%                                   {reply, Reply, State, Timeout} |
%%                                   {noreply, State} |
%%                                   {noreply, State, Timeout} |
%%                                   {stop, Reason, Reply, State} |
%%                                   {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
handle_call(_Request, _From, State) ->
    Reply = ok,
    {reply, Reply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling cast messages
%%
%% @spec handle_cast(Msg, State) -> {noreply, State} |
%%                                  {noreply, State, Timeout} |
%%                                  {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
handle_cast(_Msg, State) ->
    {noreply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Handling all non call/cast messages
%%
%% @spec handle_info(Info, State) -> {noreply, State} |
%%                                   {noreply, State, Timeout} |
%%                                   {stop, Reason, State}
%% @end
%%--------------------------------------------------------------------
handle_info(_Info, State) ->
    {noreply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_server when it is about to
%% terminate. It should be the opposite of Module:init/1 and do any
%% necessary cleaning up. When it returns, the gen_server terminates
%% with Reason. The return value is ignored.
%%
%% @spec terminate(Reason, State) -> void()
%% @end
%%--------------------------------------------------------------------
terminate(_Reason, #state{listener=Listener} = _State) ->
    cowboy:stop_listener(Listener),
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, State, Extra) -> {ok, NewState}
%% @end
%%--------------------------------------------------------------------
code_change(_OldVsn, State, _Extra) ->
    {ok, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================
init_db() ->
    {ok, Host} = application:get_env(dbHost),
    {ok, User} = application:get_env(dbUser),
    {ok, Pass} = application:get_env(dbPass),
    {ok, Db} = application:get_env(db),
    {ok, C} = pgsql:connect(Host, User, Pass, [{database, Db}]),
    C.

init_templates() ->
    erlydtl:compile("templates/login.dtl", tpl_login), 
    erlydtl:compile("templates/index.dtl", tpl_index), 
    erlydtl:compile("templates/admin.dtl", tpl_admin),
    erlydtl:compile("templates/fight.dtl", tpl_fight).