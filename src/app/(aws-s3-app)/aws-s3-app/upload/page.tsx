import { requestLog } from '@/utils/log-visit';
import PostForm from '../../../../components/aws-s3-app/PostForm';
import { s3AppLogsPath } from '@/lib/variables-and-redis-keys';

export default async function Page() {
	await requestLog({ filePath: s3AppLogsPath, logInfo: 'Visited upload page'}); //$ This depends on middleware for the IP address

	return (
		<div className="h-screen flex flex-col items-center justify-center space-y-6">
			<PostForm />
		</div>
	);
}
