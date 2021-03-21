# Backend

## prepare environment

1. `cp .env.example .env`
2. `cp .node_env.example .node_env`

## Steps to run as development

1.`docker-compose build node` 2. `docker-compose run node npm install` 3. `docker-compose run node npm run postinstall` 4. `docker-compose up -d node`

## 5. To stop server

`docker-compose stop node`

## To check server logs

`docker-compose logs -f --tail=100 node`
