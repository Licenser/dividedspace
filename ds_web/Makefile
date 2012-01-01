CLJS_OUT_DIR=htdocs/cljs
CLJS_SRC_DIR=cljs-src
CLJS_BASE_DIR=./cljs
CLJS_WATCH_DIR=./cljs-watch
CLJSC=./bin/cljsc
CLOJURESCRIPT_HOME=./cljs
#CLJS_OPTS=":optimizations :advanced :output-dir \"../$(CLJS_OUT_DIR)\" :output-to \"../$(CLJS_OUT_DIR)/boot.js\""
CLJS_OPTS=":optimizations :simple :output-dir \"../$(CLJS_OUT_DIR)\" :output-to \"../$(CLJS_OUT_DIR)/boot.js\""
CLASS_PATH=$(CLJS_SRC_DIR):$(CLJS_BASE_DIR)/lib
PROJECT=ds_web

REBAR=./rebar


all: deps appfile erlang 
	@$(REBAR) compile

appfile: src/*
	cd src; RES=""; for i in *.erl; do RES="$$RES $$i"; done; RES=`echo $$RES | sed 's/.erl /, /g' | sed 's/.erl$$//'`; sed "s/%MODULES%/$$RES/" < $(PROJECT).app.in > $(PROJECT).app.src

erlang: force_look
	cd deps/proper_stdlib/; ./rebar compile
	@$(REBAR) compile

cljs-compiler:
	cd cljs; ./scripts/bootstrap
	cd $(CLJS_WATCH_DIR); lein deps

cljs: force_look
	-rm -r $(CLJS_OUT_DIR)/*
	cd $(CLJS_BASE_DIR); time $(CLJSC) ../$(CLJS_SRC_DIR) "{$(CLJS_OPTS)}"


cljs-watch: force_look
	-rm -r $(CLJS_OUT_DIR)/*
	cd cljs-watch; CLOJURESCRIPT_HOME=../cljs; ./cljs-watch ../$(CLJS_SRC_DIR) "{$(CLJS_OPTS)}"

deps:
	@$(REBAR) get-deps

clean:
	@$(REBAR) clean

rel: all cljs
	@-[ -d rel/$(PROJECT) ] && rm -rf rel/$(PROJECT) || true
	@$(REBAR) generate

xref: clean all
	@$(REBAR) xref

force_look:
	@true
