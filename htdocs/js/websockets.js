function translate_sub_data(D) {
    var Result = [];
    window.console.info(D[0]);
    switch(D[0]) {
    case "impact": /* {"impact", MaxDamage, NewIntegrety} */
	Result.push([{
	    "type": "impact",
	    "damage": D[1]
	}]);
	break;
    case "armor_impact": /* {"armor_impact", ActualAbsorbation, NewIntegrety} */
	window.console.info("armor_impact");
	Result.push([{
	    "type": "armor_impact",
	    "damage": D[1]
	}]);
	break;
    case "shield_impact": /* {"shield_impact", ShieldDamage, ShieldEnergy,NewIntegrety} */
	window.console.info("shield_impact");
	Result.push([{
	    "type": "shield_impact",
	    "damage": D[1]
	}]);
	break;
    };
    return Result;
};

function translate_data(D) {
    var Result = []
    window.console.info("Translating: ", D);
    if (D == []) {
	windows.conole.warn("Early exit in translator:", D);
	return Result;
    };
    window.console.info(D[0]);
    switch(D[0]) {
    case "spawn":/*{spawn, Id, Fleet, Name, Hull, X, Y}*/
	Result = Result.concat(
	    [{"type": "spawn",
	      "data": {
		  "id": D[1],
		  "team": D[2],
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
	Result.push([{
	    "type": "attack",
	    "unit": D[1],
	    "target": D[2],
	    "damage": D[3],
	    "partials": translate_sub_data(D[4])
	}]);
	break;
    case "multi_event":
	Result = Result.concat(translate_data(D[1]));
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
    window.console.info("Converted:", D, "to", Result);
    if (Result.length == 1) {
	return Result[0];
    } else {
	return Result;
    }
};