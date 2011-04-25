doc: 
	@./rebar doc

clean-rel:
	@cd epic && make clean-rel
	@cd ds_store && make clean-rel
	@rm -rf  rel/dividedspace

clean: clean-rel
	@cd epic && make clean
	@cd ds_store && make clean
	@rm -rf ebin/*.beam

compile:
	@./rebar compile

recompile: clean compile


dialyze: recompile
	@./rebar dialyze

generate: compile clean-rel
	@./rebar generate
	@chmod +x epic/rel/epic/bin/epic
	@chmod +x ds_store/rel/ds_store/bin/ds_store
	@chmod +x rel/dividedspace/bin/dividedspace

all: generate

console:
	./rel/dividedspace/bin/dividedspace console
