import { headers } from "next/headers"
import { logRequest } from "req-logger-express"

export const requestLog = async({fileName, logInfo}: {fileName: string, logInfo: string})=>{

    const headerStore = await headers()
    const ip = headerStore.get('ip') || ''

    await logRequest({
        fileName: fileName, //! this is actually the file path.
        ip,
        logInfo: logInfo
    })

    return
}