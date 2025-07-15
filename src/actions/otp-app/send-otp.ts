import {z} from 'zod'


type Params = {
    contact: string
    username: string
    password: string
    confirmPassword: string
}

export const sendOTP = async({contact, username, password, confirmPassword}: Params): Promise<{success: boolean, message: string}>=>{

    try{
        const registerSchema = z.object({
            username: z.string().min(3).max(20),
            password: z.string().min(6).max(20),
            confirmPassword: z.string().min(6).max(20),
            contact: z.union([
                z.string().min(10).email('Please enter a valid email'),
                z.string().regex(/^\+[1-9]\d{7,14}$/, { message: 'Phone number must be in international format, e.g. +1234567890' }),
            ]),
        })
        
        const result = registerSchema.parse({contact, username, password, confirmPassword})
        
        return {
            success: true,
            message: 'Success'
        }
        
    }catch(e){
        if(e instanceof z.ZodError){
            const errMsgs = e.issues.map(issue => issue.message)
            return { success: false, message: errMsgs[0] }
        }
        return {
            success: false,
            message: 'Something went wrong'
        }
    }

}