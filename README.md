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