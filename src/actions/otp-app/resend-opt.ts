"use server"

import { redisClient } from "@/lib/redis/redis-client"
import { otpUserHashKey } from "@/lib/variables-and-redis-keys"
import { getOrSetUniqueUserIdentifier } from "@/utils/get-or-set-unique-user-identifier"
import { sendOtp } from "./send-otp"

export const resendOtp = async(): Promise<{success: boolean, message: string}>=>{
    try{
        
        const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()
        const cachedOtpUserInfo = await redisClient.hGetAll(otpUserHashKey(uniqueUserIdentifier)) as OtpUserCachedInfo | undefined 
        
        if(!cachedOtpUserInfo){ return {success: false, message: 'Not previously logged in'} }
    
        const { contact, username} = cachedOtpUserInfo
        
        return await sendOtp({contact, username: username, password: '12345678'}) //! Just a random password, it will not be used.
        
    }catch(e){
        return {success: false, message: 'Something went wrong'}
    }
}