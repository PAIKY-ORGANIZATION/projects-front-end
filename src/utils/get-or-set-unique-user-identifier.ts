import {cookies, headers} from 'next/headers'
import crypto from 'node:crypto'


export const getOrSetUniqueUserIdentifier = async(): Promise<string>=>{
    //* If we can get the IP address from middleware, use it
    const headersStore = await headers(); 
    const ip = headersStore.get('ip')   //$ This depends on middleware for the IP address 

    if(ip) return ip

    //* If we can't get the IP address from middleware, use a unique UUID in a cookie
    const cookieStore = await cookies()
    const existing = cookieStore.get('RATE_LIMIT_COOKIE')?.value as string | undefined
    if(existing) return existing


    //* If it is the first time the client sends a request, set a unique UUID as a cookie.
    const cookieUUID = crypto.randomUUID()
    cookieStore.set('RATE_LIMIT_COOKIE', cookieUUID, { httpOnly: true, })

    return cookieUUID
}