%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  4 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(worker_fsm).
-include("erlv8.hrl").
-include_lib("alog_pt.hrl").
-behaviour(gen_fsm).

%% API
-export([start_link/0, tick/4, sub_tick/1]).

%% gen_fsm callbacks
-export([init/1, 
	 waiting/2, 
	 ticking/2,
	 handle_event/3,
	 handle_sync_event/4, handle_info/3, terminate/3, code_change/4]).

-define(SERVER, ?MODULE).

-define(TIMEOUT, 500).

-record(state, {
	  vm,
	  fight,
	  ctx,
	  storage,
	  units = []}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Creates a gen_fsm process which calls Module:init/1 to
%% initialize. To ensure a synchronized start-up procedure, this
%% function does not return until Module:init/1 has returned.
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    gen_fsm:start_link(?MODULE, [], []).

tick(Worker, VM, Storage, FightPid) ->
    gen_fsm:send_event(Worker, {tick, VM, Storage, FightPid}).

sub_tick(Worker) ->
    gen_fsm:send_event(Worker, next_unit).




%%%===================================================================
%%% gen_fsm callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a gen_fsm is started using gen_fsm:start/[3,4] or
%% gen_fsm:start_link/[3,4], this function is called by the new
%% process to initialize.
%%
%% @spec init(Args) -> {ok, StateName, State} |
%%                     {ok, StateName, State, Timeout} |
%%                     ignore |
%%                     {stop, StopReason}
%% @end
%%--------------------------------------------------------------------
init([]) ->
    fight_worker:report_idle(self()),
    {ok, waiting, #state{}}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% There should be one instance of this function for each possible
%% state name. Whenever a gen_fsm receives an event sent using
%% gen_fsm:send_event/2, the instance of this function with the same
%% name as the current state name StateName is called to handle
%% the event. It is also called if a timeout occurs.
%%
%% @spec state_name(Event, State) ->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState}
%% @end
%%--------------------------------------------------------------------
waiting({tick, VM, Storage, FightPid}, #state{} = State) ->
    ?INFO({"waiting -> tick"}),
    ?DBG({VM, Storage, FightPid}),
    sub_tick(self()),
    {next_state, ticking, State#state{
			    vm = VM,
			    fight = FightPid,
			    storage = Storage,
			    units = fight_storage:get_ids(Storage)}}.

ticking(next_unit, #state{units = [],
			  fight = FightPid} = State) ->
    fight_server:end_tick(FightPid),
    fight_worker:report_idle(self()),
    {next_state, waiting, State};
ticking(next_unit, #state{units = [UnitId | Units], 
			  vm = VM, 
			  storage = Storage} = State) ->
    {Context, Unit} = fight_storage:get_unit_with_context(Storage, UnitId),
    case unit:destroyed(Unit) of
	false ->
	    Code = unit:get(Unit, code),
	    ?INFO({"tick for unit", UnitId, Code}),
	    ?DBG({Unit}),
	    fight_storage:set_unit(Storage, unit:cycle(Unit)),
	    Source = binary_to_list(Code),
	    case erlv8_vm:run_timed(VM, Context, Source, ?TIMEOUT) of
		{ok, _} ->
		    ok;
		{error, Error} -> 
		    ?WARNING({"Error during tick for unit", Error}, [], [script]),
		    ok;
		{throw, undefined} ->
		    ?WARNING({"Unknown error during execution"}, [], [script]);
		{throw, Exception} ->
		    Message = Exception:get_value("message"),
		    Stack =Exception:get_value("stack"),
		    ?WARNING({"Throw during tick for unit", Message, Stack}, [], [script]),
		    ok
	    end,
	    sub_tick(self());
	true -> 
	    ?DBG({"destroyed - skipping tick for unit", UnitId}),
	    sub_tick(self())
    end,
    {next_state, ticking, State#state{
			    units = Units,
			    ctx = Context
			   }, 2000}.


%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a gen_fsm receives an event sent using
%% gen_fsm:send_all_state_event/2, this function is called to handle
%% the event.
%%
%% @spec handle_event(Event, StateName, State) ->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState}
%% @end
%%--------------------------------------------------------------------
handle_event(_Event, StateName, State) ->
    {next_state, StateName, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a gen_fsm receives an event sent using
%% gen_fsm:sync_send_all_state_event/[2,3], this function is called
%% to handle the event.
%%
%% @spec handle_sync_event(Event, From, StateName, State) ->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {reply, Reply, NextStateName, NextState} |
%%                   {reply, Reply, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState} |
%%                   {stop, Reason, Reply, NewState}
%% @end
%%--------------------------------------------------------------------
handle_sync_event(_Event, _From, StateName, State) ->
    Reply = ok,
    {reply, Reply, StateName, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_fsm when it receives any
%% message other than a synchronous or asynchronous event
%% (or a system message).
%%
%% @spec handle_info(Info,StateName,State)->
%%                   {next_state, NextStateName, NextState} |
%%                   {next_state, NextStateName, NextState, Timeout} |
%%                   {stop, Reason, NewState}
%% @end
%%--------------------------------------------------------------------
handle_info(_Info, StateName, State) ->
    {next_state, StateName, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called by a gen_fsm when it is about to
%% terminate. It should be the opposite of Module:init/1 and do any
%% necessary cleaning up. When it returns, the gen_fsm terminates with
%% Reason. The return value is ignored.
%%
%% @spec terminate(Reason, StateName, State) -> void()
%% @end
%%--------------------------------------------------------------------
terminate(_Reason, _StateName, _State) ->
    ok.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Convert process state when code is changed
%%
%% @spec code_change(OldVsn, StateName, State, Extra) ->
%%                   {ok, StateName, NewState}
%% @end
%%--------------------------------------------------------------------
code_change(_OldVsn, StateName, State, _Extra) ->
    {ok, StateName, State}.

%%%===================================================================
%%% Internal functions
%%%===================================================================


%%%===================================================================
%%% Internal functions
%%%===================================================================
