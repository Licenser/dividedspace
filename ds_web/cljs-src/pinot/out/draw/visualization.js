goog.provide('pinot.draw.visualization');
goog.require('cljs.core');
goog.require('pinot.html');
goog.require('pinot.dom');
goog.require('pinot.draw.core');
goog.require('pinot.util.js');
pinot.draw.visualization.visual = (function visual(data){
return cljs.core.ObjMap.fromObject(["﷐'data","﷐'attr"],{"﷐'data":data,"﷐'attr":cljs.core.ObjMap.fromObject([],{})});
});
pinot.draw.visualization.attr = (function attr(vis,k,v){
return cljs.core.assoc_in.call(null,vis,cljs.core.Vector.fromArray(["﷐'attr",k]),v);
});
pinot.draw.visualization.elem = (function elem(vis,el){
return cljs.core.assoc.call(null,vis,"﷐'elem",el);
});
pinot.draw.visualization.apply_attr = (function apply_attr(elem,attr,d,idx){
var G__2733__2734 = cljs.core.seq.call(null,attr);

if(cljs.core.truth_(G__2733__2734))
{var G__2736__2738 = cljs.core.first.call(null,G__2733__2734);
var vec__2737__2739 = G__2736__2738;
var k__2740 = cljs.core.nth.call(null,vec__2737__2739,0,null);
var v__2741 = cljs.core.nth.call(null,vec__2737__2739,1,null);
var G__2733__2742 = G__2733__2734;

var G__2736__2743 = G__2736__2738;
var G__2733__2744 = G__2733__2742;

while(true){
var vec__2745__2746 = G__2736__2743;
var k__2747 = cljs.core.nth.call(null,vec__2745__2746,0,null);
var v__2748 = cljs.core.nth.call(null,vec__2745__2746,1,null);
var G__2733__2749 = G__2733__2744;

var v__2750 = (cljs.core.truth_(cljs.core.fn_QMARK_.call(null,v__2748))?v__2748.call(null,d,idx):v__2748);

pinot.dom.attr.call(null,elem,k__2747,v__2750);
var temp__3698__auto____2751 = cljs.core.next.call(null,G__2733__2749);

if(cljs.core.truth_(temp__3698__auto____2751))
{var G__2733__2752 = temp__3698__auto____2751;

{
var G__2753 = cljs.core.first.call(null,G__2733__2752);
var G__2754 = G__2733__2752;
G__2736__2743 = G__2753;
G__2733__2744 = G__2754;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
pinot.draw.visualization.create_elem = (function create_elem(elem,d,idx){
if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null,elem)))
{return elem.call(null,d,idx);
} else
{if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,elem)))
{return pinot.html.html.call(null,elem);
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,elem)))
{return pinot.html.html.call(null,cljs.core.Vector.fromArray([elem]));
} else
{if(cljs.core.truth_("﷐'else"))
{return elem;
} else
{return null;
}
}
}
}
});
pinot.draw.visualization.enter = (function enter(p__2755,method){
var map__2756__2757 = p__2755;
var map__2756__2758 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2756__2757))?cljs.core.apply.call(null,cljs.core.hash_map,map__2756__2757):map__2756__2757);
var elem__2759 = cljs.core.get.call(null,map__2756__2758,"﷐'elem");
var attr__2760 = cljs.core.get.call(null,map__2756__2758,"﷐'attr");
var data__2761 = cljs.core.get.call(null,map__2756__2758,"﷐'data");

var G__2762__2763 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,data__2761));

if(cljs.core.truth_(G__2762__2763))
{var G__2765__2767 = cljs.core.first.call(null,G__2762__2763);
var vec__2766__2768 = G__2765__2767;
var idx__2769 = cljs.core.nth.call(null,vec__2766__2768,0,null);
var d__2770 = cljs.core.nth.call(null,vec__2766__2768,1,null);
var G__2762__2771 = G__2762__2763;

var G__2765__2772 = G__2765__2767;
var G__2762__2773 = G__2762__2771;

while(true){
var vec__2774__2775 = G__2765__2772;
var idx__2776 = cljs.core.nth.call(null,vec__2774__2775,0,null);
var d__2777 = cljs.core.nth.call(null,vec__2774__2775,1,null);
var G__2762__2778 = G__2762__2773;

var cur__2779 = pinot.draw.visualization.create_elem.call(null,elem__2759,d__2777,idx__2776);

pinot.draw.visualization.apply_attr.call(null,cur__2779,attr__2760,d__2777,idx__2776);
method.call(null,cur__2779);
var temp__3698__auto____2780 = cljs.core.next.call(null,G__2762__2778);

if(cljs.core.truth_(temp__3698__auto____2780))
{var G__2762__2781 = temp__3698__auto____2780;

{
var G__2782 = cljs.core.first.call(null,G__2762__2781);
var G__2783 = G__2762__2781;
G__2765__2772 = G__2782;
G__2762__2773 = G__2783;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
pinot.draw.visualization.select = (function select(query){
return pinot.dom.query.call(null,query);
});
pinot.draw.visualization.data = (function data(vis,d){
return cljs.core.assoc.call(null,vis,"﷐'data",d);
});
pinot.draw.visualization.transition = (function transition(elems,dur){
return cljs.core.ObjMap.fromObject(["﷐'elems","﷐'dur"],{"﷐'elems":elems,"﷐'dur":dur});
});
pinot.draw.visualization.do_animation = (function do_animation(p__2784){
var anim__2785 = p__2784;
var anim__2786 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,anim__2785))?cljs.core.apply.call(null,cljs.core.hash_map,anim__2785):anim__2785);
var tween__2787 = cljs.core.get.call(null,anim__2786,"﷐'tween");
var dur__2788 = cljs.core.get.call(null,anim__2786,"﷐'dur");
var start_time__2789 = cljs.core.get.call(null,anim__2786,"﷐'start-time");

var now__2790 = Date.now();
var elapsed__2791 = ((((now__2790 - start_time__2789) / dur__2788) < 1) ? ((now__2790 - start_time__2789) / dur__2788) : 1);

tween__2787.call(null,elapsed__2791);
if(cljs.core.truth_(cljs.core._EQ_.call(null,elapsed__2791,1)))
{return null;
} else
{return pinot.draw.core.animation_frame.call(null,cljs.core.partial.call(null,do_animation,anim__2786));
}
});
pinot.draw.visualization.end_states = (function end_states(elems,attr,data){
var iter__383__auto____2810 = (function iter__2792(s__2793){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2793__2794 = s__2793;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__2793__2794)))
{var vec__2795__2796 = cljs.core.first.call(null,s__2793__2794);
var el__2797 = cljs.core.nth.call(null,vec__2795__2796,0,null);
var d__2798 = cljs.core.nth.call(null,vec__2795__2796,1,null);

return cljs.core.cons.call(null,(function (){var iter__383__auto____2809 = (function iter__2799(s__2800){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2800__2801 = s__2800;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__2800__2801)))
{var vec__2802__2803 = cljs.core.first.call(null,s__2800__2801);
var k__2804 = cljs.core.nth.call(null,vec__2802__2803,0,null);
var v__2805 = cljs.core.nth.call(null,vec__2802__2803,1,null);

return cljs.core.cons.call(null,(function (){var v__2806 = (cljs.core.truth_(cljs.core.fn_QMARK_.call(null,v__2805))?v__2805.call(null,d__2798):v__2805);
var init__2807 = pinot.util.js.as_int.call(null,pinot.dom.attr.call(null,el__2797,k__2804));
var delta__2808 = (v__2806 - init__2807);

return cljs.core.Vector.fromArray([k__2804,init__2807,delta__2808]);
})(),iter__2799.call(null,cljs.core.rest.call(null,s__2800__2801)));
} else
{return null;
}
break;
}
})));
});

return iter__383__auto____2809.call(null,attr);
})(),iter__2792.call(null,cljs.core.rest.call(null,s__2793__2794)));
} else
{return null;
}
break;
}
})));
});

return iter__383__auto____2810.call(null,cljs.core.map.call(null,cljs.core.list,elems,data));
});
pinot.draw.visualization.tween = (function tween(p__2811){
var map__2812__2813 = p__2811;
var map__2812__2814 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2812__2813))?cljs.core.apply.call(null,cljs.core.hash_map,map__2812__2813):map__2812__2813);
var data__2815 = cljs.core.get.call(null,map__2812__2814,"﷐'data");
var attr__2816 = cljs.core.get.call(null,map__2812__2814,"﷐'attr");
var elems__2817 = cljs.core.get.call(null,map__2812__2814,"﷐'elems");

var final$__2818 = pinot.draw.visualization.end_states.call(null,elems__2817,attr__2816,data__2815);
var tweens__2819 = cljs.core.map.call(null,cljs.core.list,elems__2817,final$__2818);

return (function (elapsed_perc){
var G__2820__2822 = cljs.core.seq.call(null,tweens__2819);

if(cljs.core.truth_(G__2820__2822))
{var G__2824__2826 = cljs.core.first.call(null,G__2820__2822);
var vec__2825__2827 = G__2824__2826;
var el__2828 = cljs.core.nth.call(null,vec__2825__2827,0,null);
var attrs__2829 = cljs.core.nth.call(null,vec__2825__2827,1,null);
var G__2820__2830 = G__2820__2822;

var G__2824__2831 = G__2824__2826;
var G__2820__2832 = G__2820__2830;

while(true){
var vec__2833__2834 = G__2824__2831;
var el__2835 = cljs.core.nth.call(null,vec__2833__2834,0,null);
var attrs__2836 = cljs.core.nth.call(null,vec__2833__2834,1,null);
var G__2820__2837 = G__2820__2832;

var G__2821__2838 = cljs.core.seq.call(null,attrs__2836);

if(cljs.core.truth_(G__2821__2838))
{var G__2840__2842 = cljs.core.first.call(null,G__2821__2838);
var vec__2841__2843 = G__2840__2842;
var k__2844 = cljs.core.nth.call(null,vec__2841__2843,0,null);
var init__2845 = cljs.core.nth.call(null,vec__2841__2843,1,null);
var delta__2846 = cljs.core.nth.call(null,vec__2841__2843,2,null);
var G__2821__2847 = G__2821__2838;

var G__2840__2848 = G__2840__2842;
var G__2821__2849 = G__2821__2847;

while(true){
var vec__2850__2851 = G__2840__2848;
var k__2852 = cljs.core.nth.call(null,vec__2850__2851,0,null);
var init__2853 = cljs.core.nth.call(null,vec__2850__2851,1,null);
var delta__2854 = cljs.core.nth.call(null,vec__2850__2851,2,null);
var G__2821__2855 = G__2821__2849;

var elapsed_delta__2856 = (elapsed_perc * delta__2854);
var change__2857 = (init__2853 + elapsed_delta__2856);

pinot.dom.attr.call(null,el__2835,k__2852,change__2857);
var temp__3698__auto____2858 = cljs.core.next.call(null,G__2821__2855);

if(cljs.core.truth_(temp__3698__auto____2858))
{var G__2821__2859 = temp__3698__auto____2858;

{
var G__2862 = cljs.core.first.call(null,G__2821__2859);
var G__2863 = G__2821__2859;
G__2840__2848 = G__2862;
G__2821__2849 = G__2863;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____2860 = cljs.core.next.call(null,G__2820__2837);

if(cljs.core.truth_(temp__3698__auto____2860))
{var G__2820__2861 = temp__3698__auto____2860;

{
var G__2864 = cljs.core.first.call(null,G__2820__2861);
var G__2865 = G__2820__2861;
G__2824__2831 = G__2864;
G__2820__2832 = G__2865;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
});
pinot.draw.visualization.start = (function start(p__2866){
var transition__2867 = p__2866;
var transition__2868 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,transition__2867))?cljs.core.apply.call(null,cljs.core.hash_map,transition__2867):transition__2867);
var dur__2869 = cljs.core.get.call(null,transition__2868,"﷐'dur");

var now__2870 = Date.now();

return pinot.draw.visualization.do_animation.call(null,cljs.core.ObjMap.fromObject(["﷐'start-time","﷐'dur","﷐'tween"],{"﷐'start-time":now__2870,"﷐'dur":dur__2869,"﷐'tween":pinot.draw.visualization.tween.call(null,transition__2868)}));
});
