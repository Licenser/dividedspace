all: core epic

core: force_look
	cd core; rake

epic: force_look
	make -C epic

shell: core epic force_look
	erl -pa core/lib/*/ebin/ epic/ebin epic/deps/erlv8/ebin --config standalone.config

force_look:
	@true

