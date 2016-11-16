goog.provide('evil.dom');
goog.require('cljs.core');
evil.dom.$ = $;
evil.dom.select = (function select(id){
return evil.dom.$.call(null,id);
});
evil.dom.ensure = (function ensure(o){
if(cljs.core.truth_(cljs.core.string_QMARK_.call(null,o)))
{return evil.dom.select.call(null,o);
} else
{return o;
}
});
evil.dom.append = (function append(obj,cnt){
return evil.dom.ensure.call(null,obj).append(cnt);
});
evil.dom.text = (function text(obj,txt){
return evil.dom.ensure.call(null,obj).text(txt);
});
evil.dom.click = (function click(obj,f){
return evil.dom.ensure.call(null,obj).click(f);
});
evil.dom.blur = (function blur(obj,f){
return evil.dom.ensure.call(null,obj).blur(f);
});
evil.dom.change = (function change(obj,f){
return evil.dom.ensure.call(null,obj).change(f);
});
evil.dom.keypress = (function keypress(obj,f){
return evil.dom.ensure.call(null,obj).keypress(f);
});
evil.dom.clear = (function clear(obj){
return evil.dom.text.call(null,obj,"");
});
evil.dom.val = (function val(obj){
return evil.dom.ensure.call(null,obj).val();
});
evil.dom.ival = (function ival(obj){
return parseInt.call(null,evil.dom.val.call(null,obj));
});
evil.dom.del = (function del(obj){
return evil.dom.ensure.call(null,obj).remove();
});
evil.dom.attr = (function attr(obj,k,v){
return obj.attr(k,v);
});
evil.dom.s = (function s(opts,f,l){
return cljs.core.vec.call(null,cljs.core.concat.call(null,cljs.core.Vector.fromArray(["﷐'select"]),opts,cljs.core.map.call(null,f,l)));
});
evil.dom.c = (function c(v){
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,v)))
{var vec__4253__4255 = v;
var tag__4256 = cljs.core.nth.call(null,vec__4253__4255,0,null);
var vec__4254__4257 = cljs.core.nthnext.call(null,vec__4253__4255,1);
var f__4258 = cljs.core.nth.call(null,vec__4254__4257,0,null);
var r__4259 = cljs.core.nthnext.call(null,vec__4254__4257,1);
var tag__4260 = evil.dom.$.call(null,cljs.core.str.call(null,"<",cljs.core.name.call(null,tag__4256),"/>"));

if(cljs.core.truth_(cljs.core.map_QMARK_.call(null,f__4258)))
{var tag__4271 = cljs.core.reduce.call(null,(function (tag,p__4261){
var vec__4262__4263 = p__4261;
var k__4264 = cljs.core.nth.call(null,vec__4262__4263,0,null);
var v__4265 = cljs.core.nth.call(null,vec__4262__4263,1,null);

var pred__4266__4269 = cljs.core._EQ_;
var expr__4267__4270 = k__4264;

if(cljs.core.truth_(pred__4266__4269.call(null,"﷐'click",expr__4267__4270)))
{return evil.dom.click.call(null,tag,v__4265);
} else
{if(cljs.core.truth_(pred__4266__4269.call(null,"﷐'blur",expr__4267__4270)))
{return evil.dom.blur.call(null,tag,v__4265);
} else
{if(cljs.core.truth_(pred__4266__4269.call(null,"﷐'change",expr__4267__4270)))
{return evil.dom.change.call(null,tag,v__4265);
} else
{if(cljs.core.truth_(pred__4266__4269.call(null,"﷐'keypress",expr__4267__4270)))
{return evil.dom.keypress.call(null,tag,v__4265);
} else
{return evil.dom.attr.call(null,tag,cljs.core.name.call(null,k__4264),v__4265);
}
}
}
}
}),tag__4260,f__4258);

return cljs.core.reduce.call(null,(function (tag,obj){
return evil.dom.append.call(null,tag,c.call(null,obj));
}),tag__4271,r__4259);
} else
{return cljs.core.reduce.call(null,(function (tag,obj){
return evil.dom.append.call(null,tag,c.call(null,obj));
}),tag__4260,cljs.core.cons.call(null,f__4258,r__4259));
}
} else
{return cljs.core.str.call(null,v);
}
});
