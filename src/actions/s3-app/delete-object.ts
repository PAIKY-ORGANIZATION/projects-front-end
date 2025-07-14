"use server"


import { s3Client } from "@/lib/s3-client"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"



export const deleteObject = async(key: string)=>{


    const command = new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key
    })


    // //? Some error handling would not hurt.
    const result = await s3Client.send(command)

    

    return result
}