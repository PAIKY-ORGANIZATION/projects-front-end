import { headers } from "next/headers"
import { logRequest } from "req-logger-express"

export const requestLog = async({filePath, logInfo}: {filePath: string, logInfo: string})=>{

    

    //* If we are in development, avoid writing to the file system because it triggers a lot of hot reloads 
    if(process.env.NODE_ENV === 'production'){

        
        const headerStore = await headers()
        const ip = headerStore.get('ip') || ''
    
        await logRequest({
            fileName: filePath, //! this is actually the file path.
            ip,
            logInfo: logInfo
        })
    }

}