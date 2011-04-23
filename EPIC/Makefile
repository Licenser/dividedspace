clean-rel:
	@rm -rf  rel/epic

clean: clean-rel
	@rm -rf ebin/*.beam

compile:
	@./rebar compile

recompile: clean compile

generate: compile clean-rel
	@./rebar generate
	@chmod +x rel/epic/bin/epic

all: generate

console:
	./rel/epic/bin/epic console
