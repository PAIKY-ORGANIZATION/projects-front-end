// components/FloatingCornerButton.tsx

'use client'

import Link from 'next/link'
import ColorButton from './Button'

type Props = {
  href: string
  color?: 'blue' | 'green' | 'orange' | 'red' // extend based on your ColorButton
}

export default function ReadDocs({ href, color = 'orange' }: Props) {
  return (
    <div className="absolute top-45 left-30 z-50">
      <ColorButton color={color} width="fit">
        <Link href={href}>Read Documentation</Link>
      </ColorButton>
    </div>
  )
}
