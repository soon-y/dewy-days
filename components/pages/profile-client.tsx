'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StrokeHeader from '@/components/ui/strokeHeader'
import Bubble from '@/components/ui/bubble'
import Button from '@/components/ui/button'
import NumInput from '@/components/ui/numInput'
import Alert from '@/components/alert'
import { ToggleSwitch } from '@/components/ui/switch'
import { X } from 'lucide-react'

export default function Profile() {
  const router = useRouter()
  const [loaded, setLoaded] = useState<boolean>(false)
  const [weight, setWeight] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [activity, setActivity] = useState<boolean>(false)
  const [manual, setManual] = useState<boolean>(false)
  const [manualGoal, setManualGoal] = useState<number>(0)
  const [goal, setGoal] = useState(0)
  const [error, setError] = useState<boolean>(false)
  const activeIcon = 'M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6'
  const manualIcon = 'M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z'

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/profile/fetch')
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
        setManualGoal(json.goal[0].goal)
        setGoal(json.goal[0].goal)
        setWeight(json.profile[0].weight)
        setDuration(json.profile[0].duration)
        setActivity(json.profile[0].activity_mode)
        setManual(json.profile[0].manual)
        setLoaded(true)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (manual) {
      setGoal(Math.round(manualGoal))
    } else {
      const result: number = activity
        ? weight * 30 + (duration / 30) * 355
        : weight * 30;
      setGoal(Math.round(result))
    }
  }, [weight, duration, activity, manual, manualGoal])

  const save = async () => {
    const res = await fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weight, duration, activity, manual, goal }),
    })

    const result = await res.json()
    if (result.success) {
      router.push('/')
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <div className='w-screen h-screen fixed overflow-auto gradient p-6'>
      <div>
        <div className='grid grid-cols-[50px_1fr_50px] gap-10 items-center place-items-center'>
          <div></div>
          <StrokeHeader text='Profile' />
          <Bubble link='/'>
            <X />
          </Bubble>
        </div>
        <div className='flex flex-col items-center justify-center h-[calc(100vh-100px)] min-h-[400px] font-[family-name:var(--font-nunito)]'>
          <div className='grid grid-rows-[30px_1fr_60px_60px] h-[380px] items-center justify-center place-items-center mt-2 mb-6'>

            <div className='w-56 grid grid-cols-[1fr_56px] gap-2 items-center'>
              <p className=' font-bold'>Set Manually</p>
              <ToggleSwitch onChange={(event, val) => setManual(val)} checked={manual} svg={manualIcon} />
            </div>

            <div className='flex flex-col items-center justify-center'>
              {manual ?
                <div className='flex items-center justify-center'>
                  {loaded ?
                    <NumInput name='goal' initial={manualGoal} step={10} min={0} unit='ml' setNumber={setManualGoal} disable={false} /> :
                    <div className='w-[90%] h-14 my-3 bg-[#7fdcfb] inline-block rounded-md animate-pulse'></div>}
                </div>
                :
                <>
                  {loaded ?
                    <NumInput name='weight' initial={weight} step={1} min={30} unit='kg' setNumber={setWeight} disable={false} /> :
                    <div className='w-[90%] h-14 my-3 bg-[#7fdcfb] inline-block rounded-md animate-pulse'></div>
                  }

                  <div className='w-56 grid grid-cols-[1fr_56px] gap-2 items-center mt-4'>
                    <span className=' font-bold'>Activity Mode</span>
                    <ToggleSwitch onChange={(event, val) => setActivity(val)} checked={activity} svg={activeIcon} />
                  </div>

                  {loaded ?
                    <NumInput name='workout' initial={duration} step={15} min={0} unit='mins' setNumber={setDuration} disable={!activity} /> :
                    <div className='w-[90%] h-14 my-3 bg-[#7fdcfb] inline-block rounded-md animate-pulse'></div>
                  }
                </>}
            </div>

            <div className='flex justify-center items-center'>
              <span className='text-xl mr-2'>Today&apos;s goal</span>
              {goal === 0 ?
                <div className='w-16 h-6 bg-[#7fdcfb] inline-block rounded-md animate-pulse'></div> :
                <span className='text-xl font-black'>{goal + "ml"}</span>
              }
            </div>

            <div className='flex justify-center' onClick={save}>
              <Button disable={goal === 0}>
                <p className=''>SAVE</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {error && <Alert />}
    </div>
  )
}