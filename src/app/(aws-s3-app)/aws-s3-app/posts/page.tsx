import { getAllPosts } from "@/actions/s3-app/get-all-posts";
import PostsPage from "@/components/aws-s3-app/PostShow";
import { s3AppLogsPath } from "@/lib/variables";
import { requestLog } from "@/utils/log-visit";


export default async function Posts() {

    await requestLog({ filePath: s3AppLogsPath, logInfo: 'Visited post-show page'})

    const posts =  await getAllPosts() //$ This depends on middleware for the IP address

    
    return (
        <PostsPage posts={posts}></PostsPage>
    )
}



