

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { deleteObject } from '@/actions/s3-app/delete-object';
import ProfilePicture from '../ProfilePicture';
import toast from 'react-hot-toast';

type Post = {
	objectURL: string;
	key: string

	metadata: ImageMetadata
	time: Date | undefined
};

interface PostsPageProps {
	posts: Post[];
}


//prettier-ignore
export default function PostsPage({ posts }: PostsPageProps) {
	const onDeletePost = async (key: string) => {
		try{
			await deleteObject(key)
			toast.success('Puff! Post deleted!')
		}catch(e){
			toast.error('Something went wrong deleting the post');
			console.log(e);	
		}
		return;
	};

	const onShareUrl = (url: string)=>{
		//! Seems like this doesn't work if we're using HTTP and not HTTPS
		try{
			navigator.clipboard.writeText(url)
			toast.success('Copied Image URL to clipboard!')
			return
			
		}catch(e){
			console.log(e);	
		}
	}

	const [openDropdown, setOpenDropdown] = useState<string | null>(null);

	return (
		<div className="min-w-[40%] max-w-[600px] mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold text-center">Your Posts</h1>

			{posts.length === 0 ? (
				<p className="text-center text-gray-400"> No posts available. </p>
			) : (
				<div className="space-y-4">
					{posts.map((post) => (
						<div key={post.objectURL} className="bg-[#1c1c1c] p-4 rounded-sm space-y-3" >
							<div className="flex justify-between items-center">
								<div className='flex items-center gap-2'>
									<ProfilePicture></ProfilePicture>
									<p className="font-bold">You -</p>
									<span className="text-xs text-gray-400"> {post.time?.toLocaleString()} </span>
								</div>

								{/* //* ==================  Three dots menu ================ */}
								<div className="relative">
									<button className="w-8 h-8 rounded hover:bg-gray-700 flex items-center justify-center" onClick={() => setOpenDropdown(post.key)}>
										<span className="text-xl">⋮</span>
									</button>

									{openDropdown === post.key && (
										<div className="absolute right-0 mt-1 w-28 bg-[#2a2a2a] border border-gray-700 rounded shadow-lg z-10">
											<button onClick={() => { onDeletePost(post.key); setOpenDropdown(null); }}
											className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700">
												Delete
											</button>
											<button onClick={() => { onShareUrl(post.objectURL); setOpenDropdown(null); }}
											className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700">
												Share URL
											</button>
										</div>
									)}
								</div>
							</div>
							{/* //* ==================  End of Three dots menu ================ */}


							<p className="text-white text-sm">
								{post.metadata?.description || 'No description'}
							</p>
							{post.objectURL && (
								<Image src={post.objectURL} alt="Post image" width={600} height={400} className="w-full rounded-md object-contain" />
							)}
						</div>
					))}
					<p className="text-center text-gray-500"> No more posts available</p>
				</div>
			)}
		</div>
	);
}
