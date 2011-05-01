%%%-------------------------------------------------------------------
%%% @author Heinz N. Gies <heinz@licenser.net>
%%% @copyright (C) 2011, Heinz N. Gies
%%% @doc
%%%
%%% @end
%%% Created : 27 Apr 2011 by Heinz N. Gies <heinz@licenser.net>
%%%-------------------------------------------------------------------
-module(fight).

-export([ % Meta
	  new/2
	]).

-export([ % Logic
	  foes/2,
	  closest_foe/2,
	  add_unit/2,
	  get_unit/2,
	  unit_ids/1,
	  units/1,
	  units/2
	]).

-record(fight, {map, units}).

new(Map, Units) when is_list(Units) ->
    #fight{map = Map,
	   units = dict:from_list(lists:map(fun (Unit) ->
						    {unit:ensure_id(Unit), unit:ensure_record(Unit)}
					    end, Units))}.

foes(#fight{units = Units}, Unit) ->
    OwnFleet = unit:fleet(Unit),
    lists:map(fun ({_, U}) ->
		      U
	      end, dict:to_list(dict:filter(fun (_, U) ->
						    OwnFleet =/= unit:fleet(U)
					    end, Units))).

units(#fight{units = Units}) ->
    Units.

units(#fight{} = Fight, Units) ->
    Fight#fight{units = Units}.

add_unit(#fight{units = Units} = Fight, Unit) ->
    Fight#fight{units = dict:store(unit:ensure_id(Unit), Unit, Units)}.

get_unit(#fight{units = Units}, Unit) ->
    UnitID = unit:ensure_id(Unit),
    dict:fetch(UnitID, Units).

unit_ids(#fight{units = Units}) ->
    dict:fetch_keys(Units).

closest_foe(#fight{}=Fight, Unit) ->
    UID = unit:id(Unit),
    {_, ClosestUnit, _} = lists:foldl(fun (TestedUnit, {BestId, BestUnit, BestDist}) ->
					      TestedDist = unit:distance(TestedUnit, Unit),
					      TestedID = unit:id(TestedUnit),
					      if
						  UID == TestedID -> {BestId, BestUnit, BestDist};
						  TestedDist < BestDist -> {TestedID, TestedUnit, TestedDist};
						  true -> {BestId, BestUnit, BestDist}
					      end
				      end, {nil, nil, 1000000}, foes(Fight, Unit)),
    ClosestUnit.
