%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%% This Server represents a unit in DS, it is started with the unit
%%% Specs as parameter and lives for a while, it works like a database
%%% cache that also incooperates the unit logic.
%%% @end
%%% Created : 22 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(unit).

-behaviour(gen_server).

%% API
-export([
	 start_link/1,
	 specs/1,
	 add_module/2,
	 remove_module/2,
	 modules/2,
	 new/3,
	 load/1,
	 mass/1,
	 x/1,
	 x/2,
	 y/1,
	 y/2,
	 move/3,
	 distance/2,
	 is_a/1,
	 turn/3,
	 hit/3
	]).

-export([
	 fields/0,
	 explode/1,
	 implode/1,
	 select/1,
	 cycle/1,
	 from_template/1,
	 from_template/3
	]).
%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(unit, {id, x, y, modules = []}).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @spec start_link(Spec) -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link(Spec) ->
    gen_server:start_link(?MODULE, [Spec], []).

%%--------------------------------------------------------------------
%% @doc
%% This function returns the record fiends of the module record.
%% @spec fields() -> UnitRecordFields
%% @end
%%--------------------------------------------------------------------
fields() ->
    record_info(fields,unit).    

%%--------------------------------------------------------------------
%% @doc
%% This function creates a new unit. Modules are not checked!
%% module type.
%% @spec new(X, Y, Modules) -> UUID
%% @end
%%--------------------------------------------------------------------					

new(X, Y, Modules) ->
    create(X, Y, uuid:v4(), Modules).

%%--------------------------------------------------------------------
%% @doc
%% This function tries to fetch a Unit record from the database,
%% and returns it or an error.
%% @spec select(Index) -> {ok, Unit} |
%%                        {error, not_found}
%% @end
%%--------------------------------------------------------------------

select(ID) when is_binary(ID) ->
    storage:select({unit, ID}).

is_a(#unit{}) ->
    true;
is_a(_) ->
    false.

create(Id, X, Y, Modules) when is_binary(ID), is_integer(X), is_integer(Y) ->
    #unit{
	id = Id,
	x = X,
	y = Y,
	modules = Modules
       }.

load(ID) when is_binary(ID) ->
    unit_server:get(ID).

specs(Pid) when is_pid(Pid) ->
    gen_server:call(Pid, specs).

turn(Pid, Fleet, Fight) ->
    gen_server:call(Pid, {turtn, Fleet, Fight}).

x(Pid) when is_pid(Pid) ->
    #unit{x = X} = gen_server:call(Pid, specs),
    X.

y(Pid) when is_pid(Pid) ->
    #unit{y = Y} = gen_server:call(Pid, specs),
    Y.

x(Pid, X) when is_pid(Pid), is_integer(X) ->
    gen_server:cast(Pid, {set_x, X}).

y(Pid, Y) when is_pid(Pid), is_integer(Y) ->
    gen_server:cast(Pid, {set_y, Y}).

add_module(Pid, M) when is_pid(Pid) ->
    gen_server:cast(Pid, {add_module, M}).

remove_module(Pid, M) when is_pid(Pid) ->
    gen_server:cast(Pid, {remove_module, M}).

reload_specs(Pid) when is_pid(Pid) ->
    Pid ! reload.

modules(Pid, Kind) when is_pid(Pid) ->
    gen_server:call(Pid, {modules, Kind}).

mass(Pid) when is_pid(Pid) ->
    gen_server:call(Pid, mass).

cycle(Pid) when is_pid(Pid) ->
    gen_server:cast(cycle, Pid).
    

distance(PidA, PidB) when is_pid(PidA), is_pid(PidB) ->
    gen_server:call(PidA, {distance, PidB}).


%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is used to explode a unit, replacing all uuids
%% by the refferenced data.
%% @spec explode(Unit) -> ExplodedUnit
%% @end
%%--------------------------------------------------------------------

explode(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun module:explode/1,Ms)}.


%%--------------------------------------------------------------------
%% @private
%% @doc
%% This function is used to implode a exploded unit, replacing all
%% exploded data to the refferencing uuid's.
%% @spec implode(Unit) -> ImplodedUnit
%% @end
%%--------------------------------------------------------------------

implode(#unit{modules = Ms} = U) ->
    U#unit{modules = lists:map(fun module:id/1, Ms)}.

from_template(Modules) when is_list(Modules) ->
    from_template(0,0, Modules).
from_template(X, Y, Modules) when is_integer(X), is_integer(Y), is_list(Modules) ->
    ModuleIDs = create_modules(Modules),
    {ok, #unit{id = ID}=Unit} = new(X, Y, ModuleIDs),
    storage:insert(Unit),
    {ok, ID}.
    

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
init([Spec]) ->
    reload_specs(self()),
    {ok, Spec}.

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
handle_call(specs, _From, State) ->
    {reply, {ok, State}, State};
handle_call({distance, Pid}, _From, #unit{x = X1, y = Y1} = State) ->
    #unit{x = X2, y = Y2} = unit:specs(Pid),
    {reply, abs(X1 - X2) + abs(Y1 - Y2), State};
handle_call(mass, _From, #unit{modules = Modules} = State) ->
    {reply, 
     lists:foldl(fun(Module, Sum) -> module:mass(Module) + Sum end, 0, Modules),
     State};
handle_call({turn, Enemees, Fight}, _From, State) ->
    {reply, ok, State};
handle_call({modules, Kind}, _From, #unit{modules = Modules} = State) ->
    {reply, list:filter(
	      fun(M) ->
		      Kind == module:kind(M)
	      end,
	      Modules
	     ), State};
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
handle_cast({add_module, M}, #unit{modules = Ms}=State) ->
    NewState = State#unit{modules = [module:explode(M) | Ms]},
    self() ! save,
    {noreply, NewState};
handle_cast({remove_module, M}, #unit{modules = Ms}=State) ->
    self() ! save,
    {noreply, State#unit{modules = lists:filter(fun (Module) ->
							module:id(Module) =/= M
						end, Ms)}};
handle_cast(save, #unit{modules = Modules} = State) ->
    lists:map(fun module:save/1, Modules),
    case storage:insert(implode(State)) of
	{aborted, Reason} -> {stop, {save_failed, Reason}, State};
	{atomic, _} -> {noreply, State}
    end;
handle_cast(cycle, #unit{modules = Modules} = State) ->
    {noreply, State#unit{modules = lists:map(fun modules:cycle/1, Modules)}};
handle_cast({set_x, X}, State) ->
    {noreply, State#unit{x = X}};
handle_cast({set_y, Y}, State) ->
    {noreply, State#unit{y = Y}};
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

handle_info(reload, State) ->
    {noreply, storage:explode(State)};
handle_info(save, State) ->
    {noreply, State};
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

create_modules([TypeName]) ->
        [ModuleType] = module_type:select_by_name(TypeName),
    {ok, Module} = module:new(ModuleType),
    storage:insert(Module),
    [module:id(Module)];
create_modules([TypeName | Modules]) ->
    [ModuleType] = module_type:select_by_name(TypeName),
    {ok, Module} = module:new(ModuleType),
    storage:insert(Module),
    [module:id(Module) | create_modules(Modules)].

