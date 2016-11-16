goog.provide('evil.core');
goog.require('cljs.core');
goog.require('evil.script');
goog.require('evil.dom');
goog.require('evil.ajaj');
goog.require('evil.shiptype');
goog.require('evil.fleet');
goog.require('evil.fight');
goog.require('evil.epic');
evil.core.$ = $;
evil.core.fight_row = (function fight_row(fight){
return evil.dom.clear.call(null,cljs.core.Vector.fromArray(["﷐'tr",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":fight.call(null,"id")}),cljs.core.Vector.fromArray(["﷐'td",cljs.core.str.call(null,fight.call(null,"id"),"s")]),cljs.core.Vector.fromArray(["﷐'td",fight.call(null,"state")]),cljs.core.Vector.fromArray(["﷐'td",fight.call(null,"time")]),cljs.core.Vector.fromArray(["﷐'td",fight.call(null,"ticks")])]));
});
evil.core.update_epic_server = (function update_epic_server(id){
return evil.epic.do_get.call(null,id,(function (res){
var tab__2529 = evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'table",cljs.core.Vector.fromArray(["﷐'tr",cljs.core.Vector.fromArray(["﷐'th","Fight"]),cljs.core.Vector.fromArray(["﷐'th","Status"]),cljs.core.Vector.fromArray(["﷐'th","Time"]),cljs.core.Vector.fromArray(["﷐'th","Ticks"])])]));

var G__2530__2531 = evil.dom.select.call(null,cljs.core.str.call(null,"div#",id));

evil.dom.clear.call(null,G__2530__2531);
evil.dom.append.call(null,G__2530__2531,com.c.call(null,cljs.core.Vector.fromArray(["﷐'h2",id])));
evil.dom.append.call(null,G__2530__2531,tab__2529);
G__2530__2531;
return cljs.core.dorun.call(null,cljs.core.map.call(null,(function (fight){
return evil.dom.append.call(null,tab__2529,evil.core.fight_row.call(null,fight));
}),evil.core.a,res));
}));
});
evil.core.update_epic_servers = (function update_epic_servers(){
var div__2532 = evil.dom.select.call(null,"div#epic");

evil.dom.clear.call(null,div__2532);
return evil.epic.do_list.call(null,(function (res){
return cljs.core.dorun.call(null,cljs.core.map.call(null,(function (id){
evil.dom.append.call(null,div__2532,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":id}),id])));
return evil.core.update_epic_server.call(null,id);
}),res));
}));
});
evil.core.$.call(null,document).ready((function (){
evil.script.update_scripts.call(null);
evil.shiptype.fetch_modules.call(null);
evil.shiptype.update_shiptypes.call(null);
evil.fleet.update_fleets.call(null);
return evil.fight.update_fights.call(null);
}));
