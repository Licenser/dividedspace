goog.provide('pinot.dom');
goog.require('cljs.core');
goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.style');
goog.require('goog.dom.query');
goog.require('goog.dom.forms');
goog.require('pinot.util.clj');
goog.require('pinot.util.js');
pinot.dom.pinot_group = (function pinot_group(func){
if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null,func)))
{var elem__2377 = func.call(null);

return pinot.dom.attr.call(null,cljs.core.first.call(null,elem__2377),"﷐'pinotGroup");
} else
{return null;
}
});
/**
* @param {...*} var_args
*/
pinot.dom.css = (function() { 
var css__delegate = function (elem,k,p__2378){
var vec__2379__2380 = p__2378;
var v__2381 = cljs.core.nth.call(null,vec__2379__2380,0,null);

if(cljs.core.truth_(cljs.core.map_QMARK_.call(null,k)))
{var G__2382__2383 = cljs.core.seq.call(null,k);

if(cljs.core.truth_(G__2382__2383))
{var G__2385__2387 = cljs.core.first.call(null,G__2382__2383);
var vec__2386__2388 = G__2385__2387;
var prop__2389 = cljs.core.nth.call(null,vec__2386__2388,0,null);
var value__2390 = cljs.core.nth.call(null,vec__2386__2388,1,null);
var G__2382__2391 = G__2382__2383;

var G__2385__2392 = G__2385__2387;
var G__2382__2393 = G__2382__2391;

while(true){
var vec__2394__2395 = G__2385__2392;
var prop__2396 = cljs.core.nth.call(null,vec__2394__2395,0,null);
var value__2397 = cljs.core.nth.call(null,vec__2394__2395,1,null);
var G__2382__2398 = G__2382__2393;

css.call(null,elem,prop__2396,value__2397);
var temp__3698__auto____2399 = cljs.core.next.call(null,G__2382__2398);

if(cljs.core.truth_(temp__3698__auto____2399))
{var G__2382__2400 = temp__3698__auto____2399;

{
var G__2407 = cljs.core.first.call(null,G__2382__2400);
var G__2408 = G__2382__2400;
G__2385__2392 = G__2407;
G__2382__2393 = G__2408;
continue;
}
} else
{}
break;
}
} else
{}
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,v__2381)))
{goog.style.getStyle.call(null,elem,cljs.core.name.call(null,k));
} else
{if(cljs.core.truth_("﷐'else"))
{var G__2401__2402 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2401__2402))
{var el__2403 = cljs.core.first.call(null,G__2401__2402);
var G__2401__2404 = G__2401__2402;

while(true){
goog.style.setStyle.call(null,el__2403,cljs.core.name.call(null,k),cljs.core.name.call(null,v__2381));
var temp__3698__auto____2405 = cljs.core.next.call(null,G__2401__2404);

if(cljs.core.truth_(temp__3698__auto____2405))
{var G__2401__2406 = temp__3698__auto____2405;

{
var G__2409 = cljs.core.first.call(null,G__2401__2406);
var G__2410 = G__2401__2406;
el__2403 = G__2409;
G__2401__2404 = G__2410;
continue;
}
} else
{}
break;
}
} else
{}
} else
{}
}
}
return elem;
};
var css = function (elem,k,var_args){
var p__2378 = null;
if (goog.isDef(var_args)) {
  p__2378 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return css__delegate.call(this, elem, k, p__2378);
};
css.cljs$lang$maxFixedArity = 2;
css.cljs$lang$applyTo = (function (arglist__2411){
var elem = cljs.core.first(arglist__2411);
var k = cljs.core.first(cljs.core.next(arglist__2411));
var p__2378 = cljs.core.rest(cljs.core.next(arglist__2411));
return css__delegate.call(this, elem, k, p__2378);
});
return css;
})()
;
pinot.dom.attr = (function() {
var attr = null;
var attr__2437 = (function (elem,attrs){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core.map_QMARK_.call(null,attrs))))
{return elem.getAttribute(cljs.core.name.call(null,attrs));
} else
{var G__2412__2413 = cljs.core.seq.call(null,attrs);

if(cljs.core.truth_(G__2412__2413))
{var G__2415__2417 = cljs.core.first.call(null,G__2412__2413);
var vec__2416__2418 = G__2415__2417;
var k__2419 = cljs.core.nth.call(null,vec__2416__2418,0,null);
var v__2420 = cljs.core.nth.call(null,vec__2416__2418,1,null);
var G__2412__2421 = G__2412__2413;

var G__2415__2422 = G__2415__2417;
var G__2412__2423 = G__2412__2421;

while(true){
var vec__2424__2425 = G__2415__2422;
var k__2426 = cljs.core.nth.call(null,vec__2424__2425,0,null);
var v__2427 = cljs.core.nth.call(null,vec__2424__2425,1,null);
var G__2412__2428 = G__2412__2423;

attr.call(null,elem,k__2426,v__2427);
var temp__3698__auto____2429 = cljs.core.next.call(null,G__2412__2428);

if(cljs.core.truth_(temp__3698__auto____2429))
{var G__2412__2430 = temp__3698__auto____2429;

{
var G__2440 = cljs.core.first.call(null,G__2412__2430);
var G__2441 = G__2412__2430;
G__2415__2422 = G__2440;
G__2412__2423 = G__2441;
continue;
}
} else
{}
break;
}
} else
{}
return elem;
}
});
var attr__2438 = (function (elem,k,v){
var G__2431__2432 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2431__2432))
{var el__2433 = cljs.core.first.call(null,G__2431__2432);
var G__2431__2434 = G__2431__2432;

while(true){
el__2433.setAttribute(cljs.core.name.call(null,k),v);
var temp__3698__auto____2435 = cljs.core.next.call(null,G__2431__2434);

if(cljs.core.truth_(temp__3698__auto____2435))
{var G__2431__2436 = temp__3698__auto____2435;

{
var G__2442 = cljs.core.first.call(null,G__2431__2436);
var G__2443 = G__2431__2436;
el__2433 = G__2442;
G__2431__2434 = G__2443;
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
attr = function(elem,k,v){
switch(arguments.length){
case  2 :
return attr__2437.call(this,elem,k);
case  3 :
return attr__2438.call(this,elem,k,v);
}
throw('Invalid arity: ' + arguments.length);
};
return attr;
})()
;
pinot.dom.text = (function text(elem,v){
var G__2444__2445 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2444__2445))
{var el__2446 = cljs.core.first.call(null,G__2444__2445);
var G__2444__2447 = G__2444__2445;

while(true){
goog.dom.setTextContent.call(null,el__2446,v);
var temp__3698__auto____2448 = cljs.core.next.call(null,G__2444__2447);

if(cljs.core.truth_(temp__3698__auto____2448))
{var G__2444__2449 = temp__3698__auto____2448;

{
var G__2450 = cljs.core.first.call(null,G__2444__2449);
var G__2451 = G__2444__2449;
el__2446 = G__2450;
G__2444__2447 = G__2451;
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
/**
* @param {...*} var_args
*/
pinot.dom.val = (function() { 
var val__delegate = function (elem,p__2452){
var vec__2453__2454 = p__2452;
var v__2455 = cljs.core.nth.call(null,vec__2453__2454,0,null);

var elem__2456 = (cljs.core.truth_(cljs.core.coll_QMARK_.call(null,elem))?cljs.core.first.call(null,elem):elem);

if(cljs.core.truth_(v__2455))
{goog.dom.forms.setValue.call(null,elem__2456,v__2455);
return elem__2456;
} else
{return goog.dom.forms.getValue.call(null,elem__2456);
}
};
var val = function (elem,var_args){
var p__2452 = null;
if (goog.isDef(var_args)) {
  p__2452 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return val__delegate.call(this, elem, p__2452);
};
val.cljs$lang$maxFixedArity = 1;
val.cljs$lang$applyTo = (function (arglist__2457){
var elem = cljs.core.first(arglist__2457);
var p__2452 = cljs.core.rest(arglist__2457);
return val__delegate.call(this, elem, p__2452);
});
return val;
})()
;
pinot.dom.has_class_QMARK_ = (function has_class_QMARK_(elem,cls){
var elem__2458 = (cljs.core.truth_(cljs.core.coll_QMARK_.call(null,elem))?cljs.core.first.call(null,elem):elem);

return goog.dom.classes.has.call(null,elem__2458,cls);
});
pinot.dom.add_class = (function add_class(elem,cls){
var G__2459__2460 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2459__2460))
{var el__2461 = cljs.core.first.call(null,G__2459__2460);
var G__2459__2462 = G__2459__2460;

while(true){
goog.dom.classes.add.call(null,el__2461,cls);
var temp__3698__auto____2463 = cljs.core.next.call(null,G__2459__2462);

if(cljs.core.truth_(temp__3698__auto____2463))
{var G__2459__2464 = temp__3698__auto____2463;

{
var G__2465 = cljs.core.first.call(null,G__2459__2464);
var G__2466 = G__2459__2464;
el__2461 = G__2465;
G__2459__2462 = G__2466;
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
pinot.dom.remove_class = (function remove_class(elem,cls){
var G__2467__2468 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2467__2468))
{var el__2469 = cljs.core.first.call(null,G__2467__2468);
var G__2467__2470 = G__2467__2468;

while(true){
goog.dom.classes.remove.call(null,el__2469,cls);
var temp__3698__auto____2471 = cljs.core.next.call(null,G__2467__2470);

if(cljs.core.truth_(temp__3698__auto____2471))
{var G__2467__2472 = temp__3698__auto____2471;

{
var G__2473 = cljs.core.first.call(null,G__2467__2472);
var G__2474 = G__2467__2472;
el__2469 = G__2473;
G__2467__2470 = G__2474;
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
pinot.dom.toggle_class = (function toggle_class(elem,cls){
var G__2475__2476 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2475__2476))
{var el__2477 = cljs.core.first.call(null,G__2475__2476);
var G__2475__2478 = G__2475__2476;

while(true){
goog.dom.classes.toggle.call(null,el__2477,cls);
var temp__3698__auto____2479 = cljs.core.next.call(null,G__2475__2478);

if(cljs.core.truth_(temp__3698__auto____2479))
{var G__2475__2480 = temp__3698__auto____2479;

{
var G__2481 = cljs.core.first.call(null,G__2475__2480);
var G__2482 = G__2475__2480;
el__2477 = G__2481;
G__2475__2478 = G__2482;
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
pinot.dom.parent = (function parent(elem){
return elem.parentNode;
});
pinot.dom.is_dom_QMARK_ = (function is_dom_QMARK_(elem){
return goog.dom.isNodeLike.call(null,elem);
});
pinot.dom.dom_clone = (function dom_clone(elem){
return elem.cloneNode(true);
});
pinot.dom.append = (function append(elem,html){
var G__2483__2485 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2483__2485))
{var el__2486 = cljs.core.first.call(null,G__2483__2485);
var G__2483__2487 = G__2483__2485;

while(true){
var G__2484__2488 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,html));

if(cljs.core.truth_(G__2484__2488))
{var tag__2489 = cljs.core.first.call(null,G__2484__2488);
var G__2484__2490 = G__2484__2488;

while(true){
goog.dom.appendChild.call(null,el__2486,pinot.dom.dom_clone.call(null,tag__2489));
var temp__3698__auto____2491 = cljs.core.next.call(null,G__2484__2490);

if(cljs.core.truth_(temp__3698__auto____2491))
{var G__2484__2492 = temp__3698__auto____2491;

{
var G__2495 = cljs.core.first.call(null,G__2484__2492);
var G__2496 = G__2484__2492;
tag__2489 = G__2495;
G__2484__2490 = G__2496;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____2493 = cljs.core.next.call(null,G__2483__2487);

if(cljs.core.truth_(temp__3698__auto____2493))
{var G__2483__2494 = temp__3698__auto____2493;

{
var G__2497 = cljs.core.first.call(null,G__2483__2494);
var G__2498 = G__2483__2494;
el__2486 = G__2497;
G__2483__2487 = G__2498;
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
pinot.dom.unappend = (function unappend(elem){
var G__2499__2500 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2499__2500))
{var elem__2501 = cljs.core.first.call(null,G__2499__2500);
var G__2499__2502 = G__2499__2500;

while(true){
goog.dom.removeNode.call(null,elem__2501);
var temp__3698__auto____2503 = cljs.core.next.call(null,G__2499__2502);

if(cljs.core.truth_(temp__3698__auto____2503))
{var G__2499__2504 = temp__3698__auto____2503;

{
var G__2505 = cljs.core.first.call(null,G__2499__2504);
var G__2506 = G__2499__2504;
elem__2501 = G__2505;
G__2499__2502 = G__2506;
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
/**
* @param {...*} var_args
*/
pinot.dom.before = (function() { 
var before__delegate = function (elem,p__2507){
var vec__2508__2509 = p__2507;
var sibling__2510 = cljs.core.nth.call(null,vec__2508__2509,0,null);

var G__2511__2513 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2511__2513))
{var el__2514 = cljs.core.first.call(null,G__2511__2513);
var G__2511__2515 = G__2511__2513;

while(true){
var G__2512__2516 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,sibling__2510));

if(cljs.core.truth_(G__2512__2516))
{var sibling__2517 = cljs.core.first.call(null,G__2512__2516);
var G__2512__2518 = G__2512__2516;

while(true){
if(cljs.core.truth_(sibling__2517))
{goog.dom.insertSiblingBefore.call(null,pinot.dom.dom_clone.call(null,sibling__2517),el__2514);
} else
{goog.dom.getPreviousElementSibling.call(null,el__2514);
}
var temp__3698__auto____2519 = cljs.core.next.call(null,G__2512__2518);

if(cljs.core.truth_(temp__3698__auto____2519))
{var G__2512__2520 = temp__3698__auto____2519;

{
var G__2523 = cljs.core.first.call(null,G__2512__2520);
var G__2524 = G__2512__2520;
sibling__2517 = G__2523;
G__2512__2518 = G__2524;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____2521 = cljs.core.next.call(null,G__2511__2515);

if(cljs.core.truth_(temp__3698__auto____2521))
{var G__2511__2522 = temp__3698__auto____2521;

{
var G__2525 = cljs.core.first.call(null,G__2511__2522);
var G__2526 = G__2511__2522;
el__2514 = G__2525;
G__2511__2515 = G__2526;
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
};
var before = function (elem,var_args){
var p__2507 = null;
if (goog.isDef(var_args)) {
  p__2507 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return before__delegate.call(this, elem, p__2507);
};
before.cljs$lang$maxFixedArity = 1;
before.cljs$lang$applyTo = (function (arglist__2527){
var elem = cljs.core.first(arglist__2527);
var p__2507 = cljs.core.rest(arglist__2527);
return before__delegate.call(this, elem, p__2507);
});
return before;
})()
;
/**
* @param {...*} var_args
*/
pinot.dom.after = (function() { 
var after__delegate = function (elem,p__2528){
var vec__2529__2530 = p__2528;
var sibling__2531 = cljs.core.nth.call(null,vec__2529__2530,0,null);

var G__2532__2534 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2532__2534))
{var el__2535 = cljs.core.first.call(null,G__2532__2534);
var G__2532__2536 = G__2532__2534;

while(true){
var G__2533__2537 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,sibling__2531));

if(cljs.core.truth_(G__2533__2537))
{var sibling__2538 = cljs.core.first.call(null,G__2533__2537);
var G__2533__2539 = G__2533__2537;

while(true){
if(cljs.core.truth_(sibling__2538))
{goog.dom.insertSiblingAfter.call(null,pinot.dom.dom_clone.call(null,sibling__2538),el__2535);
} else
{goog.dom.getNextElementSibling.call(null,el__2535);
}
var temp__3698__auto____2540 = cljs.core.next.call(null,G__2533__2539);

if(cljs.core.truth_(temp__3698__auto____2540))
{var G__2533__2541 = temp__3698__auto____2540;

{
var G__2544 = cljs.core.first.call(null,G__2533__2541);
var G__2545 = G__2533__2541;
sibling__2538 = G__2544;
G__2533__2539 = G__2545;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____2542 = cljs.core.next.call(null,G__2532__2536);

if(cljs.core.truth_(temp__3698__auto____2542))
{var G__2532__2543 = temp__3698__auto____2542;

{
var G__2546 = cljs.core.first.call(null,G__2532__2543);
var G__2547 = G__2532__2543;
el__2535 = G__2546;
G__2532__2536 = G__2547;
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
};
var after = function (elem,var_args){
var p__2528 = null;
if (goog.isDef(var_args)) {
  p__2528 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return after__delegate.call(this, elem, p__2528);
};
after.cljs$lang$maxFixedArity = 1;
after.cljs$lang$applyTo = (function (arglist__2548){
var elem = cljs.core.first(arglist__2548);
var p__2528 = cljs.core.rest(arglist__2548);
return after__delegate.call(this, elem, p__2528);
});
return after;
})()
;
pinot.dom.prepend = (function prepend(elem,neue){
var G__2549__2550 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2549__2550))
{var el__2551 = cljs.core.first.call(null,G__2549__2550);
var G__2549__2552 = G__2549__2550;

while(true){
var firstChild__2553 = goog.dom.getFirstElementChild.call(null,el__2551);

if(cljs.core.truth_(firstChild__2553))
{pinot.dom.before.call(null,firstChild__2553,neue);
} else
{pinot.dom.append.call(null,el__2551,neue);
}
var temp__3698__auto____2554 = cljs.core.next.call(null,G__2549__2552);

if(cljs.core.truth_(temp__3698__auto____2554))
{var G__2549__2555 = temp__3698__auto____2554;

{
var G__2556 = cljs.core.first.call(null,G__2549__2555);
var G__2557 = G__2549__2555;
el__2551 = G__2556;
G__2549__2552 = G__2557;
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
pinot.dom.replace = (function replace(elem,neue){
var G__2558__2559 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2558__2559))
{var el__2560 = cljs.core.first.call(null,G__2558__2559);
var G__2558__2561 = G__2558__2559;

while(true){
pinot.dom.after.call(null,el__2560,neue);
pinot.dom.unappend.call(null,el__2560);
var temp__3698__auto____2562 = cljs.core.next.call(null,G__2558__2561);

if(cljs.core.truth_(temp__3698__auto____2562))
{var G__2558__2563 = temp__3698__auto____2562;

{
var G__2564 = cljs.core.first.call(null,G__2558__2563);
var G__2565 = G__2558__2563;
el__2560 = G__2564;
G__2558__2561 = G__2565;
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
pinot.dom.empty = (function empty(elem){
var G__2566__2567 = cljs.core.seq.call(null,pinot.util.clj.__GT_coll.call(null,elem));

if(cljs.core.truth_(G__2566__2567))
{var el__2568 = cljs.core.first.call(null,G__2566__2567);
var G__2566__2569 = G__2566__2567;

while(true){
goog.dom.removeChildren.call(null,el__2568);
var temp__3698__auto____2570 = cljs.core.next.call(null,G__2566__2569);

if(cljs.core.truth_(temp__3698__auto____2570))
{var G__2566__2571 = temp__3698__auto____2570;

{
var G__2572 = cljs.core.first.call(null,G__2566__2571);
var G__2573 = G__2566__2571;
el__2568 = G__2572;
G__2566__2569 = G__2573;
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
pinot.dom.nodelist__GT_coll = (function nodelist__GT_coll(nl){
var iter__383__auto____2578 = (function iter__2574(s__2575){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2575__2576 = s__2575;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__2575__2576)))
{var x__2577 = cljs.core.first.call(null,s__2575__2576);

return cljs.core.cons.call(null,(nl[x__2577]),iter__2574.call(null,cljs.core.rest.call(null,s__2575__2576)));
} else
{return null;
}
break;
}
})));
});

return iter__383__auto____2578.call(null,cljs.core.range.call(null,0,nl.length));
});
pinot.dom.query = (function query(q){
var q__2579 = (cljs.core.truth_(cljs.core.fn_QMARK_.call(null,q))?cljs.core.str.call(null,"[pinotGroup$=",pinot.dom.pinot_group.call(null,q),"]"):q);
var results__2580 = goog.dom.query.call(null,q__2579);

return pinot.dom.nodelist__GT_coll.call(null,results__2580);
});
