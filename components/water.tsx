'use client'

import StrokeText from './ui/strokeText'
import { useMediaQuery } from 'react-responsive'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
  className?: string
  isDay: number
  total: number
  percent: number
}

const Water: React.FC<Props> = ({ className = '', isDay, total, percent }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 })

  return (
    <>
      <div className={`w-[200vw] ${className}`}>
        <Link href={'/timeline'}>
          <div className='bg-black'>
            <StrokeText className='absolute top-[25px] left-6 z-10 text-lg'
              isDay={isDay}
              text={`${total}ml`}
              strokeDay={'rgb(0, 202, 192)'}
              strokeNight={'rgb(33, 154, 172)'}
            />

            <StrokeText className='absolute top-[50px] left-6 z-10 text-lg'
              isDay={isDay}
              text={`${percent}%`}
              strokeDay={'rgb(0, 202, 192)'}
              strokeNight={'rgb(33, 154, 172)'}
            />
          </div>
        </Link>

        {isDay === 1 && !isDesktop &&
          <Image priority src={'/main/water.png'} width={5677} height={5175} alt='water' style={{
            animationName: 'water',
            animationDuration: '30s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }} />}

        {isDay === 0 && !isDesktop &&
          <Image priority src={'/main/waterNight.png'} width={5677} height={5175} alt='water' style={{
            animationName: 'water',
            animationDuration: '30s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }} />}

        {isDay === 1 && isDesktop &&
          <Image priority src={'/main/waterWide.png'} width={11353} height={5857} alt='water' style={{
            animationName: 'water',
            animationDuration: '60s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }} />}

        {isDay === 0 && isDesktop &&
          <Image priority src={'/main/waterWideNight.png'} width={11353} height={5857} alt='water' style={{
            animationName: 'water',
            animationDuration: '60s',
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite'
          }} />}
      </div>
    </>
  )
}

export default Water
