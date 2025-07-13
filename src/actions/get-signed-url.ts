"use server"

import { s3Client } from "@/lib/s3-client"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { runRateLimiterCheck } from "@/lib/run-rate-limiter-check"
import { getOrSetUniqueUserIdentifier } from "@/utils/get-or-set-unique-user-identifier"


type Params = {
    type: string
    size: number
    description: string
}

export const getSignerURL = async({type, size, description}: Params)=>{

    try{
        //* Look for a rate limit
        const isLimited = await runRateLimiterCheck()
        console.log('test2');

        if(isLimited){ return {message: 'Too many requests, please try again in a moment', success: false}}

        //* Create a signed URL from AWS
        const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()

        console.log('test3');

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
        console.log('test4');
        
        return {message: 'Success', success: true, url: presignedUrl}
        
    }catch(e){
        return {message: 'Something went wrong creating the url', success: false, error: e}
    }
}

