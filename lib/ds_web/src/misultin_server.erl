% ==========================================================================================================
% MISULTIN - Example: Running Misultin from a gen_server.
%
% >-|-|-(°>
% 
% Copyright (C) 2011, Roberto Ostinelli <roberto@ostinelli.net>
% All rights reserved.
%
% BSD License
% 
% Redistribution and use in source and binary forms, with or without modification, are permitted provided
% that the following conditions are met:
%
%  * Redistributions of source code must retain the above copyright notice, this list of conditions and the
%	 following disclaimer.
%  * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
%	 the following disclaimer in the documentation and/or other materials provided with the distribution.
%  * Neither the name of the authors nor the names of its contributors may be used to endorse or promote
%	 products derived from this software without specific prior written permission.
%
% THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED
% WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
% PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
% ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
% TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
% HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
% NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
% POSSIBILITY OF SUCH DAMAGE.
% ==========================================================================================================
-module(misultin_server).
-behaviour(gen_server).

% gen_server callbacks
-export([init/1, handle_call/3, handle_cast/2, handle_info/2, terminate/2, code_change/3, index/0]).

% API
-export([start_link/0, stop/0]).

% records
-record(state, {
	port
}).

% macros
-define(SERVER, ?MODULE).
-define(PORT, 8080).

% ============================ \/ API ======================================================================

% Function: {ok,Pid} | ignore | {error, Error}
% Description: Starts the server.
start_link() ->
	gen_server:start_link({local, ?SERVER}, ?MODULE, [], []).

% Function: -> ok
% Description: Manually stops the server.
stop() ->
	gen_server:cast(?SERVER, stop).

% ============================ /\ API ======================================================================


% ============================ \/ GEN_SERVER CALLBACKS =====================================================

% ----------------------------------------------------------------------------------------------------------
% Function: -> {ok, State} | {ok, State, Timeout} | ignore | {stop, Reason}
% Description: Initiates the server.
% ----------------------------------------------------------------------------------------------------------
init([]) ->
	% trap_exit -> this gen_server needs to be supervised
    process_flag(trap_exit, true),
	% start misultin & set monitor
    misultin:start_link([{port, ?PORT}, {loop, fun(Req) -> handle_http(Req) end}, {ws_loop, fun (Ws) ->
												    "/fight/" ++ Fight = Ws:get(path),
												    FightId = uuid:to_binary(Fight),
												    {ok, FPid} = epic_server:get_fight(FightId),
												    {ok, Server} = ws_sup:start_child(Ws, FPid),
												    handle_websocket(Ws, Server)
											    end}, {ws_autoexit, false}]),
    erlang:monitor(process, misultin),
    {ok, #state{port = ?PORT}}.

% ----------------------------------------------------------------------------------------------------------
% Function: handle_call(Request, From, State) -> {reply, Reply, State} | {reply, Reply, State, Timeout} |
%									   {noreply, State} | {noreply, State, Timeout} |
%									   {stop, Reason, Reply, State} | {stop, Reason, State}
% Description: Handling call messages.
% ----------------------------------------------------------------------------------------------------------

% handle_call generic fallback
handle_call(_Request, _From, State) ->
	{reply, undefined, State}.

% ----------------------------------------------------------------------------------------------------------
% Function: handle_cast(Msg, State) -> {noreply, State} | {noreply, State, Timeout} | {stop, Reason, State}
% Description: Handling cast messages.
% ----------------------------------------------------------------------------------------------------------

% manual shutdown
handle_cast(stop, State) ->
	{stop, normal, State};

% handle_cast generic fallback (ignore)
handle_cast(_Msg, State) ->
	{noreply, State}.

% ----------------------------------------------------------------------------------------------------------
% Function: handle_info(Info, State) -> {noreply, State} | {noreply, State, Timeout} | {stop, Reason, State}
% Description: Handling all non call/cast messages.
% ----------------------------------------------------------------------------------------------------------

% handle info when misultin server goes down -> take down misultin_gen_server too [the supervisor will take everything up again]
handle_info({'DOWN', _, _, {misultin, _}, _}, State) ->
	{stop, normal, State};

% handle_info generic fallback (ignore)
handle_info(_Info, State) ->
	{noreply, State}.

% ----------------------------------------------------------------------------------------------------------
% Function: terminate(Reason, State) -> void()
% Description: This function is called by a gen_server when it is about to terminate. When it returns,
% the gen_server terminates with Reason. The return value is ignored.
% ----------------------------------------------------------------------------------------------------------
terminate(_Reason, _State) ->
	% stop misultin
	misultin:stop(),
	terminated.

% ----------------------------------------------------------------------------------------------------------
% Func: code_change(OldVsn, State, Extra) -> {ok, NewState}
% Description: Convert process state when code is changed.
% ----------------------------------------------------------------------------------------------------------
code_change(_OldVsn, State, _Extra) ->
	{ok, State}.

% ============================ /\ GEN_SERVER CALLBACKS =====================================================


% ============================ \/ INTERNAL FUNCTIONS =======================================================

% ---------------------------- \/ misultin requests --------------------------------------------------------

handle_http(Req) ->
    case Req:get(uri) of
	{abs_path, "/"} ->
	    Req:ok([{"Content-Type", "text/html"}],
		   index());
	{abs_path,"/static/" ++ File} ->
	    Req:file("./htdocs/" ++ File);
	{abs_path,"/fight/" ++ FightId} ->
	    Req:ok([{"Content-Type", "text/html"}],
		   fight(FightId));
	_ -> 
	    Req:ok([{"Content-Type", "text/html"}],
		   index())
    end.

handle_websocket(Ws, Server) ->
    receive
	{browser, Data} ->
	    ws:incoming(Server, Data),
	    handle_websocket(Ws, Server);
	closed ->
	    ws:stop(Server),
	    closed;
	_Ignore ->
	    handle_websocket(Ws, Server)
%    after 5000 ->
%	    handle_websocket(Ws, Server)
    end.

% ---------------------------- /\ misultin requests --------------------------------------------------------

% ============================ /\ INTERNAL FUNCTIONS =======================================================

index() ->
    {ok, Fights} = epic_server:list_fights(),
    ["
<html>
  <head>
  </head>
  <body onload=\"ready();\">
    <ul>",
     string:join(lists:map(fun (Id) ->
				   UUID = uuid:to_string(Id),
				   "<li><a href='/fight/" ++ UUID ++ "'>" ++ UUID  ++ "</a></li>"
			   end, Fights), "~n"),"
    </ul>
  </body>
</html>"].

fight(FightID) ->
    ["<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"
\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
<html>
<head>
<meta http-equiv='Content-type' content='text/html; charset=utf-8'>
<title>Divided Space</title>
<link href='/static/css/ds-gui.css' type='text/css' rel='stylesheet' />
    <script src='/static/js/bert.js'></script>
    <script src='/static/js/websockets.js' type='text/javascript' charset='utf-8'></script>
    <script src='/static/interface/lib/shapes.js' type='text/javascript' charset='utf-8'></script>
    <script src='/static/interface/lib/draw_engine.js' type='text/javascript' charset='utf-8'></script>
    <!-- JSON is not available on Mobile Safari, so we use this library. -->
    <script src='/static/interface/lib/json2.js' type='text/javascript' charset='utf-8'></script>
    <script src='/static/interface/ds-gui.js' type='text/javascript' charset='utf-8'></script>
  </head>
  <body>
    <!-- <canvas id='background'>Your browser doesn't support HTML 5 Canvas.</canvas> -->
    <canvas id='fighter'>This demo needs HTML 5 Canvas.</canvas>
    <canvas id='fire'>---</canvas>
    <canvas id='units'>Please install a better browser.</canvas>
    <canvas id='grid'>---</canvas>
    <!-- <canvas id='explosions'>-</canvas> -->
    <canvas id='selection'>Firefox or Safari, for example.</canvas>
    <canvas id='osd' style='display: block'>Or both.</canvas>
    <div id='biginfo'></div>
    <div id='coordinates'></div>
    <div id='info'></div>
    <div id='controls'>
      <div class='button' id='play' style='display: none'>Play</div>
      <!-- <div class='button' id='next'>Next</div> -->
    </div>
    <script type='text/javascript' charset='utf-8'>
      if (!Prototype.Browser.IE) {
        var waitForImages = window.setInterval(function() {
          for (var i = document.images.length; i--;) {
            if (!document.images[i].complete) return;
          }
          window.clearInterval(waitForImages);
          DS.initialize('", FightID, "');
/*
          var match = location.search.match(/log=([-\w]+)/);
          DS.initialize(match ? match[1] : 'log');
*/
        }, 500);
      }
    </script>
    <img id='fighter-l-two' src='/static/images/fighter_light_blue.png' style='display: none;' />
    <img id='fighter-l-one' src='/static/images/fighter_light_red.png' style='display: none;' />
  </body>
</html>"].

%<html>
%  <head>
%    <script src='/static/js/bert.js'></script>
%			<script type=\"text/javascript\">
%				function addStatus(text){
%					var date = new Date();
%					document.getElementById('status').innerHTML = document.getElementById('status').innerHTML + text + \"<br>\";
%				}
%				function ready(){
%					if (\"WebSocket\" in window) {
%						// browser supports websockets
%						var ws = new WebSocket(\"ws://localhost:", integer_to_list(?PORT) ,"/fight/", FightID,"\");
%						ws.onopen = function() {
%							addStatus(\"websocket connected!\");
%						};
%						ws.onmessage = function (evt) {
%							var data = Bert.decode(window.atob(evt.data)).toJS();
%							window.console.error(data);
%							addStatus(data);
%						};
%						ws.onclose = function() {
%							// websocket was closed
%							addStatus(\"websocket was closed\");
%						};
%					} else {
%						// browser does not support websockets
%						addStatus(\"sorry, your browser does not support websockets.\");
%					}
%				}
%			</script>
%		</head>
%		<body onload=\"ready();\">
%			<div id=\"status\"></div>
%		</body>
%	</html>"].
