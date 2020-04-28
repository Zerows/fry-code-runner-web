#!/usr/bin/env bash
bundle install
bundle exec rake ember:install
cd frontend && npm install
echo "Starting rails"
bundle exec /app/bin/rails s -e production