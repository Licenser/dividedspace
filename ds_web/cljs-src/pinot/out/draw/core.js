goog.provide('pinot.draw.core');
goog.require('cljs.core');
pinot.draw.core.animation_frame = (function (){var or__3548__auto____2682 = window.requestAnimationFrame;

if(cljs.core.truth_(or__3548__auto____2682))
{return or__3548__auto____2682;
} else
{var or__3548__auto____2683 = window.webkitRequestAnimationFrame;

if(cljs.core.truth_(or__3548__auto____2683))
{return or__3548__auto____2683;
} else
{var or__3548__auto____2684 = window.mozRequestAnimationFrame;

if(cljs.core.truth_(or__3548__auto____2684))
{return or__3548__auto____2684;
} else
{var or__3548__auto____2685 = window.oRequestAnimationFrame;

if(cljs.core.truth_(or__3548__auto____2685))
{return or__3548__auto____2685;
} else
{var or__3548__auto____2686 = window.msRequestAnimationFrame;

if(cljs.core.truth_(or__3548__auto____2686))
{return or__3548__auto____2686;
} else
{return (function (callback){
return setTimeout.call(null,callback,17);
});
}
}
}
}
}
})();
