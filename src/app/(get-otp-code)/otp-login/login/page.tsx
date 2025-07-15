"use client"

import { sendOtp } from '@/actions/otp-app/send-otp';
// LoginFormWithInfo.tsx
import React from 'react';
import toast from 'react-hot-toast';
import {useRouter} from 'next/navigation'

//prettier-ignore
export default function LoginFormWithInfo() {

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const contact =  formData.get('contact') as string | null
        const password = formData.get('password') as string | null
        const username = formData.get('username') as string | null
        const confirmPassword = formData.get('confirmPassword')

        if(!contact || !password || !username || !confirmPassword){
            toast.error('Please fill in all fields')
            return
        }
        if(password !== confirmPassword){
            toast.error('Passwords do not match')
            return
        }

        const result = await sendOtp({contact, username, password})    
        if(!result.success){
            toast.error(result.message)
            return  
        } 

        router.push('/otp-login/verify?contact=' + encodeURIComponent(contact))

    }


	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
				{/* Info Section */}
				<div className="bg-blue-50 p-8 flex flex-col justify-center">
					<h2 className="text-2xl font-bold text-blue-800 mb-4">
						Welcome to OTP Demo
					</h2>
					<p className="text-sm text-blue-900">
						This demo authenticates users by sending a one-time code to the provided email or phone number. The backend verifies the code to complete the login. 
					</p>
                    <p className="text-sm text-blue-900">
                        You'll be asked to enter your contact information, and a code will be sent for verification.
                    </p>
				</div>

				{/* Form Section */}
				<div className="p-8">
					<h2 className="text-2xl font-bold mb-6 text-gray-800 text-center"> Create an Account</h2>
					<form className="space-y-4" onSubmit={handleSubmit}>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1"> Username </label>
							<input type="text" placeholder="your_username" name="username" value="test"
							className="w-full text-black px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1"> Email or Phone</label>
							<input type="text" name="contact" placeholder="you@example.com or +14155552671" 
                            className="w-full text-black px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
							<input type="password" name="password" placeholder="••••••••" value="11111111"
                            className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1" > Confirm Password </label>
							<input type="password" value="11111111"
							className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
                            placeholder="••••••••" name="confirmPassword"/>
						</div>
						<button type="submit" className="w-full py-2 mt-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
							Recieve OTP
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
