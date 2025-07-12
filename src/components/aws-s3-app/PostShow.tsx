// app/posts/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import ColorButton from '../Button';
import ReadDocs from '../ReadDocs';
import { deleteObject } from '@/actions/delete-object';
import Link from 'next/link';

type Post = {
	// id: string;
	objectURL?: string;
	key: string
	// content: string;
	// createdAt: string;
};

interface PostsPageProps {
	posts: Post[];
}


//prettier-ignore
export default function PostsPage({ posts }: PostsPageProps) {
	const onDeletePost = async (key: string) => {
		
		const result = await deleteObject(key)

		console.log(result);
		

		return;
	};

	return (
		<div className="max-w-[40%] mx-auto p-4 space-y-6">
            <ReadDocs href={'/docs'}></ReadDocs>
			<h1 className="text-3xl font-bold text-center">Your Posts</h1>

			{posts.length === 0 ? (
				<p className="text-center text-gray-400"> No posts available. </p>
			) : (
				<div className="space-y-4">
					{posts.map((post) => (
						<div key={post.objectURL} className="bg-[#1c1c1c] p-4 rounded-xl space-y-3" >
							<div className="flex justify-between items-center">
								<span className="text-xs text-gray-400"> {new Date( '2023-01-01' ).toLocaleString()} </span>
								<ColorButton color="red" width="fit" onClick={() => onDeletePost(post.key) }> Delete </ColorButton>
							</div>

							{post.objectURL && (
								<Image src={post.objectURL} alt="Post image" width={600} height={400} className="w-full rounded-md object-contain" />
							)}

							<p className="text-white text-sm">
								{'Test content'}
							</p>
						</div>
					))}
				</div>
			)}
			<Link href={'/aws-s3-app/upload'}>
    	        <ColorButton color="blue" width="fit"> Create a post </ColorButton>
	        </Link>
		</div>
	);
}
