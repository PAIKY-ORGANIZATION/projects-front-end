# There are two ways to run this app
 
 
## Without Docker
npm run dev_local
This will assume that you have redis on localhost:6379
 
 
## With Docker 

                                                        ⬇️⬇️⬇️
1- docker compose -f docker-compose.yml -f docker-compose-full.yml  up --build
This one should be able to run without any external redis container. It "has all it needs to have".



                                                        ⬇️⬇️⬇️
2- docker compose -f docker-compose.yml -f docker-compose-network.yml  up --build
This will assume that you have redis on localhost:6379 and it's under a network called paikynet (using you want to upload to AWS and reuse the redis instance for other projects)

## If uploading to AWS you need to manually set the credentials for S3 (It's already done in the Github workflow associated with this repo)



## Question:
In `docker-compose.yml`, why is there a `redis` service?

It's just a dummy.

The reason is that ``docker-compose down`` only stops services defined in `docker-compose.yml`. If a service isn’t listed, it won’t be stopped.
Meaning that if I run the full compose (`docker-compose-full.yml`) and I do `docker compose down` it will only stop the `next-app` service.
    
If I wanted to stop all the containers I would need to run

```docker compose down -f docker-compose.yml -f docker-compose-full.yml```

So to ensure docker-compose down always stops all relevant containers—without needing to pass multiple -f files every time—we include a dummy redis service in the main docker-compose.yml.

## Another Solution:

You can also use `docker compose -f docker-compose.yml -f docker-compose-full.yml  up --build -d` and not have a dummy redis service lol.