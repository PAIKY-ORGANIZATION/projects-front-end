import { getAllPosts } from "@/actions/s3-app/get-all-posts";
import PostsPage from "@/components/aws-s3-app/PostShow";
import { s3AppLogsPath } from "@/lib/variables-and-redis-keys";
import { logAction } from "@/utils/action-log";


export default async function Posts() {

    await logAction({ filePath: s3AppLogsPath, action: 'Visited post-show page'})

    const posts =  await getAllPosts() //$ This depends on middleware for the IP address

    
    return (
        <PostsPage posts={posts}></PostsPage>
    )
}



