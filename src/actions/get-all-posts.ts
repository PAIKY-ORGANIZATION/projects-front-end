"use server"

import { s3Client } from "@/lib/s3-client";
import { ListObjectsCommand, ListObjectsCommandOutput, _Object } from "@aws-sdk/client-s3";





//* "Contents" will be an array like this:
//  [
//     {
//         "Key": "1c94e143-de48-4bc0-b629-63e53c5fcf83",
//         "LastModified": "2025-07-08T17:03:03.000Z",
//         "ETag": "\"43de75e9d20d8f666b662f694d6f1bdf\"",
//         "Size": 771,
//         "Owner": {
//             "ID": "3e3de4d303527d8bafe4a50ad53bab6bfe68a8b77b279e8ec013e28917417eec"
//         }
//     },
//     {
//
//     },
//     {
//
//     }
//  ]


const _listObjectsContents = async()=>{
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME
    })
    const {Contents} =   await s3Client.send(command) as ListObjectsCommandOutput
    return Contents as _Object[] | undefined
}



const _getObjectPublicURL = (object: _Object)=>{
    return 'https://' + process.env.AWS_BUCKET_NAME + '.s3.' + process.env.AWS_BUCKET_REGION + '.amazonaws.com/' + object.Key
}



export const getAllPosts = async()=>{

    const contents = await _listObjectsContents()

    if(!contents){return []}

    const urls =  contents.map((object)=> {
        return {objectURL: _getObjectPublicURL(object)}
    })

    return urls

}