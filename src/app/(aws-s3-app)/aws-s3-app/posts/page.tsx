import { getAllPosts } from "@/actions/s3-app/get-all-posts";
import PostsPage from "@/components/aws-s3-app/PostShow";
import {logRequest} from 'req-logger-express'
import {headers} from 'next/headers'


export default async function Posts() {

    const headerStore = await headers()
    const ip = headerStore.get('ip') || ''

    await logRequest({
        fileName: 'req.log-s3-app',
        ip,
        logInfo: ''
    })

    const posts =  await getAllPosts()

    return (
        <PostsPage posts={posts}></PostsPage>
    )
}