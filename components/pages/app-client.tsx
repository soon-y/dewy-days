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
import { Plus } from 'lucide-react'
import Water from '@/components/water'
import Dewy from '@/components/dewy'
import DewyBg from '@/components/dewyBg'
import WeatherIcon from '@/components/weatherIcon'
import { getLocation, Coordinates } from '@/app/api/getLocation/getLocation'
import { fetchTimezone, Location } from '@/app/api/getLocation/getTimezone'
import { MainRow } from "@/types"

export default function App({ data, cup, reset }: { data: MainRow, cup: { amount: number }, reset: boolean }) {
  const goal = data.goal
  const cupIndex = data.cup_index
  const [resetCurrentAmount, setReset] = useState<boolean>(reset)
  const [error, setError] = useState<boolean>(false)
  const [hasMounted, setHasMounted] = useState<boolean>(false)
  const [hurray, setHurray] = useState<boolean>(false)
  const [waterIntake, setWaterIntake] = useState<number>(data.current_amount)
  const [waterHeight, setWaterHeight] = useState<number>(100 - (waterIntake / goal * 100))
  const [amount, setAmount] = useState<number>(cup.amount)
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [timezone, setTimezone] = useState<string>("")
  const [isDay, setIsDay] = useState<number>(1)
  const [weatherCode, setWeatehrCode] = useState<number>(999)
  const waterWrapper = useRef<HTMLDivElement>(null)
  const url: string = 'https://api.open-meteo.com/v1/forecast'
  const marks = [{ value: cup.amount, label: cup.amount + 'ml' }]
  const dewyStyle = useSpring({ top: hasMounted ? (waterIntake === 0 ? '100%' : `${waterHeight}%`) : '100%' })
  const waterStyle = useSpring({
    display: hasMounted ? (waterIntake === 0 ? 'none' : 'block') : 'block',
    top: hasMounted ? (waterIntake === 0 ? '100%' : `${waterHeight}%`) : '100%'
  })

  useEffect(() => {
    setHasMounted(true)
    getLocation().then(() => {
      setLatitude(Coordinates.latitude)
      setLongitude(Coordinates.longitude)
    })
    setReset(reset)
  }, [])

  useEffect(() => {
    if (reset) {
      fetch('/api/updateCurrentAmount', {
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
          `${url}?latitude=${latitude}&longitude=${longitude}&current=is_day,weather_code&timezone=${timezone}`,
          { method: 'GET', headers: { accept: 'application/json' } }
        )
        if (response.ok) {
          const data = await response.json()
          setIsDay(data.current.is_day)
          setWeatehrCode(data.current.weather_code)
        }
      } catch (error) {
        console.error(error)
      }
    }

    if (latitude && longitude && timezone !== '') {
      getWeatherData(latitude, longitude, timezone)
    }
  }, [timezone])

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
          <StrokeText className='fixed top-[165px] mt-2 text-lg'
            isDay={isDay}
            text={`${goal.toString()}ml`}
            strokeDay={colors.day.stroke}
            strokeNight={colors.night.stroke}
          />
        </Link>

        <div className='fixed bottom-0 left-0 w-full h-[100px] bg-[url(/main/ground.jpg)] bg-repeat-x'></div>
        {hasMounted && (
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
        )}

        <div className='fixed bottom-0 left-0 h-[6.4rem] z-100 grid grid-cols-[1fr_10px_50px_50px] gap-4 w-full p-6 pl-8'>
          <StyledSlider
            aria-label="Water Intake"
            valueLabelDisplay="auto"
            step={5}
            min={0}
            max={cup.amount}
            marks={marks}
            value={amount}
            onChange={(event, val) => {
              if (typeof val === 'number') {
                setAmount(val)
              }
            }}
          />
          <div></div>
          <div onClick={add}>
            <Bubble link='/'>
              <Plus />
            </Bubble>
          </div>
          <Bubble link='/select-cup'>
            <Image src={`/cups/${cupIndex}.png`} alt='cup' width='207' height='399' className='p-[14px]' />
          </Bubble>
        </div>
        <Navigation />
      </div>
      {error && <Alert />}
    </>
  )
}