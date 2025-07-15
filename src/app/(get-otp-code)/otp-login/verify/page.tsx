'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { resendOtp } from '@/actions/otp-app/resend-opt';

// prettier-ignore
export default function OTPVerificationForm() {
	const [otp, setOtp] = useState(Array(6).fill(''))

	//* Getting the email from the url
	const searchParams = useSearchParams()
	const contact = searchParams.get('contact')

	const handleChange = (index: number, value: string) => {
		if (!/^\d?$/.test(value)) return
		const updatedOtp = [...otp]
		updatedOtp[index] = value
		setOtp(updatedOtp)

		if (value && index < 5) {
			const nextInput = document.getElementById(`otp-${index + 1}`)
			nextInput?.focus()
		}
	}

	const handleResend = async () => {
		const result = await resendOtp()
		if (!result.success) {
			toast.error(result.message)
			return
		}

		toast.success(result.message)
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="bg-white rounded-2xl shadow-lg w-full max-w-[500px] p-8">
				<h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Verify Your Code</h2>
				
				<p className="text-center text-gray-600 mb-2"> Sent a 6-digit code to </p>
				<div className="text-center text-gray-800 font-medium mb-4"> {contact} </div>

				<div className="text-center mb-6">
					<Link href={'/otp-login/login'} className="text-sm text-blue-600 hover:underline hover:cursor-pointer">
						Change contact info
					</Link>
				</div>

				<form className="space-y-6">
					<div className="flex justify-center gap-2">
						{otp.map((digit, index) => (
							<input key={index} id={`otp-${index}`} type="text" inputMode="numeric" maxLength={1}
								className="w-8 h-10 text-center border border-gray-400 rounded-md text-black text-xl focus:outline-none focus:ring-2 focus:ring-blue-500" value={digit} onChange={(e) => handleChange(index, e.target.value)}
							/>
						))}
					</div>

					<button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
						Verify Code
					</button>

					<div className="text-center mt-4">
						<button type="button" onClick={handleResend} className="text-sm text-blue-600 ">
							Didn't receive the code? <span className="underline hover:cursor-pointer" onClick={handleResend}>Resend</span> 
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
