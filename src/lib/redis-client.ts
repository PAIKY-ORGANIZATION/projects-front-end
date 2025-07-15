import {createClient} from 'redis'


export const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT!),
    }
})

export const connectToRedis = async()=>{
    try{
        await redisClient.connect()
    }catch(e){
        console.error(e);	
        throw new Error('Could not connect to Redis')   
    }
}


