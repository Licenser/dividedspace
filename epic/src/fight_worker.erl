%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 26 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(fight_worker).

-include_lib("alog_pt.hrl").

-behaviour(gen_server).

%% API
-export([
	 start_link/0,
	 place_tick/3,
         report_idle/1
	]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-define(WORKER_COUNT, 1).

-record(state, {workers = [], 
		idle_workers = [],
		tasks=[]}).

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

place_tick(VM, Storage, FightPid) ->
    gen_server:cast(?SERVER, {place_tick, VM, Storage, FightPid}).

report_idle(Worker) ->
    gen_server:cast(?SERVER, {report_idle, Worker}).

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
    ?INFO({"Init"}),
    {ok, #state{workers=
		    [ worker_sup:start_child() || _ <- lists:seq(1,?WORKER_COUNT)]
	       }}.

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
handle_call(Request, _From, State) ->
    ?WARNING({"Unknown handle call", Request}),
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
handle_cast({place_tick, VM, Storage, FightPid}, #state{idle_workers = [], tasks=Tasks} = State) ->
    ?INFO({"place tick no idle workers", FightPid}),
    {noreply, State#state{tasks=Tasks ++ [{place_tick, VM, Storage, FightPid}]}};

handle_cast({place_tick, VM, Storage, FightPid}, #state{idle_workers = [Worker | R]} = State) ->
    ?INFO({"place tick on worker", FightPid, Worker}),
    worker_fsm:tick(Worker, VM, Storage, FightPid),
    {noreply, State#state{idle_workers=R}};

handle_cast({report_idle, Worker}, #state{idle_workers = W, tasks=[]} = State) ->
    ?INFO({"report idle no ticks", Worker}),
    {noreply, State#state{idle_workers=[Worker | W]}};

handle_cast({report_idle, Worker}, #state{tasks=[{place_tick, VM, Storage, FightPid} | R]} = State) ->
    ?INFO({"report idle, ticks", Worker, FightPid}),    
    worker_fsm:tick(Worker, VM, Storage, FightPid),
    {noreply, State#state{tasks=R}};

handle_cast(Msg, State) ->
    ?WARNING({"Unknown handle cast", Msg}),
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
handle_info(Info, State) ->
    ?WARNING({"Unknown handle info", Info}),
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
terminate(Reason, _State) ->
    ?WARNING({"Terminating", Reason}),
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
