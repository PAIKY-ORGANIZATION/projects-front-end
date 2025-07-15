"use server"


import { redisClient } from "@/lib/redis/redis-client"
import { otpUserHashKey } from "@/lib/variables-and-redis-keys"
import { getOrSetUniqueUserIdentifier } from "@/utils/get-or-set-unique-user-identifier"

export const verifyOtp = async(currentSixDigitsCode: string): Promise<{success: boolean, message: string}>=>{

    const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()
    const cachedOtpUserInfo = await redisClient.hGetAll(otpUserHashKey(uniqueUserIdentifier)) as unknown as OtpUserCachedInfo | undefined
    
    if(!cachedOtpUserInfo) return {success: false, message: 'Verification failed'} 

    
    
    const {sixDigitsCode: savedSixDigitsCode} = cachedOtpUserInfo
    
    console.log({savedSixDigitsCode, currentSixDigitsCode});
    if(savedSixDigitsCode !== currentSixDigitsCode) return {success: false, message: 'Verification failed'}
    
    return {success: true, message: 'Verification successful'}
}