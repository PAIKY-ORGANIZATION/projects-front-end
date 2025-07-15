"use client"

// LoginFormWithInfo.tsx
import React from 'react';
import toast from 'react-hot-toast';


//prettier-ignore
export default function LoginFormWithInfo() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const contact =  formData.get('contact')
        const password = formData.get('password')
        const username = formData.get('username')
        const confirmPassword = formData.get('confirmPassword')

        if(!contact || !password || !username || !confirmPassword){
            toast.error('Please fill in all fields')
            return
        }
        
    
        return
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
							<input type="text" placeholder="your_username"
							className="w-full text-black px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1"> Email or Phone</label>
							<input type="text" name="contact" placeholder="you@example.com or +1234567890"
                            className="w-full text-black px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1"> Password </label>
							<input type="password" name="password" placeholder="••••••••"
                            className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1" > Confirm Password </label>
							<input type="password"
							className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-black"
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
