"use server"

import { s3Client } from "@/lib/s3-client";
import { ListObjectsCommand, ListObjectsCommandOutput, _Object, HeadObjectCommand } from "@aws-sdk/client-s3";





//* "objects" will be an array like this:
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

//prettier-ignore
const _listObjectsContents = async()=>{
    const command = new ListObjectsCommand({
        Bucket: process.env.AWS_BUCKET_NAME
    })
    const {Contents: objects} =   await s3Client.send(command) as ListObjectsCommandOutput
    return objects as _Object[] | undefined
}


//prettier-ignore
const _getObjectPublicURL = (object: _Object)=>{
    return 'https://' + process.env.AWS_BUCKET_NAME + '.s3.' + process.env.AWS_BUCKET_REGION + '.amazonaws.com/' + object.Key
}


//prettier-ignore
const _getObjectMetadata = async(key: string)=>{

    const command = new HeadObjectCommand({
        
    })

    return
}


//prettier-ignore
export const getAllPosts = async()=>{

    const objects = await _listObjectsContents()

    if(!objects){return []}

    const urls =  objects.map((object)=> {
        return {
            objectURL: _getObjectPublicURL(object), 
            key: object.Key!,
            metadata: _getObjectMetadata()
        } //* the key is to delete the file, the url is to show the file
    })

    return urls

}