"use server"

import { s3Client } from "@/lib/s3-client"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { getOrSetUniqueUserIdentifier } from "@/utils/get-or-set-unique-user-identifier"
import { isRateLimited } from "redis-rate-limiter-express"
import { redisClient } from "@/lib/redis/redis-client"
import { RedisClientType } from "redis"


type Params = {
    type: string
    size: number
    description: string
}

export const getSignerURL = async({type, size, description}: Params)=>{

    try{
        const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()

        //* Look for a rate limit (Only 2 requests in 20 seconds)
        const isLimited = await isRateLimited(redisClient as RedisClientType, {
            requestLimit: 2,
            windowSizeSecs: 20,
            uniqueUserIdentifier,
        })

        if(isLimited){ return {message: 'Too many requests, please try again in a moment', success: false}}

        //* Create a signed URL from AWS

        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: randomUUID(),
            ContentType: type,
            ContentLength: size,  //! If the client passes an invalid size AWS will literally reject it.
            Metadata: {
                uniqueuseridentifier: uniqueUserIdentifier, //! AWS sets metadata all lower case that is why I set it like this.
                description
            }
        })
        
        const presignedUrl = await getSignedUrl(s3Client, command, {expiresIn: 60})
        
        return {message: 'Success', success: true, url: presignedUrl}
        
    }catch(e){
        return {message: 'Something went wrong creating the url', success: false, error: e}
    }
}

