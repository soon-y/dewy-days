'use client'

import { useState, useEffect, useRef } from 'react'
import { animated, useSpring } from '@react-spring/web'
import Image from 'next/image'
import Link from 'next/link'
import Alert from '@/components/alert'
import StrokeText from '@/components/ui/strokeText'
import { colors } from '@/theme'
import Navigation from '@/components/navigation'
import { StyledSlider } from '@/components/ui/slider'
import Bubble from '@/components/ui/bubble'
import { Plus, GlassWater } from 'lucide-react'
import Water from '@/components/water'
import Dewy from '@/components/dewy'
import DewyBg from '@/components/dewyBg'
import WeatherIcon from '@/components/weatherIcon'
import { getWeatherData } from '@/app/api/weather/getWeatherData'
import useSWR from 'swr'

export default function App() {
  const [cupIndex, setCupIndex] = useState<number | null>(null)
  const [resetCurrentAmount, setReset] = useState<boolean>(false)
  const [goal, setGoal] = useState<number>(0)
  const [waterIntake, setWaterIntake] = useState<number>(0)
  const [waterHeight, setWaterHeight] = useState<number>(0)
  const [volume, setVolume] = useState<number>(0)
  const [amount, setAmount] = useState<number>(0)
  const [alert, setAlert] = useState<boolean>(false)
  const [hasMounted, setHasMounted] = useState<boolean>(false)
  const [hurray, setHurray] = useState<boolean>(false)
  const [isDay, setIsDay] = useState<number>(1)
  const [weatherCode, setWeatehrCode] = useState<number>(999)
  const waterWrapper = useRef<HTMLDivElement>(null)
  const marks = [{ value: volume, label: volume + 'ml' }]
  const dewyStyle = useSpring({ top: hasMounted ? (waterIntake === 0 ? '100%' : `${waterHeight}%`) : '100%' })
  const waterStyle = useSpring({
    display: hasMounted ? (waterIntake === 0 ? 'none' : 'block') : 'block',
    top: hasMounted ? (waterIntake === 0 ? '100%' : `${waterHeight}%`) : '100%'
  })

  const { data, error } = useSWR(
    'local-weather',
    getWeatherData, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 10 * 60 * 1000,
  })

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/main/fetch')
      if (!res.ok) {
        setAlert(true)
        setTimeout(() => setAlert(false), 3000)
        return
      }

      const json = await res.json()
      if (json === null) {
        setAlert(true)
        setTimeout(() => setAlert(false), 3000)
      } else {
        setReset(json.reset)
        setVolume(json.cupAmount)
        setAmount(json.cupAmount)
        setGoal(json.main[0].goal)
        setWaterIntake(json.main[0].current_amount)
        setCupIndex(json.main[0].cup_index)
        setWaterHeight(json.main[0].current_amount >= json.main[0].goal ? 0 : 100 - (json.main[0].current_amount / json.main[0].goal * 100))
        setHasMounted(true)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (resetCurrentAmount) {
      fetch('/api/main/updateCurrentAmount', {
        method: 'POST',
      })
        .then(res => {
          if (res.ok) {
            setWaterIntake(0)
          } else {
            setError(true)
            setTimeout(() => setError(false), 3000)
          }
        })
    }
  }, [resetCurrentAmount])

  useEffect(() => {
    if (data && data.current !== null) {
      setIsDay(data.current.current.is_day)
      setWeatehrCode(data.current.current.weather_code)
    }
  }, [data])

  useEffect(() => {
    if (error) {
      setAlert(true)
      setTimeout(() => { setAlert(false) }, 3000)
    }
  }, [error])

  const addWaterIntake = () => {
    const intake = waterIntake + amount
    setHurray(true)
    setTimeout(() => {
      setHurray(false)
    }, 500)
    setWaterIntake(intake)

    if (waterWrapper.current) {
      let percent: number = intake / goal * 100
      if (percent >= 100) {
        percent = 100
      }
      setWaterHeight(100 - percent)
    }
  }

  const add = async () => {
    const today = new Date()
    const currentAmount = waterIntake + amount

    const res = await fetch('/api/timeline/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cupIndex, amount, today, goal, currentAmount }),
    })

    const result = await res.json()
    if (result.success) {
      addWaterIntake()
    } else {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <>
      <div className={`w-full h-full fixed overflow-hidden p-6 ${isDay === 1 ? 'bg-[url(/main/bg.jpg)]' : 'bg-[url(/main/bgNight.jpg)]'}`}>
        <div className='fixed h-[7rem] aspect-square top-[1.5rem]'>
          <Link href={'/weather'}>
            <WeatherIcon code={weatherCode} isDay={isDay} opc={false} />
          </Link>
        </div>

        <Link href={'/profile'}>
          <StrokeText className='fixed top-[130px] mt-4 text-lg'
            isDay={isDay}
            text='Today&apos;s goal'
            strokeDay={colors.day.stroke}
            strokeNight={colors.night.stroke}
          />
          {goal === 0 ?
            <div className='fixed top-[165px] mt-3 bg-[#ebfaff] animate-pulse w-16 h-5 rounded-md'></div> :
            <StrokeText className='fixed top-[165px] mt-2 text-lg'
              isDay={isDay}
              text={`${goal}ml`}
              strokeDay={colors.day.stroke}
              strokeNight={colors.night.stroke}
            />}
        </Link>

        <div className='fixed bottom-0 left-0 w-full h-[100px] bg-[url(/main/ground.jpg)] bg-repeat-x'></div>
        {hasMounted ? (
          <>
            <div className='fixed left-0 bottom-[120px] w-screen h-[calc(100vh-21rem)]'>
              <animated.div className='relative duration-1000 ease-out w-full h-full' style={dewyStyle}>
                <DewyBg waterIntake={waterIntake} />
              </animated.div>
            </div>
            <div ref={waterWrapper} className='fixed left-0 bottom-[120px] w-screen h-[calc(100vh-21rem)]'>
              <animated.div className='relative duration-1000 ease-out w-full h-full' style={waterStyle}>
                <Water isDay={isDay} total={waterIntake} percent={Math.round(waterIntake / goal * 100)} />
              </animated.div>
            </div>
            <div className='fixed left-[25%] bottom-[120px] w-[50%] h-[calc(100vh-21rem)]'>
              <animated.div className='relative duration-1000 ease-out w-full h-full' style={dewyStyle}>
                <Dewy hurray={hurray} waterIntake={waterIntake} />
              </animated.div>
            </div>
          </>
        ) :
          <div className='fixed w-full h-full flex flex-col left-0 top-0 items-center justify-center animate-pulse'>
            <Image className='w-40' alt='loading' src={'/dewy/dewy_smile.png'} width={671} height={653} priority />
            <p className='text-[#05aee6] text-xl mt-4 font-[family-name:var(--font-nunito)]'>Loading</p>
          </div>}

        {hasMounted &&
          <div className='fixed bottom-0 left-0 h-[6.4rem] z-100 grid grid-cols-[1fr_10px_50px_50px] gap-2 w-full p-6 pl-7'>
            <StyledSlider
              aria-label="Water Intake"
              valueLabelDisplay="auto"
              step={5}
              min={0}
              max={volume}
              marks={marks}
              value={amount}
              onChange={(event, val) => { if (typeof val === 'number') { setAmount(val) } }}
            />
            <div></div>
            <div onClick={add}>
              <Bubble link='/'>
                <Plus />
              </Bubble>
            </div>
            <Bubble link='/select-cup'>
              {cupIndex === null ?
                <GlassWater className='animate-pulse' /> :
                <Image src={`/cups/${cupIndex}.png`} alt='cup' width='207' height='399' className='p-[14px]' />
              }
            </Bubble>
          </div>}
        {hasMounted && <Navigation />}
      </div>
      {alert && <Alert />}
    </>
  )
}