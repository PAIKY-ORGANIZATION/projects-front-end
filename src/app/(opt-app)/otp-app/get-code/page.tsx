import GetCodePage from "@/components/otp-code/get-code-page";
import { otpAppLogsPath } from "@/lib/variables-and-redis-keys";
import { logAction } from "@/utils/action-log";

export default async function GetCode() {

	await logAction({ filePath: otpAppLogsPath, action: 'Visited "get-code" page'})


	return (
		<GetCodePage></GetCodePage>
	)
}