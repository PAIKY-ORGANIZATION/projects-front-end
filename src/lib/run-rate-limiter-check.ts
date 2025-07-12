import { cookies, headers } from "next/headers"
import fs from 'fs'



export const runRateLimiterCheck = async(): Promise<boolean>=> {

    const cookieStore = await cookies()

    const rateLimitCookie = cookieStore.get('RATE_LIMIT_COOKIE')

    const hdrs = await headers();

    const ip = hdrs.get('ip')

    if(!ip) throw new Error('No IP FOUND')

    console.log({ip});
    


    //? Hopefully I can get the cookie to handle emails instead of IP addresses.
    if(!rateLimitCookie) {
        cookieStore.set('RATE_LIMIT_COOKIE', ip, {
            httpOnly: true,
        })
    }


    //* logging the IP address in a file:
    fs.appendFileSync('ip-addresses.txt', `${ip}\n`)

    return true
    
}