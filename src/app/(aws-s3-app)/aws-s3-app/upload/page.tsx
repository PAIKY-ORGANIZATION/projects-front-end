import { requestLog } from "@/utils/log-visit";
import PostForm from "../../../../components/aws-s3-app/PostForm";

export default async function Page() {


  await requestLog({ fileName: 's3-app', logInfo: 'visited upload page'})
  

  return (
    <div className="h-screen flex flex-col items-center justify-center space-y-6">
      <PostForm />
    </div>
  )
}
