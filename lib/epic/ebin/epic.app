{application, epic,
 [
  {description, ""},
  {vsn, "1.0.0"},
  {registered, []},
  {modules, [
             epic_app,
             epic_sup,
	     epic_server,
	     weapon,
	     module_type,
	     fight_server,
	     fight_worker,
	     module,
	     unit,
	     fight_sup,
	     turn_server,
	     epic_event,
	     fight
            ]},
  {applications, [
                  kernel,
                  stdlib
                 ]},
  {mod, { epic_app, []}},
  {env, []}
 ]}.
