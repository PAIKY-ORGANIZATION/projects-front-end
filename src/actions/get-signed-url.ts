"use server"

import { s3Client } from "@/lib/s3-client"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { runRateLimiterCheck } from "@/lib/run-rate-limiter-check"
import { getOrSetUniqueUserIdentifier } from "@/utils/uuid-cookie"

export const getSignerURL = async(type: string, size: number, description: string)=>{

    try{
        const isLimited = await runRateLimiterCheck()

        if(isLimited){
            return {message: 'Too many requests, please try again in a moment', success: false}
        }

        const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()
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