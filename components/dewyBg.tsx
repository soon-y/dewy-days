'use client'

import Image from 'next/image'

interface Props {
  className?: string
  waterIntake: number
}

const DewyBg: React.FC<Props> = ({ className = '', waterIntake }) => {

  return (
    <div className={`w-24 absolute left-[50%] -translate-x-[50%] ${className}`} >
      {waterIntake === 0 ?
        <></> :
        <div style={{
          animationName: 'onWater',
          animationDuration: '5s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}>
          <Image className='absolute -translate-y-[130px]' alt='dewy-hurra' width={671} height={1116} src={'/dewy/dewyBottom.png'} />
        </div>
      }
    </div>
  )
}

export default DewyBg
