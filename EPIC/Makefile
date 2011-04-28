clean:
	@./rebar clean

compile:
	@./rebar compile

recompile: clean compile

generate: compile
	@./rebar generate
	@chmod +x rel/epic/bin/epic

all: generate

console:
	./rel/epic/bin/epic console
