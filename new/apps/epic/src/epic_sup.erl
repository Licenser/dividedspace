%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 21 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(epic_sup).

-behaviour(supervisor).

%% API
-export([start_link/0]).

%% Supervisor callbacks
-export([init/1]).

%% Helper macro for declaring children of supervisor
-define(CHILD(I, Type), {I, {I, start_link, []}, permanent, 5000, Type, [I]}).
-define(EPIC(N, Type), {list_to_atom("epic_server" ++ integer_to_list(N)),
                        {epic_server, start_link, []}, permanent, 5000, Type,
                        [epic_server]}).

-define(SERVER, ?MODULE).

%%%===================================================================
%%% API functions
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the supervisor
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    supervisor:start_link({local, ?SERVER}, ?MODULE, []).

%%%===================================================================
%%% Supervisor callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a supervisor is started using supervisor:start_link/[2,3],
%% this function is called by the new process to find out about
%% restart strategy, maximum restart frequency and child
%% specifications.
%%
%% @spec init(Args) -> {ok, {SupFlags, [ChildSpec]}} |
%%                     ignore |
%%                     {error, Reason}
%% @end
%%--------------------------------------------------------------------
init([]) ->
    RestartStrategy = one_for_one,
    MaxRestarts = 1000,
    MaxSecondsBetweenRestarts = 3600,

    SupFlags = {RestartStrategy, MaxRestarts, MaxSecondsBetweenRestarts},

    EPICServers = [?EPIC(N, worker) || N <- lists:seq(1, server_count())],
    FightWorker = ?CHILD(fight_worker, worker),
    FightSup = ?CHILD(fight_sup, supervisor),
    MapSup = ?CHILD(map_sup, supervisor),
    StorageSup = ?CHILD(storage_sup, supervisor),
    WorkerSup = ?CHILD(worker_sup, supervisor),
    {ok, {SupFlags, [FightSup, MapSup, WorkerSup, StorageSup, FightWorker
                     | EPICServers]}}.


%%%===================================================================
%%% Internal functions
%%%===================================================================

server_count() ->
    application:get_env(epic, server_count, 4).
