'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import StrokeHeader from '@/components/ui/strokeHeader'
import Bubble from '@/components/ui/bubble'
import Button from '@/components/ui/button'
import NumInput from '@/components/ui/numInput'
import Alert from '@/components/alert'
import { ToggleSwitch } from '@/components/ui/switch'
import { X, CircleHelp, MapPinOff, GlassWater } from 'lucide-react'
import { getLocation, Coordinates } from '@/app/api/getLocation/getLocation'
import { fetchTimezone, Location } from '@/app/api/getLocation/getTimezone'
import Modal from '@/components/Modal'

export default function Profile() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [weight, setWeight] = useState<number>(0)
  const [duration, setDuration] = useState<number>(0)
  const [activity, setActivity] = useState<boolean>(false)
  const [highestTemp, setTemperate] = useState<number | null>(null)
  const [tempMode, setTempMode] = useState<boolean>(false)
  const [manual, setManual] = useState<boolean>(false)
  const [manualGoal, setManualGoal] = useState<number>(0)
  const [goal, setGoal] = useState(0)
  const [error, setError] = useState<boolean>(false)
  const activeIcon = 'M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288l111.5 0L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7l-111.5 0L349.4 44.6'
  const manualIcon = 'M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z'
  const weatherIcon = "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121 140.9 13.1c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"
  const skeletonStyle = 'w-52 h-14 my-3 bg-[#7fdcfb] inline-block rounded-md animate-pulse'
  const url: string = 'https://api.open-meteo.com/v1/forecast'
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [timezone, setTimezone] = useState<string>("")

  useEffect(() => {
    getLocation().then(() => {
      setLatitude(Coordinates.latitude)
      setLongitude(Coordinates.longitude)
    })

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
        setTempMode(json.profile[0].temp_mode)
        setManual(json.profile[0].manual)
        setLoaded(true)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      fetchTimezone({ lat: latitude, lon: longitude }).then(() => {
        setTimezone(Location.timezone)
      })
    }
  }, [latitude, longitude])

  useEffect(() => {
    const getWeatherData = async (latitude: number | null, longitude: number | null, timezone: string) => {
      try {
        const response = await fetch(
          `${url}?latitude=${latitude}&longitude=${longitude}&daily=apparent_temperature_max&timezone=${timezone}`,
          { method: 'GET', headers: { accept: 'application/json' } }
        )
        if (response.ok) {
          const data = await response.json()
          setTemperate(data.daily.apparent_temperature_max[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (latitude && longitude && timezone !== '') {
      getWeatherData(latitude, longitude, timezone)
    }
  }, [timezone])

  useEffect(() => {
    const extraIntake = tempMode && highestTemp != null && highestTemp >= 30 ? 500 : 0

    if (manual) {
      setGoal(Math.round(manualGoal))
    } else {
      const result: number = activity
        ? weight * 30 + (duration / 30) * 355 + extraIntake
        : weight * 30 + extraIntake
      setGoal(Math.round(result))
    }
  }, [weight, duration, activity, manual, manualGoal, tempMode])

  const save = async () => {
    const res = await fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ weight, duration, activity, manual, tempMode, goal }),
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
        <div className='flex flex-col items-center justify-center h-[calc(100vh-100px)] min-h-[500px] font-[family-name:var(--font-nunito)]'>
          <div className='grid grid-rows-[30px_1fr_60px_60px] h-[430px] items-center justify-center place-items-center mt-2 mb-6'>
            <div className='w-56 grid grid-cols-[1fr_56px] gap-2 items-center'>
              <p className=' font-bold'>Set Manually</p>
              <ToggleSwitch onChange={(event, val) => setManual(val)} checked={manual} svg={manualIcon} />
            </div>

            <div className='flex flex-col items-center justify-center'>
              {manual ?
                <div className='flex items-center justify-center'>
                  {loaded ?
                    <NumInput name='goal' initial={manualGoal} step={10} min={0} unit='ml' setNumber={setManualGoal} disable={false} /> :
                    <div className={skeletonStyle}></div>}
                </div>
                :
                <>
                  <div className='w-56 grid grid-cols-[1fr_56px] gap-2 items-center m-4'>
                    {latitude !== null ?
                      <>
                        {tempMode ? <span className='font-bold'>Temperature {highestTemp}°C</span> : <span className='font-bold'>Temperature Mode</span>}
                        <ToggleSwitch onChange={(event, val) => setTempMode(val)} checked={tempMode} svg={weatherIcon} />
                      </>
                      :
                      <>
                        <span className=' font-bold'>No Location Access</span>
                        <MapPinOff className='inline my-[5px] mx-auto animate-pulse' />
                      </>
                    }
                  </div>

                  {loaded ?
                    <NumInput name='weight' initial={weight} step={1} min={30} unit='kg' setNumber={setWeight} disable={false} /> :
                    <div className={skeletonStyle}></div>
                  }

                  <div className='w-56 grid grid-cols-[1fr_56px] gap-2 items-center mt-4'>
                    <span className=' font-bold'>Activity Mode</span>
                    <ToggleSwitch onChange={(event, val) => setActivity(val)} checked={activity} svg={activeIcon} />
                  </div>

                  {loaded ?
                    <NumInput name='workout' initial={duration} step={15} min={0} unit='mins' setNumber={setDuration} disable={!activity} /> :
                    <div className={skeletonStyle}></div>
                  }
                </>}
            </div>

            <div className='flex justify-center items-center'>
              <span className='text-xl mr-2'>Today&apos;s goal</span>
              {goal === 0 ?
                <div className='w-28 h-6 bg-[#7fdcfb] inline-block rounded-md animate-pulse'></div> :
                <div className='flex justify-center items-center'>
                  <span className='text-xl font-black'>{goal + "ml"}</span>
                  <CircleHelp className='m-2 inline-block cursor-pointer' onClick={() => setIsOpen(true)} />
                </div>
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

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className=''>
          <p className='my-1 text-base/7'>
            Daily Water Goal (ml) =<br />
            <b>Weight</b> (kg) &times; 30 &#43;<br />
            <b>Workout Duration</b> (min) / 30 &times; 355 &#43;<br />
            <b>Extra for Heat</b> (if temp &#8805; 30°C)
          </p>

          <GlassWater className='m-auto my-4' strokeWidth={1} />

          <p className='text-sm/5'>
            If you weigh 70 kg and work out for 60 minutes, and the temperature is 32°C, your daily water intake goal would be:
          </p>

          <table className='m-auto text-sm/5 mt-4 text-left'>
            <thead>
              <tr>
                <th>Weight</th>
                <td className='text-sm/4 pl-3 pb-2'>70 &times; 30 = <b>2100</b> ml</td>
              </tr>
              <tr>
                <th>Exercise</th>
                <td className='text-sm/4 pl-3 pb-2'>(60 / 30) &times; 355 = <b>710</b> ml</td>
              </tr>
              <tr>
                <th className='text-sm/4'>Heat bonus</th>
                <td className='text-sm/4 pl-3 pb-2'><b>500</b> ml (because it&apos;s above 30°C)</td>
              </tr>
              <tr>
                <th>Goal</th>
                <td className='text-sm/4 pl-3 pb-2'>2100 + 710 + 500 = <b>3310</b> ml</td>
              </tr>
            </thead>
          </table>
        </div>
      </Modal>
      {error && <Alert />}
    </div>
  )
}