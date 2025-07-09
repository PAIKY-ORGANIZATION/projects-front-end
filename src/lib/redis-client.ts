import {createClient} from 'redis'


const redisClient = new createClient({
    socket: {
        host: process.env.REDIS_HOST,
        port: proccess.env.,
    }
})