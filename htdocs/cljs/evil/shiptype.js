goog.provide('evil.shiptype');
goog.require('cljs.core');
goog.require('evil.ajaj');
goog.require('evil.dom');
goog.require('evil.script');
evil.shiptype.modules = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));
evil.shiptype.shiptype = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));
evil.shiptype.do_list = (function do_list(fun){
return evil.ajaj.do_ajaj.call(null,"/shiptype",(function (res){
return fun.call(null,res);
}));
});
evil.shiptype.do_get = (function do_get(id,fun){
return evil.ajaj.do_ajaj.call(null,cljs.core.str.call(null,"/shiptype/",id),(function (res){
return fun.call(null,res);
}));
});
evil.shiptype.modules_of_type = (function modules_of_type(modules,type){
return cljs.core.filter.call(null,(function (p1__2599_SHARP_){
return cljs.core._EQ_.call(null,type,p1__2599_SHARP_.call(null,"type"));
}),modules);
});
evil.shiptype.test_hull = (function test_hull(modules){
if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null,evil.shiptype.modules_of_type.call(null,modules,"hull"))))
{return cljs.core.Vector.fromArray(["No hull defined"]);
} else
{return null;
}
});
evil.shiptype.test_weapon = (function test_weapon(modules){
if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null,evil.shiptype.modules_of_type.call(null,modules,"weapon"))))
{return cljs.core.Vector.fromArray(["No weapon defined"]);
} else
{return null;
}
});
evil.shiptype.test_generator = (function test_generator(modules){
if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null,evil.shiptype.modules_of_type.call(null,modules,"generator"))))
{return cljs.core.Vector.fromArray(["No generator defined"]);
} else
{return null;
}
});
evil.shiptype.test_engine = (function test_engine(modules){
if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null,evil.shiptype.modules_of_type.call(null,modules,"engine"))))
{return cljs.core.Vector.fromArray(["No engine defined"]);
} else
{return null;
}
});
evil.shiptype.test_script = (function test_script(entity){
if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null,evil.dom.val.call(null,cljs.core.str.call(null,"#shiptype-",entity.call(null,"id"),"-script-select")))))
{return cljs.core.Vector.fromArray(["No script defined."]);
} else
{return null;
}
});
evil.shiptype.module_warnings = (function module_warnings(modules){
return cljs.core.concat.call(null,cljs.core.Vector.fromArray([]),evil.shiptype.test_hull.call(null,modules),evil.shiptype.test_weapon.call(null,modules),evil.shiptype.test_generator.call(null,modules),evil.shiptype.test_engine.call(null,modules));
});
evil.shiptype.warnings = (function warnings(shiptype){
var ws__2600 = cljs.core.concat.call(null,evil.shiptype.module_warnings.call(null,shiptype.call(null,"modules")),evil.shiptype.test_script.call(null,shiptype));

evil.dom.clear.call(null,"#shiptype-warnings");
return evil.dom.append.call(null,"#shiptype-warnings",evil.dom.c.call(null,cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.Vector.fromArray(["﷐'ul",cljs.core.ObjMap.fromObject(["﷐'class"],{"﷐'class":"warnings"})]),cljs.core.map.call(null,(function (w){
return cljs.core.Vector.fromArray(["﷐'li",w]);
}),ws__2600)))));
});
evil.shiptype.expand_module = (function expand_module(p__2602){
var m__2603 = p__2602;
var m__2604 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,m__2603))?cljs.core.apply.call(null,cljs.core.hash_map,m__2603):m__2603);
var name__2605 = cljs.core.get.call(null,m__2604,"name");

return cljs.core.assoc.call(null,cljs.core.get.call(null,cljs.core.deref.call(null,evil.shiptype.modules),name__2605),"id",m__2604.call(null,"id"));
});
evil.shiptype.set_shiptype_BANG_ = (function set_shiptype_BANG_(s){
return cljs.core.reset_BANG_.call(null,evil.shiptype.shiptype,cljs.core.update_in.call(null,s,cljs.core.Vector.fromArray(["modules"]),(function (p1__2601_SHARP_){
return cljs.core.map.call(null,evil.shiptype.expand_module,p1__2601_SHARP_);
})));
});
evil.shiptype.shiptype_hull = (function shiptype_hull(s){
return cljs.core.first.call(null,cljs.core.filter.call(null,(function (p1__2606_SHARP_){
return cljs.core._EQ_.call(null,"hull",p1__2606_SHARP_.call(null,"type"));
}),s.call(null,"modules")));
});
evil.shiptype.shiptype_size = (function shiptype_size(s){
return cljs.core.Vector.fromArray([cljs.core.reduce.call(null,cljs.core._PLUS_,cljs.core.map.call(null,(function (p1__2607_SHARP_){
return cljs.core.get.call(null,p1__2607_SHARP_,"size");
}),cljs.core.filter.call(null,(function (p1__2608_SHARP_){
return cljs.core.not_EQ_.call(null,"hull",p1__2608_SHARP_.call(null,"type"));
}),s.call(null,"modules")))),(function (){var temp__3695__auto____2609 = evil.shiptype.shiptype_hull.call(null,s);

if(cljs.core.truth_(temp__3695__auto____2609))
{var h__2610 = temp__3695__auto____2609;

return h__2610.call(null,"size");
} else
{return 0;
}
})()]);
});
evil.shiptype.shiptype_update_size_BANG_ = (function shiptype_update_size_BANG_(s){
var vec__2612__2613 = evil.shiptype.shiptype_size.call(null,s);
var used__2614 = cljs.core.nth.call(null,vec__2612__2613,0,null);
var total__2615 = cljs.core.nth.call(null,vec__2612__2613,1,null);

return evil.dom.text.call(null,cljs.core.str.call(null,"#shiptype-",s.call(null,"id"),"-size"),cljs.core.str.call(null,used__2614,"/",total__2615));
});
evil.shiptype.module_line = (function module_line(ship_id,m){
var id__2616 = cljs.core.str.call(null,"shiptype-",ship_id,"-module-",m.call(null,"id"));

return cljs.core.Vector.fromArray(["﷐'tr",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":id__2616}),cljs.core.Vector.fromArray(["﷐'td",m.call(null,"name")]),cljs.core.Vector.fromArray(["﷐'td",cljs.core.get_in.call(null,cljs.core.deref.call(null,evil.shiptype.modules),cljs.core.Vector.fromArray([m.call(null,"name"),"size"]))]),cljs.core.Vector.fromArray(["﷐'td",cljs.core.ObjMap.fromObject(["﷐'click"],{"﷐'click":(function (){
return evil.ajaj.del_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/shiptype/",ship_id,"/module/",m.call(null,"id")),(function (){
cljs.core.swap_BANG_.call(null,evil.shiptype.shiptype,cljs.core.update_in,cljs.core.Vector.fromArray(["modules"]),(function (ms){
return cljs.core.filter.call(null,(function (p1__2611_SHARP_){
return cljs.core.not_EQ_.call(null,m.call(null,"id"),p1__2611_SHARP_.call(null,"id"));
}),ms);
}));
evil.shiptype.shiptype_update_size_BANG_.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype));
evil.shiptype.warnings.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype));
return evil.dom.del.call(null,cljs.core.str.call(null,"#",id__2616));
}));
})}),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class"],{"﷐'class":"del"}),"del"])])]);
});
evil.shiptype.add_module_fn = (function add_module_fn(s){
return (function (){
var module_name__2618 = evil.dom.val.call(null,cljs.core.str.call(null,"#shiptype-",s.call(null,"id"),"-module-select"));
var module__2619 = cljs.core.get.call(null,cljs.core.deref.call(null,evil.shiptype.modules),module_name__2618);
var vec__2617__2620 = evil.shiptype.shiptype_size.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype));
var used__2621 = cljs.core.nth.call(null,vec__2617__2620,0,null);
var total__2622 = cljs.core.nth.call(null,vec__2617__2620,1,null);

if(cljs.core.truth_((function (){var and__3546__auto____2623 = cljs.core._EQ_.call(null,"hull",module__2619.call(null,"type"));

if(cljs.core.truth_(and__3546__auto____2623))
{return cljs.core.not.call(null,cljs.core.nil_QMARK_.call(null,evil.shiptype.shiptype_hull.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype))));
} else
{return and__3546__auto____2623;
}
})()))
{return alert.call(null,"A ship can only have one Hull.");
} else
{if(cljs.core.truth_((function (){var and__3546__auto____2624 = cljs.core.not_EQ_.call(null,"hull",module__2619.call(null,"type"));

if(cljs.core.truth_(and__3546__auto____2624))
{return ((used__2621 + module__2619.call(null,"size")) > total__2622);
} else
{return and__3546__auto____2624;
}
})()))
{return alert.call(null,"Not enough space left in the Ship.");
} else
{if(cljs.core.truth_("﷐'else"))
{return evil.ajaj.post_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/shiptype/",s.call(null,"id"),"/module"),cljs.core.ObjMap.fromObject(["ship_id","name","user_id"],{"ship_id":s.call(null,"id"),"name":module_name__2618,"user_id":evil.ajaj.uid}),(function (m){
var m__2625 = evil.shiptype.expand_module.call(null,m);

cljs.core.swap_BANG_.call(null,evil.shiptype.shiptype,cljs.core.update_in,cljs.core.Vector.fromArray(["modules"]),cljs.core.conj,m__2625);
evil.shiptype.shiptype_update_size_BANG_.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype));
evil.shiptype.warnings.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype));
return evil.dom.append.call(null,cljs.core.str.call(null,"#shiptype-",s.call(null,"id"),"-module"),evil.dom.c.call(null,evil.shiptype.module_line.call(null,s.call(null,"id"),m__2625)));
}));
} else
{return null;
}
}
}
});
});
evil.shiptype.module_section = (function module_section(s){
return cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.Vector.fromArray(["﷐'table",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"shiptype-",s.call(null,"id"),"-module")}),cljs.core.Vector.fromArray(["﷐'tr",cljs.core.Vector.fromArray(["﷐'td",cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.Vector.fromArray(["﷐'select",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"shiptype-",s.call(null,"id"),"-module-select")}),cljs.core.Vector.fromArray(["﷐'option"])]),cljs.core.map.call(null,(function (p__2626){
var vec__2627__2628 = p__2626;
var n__2629 = cljs.core.nth.call(null,vec__2627__2628,0,null);
var m__2630 = cljs.core.nth.call(null,vec__2627__2628,1,null);

return cljs.core.Vector.fromArray(["﷐'option",cljs.core.ObjMap.fromObject(["﷐'value"],{"﷐'value":n__2629}),cljs.core.str.call(null,m__2630.call(null,"type")," - ",n__2629," (",m__2630.call(null,"size"),")")]);
}),cljs.core.deref.call(null,evil.shiptype.modules))))]),cljs.core.Vector.fromArray(["﷐'td",cljs.core.ObjMap.fromObject(["﷐'click"],{"﷐'click":evil.shiptype.add_module_fn.call(null,s)}),"add"])])]),cljs.core.vec.call(null,cljs.core.map.call(null,(function (m){
return evil.shiptype.module_line.call(null,s.call(null,"id"),m);
}),s.call(null,"modules")))));
});
evil.shiptype.save_fn = (function save_fn(entity){
return (function (){
var script_id__2632 = evil.dom.val.call(null,cljs.core.str.call(null,"#shiptype-",entity.call(null,"id"),"-script-select"));
var script_id__2633 = (cljs.core.truth_(cljs.core.empty_QMARK_.call(null,script_id__2632))?null:parseInt.call(null,script_id__2632));

return evil.ajaj.put_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/shiptype/",entity.call(null,"id")),cljs.core.ObjMap.fromObject(["id","name","script_id","user_id"],{"id":entity.call(null,"id"),"name":evil.dom.val.call(null,cljs.core.str.call(null,"#shiptype-",entity.call(null,"id"),"-name")),"script_id":script_id__2633,"user_id":evil.ajaj.uid}),(function (s){
evil.shiptype.warnings.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype));
return evil.dom.text.call(null,cljs.core.str.call(null,"span[name=shiptype-",s.call(null,"id"),"-name]"),s.call(null,"name"));
}));
});
});
evil.shiptype.show_shiptype_fn = (function show_shiptype_fn(entity){
return (function (){
return evil.shiptype.do_get.call(null,entity.call(null,"id"),(function (s){
var s__2635 = evil.shiptype.set_shiptype_BANG_.call(null,s);
var center__2636 = evil.dom.select.call(null,"#center");
var vec__2634__2637 = evil.shiptype.shiptype_size.call(null,s__2635);
var used__2638 = cljs.core.nth.call(null,vec__2634__2637,0,null);
var total__2639 = cljs.core.nth.call(null,vec__2634__2637,1,null);

evil.dom.clear.call(null,center__2636);
evil.dom.append.call(null,center__2636,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class"],{"﷐'class":"label"}),"Name:"]),cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'id","﷐'value"],{"﷐'type":"text","﷐'id":cljs.core.str.call(null,"shiptype-",s__2635.call(null,"id"),"-name"),"﷐'value":s__2635.call(null,"name")})]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class"],{"﷐'class":"label"}),"Script:"]),cljs.core.Vector.fromArray(["﷐'select",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"shiptype-",s__2635.call(null,"id"),"-script-select")}),cljs.core.Vector.fromArray(["﷐'option"])]),cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'value","﷐'click"],{"﷐'type":"submit","﷐'value":"Save","﷐'click":evil.shiptype.save_fn.call(null,entity)})]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class"],{"﷐'class":"label"}),"Size:"]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"shiptype-",s__2635.call(null,"id"),"-size")}),used__2638,"/",total__2639]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'span","Modules"]),cljs.core.Vector.fromArray(["﷐'br"]),evil.shiptype.module_section.call(null,s__2635)])));
evil.dom.append.call(null,center__2636,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"shiptype-warnings"})])));
return evil.script.do_list.call(null,(function (scripts){
var select__2640 = evil.dom.select.call(null,cljs.core.str.call(null,"#shiptype-",s__2635.call(null,"id"),"-script-select"));

cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__2631_SHARP_){
return evil.dom.append.call(null,select__2640,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'option",cljs.core.merge.call(null,cljs.core.ObjMap.fromObject(["﷐'value"],{"﷐'value":p1__2631_SHARP_.call(null,"id")}),(cljs.core.truth_(cljs.core._EQ_.call(null,p1__2631_SHARP_.call(null,"id"),s__2635.call(null,"script_id")))?cljs.core.ObjMap.fromObject(["﷐'selected"],{"﷐'selected":"selected"}):cljs.core.ObjMap.fromObject([],{}))),p1__2631_SHARP_.call(null,"name")])));
}),scripts));
return evil.shiptype.warnings.call(null,cljs.core.deref.call(null,evil.shiptype.shiptype));
}));
}));
});
});
evil.shiptype.del_shiptype_fn = (function del_shiptype_fn(entity){
return (function (){
return evil.ajaj.del_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/shiptype/",entity.call(null,"id")),(function (){
return evil.dom.del.call(null,cljs.core.str.call(null,"#shiptype-",entity.call(null,"id")));
}));
});
});
evil.shiptype.add_shiptype = (function() {
var add_shiptype = null;
var add_shiptype__2644 = (function (entity){
return add_shiptype.call(null,evil.dom.select.call(null,cljs.core.str.call(null,"div#shiptype")),entity);
});
var add_shiptype__2645 = (function (div,entity){
var c__2642 = evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"shiptype-",entity.call(null,"id"))}),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'click","﷐'name"],{"﷐'click":evil.shiptype.show_shiptype_fn.call(null,entity),"﷐'name":cljs.core.str.call(null,"shiptype-",entity.call(null,"id"),"-name")}),(function (){var or__3548__auto____2641 = entity.call(null,"name");

if(cljs.core.truth_(or__3548__auto____2641))
{return or__3548__auto____2641;
} else
{return "-";
}
})()])," ",cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class","﷐'click"],{"﷐'class":"del","﷐'click":evil.shiptype.del_shiptype_fn.call(null,entity)}),"del"]),cljs.core.Vector.fromArray(["﷐'br"])]));
var del__2643 = evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'span"]));

return evil.dom.append.call(null,div,c__2642);
});
add_shiptype = function(div,entity){
switch(arguments.length){
case  1 :
return add_shiptype__2644.call(this,div);
case  2 :
return add_shiptype__2645.call(this,div,entity);
}
throw('Invalid arity: ' + arguments.length);
};
return add_shiptype;
})()
;
evil.shiptype.update_shiptypes = (function update_shiptypes(){
var div__2647 = evil.dom.select.call(null,cljs.core.str.call(null,"div#shiptype"));

evil.dom.clear.call(null,div__2647);
evil.dom.append.call(null,div__2647,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'span",cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"shiptype-new-input"})]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class","﷐'click"],{"﷐'class":"add","﷐'click":(function (){
return evil.ajaj.post_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/shiptype"),cljs.core.ObjMap.fromObject(["user_id","script_id","name"],{"user_id":evil.ajaj.uid,"script_id":null,"name":evil.dom.val.call(null,"#shiptype-new-input")}),evil.shiptype.add_shiptype);
})}),"add"]),cljs.core.Vector.fromArray(["﷐'Br"])])));
return evil.shiptype.do_list.call(null,(function (res){
return cljs.core.dorun.call(null,cljs.core.map.call(null,cljs.core.partial.call(null,evil.shiptype.add_shiptype,div__2647),res));
}));
});
evil.shiptype.fetch_modules = (function fetch_modules(){
return evil.ajaj.get_clj.call(null,"/api/v1/moduletype",(function (module_types){
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (module_type){
return evil.ajaj.get_clj.call(null,cljs.core.str.call(null,"/api/v1/moduletype/",module_type),(function (r){
return cljs.core.swap_BANG_.call(null,evil.shiptype.modules,(function (m){
return cljs.core.reduce.call(null,(function (m,o){
return cljs.core.assoc.call(null,m,o.call(null,"name"),o);
}),m,r);
}));
}));
}),module_types));
}));
});
