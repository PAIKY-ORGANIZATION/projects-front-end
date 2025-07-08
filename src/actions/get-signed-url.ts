"use server"

import { s3Client } from "@/lib/s3-client"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const getSignerURL = async()=>{

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: 'TestKey'
    })



    const presignedUrl = await getSignedUrl(s3Client, command, {expiresIn: 60})

    return {message: 'Success', url: presignedUrl}

}