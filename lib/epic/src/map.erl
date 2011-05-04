%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created :  3 May 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(map).
-include("epic_types.hrl").


-export([
	 in_direction/2,
	 to_cartesian/1,
	 friction_direction_between/2,
	 direction_between/2,
	 distance/2
	]).


-spec in_direction(coords(), 0 | 1 | 2 | 3 | 4 | 5) -> 
			  coords().

in_direction({X, Y}, 0) when 
      is_integer(X),
      is_integer(Y) ->
    {X, Y-1};
in_direction({X, Y}, 1) when 
      is_integer(X),
      is_integer(Y) ->
    {X+1, Y-1};
in_direction({X, Y}, 2) when 
      is_integer(X),
      is_integer(Y) ->
    {X+1, Y};
in_direction({X, Y}, 3) when 
      is_integer(X),
      is_integer(Y) ->
    {X, Y+1};
in_direction({X, Y}, 4) when 
      is_integer(X),
      is_integer(Y) ->
    {X-1, Y};
in_direction({X, Y}, 5) when 
      is_integer(X),
      is_integer(Y) ->
    {X-1, Y-1}.

-spec to_cartesian(coords()) ->
			  {integer(), float()}.

to_cartesian({X, Y}) ->
    CY = case (X rem 2) of
	     0 -> Y;
	     1 -> Y + 0.5;
	     -1 -> Y + 0.5		      
	 end,
    {X, CY * -1 / math:sqrt(3)}.

-spec friction_direction_between(coords(), coords()) ->
					float().
friction_direction_between(A, B) ->
    {CX1, CY1} = to_cartesian(A),
    {CX2, CY2} = to_cartesian(B),
    D = ((0 - (math:atan2(CY2 - CY1, CX2 - CX1) / math:pi()) + 0.5) * 3),
    if 
	D < 0 -> D + 6;
	true -> D
    end.


-spec direction_between(coords(), coords()) ->
					integer().
direction_between(A, B) ->
    round(friction_direction_between(A, B)) rem 6.


-spec int_max(integer(), integer()) ->
		     integer().

int_max(A, B) when is_integer(A),
		   is_integer(B) ->
    if 
	A > B -> A;
	true -> B
    end.

-spec int_abs(integer()) ->
		     non_neg_integer().

int_abs(A) when is_integer(A)->
    abs(A).
%    if 
%	A < 0 ->
%	    A*-1;
%	true -> A
%    end.

-spec distance(coords(), coords()) ->
		      non_neg_integer().

distance({X1, Y1}, {X2, Y2}) when is_integer(X1), 
				  is_integer(Y1),
				  is_integer(X2), 
				  is_integer(Y2) ->
    DX = X1 - X2,
    DY = Y1 - Y2,
    AX = int_abs(DX),
    AY = int_abs(DY),
    XPos = DX > 0,
    YPos = DY > 0,
    if 
	XPos == YPos -> int_max(AX, AY);
	true -> AX + AY
    end.
				   


floor(X) ->
    T = erlang:trunc(X),
    case (X - T) of
        Neg when Neg < 0 -> T - 1;
        Pos when Pos > 0 -> T;
        _ -> T
    end.

ceiling(X) ->
    T = erlang:trunc(X),
    case (X - T) of
        Neg when Neg < 0 -> T;
        Pos when Pos > 0 -> T + 1;
        _ -> T
    end.
