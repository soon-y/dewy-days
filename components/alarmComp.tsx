import { useState, useEffect } from 'react'
import { ToggleSwitch } from '@/components/ui/switch'
import { AlarmRow } from "@/types"

interface Props {
  el: AlarmRow
  setError: React.Dispatch<React.SetStateAction<boolean>>
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

const AlarmComp: React.FC<Props> = ({ el, setError, setUpdate }) => {
  const [on, setOn] = useState<boolean>(el.on)
  const [past, setPast] = useState<boolean>(false)
  const style: string = `m-1 bg-white rounded-md text-[#0898da] font-bold px-[6px] py-[1px] text-sm ${on ? '' : 'opacity-50'}`

  useEffect(() => {
    if (!el.alarm_mon && !el.alarm_tue && !el.alarm_wed && !el.alarm_thu && !el.alarm_fri && !el.alarm_sat && !el.alarm_sun) {
      if (isPast(el.time.toString().slice(0, 5))) {
        setPast(true)
      }
    }
  }, [])

  const isPast = (time: string): boolean => {
    const now = new Date()
    const [h, m] = time.split(':').map(Number)
    const inputTime = new Date()
    inputTime.setHours(h, m, 0, 0)
    return now > inputTime;
  }

  const deleteAlarm = async (id: number) => {
    const res = await fetch(`/api/alarm/delete`, {
      method: 'POST',
      body: JSON.stringify({ id }),
    })
    const result = await res.json()
    if (result.success) {
      setUpdate(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  const updateSelection = async (id: number, val: boolean) => {
    const res = await fetch(`/api/alarm/updateSelection`, {
      method: 'POST',
      body: JSON.stringify({ id, val }),
    })
    const result = await res.json()
    if (result.success) {
      setUpdate(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className='w-full'>
      <div className='w-full min-h-24 grid grid-cols-[1fr_60px_40px] gap-2 p-2 pb-3 items-center border-b border-[rgba(255,255,255,0.5)]'>
        <div>
          <h3 className={`text-4xl my-1 font-light ${on ? '' : 'opacity-50'} ${!past ? '' : 'opacity-50'}`}>
            {el.time.toString().slice(0, 5)}
          </h3>
          <div className='flex flex-wrap '>
            {el.alarm_mon && <span className={style}>Mon</span>}
            {el.alarm_tue && <span className={style}>Tue</span>}
            {el.alarm_wed && <span className={style}>Wed</span>}
            {el.alarm_thu && <span className={style}>Thu</span>}
            {el.alarm_fri && <span className={style}>Fri</span>}
            {el.alarm_sat && <span className={style}>Sat</span>}
            {el.alarm_sun && <span className={style}>Sun</span>}
          </div>
        </div>
        <div>{!past &&
          <ToggleSwitch checked={on} svg={''} onChange={(event, val) => {
            setOn(val)
            updateSelection(el.id, val)
          }} />
        }</div>
        <div>
          <button disabled={false} className='cursor-pointer text-xl px-[11px] py-[2px] rounded-full border-1 border-gray-400 bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-white' onClick={() => { deleteAlarm(el.id) }}>
            <span className='text-xl font-bold'>&minus;</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AlarmComp