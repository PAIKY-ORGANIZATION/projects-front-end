import SuccessPage from "@/components/otp-code/success-page";
import { otpAppLogsPath } from "@/lib/variables-and-redis-keys";
import { logAction } from "@/utils/action-log";

export default async function Success() {

	await logAction({ filePath: otpAppLogsPath, action: 'Visited "success" page'})

	return (
		<SuccessPage></SuccessPage>
	)
}