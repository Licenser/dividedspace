goog.provide('evil.fight');
goog.require('cljs.core');
goog.require('evil.ajaj');
goog.require('evil.dom');
goog.require('evil.shiptype');
evil.fight.add_fight_line = (function add_fight_line(p__2552){
var map__2553__2559 = p__2552;
var map__2553__2560 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2553__2559))?cljs.core.apply.call(null,cljs.core.hash_map,map__2553__2559):map__2553__2559);
var id__2561 = cljs.core.get.call(null,map__2553__2560,"id");
var vec__2554__2562 = cljs.core.get.call(null,map__2553__2560,"fleets");
var map__2555__2563 = cljs.core.nth.call(null,vec__2554__2562,0,null);
var map__2555__2564 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2555__2563))?cljs.core.apply.call(null,cljs.core.hash_map,map__2555__2563):map__2555__2563);
var fleet_a__2565 = cljs.core.get.call(null,map__2555__2564,"name");
var map__2556__2566 = cljs.core.get.call(null,map__2555__2564,"user");
var map__2556__2567 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2556__2566))?cljs.core.apply.call(null,cljs.core.hash_map,map__2556__2566):map__2556__2566);
var user_a__2568 = cljs.core.get.call(null,map__2556__2567,"name");
var map__2557__2569 = cljs.core.nth.call(null,vec__2554__2562,1,null);
var map__2557__2570 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2557__2569))?cljs.core.apply.call(null,cljs.core.hash_map,map__2557__2569):map__2557__2569);
var fleet_b__2571 = cljs.core.get.call(null,map__2557__2570,"name");
var map__2558__2572 = cljs.core.get.call(null,map__2557__2570,"user");
var map__2558__2573 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2558__2572))?cljs.core.apply.call(null,cljs.core.hash_map,map__2558__2572):map__2558__2572);
var user_b__2574 = cljs.core.get.call(null,map__2558__2573,"name");

return evil.dom.append.call(null,"#fight-list",evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'a",cljs.core.ObjMap.fromObject(["﷐'href","﷐'target"],{"﷐'href":cljs.core.str.call(null,"/fight/",id__2561),"﷐'target":"_blank"}),cljs.core.str.call(null,fleet_a__2565,"(",user_a__2568,") vs. ",fleet_b__2571,"(",user_b__2574,")"),cljs.core.Vector.fromArray(["﷐'br"])])));
});
evil.fight.start_fight = (function start_fight(){
var fleet_a__2575 = evil.dom.ival.call(null,"#fleet-a");
var fleet_b__2576 = evil.dom.ival.call(null,"#fleet-b");

return evil.ajaj.post_clj.call(null,"/api/v1/fight",cljs.core.ObjMap.fromObject(["fleet_a","fleet_b"],{"fleet_a":fleet_a__2575,"fleet_b":fleet_b__2576}),evil.fight.add_fight_line);
});
evil.fight.fight_view = (function fight_view(){
evil.dom.clear.call(null,"#center");
evil.dom.append.call(null,"#center",evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"new-fight"})]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"fight-list"})])])));
evil.ajaj.get_clj.call(null,"/api/v1/fight",(function (res){
var list__2577 = evil.dom.select.call(null,"#fight-list");

return cljs.core.doall.call(null,cljs.core.map.call(null,evil.fight.add_fight_line,res));
}));
return evil.ajaj.get_clj.call(null,"/api/v1/fleet",(function (res){
return evil.dom.append.call(null,"#new-fight",evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'span",evil.dom.s.call(null,cljs.core.Vector.fromArray([cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"fleet-a"})]),(function (s){
return cljs.core.Vector.fromArray(["﷐'option",cljs.core.ObjMap.fromObject(["﷐'value"],{"﷐'value":s.call(null,"id")}),s.call(null,"name")]);
}),res)," vs. ",evil.dom.s.call(null,cljs.core.Vector.fromArray([cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"fleet-b"})]),(function (s){
return cljs.core.Vector.fromArray(["﷐'option",cljs.core.ObjMap.fromObject(["﷐'value"],{"﷐'value":s.call(null,"id")}),s.call(null,"name")]);
}),res)," - ",cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'value","﷐'type","﷐'click"],{"﷐'value":"Fight!","﷐'type":"submit","﷐'click":evil.fight.start_fight})])])));
}));
});
evil.fight.update_fights = (function update_fights(){
var div__2578 = evil.dom.select.call(null,"div#fight");

evil.dom.clear.call(null,div__2578);
return evil.dom.append.call(null,div__2578,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'span",cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'click"],{"﷐'click":evil.fight.fight_view}),"manage"]),cljs.core.Vector.fromArray(["﷐'br"])])));
});
