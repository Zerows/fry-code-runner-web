

![Ruby](https://github.com/Zerows/fry-code-runner-web/workflows/Ruby/badge.svg?branch=master)
![Node.js CI](https://github.com/Zerows/fry-code-runner-web/workflows/Node.js%20CI/badge.svg?branch=master)


## Development Setup

1. docker-compose up
2. docker exec -it code-fry-app bash (log into container)


## Useful commands

docker-compose up -d (Bring up containers in daemon mode)

docker-compose stop (Stop containers)

docker-compose rm -f (stop and remove existing images)

docker-compose ps (Check Status of the containers)

docker exec -it postgres bash (To log into postgres container)

docker exec -it code-fry-app bash (To log into code-fry-app container)

docker-compose build (To build new images (run if you made any changes in your dockerfile))

docker system prune (kills all existing images)


## Rake commands to setup the app

1. docker exec -it code-fry-app bash (To log into code-fry-app container)
2. rake db:create
3. rake db:migrate
4. bundle exec rspec (to execute rspec tests)
5. rake rmq:publish (to publish messages to queue)

## Debug

> bundle exec rdebug-ide --host 0.0.0.0 --port 1234 --dispatcher-port 26162 -- /app/bin/rails s -b 0.0.0.0 -p 3000 -e development

> Expose - "1234:1234" for web on docker compose.

> Add remote sdk for ruby (Rubymine -> Preferences -> SDK & Gems -> Language & Frameworks)

> Edit Config -> Add Remote ruby config -> ![Run Config Image](readme/images/remote_debug_config.png)


## Production Deployment

1. export POSTGRES_PASSWORD="example" && export SECRET_KEY_BASE="1e7c79f719c7b273c06232d5176416cb6076e7bb6e5a70eed72d49918dd27b6aaf5d8ef85b60092c28bcd7813c0fc81427b6ed9d0241d8a048cb2afc31e34151" && docker-compose -f docker-compose.yml -f docker-compose.production.yml up

2. docker-compose build web (to build web service separately)

3. docker-compose up --no-deps -d web (to restart web alone without affecting other dependent services)
