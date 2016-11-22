%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <licenser@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  9 Dec 2011 by Heinz N. Gies <licenser@licenser.net>
%%%-------------------------------------------------------------------
-module(ds_web_user).

%% API
-export([
         verify/2,
         create/2,
         create/3
        ]).

%%%===================================================================
%%% API
%%%===================================================================

%%--------------------------------------------------------------------
%% @doc
%% @spec
%% @end
%%--------------------------------------------------------------------

verify(<<"">>, <<"">>) ->
    {error, not_found};

verify(User, Pass) ->
    SeededPass = <<User/binary, ":", Pass/binary>>,
    case pgapp:equery("SELECT id, name, rights FROM users "
                      "WHERE name=$1 and pass=MD5($2)",
                      [binary_to_list(User), SeededPass]) of
        {ok, _, [{UId, Name, Rights}]} -> {ok, UId, Name, Rights};
        {ok, _, []} -> {error, not_found};
        E -> {error, sql_failed, E}
    end.

create(User, Pass) ->
    create(User, Pass, 0).

create( User, Pass, Rights) ->
    case pgapp:equery("INSERT INTO users (name, pass, rights) "
                      "VALUES($1, MD5($2), $3)",
                      [User, <<User/binary, ":", Pass/binary>>, Rights]) of
        {ok, 1} -> verify(User, Pass);
        {error, _} -> {error, error}
    end.

%%%===================================================================
%%% Internal functions
%%%===================================================================
