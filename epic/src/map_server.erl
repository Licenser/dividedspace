%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  2 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(map_server).

-include("epic_types.hrl").
-include_lib("alog_pt.hrl").


-behaviour(gen_server).

%% API
-export([
	 start_link/1,
	 unit_at/3,
	 move_unit/4,
	 closest_foes/2,
	 closest_foes/3,
	 closest_foes/4,
	 best_distance/5,
	 best_distance/7,
	 remove_unit/2
	]).

%% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2,
	 terminate/2, code_change/3]).

-define(SERVER, ?MODULE). 

-record(state, {u2c ,c2u, u2cf, clusters}).

%%%===================================================================
%%% API
%%%===================================================================

move_unit(Pid, Unit, X, Y) ->
    gen_server:cast(Pid, {move_unit, Unit, X, Y}).

unit_at(Pid, X, Y) ->
    gen_server:call(Pid, {unit_at, X, Y}).

remove_unit(Pid, Unit) ->
    gen_server:cast(Pid, {remove_unit, Unit}).

closest_foes(Pid, Unit) ->
    gen_server:call(Pid, {closest_foes, Unit}).

closest_foes(Pid, Unit, {MinRange, MaxRange}) ->
    gen_server:call(Pid, {closest_foes, Unit, {MinRange, MaxRange}}).

closest_foes(Pid, Unit, {MinRange, MaxRange}, {MinMass, MaxMass}) ->
    gen_server:call(Pid, {closest_foes, Unit, {MinRange, MaxRange}, {MinMass, MaxMass}}).


best_distance(Pid, {X1, Y1}, {X2, Y2}, D, Max) ->
    gen_server:call(Pid, {best_distance, X1, Y1, X2, Y2, D, Max}).

best_distance(Pid, X1, Y1, X2, Y2, D, Max) ->
    gen_server:call(Pid, {best_distance, X1, Y1, X2, Y2, D, Max}).
%%--------------------------------------------------------------------
%% @doc
%% Starts the server
%%
%% @spec start_link() -> {ok, Pid} | ignore | {error, Error}
%% @end
%%--------------------------------------------------------------------
start_link(Units) ->
    gen_server:start_link(?MODULE, [Units], []).

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
    ?INFO({"init"}),
    ?DBG({Units}),
    UnitList = lists:map(fun ({UId, U}) ->
				 {UId, unit:fleet(U), {unit:x(U), unit:y(U)}}
			 end, dict:to_list(Units)),
    U2CF = lists:foldl(fun ({UId, F, C}, Dict) ->
			       dict:update(F,
					   fun (D) ->
						   dict:store(UId, C, D)
					   end,
					   dict:from_list([{UId, C}]),
					   Dict)
		       end, dict:new(), UnitList),
    U2C = dict:from_list(lists:map(fun ({UId, _, C}) -> {UId, C} end, UnitList)),
    C2U = dict:from_list(lists:map(fun ({UId, _, C}) -> {C, UId} end, UnitList)),
    Clusters = lists:foldl(fun ({UId, _, C}, Dict) ->
				   dict:update(cluster(C),
					       fun (L) ->
						       [UId| L]
					       end,
					       [],
					       Dict)
			   end, dict:new(), UnitList),
    {ok, #state{u2c = U2C, u2cf = U2CF, c2u = C2U, clusters = Clusters}}.

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
handle_call({best_distance, X1, Y1, X2, Y2, D, Max}, _From, #state{c2u = C2U} = State) ->
    ?INFO({"best distance"}),
    {reply, find_path(C2U, X1, Y1, X2, Y2, D, Max), State};
handle_call({closest_foes, Unit}, _From, #state{u2cf = U2CF} = State) ->
    SortedFoes = sorted_foe(Unit, U2CF),
    {reply, SortedFoes, State};
handle_call({closest_foes, Unit, {MinRange, MaxRange}}, _From, #state{u2cf = U2CF} = State) ->
    Foes = lists:dropwhile(fun({_, D}) ->
				   D < MinRange
			   end, sorted_foe(Unit, U2CF)),
    Foes1 = lists:takewhile(fun({_, D}) ->
					 D =< MaxRange
				 end, Foes),
    {reply, Foes1, State};
handle_call({closest_foes, Unit, {MinRange, MaxRange}, {MinMass, MaxMass}}, _From, #state{u2cf = U2CF} = State) ->
    Foes = lists:dropwhile(fun({_, D}) ->
				   D < MinRange
			   end, sorted_foe(Unit, U2CF)),
    Foes1 = lists:takewhile(fun({_, D}) ->
				    D =< MaxRange
			    end, Foes),
    Foes2 = lists:filter(fun({U, _}) ->
				 Mass = unit:mass(unit:ensure_record(U)),
				 (Mass =< MaxMass) and
						     (Mass >= MinMass)
			 end, Foes1),
    {reply, Foes2, State};
handle_call({unit_at, X, Y}, _From, #state{c2u = C2U} = State) ->
    ?INFO({"unit at"}),
    ?DBG({X, Y}),
    {reply, dict:fetch({X, Y}, C2U), State};
handle_call(Request, _From, State) ->
    ?WARNING({"unknown handle call", Request}),
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
handle_cast({move_unit, Unit, X, Y}, #state{u2c = U2C, c2u = C2U, u2cf = U2CF} = State) ->
    ?INFO({"move unit", Unit, X, Y}),
    UId = unit:id(Unit),
    Fleet = unit:fleet(Unit),
    OldCord = dict:fetch(UId, U2C),
    {noreply, State#state{
		u2cf = dict:update(Fleet,fun (D) ->
						 dict:store(UId, {X, Y}, D)
					 end, U2CF),
		u2c = dict:store(UId, {X, Y}, U2C), 
		c2u = dict:store({X, Y}, UId, dict:erase(OldCord, C2U))}};
handle_cast({remove_unit, Unit}, #state{u2c = U2C, c2u = C2U, u2cf = U2CF} = State) ->
    ?INFO({"remove unit", Unit}),
    UId = unit:id(Unit),
    Fleet = unit:fleet(Unit),
    Cords = dict:fetch(UId, U2C),
    {noreply, State#state{	
		u2cf = dict:update(Fleet,fun (D) ->
						 dict:erase(UId, D)
					 end,U2CF),
		u2c = dict:erase(UId, U2C), 
		c2u = dict:erase(Cords, C2U)}};

handle_cast(Msg, State) ->
    ?WARNING({"unknown handle cast", Msg}),
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
    ?WARNING({"unknown handle cast", Info}),
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


cluster({X, Y}) ->
    {X - (X rem 20), Y - (Y rem 20)}.

find_path(_, X, Y, _, _, _, R) when R < 0 -> 
    ?DBG({"end for neg range", X, Y, R}),
    {X, Y, 0};

find_path(_, X, Y, X, Y, _, _) -> 
    ?DBG({"end for arrived", X, Y}),
    {X, Y, 0};

find_path(_, X, Y, _, _, _D, 0) ->
    ?DBG({"end for no range", X, Y}), 
    {X, Y, 0};

find_path(C2U, X1, Y1, X2, Y2, D, Max) ->
    ?INFO({"find path"}),
    ?DBG({X1, Y1, X2, Y2, D, Max}),
    Dir = map:direction_between({X1, Y1}, {X2, Y2}),
    Dist = map:distance({X1, Y1}, {X2, Y2}),
    if 
        Dist == D -> 
	    ?DBG({"arrived at best dist"}),
	    {X1, Y1, 0};
        Dist =< D -> 
	    Direction = 6 - Dir,
	    ?DBG({"too close", Dir}),
	    case find_working_step(C2U, X1, Y1, Direction) of
		error ->
		    ?DBG({"no where to go"}),
		    {X1, Y1, 0};
		{NX, NY} ->
		    {DX, DY, R} = find_path(C2U, NX, NY, X2, Y2, D, Max -1),
		    ?DBG({"Heading to", NX, NY, "via", DX, DY}),
		    {DX, DY, R + 1}
	    end;
        Dist >= D -> 
	    ?DBG({"too far away", Dir}),
	    Direction = Dir,
	    case find_working_step(C2U, X1, Y1, Direction) of
		error ->
		    ?DBG({"no where to go"}),
		    {X1, Y1, 0};
		{NX, NY} ->
		    {DX, DY, R} = find_path(C2U, NX, NY, X2, Y2, D, Max -1),
		    ?DBG({"Heading to", NX, NY, "via", DX, DY}),
		    {DX, DY, R + 1}
	    end
    end.



-spec find_working_step(dict(), integer(), integer(), integer()) ->
			   error | coords().


find_working_step(C2U, X, Y, D) ->
  do_steps(C2U, X, Y, [D, D+1, D-1, D+2, D-3, D+4]).


-spec do_steps(dict(), integer(), integer(), [integer(),...]) ->
		      coords() | error;
	      (dict(),integer(), integer(),[]) ->
		      error.

do_steps(_A, _X, _Y, []) when is_integer(_X), is_integer(_Y), is_tuple(_A)->
    error;

do_steps(C2U, X, Y, [D|T]) ->
  case try_direction(C2U, X, Y, D) of
    error -> do_steps(C2U, X, Y, T);
    Result -> Result
  end.

-spec try_direction(dict(), integer(), integer(), integer()) ->
			   error | coords().
							    
try_direction(C2U, X, Y, D) ->
    Dir = if 
	      D < 0 -> 6 + D;
	      true -> D rem 6
	  end,
    {DX, DY} =  map:in_direction({X, Y}, Dir),
    case dict:find({DX, DY}, C2U) of
	error -> {DX, DY};
	_ -> error
    end.

	    
sorted_foe(Unit, U2CF) ->
    ?INFO({"closest foe"}),
    MyFleet = unit:fleet(Unit),
    U2CFoes = lists:foldl(fun ({_, D}, L) ->
				  dict:to_list(D) ++ L
			  end,
			  [],
			  dict:to_list(dict:filter(fun (F, _) ->
							   F =/= MyFleet
						   end, U2CF))),
    FoesWithDist = lists:map(fun ({UId, Pos}) -> 
				     {UId, unit:distance(Unit, Pos)}
			     end, U2CFoes),
    SortedFoes = lists:usort(fun ({_, D1}, {_, D2}) ->
				     D1 < D2
			     end, FoesWithDist),
    ?DBG({Unit, SortedFoes}),
    SortedFoes.
