To start a divided space:

go to the main directory and run make shell, 
paste the following code into the shell and you get a webinterface on 
http://localhost:8080

==Code==


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


