import {createClient} from 'redis'


export const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT!),
    }
})


try{
    await redisClient.connect()
}catch(e){
    console.error('Error connecting to redis:');
    console.error(e);	
}