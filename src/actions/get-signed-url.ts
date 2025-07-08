"use server"

import { s3Client } from "@/lib/s3-client"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"

export const getSignerURL = async(type: string, size: number, checkSum: string, description: string)=>{

    const command = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: randomUUID(),
        ContentType: type,
        ContentLength: size,  //! If the client passes an invalid size AWS will literally reject it.
        ChecksumSHA256: checkSum, //$ This is optional and guarantees that the image has keeps its integrity
        Metadata: {
            userId: '123',
            description
        }
    })



    const presignedUrl = await getSignedUrl(s3Client, command, {expiresIn: 60})

    return {message: 'Success', url: presignedUrl}

}