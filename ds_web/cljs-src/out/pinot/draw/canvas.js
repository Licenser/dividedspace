goog.provide('pinot.draw.canvas');
goog.require('cljs.core');
goog.require('pinot.html');
goog.require('pinot.dom');
goog.require('pinot.draw.core');
goog.require('pinot.util.js');
pinot.draw.canvas.get_context = (function get_context(canvas,type){
return canvas.getContext(cljs.core.name.call(null,type));
});
pinot.draw.canvas.begin_path = (function begin_path(ctx){
ctx.beginPath();
return ctx;
});
pinot.draw.canvas.close_path = (function close_path(ctx){
ctx.closePath();
return ctx;
});
pinot.draw.canvas.fill = (function fill(ctx){
ctx.fill();
return ctx;
});
pinot.draw.canvas.stroke = (function stroke(ctx){
ctx.stroke();
return ctx;
});
pinot.draw.canvas.clear_rect = (function clear_rect(ctx,p__2581){
var map__2582__2583 = p__2581;
var map__2582__2584 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2582__2583))?cljs.core.apply.call(null,cljs.core.hash_map,map__2582__2583):map__2582__2583);
var h__2585 = cljs.core.get.call(null,map__2582__2584,"﷐'h");
var w__2586 = cljs.core.get.call(null,map__2582__2584,"﷐'w");
var y__2587 = cljs.core.get.call(null,map__2582__2584,"﷐'y");
var x__2588 = cljs.core.get.call(null,map__2582__2584,"﷐'x");

ctx.clearRect(x__2588,y__2587,w__2586,h__2585);
return ctx;
});
pinot.draw.canvas.rect = (function rect(ctx,p__2589){
var map__2590__2591 = p__2589;
var map__2590__2592 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2590__2591))?cljs.core.apply.call(null,cljs.core.hash_map,map__2590__2591):map__2590__2591);
var h__2593 = cljs.core.get.call(null,map__2590__2592,"﷐'h");
var w__2594 = cljs.core.get.call(null,map__2590__2592,"﷐'w");
var y__2595 = cljs.core.get.call(null,map__2590__2592,"﷐'y");
var x__2596 = cljs.core.get.call(null,map__2590__2592,"﷐'x");

pinot.draw.canvas.begin_path.call(null,ctx);
ctx.rect(x__2596,y__2595,w__2594,h__2593);
pinot.draw.canvas.close_path.call(null,ctx);
pinot.draw.canvas.fill.call(null,ctx);
return ctx;
});
pinot.draw.canvas.circle = (function circle(ctx,p__2597){
var map__2598__2599 = p__2597;
var map__2598__2600 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2598__2599))?cljs.core.apply.call(null,cljs.core.hash_map,map__2598__2599):map__2598__2599);
var r__2601 = cljs.core.get.call(null,map__2598__2600,"﷐'r");
var y__2602 = cljs.core.get.call(null,map__2598__2600,"﷐'y");
var x__2603 = cljs.core.get.call(null,map__2598__2600,"﷐'x");

pinot.draw.canvas.begin_path.call(null,ctx);
ctx.arc(x__2603,y__2602,r__2601,0,(Math.PI * 2),true);
pinot.draw.canvas.close_path.call(null,ctx);
pinot.draw.canvas.fill.call(null,ctx);
return ctx;
});
pinot.draw.canvas.text = (function text(ctx,p__2604){
var map__2605__2606 = p__2604;
var map__2605__2607 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2605__2606))?cljs.core.apply.call(null,cljs.core.hash_map,map__2605__2606):map__2605__2606);
var y__2608 = cljs.core.get.call(null,map__2605__2607,"﷐'y");
var x__2609 = cljs.core.get.call(null,map__2605__2607,"﷐'x");
var text__2610 = cljs.core.get.call(null,map__2605__2607,"﷐'text");

return ctx.fillText(text__2610,x__2609,y__2608);
});
pinot.draw.canvas.fill_style = (function fill_style(ctx,color){
ctx.fillStyle = color;
return ctx;
});
pinot.draw.canvas.stroke_style = (function stroke_style(ctx,color){
ctx.strokeStyle = color;
return ctx;
});
pinot.draw.canvas.stroke_width = (function stroke_width(ctx,w){
ctx.lineWidth = w;
return ctx;
});
pinot.draw.canvas.move_to = (function move_to(ctx,x,y){
ctx.moveTo(x,y);
return ctx;
});
pinot.draw.canvas.line_to = (function line_to(ctx,x,y){
ctx.lineTo(x,y);
return ctx;
});
pinot.draw.canvas.alpha = (function alpha(ctx,a){
ctx.globalAlpha = a;
return ctx;
});
pinot.draw.canvas.save = (function save(ctx){
ctx.save();
return ctx;
});
pinot.draw.canvas.restore = (function restore(ctx){
ctx.restore();
return ctx;
});
pinot.draw.canvas.entities = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));
pinot.draw.canvas.add_entity = (function add_entity(k,ent){
return cljs.core.swap_BANG_.call(null,pinot.draw.canvas.entities,cljs.core.assoc,k,ent);
});
pinot.draw.canvas.remove_entity = (function remove_entity(k){
return cljs.core.swap_BANG_.call(null,pinot.draw.canvas.entities,cljs.core.dissoc,k);
});
pinot.draw.canvas.get_entity = (function get_entity(k){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,pinot.draw.canvas.entities),cljs.core.Vector.fromArray([k,"﷐'value"]));
});
/**
* @param {...*} var_args
*/
pinot.draw.canvas.update_entity = (function() { 
var update_entity__delegate = function (k,func,extra){
return cljs.core.swap_BANG_.call(null,pinot.draw.canvas.entities,(function (ents){
return cljs.core.assoc.call(null,ents,k,cljs.core.apply.call(null,func,cljs.core.get.call(null,ents,k),extra));
}));
};
var update_entity = function (k,func,var_args){
var extra = null;
if (goog.isDef(var_args)) {
  extra = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return update_entity__delegate.call(this, k, func, extra);
};
update_entity.cljs$lang$maxFixedArity = 2;
update_entity.cljs$lang$applyTo = (function (arglist__2611){
var k = cljs.core.first(arglist__2611);
var func = cljs.core.first(cljs.core.next(arglist__2611));
var extra = cljs.core.rest(cljs.core.next(arglist__2611));
return update_entity__delegate.call(this, k, func, extra);
});
return update_entity;
})()
;
pinot.draw.canvas.entity = (function entity(v,update,draw){
return cljs.core.ObjMap.fromObject(["﷐'value","﷐'draw","﷐'update"],{"﷐'value":v,"﷐'draw":draw,"﷐'update":update});
});
pinot.draw.canvas.update_loop = (function update_loop(){
var G__2612__2613 = cljs.core.seq.call(null,cljs.core.deref.call(null,pinot.draw.canvas.entities));

if(cljs.core.truth_(G__2612__2613))
{var G__2616__2619 = cljs.core.first.call(null,G__2612__2613);
var vec__2617__2620 = G__2616__2619;
var k__2621 = cljs.core.nth.call(null,vec__2617__2620,0,null);
var map__2618__2622 = cljs.core.nth.call(null,vec__2617__2620,1,null);
var map__2618__2623 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2618__2622))?cljs.core.apply.call(null,cljs.core.hash_map,map__2618__2622):map__2618__2622);
var value__2624 = cljs.core.get.call(null,map__2618__2623,"﷐'value");
var update__2625 = cljs.core.get.call(null,map__2618__2623,"﷐'update");
var G__2612__2626 = G__2612__2613;

var G__2616__2627 = G__2616__2619;
var G__2612__2628 = G__2612__2626;

while(true){
var vec__2629__2631 = G__2616__2627;
var k__2632 = cljs.core.nth.call(null,vec__2629__2631,0,null);
var map__2630__2633 = cljs.core.nth.call(null,vec__2629__2631,1,null);
var map__2630__2634 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2630__2633))?cljs.core.apply.call(null,cljs.core.hash_map,map__2630__2633):map__2630__2633);
var value__2635 = cljs.core.get.call(null,map__2630__2634,"﷐'value");
var update__2636 = cljs.core.get.call(null,map__2630__2634,"﷐'update");
var G__2612__2637 = G__2612__2628;

if(cljs.core.truth_(update__2636))
{cljs.core.swap_BANG_.call(null,pinot.draw.canvas.entities,cljs.core.assoc_in,cljs.core.Vector.fromArray([k__2632,"﷐'value"]),update__2636.call(null,value__2635));
} else
{}
var temp__3698__auto____2638 = cljs.core.next.call(null,G__2612__2637);

if(cljs.core.truth_(temp__3698__auto____2638))
{var G__2612__2639 = temp__3698__auto____2638;

{
var G__2640 = cljs.core.first.call(null,G__2612__2639);
var G__2641 = G__2612__2639;
G__2616__2627 = G__2640;
G__2612__2628 = G__2641;
continue;
}
} else
{}
break;
}
} else
{}
return setTimeout.call(null,update_loop,10);
});
pinot.draw.canvas.draw_loop = (function draw_loop(ctx,width,height){
pinot.draw.canvas.clear_rect.call(null,ctx,cljs.core.ObjMap.fromObject(["﷐'x","﷐'y","﷐'w","﷐'h"],{"﷐'x":0,"﷐'y":0,"﷐'w":width,"﷐'h":height}));
var G__2642__2643 = cljs.core.seq.call(null,cljs.core.deref.call(null,pinot.draw.canvas.entities));

if(cljs.core.truth_(G__2642__2643))
{var G__2646__2649 = cljs.core.first.call(null,G__2642__2643);
var vec__2647__2650 = G__2646__2649;
var ___2651 = cljs.core.nth.call(null,vec__2647__2650,0,null);
var map__2648__2652 = cljs.core.nth.call(null,vec__2647__2650,1,null);
var map__2648__2653 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2648__2652))?cljs.core.apply.call(null,cljs.core.hash_map,map__2648__2652):map__2648__2652);
var value__2654 = cljs.core.get.call(null,map__2648__2653,"﷐'value");
var draw__2655 = cljs.core.get.call(null,map__2648__2653,"﷐'draw");
var G__2642__2656 = G__2642__2643;

var G__2646__2657 = G__2646__2649;
var G__2642__2658 = G__2642__2656;

while(true){
var vec__2659__2661 = G__2646__2657;
var ___2662 = cljs.core.nth.call(null,vec__2659__2661,0,null);
var map__2660__2663 = cljs.core.nth.call(null,vec__2659__2661,1,null);
var map__2660__2664 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__2660__2663))?cljs.core.apply.call(null,cljs.core.hash_map,map__2660__2663):map__2660__2663);
var value__2665 = cljs.core.get.call(null,map__2660__2664,"﷐'value");
var draw__2666 = cljs.core.get.call(null,map__2660__2664,"﷐'draw");
var G__2642__2667 = G__2642__2658;

if(cljs.core.truth_(draw__2666))
{draw__2666.call(null,ctx,value__2665);
} else
{}
var temp__3698__auto____2668 = cljs.core.next.call(null,G__2642__2667);

if(cljs.core.truth_(temp__3698__auto____2668))
{var G__2642__2669 = temp__3698__auto____2668;

{
var G__2670 = cljs.core.first.call(null,G__2642__2669);
var G__2671 = G__2642__2669;
G__2646__2657 = G__2670;
G__2642__2658 = G__2671;
continue;
}
} else
{}
break;
}
} else
{}
return pinot.draw.core.animation_frame.call(null,(function (){
return draw_loop.call(null,ctx,width,height);
}));
});
/**
* @param {...*} var_args
*/
pinot.draw.canvas.init = (function() { 
var init__delegate = function (canvas,p__2672){
var vec__2673__2674 = p__2672;
var context_type__2675 = cljs.core.nth.call(null,vec__2673__2674,0,null);

var ct__2677 = (function (){var or__3548__auto____2676 = context_type__2675;

if(cljs.core.truth_(or__3548__auto____2676))
{return or__3548__auto____2676;
} else
{return "2d";
}
})();
var width__2678 = pinot.dom.attr.call(null,canvas,"﷐'width");
var height__2679 = pinot.dom.attr.call(null,canvas,"﷐'height");
var ctx__2680 = pinot.draw.canvas.get_context.call(null,canvas,ct__2677);

pinot.draw.canvas.update_loop.call(null);
return pinot.draw.canvas.draw_loop.call(null,ctx__2680,width__2678,height__2679);
};
var init = function (canvas,var_args){
var p__2672 = null;
if (goog.isDef(var_args)) {
  p__2672 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return init__delegate.call(this, canvas, p__2672);
};
init.cljs$lang$maxFixedArity = 1;
init.cljs$lang$applyTo = (function (arglist__2681){
var canvas = cljs.core.first(arglist__2681);
var p__2672 = cljs.core.rest(arglist__2681);
return init__delegate.call(this, canvas, p__2672);
});
return init;
})()
;
