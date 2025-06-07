'use client'

import { TriangleAlert } from 'lucide-react'

const Alert: React.FC = () => {

  return (
      <div className='absolute left-0 top-0 w-screen h-screen flex backdrop-blur-sm'>
        <div className='bg-[#06608e]/80 rounded-xl p-6 m-auto flex flex-col items-center'>
        <TriangleAlert className='w-20 h-10'/>
        <p className='text-center mt-4 font-[family-name:var(--font-nunito)]'>
          Something went wrong. <br/>Please try again.
        </p>
        </div>
      </div>
  )
}

export default Alert
