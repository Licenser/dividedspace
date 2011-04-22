clean-rel:
	@rm -rf  rel/epic

clean: clean-rel
	@rm -rf ebin/*.beam

compile:
	@./rebar compile

recompile: clean compile

generate: clean-rel compile
	@./rebar generate
	@chmod +x rel/epic/bin/epic

all: generate

console: generate
	./rel/epic/bin/epic console
