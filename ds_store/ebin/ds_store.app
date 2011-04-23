{application, ds_store,
 [
  {description, ""},
  {vsn, "1.0.0"},
  {registered, []},
  {modules, [
             ds_store_app,
             ds_store_sup,
             unit_server,
             unit_sup,
             storage,
	     uuid,
             unit
            ]},
  {applications, [
                  kernel,
                  stdlib
                 ]},
  {mod, { ds_store_app, []}},
  {env, []}
 ]}.
