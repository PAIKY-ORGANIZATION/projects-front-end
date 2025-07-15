"use server"

import { sendOtpEmail, sendOtpSMS } from '@/lib/brevo/brevo-services'
import { redisClient } from '@/lib/redis/redis-client'
import { otpUserHashKey } from '@/lib/variables-and-redis-keys'
import { getOrSetUniqueUserIdentifier } from '@/utils/get-or-set-unique-user-identifier'
import { RedisClientType } from 'redis'
import { isRateLimited } from 'redis-rate-limiter-express'
import {z} from 'zod'


type Params = {
    contact: string
    username: string
    password: string
}

export const sendOtp = async({contact, username, password}: Params): Promise<{success: boolean, message: string}>=>{

    //¡ Password WILL NOT be used for anything.
    try{
        const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()
        const isLimited = await isRateLimited(redisClient as RedisClientType, {
            requestLimit: 3,
            windowSizeSecs: 600,
            uniqueUserIdentifier,
        })

        if(isLimited){ return {message: 'Too many attempts, please try again in a 10 minutes', success: false}}


        //$ One-line zod validation
        z.object({
            username: z.string().min(3).max(20),
            contact: z.string().min(1, 'Please enter a valid phone number or email'),
            // password: z.string().min(6).max(20),
        }).parse({contact, username, password})

        const communicationMethod = getCommunicationMethod(contact)
        if(!communicationMethod) return { success: false, message: 'Please enter a valid phone number or email' }

        communicationMethod === 'phone' ? await sendOtpSMS(contact) : await sendOtpEmail(contact)
        
        await saveHashToRedis({contact, username,  password})

        return { success: true, message: 'Success' }
        
    }catch(e){

        console.dir(e, {depth: 2});

        if(e instanceof z.ZodError){
            const errMsgs = e.issues.map(issue => issue.message)
            return { success: false, message: errMsgs[0] }
        }
        return { success: false, message: 'Something went wrong' }
    }

}


const getCommunicationMethod = (contact: string): 'phone' | 'email' | false =>{

    const isPhone = /^\+[1-9]\d{7,14}$/.test(contact)
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
    if(!isPhone && !isEmail){
        return false
    }

    return isPhone ? 'phone' : 'email'
}




//prettier-ignore
const saveHashToRedis = async( {contact, username, }: Params)=>{

    const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()


    const otpUserCachedInfo: OtpUserCachedInfo =  {
        contact,
        username,
    }

    await redisClient.hSet(otpUserHashKey(uniqueUserIdentifier), otpUserCachedInfo)

}





export const resendOtp = async(): Promise<{success: boolean, message: string}>=>{
    try{
        
        const uniqueUserIdentifier = await getOrSetUniqueUserIdentifier()
        const cachedOtpUserInfo = await redisClient.hGetAll(otpUserHashKey(uniqueUserIdentifier)) as OtpUserCachedInfo | undefined 
        
        if(!cachedOtpUserInfo){ return {success: false, message: 'Not previously logged in'} }
    
        const { contact, username} = cachedOtpUserInfo
        
        return await sendOtp({contact, username: username, password: '12345678'})
        
    }catch(e){
        return {success: false, message: 'Something went wrong'}
    }
}




