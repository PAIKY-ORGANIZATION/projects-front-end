import { NextRequest, NextResponse } from "next/server";
export const middleware = async (req: NextRequest)=>{


    ////  This was going to be used for rate limiting but I decided I will use a unique UUID in a JWT in a cookie.
    //$ Decided to use IP address as a unique identifier amongst all my applications.
    //$ In this case it'll have two purposes:
        //$ 1. Rate limiting
        //$ 2. Logging
    const unparsedIp =   req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip');

    console.log({unparsedIp});
    

    const ip = unparsedIp?.split(',')[0] || '';
    

    //! They were not adding this because it also gives you logs when the client's front end loads <Link /> elements and it's misleading and inaccurate. 
    // const isStaticAsset =
    //     pathname.startsWith('/_next/') ||        // Static JS, chunks, etc.
    //     pathname.startsWith('/favicon.ico') ||   // Favicon
    //     pathname.startsWith('/robots.txt') ||    // Robots
    //     pathname.startsWith('/sitemap.xml') ||   // Sitemap
    //     pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|woff2?)$/); // Other assets

    // if (!isStaticAsset) {
    //     console.log(`Visited page: ${pathname} from IP: ${ip}`);
    // }

    

    const final = NextResponse.next()
    final.headers.set('ip', ip)
    return final
}   