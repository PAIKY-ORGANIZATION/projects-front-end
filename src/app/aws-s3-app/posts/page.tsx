import { getAllPosts } from "@/actions/get-all-posts";
import PostsPage from "@/app/components/aws-s3-app/PostShow";



//¡ TEST
// import { redisClient } from "@/lib/redis-client";
// await redisClient.set('lol', 'lol')
// console.log(await redisClient.get('lol'));







export default async function Posts() {

    // const testPost = {
    //     id: '1',
    //     imageUrl: '/profile.jpeg',
    //     content: 'This is a test post',
    //     createdAt: '2021-01-01'
    // }

    const posts =  await getAllPosts()

    return (
        <PostsPage posts={posts}></PostsPage>
    )
}