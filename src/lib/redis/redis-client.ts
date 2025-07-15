import {createClient} from 'redis'


export const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST!,
        port: Number(process.env.REDIS_PORT!),
    }
})

const connectToRedis = async()=>{
    if (redisClient.isOpen || redisClient.isReady) return; //! Need to check this because next-config loads multiple times
    try{
        await redisClient.connect()
    }catch(e){
        console.error(e);	
        throw new Error('Could not connect to Redis')   
    }
}


await connectToRedis()
