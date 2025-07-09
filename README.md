There are two ways to run this app
                                                       ⬇️⬇️⬇️
1- docker compose -f docker-compose.yml -f docker-compose-full.yml  up --build
This one should be able to run without any external redis container. It "has all it needs to have".



                                                        ⬇️⬇️⬇️
2- docker compose -f docker-compose.yml -f docker-compose-network.yml  up --build