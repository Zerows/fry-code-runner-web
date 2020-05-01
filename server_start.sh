#!/usr/bin/env bash
bundle install --without test development
bundle exec rake ember:install
cd frontend && npm install
echo "Starting rails"
bundle exec rake assets:precompile
bundle exec /app/bin/rails s -e production