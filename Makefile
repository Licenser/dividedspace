all: core epic ds_web

core: force_look
	cd core; rake

epic: force_look
	make -C epic

ds_web: force_look
	make -C ds_web

shell: all force_look
	erl -pa core/lib/*/ebin/ epic/ebin epic/deps/erlv8/ebin ds_web/ebin --config standalone.config

force_look:
	@true

