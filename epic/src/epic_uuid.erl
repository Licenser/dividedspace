% Copyright (c) 2008, Travis Vachon
% All rights reserved.
%
% Redistribution and use in source and binary forms, with or without
% modification, are permitted provided that the following conditions are
% met:
%
%     * Redistributions of source code must retain the above copyright
%       notice, this list of conditions and the following disclaimer.
%
%     * Redistributions in binary form must reproduce the above copyright
%       notice, this list of conditions and the following disclaimer in the
%       documentation and/or other materials provided with the distribution.
%
%     * Neither the name of the author nor the names of its contributors
%       may be used to endorse or promote products derived from this
%       software without specific prior written permission.
%
% THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
% "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
% LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
% A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
% OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
% SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
% TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
% PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
% LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
% NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
% SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
%
-module(epic_uuid).
-export([init/0, v4/0]).
-include("epic_types.hrl").

init() ->
    random:seed(erlang:now()).

% Generates a random binary UUID.
-spec v4() ->
		uuid().
-spec v4(non_neg_integer(),non_neg_integer(),non_neg_integer(),non_neg_integer()) ->
		uuid().
v4() ->
  v4(random:uniform(round(math:pow(2, 48))) - 1, random:uniform(round(math:pow(2, 12))) - 1, random:uniform(round(math:pow(2, 32))) - 1, random:uniform(round(math:pow(2, 30))) - 1).
v4(R1, R2, R3, R4) ->
    list_to_binary(to_string(<<R1:48, 4:4, R2:12, 2:2, R3:32, R4: 30>>)).

-spec to_string(uuid()) ->
		       list().
% Returns a string representation of a binary UUID.
to_string(U) ->
    lists:flatten(io_lib:format("~8.16.0b-~4.16.0b-~4.16.0b-~2.16.0b~2.16.0b-~12.16.0b", get_parts(U))).

-spec get_parts(uuid()) ->
		       [non_neg_integer(),...].
% Returns the 32, 16, 16, 8, 8, 48 parts of a binary UUID.
get_parts(<<TL:32, TM:16, THV:16, CSR:8, CSL:8, N:48>>) ->
    [TL, TM, THV, CSR, CSL, N].
