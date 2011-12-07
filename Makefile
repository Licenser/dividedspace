all: center epic ds_web

center: force_look
	make -C center

epic: force_look
	make -C epic

ds_web: force_look
	make -C ds_web

shell: all force_look
	erl -pa center/ebin/ epic/ebin epic/deps/erlv8/ebin ds_web/ebin --config standalone.config

force_look:
	@true

