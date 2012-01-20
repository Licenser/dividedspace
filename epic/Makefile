REBAR=./rebar
PROJECT=epic


all: deps erlv8 appfile force_look
	@$(REBAR) compile

appfile: src/*
	cd src; RES=""; for i in *.erl; do RES="$$RES $$i"; done; RES=`echo $$RES | sed 's/.erl /, /g' | sed 's/.erl$$//'`; sed "s/%MODULES%/$$RES/" < $(PROJECT).app.in > $(PROJECT).app.src

deps: force_look
	@$(REBAR) get-deps

erlv8: deps force_look
	@make -C deps/erlv8

clean_self:
	@$(REBAR) clean skip_deps=true

self: appfile src/*.erl
	-$(REBAR) compile skip_deps=true

xref: clean_self self
	@$(REBAR) xref skip_deps=true
 
clean:
	@$(REBAR) clean

rel: all
	@-[ -d rel/$(PROJECT) ] && rm -rf rel/$(PROJECT) || true
	@$(REBAR) generate

force_look:
	@true
