# blogexerciseexpress

## Installation

Launch first:

- `yarn install`

Copy ".env.template" to ".env"

## Running the app

Start docker with:

- `docker-compose -f dev/docker/docker-compose.yml up`

To access the db in docker, run:

- `docker exec -it docker_postgres_blog_post_1 psql -d postgres_blog_post -U root`

("docker_postgres_blog_post_1" is the name of the container running the postgres db, "psql" is for launching postgres cli, and "-d" means database name, "-U" database user)

Then we need to build the project with:

- `yarn build`

Finally:

- `yarn start`

The project use `postgresql`.

## Description

This project intend to be as the blogexercice project but with express, typescript and typera.

You can access swagger OpenAPI after the project is started at the url: http://localhost:3000/api-docs

To generate openapi file, need to check if in index.ts, "router", there is all the routes inside it as in "app.use(router(", then `yarn run generate-openapi`

## Example of curl command

As this is only the backend, to use it without frontend, you could use curl

Exemple (in JSON, for correct type validation POST and PATCH):

- `curl --header "Content-Type: application/json" -X GET http://localhost:3000/blogpost -H "Origin: http://localhost"`
- `curl --header "Content-Type: application/json" -X POST --data '{"title":"My First Title", "content":"My First Post", "likes":10}' http://localhost:3000/blogpost -H "Origin: http://localhost"`
- `curl --header "Content-Type: application/json" -X DELETE http://localhost:3000/blogpost/2 -H "Origin: http://localhost"`
- `curl --header "Content-Type: application/json" -X PATCH --data '{"content":"My Modified Post", "likes":20}' http://localhost:3000/blogpost/4 -H "Origin: http://localhost"`
