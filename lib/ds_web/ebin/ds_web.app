%% This is the application resource file (.app file) for the ds_web,
%% application.
{application, ds_web,
  [{description, "Your Desc HERE"},
   {vsn, "0.1.0"},
   {modules, [ds_web_app,
              ds_web_sup]},
   {registered,[ds_web_sup]},
   {applications, [kernel, stdlib]},
   {mod, {ds_web_app,[]}},
   {start_phases, []}]}.
