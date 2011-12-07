goog.provide('pinot.draw.geometry');
goog.require('cljs.core');
pinot.draw.geometry.distance = (function distance(origin,target){
var dx__2687 = ("﷐'x".call(null,target) - "﷐'x".call(null,origin));
var dy__2688 = ("﷐'y".call(null,target) - "﷐'y".call(null,origin));
var dir_x__2689 = (cljs.core.truth_(cljs.core._EQ_.call(null,0,dx__2687))?dx__2687:(dx__2687 / Math.abs.call(null,dx__2687)));
var dir_y__2690 = (cljs.core.truth_(cljs.core._EQ_.call(null,0,dy__2688))?dy__2688:(dy__2688 / Math.abs.call(null,dy__2688)));
var dist__2691 = Math.sqrt.call(null,(Math.pow.call(null,dx__2687,2) + Math.pow.call(null,dy__2688,2)));

return cljs.core.ObjMap.fromObject(["﷐'delta","﷐'dir","﷐'dist"],{"﷐'delta":cljs.core.ObjMap.fromObject(["﷐'x","﷐'y"],{"﷐'x":dx__2687,"﷐'y":dy__2688}),"﷐'dir":cljs.core.ObjMap.fromObject(["﷐'x","﷐'y"],{"﷐'x":dir_x__2689,"﷐'y":dir_y__2690}),"﷐'dist":dist__2691});
});
pinot.draw.geometry.bottom_right = (function bottom_right(p__2692){
var map__2693__2694 = p__2692;
var map__2693__2695 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2693__2694))?cljs.core.apply.call(null,cljs.core.hash_map,map__2693__2694):map__2693__2694);
var r__2696 = cljs.core.get.call(null,map__2693__2695,"﷐'r");
var h__2697 = cljs.core.get.call(null,map__2693__2695,"﷐'h");
var w__2698 = cljs.core.get.call(null,map__2693__2695,"﷐'w");
var y__2699 = cljs.core.get.call(null,map__2693__2695,"﷐'y");
var x__2700 = cljs.core.get.call(null,map__2693__2695,"﷐'x");

if(cljs.core.truth_(r__2696))
{return cljs.core.ObjMap.fromObject(["﷐'x","﷐'y"],{"﷐'x":(x__2700 + (w__2698 / 2)),"﷐'y":(y__2699 + (h__2697 / 2))});
} else
{return cljs.core.ObjMap.fromObject(["﷐'x","﷐'y"],{"﷐'x":(x__2700 + w__2698),"﷐'y":(y__2699 + h__2697)});
}
});
pinot.draw.geometry.top_left = (function top_left(p__2701){
var map__2702__2703 = p__2701;
var map__2702__2704 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2702__2703))?cljs.core.apply.call(null,cljs.core.hash_map,map__2702__2703):map__2702__2703);
var r__2705 = cljs.core.get.call(null,map__2702__2704,"﷐'r");
var h__2706 = cljs.core.get.call(null,map__2702__2704,"﷐'h");
var w__2707 = cljs.core.get.call(null,map__2702__2704,"﷐'w");
var y__2708 = cljs.core.get.call(null,map__2702__2704,"﷐'y");
var x__2709 = cljs.core.get.call(null,map__2702__2704,"﷐'x");

if(cljs.core.truth_(r__2705))
{return cljs.core.ObjMap.fromObject(["﷐'x","﷐'y"],{"﷐'x":(x__2709 - (w__2707 / 2)),"﷐'y":(y__2708 - (h__2706 / 2))});
} else
{return cljs.core.ObjMap.fromObject(["﷐'x","﷐'y"],{"﷐'x":x__2709,"﷐'y":y__2708});
}
});
pinot.draw.geometry.in_radius_QMARK_ = (function in_radius_QMARK_(origin,obj,radius){
var map__2710__2711 = pinot.draw.geometry.distance.call(null,origin,obj);
var map__2710__2712 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2710__2711))?cljs.core.apply.call(null,cljs.core.hash_map,map__2710__2711):map__2710__2711);
var dist__2713 = cljs.core.get.call(null,map__2710__2712,"﷐'dist");

return (dist__2713 < radius);
});
pinot.draw.geometry.collision_QMARK_ = (function collision_QMARK_(obj,obj2){
var br__2714 = pinot.draw.geometry.bottom_right.call(null,obj);
var tl__2715 = pinot.draw.geometry.top_left.call(null,obj);
var br2__2716 = pinot.draw.geometry.bottom_right.call(null,obj2);
var tl2__2717 = pinot.draw.geometry.top_left.call(null,obj2);

var and__3546__auto____2719 = (function (){var and__3546__auto____2718 = ("﷐'y".call(null,tl__2715) < "﷐'y".call(null,br2__2716));

if(cljs.core.truth_(and__3546__auto____2718))
{return ("﷐'y".call(null,tl2__2717) < "﷐'y".call(null,br__2714));
} else
{return and__3546__auto____2718;
}
})();

if(cljs.core.truth_(and__3546__auto____2719))
{var and__3546__auto____2720 = ("﷐'x".call(null,tl__2715) < "﷐'x".call(null,br2__2716));

if(cljs.core.truth_(and__3546__auto____2720))
{return ("﷐'x".call(null,tl2__2717) < "﷐'x".call(null,br__2714));
} else
{return and__3546__auto____2720;
}
} else
{return and__3546__auto____2719;
}
});
pinot.draw.geometry.contained_QMARK_ = (function contained_QMARK_(container,obj){
var cbr__2721 = pinot.draw.geometry.bottom_right.call(null,container);
var ctl__2722 = pinot.draw.geometry.top_left.call(null,container);
var br__2723 = pinot.draw.geometry.bottom_right.call(null,obj);
var tl__2724 = pinot.draw.geometry.top_left.call(null,obj);

var and__3546__auto____2726 = (function (){var and__3546__auto____2725 = ("﷐'x".call(null,ctl__2722) < "﷐'x".call(null,tl__2724));

if(cljs.core.truth_(and__3546__auto____2725))
{return ("﷐'y".call(null,ctl__2722) < "﷐'y".call(null,tl__2724));
} else
{return and__3546__auto____2725;
}
})();

if(cljs.core.truth_(and__3546__auto____2726))
{var and__3546__auto____2727 = ("﷐'x".call(null,cbr__2721) > "﷐'x".call(null,br__2723));

if(cljs.core.truth_(and__3546__auto____2727))
{return ("﷐'y".call(null,cbr__2721) > "﷐'y".call(null,br__2723));
} else
{return and__3546__auto____2727;
}
} else
{return and__3546__auto____2726;
}
});
pinot.draw.geometry.in_bounds_QMARK_ = (function in_bounds_QMARK_(obj,x2,y2){
var br__2728 = pinot.draw.geometry.bottom_right.call(null,obj);
var tl__2729 = pinot.draw.geometry.top_left.call(null,obj);

var and__3546__auto____2731 = (function (){var and__3546__auto____2730 = ("﷐'x".call(null,tl__2729) < x2);

if(cljs.core.truth_(and__3546__auto____2730))
{return (x2 < "﷐'x".call(null,br__2728));
} else
{return and__3546__auto____2730;
}
})();

if(cljs.core.truth_(and__3546__auto____2731))
{var and__3546__auto____2732 = ("﷐'y".call(null,tl__2729) < y2);

if(cljs.core.truth_(and__3546__auto____2732))
{return (y2 < "﷐'y".call(null,br__2728));
} else
{return and__3546__auto____2732;
}
} else
{return and__3546__auto____2731;
}
});
