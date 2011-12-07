goog.provide('pinot.events');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('pinot.util.clj');
goog.require('pinot.util.js');
goog.require('pinot.dom');
goog.require('clojure.string');
pinot.events.body = cljs.core.atom.call(null,null);
pinot.events.get_body = (function get_body(){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core.deref.call(null,pinot.events.body))))
{return cljs.core.reset_BANG_.call(null,pinot.events.body,cljs.core.first.call(null,pinot.dom.query.call(null,"body")));
} else
{return cljs.core.deref.call(null,pinot.events.body);
}
});
pinot.events.__GT_target = (function __GT_target(elem){
if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null,elem)))
{return cljs.core.ObjMap.fromObject(["﷐'pinotGroup"],{"﷐'pinotGroup":pinot.dom.attr.call(null,cljs.core.first.call(null,elem.call(null)),"﷐'pinotGroup")});
} else
{if(cljs.core.truth_(pinot.dom.attr.call(null,elem,"﷐'pinotId")))
{return cljs.core.ObjMap.fromObject(["﷐'elem","﷐'pinotId"],{"﷐'elem":elem,"﷐'pinotId":pinot.dom.attr.call(null,elem,"﷐'pinotId")});
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.ObjMap.fromObject(["﷐'elem"],{"﷐'elem":elem});
} else
{return null;
}
}
}
});
pinot.events.match_QMARK_ = (function match_QMARK_(p__2871,init_target){
var map__2872__2873 = p__2871;
var map__2872__2874 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2872__2873))?cljs.core.apply.call(null,cljs.core.hash_map,map__2872__2873):map__2872__2873);
var pinotId__2875 = cljs.core.get.call(null,map__2872__2874,"﷐'pinotId");
var pinotGroup__2876 = cljs.core.get.call(null,map__2872__2874,"﷐'pinotGroup");
var elem__2877 = cljs.core.get.call(null,map__2872__2874,"﷐'elem");

var target__2878 = init_target;

while(true){
if(cljs.core.truth_(target__2878))
{var target_group__2879 = pinot.dom.attr.call(null,target__2878,"﷐'pinotGroup");
var target_pinot__2880 = pinot.dom.attr.call(null,target__2878,"﷐'pinotId");

if(cljs.core.truth_(cljs.core.not_EQ_.call(null,target__2878,pinot.dom.parent.call(null,pinot.events.get_body.call(null)))))
{if(cljs.core.truth_((function (){var or__3548__auto____2882 = (function (){var and__3546__auto____2881 = elem__2877;

if(cljs.core.truth_(and__3546__auto____2881))
{return cljs.core._EQ_.call(null,elem__2877,target__2878);
} else
{return and__3546__auto____2881;
}
})();

if(cljs.core.truth_(or__3548__auto____2882))
{return or__3548__auto____2882;
} else
{var or__3548__auto____2884 = (function (){var and__3546__auto____2883 = pinotGroup__2876;

if(cljs.core.truth_(and__3546__auto____2883))
{return cljs.core._EQ_.call(null,pinotGroup__2876,target_group__2879);
} else
{return and__3546__auto____2883;
}
})();

if(cljs.core.truth_(or__3548__auto____2884))
{return or__3548__auto____2884;
} else
{var and__3546__auto____2885 = pinotId__2875;

if(cljs.core.truth_(and__3546__auto____2885))
{return cljs.core._EQ_.call(null,pinotId__2875,target_pinot__2880);
} else
{return and__3546__auto____2885;
}
}
}
})()))
{return target__2878;
} else
{{
var G__2886 = pinot.dom.parent.call(null,target__2878);
target__2878 = G__2886;
continue;
}
}
} else
{return null;
}
} else
{return null;
}
break;
}
});
pinot.events.make_listener = (function make_listener(func,parsed){
return (function (e){
var target__2887 = e.target;

var temp__3695__auto____2888 = pinot.events.match_QMARK_.call(null,parsed,target__2887);

if(cljs.core.truth_(temp__3695__auto____2888))
{var match__2889 = temp__3695__auto____2888;

return func.call(null,match__2889,e);
} else
{return true;
}
});
});
pinot.events.on = (function on(elem,event,func){
var ev_name__2890 = clojure.string.upper_case.call(null,cljs.core.name.call(null,event));
var event__2891 = (goog.events.EventType[ev_name__2890]);
var body_elem__2892 = pinot.events.get_body.call(null);

var G__2893__2894 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2893__2894))
{var el__2895 = cljs.core.first.call(null,G__2893__2894);
var G__2893__2896 = G__2893__2894;

while(true){
var parsed__2897 = pinot.events.__GT_target.call(null,el__2895);

goog.events.listen.call(null,body_elem__2892,event__2891,pinot.events.make_listener.call(null,func,parsed__2897));
var temp__3698__auto____2898 = cljs.core.next.call(null,G__2893__2896);

if(cljs.core.truth_(temp__3698__auto____2898))
{var G__2893__2899 = temp__3698__auto____2898;

{
var G__2900 = cljs.core.first.call(null,G__2893__2899);
var G__2901 = G__2893__2899;
el__2895 = G__2900;
G__2893__2896 = G__2901;
continue;
}
} else
{}
break;
}
} else
{}
return elem;
});
pinot.events.prevent = (function prevent(e){
return e.preventDefault();
});
