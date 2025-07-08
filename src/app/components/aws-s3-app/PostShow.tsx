// app/posts/page.tsx

'use client';

import React from 'react';
import Image from 'next/image';
import ColorButton from '../Button';

type Post = {
	id: string;
	imageUrl?: string;
	content: string;
	createdAt: string;
};

interface PostsPageProps {
	posts: Post[];
}


//prettier-ignore
export default function PostsPage({ posts }: PostsPageProps) {
	const onDeletePost = () => {
		return;
	};

	return (
		<div className="max-w-[40%] mx-auto p-4 space-y-6">
			<h1 className="text-3xl font-bold text-center">Your Posts</h1>

			{posts.length === 0 ? (
				<p className="text-center text-gray-400"> No posts available. </p>
			) : (
				<div className="space-y-4">
					{posts.map((post) => (
						<div key={post.id} className="bg-[#1c1c1c] p-4 rounded-xl space-y-3" >
							<div className="flex justify-between items-center">
								<span className="text-xs text-gray-400"> {new Date( post.createdAt ).toLocaleString()} </span>
								<ColorButton color="red" width="fit" onClick={() => onDeletePost() }> Delete </ColorButton>
							</div>

							{post.imageUrl && (
								<Image src={post.imageUrl} alt="Post image" width={600} height={400} className="w-full rounded-md object-contain" />
							)}

							<p className="text-white text-sm">
								{post.content}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
