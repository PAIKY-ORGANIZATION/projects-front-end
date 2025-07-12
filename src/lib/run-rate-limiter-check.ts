import { cookies, headers } from "next/headers"



export const runRateLimiterCheck = async(): Promise<boolean>=> {

    const cookieStore = await cookies()

    const rateLimitCookie = cookieStore.get('RATE_LIMIT_COOKIE')

    const hdrs = await headers();

    const ip = hdrs.get('ip')

    if(!ip) throw new Error('No IP FOUND')

    //? Hopefully I can get the cookie to handle emails instead of IP addresses.
    if(!rateLimitCookie) {
        cookieStore.set('RATE_LIMIT_COOKIE', ip, { httpOnly: true, })
    }

    return true
    
}