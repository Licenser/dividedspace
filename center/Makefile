REBAR=./rebar

all: deps appfile force_look
	@$(REBAR) compile

appfile: src/*
	cd src; RES=""; for i in *.erl; do RES="$$RES $$i"; done; RES=`echo $$RES | sed 's/.erl /, /g' | sed 's/.erl$$//'`; sed "s/%MODULES%/$$RES/" < center.app.in > center.app.src

deps:
	@$(REBAR) get-deps

clean:
	@$(REBAR) clean

rel: all
	@$(REBAR) generate

xref: clean all
	@$(REBAR) xref

force_look:
	@true
