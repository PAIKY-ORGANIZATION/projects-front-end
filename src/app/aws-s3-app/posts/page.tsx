import PostsPage from "@/app/components/aws-s3-app/PostShow";

export default async function Posts() {


    
    const testPost = {
        id: '1',
        imageUrl: '/profile.jpeg',
        content: 'This is a test post',
        createdAt: '2021-01-01'
    }
    return (
        <PostsPage posts={[testPost]}></PostsPage>
    )
}