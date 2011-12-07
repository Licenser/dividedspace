deps:
	./rebar get-deps

erlv8: deps
	make -C deps/erlv8

all: deps erlv8
	./rebar compile
