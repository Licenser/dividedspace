{application, epic,
 [
  {description, ""},
  {vsn, "1.0.0"},
  {registered, []},
  {modules, [
             epic_app,
             epic_sup,
	     epic_server,
	     module
            ]},
  {applications, [
                  kernel,
                  stdlib
                 ]},
  {mod, { epic_app, []}},
  {env, []}
 ]}.
