clean-rel:
	@rm -rf  rel/ds_store

clean: clean-rel
	@rm -rf ebin/*.beam
	@rm -rf doc

compile:
	@./rebar compile

recompile: clean compile

generate: compile clean-rel
	@./rebar generate
	@chmod +x rel/ds_store/bin/ds_store

all: generate

console:
	./rel/ds_store/bin/ds_store console
