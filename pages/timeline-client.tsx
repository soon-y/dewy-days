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

export default function Timeline({ data, main }: { data: TimelineRow[], main: {current_amount: number} }) {
  const [groupedData, setGroupedData] = useState<Grouped[]>()
  const [error, setError] = useState<boolean>(false)
  const [updateData, setUpdateData] = useState<boolean>(false)
  const [currentAmount, setCurrentAmount] = useState<number>(main.current_amount)
  const today = new Date().toISOString().split('T')[0]

  useEffect(() => {
    groupByDateAndTime(data)
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
    const newAmount: number = currentAmount - Number(amount)

    const res = await fetch(`/api/timeline/delete`, {
      method: 'POST',
      body: JSON.stringify({ id, newAmount }),
    })
    const result = await res.json()
    if (result.success) {
      setUpdateData(true)
      setCurrentAmount(newAmount)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  function groupByDateAndTime(data: TimelineRow[]): Grouped[] {
    const grouped = new Map<string, TimelineRow[]>()
    const result: Grouped[] = []

    for (const item of data) {
      const dateKey = item.date.toISOString().split('T')[0]
      if (!grouped.has(dateKey)) grouped.set(dateKey, [])
      grouped.get(dateKey)!.push(item)
    }

    for (const [date, items] of grouped.entries()) {
      const formattedItems = items
        .map((item) => ({
          id: item.id,
          time: item.date.toTimeString().slice(0, 5),
          amount: item.amount,
          cupIndex: item.cup_index,
          goal: item.goal
        }))
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
          {groupedData?.map((el, i) => (
            <div key={i}>
              <div className='w-auto h-auto px-5 py-3 rounded-xl mt-8 bg-[#0092bf]'>
                <StrokeText isDay={1} text={`${el.total}ml`} strokeDay={'#007295'} strokeNight={''} className='inline' />
                <span className='font-bold float-right'>{formattedDate(new Date(el.date))}</span><br />
                <StrokeText isDay={1} text={`${Math.round(el.total / el.items[el.items.length - 1].goal * 100)}%`} strokeDay={'#007295'} strokeNight={''} className='inline' />
                <span className='text-sm float-right'>{el.items[el.items.length - 1].goal}ml</span>
              </div>
              {el.items.map((item, i) => (
                <div key={i}>
                  <div className='w-2 h-5 bg-[#0092bf] ml-[32px]'></div>
                  <div className='h-16 grid grid-cols-[26px_1fr_50px_32px] gap-2 items-center text-[#0092bf] bg-white pl-5 pr-4 py-1 border-[3px] border-[#0291bb] rounded-[40px]'>
                    <Image className='w-full' alt='cup' width={207} height={399} src={`/cups/${item.cupIndex}.png`} />
                    <span className='font-bold'>{item.amount}ml</span>
                    <span className='font-bold float-left'>{item.time}</span>
                    {(el.date === today) ?
                      <div className='cursor-pointer border border-gray-300 bg-gray-200 hover:bg-gray-300 w-[32px] h-[32px] flex items-center justify-center rounded-full' onClick={() => { deleteData(item.id, item.amount) }}>
                        <Minus className='text-gray-400 p-[2px]' />
                      </div> :
                      <div className='border border-[#5bcefc] w-[32px] h-[32px] flex items-center justify-center rounded-full'>
                        <Droplet className='p-[2px] text-[#5bcefc]' />
                      </div>
                    }
                  </div>
                </div>))}
            </div>))}
        </div>
      </div>
      {error && <Alert />}
    </>
  )
}