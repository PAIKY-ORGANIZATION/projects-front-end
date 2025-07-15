import { SendSmtpEmail, SendTransacSms } from "@getbrevo/brevo"
import { brevoEmailApiInstance, brevoSmsApiInstance } from "./brevo-instances"

export const sendOtpSMS = async(phoneNumber: string)=>{
    // z.string().regex(/^\+[1-9]\d{7,14}$/, 'Please enter a valid phone phoneNumber').parse(number)
    const sms = new SendTransacSms
    sms.sender = 'OTP'
    sms.recipient =  phoneNumber
    sms.content = 'Your OTP is 1234'
    sms.organisationPrefix = 'OTP-VERIFICATION'
    await brevoSmsApiInstance.sendTransacSms(sms)
}


export const sendOtpEmail = async(email: string)=>{
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

