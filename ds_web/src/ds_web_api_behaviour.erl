-module(ds_web_api_behaviour).

-export([behaviour_info/1]).

%% @private
behaviour_info(callbacks) ->
    [{get_sub_handler, 3},
     {delete, 2},
     {forbidden, 3},
     {create, 3},
     {exists, 2},
     {list_resources, 1},
     {list_resources_for_parent, 2},
     {get_data, 2},
     {get_owner, 2},
     {put_data, 3}];

behaviour_info(_Other) ->
	undefined.


