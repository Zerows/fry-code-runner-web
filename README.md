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
