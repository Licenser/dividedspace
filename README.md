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


Preperation
===========

First you need to set up a postgres database server. 
* import the ds_web/create.sql file.
* create a admin user with:
  INSERT INTO users (name, pass, rights) VALUES('<name>', MD5('<name>:<pass>'), 1)
* you might need to adjust the standalone.conf to your database settings.

Dependencies
============
* Erlang 15
* make 
* scons
* g++
* libtool
* autoconf
* automake
* uuid-dev
* leiningen 
* curl
* openjdk-7-jdk

Database Setup
==============

CREATE DATABASE dividedspace;
CREATE USER ds;
GRANT ALL ON DATABASE dividedspace TO ds;
\password ds
-> ds
\c dividedspace
\i ds_web/create.sql

GRANT ALL ON fights  TO ds;
GRANT ALL ON fleet_shiptype  TO ds;
GRANT ALL ON fleet_shiptype_id_seq  TO ds;
GRANT ALL ON fleets  TO ds;
GRANT ALL ON fleets_id_seq  TO ds;
GRANT ALL ON modules  TO ds;
GRANT ALL ON modules_id_seq  TO ds;
GRANT ALL ON scripts  TO ds;
GRANT ALL ON scripts_id_seq  TO ds;
GRANT ALL ON shiptypes  TO ds;
GRANT ALL ON shiptypes_id_seq  TO ds;
GRANT ALL ON users  TO ds;
GRANT ALL ON users_id_seq  TO ds;

INSERT INTO users (name, pass, rights) VALUES('admin', MD5('admin:pass'), 1);

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


Getting Started
===============
The documentaiton is currently not very extensive.

Scripting
---------
details on scriting can be found here:

https://github.com/Licenser/dividedspace/wiki/Scripting

Modules
-------
The currently availalbe modules can be found here:

https://github.com/Licenser/dividedspace/tree/master/epic/data

And a short descirption can be found in the wiki:

https://github.com/Licenser/dividedspace/wiki/Modules