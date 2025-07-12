import { NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest)=>{
    const ip = req.ip || req.headers.get('x-forwarded-for')?.split(',')[0] || '';

    const final = NextResponse.next()
    final.headers.set('ip', ip)
    return final
}   