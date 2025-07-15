import { s3AppLogsPath } from "@/lib/variables";
import { NextResponse } from "next/server"
import fs from 'node:fs'

export const GET = async()=>{

    const s3AppLogs = fs.readFileSync(s3AppLogsPath, 'utf-8')
        .split('\n').slice(-200).join('\n'); //* Get the last 200 lines


    //? Remove this test when needed
    const anotherAppLogs = fs.readFileSync('another-test-app.txt', 'utf-8')
        .split('\n').slice(-200).join('\n') //* Get the last 200 lines

    const separator = `\n\n  ${'='.repeat(200)}   \n\n`;

     const combined = `  S3 APP LOGS ${separator} \n${s3AppLogs} \n\n  ANOTHER TEST APP LOGS ${separator}\n${anotherAppLogs}`;

    return new NextResponse(combined, {
        headers: {'Content-Type': 'text/plain'}
    })
}