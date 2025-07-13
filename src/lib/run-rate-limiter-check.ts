import {isRateLimited} from 'redis-rate-limiter-express'
import { redisClient } from "./redis-client";
import { RedisClientType } from "redis";
import { getOrSetUniqueUserIdentifier } from "@/utils/uuid-cookie";


//? Hopefully I can get the unique user identifier to be emails instead of IP addresses.
export const runRateLimiterCheck = async(): Promise<boolean>=> {


    const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()
       

    return isRateLimited(redisClient as RedisClientType, {
        requestLimit: 2,
        windowSizeSecs: 10,
        uniqueUserIdentifier,
    })
}