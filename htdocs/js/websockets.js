function translate_sub_data(D) {
    switch(D[0]) {
    case "impact": /* {"impact", MaxDamage, NewIntegrety} */
	return {
	    "type": "impact",
	    "damage": D[1]
	};
	break;
    case "armor_impact": /* {"armor_impact", ActualAbsorbation, NewIntegrety} */
	return {
	    "type": "armor_impact",
	    "damage": D[1]
	};
	break;
    case "shield_impact": /* {"shield_impact", ShieldDamage, ShieldEnergy,NewIntegrety} */
	return {
	    "type": "shield_impact",
	    "damage": D[1]
	};
	break;
    };
};

function translate_data(D) {
    var Result = []
    if (D == []) {
	windows.conole.warn("Early exit in translator:", D);
	return Result;
    };
    switch(D[0]) {
    case "spawn":/*{spawn, Id, Fleet, Name, Hull, X, Y}*/
	Result = Result.concat(
	    [{"type": "spawn",
	      "data": {
		  "id": D[1],
		  "team": D[2],
		  "damage": 0,
		  "type": {
		      "name": D[3],
		      "hull": D[4]
		  }
	      }
	     },
	     {
		 "type": "move",
		 "unit": D[1],
		 "position": {
		     "x": D[5],
		     "y": D[6]
		 }
	     }]);
	break;
    case "hit": /* {hit, attacker, target, damage, partials} */
	var P = D[4];
	for(var i = 0; i < P.length; i++) {
	    P[i] = translate_sub_data(P[i]);
	};
	Result.push([{
	    "type": "attack",
	    "unit": D[1],
	    "target": D[2],
	    "damage": D[3],
	    "partials": P
	}]);
	window.console.info(D, "->", Result[0]);
	break;
    case "multi_event":
	Result = Result.concat(translate_data(D[1]));
	break;
    case "destroyed":
	Result.push([{
	    "type": "destroyed",
	    "unit": D[1]
	}]);
	break;
    case "target":
	Result.push([{
	    "type": "target",
	    "unit": D[1],
	    "target": D[2]
	}]);
	break;
    case "highlight":
	Result.push([{
	    "type": "highlight",
	    "unit": D[1],
	    "color": D[2]
	}]);
	break;
    case "miss":
	break;
    default:
	if (D.length && typeof(D) != "string") {
	    for (var i = 0; i < D.length; i++) {
	    	Result = Result.concat(translate_data(D[i]));
	    }
	} else {
	    window.console.warn("Can't transkate:",  D);
	    return [];
	}
    };
    if (Result.length == 1) {
	return Result[0];
    } else {
	return Result;
    }
};