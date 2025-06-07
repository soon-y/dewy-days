'use client'

import { useState, useEffect, useRef } from 'react'
import StrokeHeader from '@/components/ui/strokeHeader'
import Bubble from '@/components/ui/bubble'
import { MapPinOff, LoaderCircle, X, CloudHail, CloudRainWind, CloudRain, CloudDrizzle, CloudFog, Cloudy, Sun, CloudSun, CloudLightning, Snowflake } from 'lucide-react'
import WeatherIcon from '@/components/weatherIcon'
import { getLocation, Coordinates } from '@/app/api/getLocation/getLocation'
import { fetchTimezone, Location } from '@/app/api/getLocation/getTimezone'
import Image from 'next/image'
import { DailyForecast, HourlyForecast, UVForcast, FilteredDaily, Days } from '@/types'

export default function Weather() {
  const url: string = 'https://api.open-meteo.com/v1/forecast'
  const pointer = useRef<HTMLDivElement>(null)
  const clockBg = useRef<HTMLDivElement>(null)
  const d = new Date()
  const hour = d.getHours()
  const [clock, setClock] = useState<number>(hour)
  const [active, setActive] = useState<boolean>(false)
  const [time, setTime] = useState<number>(hour > 12 ? hour - 12 : hour)
  const [dailyData, setDailyData] = useState<DailyForecast>()
  const [hourlyData, setHourlyData] = useState<HourlyForecast>()
  const [forecastDataFiltered, setforecastDataFiltered] = useState<FilteredDaily[]>()
  const [airData, setAirData] = useState<UVForcast>()
  const [index, setIndex] = useState<number>(hour)
  const [daysArray, setDaysArray] = useState<Days[]>()
  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)
  const [timezone, setTimezone] = useState<string>("")
  const days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const formattedDate: string = d.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
  })
  const [today, setToday] = useState<string>('')

  useEffect(() => {
    setToday(formattedDate)
    getLocation().then(() => {
      if (Coordinates.latitude && Coordinates.longitude) {
        setLatitude(Coordinates.latitude)
        setLongitude(Coordinates.longitude)
      }
    })

    const day = d.getDay()
    const array: Days[] = []
    for (let i = 1; i <= 6; i++) {
      const temp = { "id": i, "days": day + i }
      array.push(temp)
    }
    setDaysArray(array)
  }, [])

  useEffect(() => {
    if (latitude && longitude) {
      fetchTimezone({ lat: latitude, lon: longitude }).then(() => {
        setTimezone(Location.timezone)
      })
    }
  }, [latitude, longitude])

  useEffect(() => {
    if (latitude && longitude) {
      getWeatherData(latitude, longitude, timezone)
    }
  }, [timezone])

  useEffect(() => {
    if (pointer.current) { pointer.current.style.transform = `rotate(${clock * 30}deg)` }
    const uhr = hour >= 12 ? hour - 12 : hour
    const clk = clock >= 12 ? clock - 12 : clock
    setTime(clk < 1 ? 12 : Math.floor(clk))

    if (hourlyData) {
      if (hour >= 12) {
        setIndex(Math.floor(clock + 12))
        if (clk < uhr) {
          setIndex(Math.floor(clock + 24))
        }
      } else {
        setIndex(Math.floor(clock))
        if (clk >= 0 && clk < uhr) {
          setIndex(Math.floor(clock + 12))
        }
      }
    }
  }, [clock, active])

  const getWeatherData = (lat: number, lon: number, time: string) => {
    const options = { method: 'GET', headers: { accept: 'application/json' } }

    fetch(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=european_aqi_pm2_5,european_aqi_pm10&timezone=${time}`, options)
      .then(response => response.json())
      .then(data => {
        setAirData(data.hourly)
      })

    fetch(`${url}?latitude=${lat}&longitude=${lon}&hourly=apparent_temperature,precipitation_probability,weather_code,uv_index,is_day&forecast_days=3&timezone=${time}`, options)
      .then(response => response.json())
      .then(data => {
        setHourlyData(data.hourly)
      })

    fetch(`${url}?latitude=${lat}&longitude=${lon}&daily=weather_code,apparent_temperature_max,apparent_temperature_min&timezone=${time}`, options)
      .then(response => response.json())
      .then(data => {
        setDailyData(data.daily)
        filterData(data.daily)
      })
  }

  const filterData = (data: DailyForecast) => {
    const forecastDataFiltered: FilteredDaily[] = []
    const day = d.getDay()

    for (let i = 1; i <= 6; i++) {
      const code = data.weather_code[i]
      const high = Math.round(data.apparent_temperature_max[i])
      const low = Math.round(data.apparent_temperature_min[i])
      const array = { "id": i, "days": day + i, "low": low, "high": high, "code": code }
      forecastDataFiltered.push(array)
    }
    setforecastDataFiltered(forecastDataFiltered)
  }

  const uvIndex = (data: number) => {
    let state: string = ''
    if (data < 3) {
      state = "Low"
    } else if (data >= 3 && data < 6) {
      state = "Moderate"
    } else if (data >= 6 && data < 8) {
      state = "High"
    } else if (data >= 8 && data < 11) {
      state = "Very High"
    } else {
      state = "Extreme"
    }
    return (
      <>
        <span> {data} </span>
        <span className='ml-2 font-bold' style={{
          color: data >= 6 ? '#d61a17' : 'white'
        }}>{state}
        </span>
      </>
    )
  }

  const airQuality10 = (data: number) => {
    let state: string = ''
    if (data < 20) {
      state = "Good"
    } else if (data >= 20 && data < 40) {
      state = "Fair"
    } else if (data >= 40 && data < 50) {
      state = "Moderate"
    } else if (data >= 50 && data < 100) {
      state = "Poor"
    } else if (data >= 100 && data < 150) {
      state = "Very Poor"
    } else {
      state = "Extremely Poor"
    }
    return (
      <>
        <span>{data < 10 ? '0' + data : data}</span>
        <span className='ml-2 font-bold' style={{
          color: data >= 50 ? '#d61a17' : 'white'
        }}>{state}
        </span>
      </>
    )
  }

  const airQuality25 = (data: number) => {
    let state: string = ''
    if (data < 10) {
      state = "Good"
    } else if (data >= 10 && data < 20) {
      state = "Fair"
    } else if (data >= 20 && data < 25) {
      state = "Moderate"
    } else if (data >= 25 && data < 50) {
      state = "Poor"
    } else if (data >= 50 && data < 75) {
      state = "Very Poor"
    } else { state = "Extremely Poor" }
    return (
      <>
        <span>{data < 10 ? '0' + data : data}</span>
        <span className='ml-2 font-bold' style={{
          color: data >= 25 ? '#d61a17' : 'white',
        }}>{state}
        </span>
      </>
    )
  }

  function AMPM(): string {
    const isAfternoon = hour >= 12
    const uhr: number = isAfternoon ? hour - 12 : hour
    if (hour == 0) {
      return ' AM'
    } else if (hour == 12) {
      return ' PM'
    } else if (hour < 12 && clock >= uhr) {
      return ' AM'
    } else if (hour < 12 && clock < uhr) {
      return ' PM'
    } else if (hour >= 12 && clock < uhr) {
      return ' AM'
    } else if (hour >= 12 && clock >= uhr) {
      return ' PM'
    }
    return ' PM'
  }

  const drag = (e: React.MouseEvent | React.TouchEvent) => {
    if (active && pointer.current && clockBg.current) {
      pointer.current.style.transitionDuration = '0ms'
      let mx: number, my: number

      if ('touches' in e) {
        mx = e.touches[0].clientX
        my = e.touches[0].clientY
      } else {
        mx = e.clientX
        my = e.clientY
      }
      const w = clockBg.current.offsetLeft + clockBg.current.offsetWidth / 2
      const h = clockBg.current.offsetTop + clockBg.current.offsetWidth / 2 + 4.2 * 16
      const adjacent = mx - w
      const opposite = h - my
      let angle = Math.atan(opposite / adjacent) * (180 / Math.PI)

      if (adjacent >= 0) {
        angle = Math.floor(90 - angle) / 30
      } else {
        angle = Math.floor(270 - angle) / 30
      }
      setClock(angle)
      document.body.style.cursor = 'grabbing'
    }
  }

  function dragEnd() {
    setActive(false)
    setClock(Math.floor(clock))
    if (pointer.current) pointer.current.style.transitionDuration = '500ms'
    document.body.style.cursor = 'default'
  }

  return (
    <div className='overflow-y-auto w-full h-full fixed gradient p-6 font-[family-name:var(--font-nunito)]'>
      <div className='grid grid-cols-[50px_1fr_50px] gap-10 items-center place-items-center'>
        <div></div>
        <StrokeHeader text='Weather' />
        <Bubble link='/'>
          <X />
        </Bubble>
      </div>

      <div className='m-auto w-full sm:w-[30rem] flex flex-col items-center h-[calc(100vh-100px)]'>
        <div className='text-center mt-6 font-bold'>
          {today === '' ?
            <p className='w-24 h-4 mb-2 rounded-md bg-[rgba(255,255,255,0.4)] animate-pulse'></p> :
            <p>{today}</p>
          }
          {Location.suburb === '' ?
            <p className='w-24 h-4 my-1 rounded-md bg-[rgba(255,255,255,0.4)] animate-pulse'></p> :
            <p>{Location.suburb.toUpperCase()}</p>
          }
        </div>

        <div className='bg-[url(/weather/clock.png)] w-full aspect-[1] bg-cover relative my-3' ref={clockBg}
          onMouseMove={drag}
          onMouseUp={() => dragEnd()}
          onTouchMove={drag}
          onTouchEnd={() => dragEnd()}>
          {hourlyData ?
            <div className='absolute w-full h-full grid grid-rows-[30px_1fr_30px] p-16 justify-center items-center text-center gap-4'>
              <div className='font-medium text-2xl text-[#0898da]'>{time + AMPM()}</div>
              <div className='h-full aspect-[1]'>
                <WeatherIcon code={hourlyData.weather_code[index]} isDay={hourlyData.is_day[index]} opc={true} />
              </div>
              <div className='font-medium text-2xl text-[#0898da]'>{hourlyData.apparent_temperature[index]}°</div>
            </div> :
            <div className='absolute left-[15%] top-[15%] w-[70%] h-[70%] flex flex-col py-18 gap-3 justify-center items-center text-center'>
              <div className='flex items-end justify-center'>
                {(latitude === null && longitude === null) ?
                  <Image className='w-[70%] ' alt='dewy' src={'/dewy/dewy_frown.png'} width={671} height={653} /> :
                  <Image className='w-[70%] ' alt='dewy' src={'/dewy/dewy_smile.png'} width={671} height={653} />}
              </div>
              {(latitude === null && longitude === null) ?
                <div className='font-medium text-lg/4 text-[#0898da] flex flex-col items-center'>
                  Please allow location access <br /> <MapPinOff className='mt-2' />
                </div> :
                <div className='font-medium text-lg/4 text-[#0898da] flex flex-col items-center animate-pulse'>
                  Loading
                  <LoaderCircle className='mt-2 animate-[spin_1s_ease-in-out_infinite]' />
                </div>}
            </div>
          }
          <div
            ref={pointer}
            className='relative bg-[url(/weather/pointer.png)] h-[50%] w-[10%] opacitiy-80 z-100
            bg-contain bg-no-repeat bg-position-center-center trans m-auto hover:cursor-grab' style={{ transformOrigin: 'center bottom' }}
            onMouseDown={() => setActive(true)}
            onTouchStart={() => setActive(true)}
          >
          </div>
        </div>

        {(dailyData && airData && hourlyData) ?
          <table className='weatherInfo m-auto'>
            <tbody>
              <tr>
                <th>Min/Max Temp</th>
                <td>
                  <span className='opacity-80 mr-1'>{dailyData.apparent_temperature_min[0]}° </span>
                  <span>{dailyData.apparent_temperature_max[0]}°</span>
                </td>
              </tr>
              <tr>
                <th>UV Index</th>
                <td>{uvIndex(hourlyData.uv_index[index])}</td>
              </tr>
              <tr>
                <th>Chance of Rain</th>
                <td>{hourlyData.precipitation_probability[index]}%</td>
              </tr>
              <tr>
                <th>PM 10</th>
                <td>{airQuality10(Math.round(airData.european_aqi_pm10[index]))}</td>
              </tr>
              <tr>
                <th>PM2.5</th>
                <td>{airQuality25(Math.round(airData.european_aqi_pm2_5[index]))}</td>
              </tr>
            </tbody>
          </table> :
          <table className='weatherInfo m-auto'>
            <tbody>
              <tr>
                <th>Min/Max Temp</th>
                <td><div className='w-full h-4 rounded-md bg-[rgba(255,255,255,0.2)] animate-pulse'></div></td>
              </tr>
              <tr>
                <th>UV Index</th>
                <td><div className='w-full h-4 rounded-md bg-[rgba(255,255,255,0.2)] animate-pulse'></div></td>
              </tr>
              <tr>
                <th>Chance of Rain</th>
                <td><div className='w-full h-4 rounded-md bg-[rgba(255,255,255,0.2)] animate-pulse'></div></td>
              </tr>
              <tr>
                <th>PM 10</th>
                <td><div className='w-full h-4 rounded-md bg-[rgba(255,255,255,0.2)] animate-pulse'></div></td>
              </tr>
              <tr>
                <th>PM2.5</th>
                <td><div className='w-full h-4 rounded-md bg-[rgba(255,255,255,0.2)] animate-pulse'></div></td>
              </tr>
            </tbody>
          </table>
        }

        {forecastDataFiltered ?
          <div className='w-full grid grid-cols-6 gap-1 my-4 py-4 border-t text-center items-center justify-items-center'>
            {forecastDataFiltered.map(el => (
              <div key={el.id} className='flex flex-col items-center'>
                <div className='text-sm'>{days[el.days % 7]}</div>
                <div className='py-1 opacity-80'>
                  {(el.code === 0 || el.code === 1) && <Sun />}
                  {(el.code === 2) && <CloudSun />}
                  {(el.code === 3) && <Cloudy />}
                  {(el.code === 45 || el.code === 48) && <CloudFog />}
                  {(el.code === 51 || el.code === 53 || el.code === 55) && <CloudDrizzle />}
                  {(el.code === 56 || el.code === 57 || el.code === 66 || el.code === 67) && <CloudHail />}
                  {(el.code === 61 || el.code === 63 || el.code === 65) && <CloudRain />}
                  {(el.code === 71 || el.code === 73 || el.code === 75 || el.code === 77 || el.code === 85 || el.code === 86) && <Snowflake />}
                  {(el.code === 80 || el.code === 81 || el.code === 82) && <CloudRainWind />}
                  {(el.code === 95 || el.code === 96 || el.code === 99) && <CloudLightning />}
                </div>
                <div>
                  <span className='opacity-80 mr-1 text-sm'>{el.low}°</span>
                  <span className='text-sm'>{el.high}°</span>
                </div>
              </div>
            ))}
          </div> :
          daysArray &&
          <div className='w-full grid grid-cols-6 gap-1 my-4 py-4 border-t text-center items-center justify-items-center'>
            {daysArray.map(el => (
              <div key={el.id} className='flex flex-col items-center'>
                <div className='text-sm'>{days[el.days % 7]}</div>
                <div className='w-8 h-6 rounded-md bg-[rgba(255,255,255,0.2)] animate-pulse my-1'></div>
                <div className='w-8 h-3 rounded-md bg-[rgba(255,255,255,0.2)] animate-pulse my-1'></div>
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  )
}