%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 26 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(fight_worker).

-behaviour(gen_server).

%% API
-export([
	 start_link/0,
	 place_cycle/3,
	 place_turn/4,
	 report_idle/1
	]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-define(WORKER_COUNT, 6).

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

place_cycle(Fight, Id, FightPid) ->
    gen_server:cast(?SERVER, {place_cycle, Fight, Id, FightPid}).

place_turn(Fight, Map, Id, FightPid) ->
    gen_server:cast(?SERVER, {place_turn, Fight, Map, Id, FightPid}).

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
handle_cast({place_cycle, Fight, Id, FightPid}, #state{idle_workers = [], tasks=Tasks} = State) ->
    {noreply, State#state{tasks=Tasks ++ [{cycle, Fight, Id, FightPid}]}};
handle_cast({place_cycle, Fight, Id, FightPid}, #state{idle_workers = [W | R]} = State) ->
    worker_fsm:cycle(W, Fight, Id, FightPid),
    {noreply, State#state{idle_workers=R}};
handle_cast({place_turn, Fight, Map, Id, FightPid}, #state{idle_workers = [], tasks=Tasks} = State) ->
    {noreply, State#state{tasks=Tasks ++ [{turn, Fight, Map, Id, FightPid}]}};
handle_cast({place_turn, Fight, Map, Id, FightPid}, #state{idle_workers = [W | R]} = State) ->
    worker_fsm:tick(W, Fight, Map, Id, FightPid),
    {noreply, State#state{idle_workers=R}};
handle_cast({report_idle, Worker}, #state{idle_workers = W, tasks=[]} = State) ->
    {noreply, State#state{idle_workers=[Worker | W]}};
handle_cast({report_idle, Worker}, #state{tasks=[{turn, Fight, Map, Id, FightPid} | R]} = State) ->
    worker_fsm:tick(Worker, Fight, Map, Id, FightPid),
    {noreply, State#state{tasks=R}};
handle_cast({report_idle, Worker}, #state{tasks=[{cycle, Fight, Id, FightPid} | R]} = State) ->
    worker_fsm:cycle(Worker, Fight, Id, FightPid),
    {noreply, State#state{tasks=R}};
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
terminate(_Reason, _State) ->
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

check_workers(Workers) ->
    [ case is_process_alive(W) of
	  true -> W;
	  false -> worker_sup:start_child()
      end
      || W <- Workers].
