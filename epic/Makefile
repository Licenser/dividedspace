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

force_look:
	@true
