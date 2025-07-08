"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ProfilePicture from "./ProfilePicture";

export default function  NavBarTop() {


    const [term, setTerm] = useState<string | null>(null)

    const router = useRouter()




    const handleSearch = (e: React.KeyboardEvent)=>{
        if(e.key !== 'Enter') return
        router.push('/erc/' + term)
    
        return
    }
    

    return (
        <div className="flex  items-center bg-[#155DFC] w-full">
            <div className="flex justify-around items-center flex-[4]">
                <Link href={'/'} className="hover:underline color"> Home - blocks </Link>
                <Link href={'/transact'} className="hover:underline color"> Transact</Link>
                <Link href={'/getbalance'} className="hover:underline color"> Get Balance</Link>
                <Link href={'/fundme'} className="hover:underline color"> Fund Me</Link>
                <Link href={'/create-pair'}> Create Pair</Link>
            </div>
            <div className="flex-[2] flex">
                <input className="border border-[#273343] w-full rounded-[6px] h-[30px] bg-[#162138]"
                onChange={(e)=>{setTerm(e.target.value)}} onKeyDown={handleSearch}/>
            </div>
            <div className=" flex-[1] flex justify-between px-10 py-2 items-center ">
                <ProfilePicture></ProfilePicture>
                <p className="font-"> Logged as  Miguel</p>
            </div>
        </div>
    )
}