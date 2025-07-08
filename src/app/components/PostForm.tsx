'use client'

import { getSignerURL } from '@/actions/get-signed-url'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function PostForm() {
  const [content, setContent] = useState('')
  const [image, setImage] = useState<File | null>(null)


    const handleSubmit = async()=>{
    
        const result = await getSignerURL()
        if(result.message !== 'Success'){ toast.error('Something went wrong creating the url'); return}
        
        const url = result.url

        const res = await axios.put(url, image, {
            headers: {
                "Content-Type": image?.type || "application/octet-stream"
            }
        })


        toast.success('Image uploaded successfully!')

    }

  return (
    
    <>
        <h1 className="text-3xl font-bold text-center"> AWS S3 Upload Demo</h1>    

        <div className="max-w-xl w-full mx-auto mt-10 border border-gray-300 rounded-xl p-4 space-y-4 h-[35%] flex flex-col justify-around ">
            <div className="flex items-start space-x-4">
                <img src="/profile.jpeg" alt="Profile" className="w-12 h-12 rounded-full object-cover"/>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={3}
                className="w-full resize-none border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <input type="file" accept="image/*" className="block w-full text-sm text-gray-700" 
                onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) setImage(file)
                }}
            />


            {image && (
                <img src={URL.createObjectURL(image)} alt="Preview" className="rounded-lg max-h-60 object-contain" />
            )}

            <button type="button" className="w-full bg-blue-600 text-white py-2 rounded-md text-sm hover:bg-blue-700" onClick={handleSubmit} >
                Post
            </button>
        </div>
    
    </>
  )
}
