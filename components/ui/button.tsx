'use client'

import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  disable: boolean
}

const Button: React.FC<Props> = ({ children, disable = false }) => {
  return (
    <div className='flex flex-col items-center'>
      <div className={`bg-[url(/button.png)] cursor-pointer bg-contain w-28 h-12 pointer-cursor m-4 flex items-center justify-center ${disable ? 'opacity-50' : 'opacity-100'}`}>
        <div className='text-white font-[family-name:var(--font-cherry)] text-lg'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Button
