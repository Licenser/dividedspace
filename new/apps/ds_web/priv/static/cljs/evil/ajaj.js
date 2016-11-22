goog.provide('evil.ajaj');
goog.require('cljs.core');
evil.ajaj.$ = $;
evil.ajaj.uid = uid;
evil.ajaj.stringify = JSON.stringify;
/**
* Recursively transforms ClojureScript maps into Javascript objects,
* other ClojureScript colls into JavaScript arrays, and ClojureScript
* keywords into JavaScript strings.
* 
* Borrowed and updated from mmcgrana.
*/
evil.ajaj.clj__GT_js = (function clj__GT_js(x){
if(cljs.core.truth_(cljs.core.string_QMARK_.call(null,x)))
{return x;
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,x)))
{return cljs.core.name.call(null,x);
} else
{if(cljs.core.truth_(cljs.core.map_QMARK_.call(null,x)))
{return cljs.core.reduce.call(null,(function (m,p__2524){
var vec__2525__2526 = p__2524;
var k__2527 = cljs.core.nth.call(null,vec__2525__2526,0,null);
var v__2528 = cljs.core.nth.call(null,vec__2525__2526,1,null);

return cljs.core.assoc.call(null,m,clj__GT_js.call(null,k__2527),clj__GT_js.call(null,v__2528));
}),cljs.core.ObjMap.fromObject([],{}),x).strobj;
} else
{if(cljs.core.truth_(cljs.core.coll_QMARK_.call(null,x)))
{return cljs.core.apply.call(null,cljs.core.array,cljs.core.map.call(null,clj__GT_js,x));
} else
{if(cljs.core.truth_("﷐'else"))
{return x;
} else
{return null;
}
}
}
}
}
});
evil.ajaj.ajaj_put = (function ajaj_put(url,data,success){
return evil.ajaj.$.ajax(cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,url),evil.ajaj.clj__GT_js.call(null,cljs.core.ObjMap.fromObject(["﷐'success","﷐'dataType","﷐'cache","﷐'data","﷐'type","﷐'processData","﷐'contentType","﷐'jsonp"],{"﷐'success":(function (r){
return success.call(null,cljs.core.js__GT_clj.call(null,r));
}),"﷐'dataType":"json","﷐'cache":false,"﷐'data":evil.ajaj.stringify.call(null,evil.ajaj.clj__GT_js.call(null,data)),"﷐'type":"PUT","﷐'processData":false,"﷐'contentType":"application/json","﷐'jsonp":"json"})));
});
evil.ajaj.do_ajaj = (function do_ajaj(url,success){
return evil.ajaj.$.ajax(cljs.core.str.call(null,"/api/v1/user/",evil.ajaj.uid,url),evil.ajaj.clj__GT_js.call(null,cljs.core.ObjMap.fromObject(["﷐'success","﷐'dataType","﷐'cache","﷐'contentType","﷐'jsonp"],{"﷐'success":(function (r){
return success.call(null,cljs.core.js__GT_clj.call(null,r));
}),"﷐'dataType":"json","﷐'cache":false,"﷐'contentType":"application/json","﷐'jsonp":"json"})));
});
evil.ajaj.post_clj = (function post_clj(url,data,success){
return evil.ajaj.$.ajax(url,evil.ajaj.clj__GT_js.call(null,cljs.core.ObjMap.fromObject(["﷐'success","﷐'dataType","﷐'cache","﷐'type","﷐'data","﷐'processData","﷐'contentType","﷐'jsonp"],{"﷐'success":(function (r){
return success.call(null,cljs.core.js__GT_clj.call(null,r));
}),"﷐'dataType":"json","﷐'cache":false,"﷐'type":"POST","﷐'data":evil.ajaj.stringify.call(null,evil.ajaj.clj__GT_js.call(null,data)),"﷐'processData":false,"﷐'contentType":"application/json","﷐'jsonp":"json"})));
});
evil.ajaj.put_clj = (function put_clj(url,data,success){
return evil.ajaj.$.ajax(url,evil.ajaj.clj__GT_js.call(null,cljs.core.ObjMap.fromObject(["﷐'success","﷐'dataType","﷐'cache","﷐'type","﷐'data","﷐'processData","﷐'contentType","﷐'jsonp"],{"﷐'success":(function (r){
return success.call(null,cljs.core.js__GT_clj.call(null,r));
}),"﷐'dataType":"json","﷐'cache":false,"﷐'type":"PUT","﷐'data":evil.ajaj.stringify.call(null,evil.ajaj.clj__GT_js.call(null,data)),"﷐'processData":false,"﷐'contentType":"application/json","﷐'jsonp":"json"})));
});
evil.ajaj.del_clj = (function del_clj(url,success){
return evil.ajaj.$.ajax(url,evil.ajaj.clj__GT_js.call(null,cljs.core.ObjMap.fromObject(["﷐'success","﷐'dataType","﷐'cache","﷐'type","﷐'contentType","﷐'jsonp"],{"﷐'success":(function (r){
return success.call(null,cljs.core.js__GT_clj.call(null,r));
}),"﷐'dataType":"json","﷐'cache":false,"﷐'type":"DELETE","﷐'contentType":"application/json","﷐'jsonp":"json"})));
});
evil.ajaj.get_clj = (function get_clj(url,success){
return evil.ajaj.$.ajax(url,evil.ajaj.clj__GT_js.call(null,cljs.core.ObjMap.fromObject(["﷐'success","﷐'dataType","﷐'cache","﷐'contentType","﷐'jsonp"],{"﷐'success":(function (r){
return success.call(null,cljs.core.js__GT_clj.call(null,r));
}),"﷐'dataType":"json","﷐'cache":false,"﷐'contentType":"application/json","﷐'jsonp":"json"})));
});
