%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 27 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(epic_event).

-behaviour(gen_event).

%% API
-export([
	 start_link/0,
	 add_handler/0,
	 start_turn/2,
	 end_turn/2,
	 start_global_turn/0,
	 end_global_turn/0,
	 start_cycle/2,
	 end_cycle/2,
	 fight_error/2,
	 fight_problem/2,
	 register_with_logger/0
	]).

%% gen_event callbacks
-export([init/1, handle_event/2, handle_call/2, 
	 handle_info/2, terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(state, {}).

%%%===================================================================
%%% API
%%%===================================================================

start_cycle(FightID, CycleID) ->
    gen_event:notify(?SERVER, {start_cycle, FightID, CycleID}).

end_cycle(FightID, CycleID) ->
    gen_event:notify(?SERVER, {end_cycle, FightID, CycleID}).

start_global_turn() ->
    gen_event:notify(?SERVER, {start_global_turn}).

end_global_turn() ->
    gen_event:notify(?SERVER, {end_global_turn}).

start_turn(FightID, TurnID) ->
    gen_event:notify(?SERVER, {start_turn, FightID, TurnID}).

end_turn(FightID, TurnID) ->
    gen_event:notify(?SERVER, {end_turn, FightID, TurnID}).

fight_problem(FightID, Problem) ->
    gen_event:notify(?SERVER, {fight_problem, FightID, Problem}).

fight_error(FightID, Error) ->
    gen_event:notify(?SERVER, {fight_error, FightID, Error}).

register_with_logger() ->
    error_logger:add_report_handler(?MODULE).


%%%===================================================================
%%% gen_event callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Creates an event manager
%%
%% @spec start_link() -> {ok, Pid} | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link() ->
    gen_event:start_link({local, ?SERVER}).

%%--------------------------------------------------------------------
%% @doc
%% Adds an event handler
%%
%% @spec add_handler() -> ok | {'EXIT', Reason} | term()
%% @end
%%--------------------------------------------------------------------
add_handler() ->
    gen_event:add_handler(?SERVER, ?MODULE, []).

%%%===================================================================
%%% gen_event callbacks
%%%===================================================================

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever a new event handler is added to an event manager,
%% this function is called to initialize the event handler.
%%
%% @spec init(Args) -> {ok, State}
%% @end
%%--------------------------------------------------------------------
init([]) ->
    {ok, #state{}}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever an event manager receives an event sent using
%% gen_event:notify/2 or gen_event:sync_notify/2, this function is
%% called for each installed event handler to handle the event.
%%
%% @spec handle_event(Event, State) ->
%%                          {ok, State} |
%%                          {swap_handler, Args1, State1, Mod2, Args2} |
%%                          remove_handler
%% @end
%%--------------------------------------------------------------------
handle_event({fight_problem, FightID, Problem}, State) ->
    error_logger:warning_msg("EPIC - FIGHT<~p> PROBLEM: ~p.~n", [FightID, Problem]),
    {ok, State};
handle_event({fight_error, FightID, Error}, State) ->
    error_logger:error_msg("EPIC - FIGHT<~p> ERROR: ~p.~n", [FightID, Error]),
    {ok, State};
handle_event({start_cycle, FightID, CycleID}, State) ->
    io:format("EPIC - FIGHT<~p>: Cycle<~p> started.~n", [FightID, CycleID]),
    error_logger:error_msg("EPIC - FIGHT<~p>: Cycle<~p> started.~n", [FightID, CycleID]),
    {ok, State};
handle_event({end_cycle, FightID, CycleID}, State) ->
    error_logger:info_msg("EPIC - FIGHT<~p>: Cycle<~p> ended.~n", [FightID, CycleID]),
    {ok, State};
handle_event({start_turn, FightID, TurnID}, State) ->
    error_logger:info_msg("EPIC - FIGHT<~p>: Turn<~p> started.~n", [FightID, TurnID]),
    {ok, State};
handle_event({end_turn, FightID, TurnID}, State) ->
    error_logger:info_msg("EPIC - FIGHT<~p>: Turn<~p> ended.~n", [FightID, TurnID]),
    {ok, State};
handle_event({start_global_turn}, State) ->
    error_logger:info_msg("EPIC: Global turn started.~n", []),
    {ok, State};
handle_event({end_global_turn}, State) ->
    error_logger:info_msg("EPIC: Global turn ended.~n", []),
    {ok, State};
handle_event(Event, State) ->
    io:format("~p~n", [Event]),
    {ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever an event manager receives a request sent using
%% gen_event:call/3,4, this function is called for the specified
%% event handler to handle the request.
%%
%% @spec handle_call(Request, State) ->
%%                   {ok, Reply, State} |
%%                   {swap_handler, Reply, Args1, State1, Mod2, Args2} |
%%                   {remove_handler, Reply}
%% @end
%%--------------------------------------------------------------------
handle_call(_Request, State) ->
    Reply = ok,
    {ok, Reply, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is called for each installed event handler when
%% an event manager receives any other message than an event or a
%% synchronous request (or a system message).
%%
%% @spec handle_info(Info, State) ->
%%                         {ok, State} |
%%                         {swap_handler, Args1, State1, Mod2, Args2} |
%%                         remove_handler
%% @end
%%--------------------------------------------------------------------
handle_info(_Info, State) ->
    {ok, State}.

%%--------------------------------------------------------------------
%% @private
%% @doc
%% Whenever an event handler is deleted from an event manager, this
%% function is called. It should be the opposite of Module:init/1 and
%% do any necessary cleaning up.
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

%%%===================================================================
%%% Internal functions
%%%===================================================================
