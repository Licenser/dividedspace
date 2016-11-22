-module(ds_web_api_behaviour).

-export([behaviour_info/1]).

%% @private
behaviour_info(callbacks) ->
    [{get_sub_handler, 3},
     {delete, 1},
     {forbidden, 2},
     {create, 2},
     {exists, 1},
     {list_resources, 0},
     {list_resources_for_parent, 1},
     {get_data, 1},
     {get_owner, 1},
     {put_data, 2}];

behaviour_info(_Other) ->
	undefined.


