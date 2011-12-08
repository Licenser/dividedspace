REBAR=./rebar

all: deps force_look
	@$(REBAR) compile

deps:
	@$(REBAR) get-deps

clean:
	@$(REBAR) clean

rel: all
	@$(REBAR) generate

force_look:
	@true
