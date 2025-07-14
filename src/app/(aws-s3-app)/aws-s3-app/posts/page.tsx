import { getAllPosts } from "@/actions/s3-app/get-all-posts";
import PostsPage from "@/components/aws-s3-app/PostShow";
import { requestLog } from "@/utils/log-visit";


export default async function Posts() {

    await requestLog({ fileName: 's3-app', logInfo: 'visited post-show page'})

    const posts =  await getAllPosts()

    return (
        <PostsPage posts={posts}></PostsPage>
    )
}



