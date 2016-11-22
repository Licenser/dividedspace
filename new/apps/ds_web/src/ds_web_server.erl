%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  9 Dec 2011 by Heinz N. Gies <licenser@licenser.net>
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
    %%init_templates(),
    init_db(),
    {ok, Port} = application:get_env(port),
    {ok, Acceptors} = application:get_env(acceptors),
    Rules = [
             {"/fight/:id", ds_web_websocket_handler, []},
             {"/api/v1/:res/[:res_id/[:sub_res/[:sub_res_id/[...]]]]", ds_web_api_protocol,
              [[{<<"shiptype">>, ds_web_api_shiptype},
                {<<"script">>, ds_web_api_script},
                {<<"fleet">>, ds_web_api_fleet},
                {<<"fight">>, ds_web_api_fight},
                {<<"moduletype">>, ds_web_api_moduletype}]
              ]},
             %% {"/api/v1/user", ds_web_api_handler, []},
             %% {"/api/v1/user/_", ds_web_api_handler, []},
             {"/api/v1/[...]", ds_web_api_handler, []},
             {"/static/[...]", cowboy_static,
              {priv_dir, ds_web, "static/",
               [{mimetypes, cow_mimetypes, web}]}},
             {'_', ds_web_default_handler, []}
            ],
    Dispatch = cowboy_router:compile([{'_', Rules}]),
    %% Name, NbAcceptors, Transport, TransOpts, Protocol, ProtoOpts
    Listener = cowboy:start_http
                 (http, Acceptors, [{port, Port}],
                  [{env, [{dispatch, Dispatch}]}]),
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
    {ok, Host} = application:get_env(ds_web, dbHost),
    {ok, Port} = application:get_env(ds_web, dbPort),
    {ok, User} = application:get_env(ds_web, dbUser),
    {ok, Pass} = application:get_env(ds_web, dbPass),
    {ok, Db} = application:get_env(ds_web, db),
    pgapp:connect([
                   {host, Host},
                   {port, Port},
                   {database, Db},
                   {username, User},
                   {password, Pass}]).

%% init_templates() ->
%%     B = code:priv_dir(ds_web) ++ "/templates/",
%%     erlydtl:compile(B ++ "login.dtl", tpl_login),
%%     erlydtl:compile(B ++ "index.dtl", tpl_index),
%%     erlydtl:compile(B ++ "admin.dtl", tpl_admin),
%%     erlydtl:compile(B ++ "fight.dtl", tpl_fight).
