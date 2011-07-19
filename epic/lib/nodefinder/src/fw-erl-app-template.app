{ application, nodefinder,
  [ 
    { description, "Erlang multicast node discovery service." }, 
    { vsn, "0.2.1" },
    { modules, [ @FW_ERL_APP_MODULES@ ] },
    { registered, [ @FW_ERL_APP_REGISTERED@ ] },
    { applications, [ kernel, stdlib @FW_ERL_PREREQ_APPLICATIONS@ @FW_ERL_PREREQ_APPLICATIONS_EXTRA@ ] },
    @FW_ERL_APP_MOD_LINE@
    { env, @FW_ERL_APP_ENVIRONMENT@ }
    @FW_ERL_APP_EXTRA@
  ] 
}.
