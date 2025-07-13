'use client';

import { getSignerURL } from '@/actions/get-signed-url';
import { computeSHA256 } from '@/utils/compute-checksum';
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
            const checkSum = await computeSHA256(image) //$ This is optional and guarantees that the image has keeps its integrity
            
            const result = await getSignerURL(image.type, image.size, checkSum, content)
            if(result.message !== 'Success'){ toast.error('Something went wrong creating the url'); return}
            
            const url = result.url
            

            await axios.put(url, image, {
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
        <div className='flex items-center justify-around w-full  max-w-xl'>
            <h1 className="text-3xl font-bold text-center"> AWS S3 Upload Demo</h1>    
            <Image src="/s3.svg" alt="Logo" width={100} height={100}></Image>
        </div>

        <div className="max-w-xl w-full mx-auto   rounded-xl p-4 space-y-4 min-h-[35%] flex flex-col justify-around bg-[#1c1c1c]">
                {image && (
                    <img src={URL.createObjectURL(image)} alt="Preview" className="rounded-lg max-h-60 object-contain" />
                )}
            <div className="flex items-start space-x-4">
                <ProfilePicture></ProfilePicture>
                <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="What's on your mind?" rows={3}
                className="w-full resize-none border border-gray-300 rounded-md p-2 text-sm bg-[#414141] text-white"
                />
            </div>
            <div className="flex flex-col  gap-2 w-[80%] items-center mx-auto">
                <input id="fileInput" type="file" accept="image/*" className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) setImage(file)
                    }}
                />
                
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
