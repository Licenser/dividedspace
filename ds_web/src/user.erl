%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@Schroedinger.local>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  9 Dec 2011 by Heinz N. Gies <licenser@Schroedinger.local>
%%%-------------------------------------------------------------------
-module(user).

%% API
-export([
	 verify/3
	]).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

verify(Connection, User, Pass) ->
    case pgsql:equery(Connection, "SELECT id, name FROM users WHERE name=$1 and pass=MD5($2)", [User, User ++ ":" ++ Pass]) of
	{ok, _, [{UId}, {Name}]} -> {ok, UId, Name};
	{ok, _, []} -> {error, not_found};
	_ -> {error, sql_failed}
	end.

create(Connection, User, Pass) ->
    case pgsql:equery(Connection, "INSERT INTO users (name, pass) VALUES($1, MD5($2))", ["heinz", "heinz" ++ ":" ++ "pass"]) of
	{ok, 1} -> verify(Connection, User, Pass);
	{error, _} -> {error, error}
    end.
	     
%%%===================================================================
%%% Internal functions
%%%===================================================================
