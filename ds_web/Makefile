CLJS_OUT_DIR=htdocs/cljs
CLJS_SRC_DIR=cljs-src
CLJS_BASE_DIR=./cljs
CLJSC=./bin/cljsc
#CLJS_OPTS=":optimizations :advanced :output-dir \"../$(CLJS_OUT_DIR)\" :output-to \"../$(CLJS_OUT_DIR)/boot.js\""
CLJS_OPTS=":optimizations :simple :output-dir \"../$(CLJS_OUT_DIR)\" :output-to \"../$(CLJS_OUT_DIR)/boot.js\""
CLASS_PATH=$(CLJS_SRC_DIR):$(CLJS_BASE_DIR)/lib

REBAR=./rebar


all: deps cljs force_look
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

rel: all
	@$(REBAR) generate

force_look:
	@true
