"use client"

import Link from "next/link"

export default function  Limbo() {
    return (
        <div className="h-screen flex items-center justify-center flex-col">
            <h1 className="text-3xl"> You are in the Limbo </h1>
            <Link href="/aws-s3-app/upload" className="text-blue-500 underline">AWS-s3-app/upload</Link>
            <Link href="/aws-s3-app/posts" className="text-blue-500 underline">AWS-s3-app/posts</Link>
            <Link href="/otp-app/get-code" className="text-blue-500 underline">otp-app/get-code</Link>
        </div>
    )
}