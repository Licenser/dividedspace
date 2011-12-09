DS_WEB_BIN=ds_web/ebin ds_web/deps/epgsql/ebin ds_web/deps/cowboy/ebin
EPIC_BIN=epic/ebin epic/deps/erlv8/ebin
CENTER_BIN=center/ebin

all: center epic ds_web

center: force_look
	make -C center

epic: force_look
	make -C epic

ds_web: force_look
	make -C ds_web

shell: all force_look
	erl -sname ds -pa $(CENTER_BIN) $(EPIC_BIN) $(DS_WEB_BIN) -config standalone.config

clean:
	make -C center clean
	make -C epic clean
	make -C ds_web clean

force_look:
	@true

