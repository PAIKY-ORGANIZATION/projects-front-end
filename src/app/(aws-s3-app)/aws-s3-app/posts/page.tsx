import { getAllPosts } from "@/actions/s3-app/get-all-posts";
import PostsPage from "@/components/aws-s3-app/PostShow";




export default async function Posts() {

    const posts =  await getAllPosts()

    return (
        <PostsPage posts={posts}></PostsPage>
    )
}