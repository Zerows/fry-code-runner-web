#!/usr/bin/env bash
rm tmp/pids/server.pid
bundle install
bundle exec rake ember:install
( cd frontend && npm install )
bundle exec rdebug-ide --host 0.0.0.0 --port 1234 --dispatcher-port 26162 -- /app/bin/rails s -b 0.0.0.0 -p 3000 -e development