%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@Schroedinger.local>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  9 Dec 2011 by Heinz N. Gies <licenser@Schroedinger.local>
%%%-------------------------------------------------------------------
-module(ds_web_user).

%% API
-export([
	 verify/3,
	 create/3,
	 create/4
	]).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

verify(_Connection, <<"">>, <<"">>) ->
    {error, not_found};

verify(Connection, User, Pass) ->
    io:format("U/P: ~p/~p~n", [User, Pass]),
    SeededPass = <<User/binary, ":", Pass/binary>>,
    io:format("SP: ~p~n", [SeededPass]),
    case pgsql:equery(Connection, "SELECT id, name, rights FROM users WHERE name=$1 and pass=MD5($2)", [binary_to_list(User), SeededPass]) of
	{ok, _, [{UId, Name, Rights}]} -> {ok, UId, Name, Rights};
	{ok, _, []} -> {error, not_found};
	E -> io:format("E: ~p~n", [E]), 
	     {error, sql_failed, E}
    end.

create(Connection, User, Pass) ->
    create(Connection, User, Pass, 0).

create(Connection, User, Pass, Rights) ->
    case pgsql:equery(Connection, "INSERT INTO users (name, pass, rights) VALUES($1, MD5($2), $3)", [User, <<User/binary, ":", Pass/binary>>, Rights]) of
	{ok, 1} -> verify(Connection, User, Pass);
	{error, _} -> {error, error}
    end.
	     
%%%===================================================================
%%% Internal functions
%%%===================================================================