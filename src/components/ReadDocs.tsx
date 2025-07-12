
'use client'

import Link from 'next/link'
import ColorButton from './Button'
import { FaNewspaper } from "react-icons/fa6";

type Props = {
  href: string
  color?: 'blue' | 'green' | 'orange' | 'red' // extend based on your ColorButton
}

export default function ReadDocs({ href, color = 'orange' }: Props) {
  return (
    <div className="">
      <ColorButton color={color} width="fit" className='flex gap-2 items-center'>
        <Link href={href} rel="noopener noreferrer" target="_blank">Read Documentation</Link>
        <FaNewspaper />
      </ColorButton>
    </div>
  )
}
