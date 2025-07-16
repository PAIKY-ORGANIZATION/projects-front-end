"use client";

import OTPVerificationForm from "@/components/otp-code/verify-page";
import { Suspense } from "react";

// /src/app/(get-otp-code)/otp-login/verify/page.tsx
export default function VerifyPage() {
  return (

	//! The only reason why we're using suspense here is because we are using:
	// "const searchParams = useSearchParams()
	//$ It requires us to use suspense during build or would throw an error.
	<Suspense fallback={<div>Loading...</div>}>
		<OTPVerificationForm />
	</Suspense>
)
}
