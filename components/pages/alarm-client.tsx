'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import StrokeHeader from '@/components/ui/strokeHeader'
import Bubble from '@/components/ui/bubble'
import { ToggleSwitch } from '@/components/ui/switch'
import Tab from '@/components/ui/tab'
import ToggleGroup from '@/components/ui/toggleGroup'
import TabGroup from '@/components/ui/tabGroup'
import StrokeSubText from '@/components/ui/strokeSubText'
import { StyledRangeSlider } from '@/components/ui/rangeSlider'
import NumInput from '@/components/ui/numInput'
import AlarmComp from '@/components/alarmComp'
import { X, LoaderCircle } from 'lucide-react'
import AddAlarm from './addAlarm'
import { AlarmRow, AlarmSettingRow } from "@/types"
import Alert from '@/components/alert'

export default function Alarm({ alarmSetting, alarm }: { alarmSetting: AlarmSettingRow, alarm: AlarmRow[] }) {
  const svg = "M224 0c-17.7 0-32 14.3-32 32l0 19.2C119 66 64 130.6 64 208l0 18.8c0 47-17.3 92.4-48.5 127.6l-7.4 8.3c-8.4 9.4-10.4 22.9-5.3 34.4S19.4 416 32 416l384 0c12.6 0 24-7.4 29.2-18.9s3.1-25-5.3-34.4l-7.4-8.3C401.3 319.2 384 273.9 384 226.8l0-18.8c0-77.4-55-142-128-156.8L256 32c0-17.7-14.3-32-32-32zm45.3 493.3c12-12 18.7-28.3 18.7-45.3l-64 0-64 0c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7z"
  const [alert, setAlert] = useState<boolean>(false)
  const [updateData, setUpdateData] = useState<boolean>(false)
  const [on, setOn] = useState<boolean>(alarmSetting.on)
  const [tabIndex, setTabIndex] = useState<number>(alarmSetting.tab_index)
  const [timeRange, setTimeRange] = useState<number[]>([alarmSetting.range_start, alarmSetting.range_end])
  const [interval, setInterval] = useState<number>(alarmSetting.interval)
  const [repeatMon, setRepeatMon] = useState<boolean>(alarmSetting.repeat_mon)
  const [repeatTue, setRepeatTue] = useState<boolean>(alarmSetting.repeat_tue)
  const [repeatWed, setRepeatWed] = useState<boolean>(alarmSetting.repeat_wed)
  const [repeatThu, setRepeatThu] = useState<boolean>(alarmSetting.repeat_thu)
  const [repeatFri, setRepeatFri] = useState<boolean>(alarmSetting.repeat_fri)
  const [repeatSat, setRepeatSat] = useState<boolean>(alarmSetting.repeat_sat)
  const [repeatSun, setRepeatSun] = useState<boolean>(alarmSetting.repeat_sun)
  const [openAlarm, setOpenAlarm] = useState<boolean>(false)
  const [loaded, setLoaded] = useState<boolean>(true)
  const [alarmData, setAlarmData] = useState<AlarmRow[]>(alarm)
  const router = useRouter()

  useEffect(() => {
    if (updateData) {
      fetch('/api/alarm/fetch')
        .then(res => res.json())
        .then(data => {
          setAlarmData(data)
          setUpdateData(false)
          setLoaded(true)
        })
        .catch(() => {
          setAlert(true)
          setTimeout(() => setAlert(false), 3000)
        })
    }
  }, [updateData])

  const update = async () => {
    const res = await fetch('/api/alarm/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ on, tabIndex, repeatMon, repeatTue, repeatWed, repeatThu, repeatFri, repeatSat, repeatSun, timeRange, interval }),
    })

    const result = await res.json()
    if (result.success) {
      router.push('/')
    } else {
      setAlert(true)
      setTimeout(() => setAlert(false), 3000)
    }
  }

  return (
    <>
      <div className='w-full h-full fixed overflow-auto p-6 pb-10 font-[family-name:var(--font-nunito)]'>
        <div>
          <div className='grid grid-cols-[50px_1fr_50px] gap-10 items-center place-items-center'>
            <div></div>
            <StrokeHeader text='Alarm' />
            <div onClick={update}>
              <Bubble link='/alarm'>
                <X />
              </Bubble>
            </div>
          </div>

          <div className='flex flex-col items-center'>
            <div className='mt-4'>
              <span className='font-[family-name:var(--font-nunito)] font-bold'>Notification</span>
              <ToggleSwitch onChange={(event, val) => setOn(val)} checked={on} svg={svg} />
            </div>

            {loaded && on &&
              <div className='w-full sm:w-[30rem] mt-4'>
                <div className='grid grid-cols-[1fr_1fr] w-full'>
                  <div onClick={() => {
                    setTabIndex(0)
                  }}>
                    <TabGroup title='Set Routines' clicked={tabIndex === 0} />
                  </div>
                  <div onClick={() => {
                    setTabIndex(1)
                  }}>
                    <TabGroup title='Set Alarms' clicked={tabIndex === 1} />
                  </div>
                </div>

                {tabIndex === 0 &&
                  <Tab className='rounded-r-2xl'>
                    <StrokeSubText text='Repeat every' />
                    <ToggleGroup
                      openAlarm={false}
                      initialMon={repeatMon}
                      initialTue={repeatTue}
                      initialWed={repeatWed}
                      initialThu={repeatThu}
                      initialFri={repeatFri}
                      initialSat={repeatSat}
                      initialSun={repeatSun}
                      setMon={setRepeatMon}
                      setTue={setRepeatTue}
                      setWed={setRepeatWed}
                      setThu={setRepeatThu}
                      setFri={setRepeatFri}
                      setSat={setRepeatSat}
                      setSun={setRepeatSun}
                    />

                    <StrokeSubText text='Time Range' className='mt-6' />
                    <StyledRangeSlider
                      disabled={!(repeatMon || repeatTue || repeatWed || repeatThu || repeatFri || repeatSat || repeatSun)}
                      sx={{ marginTop: '3.6rem' }}
                      aria-label="alarm range"
                      valueLabelDisplay="on"
                      min={1} max={24}
                      value={[timeRange[0], timeRange[1]]}
                      onChange={(event, val) => {
                        if (Array.isArray(val)) { setTimeRange(val) }
                      }}
                    />

                    <StrokeSubText text='Notify me every' className='mt-6' />
                    <NumInput name='time' unit='mins' initial={interval} step={5} min={1} setNumber={setInterval}
                      disable={!(repeatMon || repeatTue || repeatWed || repeatThu || repeatFri || repeatSat || repeatSun)} />
                  </Tab>
                }

                {tabIndex === 1 &&
                  <Tab className='rounded-l-2xl'>
                    {updateData === false ?
                      (alarmData.map((el, index) => (
                        <AlarmComp el={el} key={index} setAlert={setAlert} setUpdate={setUpdateData} />
                      ))) :
                      <LoaderCircle className='animate-spin w-8 h-8 my-6' />
                    }

                    <button disabled={false} className='cursor-pointer mt-5 my-2 text-xl px-[14px] py-[5px] rounded-full border-1 border-white bg-[#b0e9ff] hover:bg-[#10b4f5] text-[#0898da] hover:text-white' onClick={
                      () => { setOpenAlarm(true) }
                    }>
                      <span className='text-2xl font-bold'>&#43;</span>
                    </button>
                  </Tab>
                }
              </div>
            }

            {!loaded &&
              <div className='w-full sm:w-[30rem] mt-4'>
                <div className='grid grid-cols-[1fr_1fr] w-full'>
                  <div className='animate-pulse rounded-t-2xl w-full h-16 bg-[#b3e9ff]'></div>
                  <div></div>
                </div>
                <div className='animate-pulse rounded-r-2xl rounded-b-2xl w-full bg-[#b3e9ff] flex flex-col items-center p-6'>
                  <div className='w-28 h-7 bg-[#8fdfff] rounded-lg animate-pulse'></div>
                  <div className='w-full h-14 bg-[#8fdfff] rounded-xl mt-4'></div>

                  <div className='w-28 h-7 bg-[#8fdfff] rounded-lg animate-pulse mt-8'></div>
                  <div className='w-full h-16 bg-[#8fdfff] rounded-lg mt-4'></div>

                  <div className='w-24 h-7 bg-[#8fdfff] rounded-lg animate-pulse mt-8'></div>
                  <div className='w-56 h-10 bg-[#8fdfff] rounded-lg my-4'></div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
      <AddAlarm className={`${openAlarm ? 'translate-x-0' : 'translate-x-full'} duration-500`}
        setAddAlarm={setOpenAlarm} openAlarm={openAlarm} setUpdate={setUpdateData} />
      {alert && <Alert />}
    </>
  )
}