"use server"

import { sendEmail, sendSMS } from '@/lib/brevo/brevo-services'
import {z} from 'zod'


type Params = {
    contact: string
    username: string
    password: string
}

export const sendOTP = async({contact, username, password}: Params): Promise<{success: boolean, message: string}>=>{
    try{
        //$ One-line zod validation
        z.object({
            username: z.string().min(3).max(20),
            password: z.string().min(6).max(20),
            contact: z.string().min(1, 'Please enter a valid phone number or email'),
        }).parse({contact, username, password})

        const communicationMethod = getCommunicationMethod(contact)
        if(!communicationMethod) return { success: false, message: 'Please enter a valid phone number or email' }

        communicationMethod === 'phone' ? await sendSMS(contact) : await sendEmail(contact)
        
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






