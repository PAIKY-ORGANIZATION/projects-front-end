'use client';

import Link from 'next/link';
import ReadDocs from './ReadDocs';
import { FaGithub, FaYoutube } from 'react-icons/fa';
import { IoLogoNpm } from 'react-icons/io5';
import { JSX } from 'react';

const iconsMap: { [key in urlTypes]: JSX.Element } = {
	Github: <FaGithub className="w-4 h-4 mt-[1px]" />,
	Youtube: <FaYoutube className="w-4 h-4 mt-[1px]" />,
	'NPM package': <IoLogoNpm className="w-7 h-7 mt-[1px]" />,
};

//prettier-ignore
export default function NavBarShared({ endPoints, resources }: NavbarProps) {

    return (
        <div className="flex items-center justify-between bg-[#161616] w-full px-6 py-3">
            <div className="flex items-center px-8 gap-10 flex-[4]">
                {endPoints.map((endPoint) => (
                    <Link key={endPoint.href} href={endPoint.href} className="text hover:underline" >
                        {endPoint.text} 
                    </Link>
                ))}
            </div>
            <div className="flex items-center flex-[2] justify-end">
                {resources.map((resource) => (
                    <Link key={resource.href} href={resource.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center text-base font-semibold hover:underline px-3 border-l border-gray-600 first:border-l-0">
                        {iconsMap[resource.resourceType]}
                        <span className="ml-2">{resource.resourceType}</span>
                    </Link>
                ))}
            </div>
            <div className="ml-6">
                <ReadDocs href="/docs"/>
            </div>
        </div>
    );
}
