import { NextRequest, NextResponse } from "next/server";
export const middleware = async (req: NextRequest)=>{


    ////  This was going to be used for rate limiting but I decided I will use a unique UUID in a JWT in a cookie.
    //$ decided to use IP address as a unique identifier amongst all my applications.
    // @ts-expect-error // ¡
    const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0] || '';

    const final = NextResponse.next()
    final.headers.set('ip', ip)
    return final
}   