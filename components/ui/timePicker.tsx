'use client'

import { useState, useEffect, useRef } from 'react'

interface Props {
  className?: string
  setTime: React.Dispatch<React.SetStateAction<string>>
  openAlarm: boolean
}

const TimePicker: React.FC<Props> = ({ className, setTime, openAlarm }) => {
  const [hourArray, setHourArray] = useState<string[]>([])
  const [minArray, setMinArray] = useState<string[]>([])
  const hourGroup = useRef<HTMLDivElement>(null)
  const minGroup = useRef<HTMLDivElement>(null)
  const arrayStyle = 'h-40 grid [grid-auto-rows:2rem] overflow-y-auto overscroll-contain snap-y snap-mandatory px-2 py-16 gap-1'

  useEffect(() => {
    const hours: number[] = []
    const mins: number[] = []
    let hour: number = 0
    let min: number = 0

    while (hour < 24) {
      hours.push(hour)
      hour = hour + 1
    }
    while (min < 60) {
      mins.push(min)
      min++
    }
    const formattedHours: string[] = Array.from({ length: hours.length }, (_, i) =>
      i.toString().padStart(2, '0')
    )
    const formattedMins: string[] = Array.from({ length: mins.length }, (_, i) =>
      i.toString().padStart(2, '0')
    )
    setHourArray(formattedHours)
    setMinArray(formattedMins)
  }, [openAlarm])

  useEffect(() => {
    const now = new Date()
    if (hourGroup.current) hourGroup.current.scrollTop = now.getHours() * 36
    if (minGroup.current) minGroup.current.scrollTop = now.getMinutes() * 36
  }, [hourGroup, minGroup, hourArray, minArray])

  function getFianlNum() {
    const array:number[] = [0,0]
    if (hourGroup.current) {
      const finalValue = Math.floor(((hourGroup.current.scrollTop) / 36))
      array[0] = finalValue
    }
    if (minGroup.current) {
      const finalValue = Math.floor(((minGroup.current.scrollTop) / 36))
      array[1] = finalValue
    }
    setTime(array[0] + ':' + array[1] + ':00')
  }

  return (
    <div className={`w-full' my-6 relative ${className}`}>
      <div className='absolute w-full h-7 bg-[rgba(0,0,0,0.07)] top-16 rounded-md'></div>

      <div className='timePickerWrapper grid grid-cols-[1fr_1fr] w-full m-auto font-[family-name:var(--font-nunito)]'>
        <div ref={hourGroup} className={arrayStyle} onScroll={getFianlNum}>
          {hourArray.map((el, index) => (
            <p key={index} className='ml-2 relative text-right font-bold text-lg snap-center'>{el} </p>
          ))}
        </div>
        <div ref={minGroup} className={arrayStyle} onScroll={getFianlNum}>
          {minArray.map((el, index) => (
            <p key={index} className='mr-2 relative text-left font-bold text-lg snap-center'>{el}</p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TimePicker