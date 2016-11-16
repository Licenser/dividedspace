goog.provide('cljs.core');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');
goog.require('goog.object');
goog.require('goog.array');
/**
* Each runtime environment provides a diffenent way to print output.
* Whatever function *print-fn* is bound to will be passed any
* Strings which should be printed.
*/
cljs.core._STAR_print_fn_STAR_ = (function _STAR_print_fn_STAR_(_){
throw (new Error("No *print-fn* fn set for evaluation environment"));
});
/**
* Internal - do not use!
*/
cljs.core.truth_ = (function truth_(x){
return (x != null && x !== false);
});
/**
* Internal - do not use!
*/
cljs.core.type_satisfies_ = (function type_satisfies_(p,x){
var or__3548__auto____2648 = (p[goog.typeOf.call(null,x)]);

if(cljs.core.truth_(or__3548__auto____2648))
{return or__3548__auto____2648;
} else
{var or__3548__auto____2649 = (p["_"]);

if(cljs.core.truth_(or__3548__auto____2649))
{return or__3548__auto____2649;
} else
{return false;
}
}
});
cljs.core.is_proto_ = (function is_proto_(x){
return (x).constructor.prototype === x;
});
/**
* When compiled for a command-line target, whatever
* function *main-fn* is set to will be called with the command-line
* argv as arguments
*/
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = (function missing_protocol(proto,obj){
return Error.call(null,"No protocol method "+proto+" defined for type "+goog.typeOf.call(null,obj)+": "+obj);
});
/**
* Returns a javascript array, cloned from the passed in array
*/
cljs.core.aclone = (function aclone(array_like){
return Array.prototype.slice.call(array_like);
});
/**
* Creates a new javascript array.
* @param {...*} var_args
*/
cljs.core.array = (function array(var_args){
return Array.prototype.slice.call(arguments);
});
/**
* Returns the value at the index.
*/
cljs.core.aget = (function aget(array,i){
return array[i];
});
/**
* Sets the value at the index.
*/
cljs.core.aset = (function aset(array,i,val){
return (array[i] = val);
});
/**
* Returns the length of the Java array. Works on arrays of all types.
*/
cljs.core.alength = (function alength(array){
return array.length;
});
cljs.core.ICounted = {};
cljs.core._count = (function _count(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2650 = coll;

if(cljs.core.truth_(and__3546__auto____2650))
{return coll.cljs$core$ICounted$_count;
} else
{return and__3546__auto____2650;
}
})()))
{return coll.cljs$core$ICounted$_count(coll);
} else
{return (function (){var or__3548__auto____2651 = (cljs.core._count[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2651))
{return or__3548__auto____2651;
} else
{var or__3548__auto____2652 = (cljs.core._count["_"]);

if(cljs.core.truth_(or__3548__auto____2652))
{return or__3548__auto____2652;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2653 = coll;

if(cljs.core.truth_(and__3546__auto____2653))
{return coll.cljs$core$IEmptyableCollection$_empty;
} else
{return and__3546__auto____2653;
}
})()))
{return coll.cljs$core$IEmptyableCollection$_empty(coll);
} else
{return (function (){var or__3548__auto____2654 = (cljs.core._empty[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2654))
{return or__3548__auto____2654;
} else
{var or__3548__auto____2655 = (cljs.core._empty["_"]);

if(cljs.core.truth_(or__3548__auto____2655))
{return or__3548__auto____2655;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if(cljs.core.truth_((function (){var and__3546__auto____2656 = coll;

if(cljs.core.truth_(and__3546__auto____2656))
{return coll.cljs$core$ICollection$_conj;
} else
{return and__3546__auto____2656;
}
})()))
{return coll.cljs$core$ICollection$_conj(coll,o);
} else
{return (function (){var or__3548__auto____2657 = (cljs.core._conj[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2657))
{return or__3548__auto____2657;
} else
{var or__3548__auto____2658 = (cljs.core._conj["_"]);

if(cljs.core.truth_(or__3548__auto____2658))
{return or__3548__auto____2658;
} else
{throw cljs.core.missing_protocol.call(null,"ICollection.-conj",coll);
}
}
})().call(null,coll,o);
}
});
cljs.core.IIndexed = {};
cljs.core._nth = (function() {
var _nth = null;
var _nth__2665 = (function (coll,n){
if(cljs.core.truth_((function (){var and__3546__auto____2659 = coll;

if(cljs.core.truth_(and__3546__auto____2659))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____2659;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n);
} else
{return (function (){var or__3548__auto____2660 = (cljs.core._nth[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2660))
{return or__3548__auto____2660;
} else
{var or__3548__auto____2661 = (cljs.core._nth["_"]);

if(cljs.core.truth_(or__3548__auto____2661))
{return or__3548__auto____2661;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__2666 = (function (coll,n,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____2662 = coll;

if(cljs.core.truth_(and__3546__auto____2662))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____2662;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n,not_found);
} else
{return (function (){var or__3548__auto____2663 = (cljs.core._nth[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2663))
{return or__3548__auto____2663;
} else
{var or__3548__auto____2664 = (cljs.core._nth["_"]);

if(cljs.core.truth_(or__3548__auto____2664))
{return or__3548__auto____2664;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n,not_found);
}
});
_nth = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return _nth__2665.call(this,coll,n);
case  3 :
return _nth__2666.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _nth;
})()
;
cljs.core.ISeq = {};
cljs.core._first = (function _first(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2668 = coll;

if(cljs.core.truth_(and__3546__auto____2668))
{return coll.cljs$core$ISeq$_first;
} else
{return and__3546__auto____2668;
}
})()))
{return coll.cljs$core$ISeq$_first(coll);
} else
{return (function (){var or__3548__auto____2669 = (cljs.core._first[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2669))
{return or__3548__auto____2669;
} else
{var or__3548__auto____2670 = (cljs.core._first["_"]);

if(cljs.core.truth_(or__3548__auto____2670))
{return or__3548__auto____2670;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2671 = coll;

if(cljs.core.truth_(and__3546__auto____2671))
{return coll.cljs$core$ISeq$_rest;
} else
{return and__3546__auto____2671;
}
})()))
{return coll.cljs$core$ISeq$_rest(coll);
} else
{return (function (){var or__3548__auto____2672 = (cljs.core._rest[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2672))
{return or__3548__auto____2672;
} else
{var or__3548__auto____2673 = (cljs.core._rest["_"]);

if(cljs.core.truth_(or__3548__auto____2673))
{return or__3548__auto____2673;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ILookup = {};
cljs.core._lookup = (function() {
var _lookup = null;
var _lookup__2680 = (function (o,k){
if(cljs.core.truth_((function (){var and__3546__auto____2674 = o;

if(cljs.core.truth_(and__3546__auto____2674))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____2674;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k);
} else
{return (function (){var or__3548__auto____2675 = (cljs.core._lookup[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2675))
{return or__3548__auto____2675;
} else
{var or__3548__auto____2676 = (cljs.core._lookup["_"]);

if(cljs.core.truth_(or__3548__auto____2676))
{return or__3548__auto____2676;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__2681 = (function (o,k,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____2677 = o;

if(cljs.core.truth_(and__3546__auto____2677))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____2677;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k,not_found);
} else
{return (function (){var or__3548__auto____2678 = (cljs.core._lookup[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2678))
{return or__3548__auto____2678;
} else
{var or__3548__auto____2679 = (cljs.core._lookup["_"]);

if(cljs.core.truth_(or__3548__auto____2679))
{return or__3548__auto____2679;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k,not_found);
}
});
_lookup = function(o,k,not_found){
switch(arguments.length){
case  2 :
return _lookup__2680.call(this,o,k);
case  3 :
return _lookup__2681.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _lookup;
})()
;
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = (function _contains_key_QMARK_(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2683 = coll;

if(cljs.core.truth_(and__3546__auto____2683))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_;
} else
{return and__3546__auto____2683;
}
})()))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_(coll,k);
} else
{return (function (){var or__3548__auto____2684 = (cljs.core._contains_key_QMARK_[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2684))
{return or__3548__auto____2684;
} else
{var or__3548__auto____2685 = (cljs.core._contains_key_QMARK_["_"]);

if(cljs.core.truth_(or__3548__auto____2685))
{return or__3548__auto____2685;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if(cljs.core.truth_((function (){var and__3546__auto____2686 = coll;

if(cljs.core.truth_(and__3546__auto____2686))
{return coll.cljs$core$IAssociative$_assoc;
} else
{return and__3546__auto____2686;
}
})()))
{return coll.cljs$core$IAssociative$_assoc(coll,k,v);
} else
{return (function (){var or__3548__auto____2687 = (cljs.core._assoc[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2687))
{return or__3548__auto____2687;
} else
{var or__3548__auto____2688 = (cljs.core._assoc["_"]);

if(cljs.core.truth_(or__3548__auto____2688))
{return or__3548__auto____2688;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2689 = coll;

if(cljs.core.truth_(and__3546__auto____2689))
{return coll.cljs$core$IMap$_dissoc;
} else
{return and__3546__auto____2689;
}
})()))
{return coll.cljs$core$IMap$_dissoc(coll,k);
} else
{return (function (){var or__3548__auto____2690 = (cljs.core._dissoc[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2690))
{return or__3548__auto____2690;
} else
{var or__3548__auto____2691 = (cljs.core._dissoc["_"]);

if(cljs.core.truth_(or__3548__auto____2691))
{return or__3548__auto____2691;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if(cljs.core.truth_((function (){var and__3546__auto____2692 = coll;

if(cljs.core.truth_(and__3546__auto____2692))
{return coll.cljs$core$ISet$_disjoin;
} else
{return and__3546__auto____2692;
}
})()))
{return coll.cljs$core$ISet$_disjoin(coll,v);
} else
{return (function (){var or__3548__auto____2693 = (cljs.core._disjoin[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2693))
{return or__3548__auto____2693;
} else
{var or__3548__auto____2694 = (cljs.core._disjoin["_"]);

if(cljs.core.truth_(or__3548__auto____2694))
{return or__3548__auto____2694;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2695 = coll;

if(cljs.core.truth_(and__3546__auto____2695))
{return coll.cljs$core$IStack$_peek;
} else
{return and__3546__auto____2695;
}
})()))
{return coll.cljs$core$IStack$_peek(coll);
} else
{return (function (){var or__3548__auto____2696 = (cljs.core._peek[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2696))
{return or__3548__auto____2696;
} else
{var or__3548__auto____2697 = (cljs.core._peek["_"]);

if(cljs.core.truth_(or__3548__auto____2697))
{return or__3548__auto____2697;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2698 = coll;

if(cljs.core.truth_(and__3546__auto____2698))
{return coll.cljs$core$IStack$_pop;
} else
{return and__3546__auto____2698;
}
})()))
{return coll.cljs$core$IStack$_pop(coll);
} else
{return (function (){var or__3548__auto____2699 = (cljs.core._pop[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2699))
{return or__3548__auto____2699;
} else
{var or__3548__auto____2700 = (cljs.core._pop["_"]);

if(cljs.core.truth_(or__3548__auto____2700))
{return or__3548__auto____2700;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if(cljs.core.truth_((function (){var and__3546__auto____2701 = coll;

if(cljs.core.truth_(and__3546__auto____2701))
{return coll.cljs$core$IVector$_assoc_n;
} else
{return and__3546__auto____2701;
}
})()))
{return coll.cljs$core$IVector$_assoc_n(coll,n,val);
} else
{return (function (){var or__3548__auto____2702 = (cljs.core._assoc_n[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2702))
{return or__3548__auto____2702;
} else
{var or__3548__auto____2703 = (cljs.core._assoc_n["_"]);

if(cljs.core.truth_(or__3548__auto____2703))
{return or__3548__auto____2703;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if(cljs.core.truth_((function (){var and__3546__auto____2704 = o;

if(cljs.core.truth_(and__3546__auto____2704))
{return o.cljs$core$IDeref$_deref;
} else
{return and__3546__auto____2704;
}
})()))
{return o.cljs$core$IDeref$_deref(o);
} else
{return (function (){var or__3548__auto____2705 = (cljs.core._deref[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2705))
{return or__3548__auto____2705;
} else
{var or__3548__auto____2706 = (cljs.core._deref["_"]);

if(cljs.core.truth_(or__3548__auto____2706))
{return or__3548__auto____2706;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if(cljs.core.truth_((function (){var and__3546__auto____2707 = o;

if(cljs.core.truth_(and__3546__auto____2707))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout;
} else
{return and__3546__auto____2707;
}
})()))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout(o,msec,timeout_val);
} else
{return (function (){var or__3548__auto____2708 = (cljs.core._deref_with_timeout[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2708))
{return or__3548__auto____2708;
} else
{var or__3548__auto____2709 = (cljs.core._deref_with_timeout["_"]);

if(cljs.core.truth_(or__3548__auto____2709))
{return or__3548__auto____2709;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if(cljs.core.truth_((function (){var and__3546__auto____2710 = o;

if(cljs.core.truth_(and__3546__auto____2710))
{return o.cljs$core$IMeta$_meta;
} else
{return and__3546__auto____2710;
}
})()))
{return o.cljs$core$IMeta$_meta(o);
} else
{return (function (){var or__3548__auto____2711 = (cljs.core._meta[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2711))
{return or__3548__auto____2711;
} else
{var or__3548__auto____2712 = (cljs.core._meta["_"]);

if(cljs.core.truth_(or__3548__auto____2712))
{return or__3548__auto____2712;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if(cljs.core.truth_((function (){var and__3546__auto____2713 = o;

if(cljs.core.truth_(and__3546__auto____2713))
{return o.cljs$core$IWithMeta$_with_meta;
} else
{return and__3546__auto____2713;
}
})()))
{return o.cljs$core$IWithMeta$_with_meta(o,meta);
} else
{return (function (){var or__3548__auto____2714 = (cljs.core._with_meta[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2714))
{return or__3548__auto____2714;
} else
{var or__3548__auto____2715 = (cljs.core._with_meta["_"]);

if(cljs.core.truth_(or__3548__auto____2715))
{return or__3548__auto____2715;
} else
{throw cljs.core.missing_protocol.call(null,"IWithMeta.-with-meta",o);
}
}
})().call(null,o,meta);
}
});
cljs.core.IReduce = {};
cljs.core._reduce = (function() {
var _reduce = null;
var _reduce__2722 = (function (coll,f){
if(cljs.core.truth_((function (){var and__3546__auto____2716 = coll;

if(cljs.core.truth_(and__3546__auto____2716))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____2716;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f);
} else
{return (function (){var or__3548__auto____2717 = (cljs.core._reduce[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2717))
{return or__3548__auto____2717;
} else
{var or__3548__auto____2718 = (cljs.core._reduce["_"]);

if(cljs.core.truth_(or__3548__auto____2718))
{return or__3548__auto____2718;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__2723 = (function (coll,f,start){
if(cljs.core.truth_((function (){var and__3546__auto____2719 = coll;

if(cljs.core.truth_(and__3546__auto____2719))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____2719;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f,start);
} else
{return (function (){var or__3548__auto____2720 = (cljs.core._reduce[goog.typeOf.call(null,coll)]);

if(cljs.core.truth_(or__3548__auto____2720))
{return or__3548__auto____2720;
} else
{var or__3548__auto____2721 = (cljs.core._reduce["_"]);

if(cljs.core.truth_(or__3548__auto____2721))
{return or__3548__auto____2721;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f,start);
}
});
_reduce = function(coll,f,start){
switch(arguments.length){
case  2 :
return _reduce__2722.call(this,coll,f);
case  3 :
return _reduce__2723.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return _reduce;
})()
;
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if(cljs.core.truth_((function (){var and__3546__auto____2725 = o;

if(cljs.core.truth_(and__3546__auto____2725))
{return o.cljs$core$IEquiv$_equiv;
} else
{return and__3546__auto____2725;
}
})()))
{return o.cljs$core$IEquiv$_equiv(o,other);
} else
{return (function (){var or__3548__auto____2726 = (cljs.core._equiv[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2726))
{return or__3548__auto____2726;
} else
{var or__3548__auto____2727 = (cljs.core._equiv["_"]);

if(cljs.core.truth_(or__3548__auto____2727))
{return or__3548__auto____2727;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if(cljs.core.truth_((function (){var and__3546__auto____2728 = o;

if(cljs.core.truth_(and__3546__auto____2728))
{return o.cljs$core$IHash$_hash;
} else
{return and__3546__auto____2728;
}
})()))
{return o.cljs$core$IHash$_hash(o);
} else
{return (function (){var or__3548__auto____2729 = (cljs.core._hash[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2729))
{return or__3548__auto____2729;
} else
{var or__3548__auto____2730 = (cljs.core._hash["_"]);

if(cljs.core.truth_(or__3548__auto____2730))
{return or__3548__auto____2730;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if(cljs.core.truth_((function (){var and__3546__auto____2731 = o;

if(cljs.core.truth_(and__3546__auto____2731))
{return o.cljs$core$ISeqable$_seq;
} else
{return and__3546__auto____2731;
}
})()))
{return o.cljs$core$ISeqable$_seq(o);
} else
{return (function (){var or__3548__auto____2732 = (cljs.core._seq[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2732))
{return or__3548__auto____2732;
} else
{var or__3548__auto____2733 = (cljs.core._seq["_"]);

if(cljs.core.truth_(or__3548__auto____2733))
{return or__3548__auto____2733;
} else
{throw cljs.core.missing_protocol.call(null,"ISeqable.-seq",o);
}
}
})().call(null,o);
}
});
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = (function _pr_seq(o,opts){
if(cljs.core.truth_((function (){var and__3546__auto____2734 = o;

if(cljs.core.truth_(and__3546__auto____2734))
{return o.cljs$core$IPrintable$_pr_seq;
} else
{return and__3546__auto____2734;
}
})()))
{return o.cljs$core$IPrintable$_pr_seq(o,opts);
} else
{return (function (){var or__3548__auto____2735 = (cljs.core._pr_seq[goog.typeOf.call(null,o)]);

if(cljs.core.truth_(or__3548__auto____2735))
{return or__3548__auto____2735;
} else
{var or__3548__auto____2736 = (cljs.core._pr_seq["_"]);

if(cljs.core.truth_(or__3548__auto____2736))
{return or__3548__auto____2736;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if(cljs.core.truth_((function (){var and__3546__auto____2737 = d;

if(cljs.core.truth_(and__3546__auto____2737))
{return d.cljs$core$IPending$_realized_QMARK_;
} else
{return and__3546__auto____2737;
}
})()))
{return d.cljs$core$IPending$_realized_QMARK_(d);
} else
{return (function (){var or__3548__auto____2738 = (cljs.core._realized_QMARK_[goog.typeOf.call(null,d)]);

if(cljs.core.truth_(or__3548__auto____2738))
{return or__3548__auto____2738;
} else
{var or__3548__auto____2739 = (cljs.core._realized_QMARK_["_"]);

if(cljs.core.truth_(or__3548__auto____2739))
{return or__3548__auto____2739;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if(cljs.core.truth_((function (){var and__3546__auto____2740 = this$;

if(cljs.core.truth_(and__3546__auto____2740))
{return this$.cljs$core$IWatchable$_notify_watches;
} else
{return and__3546__auto____2740;
}
})()))
{return this$.cljs$core$IWatchable$_notify_watches(this$,oldval,newval);
} else
{return (function (){var or__3548__auto____2741 = (cljs.core._notify_watches[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2741))
{return or__3548__auto____2741;
} else
{var or__3548__auto____2742 = (cljs.core._notify_watches["_"]);

if(cljs.core.truth_(or__3548__auto____2742))
{return or__3548__auto____2742;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if(cljs.core.truth_((function (){var and__3546__auto____2743 = this$;

if(cljs.core.truth_(and__3546__auto____2743))
{return this$.cljs$core$IWatchable$_add_watch;
} else
{return and__3546__auto____2743;
}
})()))
{return this$.cljs$core$IWatchable$_add_watch(this$,key,f);
} else
{return (function (){var or__3548__auto____2744 = (cljs.core._add_watch[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2744))
{return or__3548__auto____2744;
} else
{var or__3548__auto____2745 = (cljs.core._add_watch["_"]);

if(cljs.core.truth_(or__3548__auto____2745))
{return or__3548__auto____2745;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if(cljs.core.truth_((function (){var and__3546__auto____2746 = this$;

if(cljs.core.truth_(and__3546__auto____2746))
{return this$.cljs$core$IWatchable$_remove_watch;
} else
{return and__3546__auto____2746;
}
})()))
{return this$.cljs$core$IWatchable$_remove_watch(this$,key);
} else
{return (function (){var or__3548__auto____2747 = (cljs.core._remove_watch[goog.typeOf.call(null,this$)]);

if(cljs.core.truth_(or__3548__auto____2747))
{return or__3548__auto____2747;
} else
{var or__3548__auto____2748 = (cljs.core._remove_watch["_"]);

if(cljs.core.truth_(or__3548__auto____2748))
{return or__3548__auto____2748;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
cljs.core.identical_QMARK_ = (function identical_QMARK_(x,y){
return (x === y);
});
cljs.core._EQ_ = (function _EQ_(x,y){
return cljs.core._equiv.call(null,x,y);
});
cljs.core.nil_QMARK_ = (function nil_QMARK_(x){
return (x === null);
});
(cljs.core.IHash["null"] = true);
(cljs.core._hash["null"] = (function (o){
return 0;
}));
(cljs.core.ILookup["null"] = true);
(cljs.core._lookup["null"] = (function() {
var G__2749 = null;
var G__2749__2750 = (function (o,k){
return null;
});
var G__2749__2751 = (function (o,k,not_found){
return not_found;
});
G__2749 = function(o,k,not_found){
switch(arguments.length){
case  2 :
return G__2749__2750.call(this,o,k);
case  3 :
return G__2749__2751.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2749;
})()
);
(cljs.core.IAssociative["null"] = true);
(cljs.core._assoc["null"] = (function (_,k,v){
return cljs.core.hash_map.call(null,k,v);
}));
(cljs.core.ICollection["null"] = true);
(cljs.core._conj["null"] = (function (_,o){
return cljs.core.list.call(null,o);
}));
(cljs.core.IReduce["null"] = true);
(cljs.core._reduce["null"] = (function() {
var G__2753 = null;
var G__2753__2754 = (function (_,f){
return f.call(null);
});
var G__2753__2755 = (function (_,f,start){
return start;
});
G__2753 = function(_,f,start){
switch(arguments.length){
case  2 :
return G__2753__2754.call(this,_,f);
case  3 :
return G__2753__2755.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2753;
})()
);
(cljs.core.IPrintable["null"] = true);
(cljs.core._pr_seq["null"] = (function (o){
return cljs.core.list.call(null,"nil");
}));
(cljs.core.ISet["null"] = true);
(cljs.core._disjoin["null"] = (function (_,v){
return null;
}));
(cljs.core.ICounted["null"] = true);
(cljs.core._count["null"] = (function (_){
return 0;
}));
(cljs.core.IStack["null"] = true);
(cljs.core._peek["null"] = (function (_){
return null;
}));
(cljs.core._pop["null"] = (function (_){
return null;
}));
(cljs.core.ISeq["null"] = true);
(cljs.core._first["null"] = (function (_){
return null;
}));
(cljs.core._rest["null"] = (function (_){
return cljs.core.list.call(null);
}));
(cljs.core.IEquiv["null"] = true);
(cljs.core._equiv["null"] = (function (_,o){
return cljs.core.nil_QMARK_.call(null,o);
}));
(cljs.core.IWithMeta["null"] = true);
(cljs.core._with_meta["null"] = (function (_,meta){
return null;
}));
(cljs.core.IMeta["null"] = true);
(cljs.core._meta["null"] = (function (_){
return null;
}));
(cljs.core.IIndexed["null"] = true);
(cljs.core._nth["null"] = (function() {
var G__2757 = null;
var G__2757__2758 = (function (_,n){
return null;
});
var G__2757__2759 = (function (_,n,not_found){
return not_found;
});
G__2757 = function(_,n,not_found){
switch(arguments.length){
case  2 :
return G__2757__2758.call(this,_,n);
case  3 :
return G__2757__2759.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2757;
})()
);
(cljs.core.IEmptyableCollection["null"] = true);
(cljs.core._empty["null"] = (function (_){
return null;
}));
(cljs.core.IMap["null"] = true);
(cljs.core._dissoc["null"] = (function (_,k){
return null;
}));
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
return (o.toString() === other.toString());
});
(cljs.core.IHash["number"] = true);
(cljs.core._hash["number"] = (function (o){
return o;
}));
(cljs.core.IEquiv["number"] = true);
(cljs.core._equiv["number"] = (function (x,o){
return (x === o);
}));
(cljs.core.IHash["boolean"] = true);
(cljs.core._hash["boolean"] = (function (o){
return ((o === true) ? 1 : 0);
}));
(cljs.core.IHash["function"] = true);
(cljs.core._hash["function"] = (function (o){
return goog.getUid.call(null,o);
}));
/**
* Returns a number one greater than num.
*/
cljs.core.inc = (function inc(x){
return (x + 1);
});
/**
* Accepts any collection which satisfies the ICount and IIndexed protocols and
* reduces them without incurring seq initialization
*/
cljs.core.ci_reduce = (function() {
var ci_reduce = null;
var ci_reduce__2767 = (function (cicoll,f){
if(cljs.core.truth_(cljs.core._EQ_.call(null,0,cljs.core._count.call(null,cicoll))))
{return f.call(null);
} else
{var val__2761 = cljs.core._nth.call(null,cicoll,0);
var n__2762 = 1;

while(true){
if(cljs.core.truth_((n__2762 < cljs.core._count.call(null,cicoll))))
{{
var G__2771 = f.call(null,val__2761,cljs.core._nth.call(null,cicoll,n__2762));
var G__2772 = (n__2762 + 1);
val__2761 = G__2771;
n__2762 = G__2772;
continue;
}
} else
{return val__2761;
}
break;
}
}
});
var ci_reduce__2768 = (function (cicoll,f,val){
var val__2763 = val;
var n__2764 = 0;

while(true){
if(cljs.core.truth_((n__2764 < cljs.core._count.call(null,cicoll))))
{{
var G__2773 = f.call(null,val__2763,cljs.core._nth.call(null,cicoll,n__2764));
var G__2774 = (n__2764 + 1);
val__2763 = G__2773;
n__2764 = G__2774;
continue;
}
} else
{return val__2763;
}
break;
}
});
var ci_reduce__2769 = (function (cicoll,f,val,idx){
var val__2765 = val;
var n__2766 = idx;

while(true){
if(cljs.core.truth_((n__2766 < cljs.core._count.call(null,cicoll))))
{{
var G__2775 = f.call(null,val__2765,cljs.core._nth.call(null,cicoll,n__2766));
var G__2776 = (n__2766 + 1);
val__2765 = G__2775;
n__2766 = G__2776;
continue;
}
} else
{return val__2765;
}
break;
}
});
ci_reduce = function(cicoll,f,val,idx){
switch(arguments.length){
case  2 :
return ci_reduce__2767.call(this,cicoll,f);
case  3 :
return ci_reduce__2768.call(this,cicoll,f,val);
case  4 :
return ci_reduce__2769.call(this,cicoll,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
return ci_reduce;
})()
;

/**
* @constructor
*/
cljs.core.IndexedSeq = (function (a,i){
this.a = a;
this.i = i;
})
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__2777 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = (function() {
var G__2790 = null;
var G__2790__2791 = (function (coll,f){
var this__2778 = this;
return cljs.core.ci_reduce.call(null,coll,f,(this__2778.a[this__2778.i]),(this__2778.i + 1));
});
var G__2790__2792 = (function (coll,f,start){
var this__2779 = this;
return cljs.core.ci_reduce.call(null,coll,f,start,this__2779.i);
});
G__2790 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__2790__2791.call(this,coll,f);
case  3 :
return G__2790__2792.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2790;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__2780 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__2781 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = (function() {
var G__2794 = null;
var G__2794__2795 = (function (coll,n){
var this__2782 = this;
var i__2783 = (n + this__2782.i);

if(cljs.core.truth_((i__2783 < this__2782.a.length)))
{return (this__2782.a[i__2783]);
} else
{return null;
}
});
var G__2794__2796 = (function (coll,n,not_found){
var this__2784 = this;
var i__2785 = (n + this__2784.i);

if(cljs.core.truth_((i__2785 < this__2784.a.length)))
{return (this__2784.a[i__2785]);
} else
{return not_found;
}
});
G__2794 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__2794__2795.call(this,coll,n);
case  3 :
return G__2794__2796.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2794;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = (function (_){
var this__2786 = this;
return (this__2786.a.length - this__2786.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = (function (_){
var this__2787 = this;
return (this__2787.a[this__2787.i]);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = (function (_){
var this__2788 = this;
if(cljs.core.truth_(((this__2788.i + 1) < this__2788.a.length)))
{return (new cljs.core.IndexedSeq(this__2788.a,(this__2788.i + 1)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = (function (this$){
var this__2789 = this;
return this$;
});
cljs.core.prim_seq = (function prim_seq(prim,i){
if(cljs.core.truth_(cljs.core._EQ_.call(null,0,prim.length)))
{return null;
} else
{return (new cljs.core.IndexedSeq(prim,i));
}
});
cljs.core.array_seq = (function array_seq(array,i){
return cljs.core.prim_seq.call(null,array,i);
});
(cljs.core.IReduce["array"] = true);
(cljs.core._reduce["array"] = (function() {
var G__2798 = null;
var G__2798__2799 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__2798__2800 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__2798 = function(array,f,start){
switch(arguments.length){
case  2 :
return G__2798__2799.call(this,array,f);
case  3 :
return G__2798__2800.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2798;
})()
);
(cljs.core.ILookup["array"] = true);
(cljs.core._lookup["array"] = (function() {
var G__2802 = null;
var G__2802__2803 = (function (array,k){
return (array[k]);
});
var G__2802__2804 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__2802 = function(array,k,not_found){
switch(arguments.length){
case  2 :
return G__2802__2803.call(this,array,k);
case  3 :
return G__2802__2804.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2802;
})()
);
(cljs.core.IIndexed["array"] = true);
(cljs.core._nth["array"] = (function() {
var G__2806 = null;
var G__2806__2807 = (function (array,n){
if(cljs.core.truth_((n < array.length)))
{return (array[n]);
} else
{return null;
}
});
var G__2806__2808 = (function (array,n,not_found){
if(cljs.core.truth_((n < array.length)))
{return (array[n]);
} else
{return not_found;
}
});
G__2806 = function(array,n,not_found){
switch(arguments.length){
case  2 :
return G__2806__2807.call(this,array,n);
case  3 :
return G__2806__2808.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2806;
})()
);
(cljs.core.ICounted["array"] = true);
(cljs.core._count["array"] = (function (a){
return a.length;
}));
(cljs.core.ISeqable["array"] = true);
(cljs.core._seq["array"] = (function (array){
return cljs.core.array_seq.call(null,array,0);
}));
/**
* Returns a seq on the collection. If the collection is
* empty, returns nil.  (seq nil) returns nil. seq also works on
* Strings.
*/
cljs.core.seq = (function seq(coll){
if(cljs.core.truth_(coll))
{return cljs.core._seq.call(null,coll);
} else
{return null;
}
});
/**
* Returns the first item in the collection. Calls seq on its
* argument. If coll is nil, returns nil.
*/
cljs.core.first = (function first(coll){
var temp__3698__auto____2810 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____2810))
{var s__2811 = temp__3698__auto____2810;

return cljs.core._first.call(null,s__2811);
} else
{return null;
}
});
/**
* Returns a possibly empty seq of the items after the first. Calls seq on its
* argument.
*/
cljs.core.rest = (function rest(coll){
return cljs.core._rest.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns a seq of the items after the first. Calls seq on its
* argument.  If there are no more items, returns nil
*/
cljs.core.next = (function next(coll){
if(cljs.core.truth_(coll))
{return cljs.core.seq.call(null,cljs.core.rest.call(null,coll));
} else
{return null;
}
});
/**
* Same as (first (next x))
*/
cljs.core.second = (function second(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (first (first x))
*/
cljs.core.ffirst = (function ffirst(coll){
return cljs.core.first.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (next (first x))
*/
cljs.core.nfirst = (function nfirst(coll){
return cljs.core.next.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (first (next x))
*/
cljs.core.fnext = (function fnext(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (next (next x))
*/
cljs.core.nnext = (function nnext(coll){
return cljs.core.next.call(null,cljs.core.next.call(null,coll));
});
/**
* Return the last item in coll, in linear time
*/
cljs.core.last = (function last(s){
while(true){
if(cljs.core.truth_(cljs.core.next.call(null,s)))
{{
var G__2812 = cljs.core.next.call(null,s);
s = G__2812;
continue;
}
} else
{return cljs.core.first.call(null,s);
}
break;
}
});
(cljs.core.ICounted["_"] = true);
(cljs.core._count["_"] = (function (x){
var s__2813 = cljs.core.seq.call(null,x);
var n__2814 = 0;

while(true){
if(cljs.core.truth_(s__2813))
{{
var G__2815 = cljs.core.next.call(null,s__2813);
var G__2816 = (n__2814 + 1);
s__2813 = G__2815;
n__2814 = G__2816;
continue;
}
} else
{return n__2814;
}
break;
}
}));
(cljs.core.IEquiv["_"] = true);
(cljs.core._equiv["_"] = (function (x,o){
return (x === o);
}));
/**
* Returns true if x is logical false, false otherwise.
*/
cljs.core.not = (function not(x){
if(cljs.core.truth_(x))
{return false;
} else
{return true;
}
});
/**
* conj[oin]. Returns a new collection with the xs
* 'added'. (conj nil item) returns (item).  The 'addition' may
* happen at different 'places' depending on the concrete type.
* @param {...*} var_args
*/
cljs.core.conj = (function() {
var conj = null;
var conj__2817 = (function (coll,x){
return cljs.core._conj.call(null,coll,x);
});
var conj__2818 = (function() { 
var G__2820__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__2821 = conj.call(null,coll,x);
var G__2822 = cljs.core.first.call(null,xs);
var G__2823 = cljs.core.next.call(null,xs);
coll = G__2821;
x = G__2822;
xs = G__2823;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__2820 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2820__delegate.call(this, coll, x, xs);
};
G__2820.cljs$lang$maxFixedArity = 2;
G__2820.cljs$lang$applyTo = (function (arglist__2824){
var coll = cljs.core.first(arglist__2824);
var x = cljs.core.first(cljs.core.next(arglist__2824));
var xs = cljs.core.rest(cljs.core.next(arglist__2824));
return G__2820__delegate.call(this, coll, x, xs);
});
return G__2820;
})()
;
conj = function(coll,x,var_args){
var xs = var_args;
switch(arguments.length){
case  2 :
return conj__2817.call(this,coll,x);
default:
return conj__2818.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
conj.cljs$lang$maxFixedArity = 2;
conj.cljs$lang$applyTo = conj__2818.cljs$lang$applyTo;
return conj;
})()
;
/**
* Returns an empty collection of the same category as coll, or nil
*/
cljs.core.empty = (function empty(coll){
return cljs.core._empty.call(null,coll);
});
/**
* Returns the number of items in the collection. (count nil) returns
* 0.  Also works on strings, arrays, and Maps
*/
cljs.core.count = (function count(coll){
return cljs.core._count.call(null,coll);
});
/**
* Returns the value at the index. get returns nil if index out of
* bounds, nth throws an exception unless not-found is supplied.  nth
* also works for strings, arrays, regex Matchers and Lists, and,
* in O(n) time, for sequences.
*/
cljs.core.nth = (function() {
var nth = null;
var nth__2825 = (function (coll,n){
return cljs.core._nth.call(null,coll,Math.floor(n));
});
var nth__2826 = (function (coll,n,not_found){
return cljs.core._nth.call(null,coll,Math.floor(n),not_found);
});
nth = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return nth__2825.call(this,coll,n);
case  3 :
return nth__2826.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return nth;
})()
;
/**
* Returns the value mapped to key, not-found or nil if key not present.
*/
cljs.core.get = (function() {
var get = null;
var get__2828 = (function (o,k){
return cljs.core._lookup.call(null,o,k);
});
var get__2829 = (function (o,k,not_found){
return cljs.core._lookup.call(null,o,k,not_found);
});
get = function(o,k,not_found){
switch(arguments.length){
case  2 :
return get__2828.call(this,o,k);
case  3 :
return get__2829.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return get;
})()
;
/**
* assoc[iate]. When applied to a map, returns a new map of the
* same (hashed/sorted) type, that contains the mapping of key(s) to
* val(s). When applied to a vector, returns a new vector that
* contains val at index.
* @param {...*} var_args
*/
cljs.core.assoc = (function() {
var assoc = null;
var assoc__2832 = (function (coll,k,v){
return cljs.core._assoc.call(null,coll,k,v);
});
var assoc__2833 = (function() { 
var G__2835__delegate = function (coll,k,v,kvs){
while(true){
var ret__2831 = assoc.call(null,coll,k,v);

if(cljs.core.truth_(kvs))
{{
var G__2836 = ret__2831;
var G__2837 = cljs.core.first.call(null,kvs);
var G__2838 = cljs.core.second.call(null,kvs);
var G__2839 = cljs.core.nnext.call(null,kvs);
coll = G__2836;
k = G__2837;
v = G__2838;
kvs = G__2839;
continue;
}
} else
{return ret__2831;
}
break;
}
};
var G__2835 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2835__delegate.call(this, coll, k, v, kvs);
};
G__2835.cljs$lang$maxFixedArity = 3;
G__2835.cljs$lang$applyTo = (function (arglist__2840){
var coll = cljs.core.first(arglist__2840);
var k = cljs.core.first(cljs.core.next(arglist__2840));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2840)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2840)));
return G__2835__delegate.call(this, coll, k, v, kvs);
});
return G__2835;
})()
;
assoc = function(coll,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case  3 :
return assoc__2832.call(this,coll,k,v);
default:
return assoc__2833.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
assoc.cljs$lang$maxFixedArity = 3;
assoc.cljs$lang$applyTo = assoc__2833.cljs$lang$applyTo;
return assoc;
})()
;
/**
* dissoc[iate]. Returns a new map of the same (hashed/sorted) type,
* that does not contain a mapping for key(s).
* @param {...*} var_args
*/
cljs.core.dissoc = (function() {
var dissoc = null;
var dissoc__2842 = (function (coll){
return coll;
});
var dissoc__2843 = (function (coll,k){
return cljs.core._dissoc.call(null,coll,k);
});
var dissoc__2844 = (function() { 
var G__2846__delegate = function (coll,k,ks){
while(true){
var ret__2841 = dissoc.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__2847 = ret__2841;
var G__2848 = cljs.core.first.call(null,ks);
var G__2849 = cljs.core.next.call(null,ks);
coll = G__2847;
k = G__2848;
ks = G__2849;
continue;
}
} else
{return ret__2841;
}
break;
}
};
var G__2846 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2846__delegate.call(this, coll, k, ks);
};
G__2846.cljs$lang$maxFixedArity = 2;
G__2846.cljs$lang$applyTo = (function (arglist__2850){
var coll = cljs.core.first(arglist__2850);
var k = cljs.core.first(cljs.core.next(arglist__2850));
var ks = cljs.core.rest(cljs.core.next(arglist__2850));
return G__2846__delegate.call(this, coll, k, ks);
});
return G__2846;
})()
;
dissoc = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return dissoc__2842.call(this,coll);
case  2 :
return dissoc__2843.call(this,coll,k);
default:
return dissoc__2844.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
dissoc.cljs$lang$maxFixedArity = 2;
dissoc.cljs$lang$applyTo = dissoc__2844.cljs$lang$applyTo;
return dissoc;
})()
;
/**
* Returns an object of the same type and value as obj, with
* map m as its metadata.
*/
cljs.core.with_meta = (function with_meta(o,meta){
return cljs.core._with_meta.call(null,o,meta);
});
/**
* Returns the metadata of obj, returns nil if there is no metadata.
*/
cljs.core.meta = (function meta(o){
if(cljs.core.truth_((function (){var x__321__auto____2851 = o;

if(cljs.core.truth_((function (){var and__3546__auto____2852 = x__321__auto____2851;

if(cljs.core.truth_(and__3546__auto____2852))
{var and__3546__auto____2853 = x__321__auto____2851.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____2853))
{return cljs.core.not.call(null,x__321__auto____2851.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____2853;
}
} else
{return and__3546__auto____2852;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__321__auto____2851);
}
})()))
{return cljs.core._meta.call(null,o);
} else
{return null;
}
});
/**
* For a list or queue, same as first, for a vector, same as, but much
* more efficient than, last. If the collection is empty, returns nil.
*/
cljs.core.peek = (function peek(coll){
return cljs.core._peek.call(null,coll);
});
/**
* For a list or queue, returns a new list/queue without the first
* item, for a vector, returns a new vector without the last item.
* Note - not the same as next/butlast.
*/
cljs.core.pop = (function pop(coll){
return cljs.core._pop.call(null,coll);
});
/**
* disj[oin]. Returns a new set of the same (hashed/sorted) type, that
* does not contain key(s).
* @param {...*} var_args
*/
cljs.core.disj = (function() {
var disj = null;
var disj__2855 = (function (coll){
return coll;
});
var disj__2856 = (function (coll,k){
return cljs.core._disjoin.call(null,coll,k);
});
var disj__2857 = (function() { 
var G__2859__delegate = function (coll,k,ks){
while(true){
var ret__2854 = disj.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__2860 = ret__2854;
var G__2861 = cljs.core.first.call(null,ks);
var G__2862 = cljs.core.next.call(null,ks);
coll = G__2860;
k = G__2861;
ks = G__2862;
continue;
}
} else
{return ret__2854;
}
break;
}
};
var G__2859 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2859__delegate.call(this, coll, k, ks);
};
G__2859.cljs$lang$maxFixedArity = 2;
G__2859.cljs$lang$applyTo = (function (arglist__2863){
var coll = cljs.core.first(arglist__2863);
var k = cljs.core.first(cljs.core.next(arglist__2863));
var ks = cljs.core.rest(cljs.core.next(arglist__2863));
return G__2859__delegate.call(this, coll, k, ks);
});
return G__2859;
})()
;
disj = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return disj__2855.call(this,coll);
case  2 :
return disj__2856.call(this,coll,k);
default:
return disj__2857.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
disj.cljs$lang$maxFixedArity = 2;
disj.cljs$lang$applyTo = disj__2857.cljs$lang$applyTo;
return disj;
})()
;
cljs.core.hash = (function hash(o){
return cljs.core._hash.call(null,o);
});
/**
* Returns true if coll has no items - same as (not (seq coll)).
* Please use the idiom (seq x) rather than (not (empty? x))
*/
cljs.core.empty_QMARK_ = (function empty_QMARK_(coll){
return cljs.core.not.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns true if x satisfies ICollection
*/
cljs.core.coll_QMARK_ = (function coll_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__321__auto____2864 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2865 = x__321__auto____2864;

if(cljs.core.truth_(and__3546__auto____2865))
{var and__3546__auto____2866 = x__321__auto____2864.cljs$core$ICollection$;

if(cljs.core.truth_(and__3546__auto____2866))
{return cljs.core.not.call(null,x__321__auto____2864.hasOwnProperty("cljs$core$ICollection$"));
} else
{return and__3546__auto____2866;
}
} else
{return and__3546__auto____2865;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,x__321__auto____2864);
}
}
});
/**
* Returns true if x satisfies ISet
*/
cljs.core.set_QMARK_ = (function set_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__321__auto____2867 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2868 = x__321__auto____2867;

if(cljs.core.truth_(and__3546__auto____2868))
{var and__3546__auto____2869 = x__321__auto____2867.cljs$core$ISet$;

if(cljs.core.truth_(and__3546__auto____2869))
{return cljs.core.not.call(null,x__321__auto____2867.hasOwnProperty("cljs$core$ISet$"));
} else
{return and__3546__auto____2869;
}
} else
{return and__3546__auto____2868;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,x__321__auto____2867);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var x__321__auto____2870 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2871 = x__321__auto____2870;

if(cljs.core.truth_(and__3546__auto____2871))
{var and__3546__auto____2872 = x__321__auto____2870.cljs$core$IAssociative$;

if(cljs.core.truth_(and__3546__auto____2872))
{return cljs.core.not.call(null,x__321__auto____2870.hasOwnProperty("cljs$core$IAssociative$"));
} else
{return and__3546__auto____2872;
}
} else
{return and__3546__auto____2871;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,x__321__auto____2870);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var x__321__auto____2873 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2874 = x__321__auto____2873;

if(cljs.core.truth_(and__3546__auto____2874))
{var and__3546__auto____2875 = x__321__auto____2873.cljs$core$ISequential$;

if(cljs.core.truth_(and__3546__auto____2875))
{return cljs.core.not.call(null,x__321__auto____2873.hasOwnProperty("cljs$core$ISequential$"));
} else
{return and__3546__auto____2875;
}
} else
{return and__3546__auto____2874;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,x__321__auto____2873);
}
});
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var x__321__auto____2876 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2877 = x__321__auto____2876;

if(cljs.core.truth_(and__3546__auto____2877))
{var and__3546__auto____2878 = x__321__auto____2876.cljs$core$ICounted$;

if(cljs.core.truth_(and__3546__auto____2878))
{return cljs.core.not.call(null,x__321__auto____2876.hasOwnProperty("cljs$core$ICounted$"));
} else
{return and__3546__auto____2878;
}
} else
{return and__3546__auto____2877;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,x__321__auto____2876);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__321__auto____2879 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2880 = x__321__auto____2879;

if(cljs.core.truth_(and__3546__auto____2880))
{var and__3546__auto____2881 = x__321__auto____2879.cljs$core$IMap$;

if(cljs.core.truth_(and__3546__auto____2881))
{return cljs.core.not.call(null,x__321__auto____2879.hasOwnProperty("cljs$core$IMap$"));
} else
{return and__3546__auto____2881;
}
} else
{return and__3546__auto____2880;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,x__321__auto____2879);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var x__321__auto____2882 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2883 = x__321__auto____2882;

if(cljs.core.truth_(and__3546__auto____2883))
{var and__3546__auto____2884 = x__321__auto____2882.cljs$core$IVector$;

if(cljs.core.truth_(and__3546__auto____2884))
{return cljs.core.not.call(null,x__321__auto____2882.hasOwnProperty("cljs$core$IVector$"));
} else
{return and__3546__auto____2884;
}
} else
{return and__3546__auto____2883;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,x__321__auto____2882);
}
});
cljs.core.js_obj = (function js_obj(){
return {};
});
cljs.core.js_keys = (function js_keys(obj){
var keys__2885 = cljs.core.array.call(null);

goog.object.forEach.call(null,obj,(function (val,key,obj){
return keys__2885.push(key);
}));
return keys__2885;
});
cljs.core.js_delete = (function js_delete(obj,key){
return delete obj[key];
});
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
/**
* Returns true if x is the value false, false otherwise.
*/
cljs.core.false_QMARK_ = (function false_QMARK_(x){
return x === false;
});
/**
* Returns true if x is the value true, false otherwise.
*/
cljs.core.true_QMARK_ = (function true_QMARK_(x){
return x === true;
});
cljs.core.undefined_QMARK_ = (function undefined_QMARK_(x){
return (void 0 === x);
});
cljs.core.instance_QMARK_ = (function instance_QMARK_(t,o){
return (o != null && (o instanceof t || o.constructor === t || t === Object));
});
/**
* Return true if s satisfies ISeq
*/
cljs.core.seq_QMARK_ = (function seq_QMARK_(s){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,s)))
{return false;
} else
{var x__321__auto____2886 = s;

if(cljs.core.truth_((function (){var and__3546__auto____2887 = x__321__auto____2886;

if(cljs.core.truth_(and__3546__auto____2887))
{var and__3546__auto____2888 = x__321__auto____2886.cljs$core$ISeq$;

if(cljs.core.truth_(and__3546__auto____2888))
{return cljs.core.not.call(null,x__321__auto____2886.hasOwnProperty("cljs$core$ISeq$"));
} else
{return and__3546__auto____2888;
}
} else
{return and__3546__auto____2887;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,x__321__auto____2886);
}
}
});
cljs.core.boolean$ = (function boolean$(x){
if(cljs.core.truth_(x))
{return true;
} else
{return false;
}
});
cljs.core.string_QMARK_ = (function string_QMARK_(x){
var and__3546__auto____2889 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____2889))
{return cljs.core.not.call(null,(function (){var or__3548__auto____2890 = cljs.core._EQ_.call(null,x.charAt(0),"﷐");

if(cljs.core.truth_(or__3548__auto____2890))
{return or__3548__auto____2890;
} else
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
}
})());
} else
{return and__3546__auto____2889;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3546__auto____2891 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____2891))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷐");
} else
{return and__3546__auto____2891;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3546__auto____2892 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____2892))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
} else
{return and__3546__auto____2892;
}
});
cljs.core.number_QMARK_ = (function number_QMARK_(n){
return goog.isNumber.call(null,n);
});
cljs.core.fn_QMARK_ = (function fn_QMARK_(f){
return goog.isFunction.call(null,f);
});
/**
* Returns true if n is an integer.  Warning: returns true on underflow condition.
*/
cljs.core.integer_QMARK_ = (function integer_QMARK_(n){
var and__3546__auto____2893 = cljs.core.number_QMARK_.call(null,n);

if(cljs.core.truth_(and__3546__auto____2893))
{return (n == n.toFixed());
} else
{return and__3546__auto____2893;
}
});
/**
* Returns true if key is present in the given collection, otherwise
* returns false.  Note that for numerically indexed collections like
* vectors and arrays, this tests if the numeric key is within the
* range of indexes. 'contains?' operates constant or logarithmic time;
* it will not perform a linear search for a value.  See also 'some'.
*/
cljs.core.contains_QMARK_ = (function contains_QMARK_(coll,v){
if(cljs.core.truth_((cljs.core._lookup.call(null,coll,v,cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)))
{return false;
} else
{return true;
}
});
/**
* Returns the map entry for key, or nil if key not present.
*/
cljs.core.find = (function find(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2894 = coll;

if(cljs.core.truth_(and__3546__auto____2894))
{var and__3546__auto____2895 = cljs.core.associative_QMARK_.call(null,coll);

if(cljs.core.truth_(and__3546__auto____2895))
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3546__auto____2895;
}
} else
{return and__3546__auto____2894;
}
})()))
{return cljs.core.Vector.fromArray([k,cljs.core._lookup.call(null,coll,k)]);
} else
{return null;
}
});
/**
* Returns true if no two of the arguments are =
* @param {...*} var_args
*/
cljs.core.distinct_QMARK_ = (function() {
var distinct_QMARK_ = null;
var distinct_QMARK___2900 = (function (x){
return true;
});
var distinct_QMARK___2901 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var distinct_QMARK___2902 = (function() { 
var G__2904__delegate = function (x,y,more){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y))))
{var s__2896 = cljs.core.set([y,x]);
var xs__2897 = more;

while(true){
var x__2898 = cljs.core.first.call(null,xs__2897);
var etc__2899 = cljs.core.next.call(null,xs__2897);

if(cljs.core.truth_(xs__2897))
{if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,s__2896,x__2898)))
{return false;
} else
{{
var G__2905 = cljs.core.conj.call(null,s__2896,x__2898);
var G__2906 = etc__2899;
s__2896 = G__2905;
xs__2897 = G__2906;
continue;
}
}
} else
{return true;
}
break;
}
} else
{return false;
}
};
var G__2904 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2904__delegate.call(this, x, y, more);
};
G__2904.cljs$lang$maxFixedArity = 2;
G__2904.cljs$lang$applyTo = (function (arglist__2907){
var x = cljs.core.first(arglist__2907);
var y = cljs.core.first(cljs.core.next(arglist__2907));
var more = cljs.core.rest(cljs.core.next(arglist__2907));
return G__2904__delegate.call(this, x, y, more);
});
return G__2904;
})()
;
distinct_QMARK_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return distinct_QMARK___2900.call(this,x);
case  2 :
return distinct_QMARK___2901.call(this,x,y);
default:
return distinct_QMARK___2902.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
distinct_QMARK_.cljs$lang$maxFixedArity = 2;
distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___2902.cljs$lang$applyTo;
return distinct_QMARK_;
})()
;
/**
* Comparator. Returns a negative number, zero, or a positive number
* when x is logically 'less than', 'equal to', or 'greater than'
* y. Uses google.array.defaultCompare.
*/
cljs.core.compare = (function compare(x,y){
return goog.array.defaultCompare.call(null,x,y);
});
/**
* Given a fn that might be boolean valued or a comparator,
* return a fn that is a comparator.
*/
cljs.core.fn__GT_comparator = (function fn__GT_comparator(f){
if(cljs.core.truth_(cljs.core._EQ_.call(null,f,cljs.core.compare)))
{return cljs.core.compare;
} else
{return (function (x,y){
var r__2908 = f.call(null,x,y);

if(cljs.core.truth_(cljs.core.number_QMARK_.call(null,r__2908)))
{return r__2908;
} else
{if(cljs.core.truth_(r__2908))
{return -1;
} else
{if(cljs.core.truth_(f.call(null,y,x)))
{return 1;
} else
{return 0;
}
}
}
});
}
});
/**
* Returns a sorted sequence of the items in coll. Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort = (function() {
var sort = null;
var sort__2910 = (function (coll){
return sort.call(null,cljs.core.compare,coll);
});
var sort__2911 = (function (comp,coll){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{var a__2909 = cljs.core.to_array.call(null,coll);

goog.array.stableSort.call(null,a__2909,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__2909);
} else
{return cljs.core.List.EMPTY;
}
});
sort = function(comp,coll){
switch(arguments.length){
case  1 :
return sort__2910.call(this,comp);
case  2 :
return sort__2911.call(this,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return sort;
})()
;
/**
* Returns a sorted sequence of the items in coll, where the sort
* order is determined by comparing (keyfn item).  Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort_by = (function() {
var sort_by = null;
var sort_by__2913 = (function (keyfn,coll){
return sort_by.call(null,keyfn,cljs.core.compare,coll);
});
var sort_by__2914 = (function (keyfn,comp,coll){
return cljs.core.sort.call(null,(function (x,y){
return cljs.core.fn__GT_comparator.call(null,comp).call(null,keyfn.call(null,x),keyfn.call(null,y));
}),coll);
});
sort_by = function(keyfn,comp,coll){
switch(arguments.length){
case  2 :
return sort_by__2913.call(this,keyfn,comp);
case  3 :
return sort_by__2914.call(this,keyfn,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return sort_by;
})()
;
/**
* f should be a function of 2 arguments. If val is not supplied,
* returns the result of applying f to the first 2 items in coll, then
* applying f to that result and the 3rd item, etc. If coll contains no
* items, f must accept no arguments as well, and reduce returns the
* result of calling f with no arguments.  If coll has only 1 item, it
* is returned and f is not called.  If val is supplied, returns the
* result of applying f to val and the first item in coll, then
* applying f to that result and the 2nd item, etc. If coll contains no
* items, returns val and f is not called.
*/
cljs.core.reduce = (function() {
var reduce = null;
var reduce__2916 = (function (f,coll){
return cljs.core._reduce.call(null,coll,f);
});
var reduce__2917 = (function (f,val,coll){
return cljs.core._reduce.call(null,coll,f,val);
});
reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return reduce__2916.call(this,f,val);
case  3 :
return reduce__2917.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return reduce;
})()
;
cljs.core.seq_reduce = (function() {
var seq_reduce = null;
var seq_reduce__2923 = (function (f,coll){
var temp__3695__auto____2919 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____2919))
{var s__2920 = temp__3695__auto____2919;

return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__2920),cljs.core.next.call(null,s__2920));
} else
{return f.call(null);
}
});
var seq_reduce__2924 = (function (f,val,coll){
var val__2921 = val;
var coll__2922 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_(coll__2922))
{{
var G__2926 = f.call(null,val__2921,cljs.core.first.call(null,coll__2922));
var G__2927 = cljs.core.next.call(null,coll__2922);
val__2921 = G__2926;
coll__2922 = G__2927;
continue;
}
} else
{return val__2921;
}
break;
}
});
seq_reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return seq_reduce__2923.call(this,f,val);
case  3 :
return seq_reduce__2924.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return seq_reduce;
})()
;
(cljs.core.IReduce["_"] = true);
(cljs.core._reduce["_"] = (function() {
var G__2928 = null;
var G__2928__2929 = (function (coll,f){
return cljs.core.seq_reduce.call(null,f,coll);
});
var G__2928__2930 = (function (coll,f,start){
return cljs.core.seq_reduce.call(null,f,start,coll);
});
G__2928 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__2928__2929.call(this,coll,f);
case  3 :
return G__2928__2930.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2928;
})()
);
/**
* Returns the sum of nums. (+) returns 0.
* @param {...*} var_args
*/
cljs.core._PLUS_ = (function() {
var _PLUS_ = null;
var _PLUS___2932 = (function (){
return 0;
});
var _PLUS___2933 = (function (x){
return x;
});
var _PLUS___2934 = (function (x,y){
return (x + y);
});
var _PLUS___2935 = (function() { 
var G__2937__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,_PLUS_.call(null,x,y),more);
};
var G__2937 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2937__delegate.call(this, x, y, more);
};
G__2937.cljs$lang$maxFixedArity = 2;
G__2937.cljs$lang$applyTo = (function (arglist__2938){
var x = cljs.core.first(arglist__2938);
var y = cljs.core.first(cljs.core.next(arglist__2938));
var more = cljs.core.rest(cljs.core.next(arglist__2938));
return G__2937__delegate.call(this, x, y, more);
});
return G__2937;
})()
;
_PLUS_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _PLUS___2932.call(this);
case  1 :
return _PLUS___2933.call(this,x);
case  2 :
return _PLUS___2934.call(this,x,y);
default:
return _PLUS___2935.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_PLUS_.cljs$lang$maxFixedArity = 2;
_PLUS_.cljs$lang$applyTo = _PLUS___2935.cljs$lang$applyTo;
return _PLUS_;
})()
;
/**
* If no ys are supplied, returns the negation of x, else subtracts
* the ys from x and returns the result.
* @param {...*} var_args
*/
cljs.core._ = (function() {
var _ = null;
var ___2939 = (function (x){
return (- x);
});
var ___2940 = (function (x,y){
return (x - y);
});
var ___2941 = (function() { 
var G__2943__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,_.call(null,x,y),more);
};
var G__2943 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2943__delegate.call(this, x, y, more);
};
G__2943.cljs$lang$maxFixedArity = 2;
G__2943.cljs$lang$applyTo = (function (arglist__2944){
var x = cljs.core.first(arglist__2944);
var y = cljs.core.first(cljs.core.next(arglist__2944));
var more = cljs.core.rest(cljs.core.next(arglist__2944));
return G__2943__delegate.call(this, x, y, more);
});
return G__2943;
})()
;
_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return ___2939.call(this,x);
case  2 :
return ___2940.call(this,x,y);
default:
return ___2941.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_.cljs$lang$maxFixedArity = 2;
_.cljs$lang$applyTo = ___2941.cljs$lang$applyTo;
return _;
})()
;
/**
* Returns the product of nums. (*) returns 1.
* @param {...*} var_args
*/
cljs.core._STAR_ = (function() {
var _STAR_ = null;
var _STAR___2945 = (function (){
return 1;
});
var _STAR___2946 = (function (x){
return x;
});
var _STAR___2947 = (function (x,y){
return (x * y);
});
var _STAR___2948 = (function() { 
var G__2950__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,_STAR_.call(null,x,y),more);
};
var G__2950 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2950__delegate.call(this, x, y, more);
};
G__2950.cljs$lang$maxFixedArity = 2;
G__2950.cljs$lang$applyTo = (function (arglist__2951){
var x = cljs.core.first(arglist__2951);
var y = cljs.core.first(cljs.core.next(arglist__2951));
var more = cljs.core.rest(cljs.core.next(arglist__2951));
return G__2950__delegate.call(this, x, y, more);
});
return G__2950;
})()
;
_STAR_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _STAR___2945.call(this);
case  1 :
return _STAR___2946.call(this,x);
case  2 :
return _STAR___2947.call(this,x,y);
default:
return _STAR___2948.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_STAR_.cljs$lang$maxFixedArity = 2;
_STAR_.cljs$lang$applyTo = _STAR___2948.cljs$lang$applyTo;
return _STAR_;
})()
;
/**
* If no denominators are supplied, returns 1/numerator,
* else returns numerator divided by all of the denominators.
* @param {...*} var_args
*/
cljs.core._SLASH_ = (function() {
var _SLASH_ = null;
var _SLASH___2952 = (function (x){
return (1 / x);
});
var _SLASH___2953 = (function (x,y){
return (x / y);
});
var _SLASH___2954 = (function() { 
var G__2956__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__2956 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2956__delegate.call(this, x, y, more);
};
G__2956.cljs$lang$maxFixedArity = 2;
G__2956.cljs$lang$applyTo = (function (arglist__2957){
var x = cljs.core.first(arglist__2957);
var y = cljs.core.first(cljs.core.next(arglist__2957));
var more = cljs.core.rest(cljs.core.next(arglist__2957));
return G__2956__delegate.call(this, x, y, more);
});
return G__2956;
})()
;
_SLASH_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _SLASH___2952.call(this,x);
case  2 :
return _SLASH___2953.call(this,x,y);
default:
return _SLASH___2954.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_SLASH_.cljs$lang$maxFixedArity = 2;
_SLASH_.cljs$lang$applyTo = _SLASH___2954.cljs$lang$applyTo;
return _SLASH_;
})()
;
/**
* Returns non-nil if nums are in monotonically increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT_ = (function() {
var _LT_ = null;
var _LT___2958 = (function (x){
return true;
});
var _LT___2959 = (function (x,y){
return (x < y);
});
var _LT___2960 = (function() { 
var G__2962__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_LT_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2963 = y;
var G__2964 = cljs.core.first.call(null,more);
var G__2965 = cljs.core.next.call(null,more);
x = G__2963;
y = G__2964;
more = G__2965;
continue;
}
} else
{return _LT_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2962 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2962__delegate.call(this, x, y, more);
};
G__2962.cljs$lang$maxFixedArity = 2;
G__2962.cljs$lang$applyTo = (function (arglist__2966){
var x = cljs.core.first(arglist__2966);
var y = cljs.core.first(cljs.core.next(arglist__2966));
var more = cljs.core.rest(cljs.core.next(arglist__2966));
return G__2962__delegate.call(this, x, y, more);
});
return G__2962;
})()
;
_LT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT___2958.call(this,x);
case  2 :
return _LT___2959.call(this,x,y);
default:
return _LT___2960.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT_.cljs$lang$maxFixedArity = 2;
_LT_.cljs$lang$applyTo = _LT___2960.cljs$lang$applyTo;
return _LT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT__EQ_ = (function() {
var _LT__EQ_ = null;
var _LT__EQ___2967 = (function (x){
return true;
});
var _LT__EQ___2968 = (function (x,y){
return (x <= y);
});
var _LT__EQ___2969 = (function() { 
var G__2971__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_LT__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2972 = y;
var G__2973 = cljs.core.first.call(null,more);
var G__2974 = cljs.core.next.call(null,more);
x = G__2972;
y = G__2973;
more = G__2974;
continue;
}
} else
{return _LT__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2971 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2971__delegate.call(this, x, y, more);
};
G__2971.cljs$lang$maxFixedArity = 2;
G__2971.cljs$lang$applyTo = (function (arglist__2975){
var x = cljs.core.first(arglist__2975);
var y = cljs.core.first(cljs.core.next(arglist__2975));
var more = cljs.core.rest(cljs.core.next(arglist__2975));
return G__2971__delegate.call(this, x, y, more);
});
return G__2971;
})()
;
_LT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT__EQ___2967.call(this,x);
case  2 :
return _LT__EQ___2968.call(this,x,y);
default:
return _LT__EQ___2969.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT__EQ_.cljs$lang$maxFixedArity = 2;
_LT__EQ_.cljs$lang$applyTo = _LT__EQ___2969.cljs$lang$applyTo;
return _LT__EQ_;
})()
;
/**
* Returns non-nil if nums are in monotonically decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT_ = (function() {
var _GT_ = null;
var _GT___2976 = (function (x){
return true;
});
var _GT___2977 = (function (x,y){
return (x > y);
});
var _GT___2978 = (function() { 
var G__2980__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_GT_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2981 = y;
var G__2982 = cljs.core.first.call(null,more);
var G__2983 = cljs.core.next.call(null,more);
x = G__2981;
y = G__2982;
more = G__2983;
continue;
}
} else
{return _GT_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2980 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2980__delegate.call(this, x, y, more);
};
G__2980.cljs$lang$maxFixedArity = 2;
G__2980.cljs$lang$applyTo = (function (arglist__2984){
var x = cljs.core.first(arglist__2984);
var y = cljs.core.first(cljs.core.next(arglist__2984));
var more = cljs.core.rest(cljs.core.next(arglist__2984));
return G__2980__delegate.call(this, x, y, more);
});
return G__2980;
})()
;
_GT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT___2976.call(this,x);
case  2 :
return _GT___2977.call(this,x,y);
default:
return _GT___2978.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT_.cljs$lang$maxFixedArity = 2;
_GT_.cljs$lang$applyTo = _GT___2978.cljs$lang$applyTo;
return _GT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT__EQ_ = (function() {
var _GT__EQ_ = null;
var _GT__EQ___2985 = (function (x){
return true;
});
var _GT__EQ___2986 = (function (x,y){
return (x >= y);
});
var _GT__EQ___2987 = (function() { 
var G__2989__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_GT__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2990 = y;
var G__2991 = cljs.core.first.call(null,more);
var G__2992 = cljs.core.next.call(null,more);
x = G__2990;
y = G__2991;
more = G__2992;
continue;
}
} else
{return _GT__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2989 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2989__delegate.call(this, x, y, more);
};
G__2989.cljs$lang$maxFixedArity = 2;
G__2989.cljs$lang$applyTo = (function (arglist__2993){
var x = cljs.core.first(arglist__2993);
var y = cljs.core.first(cljs.core.next(arglist__2993));
var more = cljs.core.rest(cljs.core.next(arglist__2993));
return G__2989__delegate.call(this, x, y, more);
});
return G__2989;
})()
;
_GT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT__EQ___2985.call(this,x);
case  2 :
return _GT__EQ___2986.call(this,x,y);
default:
return _GT__EQ___2987.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT__EQ_.cljs$lang$maxFixedArity = 2;
_GT__EQ_.cljs$lang$applyTo = _GT__EQ___2987.cljs$lang$applyTo;
return _GT__EQ_;
})()
;
/**
* Returns a number one less than num.
*/
cljs.core.dec = (function dec(x){
return (x - 1);
});
/**
* Returns the greatest of the nums.
* @param {...*} var_args
*/
cljs.core.max = (function() {
var max = null;
var max__2994 = (function (x){
return x;
});
var max__2995 = (function (x,y){
return ((x > y) ? x : y);
});
var max__2996 = (function() { 
var G__2998__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,max.call(null,x,y),more);
};
var G__2998 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2998__delegate.call(this, x, y, more);
};
G__2998.cljs$lang$maxFixedArity = 2;
G__2998.cljs$lang$applyTo = (function (arglist__2999){
var x = cljs.core.first(arglist__2999);
var y = cljs.core.first(cljs.core.next(arglist__2999));
var more = cljs.core.rest(cljs.core.next(arglist__2999));
return G__2998__delegate.call(this, x, y, more);
});
return G__2998;
})()
;
max = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return max__2994.call(this,x);
case  2 :
return max__2995.call(this,x,y);
default:
return max__2996.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max.cljs$lang$maxFixedArity = 2;
max.cljs$lang$applyTo = max__2996.cljs$lang$applyTo;
return max;
})()
;
/**
* Returns the least of the nums.
* @param {...*} var_args
*/
cljs.core.min = (function() {
var min = null;
var min__3000 = (function (x){
return x;
});
var min__3001 = (function (x,y){
return ((x < y) ? x : y);
});
var min__3002 = (function() { 
var G__3004__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,min.call(null,x,y),more);
};
var G__3004 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3004__delegate.call(this, x, y, more);
};
G__3004.cljs$lang$maxFixedArity = 2;
G__3004.cljs$lang$applyTo = (function (arglist__3005){
var x = cljs.core.first(arglist__3005);
var y = cljs.core.first(cljs.core.next(arglist__3005));
var more = cljs.core.rest(cljs.core.next(arglist__3005));
return G__3004__delegate.call(this, x, y, more);
});
return G__3004;
})()
;
min = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return min__3000.call(this,x);
case  2 :
return min__3001.call(this,x,y);
default:
return min__3002.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min.cljs$lang$maxFixedArity = 2;
min.cljs$lang$applyTo = min__3002.cljs$lang$applyTo;
return min;
})()
;
cljs.core.fix = (function fix(q){
if(cljs.core.truth_((q >= 0)))
{return Math.floor.call(null,q);
} else
{return Math.ceil.call(null,q);
}
});
/**
* Modulus of num and div. Truncates toward negative infinity.
*/
cljs.core.mod = (function mod(n,d){
return (n % d);
});
/**
* quot[ient] of dividing numerator by denominator.
*/
cljs.core.quot = (function quot(n,d){
var rem__3006 = (n % d);

return cljs.core.fix.call(null,((n - rem__3006) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__3007 = cljs.core.quot.call(null,n,d);

return (n - (d * q__3007));
});
/**
* Returns a random floating point number between 0 (inclusive) and n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__3008 = (function (){
return Math.random.call(null);
});
var rand__3009 = (function (n){
return (n * rand.call(null));
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__3008.call(this);
case  1 :
return rand__3009.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return cljs.core.fix.call(null,cljs.core.rand.call(null,n));
});
/**
* Bitwise exclusive or
*/
cljs.core.bit_xor = (function bit_xor(x,y){
return (x ^ y);
});
/**
* Bitwise and
*/
cljs.core.bit_and = (function bit_and(x,y){
return (x & y);
});
/**
* Bitwise or
*/
cljs.core.bit_or = (function bit_or(x,y){
return (x | y);
});
/**
* Bitwise and
*/
cljs.core.bit_and_not = (function bit_and_not(x,y){
return (x & ~y);
});
/**
* Clear bit at index n
*/
cljs.core.bit_clear = (function bit_clear(x,n){
return (x & ~(1 << n));
});
/**
* Flip bit at index n
*/
cljs.core.bit_flip = (function bit_flip(x,n){
return (x ^ (1 << n));
});
/**
* Bitwise complement
*/
cljs.core.bit_not = (function bit_not(x){
return (~x);
});
/**
* Set bit at index n
*/
cljs.core.bit_set = (function bit_set(x,n){
return (x | (1 << n));
});
/**
* Test bit at index n
*/
cljs.core.bit_test = (function bit_test(x,n){
return ((x & (1 << n)) != 0);
});
/**
* Bitwise shift left
*/
cljs.core.bit_shift_left = (function bit_shift_left(x,n){
return (x << n);
});
/**
* Bitwise shift right
*/
cljs.core.bit_shift_right = (function bit_shift_right(x,n){
return (x >> n);
});
/**
* Returns non-nil if nums all have the equivalent
* value (type-independent), otherwise false
* @param {...*} var_args
*/
cljs.core._EQ__EQ_ = (function() {
var _EQ__EQ_ = null;
var _EQ__EQ___3011 = (function (x){
return true;
});
var _EQ__EQ___3012 = (function (x,y){
return cljs.core._equiv.call(null,x,y);
});
var _EQ__EQ___3013 = (function() { 
var G__3015__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__3016 = y;
var G__3017 = cljs.core.first.call(null,more);
var G__3018 = cljs.core.next.call(null,more);
x = G__3016;
y = G__3017;
more = G__3018;
continue;
}
} else
{return _EQ__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__3015 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3015__delegate.call(this, x, y, more);
};
G__3015.cljs$lang$maxFixedArity = 2;
G__3015.cljs$lang$applyTo = (function (arglist__3019){
var x = cljs.core.first(arglist__3019);
var y = cljs.core.first(cljs.core.next(arglist__3019));
var more = cljs.core.rest(cljs.core.next(arglist__3019));
return G__3015__delegate.call(this, x, y, more);
});
return G__3015;
})()
;
_EQ__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _EQ__EQ___3011.call(this,x);
case  2 :
return _EQ__EQ___3012.call(this,x,y);
default:
return _EQ__EQ___3013.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_EQ__EQ_.cljs$lang$maxFixedArity = 2;
_EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3013.cljs$lang$applyTo;
return _EQ__EQ_;
})()
;
/**
* Returns true if num is greater than zero, else false
*/
cljs.core.pos_QMARK_ = (function pos_QMARK_(n){
return (0 < n);
});
cljs.core.zero_QMARK_ = (function zero_QMARK_(n){
return (0 === n);
});
/**
* Returns true if num is less than zero, else false
*/
cljs.core.neg_QMARK_ = (function neg_QMARK_(x){
return (x < 0);
});
/**
* Returns the nth next of coll, (seq coll) when n is 0.
*/
cljs.core.nthnext = (function nthnext(coll,n){
var n__3020 = n;
var xs__3021 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3022 = xs__3021;

if(cljs.core.truth_(and__3546__auto____3022))
{return (n__3020 > 0);
} else
{return and__3546__auto____3022;
}
})()))
{{
var G__3023 = (n__3020 - 1);
var G__3024 = cljs.core.next.call(null,xs__3021);
n__3020 = G__3023;
xs__3021 = G__3024;
continue;
}
} else
{return xs__3021;
}
break;
}
});
(cljs.core.IIndexed["_"] = true);
(cljs.core._nth["_"] = (function() {
var G__3029 = null;
var G__3029__3030 = (function (coll,n){
var temp__3695__auto____3025 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____3025))
{var xs__3026 = temp__3695__auto____3025;

return cljs.core.first.call(null,xs__3026);
} else
{throw (new Error("Index out of bounds"));
}
});
var G__3029__3031 = (function (coll,n,not_found){
var temp__3695__auto____3027 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____3027))
{var xs__3028 = temp__3695__auto____3027;

return cljs.core.first.call(null,xs__3028);
} else
{return not_found;
}
});
G__3029 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3029__3030.call(this,coll,n);
case  3 :
return G__3029__3031.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3029;
})()
);
/**
* Internal - do not use!
* @param {...*} var_args
*/
cljs.core.str_STAR_ = (function() {
var str_STAR_ = null;
var str_STAR___3033 = (function (){
return "";
});
var str_STAR___3034 = (function (x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return "";
} else
{if(cljs.core.truth_("﷐'else"))
{return x.toString();
} else
{return null;
}
}
});
var str_STAR___3035 = (function() { 
var G__3037__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__3038 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__3039 = cljs.core.next.call(null,more);
sb = G__3038;
more = G__3039;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__3037 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3037__delegate.call(this, x, ys);
};
G__3037.cljs$lang$maxFixedArity = 1;
G__3037.cljs$lang$applyTo = (function (arglist__3040){
var x = cljs.core.first(arglist__3040);
var ys = cljs.core.rest(arglist__3040);
return G__3037__delegate.call(this, x, ys);
});
return G__3037;
})()
;
str_STAR_ = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str_STAR___3033.call(this);
case  1 :
return str_STAR___3034.call(this,x);
default:
return str_STAR___3035.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str_STAR_.cljs$lang$maxFixedArity = 1;
str_STAR_.cljs$lang$applyTo = str_STAR___3035.cljs$lang$applyTo;
return str_STAR_;
})()
;
/**
* With no args, returns the empty string. With one arg x, returns
* x.toString().  (str nil) returns the empty string. With more than
* one arg, returns the concatenation of the str values of the args.
* @param {...*} var_args
*/
cljs.core.str = (function() {
var str = null;
var str__3041 = (function (){
return "";
});
var str__3042 = (function (x){
if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,x)))
{return x.substring(2,x.length);
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,x)))
{return cljs.core.str_STAR_.call(null,":",x.substring(2,x.length));
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return "";
} else
{if(cljs.core.truth_("﷐'else"))
{return x.toString();
} else
{return null;
}
}
}
}
});
var str__3043 = (function() { 
var G__3045__delegate = function (x,ys){
return cljs.core.apply.call(null,cljs.core.str_STAR_,x,ys);
};
var G__3045 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3045__delegate.call(this, x, ys);
};
G__3045.cljs$lang$maxFixedArity = 1;
G__3045.cljs$lang$applyTo = (function (arglist__3046){
var x = cljs.core.first(arglist__3046);
var ys = cljs.core.rest(arglist__3046);
return G__3045__delegate.call(this, x, ys);
});
return G__3045;
})()
;
str = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str__3041.call(this);
case  1 :
return str__3042.call(this,x);
default:
return str__3043.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str.cljs$lang$maxFixedArity = 1;
str.cljs$lang$applyTo = str__3043.cljs$lang$applyTo;
return str;
})()
;
/**
* Returns the substring of s beginning at start inclusive, and ending
* at end (defaults to length of string), exclusive.
*/
cljs.core.subs = (function() {
var subs = null;
var subs__3047 = (function (s,start){
return s.substring(start);
});
var subs__3048 = (function (s,start,end){
return s.substring(start,end);
});
subs = function(s,start,end){
switch(arguments.length){
case  2 :
return subs__3047.call(this,s,start);
case  3 :
return subs__3048.call(this,s,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
return subs;
})()
;
/**
* Returns a Symbol with the given namespace and name.
*/
cljs.core.symbol = (function() {
var symbol = null;
var symbol__3050 = (function (name){
if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,name)))
{name;
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,name)))
{cljs.core.str_STAR_.call(null,"﷑","'",cljs.core.subs.call(null,name,2));
} else
{}
}
return cljs.core.str_STAR_.call(null,"﷑","'",name);
});
var symbol__3051 = (function (ns,name){
return symbol.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
symbol = function(ns,name){
switch(arguments.length){
case  1 :
return symbol__3050.call(this,ns);
case  2 :
return symbol__3051.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
return symbol;
})()
;
/**
* Returns a Keyword with the given namespace and name.  Do not use :
* in the keyword strings, it will be added automatically.
*/
cljs.core.keyword = (function() {
var keyword = null;
var keyword__3053 = (function (name){
if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,name)))
{return name;
} else
{if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,name)))
{return cljs.core.str_STAR_.call(null,"﷐","'",cljs.core.subs.call(null,name,2));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.str_STAR_.call(null,"﷐","'",name);
} else
{return null;
}
}
}
});
var keyword__3054 = (function (ns,name){
return keyword.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
keyword = function(ns,name){
switch(arguments.length){
case  1 :
return keyword__3053.call(this,ns);
case  2 :
return keyword__3054.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
return keyword;
})()
;
/**
* Assumes x is sequential. Returns true if x equals y, otherwise
* returns false.
*/
cljs.core.equiv_sequential = (function equiv_sequential(x,y){
return cljs.core.boolean$.call(null,(cljs.core.truth_(cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__3056 = cljs.core.seq.call(null,x);
var ys__3057 = cljs.core.seq.call(null,y);

while(true){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,xs__3056)))
{return cljs.core.nil_QMARK_.call(null,ys__3057);
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,ys__3057)))
{return false;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__3056),cljs.core.first.call(null,ys__3057))))
{{
var G__3058 = cljs.core.next.call(null,xs__3056);
var G__3059 = cljs.core.next.call(null,ys__3057);
xs__3056 = G__3058;
ys__3057 = G__3059;
continue;
}
} else
{if(cljs.core.truth_("﷐'else"))
{return false;
} else
{return null;
}
}
}
}
break;
}
})():null));
});
cljs.core.hash_combine = (function hash_combine(seed,hash){
return (seed ^ (((hash + 2654435769) + (seed << 6)) + (seed >> 2)));
});
cljs.core.hash_coll = (function hash_coll(coll){
return cljs.core.reduce.call(null,(function (p1__3060_SHARP_,p2__3061_SHARP_){
return cljs.core.hash_combine.call(null,p1__3060_SHARP_,cljs.core.hash.call(null,p2__3061_SHARP_));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll)),cljs.core.next.call(null,coll));
});
/**
* Takes a JavaScript object and a map of names to functions and
* attaches said functions as methods on the object.  Any references to
* JavaScript's implict this (via the this-as macro) will resolve to the
* object that the function is attached.
*/
cljs.core.extend_object_BANG_ = (function extend_object_BANG_(obj,fn_map){
var G__3062__3063 = cljs.core.seq.call(null,fn_map);

if(cljs.core.truth_(G__3062__3063))
{var G__3065__3067 = cljs.core.first.call(null,G__3062__3063);
var vec__3066__3068 = G__3065__3067;
var key_name__3069 = cljs.core.nth.call(null,vec__3066__3068,0,null);
var f__3070 = cljs.core.nth.call(null,vec__3066__3068,1,null);
var G__3062__3071 = G__3062__3063;

var G__3065__3072 = G__3065__3067;
var G__3062__3073 = G__3062__3071;

while(true){
var vec__3074__3075 = G__3065__3072;
var key_name__3076 = cljs.core.nth.call(null,vec__3074__3075,0,null);
var f__3077 = cljs.core.nth.call(null,vec__3074__3075,1,null);
var G__3062__3078 = G__3062__3073;

var str_name__3079 = cljs.core.name.call(null,key_name__3076);

obj[str_name__3079] = f__3077;
var temp__3698__auto____3080 = cljs.core.next.call(null,G__3062__3078);

if(cljs.core.truth_(temp__3698__auto____3080))
{var G__3062__3081 = temp__3698__auto____3080;

{
var G__3082 = cljs.core.first.call(null,G__3062__3081);
var G__3083 = G__3062__3081;
G__3065__3072 = G__3082;
G__3062__3073 = G__3083;
continue;
}
} else
{}
break;
}
} else
{}
return obj;
});

/**
* @constructor
*/
cljs.core.List = (function (meta,first,rest,count){
this.meta = meta;
this.first = first;
this.rest = rest;
this.count = count;
})
cljs.core.List.prototype.cljs$core$IHash$ = true;
cljs.core.List.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3084 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISequential$ = true;
cljs.core.List.prototype.cljs$core$ICollection$ = true;
cljs.core.List.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3085 = this;
return (new cljs.core.List(this__3085.meta,o,coll,(this__3085.count + 1)));
});
cljs.core.List.prototype.cljs$core$ISeqable$ = true;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3086 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$ = true;
cljs.core.List.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3087 = this;
return this__3087.count;
});
cljs.core.List.prototype.cljs$core$IStack$ = true;
cljs.core.List.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3088 = this;
return this__3088.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3089 = this;
return cljs.core._rest.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISeq$ = true;
cljs.core.List.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3090 = this;
return this__3090.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3091 = this;
return this__3091.rest;
});
cljs.core.List.prototype.cljs$core$IEquiv$ = true;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3092 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$ = true;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3093 = this;
return (new cljs.core.List(meta,this__3093.first,this__3093.rest,this__3093.count));
});
cljs.core.List.prototype.cljs$core$IMeta$ = true;
cljs.core.List.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3094 = this;
return this__3094.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3095 = this;
return cljs.core.List.EMPTY;
});

/**
* @constructor
*/
cljs.core.EmptyList = (function (meta){
this.meta = meta;
})
cljs.core.EmptyList.prototype.cljs$core$IHash$ = true;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3096 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3097 = this;
return (new cljs.core.List(this__3097.meta,o,null,1));
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3098 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3099 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$ = true;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3100 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3101 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3102 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3103 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3104 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3105 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3106 = this;
return this__3106.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3107 = this;
return coll;
});
cljs.core.List.EMPTY = (new cljs.core.EmptyList(null));
/**
* Returns a seq of the items in coll in reverse order. Not lazy.
*/
cljs.core.reverse = (function reverse(coll){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,coll);
});
/**
* @param {...*} var_args
*/
cljs.core.list = (function() { 
var list__delegate = function (items){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,cljs.core.reverse.call(null,items));
};
var list = function (var_args){
var items = null;
if (goog.isDef(var_args)) {
  items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return list__delegate.call(this, items);
};
list.cljs$lang$maxFixedArity = 0;
list.cljs$lang$applyTo = (function (arglist__3108){
var items = cljs.core.seq( arglist__3108 );;
return list__delegate.call(this, items);
});
return list;
})()
;

/**
* @constructor
*/
cljs.core.Cons = (function (meta,first,rest){
this.meta = meta;
this.first = first;
this.rest = rest;
})
cljs.core.Cons.prototype.cljs$core$ISeqable$ = true;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3109 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$IHash$ = true;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3110 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Cons.prototype.cljs$core$IEquiv$ = true;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3111 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$ISequential$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3112 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3112.meta);
});
cljs.core.Cons.prototype.cljs$core$ICollection$ = true;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3113 = this;
return (new cljs.core.Cons(null,o,coll));
});
cljs.core.Cons.prototype.cljs$core$ISeq$ = true;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3114 = this;
return this__3114.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3115 = this;
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,this__3115.rest)))
{return cljs.core.List.EMPTY;
} else
{return this__3115.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3116 = this;
return this__3116.meta;
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3117 = this;
return (new cljs.core.Cons(meta,this__3117.first,this__3117.rest));
});
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,seq){
return (new cljs.core.Cons(null,x,seq));
});
(cljs.core.IReduce["string"] = true);
(cljs.core._reduce["string"] = (function() {
var G__3118 = null;
var G__3118__3119 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__3118__3120 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__3118 = function(string,f,start){
switch(arguments.length){
case  2 :
return G__3118__3119.call(this,string,f);
case  3 :
return G__3118__3120.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3118;
})()
);
(cljs.core.ILookup["string"] = true);
(cljs.core._lookup["string"] = (function() {
var G__3122 = null;
var G__3122__3123 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__3122__3124 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__3122 = function(string,k,not_found){
switch(arguments.length){
case  2 :
return G__3122__3123.call(this,string,k);
case  3 :
return G__3122__3124.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3122;
})()
);
(cljs.core.IIndexed["string"] = true);
(cljs.core._nth["string"] = (function() {
var G__3126 = null;
var G__3126__3127 = (function (string,n){
if(cljs.core.truth_((n < cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return null;
}
});
var G__3126__3128 = (function (string,n,not_found){
if(cljs.core.truth_((n < cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return not_found;
}
});
G__3126 = function(string,n,not_found){
switch(arguments.length){
case  2 :
return G__3126__3127.call(this,string,n);
case  3 :
return G__3126__3128.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3126;
})()
);
(cljs.core.ICounted["string"] = true);
(cljs.core._count["string"] = (function (s){
return s.length;
}));
(cljs.core.ISeqable["string"] = true);
(cljs.core._seq["string"] = (function (string){
return cljs.core.prim_seq.call(null,string,0);
}));
(cljs.core.IHash["string"] = true);
(cljs.core._hash["string"] = (function (o){
return goog.string.hashCode.call(null,o);
}));
String['prototype']['call'] = (function() {
var G__3130 = null;
var G__3130__3131 = (function (_,coll){
return cljs.core.get.call(null,coll,this.toString());
});
var G__3130__3132 = (function (_,coll,not_found){
return cljs.core.get.call(null,coll,this.toString(),not_found);
});
G__3130 = function(_,coll,not_found){
switch(arguments.length){
case  2 :
return G__3130__3131.call(this,_,coll);
case  3 :
return G__3130__3132.call(this,_,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3130;
})()
;
String['prototype']['apply'] = (function (s,args){
if(cljs.core.truth_((cljs.core.count.call(null,args) < 2)))
{return cljs.core.get.call(null,(args[0]),s);
} else
{return cljs.core.get.call(null,(args[0]),s,(args[1]));
}
});
cljs.core.lazy_seq_value = (function lazy_seq_value(lazy_seq){
var x__3134 = lazy_seq.x;

if(cljs.core.truth_(lazy_seq.realized))
{return x__3134;
} else
{lazy_seq.x = x__3134.call(null);
lazy_seq.realized = true;
return lazy_seq.x;
}
});

/**
* @constructor
*/
cljs.core.LazySeq = (function (meta,realized,x){
this.meta = meta;
this.realized = realized;
this.x = x;
})
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3135 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IHash$ = true;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3136 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3137 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3138 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3138.meta);
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3139 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3140 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3141 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3142 = this;
return this__3142.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3143 = this;
return (new cljs.core.LazySeq(meta,this__3143.realized,this__3143.x));
});
/**
* Naive impl of to-array as a start.
*/
cljs.core.to_array = (function to_array(s){
var ary__3144 = cljs.core.array.call(null);

var s__3145 = s;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__3145)))
{ary__3144.push(cljs.core.first.call(null,s__3145));
{
var G__3146 = cljs.core.next.call(null,s__3145);
s__3145 = G__3146;
continue;
}
} else
{return ary__3144;
}
break;
}
});
cljs.core.bounded_count = (function bounded_count(s,n){
var s__3147 = s;
var i__3148 = n;
var sum__3149 = 0;

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3150 = (i__3148 > 0);

if(cljs.core.truth_(and__3546__auto____3150))
{return cljs.core.seq.call(null,s__3147);
} else
{return and__3546__auto____3150;
}
})()))
{{
var G__3151 = cljs.core.next.call(null,s__3147);
var G__3152 = (i__3148 - 1);
var G__3153 = (sum__3149 + 1);
s__3147 = G__3151;
i__3148 = G__3152;
sum__3149 = G__3153;
continue;
}
} else
{return sum__3149;
}
break;
}
});
cljs.core.spread = (function spread(arglist){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,arglist)))
{return null;
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.next.call(null,arglist))))
{return cljs.core.seq.call(null,cljs.core.first.call(null,arglist));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.cons.call(null,cljs.core.first.call(null,arglist),spread.call(null,cljs.core.next.call(null,arglist)));
} else
{return null;
}
}
}
});
/**
* Returns a lazy seq representing the concatenation of the elements in the supplied colls.
* @param {...*} var_args
*/
cljs.core.concat = (function() {
var concat = null;
var concat__3157 = (function (){
return (new cljs.core.LazySeq(null,false,(function (){
return null;
})));
});
var concat__3158 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return x;
})));
});
var concat__3159 = (function (x,y){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3154 = cljs.core.seq.call(null,x);

if(cljs.core.truth_(s__3154))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__3154),concat.call(null,cljs.core.rest.call(null,s__3154),y));
} else
{return y;
}
})));
});
var concat__3160 = (function() { 
var G__3162__delegate = function (x,y,zs){
var cat__3156 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__3155 = cljs.core.seq.call(null,xys);

if(cljs.core.truth_(xys__3155))
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__3155),cat.call(null,cljs.core.rest.call(null,xys__3155),zs));
} else
{if(cljs.core.truth_(zs))
{return cat.call(null,cljs.core.first.call(null,zs),cljs.core.next.call(null,zs));
} else
{return null;
}
}
})));
});

return cat__3156.call(null,concat.call(null,x,y),zs);
};
var G__3162 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3162__delegate.call(this, x, y, zs);
};
G__3162.cljs$lang$maxFixedArity = 2;
G__3162.cljs$lang$applyTo = (function (arglist__3163){
var x = cljs.core.first(arglist__3163);
var y = cljs.core.first(cljs.core.next(arglist__3163));
var zs = cljs.core.rest(cljs.core.next(arglist__3163));
return G__3162__delegate.call(this, x, y, zs);
});
return G__3162;
})()
;
concat = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return concat__3157.call(this);
case  1 :
return concat__3158.call(this,x);
case  2 :
return concat__3159.call(this,x,y);
default:
return concat__3160.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
concat.cljs$lang$maxFixedArity = 2;
concat.cljs$lang$applyTo = concat__3160.cljs$lang$applyTo;
return concat;
})()
;
/**
* Creates a new list containing the items prepended to the rest, the
* last of which will be treated as a sequence.
* @param {...*} var_args
*/
cljs.core.list_STAR_ = (function() {
var list_STAR_ = null;
var list_STAR___3164 = (function (args){
return cljs.core.seq.call(null,args);
});
var list_STAR___3165 = (function (a,args){
return cljs.core.cons.call(null,a,args);
});
var list_STAR___3166 = (function (a,b,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,args));
});
var list_STAR___3167 = (function (a,b,c,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,args)));
});
var list_STAR___3168 = (function() { 
var G__3170__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__3170 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3170__delegate.call(this, a, b, c, d, more);
};
G__3170.cljs$lang$maxFixedArity = 4;
G__3170.cljs$lang$applyTo = (function (arglist__3171){
var a = cljs.core.first(arglist__3171);
var b = cljs.core.first(cljs.core.next(arglist__3171));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3171)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3171))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3171))));
return G__3170__delegate.call(this, a, b, c, d, more);
});
return G__3170;
})()
;
list_STAR_ = function(a,b,c,d,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return list_STAR___3164.call(this,a);
case  2 :
return list_STAR___3165.call(this,a,b);
case  3 :
return list_STAR___3166.call(this,a,b,c);
case  4 :
return list_STAR___3167.call(this,a,b,c,d);
default:
return list_STAR___3168.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
list_STAR_.cljs$lang$maxFixedArity = 4;
list_STAR_.cljs$lang$applyTo = list_STAR___3168.cljs$lang$applyTo;
return list_STAR_;
})()
;
/**
* Applies fn f to the argument list formed by prepending intervening arguments to args.
* First cut.  Not lazy.  Needs to use emitted toApply.
* @param {...*} var_args
*/
cljs.core.apply = (function() {
var apply = null;
var apply__3181 = (function (f,args){
var fixed_arity__3172 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,args,(fixed_arity__3172 + 1)) <= fixed_arity__3172)))
{return f.apply(f,cljs.core.to_array.call(null,args));
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__3182 = (function (f,x,args){
var arglist__3173 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__3174 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3173,fixed_arity__3174) <= fixed_arity__3174)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3173));
} else
{return f.cljs$lang$applyTo(arglist__3173);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3173));
}
});
var apply__3183 = (function (f,x,y,args){
var arglist__3175 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__3176 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3175,fixed_arity__3176) <= fixed_arity__3176)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3175));
} else
{return f.cljs$lang$applyTo(arglist__3175);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3175));
}
});
var apply__3184 = (function (f,x,y,z,args){
var arglist__3177 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__3178 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3177,fixed_arity__3178) <= fixed_arity__3178)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3177));
} else
{return f.cljs$lang$applyTo(arglist__3177);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3177));
}
});
var apply__3185 = (function() { 
var G__3187__delegate = function (f,a,b,c,d,args){
var arglist__3179 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__3180 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_((cljs.core.bounded_count.call(null,arglist__3179,fixed_arity__3180) <= fixed_arity__3180)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__3179));
} else
{return f.cljs$lang$applyTo(arglist__3179);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__3179));
}
};
var G__3187 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__3187__delegate.call(this, f, a, b, c, d, args);
};
G__3187.cljs$lang$maxFixedArity = 5;
G__3187.cljs$lang$applyTo = (function (arglist__3188){
var f = cljs.core.first(arglist__3188);
var a = cljs.core.first(cljs.core.next(arglist__3188));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3188)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3188))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3188)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3188)))));
return G__3187__delegate.call(this, f, a, b, c, d, args);
});
return G__3187;
})()
;
apply = function(f,a,b,c,d,var_args){
var args = var_args;
switch(arguments.length){
case  2 :
return apply__3181.call(this,f,a);
case  3 :
return apply__3182.call(this,f,a,b);
case  4 :
return apply__3183.call(this,f,a,b,c);
case  5 :
return apply__3184.call(this,f,a,b,c,d);
default:
return apply__3185.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
apply.cljs$lang$maxFixedArity = 5;
apply.cljs$lang$applyTo = apply__3185.cljs$lang$applyTo;
return apply;
})()
;
/**
* Returns an object of the same type and value as obj, with
* (apply f (meta obj) args) as its metadata.
* @param {...*} var_args
*/
cljs.core.vary_meta = (function() { 
var vary_meta__delegate = function (obj,f,args){
return cljs.core.with_meta.call(null,obj,cljs.core.apply.call(null,f,cljs.core.meta.call(null,obj),args));
};
var vary_meta = function (obj,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return vary_meta__delegate.call(this, obj, f, args);
};
vary_meta.cljs$lang$maxFixedArity = 2;
vary_meta.cljs$lang$applyTo = (function (arglist__3189){
var obj = cljs.core.first(arglist__3189);
var f = cljs.core.first(cljs.core.next(arglist__3189));
var args = cljs.core.rest(cljs.core.next(arglist__3189));
return vary_meta__delegate.call(this, obj, f, args);
});
return vary_meta;
})()
;
/**
* Same as (not (= obj1 obj2))
* @param {...*} var_args
*/
cljs.core.not_EQ_ = (function() {
var not_EQ_ = null;
var not_EQ___3190 = (function (x){
return false;
});
var not_EQ___3191 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var not_EQ___3192 = (function() { 
var G__3194__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__3194 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3194__delegate.call(this, x, y, more);
};
G__3194.cljs$lang$maxFixedArity = 2;
G__3194.cljs$lang$applyTo = (function (arglist__3195){
var x = cljs.core.first(arglist__3195);
var y = cljs.core.first(cljs.core.next(arglist__3195));
var more = cljs.core.rest(cljs.core.next(arglist__3195));
return G__3194__delegate.call(this, x, y, more);
});
return G__3194;
})()
;
not_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return not_EQ___3190.call(this,x);
case  2 :
return not_EQ___3191.call(this,x,y);
default:
return not_EQ___3192.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
not_EQ_.cljs$lang$maxFixedArity = 2;
not_EQ_.cljs$lang$applyTo = not_EQ___3192.cljs$lang$applyTo;
return not_EQ_;
})()
;
/**
* If coll is empty, returns nil, else coll
*/
cljs.core.not_empty = (function not_empty(coll){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{return coll;
} else
{return null;
}
});
/**
* Returns true if (pred x) is logical true for every x in coll, else
* false.
*/
cljs.core.every_QMARK_ = (function every_QMARK_(pred,coll){
while(true){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.seq.call(null,coll))))
{return true;
} else
{if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,coll))))
{{
var G__3196 = pred;
var G__3197 = cljs.core.next.call(null,coll);
pred = G__3196;
coll = G__3197;
continue;
}
} else
{if(cljs.core.truth_("﷐'else"))
{return false;
} else
{return null;
}
}
}
break;
}
});
/**
* Returns false if (pred x) is logical true for every x in
* coll, else true.
*/
cljs.core.not_every_QMARK_ = (function not_every_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.every_QMARK_.call(null,pred,coll));
});
/**
* Returns the first logical true value of (pred x) for any x in coll,
* else nil.  One common idiom is to use a set as pred, for example
* this will return :fred if :fred is in the sequence, otherwise nil:
* (some #{:fred} coll)
*/
cljs.core.some = (function some(pred,coll){
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{var or__3548__auto____3198 = pred.call(null,cljs.core.first.call(null,coll));

if(cljs.core.truth_(or__3548__auto____3198))
{return or__3548__auto____3198;
} else
{{
var G__3199 = pred;
var G__3200 = cljs.core.next.call(null,coll);
pred = G__3199;
coll = G__3200;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Returns false if (pred x) is logical true for any x in coll,
* else true.
*/
cljs.core.not_any_QMARK_ = (function not_any_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.some.call(null,pred,coll));
});
/**
* Returns true if n is even, throws an exception if n is not an integer
*/
cljs.core.even_QMARK_ = (function even_QMARK_(n){
if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null,n)))
{return ((n & 1) === 0);
} else
{throw (new Error(cljs.core.str.call(null,"Argument must be an integer: ",n)));
}
});
/**
* Returns true if n is odd, throws an exception if n is not an integer
*/
cljs.core.odd_QMARK_ = (function odd_QMARK_(n){
return cljs.core.not.call(null,cljs.core.even_QMARK_.call(null,n));
});
cljs.core.identity = (function identity(x){
return x;
});
/**
* Takes a fn f and returns a fn that takes the same arguments as f,
* has the same effects, if any, and returns the opposite truth value.
*/
cljs.core.complement = (function complement(f){
return (function() {
var G__3201 = null;
var G__3201__3202 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__3201__3203 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__3201__3204 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__3201__3205 = (function() { 
var G__3207__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__3207 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3207__delegate.call(this, x, y, zs);
};
G__3207.cljs$lang$maxFixedArity = 2;
G__3207.cljs$lang$applyTo = (function (arglist__3208){
var x = cljs.core.first(arglist__3208);
var y = cljs.core.first(cljs.core.next(arglist__3208));
var zs = cljs.core.rest(cljs.core.next(arglist__3208));
return G__3207__delegate.call(this, x, y, zs);
});
return G__3207;
})()
;
G__3201 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return G__3201__3202.call(this);
case  1 :
return G__3201__3203.call(this,x);
case  2 :
return G__3201__3204.call(this,x,y);
default:
return G__3201__3205.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3201.cljs$lang$maxFixedArity = 2;
G__3201.cljs$lang$applyTo = G__3201__3205.cljs$lang$applyTo;
return G__3201;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__3209__delegate = function (args){
return x;
};
var G__3209 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3209__delegate.call(this, args);
};
G__3209.cljs$lang$maxFixedArity = 0;
G__3209.cljs$lang$applyTo = (function (arglist__3210){
var args = cljs.core.seq( arglist__3210 );;
return G__3209__delegate.call(this, args);
});
return G__3209;
})()
;
});
/**
* Takes a set of functions and returns a fn that is the composition
* of those fns.  The returned fn takes a variable number of args,
* applies the rightmost of fns to the args, the next
* fn (right-to-left) to the result, etc.
* @param {...*} var_args
*/
cljs.core.comp = (function() {
var comp = null;
var comp__3214 = (function (){
return cljs.core.identity;
});
var comp__3215 = (function (f){
return f;
});
var comp__3216 = (function (f,g){
return (function() {
var G__3220 = null;
var G__3220__3221 = (function (){
return f.call(null,g.call(null));
});
var G__3220__3222 = (function (x){
return f.call(null,g.call(null,x));
});
var G__3220__3223 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__3220__3224 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__3220__3225 = (function() { 
var G__3227__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__3227 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3227__delegate.call(this, x, y, z, args);
};
G__3227.cljs$lang$maxFixedArity = 3;
G__3227.cljs$lang$applyTo = (function (arglist__3228){
var x = cljs.core.first(arglist__3228);
var y = cljs.core.first(cljs.core.next(arglist__3228));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3228)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3228)));
return G__3227__delegate.call(this, x, y, z, args);
});
return G__3227;
})()
;
G__3220 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3220__3221.call(this);
case  1 :
return G__3220__3222.call(this,x);
case  2 :
return G__3220__3223.call(this,x,y);
case  3 :
return G__3220__3224.call(this,x,y,z);
default:
return G__3220__3225.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3220.cljs$lang$maxFixedArity = 3;
G__3220.cljs$lang$applyTo = G__3220__3225.cljs$lang$applyTo;
return G__3220;
})()
});
var comp__3217 = (function (f,g,h){
return (function() {
var G__3229 = null;
var G__3229__3230 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__3229__3231 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__3229__3232 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__3229__3233 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__3229__3234 = (function() { 
var G__3236__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__3236 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3236__delegate.call(this, x, y, z, args);
};
G__3236.cljs$lang$maxFixedArity = 3;
G__3236.cljs$lang$applyTo = (function (arglist__3237){
var x = cljs.core.first(arglist__3237);
var y = cljs.core.first(cljs.core.next(arglist__3237));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3237)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3237)));
return G__3236__delegate.call(this, x, y, z, args);
});
return G__3236;
})()
;
G__3229 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3229__3230.call(this);
case  1 :
return G__3229__3231.call(this,x);
case  2 :
return G__3229__3232.call(this,x,y);
case  3 :
return G__3229__3233.call(this,x,y,z);
default:
return G__3229__3234.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3229.cljs$lang$maxFixedArity = 3;
G__3229.cljs$lang$applyTo = G__3229__3234.cljs$lang$applyTo;
return G__3229;
})()
});
var comp__3218 = (function() { 
var G__3238__delegate = function (f1,f2,f3,fs){
var fs__3211 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));

return (function() { 
var G__3239__delegate = function (args){
var ret__3212 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__3211),args);
var fs__3213 = cljs.core.next.call(null,fs__3211);

while(true){
if(cljs.core.truth_(fs__3213))
{{
var G__3240 = cljs.core.first.call(null,fs__3213).call(null,ret__3212);
var G__3241 = cljs.core.next.call(null,fs__3213);
ret__3212 = G__3240;
fs__3213 = G__3241;
continue;
}
} else
{return ret__3212;
}
break;
}
};
var G__3239 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3239__delegate.call(this, args);
};
G__3239.cljs$lang$maxFixedArity = 0;
G__3239.cljs$lang$applyTo = (function (arglist__3242){
var args = cljs.core.seq( arglist__3242 );;
return G__3239__delegate.call(this, args);
});
return G__3239;
})()
;
};
var G__3238 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3238__delegate.call(this, f1, f2, f3, fs);
};
G__3238.cljs$lang$maxFixedArity = 3;
G__3238.cljs$lang$applyTo = (function (arglist__3243){
var f1 = cljs.core.first(arglist__3243);
var f2 = cljs.core.first(cljs.core.next(arglist__3243));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3243)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3243)));
return G__3238__delegate.call(this, f1, f2, f3, fs);
});
return G__3238;
})()
;
comp = function(f1,f2,f3,var_args){
var fs = var_args;
switch(arguments.length){
case  0 :
return comp__3214.call(this);
case  1 :
return comp__3215.call(this,f1);
case  2 :
return comp__3216.call(this,f1,f2);
case  3 :
return comp__3217.call(this,f1,f2,f3);
default:
return comp__3218.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
comp.cljs$lang$maxFixedArity = 3;
comp.cljs$lang$applyTo = comp__3218.cljs$lang$applyTo;
return comp;
})()
;
/**
* Takes a function f and fewer than the normal arguments to f, and
* returns a fn that takes a variable number of additional args. When
* called, the returned function calls f with args + additional args.
* @param {...*} var_args
*/
cljs.core.partial = (function() {
var partial = null;
var partial__3244 = (function (f,arg1){
return (function() { 
var G__3249__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__3249 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3249__delegate.call(this, args);
};
G__3249.cljs$lang$maxFixedArity = 0;
G__3249.cljs$lang$applyTo = (function (arglist__3250){
var args = cljs.core.seq( arglist__3250 );;
return G__3249__delegate.call(this, args);
});
return G__3249;
})()
;
});
var partial__3245 = (function (f,arg1,arg2){
return (function() { 
var G__3251__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__3251 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3251__delegate.call(this, args);
};
G__3251.cljs$lang$maxFixedArity = 0;
G__3251.cljs$lang$applyTo = (function (arglist__3252){
var args = cljs.core.seq( arglist__3252 );;
return G__3251__delegate.call(this, args);
});
return G__3251;
})()
;
});
var partial__3246 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__3253__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__3253 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3253__delegate.call(this, args);
};
G__3253.cljs$lang$maxFixedArity = 0;
G__3253.cljs$lang$applyTo = (function (arglist__3254){
var args = cljs.core.seq( arglist__3254 );;
return G__3253__delegate.call(this, args);
});
return G__3253;
})()
;
});
var partial__3247 = (function() { 
var G__3255__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__3256__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__3256 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3256__delegate.call(this, args);
};
G__3256.cljs$lang$maxFixedArity = 0;
G__3256.cljs$lang$applyTo = (function (arglist__3257){
var args = cljs.core.seq( arglist__3257 );;
return G__3256__delegate.call(this, args);
});
return G__3256;
})()
;
};
var G__3255 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3255__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__3255.cljs$lang$maxFixedArity = 4;
G__3255.cljs$lang$applyTo = (function (arglist__3258){
var f = cljs.core.first(arglist__3258);
var arg1 = cljs.core.first(cljs.core.next(arglist__3258));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3258)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3258))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3258))));
return G__3255__delegate.call(this, f, arg1, arg2, arg3, more);
});
return G__3255;
})()
;
partial = function(f,arg1,arg2,arg3,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return partial__3244.call(this,f,arg1);
case  3 :
return partial__3245.call(this,f,arg1,arg2);
case  4 :
return partial__3246.call(this,f,arg1,arg2,arg3);
default:
return partial__3247.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
partial.cljs$lang$maxFixedArity = 4;
partial.cljs$lang$applyTo = partial__3247.cljs$lang$applyTo;
return partial;
})()
;
/**
* Takes a function f, and returns a function that calls f, replacing
* a nil first argument to f with the supplied value x. Higher arity
* versions can replace arguments in the second and third
* positions (y, z). Note that the function f can take any number of
* arguments, not just the one(s) being nil-patched.
*/
cljs.core.fnil = (function() {
var fnil = null;
var fnil__3259 = (function (f,x){
return (function() {
var G__3263 = null;
var G__3263__3264 = (function (a){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a));
});
var G__3263__3265 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b);
});
var G__3263__3266 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c);
});
var G__3263__3267 = (function() { 
var G__3269__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c,ds);
};
var G__3269 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3269__delegate.call(this, a, b, c, ds);
};
G__3269.cljs$lang$maxFixedArity = 3;
G__3269.cljs$lang$applyTo = (function (arglist__3270){
var a = cljs.core.first(arglist__3270);
var b = cljs.core.first(cljs.core.next(arglist__3270));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3270)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3270)));
return G__3269__delegate.call(this, a, b, c, ds);
});
return G__3269;
})()
;
G__3263 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  1 :
return G__3263__3264.call(this,a);
case  2 :
return G__3263__3265.call(this,a,b);
case  3 :
return G__3263__3266.call(this,a,b,c);
default:
return G__3263__3267.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3263.cljs$lang$maxFixedArity = 3;
G__3263.cljs$lang$applyTo = G__3263__3267.cljs$lang$applyTo;
return G__3263;
})()
});
var fnil__3260 = (function (f,x,y){
return (function() {
var G__3271 = null;
var G__3271__3272 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__3271__3273 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c);
});
var G__3271__3274 = (function() { 
var G__3276__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c,ds);
};
var G__3276 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3276__delegate.call(this, a, b, c, ds);
};
G__3276.cljs$lang$maxFixedArity = 3;
G__3276.cljs$lang$applyTo = (function (arglist__3277){
var a = cljs.core.first(arglist__3277);
var b = cljs.core.first(cljs.core.next(arglist__3277));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3277)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3277)));
return G__3276__delegate.call(this, a, b, c, ds);
});
return G__3276;
})()
;
G__3271 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__3271__3272.call(this,a,b);
case  3 :
return G__3271__3273.call(this,a,b,c);
default:
return G__3271__3274.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3271.cljs$lang$maxFixedArity = 3;
G__3271.cljs$lang$applyTo = G__3271__3274.cljs$lang$applyTo;
return G__3271;
})()
});
var fnil__3261 = (function (f,x,y,z){
return (function() {
var G__3278 = null;
var G__3278__3279 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__3278__3280 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c));
});
var G__3278__3281 = (function() { 
var G__3283__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c),ds);
};
var G__3283 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3283__delegate.call(this, a, b, c, ds);
};
G__3283.cljs$lang$maxFixedArity = 3;
G__3283.cljs$lang$applyTo = (function (arglist__3284){
var a = cljs.core.first(arglist__3284);
var b = cljs.core.first(cljs.core.next(arglist__3284));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3284)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3284)));
return G__3283__delegate.call(this, a, b, c, ds);
});
return G__3283;
})()
;
G__3278 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__3278__3279.call(this,a,b);
case  3 :
return G__3278__3280.call(this,a,b,c);
default:
return G__3278__3281.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3278.cljs$lang$maxFixedArity = 3;
G__3278.cljs$lang$applyTo = G__3278__3281.cljs$lang$applyTo;
return G__3278;
})()
});
fnil = function(f,x,y,z){
switch(arguments.length){
case  2 :
return fnil__3259.call(this,f,x);
case  3 :
return fnil__3260.call(this,f,x,y);
case  4 :
return fnil__3261.call(this,f,x,y,z);
}
throw('Invalid arity: ' + arguments.length);
};
return fnil;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to 0
* and the first item of coll, followed by applying f to 1 and the second
* item in coll, etc, until coll is exhausted. Thus function f should
* accept 2 arguments, index and item.
*/
cljs.core.map_indexed = (function map_indexed(f,coll){
var mapi__3287 = (function mpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3285 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3285))
{var s__3286 = temp__3698__auto____3285;

return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__3286)),mpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3286)));
} else
{return null;
}
})));
});

return mapi__3287.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3288 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3288))
{var s__3289 = temp__3698__auto____3288;

var x__3290 = f.call(null,cljs.core.first.call(null,s__3289));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__3290)))
{return keep.call(null,f,cljs.core.rest.call(null,s__3289));
} else
{return cljs.core.cons.call(null,x__3290,keep.call(null,f,cljs.core.rest.call(null,s__3289)));
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of the non-nil results of (f index item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep_indexed = (function keep_indexed(f,coll){
var keepi__3300 = (function kpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3297 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3297))
{var s__3298 = temp__3698__auto____3297;

var x__3299 = f.call(null,idx,cljs.core.first.call(null,s__3298));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__3299)))
{return kpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3298));
} else
{return cljs.core.cons.call(null,x__3299,kpi.call(null,(idx + 1),cljs.core.rest.call(null,s__3298)));
}
} else
{return null;
}
})));
});

return keepi__3300.call(null,0,coll);
});
/**
* Takes a set of predicates and returns a function f that returns true if all of its
* composing predicates return a logical true value against all of its arguments, else it returns
* false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical false result against the original predicates.
* @param {...*} var_args
*/
cljs.core.every_pred = (function() {
var every_pred = null;
var every_pred__3345 = (function (p){
return (function() {
var ep1 = null;
var ep1__3350 = (function (){
return true;
});
var ep1__3351 = (function (x){
return cljs.core.boolean$.call(null,p.call(null,x));
});
var ep1__3352 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3307 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____3307))
{return p.call(null,y);
} else
{return and__3546__auto____3307;
}
})());
});
var ep1__3353 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3308 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____3308))
{var and__3546__auto____3309 = p.call(null,y);

if(cljs.core.truth_(and__3546__auto____3309))
{return p.call(null,z);
} else
{return and__3546__auto____3309;
}
} else
{return and__3546__auto____3308;
}
})());
});
var ep1__3354 = (function() { 
var G__3356__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3310 = ep1.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3310))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3546__auto____3310;
}
})());
};
var G__3356 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3356__delegate.call(this, x, y, z, args);
};
G__3356.cljs$lang$maxFixedArity = 3;
G__3356.cljs$lang$applyTo = (function (arglist__3357){
var x = cljs.core.first(arglist__3357);
var y = cljs.core.first(cljs.core.next(arglist__3357));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3357)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3357)));
return G__3356__delegate.call(this, x, y, z, args);
});
return G__3356;
})()
;
ep1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep1__3350.call(this);
case  1 :
return ep1__3351.call(this,x);
case  2 :
return ep1__3352.call(this,x,y);
case  3 :
return ep1__3353.call(this,x,y,z);
default:
return ep1__3354.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep1.cljs$lang$maxFixedArity = 3;
ep1.cljs$lang$applyTo = ep1__3354.cljs$lang$applyTo;
return ep1;
})()
});
var every_pred__3346 = (function (p1,p2){
return (function() {
var ep2 = null;
var ep2__3358 = (function (){
return true;
});
var ep2__3359 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3311 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3311))
{return p2.call(null,x);
} else
{return and__3546__auto____3311;
}
})());
});
var ep2__3360 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3312 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3312))
{var and__3546__auto____3313 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3313))
{var and__3546__auto____3314 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3314))
{return p2.call(null,y);
} else
{return and__3546__auto____3314;
}
} else
{return and__3546__auto____3313;
}
} else
{return and__3546__auto____3312;
}
})());
});
var ep2__3361 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3315 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3315))
{var and__3546__auto____3316 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3316))
{var and__3546__auto____3317 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____3317))
{var and__3546__auto____3318 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3318))
{var and__3546__auto____3319 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3319))
{return p2.call(null,z);
} else
{return and__3546__auto____3319;
}
} else
{return and__3546__auto____3318;
}
} else
{return and__3546__auto____3317;
}
} else
{return and__3546__auto____3316;
}
} else
{return and__3546__auto____3315;
}
})());
});
var ep2__3362 = (function() { 
var G__3364__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3320 = ep2.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3320))
{return cljs.core.every_QMARK_.call(null,(function (p1__3291_SHARP_){
var and__3546__auto____3321 = p1.call(null,p1__3291_SHARP_);

if(cljs.core.truth_(and__3546__auto____3321))
{return p2.call(null,p1__3291_SHARP_);
} else
{return and__3546__auto____3321;
}
}),args);
} else
{return and__3546__auto____3320;
}
})());
};
var G__3364 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3364__delegate.call(this, x, y, z, args);
};
G__3364.cljs$lang$maxFixedArity = 3;
G__3364.cljs$lang$applyTo = (function (arglist__3365){
var x = cljs.core.first(arglist__3365);
var y = cljs.core.first(cljs.core.next(arglist__3365));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3365)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3365)));
return G__3364__delegate.call(this, x, y, z, args);
});
return G__3364;
})()
;
ep2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep2__3358.call(this);
case  1 :
return ep2__3359.call(this,x);
case  2 :
return ep2__3360.call(this,x,y);
case  3 :
return ep2__3361.call(this,x,y,z);
default:
return ep2__3362.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep2.cljs$lang$maxFixedArity = 3;
ep2.cljs$lang$applyTo = ep2__3362.cljs$lang$applyTo;
return ep2;
})()
});
var every_pred__3347 = (function (p1,p2,p3){
return (function() {
var ep3 = null;
var ep3__3366 = (function (){
return true;
});
var ep3__3367 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3322 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3322))
{var and__3546__auto____3323 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3323))
{return p3.call(null,x);
} else
{return and__3546__auto____3323;
}
} else
{return and__3546__auto____3322;
}
})());
});
var ep3__3368 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3324 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3324))
{var and__3546__auto____3325 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3325))
{var and__3546__auto____3326 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____3326))
{var and__3546__auto____3327 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3327))
{var and__3546__auto____3328 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3328))
{return p3.call(null,y);
} else
{return and__3546__auto____3328;
}
} else
{return and__3546__auto____3327;
}
} else
{return and__3546__auto____3326;
}
} else
{return and__3546__auto____3325;
}
} else
{return and__3546__auto____3324;
}
})());
});
var ep3__3369 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3329 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____3329))
{var and__3546__auto____3330 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____3330))
{var and__3546__auto____3331 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____3331))
{var and__3546__auto____3332 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____3332))
{var and__3546__auto____3333 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____3333))
{var and__3546__auto____3334 = p3.call(null,y);

if(cljs.core.truth_(and__3546__auto____3334))
{var and__3546__auto____3335 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____3335))
{var and__3546__auto____3336 = p2.call(null,z);

if(cljs.core.truth_(and__3546__auto____3336))
{return p3.call(null,z);
} else
{return and__3546__auto____3336;
}
} else
{return and__3546__auto____3335;
}
} else
{return and__3546__auto____3334;
}
} else
{return and__3546__auto____3333;
}
} else
{return and__3546__auto____3332;
}
} else
{return and__3546__auto____3331;
}
} else
{return and__3546__auto____3330;
}
} else
{return and__3546__auto____3329;
}
})());
});
var ep3__3370 = (function() { 
var G__3372__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3337 = ep3.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3337))
{return cljs.core.every_QMARK_.call(null,(function (p1__3292_SHARP_){
var and__3546__auto____3338 = p1.call(null,p1__3292_SHARP_);

if(cljs.core.truth_(and__3546__auto____3338))
{var and__3546__auto____3339 = p2.call(null,p1__3292_SHARP_);

if(cljs.core.truth_(and__3546__auto____3339))
{return p3.call(null,p1__3292_SHARP_);
} else
{return and__3546__auto____3339;
}
} else
{return and__3546__auto____3338;
}
}),args);
} else
{return and__3546__auto____3337;
}
})());
};
var G__3372 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3372__delegate.call(this, x, y, z, args);
};
G__3372.cljs$lang$maxFixedArity = 3;
G__3372.cljs$lang$applyTo = (function (arglist__3373){
var x = cljs.core.first(arglist__3373);
var y = cljs.core.first(cljs.core.next(arglist__3373));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3373)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3373)));
return G__3372__delegate.call(this, x, y, z, args);
});
return G__3372;
})()
;
ep3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep3__3366.call(this);
case  1 :
return ep3__3367.call(this,x);
case  2 :
return ep3__3368.call(this,x,y);
case  3 :
return ep3__3369.call(this,x,y,z);
default:
return ep3__3370.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep3.cljs$lang$maxFixedArity = 3;
ep3.cljs$lang$applyTo = ep3__3370.cljs$lang$applyTo;
return ep3;
})()
});
var every_pred__3348 = (function() { 
var G__3374__delegate = function (p1,p2,p3,ps){
var ps__3340 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var epn = null;
var epn__3375 = (function (){
return true;
});
var epn__3376 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__3293_SHARP_){
return p1__3293_SHARP_.call(null,x);
}),ps__3340);
});
var epn__3377 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__3294_SHARP_){
var and__3546__auto____3341 = p1__3294_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____3341))
{return p1__3294_SHARP_.call(null,y);
} else
{return and__3546__auto____3341;
}
}),ps__3340);
});
var epn__3378 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__3295_SHARP_){
var and__3546__auto____3342 = p1__3295_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____3342))
{var and__3546__auto____3343 = p1__3295_SHARP_.call(null,y);

if(cljs.core.truth_(and__3546__auto____3343))
{return p1__3295_SHARP_.call(null,z);
} else
{return and__3546__auto____3343;
}
} else
{return and__3546__auto____3342;
}
}),ps__3340);
});
var epn__3379 = (function() { 
var G__3381__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____3344 = epn.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____3344))
{return cljs.core.every_QMARK_.call(null,(function (p1__3296_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__3296_SHARP_,args);
}),ps__3340);
} else
{return and__3546__auto____3344;
}
})());
};
var G__3381 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3381__delegate.call(this, x, y, z, args);
};
G__3381.cljs$lang$maxFixedArity = 3;
G__3381.cljs$lang$applyTo = (function (arglist__3382){
var x = cljs.core.first(arglist__3382);
var y = cljs.core.first(cljs.core.next(arglist__3382));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3382)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3382)));
return G__3381__delegate.call(this, x, y, z, args);
});
return G__3381;
})()
;
epn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return epn__3375.call(this);
case  1 :
return epn__3376.call(this,x);
case  2 :
return epn__3377.call(this,x,y);
case  3 :
return epn__3378.call(this,x,y,z);
default:
return epn__3379.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
epn.cljs$lang$maxFixedArity = 3;
epn.cljs$lang$applyTo = epn__3379.cljs$lang$applyTo;
return epn;
})()
};
var G__3374 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3374__delegate.call(this, p1, p2, p3, ps);
};
G__3374.cljs$lang$maxFixedArity = 3;
G__3374.cljs$lang$applyTo = (function (arglist__3383){
var p1 = cljs.core.first(arglist__3383);
var p2 = cljs.core.first(cljs.core.next(arglist__3383));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3383)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3383)));
return G__3374__delegate.call(this, p1, p2, p3, ps);
});
return G__3374;
})()
;
every_pred = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return every_pred__3345.call(this,p1);
case  2 :
return every_pred__3346.call(this,p1,p2);
case  3 :
return every_pred__3347.call(this,p1,p2,p3);
default:
return every_pred__3348.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
every_pred.cljs$lang$maxFixedArity = 3;
every_pred.cljs$lang$applyTo = every_pred__3348.cljs$lang$applyTo;
return every_pred;
})()
;
/**
* Takes a set of predicates and returns a function f that returns the first logical true value
* returned by one of its composing predicates against any of its arguments, else it returns
* logical false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical true result against the original predicates.
* @param {...*} var_args
*/
cljs.core.some_fn = (function() {
var some_fn = null;
var some_fn__3423 = (function (p){
return (function() {
var sp1 = null;
var sp1__3428 = (function (){
return null;
});
var sp1__3429 = (function (x){
return p.call(null,x);
});
var sp1__3430 = (function (x,y){
var or__3548__auto____3385 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____3385))
{return or__3548__auto____3385;
} else
{return p.call(null,y);
}
});
var sp1__3431 = (function (x,y,z){
var or__3548__auto____3386 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____3386))
{return or__3548__auto____3386;
} else
{var or__3548__auto____3387 = p.call(null,y);

if(cljs.core.truth_(or__3548__auto____3387))
{return or__3548__auto____3387;
} else
{return p.call(null,z);
}
}
});
var sp1__3432 = (function() { 
var G__3434__delegate = function (x,y,z,args){
var or__3548__auto____3388 = sp1.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3388))
{return or__3548__auto____3388;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__3434 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3434__delegate.call(this, x, y, z, args);
};
G__3434.cljs$lang$maxFixedArity = 3;
G__3434.cljs$lang$applyTo = (function (arglist__3435){
var x = cljs.core.first(arglist__3435);
var y = cljs.core.first(cljs.core.next(arglist__3435));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3435)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3435)));
return G__3434__delegate.call(this, x, y, z, args);
});
return G__3434;
})()
;
sp1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp1__3428.call(this);
case  1 :
return sp1__3429.call(this,x);
case  2 :
return sp1__3430.call(this,x,y);
case  3 :
return sp1__3431.call(this,x,y,z);
default:
return sp1__3432.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp1.cljs$lang$maxFixedArity = 3;
sp1.cljs$lang$applyTo = sp1__3432.cljs$lang$applyTo;
return sp1;
})()
});
var some_fn__3424 = (function (p1,p2){
return (function() {
var sp2 = null;
var sp2__3436 = (function (){
return null;
});
var sp2__3437 = (function (x){
var or__3548__auto____3389 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3389))
{return or__3548__auto____3389;
} else
{return p2.call(null,x);
}
});
var sp2__3438 = (function (x,y){
var or__3548__auto____3390 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3390))
{return or__3548__auto____3390;
} else
{var or__3548__auto____3391 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3391))
{return or__3548__auto____3391;
} else
{var or__3548__auto____3392 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3392))
{return or__3548__auto____3392;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3439 = (function (x,y,z){
var or__3548__auto____3393 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3393))
{return or__3548__auto____3393;
} else
{var or__3548__auto____3394 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3394))
{return or__3548__auto____3394;
} else
{var or__3548__auto____3395 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____3395))
{return or__3548__auto____3395;
} else
{var or__3548__auto____3396 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3396))
{return or__3548__auto____3396;
} else
{var or__3548__auto____3397 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3397))
{return or__3548__auto____3397;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__3440 = (function() { 
var G__3442__delegate = function (x,y,z,args){
var or__3548__auto____3398 = sp2.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3398))
{return or__3548__auto____3398;
} else
{return cljs.core.some.call(null,(function (p1__3301_SHARP_){
var or__3548__auto____3399 = p1.call(null,p1__3301_SHARP_);

if(cljs.core.truth_(or__3548__auto____3399))
{return or__3548__auto____3399;
} else
{return p2.call(null,p1__3301_SHARP_);
}
}),args);
}
};
var G__3442 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3442__delegate.call(this, x, y, z, args);
};
G__3442.cljs$lang$maxFixedArity = 3;
G__3442.cljs$lang$applyTo = (function (arglist__3443){
var x = cljs.core.first(arglist__3443);
var y = cljs.core.first(cljs.core.next(arglist__3443));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3443)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3443)));
return G__3442__delegate.call(this, x, y, z, args);
});
return G__3442;
})()
;
sp2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp2__3436.call(this);
case  1 :
return sp2__3437.call(this,x);
case  2 :
return sp2__3438.call(this,x,y);
case  3 :
return sp2__3439.call(this,x,y,z);
default:
return sp2__3440.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp2.cljs$lang$maxFixedArity = 3;
sp2.cljs$lang$applyTo = sp2__3440.cljs$lang$applyTo;
return sp2;
})()
});
var some_fn__3425 = (function (p1,p2,p3){
return (function() {
var sp3 = null;
var sp3__3444 = (function (){
return null;
});
var sp3__3445 = (function (x){
var or__3548__auto____3400 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3400))
{return or__3548__auto____3400;
} else
{var or__3548__auto____3401 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3401))
{return or__3548__auto____3401;
} else
{return p3.call(null,x);
}
}
});
var sp3__3446 = (function (x,y){
var or__3548__auto____3402 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3402))
{return or__3548__auto____3402;
} else
{var or__3548__auto____3403 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3403))
{return or__3548__auto____3403;
} else
{var or__3548__auto____3404 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____3404))
{return or__3548__auto____3404;
} else
{var or__3548__auto____3405 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3405))
{return or__3548__auto____3405;
} else
{var or__3548__auto____3406 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3406))
{return or__3548__auto____3406;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3447 = (function (x,y,z){
var or__3548__auto____3407 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____3407))
{return or__3548__auto____3407;
} else
{var or__3548__auto____3408 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____3408))
{return or__3548__auto____3408;
} else
{var or__3548__auto____3409 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____3409))
{return or__3548__auto____3409;
} else
{var or__3548__auto____3410 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____3410))
{return or__3548__auto____3410;
} else
{var or__3548__auto____3411 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____3411))
{return or__3548__auto____3411;
} else
{var or__3548__auto____3412 = p3.call(null,y);

if(cljs.core.truth_(or__3548__auto____3412))
{return or__3548__auto____3412;
} else
{var or__3548__auto____3413 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____3413))
{return or__3548__auto____3413;
} else
{var or__3548__auto____3414 = p2.call(null,z);

if(cljs.core.truth_(or__3548__auto____3414))
{return or__3548__auto____3414;
} else
{return p3.call(null,z);
}
}
}
}
}
}
}
}
});
var sp3__3448 = (function() { 
var G__3450__delegate = function (x,y,z,args){
var or__3548__auto____3415 = sp3.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3415))
{return or__3548__auto____3415;
} else
{return cljs.core.some.call(null,(function (p1__3302_SHARP_){
var or__3548__auto____3416 = p1.call(null,p1__3302_SHARP_);

if(cljs.core.truth_(or__3548__auto____3416))
{return or__3548__auto____3416;
} else
{var or__3548__auto____3417 = p2.call(null,p1__3302_SHARP_);

if(cljs.core.truth_(or__3548__auto____3417))
{return or__3548__auto____3417;
} else
{return p3.call(null,p1__3302_SHARP_);
}
}
}),args);
}
};
var G__3450 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3450__delegate.call(this, x, y, z, args);
};
G__3450.cljs$lang$maxFixedArity = 3;
G__3450.cljs$lang$applyTo = (function (arglist__3451){
var x = cljs.core.first(arglist__3451);
var y = cljs.core.first(cljs.core.next(arglist__3451));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3451)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3451)));
return G__3450__delegate.call(this, x, y, z, args);
});
return G__3450;
})()
;
sp3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp3__3444.call(this);
case  1 :
return sp3__3445.call(this,x);
case  2 :
return sp3__3446.call(this,x,y);
case  3 :
return sp3__3447.call(this,x,y,z);
default:
return sp3__3448.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp3.cljs$lang$maxFixedArity = 3;
sp3.cljs$lang$applyTo = sp3__3448.cljs$lang$applyTo;
return sp3;
})()
});
var some_fn__3426 = (function() { 
var G__3452__delegate = function (p1,p2,p3,ps){
var ps__3418 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var spn = null;
var spn__3453 = (function (){
return null;
});
var spn__3454 = (function (x){
return cljs.core.some.call(null,(function (p1__3303_SHARP_){
return p1__3303_SHARP_.call(null,x);
}),ps__3418);
});
var spn__3455 = (function (x,y){
return cljs.core.some.call(null,(function (p1__3304_SHARP_){
var or__3548__auto____3419 = p1__3304_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3419))
{return or__3548__auto____3419;
} else
{return p1__3304_SHARP_.call(null,y);
}
}),ps__3418);
});
var spn__3456 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__3305_SHARP_){
var or__3548__auto____3420 = p1__3305_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3420))
{return or__3548__auto____3420;
} else
{var or__3548__auto____3421 = p1__3305_SHARP_.call(null,y);

if(cljs.core.truth_(or__3548__auto____3421))
{return or__3548__auto____3421;
} else
{return p1__3305_SHARP_.call(null,z);
}
}
}),ps__3418);
});
var spn__3457 = (function() { 
var G__3459__delegate = function (x,y,z,args){
var or__3548__auto____3422 = spn.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3422))
{return or__3548__auto____3422;
} else
{return cljs.core.some.call(null,(function (p1__3306_SHARP_){
return cljs.core.some.call(null,p1__3306_SHARP_,args);
}),ps__3418);
}
};
var G__3459 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3459__delegate.call(this, x, y, z, args);
};
G__3459.cljs$lang$maxFixedArity = 3;
G__3459.cljs$lang$applyTo = (function (arglist__3460){
var x = cljs.core.first(arglist__3460);
var y = cljs.core.first(cljs.core.next(arglist__3460));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3460)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3460)));
return G__3459__delegate.call(this, x, y, z, args);
});
return G__3459;
})()
;
spn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return spn__3453.call(this);
case  1 :
return spn__3454.call(this,x);
case  2 :
return spn__3455.call(this,x,y);
case  3 :
return spn__3456.call(this,x,y,z);
default:
return spn__3457.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
spn.cljs$lang$maxFixedArity = 3;
spn.cljs$lang$applyTo = spn__3457.cljs$lang$applyTo;
return spn;
})()
};
var G__3452 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3452__delegate.call(this, p1, p2, p3, ps);
};
G__3452.cljs$lang$maxFixedArity = 3;
G__3452.cljs$lang$applyTo = (function (arglist__3461){
var p1 = cljs.core.first(arglist__3461);
var p2 = cljs.core.first(cljs.core.next(arglist__3461));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3461)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3461)));
return G__3452__delegate.call(this, p1, p2, p3, ps);
});
return G__3452;
})()
;
some_fn = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return some_fn__3423.call(this,p1);
case  2 :
return some_fn__3424.call(this,p1,p2);
case  3 :
return some_fn__3425.call(this,p1,p2,p3);
default:
return some_fn__3426.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
some_fn.cljs$lang$maxFixedArity = 3;
some_fn.cljs$lang$applyTo = some_fn__3426.cljs$lang$applyTo;
return some_fn;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.map = (function() {
var map = null;
var map__3474 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3462 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3462))
{var s__3463 = temp__3698__auto____3462;

return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__3463)),map.call(null,f,cljs.core.rest.call(null,s__3463)));
} else
{return null;
}
})));
});
var map__3475 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3464 = cljs.core.seq.call(null,c1);
var s2__3465 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3466 = s1__3464;

if(cljs.core.truth_(and__3546__auto____3466))
{return s2__3465;
} else
{return and__3546__auto____3466;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3464),cljs.core.first.call(null,s2__3465)),map.call(null,f,cljs.core.rest.call(null,s1__3464),cljs.core.rest.call(null,s2__3465)));
} else
{return null;
}
})));
});
var map__3476 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3467 = cljs.core.seq.call(null,c1);
var s2__3468 = cljs.core.seq.call(null,c2);
var s3__3469 = cljs.core.seq.call(null,c3);

if(cljs.core.truth_((function (){var and__3546__auto____3470 = s1__3467;

if(cljs.core.truth_(and__3546__auto____3470))
{var and__3546__auto____3471 = s2__3468;

if(cljs.core.truth_(and__3546__auto____3471))
{return s3__3469;
} else
{return and__3546__auto____3471;
}
} else
{return and__3546__auto____3470;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3467),cljs.core.first.call(null,s2__3468),cljs.core.first.call(null,s3__3469)),map.call(null,f,cljs.core.rest.call(null,s1__3467),cljs.core.rest.call(null,s2__3468),cljs.core.rest.call(null,s3__3469)));
} else
{return null;
}
})));
});
var map__3477 = (function() { 
var G__3479__delegate = function (f,c1,c2,c3,colls){
var step__3473 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3472 = map.call(null,cljs.core.seq,cs);

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3472)))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__3472),step.call(null,map.call(null,cljs.core.rest,ss__3472)));
} else
{return null;
}
})));
});

return map.call(null,(function (p1__3384_SHARP_){
return cljs.core.apply.call(null,f,p1__3384_SHARP_);
}),step__3473.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__3479 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3479__delegate.call(this, f, c1, c2, c3, colls);
};
G__3479.cljs$lang$maxFixedArity = 4;
G__3479.cljs$lang$applyTo = (function (arglist__3480){
var f = cljs.core.first(arglist__3480);
var c1 = cljs.core.first(cljs.core.next(arglist__3480));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3480)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3480))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3480))));
return G__3479__delegate.call(this, f, c1, c2, c3, colls);
});
return G__3479;
})()
;
map = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return map__3474.call(this,f,c1);
case  3 :
return map__3475.call(this,f,c1,c2);
case  4 :
return map__3476.call(this,f,c1,c2,c3);
default:
return map__3477.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
map.cljs$lang$maxFixedArity = 4;
map.cljs$lang$applyTo = map__3477.cljs$lang$applyTo;
return map;
})()
;
/**
* Returns a lazy sequence of the first n items in coll, or all items if
* there are fewer than n.
*/
cljs.core.take = (function take(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
if(cljs.core.truth_((n > 0)))
{var temp__3698__auto____3481 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3481))
{var s__3482 = temp__3698__auto____3481;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__3482),take.call(null,(n - 1),cljs.core.rest.call(null,s__3482)));
} else
{return null;
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of all but the first n items in coll.
*/
cljs.core.drop = (function drop(n,coll){
var step__3485 = (function (n,coll){
while(true){
var s__3483 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3484 = (n > 0);

if(cljs.core.truth_(and__3546__auto____3484))
{return s__3483;
} else
{return and__3546__auto____3484;
}
})()))
{{
var G__3486 = (n - 1);
var G__3487 = cljs.core.rest.call(null,s__3483);
n = G__3486;
coll = G__3487;
continue;
}
} else
{return s__3483;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3485.call(null,n,coll);
})));
});
/**
* Return a lazy sequence of all but the last n (default 1) items in coll
*/
cljs.core.drop_last = (function() {
var drop_last = null;
var drop_last__3488 = (function (s){
return drop_last.call(null,1,s);
});
var drop_last__3489 = (function (n,s){
return cljs.core.map.call(null,(function (x,_){
return x;
}),s,cljs.core.drop.call(null,n,s));
});
drop_last = function(n,s){
switch(arguments.length){
case  1 :
return drop_last__3488.call(this,n);
case  2 :
return drop_last__3489.call(this,n,s);
}
throw('Invalid arity: ' + arguments.length);
};
return drop_last;
})()
;
/**
* Returns a seq of the last n items in coll.  Depending on the type
* of coll may be no better than linear time.  For vectors, see also subvec.
*/
cljs.core.take_last = (function take_last(n,coll){
var s__3491 = cljs.core.seq.call(null,coll);
var lead__3492 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));

while(true){
if(cljs.core.truth_(lead__3492))
{{
var G__3493 = cljs.core.next.call(null,s__3491);
var G__3494 = cljs.core.next.call(null,lead__3492);
s__3491 = G__3493;
lead__3492 = G__3494;
continue;
}
} else
{return s__3491;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__3497 = (function (pred,coll){
while(true){
var s__3495 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3496 = s__3495;

if(cljs.core.truth_(and__3546__auto____3496))
{return pred.call(null,cljs.core.first.call(null,s__3495));
} else
{return and__3546__auto____3496;
}
})()))
{{
var G__3498 = pred;
var G__3499 = cljs.core.rest.call(null,s__3495);
pred = G__3498;
coll = G__3499;
continue;
}
} else
{return s__3495;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3497.call(null,pred,coll);
})));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3500 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3500))
{var s__3501 = temp__3698__auto____3500;

return cljs.core.concat.call(null,s__3501,cycle.call(null,s__3501));
} else
{return null;
}
})));
});
/**
* Returns a vector of [(take n coll) (drop n coll)]
*/
cljs.core.split_at = (function split_at(n,coll){
return cljs.core.Vector.fromArray([cljs.core.take.call(null,n,coll),cljs.core.drop.call(null,n,coll)]);
});
/**
* Returns a lazy (infinite!, or length n if supplied) sequence of xs.
*/
cljs.core.repeat = (function() {
var repeat = null;
var repeat__3502 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,x,repeat.call(null,x));
})));
});
var repeat__3503 = (function (n,x){
return cljs.core.take.call(null,n,repeat.call(null,x));
});
repeat = function(n,x){
switch(arguments.length){
case  1 :
return repeat__3502.call(this,n);
case  2 :
return repeat__3503.call(this,n,x);
}
throw('Invalid arity: ' + arguments.length);
};
return repeat;
})()
;
/**
* Returns a lazy seq of n xs.
*/
cljs.core.replicate = (function replicate(n,x){
return cljs.core.take.call(null,n,cljs.core.repeat.call(null,x));
});
/**
* Takes a function of no args, presumably with side effects, and
* returns an infinite (or length n if supplied) lazy sequence of calls
* to it
*/
cljs.core.repeatedly = (function() {
var repeatedly = null;
var repeatedly__3505 = (function (f){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,f.call(null),repeatedly.call(null,f));
})));
});
var repeatedly__3506 = (function (n,f){
return cljs.core.take.call(null,n,repeatedly.call(null,f));
});
repeatedly = function(n,f){
switch(arguments.length){
case  1 :
return repeatedly__3505.call(this,n);
case  2 :
return repeatedly__3506.call(this,n,f);
}
throw('Invalid arity: ' + arguments.length);
};
return repeatedly;
})()
;
/**
* Returns a lazy sequence of x, (f x), (f (f x)) etc. f must be free of side-effects
*/
cljs.core.iterate = (function iterate(f,x){
return cljs.core.cons.call(null,x,(new cljs.core.LazySeq(null,false,(function (){
return iterate.call(null,f,f.call(null,x));
}))));
});
/**
* Returns a lazy seq of the first item in each coll, then the second etc.
* @param {...*} var_args
*/
cljs.core.interleave = (function() {
var interleave = null;
var interleave__3512 = (function (c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3508 = cljs.core.seq.call(null,c1);
var s2__3509 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3510 = s1__3508;

if(cljs.core.truth_(and__3546__auto____3510))
{return s2__3509;
} else
{return and__3546__auto____3510;
}
})()))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__3508),cljs.core.cons.call(null,cljs.core.first.call(null,s2__3509),interleave.call(null,cljs.core.rest.call(null,s1__3508),cljs.core.rest.call(null,s2__3509))));
} else
{return null;
}
})));
});
var interleave__3513 = (function() { 
var G__3515__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3511 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3511)))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__3511),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__3511)));
} else
{return null;
}
})));
};
var G__3515 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3515__delegate.call(this, c1, c2, colls);
};
G__3515.cljs$lang$maxFixedArity = 2;
G__3515.cljs$lang$applyTo = (function (arglist__3516){
var c1 = cljs.core.first(arglist__3516);
var c2 = cljs.core.first(cljs.core.next(arglist__3516));
var colls = cljs.core.rest(cljs.core.next(arglist__3516));
return G__3515__delegate.call(this, c1, c2, colls);
});
return G__3515;
})()
;
interleave = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return interleave__3512.call(this,c1,c2);
default:
return interleave__3513.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
interleave.cljs$lang$maxFixedArity = 2;
interleave.cljs$lang$applyTo = interleave__3513.cljs$lang$applyTo;
return interleave;
})()
;
/**
* Returns a lazy seq of the elements of coll separated by sep
*/
cljs.core.interpose = (function interpose(sep,coll){
return cljs.core.drop.call(null,1,cljs.core.interleave.call(null,cljs.core.repeat.call(null,sep),coll));
});
/**
* Take a collection of collections, and return a lazy seq
* of items from the inner collection
*/
cljs.core.flatten1 = (function flatten1(colls){
var cat__3519 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____3517 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3517))
{var coll__3518 = temp__3695__auto____3517;

return cljs.core.cons.call(null,cljs.core.first.call(null,coll__3518),cat.call(null,cljs.core.rest.call(null,coll__3518),colls));
} else
{if(cljs.core.truth_(cljs.core.seq.call(null,colls)))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
})));
});

return cat__3519.call(null,null,colls);
});
/**
* Returns the result of applying concat to the result of applying map
* to f and colls.  Thus function f should return a collection.
* @param {...*} var_args
*/
cljs.core.mapcat = (function() {
var mapcat = null;
var mapcat__3520 = (function (f,coll){
return cljs.core.flatten1.call(null,cljs.core.map.call(null,f,coll));
});
var mapcat__3521 = (function() { 
var G__3523__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__3523 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3523__delegate.call(this, f, coll, colls);
};
G__3523.cljs$lang$maxFixedArity = 2;
G__3523.cljs$lang$applyTo = (function (arglist__3524){
var f = cljs.core.first(arglist__3524);
var coll = cljs.core.first(cljs.core.next(arglist__3524));
var colls = cljs.core.rest(cljs.core.next(arglist__3524));
return G__3523__delegate.call(this, f, coll, colls);
});
return G__3523;
})()
;
mapcat = function(f,coll,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return mapcat__3520.call(this,f,coll);
default:
return mapcat__3521.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
mapcat.cljs$lang$maxFixedArity = 2;
mapcat.cljs$lang$applyTo = mapcat__3521.cljs$lang$applyTo;
return mapcat;
})()
;
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filter = (function filter(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3525 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3525))
{var s__3526 = temp__3698__auto____3525;

var f__3527 = cljs.core.first.call(null,s__3526);
var r__3528 = cljs.core.rest.call(null,s__3526);

if(cljs.core.truth_(pred.call(null,f__3527)))
{return cljs.core.cons.call(null,f__3527,filter.call(null,pred,r__3528));
} else
{return filter.call(null,pred,r__3528);
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns false. pred must be free of side-effects.
*/
cljs.core.remove = (function remove(pred,coll){
return cljs.core.filter.call(null,cljs.core.complement.call(null,pred),coll);
});
/**
* Returns a lazy sequence of the nodes in a tree, via a depth-first walk.
* branch? must be a fn of one arg that returns true if passed a node
* that can have children (but may not).  children must be a fn of one
* arg that returns a sequence of the children. Will only be called on
* nodes for which branch? returns true. Root is the root node of the
* tree.
*/
cljs.core.tree_seq = (function tree_seq(branch_QMARK_,children,root){
var walk__3530 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
})));
});

return walk__3530.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__3529_SHARP_){
return cljs.core.not.call(null,cljs.core.sequential_QMARK_.call(null,p1__3529_SHARP_));
}),cljs.core.rest.call(null,cljs.core.tree_seq.call(null,cljs.core.sequential_QMARK_,cljs.core.seq,x)));
});
/**
* Returns a new coll consisting of to-coll with all of the items of
* from-coll conjoined.
*/
cljs.core.into = (function into(to,from){
return cljs.core.reduce.call(null,cljs.core._conj,to,from);
});
/**
* Returns a lazy sequence of lists of n items each, at offsets step
* apart. If step is not supplied, defaults to n, i.e. the partitions
* do not overlap. If a pad collection is supplied, use its elements as
* necessary to complete last partition upto n items. In case there are
* not enough padding elements, return a partition with less than n items.
*/
cljs.core.partition = (function() {
var partition = null;
var partition__3537 = (function (n,coll){
return partition.call(null,n,n,coll);
});
var partition__3538 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3531 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3531))
{var s__3532 = temp__3698__auto____3531;

var p__3533 = cljs.core.take.call(null,n,s__3532);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3533))))
{return cljs.core.cons.call(null,p__3533,partition.call(null,n,step,cljs.core.drop.call(null,step,s__3532)));
} else
{return null;
}
} else
{return null;
}
})));
});
var partition__3539 = (function (n,step,pad,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3534 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3534))
{var s__3535 = temp__3698__auto____3534;

var p__3536 = cljs.core.take.call(null,n,s__3535);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3536))))
{return cljs.core.cons.call(null,p__3536,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__3535)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__3536,pad)));
}
} else
{return null;
}
})));
});
partition = function(n,step,pad,coll){
switch(arguments.length){
case  2 :
return partition__3537.call(this,n,step);
case  3 :
return partition__3538.call(this,n,step,pad);
case  4 :
return partition__3539.call(this,n,step,pad,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return partition;
})()
;
/**
* Returns the value in a nested associative structure,
* where ks is a sequence of ke(ys. Returns nil if the key is not present,
* or the not-found value if supplied.
*/
cljs.core.get_in = (function() {
var get_in = null;
var get_in__3545 = (function (m,ks){
return cljs.core.reduce.call(null,cljs.core.get,m,ks);
});
var get_in__3546 = (function (m,ks,not_found){
var sentinel__3541 = cljs.core.lookup_sentinel;
var m__3542 = m;
var ks__3543 = cljs.core.seq.call(null,ks);

while(true){
if(cljs.core.truth_(ks__3543))
{var m__3544 = cljs.core.get.call(null,m__3542,cljs.core.first.call(null,ks__3543),sentinel__3541);

if(cljs.core.truth_((sentinel__3541 === m__3544)))
{return not_found;
} else
{{
var G__3548 = sentinel__3541;
var G__3549 = m__3544;
var G__3550 = cljs.core.next.call(null,ks__3543);
sentinel__3541 = G__3548;
m__3542 = G__3549;
ks__3543 = G__3550;
continue;
}
}
} else
{return m__3542;
}
break;
}
});
get_in = function(m,ks,not_found){
switch(arguments.length){
case  2 :
return get_in__3545.call(this,m,ks);
case  3 :
return get_in__3546.call(this,m,ks,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return get_in;
})()
;
/**
* Associates a value in a nested associative structure, where ks is a
* sequence of keys and v is the new value and returns a new nested structure.
* If any levels do not exist, hash-maps will be created.
*/
cljs.core.assoc_in = (function assoc_in(m,p__3551,v){
var vec__3552__3553 = p__3551;
var k__3554 = cljs.core.nth.call(null,vec__3552__3553,0,null);
var ks__3555 = cljs.core.nthnext.call(null,vec__3552__3553,1);

if(cljs.core.truth_(ks__3555))
{return cljs.core.assoc.call(null,m,k__3554,assoc_in.call(null,cljs.core.get.call(null,m,k__3554),ks__3555,v));
} else
{return cljs.core.assoc.call(null,m,k__3554,v);
}
});
/**
* 'Updates' a value in a nested associative structure, where ks is a
* sequence of keys and f is a function that will take the old value
* and any supplied args and return the new value, and returns a new
* nested structure.  If any levels do not exist, hash-maps will be
* created.
* @param {...*} var_args
*/
cljs.core.update_in = (function() { 
var update_in__delegate = function (m,p__3556,f,args){
var vec__3557__3558 = p__3556;
var k__3559 = cljs.core.nth.call(null,vec__3557__3558,0,null);
var ks__3560 = cljs.core.nthnext.call(null,vec__3557__3558,1);

if(cljs.core.truth_(ks__3560))
{return cljs.core.assoc.call(null,m,k__3559,cljs.core.apply.call(null,update_in,cljs.core.get.call(null,m,k__3559),ks__3560,f,args));
} else
{return cljs.core.assoc.call(null,m,k__3559,cljs.core.apply.call(null,f,cljs.core.get.call(null,m,k__3559),args));
}
};
var update_in = function (m,p__3556,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__3556, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__3561){
var m = cljs.core.first(arglist__3561);
var p__3556 = cljs.core.first(cljs.core.next(arglist__3561));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3561)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3561)));
return update_in__delegate.call(this, m, p__3556, f, args);
});
return update_in;
})()
;

/**
* @constructor
*/
cljs.core.Vector = (function (meta,array){
this.meta = meta;
this.array = array;
})
cljs.core.Vector.prototype.cljs$core$IHash$ = true;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3562 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Vector.prototype.cljs$core$ILookup$ = true;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3587 = null;
var G__3587__3588 = (function (coll,k){
var this__3563 = this;
return cljs.core._nth.call(null,coll,k,null);
});
var G__3587__3589 = (function (coll,k,not_found){
var this__3564 = this;
return cljs.core._nth.call(null,coll,k,not_found);
});
G__3587 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3587__3588.call(this,coll,k);
case  3 :
return G__3587__3589.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3587;
})()
;
cljs.core.Vector.prototype.cljs$core$IAssociative$ = true;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3565 = this;
var new_array__3566 = cljs.core.aclone.call(null,this__3565.array);

(new_array__3566[k] = v);
return (new cljs.core.Vector(this__3565.meta,new_array__3566));
});
cljs.core.Vector.prototype.cljs$core$ISequential$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3567 = this;
var new_array__3568 = cljs.core.aclone.call(null,this__3567.array);

new_array__3568.push(o);
return (new cljs.core.Vector(this__3567.meta,new_array__3568));
});
cljs.core.Vector.prototype.cljs$core$IReduce$ = true;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3591 = null;
var G__3591__3592 = (function (v,f){
var this__3569 = this;
return cljs.core.ci_reduce.call(null,this__3569.array,f);
});
var G__3591__3593 = (function (v,f,start){
var this__3570 = this;
return cljs.core.ci_reduce.call(null,this__3570.array,f,start);
});
G__3591 = function(v,f,start){
switch(arguments.length){
case  2 :
return G__3591__3592.call(this,v,f);
case  3 :
return G__3591__3593.call(this,v,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3591;
})()
;
cljs.core.Vector.prototype.cljs$core$ISeqable$ = true;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3571 = this;
if(cljs.core.truth_((this__3571.array.length > 0)))
{var vector_seq__3572 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if(cljs.core.truth_((i < this__3571.array.length)))
{return cljs.core.cons.call(null,(this__3571.array[i]),vector_seq.call(null,(i + 1)));
} else
{return null;
}
})));
});

return vector_seq__3572.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$ = true;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3573 = this;
return this__3573.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$ = true;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3574 = this;
var count__3575 = this__3574.array.length;

if(cljs.core.truth_((count__3575 > 0)))
{return (this__3574.array[(count__3575 - 1)]);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3576 = this;
if(cljs.core.truth_((this__3576.array.length > 0)))
{var new_array__3577 = cljs.core.aclone.call(null,this__3576.array);

new_array__3577.pop();
return (new cljs.core.Vector(this__3576.meta,new_array__3577));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$ = true;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = (function (coll,n,val){
var this__3578 = this;
return cljs.core._assoc.call(null,coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$ = true;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3579 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3580 = this;
return (new cljs.core.Vector(meta,this__3580.array));
});
cljs.core.Vector.prototype.cljs$core$IMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3581 = this;
return this__3581.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$ = true;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3595 = null;
var G__3595__3596 = (function (coll,n){
var this__3582 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3583 = (0 <= n);

if(cljs.core.truth_(and__3546__auto____3583))
{return (n < this__3582.array.length);
} else
{return and__3546__auto____3583;
}
})()))
{return (this__3582.array[n]);
} else
{return null;
}
});
var G__3595__3597 = (function (coll,n,not_found){
var this__3584 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3585 = (0 <= n);

if(cljs.core.truth_(and__3546__auto____3585))
{return (n < this__3584.array.length);
} else
{return and__3546__auto____3585;
}
})()))
{return (this__3584.array[n]);
} else
{return not_found;
}
});
G__3595 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3595__3596.call(this,coll,n);
case  3 :
return G__3595__3597.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3595;
})()
;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3586 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__3586.meta);
});
cljs.core.Vector.EMPTY = (new cljs.core.Vector(null,cljs.core.array.call(null)));
cljs.core.Vector.fromArray = (function (xs){
return (new cljs.core.Vector(null,xs));
});
cljs.core.Vector.prototype.call = (function() {
var G__3599 = null;
var G__3599__3600 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3599__3601 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3599 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3599__3600.call(this,_,k);
case  3 :
return G__3599__3601.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3599;
})()
;
cljs.core.vec = (function vec(coll){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.Vector.EMPTY,coll);
});
/**
* @param {...*} var_args
*/
cljs.core.vector = (function() { 
var vector__delegate = function (args){
return cljs.core.vec.call(null,args);
};
var vector = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return vector__delegate.call(this, args);
};
vector.cljs$lang$maxFixedArity = 0;
vector.cljs$lang$applyTo = (function (arglist__3603){
var args = cljs.core.seq( arglist__3603 );;
return vector__delegate.call(this, args);
});
return vector;
})()
;

/**
* @constructor
*/
cljs.core.Subvec = (function (meta,v,start,end){
this.meta = meta;
this.v = v;
this.start = start;
this.end = end;
})
cljs.core.Subvec.prototype.cljs$core$IHash$ = true;
cljs.core.Subvec.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3604 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Subvec.prototype.cljs$core$ILookup$ = true;
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3624 = null;
var G__3624__3625 = (function (coll,k){
var this__3605 = this;
return cljs.core._nth.call(null,coll,k,null);
});
var G__3624__3626 = (function (coll,k,not_found){
var this__3606 = this;
return cljs.core._nth.call(null,coll,k,not_found);
});
G__3624 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3624__3625.call(this,coll,k);
case  3 :
return G__3624__3626.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3624;
})()
;
cljs.core.Subvec.prototype.cljs$core$IAssociative$ = true;
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc = (function (coll,key,val){
var this__3607 = this;
var v_pos__3608 = (this__3607.start + key);

return (new cljs.core.Subvec(this__3607.meta,cljs.core._assoc.call(null,this__3607.v,v_pos__3608,val),this__3607.start,((this__3607.end > (v_pos__3608 + 1)) ? this__3607.end : (v_pos__3608 + 1))));
});
cljs.core.Subvec.prototype.cljs$core$ISequential$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3609 = this;
return (new cljs.core.Subvec(this__3609.meta,cljs.core._assoc_n.call(null,this__3609.v,this__3609.end,o),this__3609.start,(this__3609.end + 1)));
});
cljs.core.Subvec.prototype.cljs$core$IReduce$ = true;
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3628 = null;
var G__3628__3629 = (function (coll,f){
var this__3610 = this;
return cljs.core.ci_reduce.call(null,coll,f);
});
var G__3628__3630 = (function (coll,f,start){
var this__3611 = this;
return cljs.core.ci_reduce.call(null,coll,f,start);
});
G__3628 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__3628__3629.call(this,coll,f);
case  3 :
return G__3628__3630.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3628;
})()
;
cljs.core.Subvec.prototype.cljs$core$ISeqable$ = true;
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3612 = this;
var subvec_seq__3613 = (function subvec_seq(i){
if(cljs.core.truth_(cljs.core._EQ_.call(null,i,this__3612.end)))
{return null;
} else
{return cljs.core.cons.call(null,cljs.core._nth.call(null,this__3612.v,i),(new cljs.core.LazySeq(null,false,(function (){
return subvec_seq.call(null,(i + 1));
}))));
}
});

return subvec_seq__3613.call(null,this__3612.start);
});
cljs.core.Subvec.prototype.cljs$core$ICounted$ = true;
cljs.core.Subvec.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3614 = this;
return (this__3614.end - this__3614.start);
});
cljs.core.Subvec.prototype.cljs$core$IStack$ = true;
cljs.core.Subvec.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3615 = this;
return cljs.core._nth.call(null,this__3615.v,(this__3615.end - 1));
});
cljs.core.Subvec.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3616 = this;
if(cljs.core.truth_(cljs.core._EQ_.call(null,this__3616.start,this__3616.end)))
{throw (new Error("Can't pop empty vector"));
} else
{return (new cljs.core.Subvec(this__3616.meta,this__3616.v,this__3616.start,(this__3616.end - 1)));
}
});
cljs.core.Subvec.prototype.cljs$core$IVector$ = true;
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n = (function (coll,n,val){
var this__3617 = this;
return cljs.core._assoc.call(null,coll,n,val);
});
cljs.core.Subvec.prototype.cljs$core$IEquiv$ = true;
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3618 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Subvec.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3619 = this;
return (new cljs.core.Subvec(meta,this__3619.v,this__3619.start,this__3619.end));
});
cljs.core.Subvec.prototype.cljs$core$IMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3620 = this;
return this__3620.meta;
});
cljs.core.Subvec.prototype.cljs$core$IIndexed$ = true;
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3632 = null;
var G__3632__3633 = (function (coll,n){
var this__3621 = this;
return cljs.core._nth.call(null,this__3621.v,(this__3621.start + n));
});
var G__3632__3634 = (function (coll,n,not_found){
var this__3622 = this;
return cljs.core._nth.call(null,this__3622.v,(this__3622.start + n),not_found);
});
G__3632 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3632__3633.call(this,coll,n);
case  3 :
return G__3632__3634.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3632;
})()
;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3623 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__3623.meta);
});
/**
* Returns a persistent vector of the items in vector from
* start (inclusive) to end (exclusive).  If end is not supplied,
* defaults to (count vector). This operation is O(1) and very fast, as
* the resulting vector shares structure with the original and no
* trimming is done.
*/
cljs.core.subvec = (function() {
var subvec = null;
var subvec__3636 = (function (v,start){
return subvec.call(null,v,start,cljs.core.count.call(null,v));
});
var subvec__3637 = (function (v,start,end){
return (new cljs.core.Subvec(null,v,start,end));
});
subvec = function(v,start,end){
switch(arguments.length){
case  2 :
return subvec__3636.call(this,v,start);
case  3 :
return subvec__3637.call(this,v,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
return subvec;
})()
;
cljs.core.Subvec.prototype.call = (function() {
var G__3639 = null;
var G__3639__3640 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3639__3641 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3639 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3639__3640.call(this,_,k);
case  3 :
return G__3639__3641.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3639;
})()
;

/**
* @constructor
*/
cljs.core.PersistentQueueSeq = (function (meta,front,rear){
this.meta = meta;
this.front = front;
this.rear = rear;
})
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3643 = this;
return coll;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3644 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3645 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3646 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3646.meta);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3647 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3648 = this;
return cljs.core._first.call(null,this__3648.front);
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3649 = this;
var temp__3695__auto____3650 = cljs.core.next.call(null,this__3649.front);

if(cljs.core.truth_(temp__3695__auto____3650))
{var f1__3651 = temp__3695__auto____3650;

return (new cljs.core.PersistentQueueSeq(this__3649.meta,f1__3651,this__3649.rear));
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,this__3649.rear)))
{return cljs.core._empty.call(null,coll);
} else
{return (new cljs.core.PersistentQueueSeq(this__3649.meta,this__3649.rear,null));
}
}
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3652 = this;
return this__3652.meta;
});
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3653 = this;
return (new cljs.core.PersistentQueueSeq(meta,this__3653.front,this__3653.rear));
});

/**
* @constructor
*/
cljs.core.PersistentQueue = (function (meta,count,front,rear){
this.meta = meta;
this.count = count;
this.front = front;
this.rear = rear;
})
cljs.core.PersistentQueue.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3654 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3655 = this;
if(cljs.core.truth_(this__3655.front))
{return (new cljs.core.PersistentQueue(this__3655.meta,(this__3655.count + 1),this__3655.front,cljs.core.conj.call(null,(function (){var or__3548__auto____3656 = this__3655.rear;

if(cljs.core.truth_(or__3548__auto____3656))
{return or__3548__auto____3656;
} else
{return cljs.core.Vector.fromArray([]);
}
})(),o)));
} else
{return (new cljs.core.PersistentQueue(this__3655.meta,(this__3655.count + 1),cljs.core.conj.call(null,this__3655.front,o),cljs.core.Vector.fromArray([])));
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3657 = this;
var rear__3658 = cljs.core.seq.call(null,this__3657.rear);

if(cljs.core.truth_((function (){var or__3548__auto____3659 = this__3657.front;

if(cljs.core.truth_(or__3548__auto____3659))
{return or__3548__auto____3659;
} else
{return rear__3658;
}
})()))
{return (new cljs.core.PersistentQueueSeq(null,this__3657.front,cljs.core.seq.call(null,rear__3658)));
} else
{return cljs.core.List.EMPTY;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3660 = this;
return this__3660.count;
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3661 = this;
return cljs.core._first.call(null,this__3661.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3662 = this;
if(cljs.core.truth_(this__3662.front))
{var temp__3695__auto____3663 = cljs.core.next.call(null,this__3662.front);

if(cljs.core.truth_(temp__3695__auto____3663))
{var f1__3664 = temp__3695__auto____3663;

return (new cljs.core.PersistentQueue(this__3662.meta,(this__3662.count - 1),f1__3664,this__3662.rear));
} else
{return (new cljs.core.PersistentQueue(this__3662.meta,(this__3662.count - 1),cljs.core.seq.call(null,this__3662.rear),cljs.core.Vector.fromArray([])));
}
} else
{return coll;
}
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first = (function (coll){
var this__3665 = this;
return cljs.core.first.call(null,this__3665.front);
});
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__3666 = this;
return cljs.core.rest.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3667 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3668 = this;
return (new cljs.core.PersistentQueue(meta,this__3668.count,this__3668.front,this__3668.rear));
});
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3669 = this;
return this__3669.meta;
});
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3670 = this;
return cljs.core.PersistentQueue.EMPTY;
});
cljs.core.PersistentQueue.EMPTY = (new cljs.core.PersistentQueue(null,0,null,cljs.core.Vector.fromArray([])));

/**
* @constructor
*/
cljs.core.NeverEquiv = (function (){
})
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = true;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__3671 = this;
return false;
});
cljs.core.never_equiv = (new cljs.core.NeverEquiv());
/**
* Assumes y is a map. Returns true if x equals y, otherwise returns
* false.
*/
cljs.core.equiv_map = (function equiv_map(x,y){
return cljs.core.boolean$.call(null,(cljs.core.truth_(cljs.core.map_QMARK_.call(null,y))?(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,x),cljs.core.count.call(null,y)))?cljs.core.every_QMARK_.call(null,cljs.core.identity,cljs.core.map.call(null,(function (xkv){
return cljs.core._EQ_.call(null,cljs.core.get.call(null,y,cljs.core.first.call(null,xkv),cljs.core.never_equiv),cljs.core.second.call(null,xkv));
}),x)):null):null));
});
cljs.core.scan_array = (function scan_array(incr,k,array){
var len__3672 = array.length;

var i__3673 = 0;

while(true){
if(cljs.core.truth_((i__3673 < len__3672)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,k,(array[i__3673]))))
{return i__3673;
} else
{{
var G__3674 = (i__3673 + incr);
i__3673 = G__3674;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.obj_map_contains_key_QMARK_ = (function() {
var obj_map_contains_key_QMARK_ = null;
var obj_map_contains_key_QMARK___3676 = (function (k,strobj){
return obj_map_contains_key_QMARK_.call(null,k,strobj,true,false);
});
var obj_map_contains_key_QMARK___3677 = (function (k,strobj,true_val,false_val){
if(cljs.core.truth_((function (){var and__3546__auto____3675 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____3675))
{return strobj.hasOwnProperty(k);
} else
{return and__3546__auto____3675;
}
})()))
{return true_val;
} else
{return false_val;
}
});
obj_map_contains_key_QMARK_ = function(k,strobj,true_val,false_val){
switch(arguments.length){
case  2 :
return obj_map_contains_key_QMARK___3676.call(this,k,strobj);
case  4 :
return obj_map_contains_key_QMARK___3677.call(this,k,strobj,true_val,false_val);
}
throw('Invalid arity: ' + arguments.length);
};
return obj_map_contains_key_QMARK_;
})()
;

/**
* @constructor
*/
cljs.core.ObjMap = (function (meta,keys,strobj){
this.meta = meta;
this.keys = keys;
this.strobj = strobj;
})
cljs.core.ObjMap.prototype.cljs$core$IHash$ = true;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3680 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = true;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3699 = null;
var G__3699__3700 = (function (coll,k){
var this__3681 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__3699__3701 = (function (coll,k,not_found){
var this__3682 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__3682.strobj,(this__3682.strobj[k]),not_found);
});
G__3699 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3699__3700.call(this,coll,k);
case  3 :
return G__3699__3701.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3699;
})()
;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3683 = this;
if(cljs.core.truth_(goog.isString.call(null,k)))
{var new_strobj__3684 = goog.object.clone.call(null,this__3683.strobj);
var overwrite_QMARK___3685 = new_strobj__3684.hasOwnProperty(k);

(new_strobj__3684[k] = v);
if(cljs.core.truth_(overwrite_QMARK___3685))
{return (new cljs.core.ObjMap(this__3683.meta,this__3683.keys,new_strobj__3684));
} else
{var new_keys__3686 = cljs.core.aclone.call(null,this__3683.keys);

new_keys__3686.push(k);
return (new cljs.core.ObjMap(this__3683.meta,new_keys__3686,new_strobj__3684));
}
} else
{return cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null,k,v),cljs.core.seq.call(null,coll)),this__3683.meta);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__3687 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__3687.strobj);
});
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__3688 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3689 = this;
if(cljs.core.truth_((this__3689.keys.length > 0)))
{return cljs.core.map.call(null,(function (p1__3679_SHARP_){
return cljs.core.vector.call(null,p1__3679_SHARP_,(this__3689.strobj[p1__3679_SHARP_]));
}),this__3689.keys);
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3690 = this;
return this__3690.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3691 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3692 = this;
return (new cljs.core.ObjMap(meta,this__3692.keys,this__3692.strobj));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3693 = this;
return this__3693.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3694 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__3694.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__3695 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3696 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____3696))
{return this__3695.strobj.hasOwnProperty(k);
} else
{return and__3546__auto____3696;
}
})()))
{var new_keys__3697 = cljs.core.aclone.call(null,this__3695.keys);
var new_strobj__3698 = goog.object.clone.call(null,this__3695.strobj);

new_keys__3697.splice(cljs.core.scan_array.call(null,1,k,new_keys__3697),1);
cljs.core.js_delete.call(null,new_strobj__3698,k);
return (new cljs.core.ObjMap(this__3695.meta,new_keys__3697,new_strobj__3698));
} else
{return coll;
}
});
cljs.core.ObjMap.EMPTY = (new cljs.core.ObjMap(null,cljs.core.array.call(null),cljs.core.js_obj.call(null)));
cljs.core.ObjMap.fromObject = (function (ks,obj){
return (new cljs.core.ObjMap(null,ks,obj));
});
cljs.core.ObjMap.prototype.call = (function() {
var G__3704 = null;
var G__3704__3705 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3704__3706 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3704 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3704__3705.call(this,_,k);
case  3 :
return G__3704__3706.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3704;
})()
;

/**
* @constructor
*/
cljs.core.HashMap = (function (meta,count,hashobj){
this.meta = meta;
this.count = count;
this.hashobj = hashobj;
})
cljs.core.HashMap.prototype.cljs$core$IHash$ = true;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3708 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$ = true;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3738 = null;
var G__3738__3739 = (function (coll,k){
var this__3709 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__3738__3740 = (function (coll,k,not_found){
var this__3710 = this;
var bucket__3711 = (this__3710.hashobj[cljs.core.hash.call(null,k)]);
var i__3712 = (cljs.core.truth_(bucket__3711)?cljs.core.scan_array.call(null,2,k,bucket__3711):null);

if(cljs.core.truth_(i__3712))
{return (bucket__3711[(i__3712 + 1)]);
} else
{return not_found;
}
});
G__3738 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3738__3739.call(this,coll,k);
case  3 :
return G__3738__3740.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3738;
})()
;
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3713 = this;
var h__3714 = cljs.core.hash.call(null,k);
var bucket__3715 = (this__3713.hashobj[h__3714]);

if(cljs.core.truth_(bucket__3715))
{var new_bucket__3716 = cljs.core.aclone.call(null,bucket__3715);
var new_hashobj__3717 = goog.object.clone.call(null,this__3713.hashobj);

(new_hashobj__3717[h__3714] = new_bucket__3716);
var temp__3695__auto____3718 = cljs.core.scan_array.call(null,2,k,new_bucket__3716);

if(cljs.core.truth_(temp__3695__auto____3718))
{var i__3719 = temp__3695__auto____3718;

(new_bucket__3716[(i__3719 + 1)] = v);
return (new cljs.core.HashMap(this__3713.meta,this__3713.count,new_hashobj__3717));
} else
{new_bucket__3716.push(k,v);
return (new cljs.core.HashMap(this__3713.meta,(this__3713.count + 1),new_hashobj__3717));
}
} else
{var new_hashobj__3720 = goog.object.clone.call(null,this__3713.hashobj);

(new_hashobj__3720[h__3714] = cljs.core.array.call(null,k,v));
return (new cljs.core.HashMap(this__3713.meta,(this__3713.count + 1),new_hashobj__3720));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__3721 = this;
var bucket__3722 = (this__3721.hashobj[cljs.core.hash.call(null,k)]);
var i__3723 = (cljs.core.truth_(bucket__3722)?cljs.core.scan_array.call(null,2,k,bucket__3722):null);

if(cljs.core.truth_(i__3723))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.cljs$core$ICollection$ = true;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__3724 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3725 = this;
if(cljs.core.truth_((this__3725.count > 0)))
{var hashes__3726 = cljs.core.js_keys.call(null,this__3725.hashobj);

return cljs.core.mapcat.call(null,(function (p1__3703_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,(this__3725.hashobj[p1__3703_SHARP_])));
}),hashes__3726);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$ = true;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3727 = this;
return this__3727.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3728 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3729 = this;
return (new cljs.core.HashMap(meta,this__3729.count,this__3729.hashobj));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3730 = this;
return this__3730.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3731 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__3731.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$ = true;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__3732 = this;
var h__3733 = cljs.core.hash.call(null,k);
var bucket__3734 = (this__3732.hashobj[h__3733]);
var i__3735 = (cljs.core.truth_(bucket__3734)?cljs.core.scan_array.call(null,2,k,bucket__3734):null);

if(cljs.core.truth_(cljs.core.not.call(null,i__3735)))
{return coll;
} else
{var new_hashobj__3736 = goog.object.clone.call(null,this__3732.hashobj);

if(cljs.core.truth_((3 > bucket__3734.length)))
{cljs.core.js_delete.call(null,new_hashobj__3736,h__3733);
} else
{var new_bucket__3737 = cljs.core.aclone.call(null,bucket__3734);

new_bucket__3737.splice(i__3735,2);
(new_hashobj__3736[h__3733] = new_bucket__3737);
}
return (new cljs.core.HashMap(this__3732.meta,(this__3732.count - 1),new_hashobj__3736));
}
});
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,cljs.core.js_obj.call(null)));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__3742 = ks.length;

var i__3743 = 0;
var out__3744 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_((i__3743 < len__3742)))
{{
var G__3745 = (i__3743 + 1);
var G__3746 = cljs.core.assoc.call(null,out__3744,(ks[i__3743]),(vs[i__3743]));
i__3743 = G__3745;
out__3744 = G__3746;
continue;
}
} else
{return out__3744;
}
break;
}
});
cljs.core.HashMap.prototype.call = (function() {
var G__3747 = null;
var G__3747__3748 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3747__3749 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3747 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3747__3748.call(this,_,k);
case  3 :
return G__3747__3749.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3747;
})()
;
/**
* keyval => key val
* Returns a new hash map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.hash_map = (function() { 
var hash_map__delegate = function (keyvals){
var in$__3751 = cljs.core.seq.call(null,keyvals);
var out__3752 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_(in$__3751))
{{
var G__3753 = cljs.core.nnext.call(null,in$__3751);
var G__3754 = cljs.core.assoc.call(null,out__3752,cljs.core.first.call(null,in$__3751),cljs.core.second.call(null,in$__3751));
in$__3751 = G__3753;
out__3752 = G__3754;
continue;
}
} else
{return out__3752;
}
break;
}
};
var hash_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return hash_map__delegate.call(this, keyvals);
};
hash_map.cljs$lang$maxFixedArity = 0;
hash_map.cljs$lang$applyTo = (function (arglist__3755){
var keyvals = cljs.core.seq( arglist__3755 );;
return hash_map__delegate.call(this, keyvals);
});
return hash_map;
})()
;
/**
* Returns a sequence of the map's keys.
*/
cljs.core.keys = (function keys(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.first,hash_map));
});
/**
* Returns a sequence of the map's values.
*/
cljs.core.vals = (function vals(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.second,hash_map));
});
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping from
* the latter (left-to-right) will be the mapping in the result.
* @param {...*} var_args
*/
cljs.core.merge = (function() { 
var merge__delegate = function (maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{return cljs.core.reduce.call(null,(function (p1__3756_SHARP_,p2__3757_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3548__auto____3758 = p1__3756_SHARP_;

if(cljs.core.truth_(or__3548__auto____3758))
{return or__3548__auto____3758;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),p2__3757_SHARP_);
}),maps);
} else
{return null;
}
};
var merge = function (var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return merge__delegate.call(this, maps);
};
merge.cljs$lang$maxFixedArity = 0;
merge.cljs$lang$applyTo = (function (arglist__3759){
var maps = cljs.core.seq( arglist__3759 );;
return merge__delegate.call(this, maps);
});
return merge;
})()
;
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping(s)
* from the latter (left-to-right) will be combined with the mapping in
* the result by calling (f val-in-result val-in-latter).
* @param {...*} var_args
*/
cljs.core.merge_with = (function() { 
var merge_with__delegate = function (f,maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{var merge_entry__3762 = (function (m,e){
var k__3760 = cljs.core.first.call(null,e);
var v__3761 = cljs.core.second.call(null,e);

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,m,k__3760)))
{return cljs.core.assoc.call(null,m,k__3760,f.call(null,cljs.core.get.call(null,m,k__3760),v__3761));
} else
{return cljs.core.assoc.call(null,m,k__3760,v__3761);
}
});
var merge2__3764 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__3762,(function (){var or__3548__auto____3763 = m1;

if(cljs.core.truth_(or__3548__auto____3763))
{return or__3548__auto____3763;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),cljs.core.seq.call(null,m2));
});

return cljs.core.reduce.call(null,merge2__3764,maps);
} else
{return null;
}
};
var merge_with = function (f,var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return merge_with__delegate.call(this, f, maps);
};
merge_with.cljs$lang$maxFixedArity = 1;
merge_with.cljs$lang$applyTo = (function (arglist__3765){
var f = cljs.core.first(arglist__3765);
var maps = cljs.core.rest(arglist__3765);
return merge_with__delegate.call(this, f, maps);
});
return merge_with;
})()
;
/**
* Returns a map containing only those entries in map whose key is in keys
*/
cljs.core.select_keys = (function select_keys(map,keyseq){
var ret__3767 = cljs.core.ObjMap.fromObject([],{});
var keys__3768 = cljs.core.seq.call(null,keyseq);

while(true){
if(cljs.core.truth_(keys__3768))
{var key__3769 = cljs.core.first.call(null,keys__3768);
var entry__3770 = cljs.core.get.call(null,map,key__3769,"﷐'user/not-found");

{
var G__3771 = (cljs.core.truth_(cljs.core.not_EQ_.call(null,entry__3770,"﷐'user/not-found"))?cljs.core.assoc.call(null,ret__3767,key__3769,entry__3770):ret__3767);
var G__3772 = cljs.core.next.call(null,keys__3768);
ret__3767 = G__3771;
keys__3768 = G__3772;
continue;
}
} else
{return ret__3767;
}
break;
}
});

/**
* @constructor
*/
cljs.core.Set = (function (meta,hash_map){
this.meta = meta;
this.hash_map = hash_map;
})
cljs.core.Set.prototype.cljs$core$IHash$ = true;
cljs.core.Set.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3773 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Set.prototype.cljs$core$ILookup$ = true;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3786 = null;
var G__3786__3787 = (function (coll,v){
var this__3774 = this;
return cljs.core._lookup.call(null,coll,v,null);
});
var G__3786__3788 = (function (coll,v,not_found){
var this__3775 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__3775.hash_map,v)))
{return v;
} else
{return not_found;
}
});
G__3786 = function(coll,v,not_found){
switch(arguments.length){
case  2 :
return G__3786__3787.call(this,coll,v);
case  3 :
return G__3786__3788.call(this,coll,v,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3786;
})()
;
cljs.core.Set.prototype.cljs$core$ICollection$ = true;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3776 = this;
return (new cljs.core.Set(this__3776.meta,cljs.core.assoc.call(null,this__3776.hash_map,o,null)));
});
cljs.core.Set.prototype.cljs$core$ISeqable$ = true;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3777 = this;
return cljs.core.keys.call(null,this__3777.hash_map);
});
cljs.core.Set.prototype.cljs$core$ISet$ = true;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = (function (coll,v){
var this__3778 = this;
return (new cljs.core.Set(this__3778.meta,cljs.core.dissoc.call(null,this__3778.hash_map,v)));
});
cljs.core.Set.prototype.cljs$core$ICounted$ = true;
cljs.core.Set.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3779 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.Set.prototype.cljs$core$IEquiv$ = true;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3780 = this;
var and__3546__auto____3781 = cljs.core.set_QMARK_.call(null,other);

if(cljs.core.truth_(and__3546__auto____3781))
{var and__3546__auto____3782 = cljs.core._EQ_.call(null,cljs.core.count.call(null,coll),cljs.core.count.call(null,other));

if(cljs.core.truth_(and__3546__auto____3782))
{return cljs.core.every_QMARK_.call(null,(function (p1__3766_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__3766_SHARP_);
}),other);
} else
{return and__3546__auto____3782;
}
} else
{return and__3546__auto____3781;
}
});
cljs.core.Set.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3783 = this;
return (new cljs.core.Set(meta,this__3783.hash_map));
});
cljs.core.Set.prototype.cljs$core$IMeta$ = true;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3784 = this;
return this__3784.meta;
});
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3785 = this;
return cljs.core.with_meta.call(null,cljs.core.Set.EMPTY,this__3785.meta);
});
cljs.core.Set.EMPTY = (new cljs.core.Set(null,cljs.core.hash_map.call(null)));
cljs.core.Set.prototype.call = (function() {
var G__3790 = null;
var G__3790__3791 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3790__3792 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3790 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3790__3791.call(this,_,k);
case  3 :
return G__3790__3792.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3790;
})()
;
/**
* Returns a set of the distinct elements of coll.
*/
cljs.core.set = (function set(coll){
var in$__3795 = cljs.core.seq.call(null,coll);
var out__3796 = cljs.core.Set.EMPTY;

while(true){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core.empty_QMARK_.call(null,in$__3795))))
{{
var G__3797 = cljs.core.rest.call(null,in$__3795);
var G__3798 = cljs.core.conj.call(null,out__3796,cljs.core.first.call(null,in$__3795));
in$__3795 = G__3797;
out__3796 = G__3798;
continue;
}
} else
{return out__3796;
}
break;
}
});
/**
* Given a map of replacement pairs and a vector/collection, returns a
* vector/seq with any elements = a key in smap replaced with the
* corresponding val in smap
*/
cljs.core.replace = (function replace(smap,coll){
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,coll)))
{var n__3799 = cljs.core.count.call(null,coll);

return cljs.core.reduce.call(null,(function (v,i){
var temp__3695__auto____3800 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));

if(cljs.core.truth_(temp__3695__auto____3800))
{var e__3801 = temp__3695__auto____3800;

return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__3801));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__3799,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__3794_SHARP_){
var temp__3695__auto____3802 = cljs.core.find.call(null,smap,p1__3794_SHARP_);

if(cljs.core.truth_(temp__3695__auto____3802))
{var e__3803 = temp__3695__auto____3802;

return cljs.core.second.call(null,e__3803);
} else
{return p1__3794_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__3811 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__3804,seen){
while(true){
var vec__3805__3806 = p__3804;
var f__3807 = cljs.core.nth.call(null,vec__3805__3806,0,null);
var xs__3808 = vec__3805__3806;

var temp__3698__auto____3809 = cljs.core.seq.call(null,xs__3808);

if(cljs.core.truth_(temp__3698__auto____3809))
{var s__3810 = temp__3698__auto____3809;

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,seen,f__3807)))
{{
var G__3812 = cljs.core.rest.call(null,s__3810);
var G__3813 = seen;
p__3804 = G__3812;
seen = G__3813;
continue;
}
} else
{return cljs.core.cons.call(null,f__3807,step.call(null,cljs.core.rest.call(null,s__3810),cljs.core.conj.call(null,seen,f__3807)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
})));
});

return step__3811.call(null,coll,cljs.core.set([]));
});
cljs.core.butlast = (function butlast(s){
var ret__3814 = cljs.core.Vector.fromArray([]);
var s__3815 = s;

while(true){
if(cljs.core.truth_(cljs.core.next.call(null,s__3815)))
{{
var G__3816 = cljs.core.conj.call(null,ret__3814,cljs.core.first.call(null,s__3815));
var G__3817 = cljs.core.next.call(null,s__3815);
ret__3814 = G__3816;
s__3815 = G__3817;
continue;
}
} else
{return cljs.core.seq.call(null,ret__3814);
}
break;
}
});
/**
* Returns the name String of a string, symbol or keyword.
*/
cljs.core.name = (function name(x){
if(cljs.core.truth_(cljs.core.string_QMARK_.call(null,x)))
{return x;
} else
{if(cljs.core.truth_((function (){var or__3548__auto____3818 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3818))
{return or__3548__auto____3818;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__3819 = x.lastIndexOf("/");

if(cljs.core.truth_((i__3819 < 0)))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,(i__3819 + 1));
}
} else
{if(cljs.core.truth_("﷐'else"))
{throw (new Error(cljs.core.str.call(null,"Doesn't support name: ",x)));
} else
{return null;
}
}
}
});
/**
* Returns the namespace String of a symbol or keyword, or nil if not present.
*/
cljs.core.namespace = (function namespace(x){
if(cljs.core.truth_((function (){var or__3548__auto____3820 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3820))
{return or__3548__auto____3820;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__3821 = x.lastIndexOf("/");

if(cljs.core.truth_((i__3821 > -1)))
{return cljs.core.subs.call(null,x,2,i__3821);
} else
{return null;
}
} else
{throw (new Error(cljs.core.str.call(null,"Doesn't support namespace: ",x)));
}
});
/**
* Returns a map with the keys mapped to the corresponding vals.
*/
cljs.core.zipmap = (function zipmap(keys,vals){
var map__3824 = cljs.core.ObjMap.fromObject([],{});
var ks__3825 = cljs.core.seq.call(null,keys);
var vs__3826 = cljs.core.seq.call(null,vals);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3827 = ks__3825;

if(cljs.core.truth_(and__3546__auto____3827))
{return vs__3826;
} else
{return and__3546__auto____3827;
}
})()))
{{
var G__3828 = cljs.core.assoc.call(null,map__3824,cljs.core.first.call(null,ks__3825),cljs.core.first.call(null,vs__3826));
var G__3829 = cljs.core.next.call(null,ks__3825);
var G__3830 = cljs.core.next.call(null,vs__3826);
map__3824 = G__3828;
ks__3825 = G__3829;
vs__3826 = G__3830;
continue;
}
} else
{return map__3824;
}
break;
}
});
/**
* Returns the x for which (k x), a number, is greatest.
* @param {...*} var_args
*/
cljs.core.max_key = (function() {
var max_key = null;
var max_key__3833 = (function (k,x){
return x;
});
var max_key__3834 = (function (k,x,y){
if(cljs.core.truth_((k.call(null,x) > k.call(null,y))))
{return x;
} else
{return y;
}
});
var max_key__3835 = (function() { 
var G__3837__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__3822_SHARP_,p2__3823_SHARP_){
return max_key.call(null,k,p1__3822_SHARP_,p2__3823_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__3837 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3837__delegate.call(this, k, x, y, more);
};
G__3837.cljs$lang$maxFixedArity = 3;
G__3837.cljs$lang$applyTo = (function (arglist__3838){
var k = cljs.core.first(arglist__3838);
var x = cljs.core.first(cljs.core.next(arglist__3838));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3838)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3838)));
return G__3837__delegate.call(this, k, x, y, more);
});
return G__3837;
})()
;
max_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return max_key__3833.call(this,k,x);
case  3 :
return max_key__3834.call(this,k,x,y);
default:
return max_key__3835.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max_key.cljs$lang$maxFixedArity = 3;
max_key.cljs$lang$applyTo = max_key__3835.cljs$lang$applyTo;
return max_key;
})()
;
/**
* Returns the x for which (k x), a number, is least.
* @param {...*} var_args
*/
cljs.core.min_key = (function() {
var min_key = null;
var min_key__3839 = (function (k,x){
return x;
});
var min_key__3840 = (function (k,x,y){
if(cljs.core.truth_((k.call(null,x) < k.call(null,y))))
{return x;
} else
{return y;
}
});
var min_key__3841 = (function() { 
var G__3843__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__3831_SHARP_,p2__3832_SHARP_){
return min_key.call(null,k,p1__3831_SHARP_,p2__3832_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__3843 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3843__delegate.call(this, k, x, y, more);
};
G__3843.cljs$lang$maxFixedArity = 3;
G__3843.cljs$lang$applyTo = (function (arglist__3844){
var k = cljs.core.first(arglist__3844);
var x = cljs.core.first(cljs.core.next(arglist__3844));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3844)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3844)));
return G__3843__delegate.call(this, k, x, y, more);
});
return G__3843;
})()
;
min_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return min_key__3839.call(this,k,x);
case  3 :
return min_key__3840.call(this,k,x,y);
default:
return min_key__3841.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min_key.cljs$lang$maxFixedArity = 3;
min_key.cljs$lang$applyTo = min_key__3841.cljs$lang$applyTo;
return min_key;
})()
;
/**
* Returns a lazy sequence of lists like partition, but may include
* partitions with fewer than n items at the end.
*/
cljs.core.partition_all = (function() {
var partition_all = null;
var partition_all__3847 = (function (n,coll){
return partition_all.call(null,n,n,coll);
});
var partition_all__3848 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3845 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3845))
{var s__3846 = temp__3698__auto____3845;

return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__3846),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__3846)));
} else
{return null;
}
})));
});
partition_all = function(n,step,coll){
switch(arguments.length){
case  2 :
return partition_all__3847.call(this,n,step);
case  3 :
return partition_all__3848.call(this,n,step,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return partition_all;
})()
;
/**
* Returns a lazy sequence of successive items from coll while
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.take_while = (function take_while(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3850 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3850))
{var s__3851 = temp__3698__auto____3850;

if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__3851))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__3851),take_while.call(null,pred,cljs.core.rest.call(null,s__3851)));
} else
{return null;
}
} else
{return null;
}
})));
});

/**
* @constructor
*/
cljs.core.Range = (function (meta,start,end,step){
this.meta = meta;
this.start = start;
this.end = end;
this.step = step;
})
cljs.core.Range.prototype.cljs$core$IHash$ = true;
cljs.core.Range.prototype.cljs$core$IHash$_hash = (function (rng){
var this__3852 = this;
return cljs.core.hash_coll.call(null,rng);
});
cljs.core.Range.prototype.cljs$core$ISequential$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = (function (rng,o){
var this__3853 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.cljs$core$IReduce$ = true;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3869 = null;
var G__3869__3870 = (function (rng,f){
var this__3854 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
var G__3869__3871 = (function (rng,f,s){
var this__3855 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
G__3869 = function(rng,f,s){
switch(arguments.length){
case  2 :
return G__3869__3870.call(this,rng,f);
case  3 :
return G__3869__3871.call(this,rng,f,s);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3869;
})()
;
cljs.core.Range.prototype.cljs$core$ISeqable$ = true;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = (function (rng){
var this__3856 = this;
var comp__3857 = (cljs.core.truth_((this__3856.step > 0))?cljs.core._LT_:cljs.core._GT_);

if(cljs.core.truth_(comp__3857.call(null,this__3856.start,this__3856.end)))
{return rng;
} else
{return null;
}
});
cljs.core.Range.prototype.cljs$core$ICounted$ = true;
cljs.core.Range.prototype.cljs$core$ICounted$_count = (function (rng){
var this__3858 = this;
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._seq.call(null,rng))))
{return 0;
} else
{return Math['ceil'].call(null,((this__3858.end - this__3858.start) / this__3858.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$ = true;
cljs.core.Range.prototype.cljs$core$ISeq$_first = (function (rng){
var this__3859 = this;
return this__3859.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest = (function (rng){
var this__3860 = this;
if(cljs.core.truth_(cljs.core._seq.call(null,rng)))
{return (new cljs.core.Range(this__3860.meta,(this__3860.start + this__3860.step),this__3860.end,this__3860.step));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$ = true;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = (function (rng,other){
var this__3861 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = (function (rng,meta){
var this__3862 = this;
return (new cljs.core.Range(meta,this__3862.start,this__3862.end,this__3862.step));
});
cljs.core.Range.prototype.cljs$core$IMeta$ = true;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = (function (rng){
var this__3863 = this;
return this__3863.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$ = true;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3873 = null;
var G__3873__3874 = (function (rng,n){
var this__3864 = this;
if(cljs.core.truth_((n < cljs.core._count.call(null,rng))))
{return (this__3864.start + (n * this__3864.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____3865 = (this__3864.start > this__3864.end);

if(cljs.core.truth_(and__3546__auto____3865))
{return cljs.core._EQ_.call(null,this__3864.step,0);
} else
{return and__3546__auto____3865;
}
})()))
{return this__3864.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
var G__3873__3875 = (function (rng,n,not_found){
var this__3866 = this;
if(cljs.core.truth_((n < cljs.core._count.call(null,rng))))
{return (this__3866.start + (n * this__3866.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____3867 = (this__3866.start > this__3866.end);

if(cljs.core.truth_(and__3546__auto____3867))
{return cljs.core._EQ_.call(null,this__3866.step,0);
} else
{return and__3546__auto____3867;
}
})()))
{return this__3866.start;
} else
{return not_found;
}
}
});
G__3873 = function(rng,n,not_found){
switch(arguments.length){
case  2 :
return G__3873__3874.call(this,rng,n);
case  3 :
return G__3873__3875.call(this,rng,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3873;
})()
;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = (function (rng){
var this__3868 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3868.meta);
});
/**
* Returns a lazy seq of nums from start (inclusive) to end
* (exclusive), by step, where start defaults to 0, step to 1,
* and end to infinity.
*/
cljs.core.range = (function() {
var range = null;
var range__3877 = (function (){
return range.call(null,0,Number['MAX_VALUE'],1);
});
var range__3878 = (function (end){
return range.call(null,0,end,1);
});
var range__3879 = (function (start,end){
return range.call(null,start,end,1);
});
var range__3880 = (function (start,end,step){
return (new cljs.core.Range(null,start,end,step));
});
range = function(start,end,step){
switch(arguments.length){
case  0 :
return range__3877.call(this);
case  1 :
return range__3878.call(this,start);
case  2 :
return range__3879.call(this,start,end);
case  3 :
return range__3880.call(this,start,end,step);
}
throw('Invalid arity: ' + arguments.length);
};
return range;
})()
;
/**
* Returns a lazy seq of every nth item in coll.
*/
cljs.core.take_nth = (function take_nth(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3882 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3882))
{var s__3883 = temp__3698__auto____3882;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__3883),take_nth.call(null,n,cljs.core.drop.call(null,n,s__3883)));
} else
{return null;
}
})));
});
/**
* Returns a vector of [(take-while pred coll) (drop-while pred coll)]
*/
cljs.core.split_with = (function split_with(pred,coll){
return cljs.core.Vector.fromArray([cljs.core.take_while.call(null,pred,coll),cljs.core.drop_while.call(null,pred,coll)]);
});
/**
* Applies f to each value in coll, splitting it each time f returns
* a new value.  Returns a lazy seq of partitions.
*/
cljs.core.partition_by = (function partition_by(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3885 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3885))
{var s__3886 = temp__3698__auto____3885;

var fst__3887 = cljs.core.first.call(null,s__3886);
var fv__3888 = f.call(null,fst__3887);
var run__3889 = cljs.core.cons.call(null,fst__3887,cljs.core.take_while.call(null,(function (p1__3884_SHARP_){
return cljs.core._EQ_.call(null,fv__3888,f.call(null,p1__3884_SHARP_));
}),cljs.core.next.call(null,s__3886)));

return cljs.core.cons.call(null,run__3889,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__3889),s__3886))));
} else
{return null;
}
})));
});
/**
* Returns a map from distinct items in coll to the number of times
* they appear.
*/
cljs.core.frequencies = (function frequencies(coll){
return cljs.core.reduce.call(null,(function (counts,x){
return cljs.core.assoc.call(null,counts,x,(cljs.core.get.call(null,counts,x,0) + 1));
}),cljs.core.ObjMap.fromObject([],{}),coll);
});
/**
* Returns a lazy seq of the intermediate values of the reduction (as
* per reduce) of coll by f, starting with init.
*/
cljs.core.reductions = (function() {
var reductions = null;
var reductions__3904 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____3900 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3900))
{var s__3901 = temp__3695__auto____3900;

return reductions.call(null,f,cljs.core.first.call(null,s__3901),cljs.core.rest.call(null,s__3901));
} else
{return cljs.core.list.call(null,f.call(null));
}
})));
});
var reductions__3905 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3902 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3902))
{var s__3903 = temp__3698__auto____3902;

return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__3903)),cljs.core.rest.call(null,s__3903));
} else
{return null;
}
}))));
});
reductions = function(f,init,coll){
switch(arguments.length){
case  2 :
return reductions__3904.call(this,f,init);
case  3 :
return reductions__3905.call(this,f,init,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return reductions;
})()
;
/**
* Takes a set of functions and returns a fn that is the juxtaposition
* of those fns.  The returned fn takes a variable number of args, and
* returns a vector containing the result of applying each fn to the
* args (left-to-right).
* ((juxt a b c) x) => [(a x) (b x) (c x)]
* @param {...*} var_args
*/
cljs.core.juxt = (function() {
var juxt = null;
var juxt__3908 = (function (f){
return (function() {
var G__3913 = null;
var G__3913__3914 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__3913__3915 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__3913__3916 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__3913__3917 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__3913__3918 = (function() { 
var G__3920__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__3920 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3920__delegate.call(this, x, y, z, args);
};
G__3920.cljs$lang$maxFixedArity = 3;
G__3920.cljs$lang$applyTo = (function (arglist__3921){
var x = cljs.core.first(arglist__3921);
var y = cljs.core.first(cljs.core.next(arglist__3921));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3921)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3921)));
return G__3920__delegate.call(this, x, y, z, args);
});
return G__3920;
})()
;
G__3913 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3913__3914.call(this);
case  1 :
return G__3913__3915.call(this,x);
case  2 :
return G__3913__3916.call(this,x,y);
case  3 :
return G__3913__3917.call(this,x,y,z);
default:
return G__3913__3918.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3913.cljs$lang$maxFixedArity = 3;
G__3913.cljs$lang$applyTo = G__3913__3918.cljs$lang$applyTo;
return G__3913;
})()
});
var juxt__3909 = (function (f,g){
return (function() {
var G__3922 = null;
var G__3922__3923 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__3922__3924 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__3922__3925 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__3922__3926 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__3922__3927 = (function() { 
var G__3929__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__3929 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3929__delegate.call(this, x, y, z, args);
};
G__3929.cljs$lang$maxFixedArity = 3;
G__3929.cljs$lang$applyTo = (function (arglist__3930){
var x = cljs.core.first(arglist__3930);
var y = cljs.core.first(cljs.core.next(arglist__3930));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3930)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3930)));
return G__3929__delegate.call(this, x, y, z, args);
});
return G__3929;
})()
;
G__3922 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3922__3923.call(this);
case  1 :
return G__3922__3924.call(this,x);
case  2 :
return G__3922__3925.call(this,x,y);
case  3 :
return G__3922__3926.call(this,x,y,z);
default:
return G__3922__3927.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3922.cljs$lang$maxFixedArity = 3;
G__3922.cljs$lang$applyTo = G__3922__3927.cljs$lang$applyTo;
return G__3922;
})()
});
var juxt__3910 = (function (f,g,h){
return (function() {
var G__3931 = null;
var G__3931__3932 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__3931__3933 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__3931__3934 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__3931__3935 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__3931__3936 = (function() { 
var G__3938__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__3938 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3938__delegate.call(this, x, y, z, args);
};
G__3938.cljs$lang$maxFixedArity = 3;
G__3938.cljs$lang$applyTo = (function (arglist__3939){
var x = cljs.core.first(arglist__3939);
var y = cljs.core.first(cljs.core.next(arglist__3939));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3939)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3939)));
return G__3938__delegate.call(this, x, y, z, args);
});
return G__3938;
})()
;
G__3931 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3931__3932.call(this);
case  1 :
return G__3931__3933.call(this,x);
case  2 :
return G__3931__3934.call(this,x,y);
case  3 :
return G__3931__3935.call(this,x,y,z);
default:
return G__3931__3936.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3931.cljs$lang$maxFixedArity = 3;
G__3931.cljs$lang$applyTo = G__3931__3936.cljs$lang$applyTo;
return G__3931;
})()
});
var juxt__3911 = (function() { 
var G__3940__delegate = function (f,g,h,fs){
var fs__3907 = cljs.core.list_STAR_.call(null,f,g,h,fs);

return (function() {
var G__3941 = null;
var G__3941__3942 = (function (){
return cljs.core.reduce.call(null,(function (p1__3890_SHARP_,p2__3891_SHARP_){
return cljs.core.conj.call(null,p1__3890_SHARP_,p2__3891_SHARP_.call(null));
}),cljs.core.Vector.fromArray([]),fs__3907);
});
var G__3941__3943 = (function (x){
return cljs.core.reduce.call(null,(function (p1__3892_SHARP_,p2__3893_SHARP_){
return cljs.core.conj.call(null,p1__3892_SHARP_,p2__3893_SHARP_.call(null,x));
}),cljs.core.Vector.fromArray([]),fs__3907);
});
var G__3941__3944 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__3894_SHARP_,p2__3895_SHARP_){
return cljs.core.conj.call(null,p1__3894_SHARP_,p2__3895_SHARP_.call(null,x,y));
}),cljs.core.Vector.fromArray([]),fs__3907);
});
var G__3941__3945 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__3896_SHARP_,p2__3897_SHARP_){
return cljs.core.conj.call(null,p1__3896_SHARP_,p2__3897_SHARP_.call(null,x,y,z));
}),cljs.core.Vector.fromArray([]),fs__3907);
});
var G__3941__3946 = (function() { 
var G__3948__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__3898_SHARP_,p2__3899_SHARP_){
return cljs.core.conj.call(null,p1__3898_SHARP_,cljs.core.apply.call(null,p2__3899_SHARP_,x,y,z,args));
}),cljs.core.Vector.fromArray([]),fs__3907);
};
var G__3948 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3948__delegate.call(this, x, y, z, args);
};
G__3948.cljs$lang$maxFixedArity = 3;
G__3948.cljs$lang$applyTo = (function (arglist__3949){
var x = cljs.core.first(arglist__3949);
var y = cljs.core.first(cljs.core.next(arglist__3949));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3949)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3949)));
return G__3948__delegate.call(this, x, y, z, args);
});
return G__3948;
})()
;
G__3941 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3941__3942.call(this);
case  1 :
return G__3941__3943.call(this,x);
case  2 :
return G__3941__3944.call(this,x,y);
case  3 :
return G__3941__3945.call(this,x,y,z);
default:
return G__3941__3946.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3941.cljs$lang$maxFixedArity = 3;
G__3941.cljs$lang$applyTo = G__3941__3946.cljs$lang$applyTo;
return G__3941;
})()
};
var G__3940 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3940__delegate.call(this, f, g, h, fs);
};
G__3940.cljs$lang$maxFixedArity = 3;
G__3940.cljs$lang$applyTo = (function (arglist__3950){
var f = cljs.core.first(arglist__3950);
var g = cljs.core.first(cljs.core.next(arglist__3950));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3950)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3950)));
return G__3940__delegate.call(this, f, g, h, fs);
});
return G__3940;
})()
;
juxt = function(f,g,h,var_args){
var fs = var_args;
switch(arguments.length){
case  1 :
return juxt__3908.call(this,f);
case  2 :
return juxt__3909.call(this,f,g);
case  3 :
return juxt__3910.call(this,f,g,h);
default:
return juxt__3911.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
juxt.cljs$lang$maxFixedArity = 3;
juxt.cljs$lang$applyTo = juxt__3911.cljs$lang$applyTo;
return juxt;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. dorun can
* be used to force any effects. Walks through the successive nexts of
* the seq, does not retain the head and returns nil.
*/
cljs.core.dorun = (function() {
var dorun = null;
var dorun__3952 = (function (coll){
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{{
var G__3955 = cljs.core.next.call(null,coll);
coll = G__3955;
continue;
}
} else
{return null;
}
break;
}
});
var dorun__3953 = (function (n,coll){
while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3951 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(and__3546__auto____3951))
{return (n > 0);
} else
{return and__3546__auto____3951;
}
})()))
{{
var G__3956 = (n - 1);
var G__3957 = cljs.core.next.call(null,coll);
n = G__3956;
coll = G__3957;
continue;
}
} else
{return null;
}
break;
}
});
dorun = function(n,coll){
switch(arguments.length){
case  1 :
return dorun__3952.call(this,n);
case  2 :
return dorun__3953.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return dorun;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. doall can
* be used to force any effects. Walks through the successive nexts of
* the seq, retains the head and returns it, thus causing the entire
* seq to reside in memory at one time.
*/
cljs.core.doall = (function() {
var doall = null;
var doall__3958 = (function (coll){
cljs.core.dorun.call(null,coll);
return coll;
});
var doall__3959 = (function (n,coll){
cljs.core.dorun.call(null,n,coll);
return coll;
});
doall = function(n,coll){
switch(arguments.length){
case  1 :
return doall__3958.call(this,n);
case  2 :
return doall__3959.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return doall;
})()
;
/**
* Returns the result of (re-find re s) if re fully matches s.
*/
cljs.core.re_matches = (function re_matches(re,s){
var matches__3961 = re.exec(s);

if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__3961),s)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__3961),1)))
{return cljs.core.first.call(null,matches__3961);
} else
{return cljs.core.vec.call(null,matches__3961);
}
} else
{return null;
}
});
/**
* Returns the first regex match, if any, of s to re, using
* re.exec(s). Returns a vector, containing first the matching
* substring, then any capturing groups if the regular expression contains
* capturing groups.
*/
cljs.core.re_find = (function re_find(re,s){
var matches__3962 = re.exec(s);

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,matches__3962)))
{return null;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__3962),1)))
{return cljs.core.first.call(null,matches__3962);
} else
{return cljs.core.vec.call(null,matches__3962);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__3963 = cljs.core.re_find.call(null,re,s);
var match_idx__3964 = s.search(re);
var match_str__3965 = (cljs.core.truth_(cljs.core.coll_QMARK_.call(null,match_data__3963))?cljs.core.first.call(null,match_data__3963):match_data__3963);
var post_match__3966 = cljs.core.subs.call(null,s,(match_idx__3964 + cljs.core.count.call(null,match_str__3965)));

if(cljs.core.truth_(match_data__3963))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__3963,re_seq.call(null,re,post_match__3966));
})));
} else
{return null;
}
});
/**
* Returns an instance of RegExp which has compiled the provided string.
*/
cljs.core.re_pattern = (function re_pattern(s){
return (new RegExp(s));
});
cljs.core.pr_sequential = (function pr_sequential(print_one,begin,sep,end,opts,coll){
return cljs.core.concat.call(null,cljs.core.Vector.fromArray([begin]),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.Vector.fromArray([sep]),cljs.core.map.call(null,(function (p1__3967_SHARP_){
return print_one.call(null,p1__3967_SHARP_,opts);
}),coll))),cljs.core.Vector.fromArray([end]));
});
cljs.core.string_print = (function string_print(x){
cljs.core._STAR_print_fn_STAR_.call(null,x);
return null;
});
cljs.core.flush = (function flush(){
return null;
});
cljs.core.pr_seq = (function pr_seq(obj,opts){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,"nil");
} else
{if(cljs.core.truth_(cljs.core.undefined_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,"#<undefined>");
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3546__auto____3968 = cljs.core.get.call(null,opts,"﷐'meta");

if(cljs.core.truth_(and__3546__auto____3968))
{var and__3546__auto____3972 = (function (){var x__321__auto____3969 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____3970 = x__321__auto____3969;

if(cljs.core.truth_(and__3546__auto____3970))
{var and__3546__auto____3971 = x__321__auto____3969.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____3971))
{return cljs.core.not.call(null,x__321__auto____3969.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____3971;
}
} else
{return and__3546__auto____3970;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__321__auto____3969);
}
})();

if(cljs.core.truth_(and__3546__auto____3972))
{return cljs.core.meta.call(null,obj);
} else
{return and__3546__auto____3972;
}
} else
{return and__3546__auto____3968;
}
})())?cljs.core.concat.call(null,cljs.core.Vector.fromArray(["^"]),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.Vector.fromArray([" "])):null),(cljs.core.truth_((function (){var x__321__auto____3973 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____3974 = x__321__auto____3973;

if(cljs.core.truth_(and__3546__auto____3974))
{var and__3546__auto____3975 = x__321__auto____3973.cljs$core$IPrintable$;

if(cljs.core.truth_(and__3546__auto____3975))
{return cljs.core.not.call(null,x__321__auto____3973.hasOwnProperty("cljs$core$IPrintable$"));
} else
{return and__3546__auto____3975;
}
} else
{return and__3546__auto____3974;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,x__321__auto____3973);
}
})())?cljs.core._pr_seq.call(null,obj,opts):cljs.core.list.call(null,"#<",cljs.core.str.call(null,obj),">")));
} else
{return null;
}
}
}
});
/**
* Prints a sequence of objects to a string, observing all the
* options given in opts
*/
cljs.core.pr_str_with_opts = (function pr_str_with_opts(objs,opts){
var first_obj__3976 = cljs.core.first.call(null,objs);
var sb__3977 = (new goog.string.StringBuffer());

var G__3978__3979 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__3978__3979))
{var obj__3980 = cljs.core.first.call(null,G__3978__3979);
var G__3978__3981 = G__3978__3979;

while(true){
if(cljs.core.truth_((obj__3980 === first_obj__3976)))
{} else
{sb__3977.append(" ");
}
var G__3982__3983 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__3980,opts));

if(cljs.core.truth_(G__3982__3983))
{var string__3984 = cljs.core.first.call(null,G__3982__3983);
var G__3982__3985 = G__3982__3983;

while(true){
sb__3977.append(string__3984);
var temp__3698__auto____3986 = cljs.core.next.call(null,G__3982__3985);

if(cljs.core.truth_(temp__3698__auto____3986))
{var G__3982__3987 = temp__3698__auto____3986;

{
var G__3990 = cljs.core.first.call(null,G__3982__3987);
var G__3991 = G__3982__3987;
string__3984 = G__3990;
G__3982__3985 = G__3991;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____3988 = cljs.core.next.call(null,G__3978__3981);

if(cljs.core.truth_(temp__3698__auto____3988))
{var G__3978__3989 = temp__3698__auto____3988;

{
var G__3992 = cljs.core.first.call(null,G__3978__3989);
var G__3993 = G__3978__3989;
obj__3980 = G__3992;
G__3978__3981 = G__3993;
continue;
}
} else
{}
break;
}
} else
{}
return cljs.core.str.call(null,sb__3977);
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
var first_obj__3994 = cljs.core.first.call(null,objs);

var G__3995__3996 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__3995__3996))
{var obj__3997 = cljs.core.first.call(null,G__3995__3996);
var G__3995__3998 = G__3995__3996;

while(true){
if(cljs.core.truth_((obj__3997 === first_obj__3994)))
{} else
{cljs.core.string_print.call(null," ");
}
var G__3999__4000 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__3997,opts));

if(cljs.core.truth_(G__3999__4000))
{var string__4001 = cljs.core.first.call(null,G__3999__4000);
var G__3999__4002 = G__3999__4000;

while(true){
cljs.core.string_print.call(null,string__4001);
var temp__3698__auto____4003 = cljs.core.next.call(null,G__3999__4002);

if(cljs.core.truth_(temp__3698__auto____4003))
{var G__3999__4004 = temp__3698__auto____4003;

{
var G__4007 = cljs.core.first.call(null,G__3999__4004);
var G__4008 = G__3999__4004;
string__4001 = G__4007;
G__3999__4002 = G__4008;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____4005 = cljs.core.next.call(null,G__3995__3998);

if(cljs.core.truth_(temp__3698__auto____4005))
{var G__3995__4006 = temp__3698__auto____4005;

{
var G__4009 = cljs.core.first.call(null,G__3995__4006);
var G__4010 = G__3995__4006;
obj__3997 = G__4009;
G__3995__3998 = G__4010;
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
cljs.core.newline = (function newline(opts){
cljs.core.string_print.call(null,"\n");
if(cljs.core.truth_(cljs.core.get.call(null,opts,"﷐'flush-on-newline")))
{return cljs.core.flush.call(null);
} else
{return null;
}
});
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = (function pr_opts(){
return cljs.core.ObjMap.fromObject(["﷐'flush-on-newline","﷐'readably","﷐'meta","﷐'dup"],{"﷐'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_,"﷐'readably":cljs.core._STAR_print_readably_STAR_,"﷐'meta":cljs.core._STAR_print_meta_STAR_,"﷐'dup":cljs.core._STAR_print_dup_STAR_});
});
/**
* pr to a string, returning it. Fundamental entrypoint to IPrintable.
* @param {...*} var_args
*/
cljs.core.pr_str = (function() { 
var pr_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr_str__delegate.call(this, objs);
};
pr_str.cljs$lang$maxFixedArity = 0;
pr_str.cljs$lang$applyTo = (function (arglist__4011){
var objs = cljs.core.seq( arglist__4011 );;
return pr_str__delegate.call(this, objs);
});
return pr_str;
})()
;
/**
* Prints the object(s) using string-print.  Prints the
* object(s), separated by spaces if there is more than one.
* By default, pr and prn print in a way that objects can be
* read by the reader
* @param {...*} var_args
*/
cljs.core.pr = (function() { 
var pr__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr__delegate.call(this, objs);
};
pr.cljs$lang$maxFixedArity = 0;
pr.cljs$lang$applyTo = (function (arglist__4012){
var objs = cljs.core.seq( arglist__4012 );;
return pr__delegate.call(this, objs);
});
return pr;
})()
;
/**
* Prints the object(s) using string-print.
* print and println produce output for human consumption.
* @param {...*} var_args
*/
cljs.core.print = (function() { 
var cljs_core_print__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"﷐'readably",false));
};
var cljs_core_print = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return cljs_core_print__delegate.call(this, objs);
};
cljs_core_print.cljs$lang$maxFixedArity = 0;
cljs_core_print.cljs$lang$applyTo = (function (arglist__4013){
var objs = cljs.core.seq( arglist__4013 );;
return cljs_core_print__delegate.call(this, objs);
});
return cljs_core_print;
})()
;
/**
* Same as print followed by (newline)
* @param {...*} var_args
*/
cljs.core.println = (function() { 
var println__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"﷐'readably",false));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var println = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println__delegate.call(this, objs);
};
println.cljs$lang$maxFixedArity = 0;
println.cljs$lang$applyTo = (function (arglist__4014){
var objs = cljs.core.seq( arglist__4014 );;
return println__delegate.call(this, objs);
});
return println;
})()
;
/**
* Same as pr followed by (newline).
* @param {...*} var_args
*/
cljs.core.prn = (function() { 
var prn__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var prn = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn__delegate.call(this, objs);
};
prn.cljs$lang$maxFixedArity = 0;
prn.cljs$lang$applyTo = (function (arglist__4015){
var objs = cljs.core.seq( arglist__4015 );;
return prn__delegate.call(this, objs);
});
return prn;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
var pr_pair__4016 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__4016,"{",", ","}",opts,coll);
});
(cljs.core.IPrintable["number"] = true);
(cljs.core._pr_seq["number"] = (function (n,opts){
return cljs.core.list.call(null,cljs.core.str.call(null,n));
}));
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
(cljs.core.IPrintable["boolean"] = true);
(cljs.core._pr_seq["boolean"] = (function (bool,opts){
return cljs.core.list.call(null,cljs.core.str.call(null,bool));
}));
cljs.core.Set.prototype.cljs$core$IPrintable$ = true;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
(cljs.core.IPrintable["string"] = true);
(cljs.core._pr_seq["string"] = (function (obj,opts){
if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,cljs.core.str.call(null,":",(function (){var temp__3698__auto____4017 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____4017))
{var nspc__4018 = temp__3698__auto____4017;

return cljs.core.str.call(null,nspc__4018,"/");
} else
{return null;
}
})(),cljs.core.name.call(null,obj)));
} else
{if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,cljs.core.str.call(null,(function (){var temp__3698__auto____4019 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____4019))
{var nspc__4020 = temp__3698__auto____4019;

return cljs.core.str.call(null,nspc__4020,"/");
} else
{return null;
}
})(),cljs.core.name.call(null,obj)));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.list.call(null,(cljs.core.truth_("﷐'readably".call(null,opts))?goog.string.quote.call(null,obj):obj));
} else
{return null;
}
}
}
}));
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
(cljs.core.IPrintable["array"] = true);
(cljs.core._pr_seq["array"] = (function (a,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#<Array [",", ","]>",opts,a);
}));
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.list.call(null,"()");
});
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
var pr_pair__4021 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__4021,"{",", ","}",opts,coll);
});

/**
* @constructor
*/
cljs.core.Atom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
})
cljs.core.Atom.prototype.cljs$core$IHash$ = true;
cljs.core.Atom.prototype.cljs$core$IHash$_hash = (function (this$){
var this__4022 = this;
return goog.getUid.call(null,this$);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$ = true;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = (function (this$,oldval,newval){
var this__4023 = this;
var G__4024__4025 = cljs.core.seq.call(null,this__4023.watches);

if(cljs.core.truth_(G__4024__4025))
{var G__4027__4029 = cljs.core.first.call(null,G__4024__4025);
var vec__4028__4030 = G__4027__4029;
var key__4031 = cljs.core.nth.call(null,vec__4028__4030,0,null);
var f__4032 = cljs.core.nth.call(null,vec__4028__4030,1,null);
var G__4024__4033 = G__4024__4025;

var G__4027__4034 = G__4027__4029;
var G__4024__4035 = G__4024__4033;

while(true){
var vec__4036__4037 = G__4027__4034;
var key__4038 = cljs.core.nth.call(null,vec__4036__4037,0,null);
var f__4039 = cljs.core.nth.call(null,vec__4036__4037,1,null);
var G__4024__4040 = G__4024__4035;

f__4039.call(null,key__4038,this$,oldval,newval);
var temp__3698__auto____4041 = cljs.core.next.call(null,G__4024__4040);

if(cljs.core.truth_(temp__3698__auto____4041))
{var G__4024__4042 = temp__3698__auto____4041;

{
var G__4049 = cljs.core.first.call(null,G__4024__4042);
var G__4050 = G__4024__4042;
G__4027__4034 = G__4049;
G__4024__4035 = G__4050;
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
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = (function (this$,key,f){
var this__4043 = this;
return this$.watches = cljs.core.assoc.call(null,this__4043.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = (function (this$,key){
var this__4044 = this;
return this$.watches = cljs.core.dissoc.call(null,this__4044.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintable$ = true;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = (function (a,opts){
var this__4045 = this;
return cljs.core.concat.call(null,cljs.core.Vector.fromArray(["#<Atom: "]),cljs.core._pr_seq.call(null,this__4045.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$ = true;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = (function (_){
var this__4046 = this;
return this__4046.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$ = true;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = (function (_){
var this__4047 = this;
return this__4047.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$ = true;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__4048 = this;
return (o === other);
});
/**
* Creates and returns an Atom with an initial value of x and zero or
* more options (in any order):
* 
* :meta metadata-map
* 
* :validator validate-fn
* 
* If metadata-map is supplied, it will be come the metadata on the
* atom. validate-fn must be nil or a side-effect-free fn of one
* argument, which will be passed the intended new state on any state
* change. If the new state is unacceptable, the validate-fn should
* return false or throw an Error.  If either of these error conditions
* occur, then the value of the atom will not change.
* @param {...*} var_args
*/
cljs.core.atom = (function() {
var atom = null;
var atom__4057 = (function (x){
return (new cljs.core.Atom(x,null,null,null));
});
var atom__4058 = (function() { 
var G__4060__delegate = function (x,p__4051){
var map__4052__4053 = p__4051;
var map__4052__4054 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__4052__4053))?cljs.core.apply.call(null,cljs.core.hash_map,map__4052__4053):map__4052__4053);
var validator__4055 = cljs.core.get.call(null,map__4052__4054,"﷐'validator");
var meta__4056 = cljs.core.get.call(null,map__4052__4054,"﷐'meta");

return (new cljs.core.Atom(x,meta__4056,validator__4055,null));
};
var G__4060 = function (x,var_args){
var p__4051 = null;
if (goog.isDef(var_args)) {
  p__4051 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4060__delegate.call(this, x, p__4051);
};
G__4060.cljs$lang$maxFixedArity = 1;
G__4060.cljs$lang$applyTo = (function (arglist__4061){
var x = cljs.core.first(arglist__4061);
var p__4051 = cljs.core.rest(arglist__4061);
return G__4060__delegate.call(this, x, p__4051);
});
return G__4060;
})()
;
atom = function(x,var_args){
var p__4051 = var_args;
switch(arguments.length){
case  1 :
return atom__4057.call(this,x);
default:
return atom__4058.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__4058.cljs$lang$applyTo;
return atom;
})()
;
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
cljs.core.reset_BANG_ = (function reset_BANG_(a,new_value){
var temp__3698__auto____4062 = a.validator;

if(cljs.core.truth_(temp__3698__auto____4062))
{var validate__4063 = temp__3698__auto____4062;

if(cljs.core.truth_(validate__4063.call(null,new_value)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ","Validator rejected reference state","\n",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'validate","﷑'new-value"),cljs.core.hash_map("﷐'line",3016))))));
}
} else
{}
var old_value__4064 = a.state;

a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__4064,new_value);
return new_value;
});
/**
* Atomically swaps the value of atom to be:
* (apply f current-value-of-atom args). Note that f may be called
* multiple times, and thus should be free of side effects.  Returns
* the value that was swapped in.
* @param {...*} var_args
*/
cljs.core.swap_BANG_ = (function() {
var swap_BANG_ = null;
var swap_BANG___4065 = (function (a,f){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state));
});
var swap_BANG___4066 = (function (a,f,x){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x));
});
var swap_BANG___4067 = (function (a,f,x,y){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y));
});
var swap_BANG___4068 = (function (a,f,x,y,z){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y,z));
});
var swap_BANG___4069 = (function() { 
var G__4071__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__4071 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__4071__delegate.call(this, a, f, x, y, z, more);
};
G__4071.cljs$lang$maxFixedArity = 5;
G__4071.cljs$lang$applyTo = (function (arglist__4072){
var a = cljs.core.first(arglist__4072);
var f = cljs.core.first(cljs.core.next(arglist__4072));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4072)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4072))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4072)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4072)))));
return G__4071__delegate.call(this, a, f, x, y, z, more);
});
return G__4071;
})()
;
swap_BANG_ = function(a,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return swap_BANG___4065.call(this,a,f);
case  3 :
return swap_BANG___4066.call(this,a,f,x);
case  4 :
return swap_BANG___4067.call(this,a,f,x,y);
case  5 :
return swap_BANG___4068.call(this,a,f,x,y,z);
default:
return swap_BANG___4069.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
swap_BANG_.cljs$lang$maxFixedArity = 5;
swap_BANG_.cljs$lang$applyTo = swap_BANG___4069.cljs$lang$applyTo;
return swap_BANG_;
})()
;
/**
* Atomically sets the value of atom to newval if and only if the
* current value of the atom is identical to oldval. Returns true if
* set happened, else false.
*/
cljs.core.compare_and_set_BANG_ = (function compare_and_set_BANG_(a,oldval,newval){
if(cljs.core.truth_(cljs.core._EQ_.call(null,a.state,oldval)))
{cljs.core.reset_BANG_.call(null,a,newval);
return true;
} else
{return false;
}
});
cljs.core.deref = (function deref(o){
return cljs.core._deref.call(null,o);
});
/**
* Sets the validator-fn for an atom. validator-fn must be nil or a
* side-effect-free fn of one argument, which will be passed the intended
* new state on any state change. If the new state is unacceptable, the
* validator-fn should return false or throw an Error. If the current state
* is not acceptable to the new validator, an Error will be thrown and the
* validator will not be changed.
*/
cljs.core.set_validator_BANG_ = (function set_validator_BANG_(iref,val){
return iref.validator = val;
});
/**
* Gets the validator-fn for a var/ref/agent/atom.
*/
cljs.core.get_validator = (function get_validator(iref){
return iref.validator;
});
/**
* Atomically sets the metadata for a namespace/var/ref/agent/atom to be:
* 
* (apply f its-current-meta args)
* 
* f must be free of side-effects
* @param {...*} var_args
*/
cljs.core.alter_meta_BANG_ = (function() { 
var alter_meta_BANG___delegate = function (iref,f,args){
return iref.meta = cljs.core.apply.call(null,f,iref.meta,args);
};
var alter_meta_BANG_ = function (iref,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return alter_meta_BANG___delegate.call(this, iref, f, args);
};
alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__4073){
var iref = cljs.core.first(arglist__4073);
var f = cljs.core.first(cljs.core.next(arglist__4073));
var args = cljs.core.rest(cljs.core.next(arglist__4073));
return alter_meta_BANG___delegate.call(this, iref, f, args);
});
return alter_meta_BANG_;
})()
;
/**
* Atomically resets the metadata for an atom
*/
cljs.core.reset_meta_BANG_ = (function reset_meta_BANG_(iref,m){
return iref.meta = m;
});
/**
* Alpha - subject to change.
* 
* Adds a watch function to an atom reference. The watch fn must be a
* fn of 4 args: a key, the reference, its old-state, its
* new-state. Whenever the reference's state might have been changed,
* any registered watches will have their functions called. The watch
* fn will be called synchronously. Note that an atom's state
* may have changed again prior to the fn call, so use old/new-state
* rather than derefing the reference. Keys must be unique per
* reference, and can be used to remove the watch with remove-watch,
* but are otherwise considered opaque by the watch mechanism.  Bear in
* mind that regardless of the result or action of the watch fns the
* atom's value will change.  Example:
* 
* (def a (atom 0))
* (add-watch a :inc (fn [k r o n] (assert (== 0 n))))
* (swap! a inc)
* ;; Assertion Error
* (deref a)
* ;=> 1
*/
cljs.core.add_watch = (function add_watch(iref,key,f){
return cljs.core._add_watch.call(null,iref,key,f);
});
/**
* Alpha - subject to change.
* 
* Removes a watch (set by add-watch) from a reference
*/
cljs.core.remove_watch = (function remove_watch(iref,key){
return cljs.core._remove_watch.call(null,iref,key);
});
cljs.core.gensym_counter = null;
/**
* Returns a new symbol with a unique name. If a prefix string is
* supplied, the name is prefix# where # is some unique number. If
* prefix is not supplied, the prefix is 'G__'.
*/
cljs.core.gensym = (function() {
var gensym = null;
var gensym__4074 = (function (){
return gensym.call(null,"G__");
});
var gensym__4075 = (function (prefix_string){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.gensym_counter)))
{cljs.core.gensym_counter = cljs.core.atom.call(null,0);
} else
{}
return cljs.core.symbol.call(null,cljs.core.str.call(null,prefix_string,cljs.core.swap_BANG_.call(null,cljs.core.gensym_counter,cljs.core.inc)));
});
gensym = function(prefix_string){
switch(arguments.length){
case  0 :
return gensym__4074.call(this);
case  1 :
return gensym__4075.call(this,prefix_string);
}
throw('Invalid arity: ' + arguments.length);
};
return gensym;
})()
;
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;

/**
* @constructor
*/
cljs.core.Delay = (function (f,state){
this.f = f;
this.state = state;
})
cljs.core.Delay.prototype.cljs$core$IPending$ = true;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = (function (d){
var this__4077 = this;
return cljs.core.not.call(null,cljs.core.nil_QMARK_.call(null,cljs.core.deref.call(null,this__4077.state)));
});
cljs.core.Delay.prototype.cljs$core$IDeref$ = true;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = (function (_){
var this__4078 = this;
if(cljs.core.truth_(cljs.core.deref.call(null,this__4078.state)))
{} else
{cljs.core.swap_BANG_.call(null,this__4078.state,this__4078.f);
}
return cljs.core.deref.call(null,this__4078.state);
});
/**
* Takes a body of expressions and yields a Delay object that will
* invoke the body only the first time it is forced (with force or deref/@), and
* will cache the result and return it on all subsequent force
* calls.
* @param {...*} var_args
*/
cljs.core.delay = (function() { 
var delay__delegate = function (body){
return (new cljs.core.Delay((function (){
return cljs.core.apply.call(null,cljs.core.identity,body);
}),cljs.core.atom.call(null,null)));
};
var delay = function (var_args){
var body = null;
if (goog.isDef(var_args)) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return delay__delegate.call(this, body);
};
delay.cljs$lang$maxFixedArity = 0;
delay.cljs$lang$applyTo = (function (arglist__4079){
var body = cljs.core.seq( arglist__4079 );;
return delay__delegate.call(this, body);
});
return delay;
})()
;
/**
* returns true if x is a Delay created with delay
*/
cljs.core.delay_QMARK_ = (function delay_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.Delay,x);
});
/**
* If x is a Delay, returns the (possibly cached) value of its expression, else returns x
*/
cljs.core.force = (function force(x){
if(cljs.core.truth_(cljs.core.delay_QMARK_.call(null,x)))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
/**
* Returns true if a value has been produced for a promise, delay, future or lazy sequence.
*/
cljs.core.realized_QMARK_ = (function realized_QMARK_(d){
return cljs.core._realized_QMARK_.call(null,d);
});
/**
* Recursively transforms JavaScript arrays into ClojureScript
* vectors, and JavaScript objects into ClojureScript maps.  With
* option ':keywordize-keys true' will convert object fields from
* strings to keywords.
* @param {...*} var_args
*/
cljs.core.js__GT_clj = (function() { 
var js__GT_clj__delegate = function (x,options){
var map__4080__4081 = options;
var map__4080__4082 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__4080__4081))?cljs.core.apply.call(null,cljs.core.hash_map,map__4080__4081):map__4080__4081);
var keywordize_keys__4083 = cljs.core.get.call(null,map__4080__4082,"﷐'keywordize-keys");
var keyfn__4084 = (cljs.core.truth_(keywordize_keys__4083)?cljs.core.keyword:cljs.core.str);
var f__4090 = (function thisfn(x){
if(cljs.core.truth_(cljs.core.seq_QMARK_.call(null,x)))
{return cljs.core.doall.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(cljs.core.coll_QMARK_.call(null,x)))
{return cljs.core.into.call(null,cljs.core.empty.call(null,x),cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isArray.call(null,x)))
{return cljs.core.vec.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isObject.call(null,x)))
{return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),(function (){var iter__385__auto____4089 = (function iter__4085(s__4086){
return (new cljs.core.LazySeq(null,false,(function (){
var s__4086__4087 = s__4086;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__4086__4087)))
{var k__4088 = cljs.core.first.call(null,s__4086__4087);

return cljs.core.cons.call(null,cljs.core.Vector.fromArray([keyfn__4084.call(null,k__4088),thisfn.call(null,(x[k__4088]))]),iter__4085.call(null,cljs.core.rest.call(null,s__4086__4087)));
} else
{return null;
}
break;
}
})));
});

return iter__385__auto____4089.call(null,cljs.core.js_keys.call(null,x));
})());
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

return f__4090.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__4091){
var x = cljs.core.first(arglist__4091);
var options = cljs.core.rest(arglist__4091);
return js__GT_clj__delegate.call(this, x, options);
});
return js__GT_clj;
})()
;
/**
* Returns a memoized version of a referentially transparent function. The
* memoized version of the function keeps a cache of the mapping from arguments
* to results and, when calls with the same arguments are repeated often, has
* higher performance at the expense of higher memory use.
*/
cljs.core.memoize = (function memoize(f){
var mem__4092 = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));

return (function() { 
var G__4096__delegate = function (args){
var temp__3695__auto____4093 = cljs.core.get.call(null,cljs.core.deref.call(null,mem__4092),args);

if(cljs.core.truth_(temp__3695__auto____4093))
{var v__4094 = temp__3695__auto____4093;

return v__4094;
} else
{var ret__4095 = cljs.core.apply.call(null,f,args);

cljs.core.swap_BANG_.call(null,mem__4092,cljs.core.assoc,args,ret__4095);
return ret__4095;
}
};
var G__4096 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__4096__delegate.call(this, args);
};
G__4096.cljs$lang$maxFixedArity = 0;
G__4096.cljs$lang$applyTo = (function (arglist__4097){
var args = cljs.core.seq( arglist__4097 );;
return G__4096__delegate.call(this, args);
});
return G__4096;
})()
;
});
/**
* trampoline can be used to convert algorithms requiring mutual
* recursion without stack consumption. Calls f with supplied args, if
* any. If f returns a fn, calls that fn with no arguments, and
* continues to repeat, until the return value is not a fn, then
* returns that non-fn value. Note that if you want to return a fn as a
* final value, you must wrap it in some data structure and unpack it
* after trampoline returns.
* @param {...*} var_args
*/
cljs.core.trampoline = (function() {
var trampoline = null;
var trampoline__4099 = (function (f){
while(true){
var ret__4098 = f.call(null);

if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null,ret__4098)))
{{
var G__4102 = ret__4098;
f = G__4102;
continue;
}
} else
{return ret__4098;
}
break;
}
});
var trampoline__4100 = (function() { 
var G__4103__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__4103 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4103__delegate.call(this, f, args);
};
G__4103.cljs$lang$maxFixedArity = 1;
G__4103.cljs$lang$applyTo = (function (arglist__4104){
var f = cljs.core.first(arglist__4104);
var args = cljs.core.rest(arglist__4104);
return G__4103__delegate.call(this, f, args);
});
return G__4103;
})()
;
trampoline = function(f,var_args){
var args = var_args;
switch(arguments.length){
case  1 :
return trampoline__4099.call(this,f);
default:
return trampoline__4100.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
trampoline.cljs$lang$maxFixedArity = 1;
trampoline.cljs$lang$applyTo = trampoline__4100.cljs$lang$applyTo;
return trampoline;
})()
;
/**
* Returns a random floating point number between 0 (inclusive) and
* n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__4105 = (function (){
return rand.call(null,1);
});
var rand__4106 = (function (n){
return Math.random() * n;
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__4105.call(this);
case  1 :
return rand__4106.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return Math.floor(Math.random() * n);
});
/**
* Return a random element of the (sequential) collection. Will have
* the same performance characteristics as nth for the given
* collection.
*/
cljs.core.rand_nth = (function rand_nth(coll){
return cljs.core.nth.call(null,coll,cljs.core.rand_int.call(null,cljs.core.count.call(null,coll)));
});
/**
* Returns a map of the elements of coll keyed by the result of
* f on each element. The value at each key will be a vector of the
* corresponding elements, in the order they appeared in coll.
*/
cljs.core.group_by = (function group_by(f,coll){
return cljs.core.reduce.call(null,(function (ret,x){
var k__4108 = f.call(null,x);

return cljs.core.assoc.call(null,ret,k__4108,cljs.core.conj.call(null,cljs.core.get.call(null,ret,k__4108,cljs.core.Vector.fromArray([])),x));
}),cljs.core.ObjMap.fromObject([],{}),coll);
});
/**
* Creates a hierarchy object for use with derive, isa? etc.
*/
cljs.core.make_hierarchy = (function make_hierarchy(){
return cljs.core.ObjMap.fromObject(["﷐'parents","﷐'descendants","﷐'ancestors"],{"﷐'parents":cljs.core.ObjMap.fromObject([],{}),"﷐'descendants":cljs.core.ObjMap.fromObject([],{}),"﷐'ancestors":cljs.core.ObjMap.fromObject([],{})});
});
cljs.core.global_hierarchy = cljs.core.atom.call(null,cljs.core.make_hierarchy.call(null));
/**
* Returns true if (= child parent), or child is directly or indirectly derived from
* parent, either via a Java type inheritance relationship or a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy
*/
cljs.core.isa_QMARK_ = (function() {
var isa_QMARK_ = null;
var isa_QMARK___4117 = (function (child,parent){
return isa_QMARK_.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),child,parent);
});
var isa_QMARK___4118 = (function (h,child,parent){
var or__3548__auto____4109 = cljs.core._EQ_.call(null,child,parent);

if(cljs.core.truth_(or__3548__auto____4109))
{return or__3548__auto____4109;
} else
{var or__3548__auto____4110 = cljs.core.contains_QMARK_.call(null,"﷐'ancestors".call(null,h).call(null,child),parent);

if(cljs.core.truth_(or__3548__auto____4110))
{return or__3548__auto____4110;
} else
{var and__3546__auto____4111 = cljs.core.vector_QMARK_.call(null,parent);

if(cljs.core.truth_(and__3546__auto____4111))
{var and__3546__auto____4112 = cljs.core.vector_QMARK_.call(null,child);

if(cljs.core.truth_(and__3546__auto____4112))
{var and__3546__auto____4113 = cljs.core._EQ_.call(null,cljs.core.count.call(null,parent),cljs.core.count.call(null,child));

if(cljs.core.truth_(and__3546__auto____4113))
{var ret__4114 = true;
var i__4115 = 0;

while(true){
if(cljs.core.truth_((function (){var or__3548__auto____4116 = cljs.core.not.call(null,ret__4114);

if(cljs.core.truth_(or__3548__auto____4116))
{return or__3548__auto____4116;
} else
{return cljs.core._EQ_.call(null,i__4115,cljs.core.count.call(null,parent));
}
})()))
{return ret__4114;
} else
{{
var G__4120 = isa_QMARK_.call(null,h,child.call(null,i__4115),parent.call(null,i__4115));
var G__4121 = (i__4115 + 1);
ret__4114 = G__4120;
i__4115 = G__4121;
continue;
}
}
break;
}
} else
{return and__3546__auto____4113;
}
} else
{return and__3546__auto____4112;
}
} else
{return and__3546__auto____4111;
}
}
}
});
isa_QMARK_ = function(h,child,parent){
switch(arguments.length){
case  2 :
return isa_QMARK___4117.call(this,h,child);
case  3 :
return isa_QMARK___4118.call(this,h,child,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return isa_QMARK_;
})()
;
/**
* Returns the immediate parents of tag, either via a Java type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.parents = (function() {
var parents = null;
var parents__4122 = (function (tag){
return parents.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var parents__4123 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'parents".call(null,h),tag));
});
parents = function(h,tag){
switch(arguments.length){
case  1 :
return parents__4122.call(this,h);
case  2 :
return parents__4123.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return parents;
})()
;
/**
* Returns the immediate and indirect parents of tag, either via a Java type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.ancestors = (function() {
var ancestors = null;
var ancestors__4125 = (function (tag){
return ancestors.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var ancestors__4126 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'ancestors".call(null,h),tag));
});
ancestors = function(h,tag){
switch(arguments.length){
case  1 :
return ancestors__4125.call(this,h);
case  2 :
return ancestors__4126.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return ancestors;
})()
;
/**
* Returns the immediate and indirect children of tag, through a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy. Note: does not work on Java type inheritance
* relationships.
*/
cljs.core.descendants = (function() {
var descendants = null;
var descendants__4128 = (function (tag){
return descendants.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var descendants__4129 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'descendants".call(null,h),tag));
});
descendants = function(h,tag){
switch(arguments.length){
case  1 :
return descendants__4128.call(this,h);
case  2 :
return descendants__4129.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return descendants;
})()
;
/**
* Establishes a parent/child relationship between parent and
* tag. Parent must be a namespace-qualified symbol or keyword and
* child can be either a namespace-qualified symbol or keyword or a
* class. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.derive = (function() {
var derive = null;
var derive__4139 = (function (tag,parent){
if(cljs.core.truth_(cljs.core.namespace.call(null,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'namespace","﷑'parent"),cljs.core.hash_map("﷐'line",3308))))));
}
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,derive,tag,parent);
return null;
});
var derive__4140 = (function (h,tag,parent){
if(cljs.core.truth_(cljs.core.not_EQ_.call(null,tag,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.with_meta(cljs.core.list("﷑'not=","﷑'tag","﷑'parent"),cljs.core.hash_map("﷐'line",3312))))));
}
var tp__4134 = "﷐'parents".call(null,h);
var td__4135 = "﷐'descendants".call(null,h);
var ta__4136 = "﷐'ancestors".call(null,h);
var tf__4137 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.get.call(null,targets,k,cljs.core.set([])),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});

var or__3548__auto____4138 = (cljs.core.truth_(cljs.core.contains_QMARK_.call(null,tp__4134.call(null,tag),parent))?null:(function (){if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__4136.call(null,tag),parent)))
{throw (new Error(cljs.core.str.call(null,tag,"already has",parent,"as ancestor")));
} else
{}
if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__4136.call(null,parent),tag)))
{throw (new Error(cljs.core.str.call(null,"Cyclic derivation:",parent,"has",tag,"as ancestor")));
} else
{}
return cljs.core.ObjMap.fromObject(["﷐'parents","﷐'ancestors","﷐'descendants"],{"﷐'parents":cljs.core.assoc.call(null,"﷐'parents".call(null,h),tag,cljs.core.conj.call(null,cljs.core.get.call(null,tp__4134,tag,cljs.core.set([])),parent)),"﷐'ancestors":tf__4137.call(null,"﷐'ancestors".call(null,h),tag,td__4135,parent,ta__4136),"﷐'descendants":tf__4137.call(null,"﷐'descendants".call(null,h),parent,ta__4136,tag,td__4135)});
})());

if(cljs.core.truth_(or__3548__auto____4138))
{return or__3548__auto____4138;
} else
{return h;
}
});
derive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return derive__4139.call(this,h,tag);
case  3 :
return derive__4140.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return derive;
})()
;
/**
* Removes a parent/child relationship between parent and
* tag. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.underive = (function() {
var underive = null;
var underive__4146 = (function (tag,parent){
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,underive,tag,parent);
return null;
});
var underive__4147 = (function (h,tag,parent){
var parentMap__4142 = "﷐'parents".call(null,h);
var childsParents__4143 = (cljs.core.truth_(parentMap__4142.call(null,tag))?cljs.core.disj.call(null,parentMap__4142.call(null,tag),parent):cljs.core.set([]));
var newParents__4144 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__4143))?cljs.core.assoc.call(null,parentMap__4142,tag,childsParents__4143):cljs.core.dissoc.call(null,parentMap__4142,tag));
var deriv_seq__4145 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__4131_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__4131_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__4131_SHARP_),cljs.core.second.call(null,p1__4131_SHARP_)));
}),cljs.core.seq.call(null,newParents__4144)));

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,parentMap__4142.call(null,tag),parent)))
{return cljs.core.reduce.call(null,(function (p1__4132_SHARP_,p2__4133_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__4132_SHARP_,p2__4133_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__4145));
} else
{return h;
}
});
underive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return underive__4146.call(this,h,tag);
case  3 :
return underive__4147.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return underive;
})()
;
cljs.core.reset_cache = (function reset_cache(method_cache,method_table,cached_hierarchy,hierarchy){
cljs.core.swap_BANG_.call(null,method_cache,(function (_){
return cljs.core.deref.call(null,method_table);
}));
return cljs.core.swap_BANG_.call(null,cached_hierarchy,(function (_){
return cljs.core.deref.call(null,hierarchy);
}));
});
cljs.core.prefers_STAR_ = (function prefers_STAR_(x,y,prefer_table){
var xprefs__4149 = cljs.core.deref.call(null,prefer_table).call(null,x);

var or__3548__auto____4151 = (cljs.core.truth_((function (){var and__3546__auto____4150 = xprefs__4149;

if(cljs.core.truth_(and__3546__auto____4150))
{return xprefs__4149.call(null,y);
} else
{return and__3546__auto____4150;
}
})())?true:null);

if(cljs.core.truth_(or__3548__auto____4151))
{return or__3548__auto____4151;
} else
{var or__3548__auto____4153 = (function (){var ps__4152 = cljs.core.parents.call(null,y);

while(true){
if(cljs.core.truth_((cljs.core.count.call(null,ps__4152) > 0)))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__4152),prefer_table)))
{} else
{}
{
var G__4156 = cljs.core.rest.call(null,ps__4152);
ps__4152 = G__4156;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____4153))
{return or__3548__auto____4153;
} else
{var or__3548__auto____4155 = (function (){var ps__4154 = cljs.core.parents.call(null,x);

while(true){
if(cljs.core.truth_((cljs.core.count.call(null,ps__4154) > 0)))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__4154),y,prefer_table)))
{} else
{}
{
var G__4157 = cljs.core.rest.call(null,ps__4154);
ps__4154 = G__4157;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____4155))
{return or__3548__auto____4155;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3548__auto____4158 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);

if(cljs.core.truth_(or__3548__auto____4158))
{return or__3548__auto____4158;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__4167 = cljs.core.reduce.call(null,(function (be,p__4159){
var vec__4160__4161 = p__4159;
var k__4162 = cljs.core.nth.call(null,vec__4160__4161,0,null);
var ___4163 = cljs.core.nth.call(null,vec__4160__4161,1,null);
var e__4164 = vec__4160__4161;

if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null,dispatch_val,k__4162)))
{var be2__4166 = (cljs.core.truth_((function (){var or__3548__auto____4165 = cljs.core.nil_QMARK_.call(null,be);

if(cljs.core.truth_(or__3548__auto____4165))
{return or__3548__auto____4165;
} else
{return cljs.core.dominates.call(null,k__4162,cljs.core.first.call(null,be),prefer_table);
}
})())?e__4164:be);

if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__4166),k__4162,prefer_table)))
{} else
{throw (new Error(cljs.core.str.call(null,"Multiple methods in multimethod '",name,"' match dispatch value: ",dispatch_val," -> ",k__4162," and ",cljs.core.first.call(null,be2__4166),", and neither is preferred")));
}
return be2__4166;
} else
{return be;
}
}),null,cljs.core.deref.call(null,method_table));

if(cljs.core.truth_(best_entry__4167))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy))))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__4167));
return cljs.core.second.call(null,best_entry__4167);
} else
{cljs.core.reset_cache.call(null,method_cache,method_table,cached_hierarchy,hierarchy);
return find_and_cache_best_method.call(null,name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy);
}
} else
{return null;
}
});
cljs.core.IMultiFn = {};
cljs.core._reset = (function _reset(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4168 = mf;

if(cljs.core.truth_(and__3546__auto____4168))
{return mf.cljs$core$IMultiFn$_reset;
} else
{return and__3546__auto____4168;
}
})()))
{return mf.cljs$core$IMultiFn$_reset(mf);
} else
{return (function (){var or__3548__auto____4169 = (cljs.core._reset[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4169))
{return or__3548__auto____4169;
} else
{var or__3548__auto____4170 = (cljs.core._reset["_"]);

if(cljs.core.truth_(or__3548__auto____4170))
{return or__3548__auto____4170;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if(cljs.core.truth_((function (){var and__3546__auto____4171 = mf;

if(cljs.core.truth_(and__3546__auto____4171))
{return mf.cljs$core$IMultiFn$_add_method;
} else
{return and__3546__auto____4171;
}
})()))
{return mf.cljs$core$IMultiFn$_add_method(mf,dispatch_val,method);
} else
{return (function (){var or__3548__auto____4172 = (cljs.core._add_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4172))
{return or__3548__auto____4172;
} else
{var or__3548__auto____4173 = (cljs.core._add_method["_"]);

if(cljs.core.truth_(or__3548__auto____4173))
{return or__3548__auto____4173;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____4174 = mf;

if(cljs.core.truth_(and__3546__auto____4174))
{return mf.cljs$core$IMultiFn$_remove_method;
} else
{return and__3546__auto____4174;
}
})()))
{return mf.cljs$core$IMultiFn$_remove_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____4175 = (cljs.core._remove_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4175))
{return or__3548__auto____4175;
} else
{var or__3548__auto____4176 = (cljs.core._remove_method["_"]);

if(cljs.core.truth_(or__3548__auto____4176))
{return or__3548__auto____4176;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if(cljs.core.truth_((function (){var and__3546__auto____4177 = mf;

if(cljs.core.truth_(and__3546__auto____4177))
{return mf.cljs$core$IMultiFn$_prefer_method;
} else
{return and__3546__auto____4177;
}
})()))
{return mf.cljs$core$IMultiFn$_prefer_method(mf,dispatch_val,dispatch_val_y);
} else
{return (function (){var or__3548__auto____4178 = (cljs.core._prefer_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4178))
{return or__3548__auto____4178;
} else
{var or__3548__auto____4179 = (cljs.core._prefer_method["_"]);

if(cljs.core.truth_(or__3548__auto____4179))
{return or__3548__auto____4179;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____4180 = mf;

if(cljs.core.truth_(and__3546__auto____4180))
{return mf.cljs$core$IMultiFn$_get_method;
} else
{return and__3546__auto____4180;
}
})()))
{return mf.cljs$core$IMultiFn$_get_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____4181 = (cljs.core._get_method[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4181))
{return or__3548__auto____4181;
} else
{var or__3548__auto____4182 = (cljs.core._get_method["_"]);

if(cljs.core.truth_(or__3548__auto____4182))
{return or__3548__auto____4182;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4183 = mf;

if(cljs.core.truth_(and__3546__auto____4183))
{return mf.cljs$core$IMultiFn$_methods;
} else
{return and__3546__auto____4183;
}
})()))
{return mf.cljs$core$IMultiFn$_methods(mf);
} else
{return (function (){var or__3548__auto____4184 = (cljs.core._methods[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4184))
{return or__3548__auto____4184;
} else
{var or__3548__auto____4185 = (cljs.core._methods["_"]);

if(cljs.core.truth_(or__3548__auto____4185))
{return or__3548__auto____4185;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if(cljs.core.truth_((function (){var and__3546__auto____4186 = mf;

if(cljs.core.truth_(and__3546__auto____4186))
{return mf.cljs$core$IMultiFn$_prefers;
} else
{return and__3546__auto____4186;
}
})()))
{return mf.cljs$core$IMultiFn$_prefers(mf);
} else
{return (function (){var or__3548__auto____4187 = (cljs.core._prefers[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4187))
{return or__3548__auto____4187;
} else
{var or__3548__auto____4188 = (cljs.core._prefers["_"]);

if(cljs.core.truth_(or__3548__auto____4188))
{return or__3548__auto____4188;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._invoke = (function _invoke(mf,args){
if(cljs.core.truth_((function (){var and__3546__auto____4189 = mf;

if(cljs.core.truth_(and__3546__auto____4189))
{return mf.cljs$core$IMultiFn$_invoke;
} else
{return and__3546__auto____4189;
}
})()))
{return mf.cljs$core$IMultiFn$_invoke(mf,args);
} else
{return (function (){var or__3548__auto____4190 = (cljs.core._invoke[goog.typeOf.call(null,mf)]);

if(cljs.core.truth_(or__3548__auto____4190))
{return or__3548__auto____4190;
} else
{var or__3548__auto____4191 = (cljs.core._invoke["_"]);

if(cljs.core.truth_(or__3548__auto____4191))
{return or__3548__auto____4191;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-invoke",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_invoke = (function do_invoke(mf,dispatch_fn,args){
var dispatch_val__4192 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__4193 = cljs.core._get_method.call(null,mf,dispatch_val__4192);

if(cljs.core.truth_(target_fn__4193))
{} else
{throw (new Error(cljs.core.str.call(null,"No method in multimethod '",cljs.core.name,"' for dispatch value: ",dispatch_val__4192)));
}
return cljs.core.apply.call(null,target_fn__4193,args);
});

/**
* @constructor
*/
cljs.core.MultiFn = (function (name,dispatch_fn,default_dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
this.name = name;
this.dispatch_fn = dispatch_fn;
this.default_dispatch_val = default_dispatch_val;
this.hierarchy = hierarchy;
this.method_table = method_table;
this.prefer_table = prefer_table;
this.method_cache = method_cache;
this.cached_hierarchy = cached_hierarchy;
})
cljs.core.MultiFn.prototype.cljs$core$IHash$ = true;
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash = (function (this$){
var this__4194 = this;
return goog.getUid.call(null,this$);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = true;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = (function (mf){
var this__4195 = this;
cljs.core.swap_BANG_.call(null,this__4195.method_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4195.method_cache,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4195.prefer_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__4195.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = (function (mf,dispatch_val,method){
var this__4196 = this;
cljs.core.swap_BANG_.call(null,this__4196.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__4196.method_cache,this__4196.method_table,this__4196.cached_hierarchy,this__4196.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = (function (mf,dispatch_val){
var this__4197 = this;
cljs.core.swap_BANG_.call(null,this__4197.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__4197.method_cache,this__4197.method_table,this__4197.cached_hierarchy,this__4197.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = (function (mf,dispatch_val){
var this__4198 = this;
if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__4198.cached_hierarchy),cljs.core.deref.call(null,this__4198.hierarchy))))
{} else
{cljs.core.reset_cache.call(null,this__4198.method_cache,this__4198.method_table,this__4198.cached_hierarchy,this__4198.hierarchy);
}
var temp__3695__auto____4199 = cljs.core.deref.call(null,this__4198.method_cache).call(null,dispatch_val);

if(cljs.core.truth_(temp__3695__auto____4199))
{var target_fn__4200 = temp__3695__auto____4199;

return target_fn__4200;
} else
{var temp__3695__auto____4201 = cljs.core.find_and_cache_best_method.call(null,this__4198.name,dispatch_val,this__4198.hierarchy,this__4198.method_table,this__4198.prefer_table,this__4198.method_cache,this__4198.cached_hierarchy);

if(cljs.core.truth_(temp__3695__auto____4201))
{var target_fn__4202 = temp__3695__auto____4201;

return target_fn__4202;
} else
{return cljs.core.deref.call(null,this__4198.method_table).call(null,this__4198.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = (function (mf,dispatch_val_x,dispatch_val_y){
var this__4203 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__4203.prefer_table)))
{throw (new Error(cljs.core.str.call(null,"Preference conflict in multimethod '",this__4203.name,"': ",dispatch_val_y," is already preferred to ",dispatch_val_x)));
} else
{}
cljs.core.swap_BANG_.call(null,this__4203.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core.get.call(null,old,dispatch_val_x,cljs.core.set([])),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__4203.method_cache,this__4203.method_table,this__4203.cached_hierarchy,this__4203.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = (function (mf){
var this__4204 = this;
return cljs.core.deref.call(null,this__4204.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = (function (mf){
var this__4205 = this;
return cljs.core.deref.call(null,this__4205.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_invoke = (function (mf,args){
var this__4206 = this;
return cljs.core.do_invoke.call(null,mf,this__4206.dispatch_fn,args);
});
cljs.core.MultiFn.prototype.call = (function() { 
var G__4207__delegate = function (_,args){
return cljs.core._invoke.call(null,this,args);
};
var G__4207 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__4207__delegate.call(this, _, args);
};
G__4207.cljs$lang$maxFixedArity = 1;
G__4207.cljs$lang$applyTo = (function (arglist__4208){
var _ = cljs.core.first(arglist__4208);
var args = cljs.core.rest(arglist__4208);
return G__4207__delegate.call(this, _, args);
});
return G__4207;
})()
;
/**
* Removes all of the methods of multimethod.
*/
cljs.core.remove_all_methods = (function remove_all_methods(multifn){
return cljs.core._reset.call(null,multifn);
});
/**
* Removes the method of multimethod associated with dispatch-value.
*/
cljs.core.remove_method = (function remove_method(multifn,dispatch_val){
return cljs.core._remove_method.call(null,multifn,dispatch_val);
});
/**
* Causes the multimethod to prefer matches of dispatch-val-x over dispatch-val-y
* when there is a conflict
*/
cljs.core.prefer_method = (function prefer_method(multifn,dispatch_val_x,dispatch_val_y){
return cljs.core._prefer_method.call(null,multifn,dispatch_val_x,dispatch_val_y);
});
/**
* Given a multimethod, returns a map of dispatch values -> dispatch fns
*/
cljs.core.methods$ = (function methods$(multifn){
return cljs.core._methods.call(null,multifn);
});
/**
* Given a multimethod and a dispatch value, returns the dispatch fn
* that would apply to that value, or nil if none apply and no default
*/
cljs.core.get_method = (function get_method(multifn,dispatch_val){
return cljs.core._get_method.call(null,multifn,dispatch_val);
});
/**
* Given a multimethod, returns a map of preferred value -> set of other values
*/
cljs.core.prefers = (function prefers(multifn){
return cljs.core._prefers.call(null,multifn);
});
