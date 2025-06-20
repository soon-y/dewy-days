'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { animated, useSpring } from '@react-spring/web'
import StrokeHeader from '@/components/ui/strokeHeader'
import Bubble from '@/components/ui/bubble'
import Button from '@/components/ui/button'
import AmountPicker from '@/components/ui/amountPicker'
import Alert from '@/components/alert'
import { X } from 'lucide-react'
import { useSwipeable } from 'react-swipeable'
import { CupRow } from "@/types"
import DewyLoading from '../dewyLoading'

export default function Cups({ cups, main }: { cups: CupRow[], main: { cup_index: number } }) {
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const cupArray: CupRow[] = cups
  const [cupIndex, setCupIndex] = useState<number>(main.cup_index)
  const [amount, setAmount] = useState<number>(0)
  const [value, setValue] = useState<number>(0)
  const [error, setError] = useState<boolean>(false)
  const slideNum: number[] = [25, -25, -75, -125]
  const slideCup = useSpring({ transform: `translateX(${slideNum[cupIndex]}vw)` })
  const cupStyle: string = 'w-full h-[calc(100vh-330px)] min-h-[30rem] bg-contain bg-no-repeat bg-center duration-500 cursor-grab'

  useEffect(() => {
    if (cupArray.length > 0) setAmount(cupArray[cupIndex].amount)
  }, [cupIndex])

  const increment = () => {
    const newValue = cupIndex === 3 ? 3 : cupIndex + 1
    setCupIndex(newValue)
  }

  const decrement = () => {
    const newValue = cupIndex === 0 ? 0 : cupIndex - 1
    setCupIndex(newValue)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => { increment() },
    onSwipedRight: () => { decrement() },
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: true,
  })

  const save = async () => {
    setLoading(true)
    const res = await fetch('/api/cup/updateCupSetting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupIndex, value }),
    })

    const result = await res.json()
    if (result.success) {
      router.push('/')
      setLoading(false)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className='w-full h-full fixed overflow-y-auto overflow-x-hidden gradient'>
      <div>
        <div className='p-6 grid grid-cols-[50px_1fr_50px] gap-10 items-center place-items-center'>
          <div></div>
          <StrokeHeader text='Cups' />
          <Bubble link='/'>
            <X />
          </Bubble>
        </div>

        <animated.div {...handlers} className='w-[200vw] grid grid-cols-[repeat(4,50vw)] items-center justify-center' style={slideCup}>
          <div className={`${cupStyle} bg-[url(/cups/0.png)] ${cupIndex === 0 ? '' : 'grayscale opacity-50'}`}></div>
          <div className={`${cupStyle} bg-[url(/cups/1.png)] ${cupIndex === 1 ? '' : 'grayscale opacity-50'}`}></div>
          <div className={`${cupStyle} bg-[url(/cups/2.png)] ${cupIndex === 2 ? '' : 'grayscale opacity-50'}`}></div>
          <div className={`${cupStyle} bg-[url(/cups/3.png)] ${cupIndex === 3 ? '' : 'grayscale opacity-50'}`}></div>
        </animated.div>

        <AmountPicker unit='ml' min={0} max={2100} initial={amount} setNumber={setValue} step={10} />

        <div className='flex justify-center mb-6' onClick={save}>
          <Button disable={value === 0}>
            <span className=''>SAVE</span>
          </Button>
        </div>
      </div>

      {loading && <DewyLoading msg={'Saving'} isDay={0} />}
      {error && <Alert />}
    </div>
  )
}