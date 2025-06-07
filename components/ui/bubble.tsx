'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface Props {
  link: string;
  children?: ReactNode
  className?: string
}

const Bubble: React.FC<Props> = ({ link, children, className = '' }) => {

  return (
    <Link href={link}>
      <div className={`bg-[url(/bubble.png)] bg-contain w-12 h-12 pointer-cursor
        shadow-[1px_1px_8px_rgb(5_142_205_/_0.5)] rounded-full flex items-center justify-center ${className}`}>
        <div className='text-white navIcon'>
          {children}
        </div>
      </div>
    </Link>
  )
}

export default Bubble
