%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@schroedinger.lan>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 21 Apr 2011 by Heinz N. Gies <heinz@schroedinger.lan>
%%%-------------------------------------------------------------------
-module(epic_server).

-behaviour(gen_server).

%% API
-export([start_link/0, list_fights/0, add_fight/2, new_fight/1, get_fight/1]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(state, {fights = dict:new()}).

%%%===================================================================
%%% API
%%%===================================================================

list_fights() ->
    gen_server:call(?MODULE, list_fights).


get_fight(Id) ->
    gen_server:call(?MODULE, {get_fight, Id}).

add_fight(Id, Fight) ->
    gen_server:cast(?MODULE, {add_fight, Id, Fight}).

new_fight(Fight) ->
    UUID = uuid:v4(),
    {ok, FPid} = fight_sup:start_child(Fight),
    add_fight(UUID, FPid),
    turn_server:register_fight(FPid),
    {ok, UUID}.

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
    storage:init(),
    {ok, #state{fights = dict:new()}}.

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
handle_call({get_fight, Id}, _From, #state{fights = Fights} = State) ->
    {reply, {ok, dict:fetch(Id, Fights)}, State};

handle_call(list_fights, _From, #state{fights = Fights} = State) ->
    {reply, {ok, dict:fetch_keys(Fights)}, State};
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
handle_cast({add_fight, Id, Fight}, #state{fights = Fights} = State) ->
    {noreply,  State#state{fights = dict:store(Id, Fight, Fights)}};
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

%%%===================================================================
%%% Internal functions
%%%===================================================================
