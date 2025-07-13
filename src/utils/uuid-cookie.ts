import {cookies, headers} from 'next/headers'
import crypto from 'node:crypto'

/**
 *  Use as a fall back if in unable to get the IP address from the client request.
 */

export const getOrSetUniqueUserIdentifier = async(): Promise<string>=>{
    //* If we can get the IP address from middleware, use it
    const headersStore = await headers();
    const ip = headersStore.get('ip')  //* This is passed from middleware

    if(ip)return ip

    //* If we can't get the IP address from middleware, use a unique UUID in a cookie
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