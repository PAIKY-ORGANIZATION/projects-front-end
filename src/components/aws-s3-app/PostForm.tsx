'use client';

import { getSignerURL } from '@/actions/s3-app/get-signed-url';
import axios from 'axios';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ProfilePicture from '../ProfilePicture';
import ColorButton from '../Button';
import { useRouter } from 'next/navigation';
//prettier-ignore
export default function PostForm() {
    const [content, setContent] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const router = useRouter()

    const handleSubmit = async()=>{
        
        if(!image){toast.error('Please select an image'); return}
        if(!content){toast.error('Please add a caption'); return}
        const uploadToastId = toast.loading('Uploading...') //* We dismiss this and remove it from the screen once there's a response from trying to upload the image.
         
        try{
            
            const result = await getSignerURL({ type: image.type, size: image.size, description: content})

            if(!result.success){ toast.error(result.message!); return}
            const url = result.url
            

            await axios.put(url!, image, {
                headers: {
                    "Content-Type": image?.type || "application/octet-stream"
                }
            })
    
            toast.success((t) => (
                <div onClick={() => {toast.dismiss(t.id); router.push('/aws-s3-app/posts'); }}
                className="cursor-pointer flex items-center space-x-2" >
                    <span>Success!</span>
                    <span className="underline">Go see your posts</span>
                </div>
            ), {
                duration: 4000,
                icon: '🎉',
            });
            
        }catch(e){
            toast.error('⚠️ CHECK CONSOLE ⚠️'  + e)
            console.log(e);	
        } finally{
            toast.dismiss(uploadToastId)
        }

    }
    
    return (
        <>
        {/* <ReadDocs href={'/docs/aws-s3-app'}></ReadDocs> */}
        <div className="flex flex-col items-center justify-center space-y-2 mb-4">
            <Image src="/s3.svg" alt="Logo" width={80} height={80} />
            <h1 className="text-2xl font-semibold text-center">AWS S3 Image Upload Demo!</h1>
        </div>
        <div className="text-center text-gray-300 space-y-1 mb-6">
            <p className="text-sm sm:text-base">Upload an image and add a caption.</p>
            <p className="text-sm sm:text-base">Once uploaded, your post will be securely stored in an S3 bucket. (You  may visit your posts at any time.)</p>
        </div>

        <div className="max-w-xl w-full mx-auto   rounded-xl p-4 space-y-4 min-h-[35%] flex flex-col justify-around bg-[#1c1c1c] border border-gray-600">
                {image && (
                    <img src={URL.createObjectURL(image)} alt="Preview" className="rounded-lg max-h-60 object-contain" />
                )}
            <div className="flex items-start space-x-4">
                <ProfilePicture></ProfilePicture>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={3}
                className="w-full resize-none border border-gray-300 rounded-md p-2 text-sm bg-[#414141] text-white"
                />
            </div>
            <div className="flex flex-col gap-5 w-[90%] max-w-sm mx-auto mt-">
                <input id="fileInput" type="file" accept="image/*" className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) setImage(file)
                    }}
                />
                <p className='text-center text-green-400'> Only you will be able to see this image once uploaded to S3!</p>
                
                {/* //* I know you would normally use a label with "htmlFor=''" but I do this in order to re-use the ColorButton. */}
                <ColorButton color="blue" width="full" type="button" onClick={() => document.getElementById('fileInput')?.click()} >
                    Select Image
                </ColorButton>

                <ColorButton color="green" width="full" onClick={handleSubmit}> Post </ColorButton>
            
            </div>
        </div>

    </>
  )
}
