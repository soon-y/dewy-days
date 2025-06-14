'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import StrokeHeader from '@/components/ui/strokeHeader'
import Bubble from '@/components/ui/bubble'
import { X, Minus, Droplet } from 'lucide-react'
import { TimelineRow, RawTimelineRow } from '@/types'
import Alert from '@/components/alert'
import StrokeText from '@/components/ui/strokeText'

type Grouped = {
  date: string
  total: number
  items: {
    id: number
    time: string
    amount: number
    cupIndex: number
    goal: number
  }[]
}

export default function Timeline() {
  const [groupedData, setGroupedData] = useState<Grouped[]>()
  const [error, setError] = useState<boolean>(false)
  const [updateData, setUpdateData] = useState<boolean>(false)
  const [currentAmount, setCurrentAmount] = useState<number>(0)
  const today = new Date().toISOString().split('T')[0]
  const skeletonStyle = 'animate-pulse w-full h-[54px] rounded-xl mt-6 bg-[#01aae2]'

  useEffect(() => {
    setUpdateData(true)

    async function fetchCurrentAmount() {
      const res = await fetch('/api/timeline/fetchCurrentAmount')
      if (!res.ok) {
        setError(true)
        setTimeout(() => setError(false), 3000)
        return
      }

      const json = await res.json()
      if (json === null) {
        setError(true)
        setTimeout(() => setError(false), 3000)
      } else {
        setCurrentAmount(json.currentAmount[0].current_amount)
      }
    }

    fetchCurrentAmount()
  }, [])

  useEffect(() => {
    fetch('/api/timeline/fetch')
      .then(res => {
        if (!res.ok) {
          setError(true)
          setTimeout(() => setError(false), 3000)
        }
        return res.json();
      })
      .then(data => {
        const parsed: TimelineRow[] = data.map((item: RawTimelineRow) => ({
          ...item,
          date: new Date(item.date),
        }))
        groupByDateAndTime(parsed)
        setUpdateData(false)
      })
      .catch(() => {
        setError(true)
        setTimeout(() => setError(false), 3000)
      })
  }, [updateData])

  const deleteData = async (id: number, amount: number) => {
    const newAmount: number = currentAmount - amount

    const res = await fetch(`/api/timeline/delete`, {
      method: 'POST',
      body: JSON.stringify({ id, newAmount }),
    })
    const result = await res.json()
    if (result.success) {
      setCurrentAmount(newAmount)
      setUpdateData(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  function groupByDateAndTime(data: TimelineRow[]): Grouped[] {
    const grouped = new Map<string, TimelineRow[]>()
    const result: Grouped[] = []

    for (const item of data) {
      const dateKey = item.date.toLocaleDateString('sv-SE')

      if (!grouped.has(dateKey)) grouped.set(dateKey, [])
      grouped.get(dateKey)!.push(item)
    }

    for (const [date, items] of grouped.entries()) {
      const formattedItems = items
        .map((item) => {
          const time = new Date(item.date).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          })
          return {
            id: item.id,
            time,
            amount: item.amount,
            cupIndex: item.cup_index,
            goal: item.goal,
          }
        })
        .sort((a, b) => a.time.localeCompare(b.time))

      const total = formattedItems.reduce((sum, item) => sum + item.amount, 0)
      result.push({ date, total, items: formattedItems })
    }

    result.sort((a, b) => b.date.localeCompare(a.date))

    setGroupedData(result)
    return result
  }

  function formattedDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <>
      <div className='w-full h-full fixed overflow-auto gradient p-6 pb-12 font-[family-name:var(--font-nunito)]'>
        <div className='grid grid-cols-[50px_1fr_50px] gap-10 items-center place-items-center'>
          <div></div>
          <StrokeHeader text='Timeline' />
          <Bubble link='/'>
            <X />
          </Bubble>
        </div>

        <div className='w-full sm:w-[30rem] m-auto'>
          {!updateData ?
            groupedData?.map((el, i) => (
              <div key={i}>
                <div className='text-base/5 px-4 pt-[10px] pb-[8px] rounded-xl mt-7 bg-[#0092bf]'>
                  <StrokeText isDay={1} text={`${el.total}ml`} strokeDay={'#007295'} strokeNight={''} className='inline' />
                  <span className='font-bold float-right'>{formattedDate(new Date(el.date))}</span><br />
                  <StrokeText isDay={1} text={`${Math.round(el.total / el.items[el.items.length - 1].goal * 100)}%`} strokeDay={'#007295'} strokeNight={''} className='inline' />
                  <span className='text-sm float-right'>{el.items[el.items.length - 1].goal}ml</span>
                </div>
                {el.items.map((item, i) => (
                  <div key={i}>
                    <div className='w-[5px] h-4 bg-[#0092bf] ml-[30px]'></div>
                    <div className='h-[52px] grid grid-cols-[24px_1fr_45px_28px] gap-2 items-center text-[#0092bf] bg-white pl-[19px] pr-3 border-[2px] border-[#0291bb] rounded-[40px]'>
                      <Image className='w-full' alt='cup' width={207} height={399} src={`/cups/${item.cupIndex}.png`} />
                      <span className='font-bold'>{item.amount}ml</span>
                      <span className='font-semibold float-left'>{item.time}</span>
                      {(el.date === today) ?
                        <div className='cursor-pointer border border-gray-300 bg-gray-200 hover:bg-gray-300 w-[28px] h-[28px] flex items-center justify-center rounded-full' onClick={() => { deleteData(item.id, item.amount) }}>
                          <Minus className='text-gray-400 p-[2px]' />
                        </div> :
                        <div className='border border-[#5bcefc] w-[28px] h-[28px] flex items-center justify-center rounded-full'>
                          <Droplet className='p-[2px] text-[#5bcefc]' />
                        </div>
                      }
                    </div>
                  </div>))}
              </div>)) :
            <div>
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className={skeletonStyle}></div>
              ))}
            </div>
          }
        </div>
      </div>
      {error && <Alert />}
    </>
  )
}