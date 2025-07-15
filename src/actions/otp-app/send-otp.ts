"use server"

import { brevoApiInstance, brevoEmailApiInstance, brevoSmsApiInstance } from '@/lib/brevo-instances'
import { SendSmtpEmail, SendTransacSms } from '@getbrevo/brevo'
import {z} from 'zod'


type Params = {
    contact: string
    username: string
    password: string
}

export const sendOTP = async({contact, username, password}: Params): Promise<{success: boolean, message: string}>=>{

    try{
        const registerSchema = z.object({
            username: z.string().min(3).max(20),
            password: z.string().min(6).max(20),
            contact: z.string().min(1, 'Please enter a valid phone number or email'),
        })
        
        const result = registerSchema.parse({contact, username, password})

        const isPhone = /^\+[1-9]\d{7,14}$/.test(result.contact)
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(result.contact)
        if(!isPhone && !isEmail){
            return { success: false, message: 'Please enter a valid phone number or email'}
        }

        isPhone ? await _sendSMS(contact) : await _sendEmail(contact)
        
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





const _sendSMS = async(phoneNumber: string)=>{
    // z.string().regex(/^\+[1-9]\d{7,14}$/, 'Please enter a valid phone phoneNumber').parse(number)
    const sms = new SendTransacSms
    sms.sender = 'OTP'
    sms.recipient =  phoneNumber
    sms.content = 'Your OTP is 1234'
    sms.organisationPrefix = 'OTP-VERIFICATION'
    await brevoSmsApiInstance.sendTransacSms(sms)
}


const _sendEmail = async(email: string)=>{
    // z.string().email('Please enter a valid email').parse(email)
    const smtpEmail = new SendSmtpEmail()   
    smtpEmail.subject = 'Your OTP verification code'
    smtpEmail.to = [{email}]
    smtpEmail.sender = {email: 'miguel.mendez@miguel-mendez.click'}
    smtpEmail.htmlContent = _getEmailHtmlContent(1234)
    await brevoEmailApiInstance.sendTransacEmail(smtpEmail)
}




const _getEmailHtmlContent = (otpCode: number)=>{
    return `
      <div style="font-family: sans-serif; max-width: 480px; margin: auto; padding: 20px; border: 1px solid #e2e2e2; border-radius: 8px;">
        <h2 style="color: #333;">Your OTP Code</h2>
        <p style="font-size: 16px; color: #555;">Use the code below to complete your login process:</p>
        <div style="font-size: 28px; font-weight: bold; color: #000; margin: 20px 0;">${otpCode}</div>
        <p style="font-size: 14px; color: #888;">This code is valid for a limited time and should not be shared with anyone.</p>
      </div>
    `
}

