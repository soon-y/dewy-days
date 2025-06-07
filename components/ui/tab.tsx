'use client'

import { ReactNode } from 'react'

interface Props {
  children?: ReactNode
  className?: string
}

const Tab: React.FC<Props> = ({ children, className = '' }) => {
  return (
    <div className={`flex flex-col items-center w-full h-auto p-4 bg-[#5bcefc] rounded-b-2xl ${className}`}>
      {children}
    </div>
  )
}

export default Tab
