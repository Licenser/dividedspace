Components
==========

dividedspace currently consists out of the following applications, all of which
either can run on the same erlang node or run on a node of their own.

center
------

center is the central watchdoag and communication/coordination hup, 
in dividedspace it is the center of the universe.

ds_web
------

ds_web is the web frontend, currently it consists of a erlang cowboy
webserver and a cljs gui that compiles to javascript. all communicaiton
is handled over a RESTful JSON interface.

epic
----

epic is the combat engine, each epic instance holds a erlv8 v8 javascript
instance for running AI scripts of the ships. Currently v8 does not support
concurrency or running on more then one CPU/Core, so the way to scle is to start
multiple epic nodes.



Start a divided space
=====================

go to the main directory and run make shell, 
paste the following code into the shell and you get a webinterface on 
http://localhost:8080

```erlang
application:start(sasl).
application:start(mnesia).
application:start(erlv8).
application:start(center).
application:start(alog).

alog_control:set_flow_priority(1, {'=<', info}).

application:start(crypto).
application:start(public_key).
application:start(ssl).
application:start(epgsql).
application:start(sendfile).
application:start(cowboy).

application:start(compiler).
application:start(syntax_tools).
application:start(erlydtl).
application:start(ds_web).

application:start(epic).
```