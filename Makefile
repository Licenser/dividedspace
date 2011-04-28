doc: 
	@./rebar doc


clean:
	@cd epic && make clean
	@cd ds_store && make clean
	@./rebar clean

compile:
	@./rebar compile

recompile: clean compile


dialyze: recompile
	@./rebar dialyze

generate: compile
	@./rebar generate
	@chmod +x epic/rel/epic/bin/epic
	@chmod +x ds_store/rel/ds_store/bin/ds_store
	@chmod +x rel/dividedspace/bin/dividedspace

all: generate

console:
	./rel/dividedspace/bin/dividedspace console
