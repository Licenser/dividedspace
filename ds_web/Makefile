CLJS_OUT_DIR=htdocs/cljs
CLJS_SRC_DIR=cljs-src
CLJS_BASE_DIR=./cljs
CLJSC=./bin/cljsc
#CLJS_OPTS=":optimizations :advanced :output-dir \"../$(CLJS_OUT_DIR)\" :output-to \"../$(CLJS_OUT_DIR)/boot.js\""
CLJS_OPTS=":optimizations :simple :output-dir \"../$(CLJS_OUT_DIR)\" :output-to \"../$(CLJS_OUT_DIR)/boot.js\""
CLASS_PATH=$(CLJS_SRC_DIR):$(CLJS_BASE_DIR)/lib

REBAR=./rebar


all: deps erlang
	@$(REBAR) compile

erlang: force_look
	cd deps/proper_stdlib/; ./rebar compile
	@$(REBAR) compile

cljs-compiler:
	cd cljs; ./scripts/bootstrap

cljs: force_look
	-rm -r $(CLJS_OUT_DIR)/*
	cd $(CLJS_BASE_DIR); time $(CLJSC) ../$(CLJS_SRC_DIR) "{$(CLJS_OPTS)}"

deps:
	@$(REBAR) get-deps

clean:
	@$(REBAR) clean

rel: all cljs
	@$(REBAR) generate

xref: clean all
	@$(REBAR) xref

force_look:
	@true
