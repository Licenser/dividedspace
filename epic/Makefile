REBAR=./rebar


all: deps erlv8 force_look
	@$(REBAR) compile

deps:
	@$(REBAR) get-deps

erlv8: deps force_look
	@make -C deps/erlv8

clean:
	@$(REBAR) clean

rel: all
	@$(REBAR) generate

xref: clean all
	-rm deps/*/ebin/*
	@$(REBAR) xref

force_look:
	@true
