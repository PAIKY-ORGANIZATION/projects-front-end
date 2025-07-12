import {cookies} from 'next/headers'
import crypto from 'node:crypto'

/**
 *  Use as a fall back if in unable to get the IP address from the client request.
 */

export const uuidCookie = async(): Promise<string>=>{

    const cookieStore = await cookies()

    let cookieUUID: string | undefined

    cookieUUID = cookieStore.get('RATE_LIMIT_COOKIE') as string | undefined

    //* If it is the first time the client sends a request, set a unique UUID as a cookie.
    if(!cookieUUID){
        cookieUUID = crypto.randomUUID()

        cookieStore.set('RATE_LIMIT_COOKIE', cookieUUID, { httpOnly: true, })
    }

    return cookieUUID
}