goog.provide('evil.script');
goog.require('cljs.core');
goog.require('evil.dom');
goog.require('evil.ajaj');
evil.script.do_list = (function do_list(fun){
return evil.ajaj.do_ajaj.call(null,"/script",(function (res){
return fun.call(null,res);
}));
});
evil.script.do_get = (function do_get(id,fun){
return evil.ajaj.do_ajaj.call(null,cljs.core.str.call(null,"/script/",id),(function (res){
return fun.call(null,res);
}));
});
evil.script.save_fn = (function save_fn(entity){
return (function (){
return evil.ajaj.put_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/script/",entity.call(null,"id")),cljs.core.ObjMap.fromObject(["id","name","code","user_id"],{"id":entity.call(null,"id"),"name":evil.dom.val.call(null,cljs.core.str.call(null,"#script-",entity.call(null,"id"),"-name")),"code":evil.dom.val.call(null,cljs.core.str.call(null,"#script-",entity.call(null,"id"),"-code")),"user_id":evil.ajaj.uid}),(function (s){
evil.dom.text.call(null,"#script-save-state","OK");
return evil.dom.text.call(null,cljs.core.str.call(null,"span[name=script-",s.call(null,"id"),"-name]"),s.call(null,"name"));
}));
});
});
evil.script.show_script_fn = (function show_script_fn(entity){
return (function (){
return evil.script.do_get.call(null,entity.call(null,"id"),(function (s){
var center__4272 = evil.dom.select.call(null,"#center");

evil.dom.clear.call(null,center__4272);
return evil.dom.append.call(null,center__4272,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.Vector.fromArray(["﷐'span","Name:"]),cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'id","﷐'value"],{"﷐'type":"text","﷐'id":cljs.core.str.call(null,"script-",s.call(null,"id"),"-name"),"﷐'value":s.call(null,"name")})]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'span","Code: "]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'textarea",cljs.core.ObjMap.fromObject(["﷐'class","﷐'keypress","﷐'id"],{"﷐'class":"code","﷐'keypress":(function (){
return evil.dom.text.call(null,"#script-save-state","!!!");
}),"﷐'id":cljs.core.str.call(null,"script-",s.call(null,"id"),"-code")}),s.call(null,"code")]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'type","﷐'value","﷐'click"],{"﷐'type":"submit","﷐'value":"Save","﷐'click":evil.script.save_fn.call(null,entity)})])," - ",cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"script-save-state"}),"OK"]),cljs.core.Vector.fromArray(["﷐'br"]),cljs.core.Vector.fromArray(["﷐'a",cljs.core.ObjMap.fromObject(["﷐'class","﷐'target","﷐'href"],{"﷐'class":"help","﷐'target":"_blank","﷐'href":"https://github.com/Licenser/dividedspace/wiki/Scripting"}),"Scripting Help"])])));
}));
});
});
evil.script.del_script_fn = (function del_script_fn(entity){
return (function (){
return evil.ajaj.del_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/script/",entity.call(null,"id")),(function (){
return evil.dom.del.call(null,cljs.core.str.call(null,"#script-",entity.call(null,"id")));
}));
});
});
evil.script.add_script = (function() {
var add_script = null;
var add_script__4274 = (function (entity){
return add_script.call(null,evil.dom.select.call(null,"div#script"),entity);
});
var add_script__4275 = (function (div,entity){
return evil.dom.append.call(null,div,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'div",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":cljs.core.str.call(null,"script-",entity.call(null,"id"))}),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'click","﷐'name"],{"﷐'click":evil.script.show_script_fn.call(null,entity),"﷐'name":cljs.core.str.call(null,"script-",entity.call(null,"id"),"-name")}),(function (){var or__3548__auto____4273 = entity.call(null,"name");

if(cljs.core.truth_(or__3548__auto____4273))
{return or__3548__auto____4273;
} else
{return "-";
}
})()]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class","﷐'click"],{"﷐'class":"del","﷐'click":evil.script.del_script_fn.call(null,entity)}),"del"])])));
});
add_script = function(div,entity){
switch(arguments.length){
case  1 :
return add_script__4274.call(this,div);
case  2 :
return add_script__4275.call(this,div,entity);
}
throw('Invalid arity: ' + arguments.length);
};
return add_script;
})()
;
evil.script.update_scripts = (function update_scripts(){
var div__4277 = evil.dom.select.call(null,"div#script");

evil.dom.clear.call(null,div__4277);
evil.dom.append.call(null,div__4277,evil.dom.c.call(null,cljs.core.Vector.fromArray(["﷐'span",cljs.core.Vector.fromArray(["﷐'input",cljs.core.ObjMap.fromObject(["﷐'id"],{"﷐'id":"script-new-input"})]),cljs.core.Vector.fromArray(["﷐'span",cljs.core.ObjMap.fromObject(["﷐'class","﷐'click"],{"﷐'class":"add","﷐'click":(function (){
return evil.ajaj.post_clj.call(null,cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,"/script"),cljs.core.ObjMap.fromObject(["user_id","name","code"],{"user_id":evil.ajaj.uid,"name":evil.dom.val.call(null,evil.dom.select.call(null,"#script-new-input")),"code":""}),evil.script.add_script);
})}),"add"]),cljs.core.Vector.fromArray(["﷐'br"])])));
return evil.script.do_list.call(null,(function (res){
return cljs.core.dorun.call(null,cljs.core.map.call(null,cljs.core.partial.call(null,evil.script.add_script,div__4277),res));
}));
});
