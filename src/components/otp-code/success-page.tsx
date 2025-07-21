'use client'

import Link from 'next/link'

export default function SuccessPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
			<div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 text-center">
				<h2 className="text-2xl font-bold text-green-700 mb-4">Success!</h2>
				<p className="text-gray-700 mb-6">
					Your code has been verified successfully. You can now proceed or try the process again.
				</p>
				<Link href="/otp-app/get-code" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
					Try Again
				</Link>
			</div>
		</div>
	)
}
