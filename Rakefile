#-*-ruby-*-
require 'rake'

task :default => ["erlang:applications", "erlang:compile", "erlang:tests", "erlang:releases"]
task :shell => ["erlang:applications", "erlang:compile", "erlang:tests", "erlang:releases", "otp:shell"]
