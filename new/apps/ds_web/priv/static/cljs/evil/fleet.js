goog.provide('evil.fleet');
goog.require('cljs.core');
goog.require('evil.ajaj');
goog.require('evil.dom');
goog.require('evil.shiptype');
evil.fleet.modules = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));
evil.fleet.fleet = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));
evil.fleet.do_list = (function do_list(fun){
return evil.ajaj.do_ajaj.call(null,"/fleet",(function (res){
return fun.call(null,res);
}));
});
evil.fleet.do_get = (function do_get(id,fun){
return evil.ajaj.do_ajaj.call(null,cljs.core.str.call(null,"/fleet/",id),(function (res){
return fun.call(null,res);
}));
});
evil.fleet.update_count_fn = (function update_count_fn(fleet_id,m){
return (function (){
var new_m__2579 = cljs.core.assoc.call(null,m,"count",evil.dom.ival.call(null,cljs.core.str.call(null,"#fleet-",fleet_id,"-shiptype-",m.call(null,"id"),"-cnt")));

return evil.ajaj.put_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/fleet/",fleet_id,"/shiptype/",m.call(null,"id")),new_m__2579,(function (r){
return null;
}));
});
});
evil.fleet.shiptype_line = (function shiptype_line(fleet_id,m){
var id__2580 = cljs.core.str.call(null,"fleet-",fleet_id,"-shiptype-",m.call(null,"id"));

return cljs.core.Vector.fromArray(["﷐'tr",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":id__2580}),cljs.core.Vector.fromArray(["﷐'td",m.call(null,"name")]),cljs.core.Vector.fromArray(["﷐'td",cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'id","﷐'value"],{"﷐'type":"text","﷐'id":cljs.core.str.call(null,id__2580,"-cnt"),"﷐'value":m.call(null,"count")})]),cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'value","﷐'click"],{"﷐'type":"submit","﷐'value":"Update","﷐'click":evil.fleet.update_count_fn.call(null,fleet_id,m)})])]),cljs.core.Vector.fromArray(["﷐'td",cljs.core.ObjMap.fromObject(["﷐'click"],{"﷐'click":(function (){
return evil.ajaj.del_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/fleet/",fleet_id,"/shiptype/",m.call(null,"id")),(function (){
return evil.dom.del.call(null,cljs.core.str.call(null,"#",id__2580));
}));
})}),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class"],{"﷐'class":"del"}),"del"])])]);
});
evil.fleet.update_shiptypes = (function update_shiptypes(id){
var d__2581 = evil.dom.select.call(null,cljs.core.str.call(null,"#fleet-",id,"-shiptype-select"));

return evil.shiptype.do_list.call(null,(function (res){
return cljs.core.dorun.call(null,cljs.core.map.call(null,(function (s){
return evil.dom.append.call(null,d__2581,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'option",cljs.core.ObjMap.fromObject(["﷐'value"],{"﷐'value":s.call(null,"id")}),s.call(null,"name")])));
}),res));
}));
});
evil.fleet.add_shiptype_fn = (function add_shiptype_fn(s){
return (function (){
var shiptype_id__2582 = evil.dom.ival.call(null,cljs.core.str.call(null,"#fleet-",s.call(null,"id"),"-shiptype-select"));
var cnt__2583 = evil.dom.ival.call(null,cljs.core.str.call(null,"#fleet-",evil.fleet.fleet_id,"-shiptype-cnt"));

return evil.ajaj.post_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/fleet/",s.call(null,"id"),"/shiptype"),cljs.core.ObjMap.fromObject(["fleet_id","shiptype_id","count"],{"fleet_id":s.call(null,"id"),"shiptype_id":shiptype_id__2582,"count":cnt__2583}),(function (t){
return evil.dom.append.call(null,cljs.core.str.call(null,"#fleet-",s.call(null,"id"),"-shiptype"),evil.dom.c.call(null,evil.fleet.shiptype_line.call(null,s.call(null,"id"),t)));
}));
});
});
evil.fleet.shiptype_section = (function shiptype_section(s){
var res__2584 = cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.Vector.fromArray(["﷐'table",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"fleet-",s.call(null,"id"),"-shiptype")}),cljs.core.Vector.fromArray(["﷐'tr",cljs.core.Vector.fromArray(["﷐'td",cljs.core.Vector.fromArray(["﷐'select",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"fleet-",s.call(null,"id"),"-shiptype-select")}),cljs.core.Vector.fromArray(["﷐'option"])])]),cljs.core.Vector.fromArray(["﷐'td",cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'id","﷐'value"],{"﷐'type":"text","﷐'id":cljs.core.str.call(null,"fleet-",evil.fleet.fleet_id,"-shiptype-cnt"),"﷐'value":"1"})])]),cljs.core.Vector.fromArray(["﷐'td",cljs.core.ObjMap.fromObject(["﷐'click"],{"﷐'click":evil.fleet.add_shiptype_fn.call(null,s)}),"add"])])]),cljs.core.vec.call(null,cljs.core.map.call(null,(function (m){
return evil.fleet.shiptype_line.call(null,s.call(null,"id"),m);
}),s.call(null,"shiptypes")))));

return res__2584;
});
evil.fleet.save_fn = (function save_fn(entity){
return (function (){
return evil.ajaj.put_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/fleet/",entity.call(null,"id")),cljs.core.ObjMap.fromObject(["id","name","user_id"],{"id":entity.call(null,"id"),"name":evil.dom.val.call(null,cljs.core.str.call(null,"#fleet-",entity.call(null,"id"),"-name")),"user_id":evil.ajaj.uid}),(function (s){
return evil.dom.text.call(null,cljs.core.str.call(null,"span[name=fleet-",s.call(null,"id"),"-name]"),s.call(null,"name"));
}));
});
});
evil.fleet.show_fleet_fn = (function show_fleet_fn(entity){
return (function (){
return evil.fleet.do_get.call(null,entity.call(null,"id"),(function (s){
var center__2585 = evil.dom.select.call(null,"#center");

evil.dom.clear.call(null,center__2585);
evil.dom.append.call(null,center__2585,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.Vector.fromArray(["﷐'span","Name:"]),cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'id","﷐'value"],{"﷐'type":"text","﷐'id":cljs.core.str.call(null,"fleet-",s.call(null,"id"),"-name"),"﷐'value":s.call(null,"name")})]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'value","﷐'click"],{"﷐'type":"submit","﷐'value":"Save","﷐'click":evil.fleet.save_fn.call(null,entity)})]),cljs.core.Vector.fromArray(["﷐'br"]),evil.fleet.shiptype_section.call(null,s)])));
return evil.fleet.update_shiptypes.call(null,s.call(null,"id"));
}));
});
});
evil.fleet.del_fleet_fn = (function del_fleet_fn(entity){
var id__2586 = entity.call(null,"id");

return (function (){
return evil.ajaj.del_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/fleet/",id__2586),(function (){
return evil.dom.del.call(null,cljs.core.str.call(null,"#fleet-",id__2586));
}));
});
});
evil.fleet.add_fleet = (function() {
var add_fleet = null;
var add_fleet__2589 = (function (entity){
return add_fleet.call(null,evil.dom.select.call(null,cljs.core.str.call(null,"div#fleet")),entity);
});
var add_fleet__2590 = (function (div,entity){
var c__2588 = evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"fleet-",entity.call(null,"id"))}),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'click","﷐'name"],{"﷐'click":evil.fleet.show_fleet_fn.call(null,entity),"﷐'name":cljs.core.str.call(null,"fleet-",entity.call(null,"id"),"-name")}),(function (){var or__3548__auto____2587 = entity.call(null,"name");

if(cljs.core.truth_(or__3548__auto____2587))
{return or__3548__auto____2587;
} else
{return "-";
}
})()])," ",cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class","﷐'click"],{"﷐'class":"del","﷐'click":evil.fleet.del_fleet_fn.call(null,entity)}),"del"])]));

return evil.dom.append.call(null,div,c__2588);
});
add_fleet = function(div,entity){
switch(arguments.length){
case  1 :
return add_fleet__2589.call(this,div);
case  2 :
return add_fleet__2590.call(this,div,entity);
}
throw('Invalid arity: ' + arguments.length);
};
return add_fleet;
})()
;
evil.fleet.update_fleets = (function update_fleets(){
var div__2592 = evil.dom.select.call(null,cljs.core.str.call(null,"div#fleet"));

evil.dom.clear.call(null,div__2592);
evil.dom.append.call(null,div__2592,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'span",cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"fleet-new-input"})]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class","﷐'click"],{"﷐'class":"add","﷐'click":(function (){
return evil.ajaj.post_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/fleet"),cljs.core.ObjMap.fromObject(["user_id","name"],{"user_id":evil.ajaj.uid,"name":evil.dom.val.call(null,evil.dom.select.call(null,"#fleet-new-input"))}),evil.fleet.add_fleet);
})}),"add"]),cljs.core.Vector.fromArray(["﷐'Br"])])));
return evil.fleet.do_list.call(null,(function (res){
return cljs.core.dorun.call(null,cljs.core.map.call(null,cljs.core.partial.call(null,evil.fleet.add_fleet,div__2592),res));
}));
});
