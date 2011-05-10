%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  8 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(fight_storage).

-behaviour(gen_server).

%% API
-export([start_link/1]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
         terminate/2, code_change/3, get_unit/2, set_unit/2, set_unit/3,
         get_ids/1]).

-define(SERVER, ?MODULE). 

-record(state, {units, ids}).

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
start_link(Units) ->
    gen_server:start_link(?MODULE, [Units], []).

get_unit(Pid, Id) ->
    gen_server:call(Pid, {get, Id}).

set_unit(Pid, Unit) ->
    gen_server:cast(Pid, {set, Unit}).

set_unit(Pid, Id, Unit) ->
    gen_server:cast(Pid, {set, Id, Unit}).

get_ids(Pid) ->
    gen_server:call(Pid, get_ids).



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
init([Units]) ->
    {ok, #state{units = Units,
                ids = dict:fetch_keys(Units)}}.

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
handle_call({get, Id}, _From, #state{units = Units} = State) ->
    {ok, Unit} = dict:find(Id, Units),
    {reply, Unit, State};
handle_call(get_ids, _From, #state{ids = Ids} = State) ->
    {reply, Ids, State};
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
handle_cast({set, Unit}, #state{units = Units, ids = Ids} = State) ->
    {noreply, State#state{units = dict:store(unit:id(Unit), Unit, Units), ids = Ids}}; %fix_ids(Ids, Units)}};
handle_cast({set, Id, Unit}, #state{units = Units, ids = Ids} = State) ->
    {noreply, State#state{units = dict:store(Id, Unit, Units), ids = Ids}}; %fix_ids(Ids, Units)}};
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

fix_ids(Ids, Unit) ->
    case unit:destroyed(Unit) of
        true -> Id = unit:id(Unit),
                lists:filter(fun (I) ->
                                     I =/= Id
                             end, Ids);
        _ -> Ids
    end.
                                     

                     
            
