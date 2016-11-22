goog.provide('evil.epic');
goog.require('cljs.core');
goog.require('evil.ajaj');
evil.epic.do_list = (function do_list(fun){
return evil.ajaj.do_ajaj.call(null,"/api/v1/server/epic",(function (res){
return fun.call(null,res);
}));
});
evil.epic.do_get = (function do_get(id,fun){
return evil.ajaj.do_ajaj.call(null,cljs.core.str.call(null,"/api/v1/server/epic/",id),(function (res){
return fun.call(null,res);
}));
});
