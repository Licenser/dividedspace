%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  3 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(map).
-export([
	 in_direction/2,
	 in_direction/3,
	 to_evil/1,
	 to_evil/2,
	 to_cartesian/1,
	 to_cartesian/2,
	 friction_direction_between/2,
	 friction_direction_between/4,
	 direction_between/2,
	 direction_between/4,
	 distance/2,
	 distance/4
	]).


in_direction({X, Y}, D) when 
      is_integer(D),
      is_integer(X),
      is_integer(Y) ->
    in_direction(D, X, Y).

in_direction(X, Y, 0) when 
      is_integer(X),
      is_integer(Y) ->
    {X+1, Y+1};
in_direction(X, Y, 1) when 
      is_integer(X),
      is_integer(Y) ->
    {X+1, Y};
in_direction(X, Y, 2) when 
      is_integer(X),
      is_integer(Y) ->
    {X, Y-1};
in_direction(X, Y, 3) when 
      is_integer(X),
      is_integer(Y) ->
    {X-1, Y-1};
in_direction(X, Y, 4) when 
      is_integer(X),
      is_integer(Y) ->
    {X-1, Y};
in_direction(X, Y, 5) when 
      is_integer(X),
      is_integer(Y) ->
    {X, Y+1}.

to_evil({X,Y}) ->
    to_evil(X,Y).
to_evil(X,Y) ->
    {X - Y, trunc(-1 * (X + Y) / 2.0)}.

to_cartesian({X, Y}) ->
    to_cartesian(X, Y).
to_cartesian(X, Y) ->
    {EX, EY} = to_evil(X, Y),
    CY = case (EX rem 2) of
	     0 -> EY;
	     1 -> EY + 0.5
	 end,
    {EX, CY * -1 / math:sqrt(3)}.

friction_direction_between({X1, Y1}, {X2, Y2}) ->
    friction_direction_between(X1, Y1, X2, Y2).
friction_direction_between(X1, Y1, X2, Y2) ->
    {CX1, CY1} = to_cartesian(X1, Y1),
    {CX2, CY2} = to_cartesian(X2, Y2),
    round((0 - (math:atan2(CY2 - CY1, CX2 - CX1) / math:pi()) + 0.5) * 3) rem 6.

direction_between({X1, Y1}, {X2, Y2}) ->
    direction_between(X1, Y1, X2, Y2).

direction_between(X1, Y1, X2, Y2) ->
    round(friction_direction_between(X1, Y1, X2, Y2)).

distance({X1, Y1}, {X2, Y2}) ->
    distance(X1, Y1, X2, Y2).
distance(X1, Y1, X2, Y2) ->
    DX = X1 - X2,
    DY = Y1 - Y2,
    AX = abs(DX),
    AY = abs(DY),
    case {DX > 0, DY > 0} of
	{_R, _R} ->  max(AY, AY);
	_ -> AX + AY
    end.
				   
