#!/usr/bin/env bash
bundle check || bundle install
echo "*********Gem check over*******"
rm tmp/pids/server.pid
RUN rake ember:install
bundle exec rdebug-ide --host 0.0.0.0 --port 1234 --dispatcher-port 26162 -- /app/bin/rails s -b 0.0.0.0 -p 3000 -e development