'use client'

import { useState, useEffect } from 'react'
import StrokeHeader from '@/components/ui/strokeHeader'
import Bubble from '@/components/ui/bubble'
import { X } from 'lucide-react'
import ToggleGroup from '@/components/ui/toggleGroup'
import Button from '@/components/ui/button'
import TimePicker from '@/components/ui/timePicker'
import Alert from '@/components/alert'

interface Props {
  className?: string
  setAddAlarm: React.Dispatch<React.SetStateAction<boolean>>
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>
  openAlarm: boolean
}

const AddAlarm: React.FC<Props> = ({ className, setAddAlarm, setUpdate, openAlarm }) => {
  const [error, setError] = useState<boolean>(false)
  const [selectMon, setSelectMon] = useState<boolean>(false)
  const [selectTue, setSelectTue] = useState<boolean>(false)
  const [selectWed, setSelectWed] = useState<boolean>(false)
  const [selectThu, setSelectThu] = useState<boolean>(false)
  const [selectFri, setSelectFri] = useState<boolean>(false)
  const [selectSat, setSelectSat] = useState<boolean>(false)
  const [selectSun, setSelectSun] = useState<boolean>(false)
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    setSelectMon(false)
    setSelectTue(false)
    setSelectWed(false)
    setSelectThu(false)
    setSelectFri(false)
    setSelectSat(false)
    setSelectSun(false)
  }, [openAlarm])

  const add = async () => {
    const res = await fetch('/api/alarm/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ time, selectMon, selectTue, selectWed, selectThu, selectFri, selectSat, selectSun }),
    })

    const result = await res.json()
    if (result.success) {
      setAddAlarm(false)
      setUpdate(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      <div className={`w-full h-full fixed overflow-hidden p-6 gradient z-100'>] ${className}`}>
        <div className='grid grid-cols-[50px_1fr_50px] gap-10 items-center place-items-center'>
          <div></div>
          <StrokeHeader text='Add Alarm' />
          <div onClick={() => setAddAlarm(false)}>
            <Bubble link='/alarm'>
              <X />
            </Bubble>
          </div>
        </div>

        <div className='w-full h-[80vh] sm:w-[30rem] flex flex-col items-center justify-center m-auto'>
          <ToggleGroup openAlarm={openAlarm}
            initialMon={selectMon}
            initialTue={selectTue}
            initialWed={selectWed}
            initialThu={selectThu}
            initialFri={selectFri}
            initialSat={selectSat}
            initialSun={selectSun}
            setMon={setSelectMon}
            setTue={setSelectTue}
            setWed={setSelectWed}
            setThu={setSelectThu}
            setFri={setSelectFri}
            setSat={setSelectSat}
            setSun={setSelectSun}
          />

          <TimePicker className='' setTime={setTime} openAlarm={openAlarm} />

          <div onClick={() => { add() }}>
            <Button disable={false}>
              <span>ADD</span>
            </Button>
          </div>
        </div>
      </div>
      {error && <Alert />}
    </>
  )
}

export default AddAlarm