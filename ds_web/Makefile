CLJS_OUT_DIR=htdocs/cljs
CLJS_SRC_DIR=cljs-src
CLJSC=./cljs/bin/cljsc
CLJS_OPTS=":optimizations :advanced :output-dir \"$(CLJS_OUT_DIR)\" :output-to \"$(CLJS_OUT_DIR)/boot.js\""

REBAR=./rebar


all: deps cljs force_look
	@$(REBAR) compile

cljs-compiler:
	cd cljs; ./scripts/bootstrap

cljs: force_look
	$(CLJSC) $(CLJS_SRC_DIR) "{$(CLJS_OPTS)}"

deps:
	@$(REBAR) get-deps

clean:
	@$(REBAR) clean

force_look:
	@true
