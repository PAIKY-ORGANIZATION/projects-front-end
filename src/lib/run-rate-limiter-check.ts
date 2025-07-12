import { headers } from "next/headers"
import {isRateLimited} from 'redis-rate-limiter-express'
import { redisClient } from "./redis-client";
import { RedisClientType } from "redis";
import { uuidCookie } from "@/utils/uuid-cookie";


//? Hopefully I can get the unique user identifier to be emails instead of IP addresses.
export const runRateLimiterCheck = async(): Promise<boolean>=> {

    const headersStore = await headers();

    const ip =
        headersStore.get('ip') || //* This is passed from middleware
        await uuidCookie()

    return isRateLimited(redisClient as RedisClientType, {
        requestLimit: 3,
        windowSizeSecs: 10,
        uniqueUserIdentifier: ip,
    })
}