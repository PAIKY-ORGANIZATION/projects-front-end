'use client';

import { getSignerURL } from '@/actions/get-signed-url';
import { computeSHA256 } from '@/utils/compute-checksum';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ProfilePicture from './ProfilePicture';
//prettier-ignore
export default function PostForm() {
    const [content, setContent] = useState('')
    const [image, setImage] = useState<File | null>(null)

    const handleSubmit = async()=>{
        try{
            if(!image){toast.error('Please select an image'); return}
            
            const checkSum = await computeSHA256(image) //$ This is optional and guarantees that the image has keeps its integrity
            
            const result = await getSignerURL(image.type, image.size, checkSum, content)
            if(result.message !== 'Success'){ toast.error('Something went wrong creating the url'); return}
            
            const url = result.url
    
            await axios.put(url, image, {
                headers: {
                    "Content-Type": image?.type || "application/octet-stream"
                }
            })
    
            toast.success('Image uploaded successfully!')
            
        }catch(e){
            toast.error('⚠️ CHECK CONSOLE ⚠️'  + e)
            console.log(e);	
        }

    }

  return (
    <>
        <div className='flex items-center justify-around w-full  max-w-xl'>
            <h1 className="text-3xl font-bold text-center"> AWS S3 Upload Demo</h1>    
            <Image src="/s3.svg" alt="Logo" width={100} height={100}></Image>
        </div>

        <div className="max-w-xl w-full mx-auto mt-10 border border-gray-300 rounded-xl p-4 space-y-4 min-h-[35%] flex flex-col justify-around ">
                {image && (
                    <img src={URL.createObjectURL(image)} alt="Preview" className="rounded-lg max-h-60 object-contain" />
                )}
            <div className="flex items-start space-x-4">
                <ProfilePicture></ProfilePicture>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={3}
                className="w-full resize-none border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <input id="fileInput" type="file" accept="image/*" className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setImage(file)
                }}
            />
            <label htmlFor="fileInput"
                className="inline-block px-4 py-2  bg-[#13ae8a] border border-gray-300 rounded-md text-center font-bold text-sm cursor-pointer hover:bg-[#68b5a3]"
            > 
                Select Image
            </label>

            <button type="button" className="w-full bg-blue-600 text-white py-2 rounded-md font-bold text-sm hover:bg-blue-700" onClick={handleSubmit} >
                Post
            </button>
        </div>
    </>
  )
}
