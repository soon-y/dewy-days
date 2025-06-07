'use client'

import Image from 'next/image'

interface Props {
  className?: string
  waterIntake: number
  hurray: boolean
}

const Dewy: React.FC<Props> = ({ className = '', waterIntake, hurray }) => {

  return (
    <div className={`w-24 absolute left-[50%] -translate-x-[50%] ${className}`} >
      {waterIntake === 0 ?
        <Image className='absolute -translate-y-[87%]' alt='dewy' width={671} height={1116} src={'/dewy/dewy.gif'} unoptimized/> :
        <div style={{
          animationName: 'onWater',
          animationDuration: '5s',
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}>
          {hurray ? 
          <Image className='absolute -translate-y-[130px] z-1000' alt='dewy-hurra' width={671} height={1116} src={'/dewy/dewyMansae.png'} /> :
          <Image className='absolute -translate-y-[130px] z-1000' alt='dewy-water' width={671} height={1116} src={'/dewy/dewyWater.gif'} unoptimized/>}
        </div>
      }
    </div>
  )
}

export default Dewy
