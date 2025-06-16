import { Daily, Hourly, airQuality, current } from '@/types'

export async function getWeatherData(): Promise<{
  airQuality: airQuality | null
  hourly: Hourly | null
  daily: Daily | null
  current: current | null
}> {
  let position: GeolocationPosition

  try {
    position = await new Promise<GeolocationPosition>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resolve,
        () => reject(new Error('Geolocation permission denied or unavailable'))
      )
    })
  } catch (error) {
    console.warn('Geolocation not available:', error)
    return {
      airQuality: null,
      hourly: null,
      daily: null,
      current: null,
    }
  }

  const { latitude, longitude } = position.coords
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace('/', '%2F')

  const baseWeatherUrl = 'https://api.open-meteo.com/v1/forecast'
  const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=european_aqi_pm2_5,european_aqi_pm10&timezone=${timezone}`
  const hourlyUrl = `${baseWeatherUrl}?latitude=${latitude}&longitude=${longitude}&hourly=apparent_temperature,precipitation_probability,weather_code,uv_index,is_day&forecast_days=3&timezone=${timezone}`
  const dailyUrl = `${baseWeatherUrl}?latitude=${latitude}&longitude=${longitude}&daily=weather_code,apparent_temperature_max,apparent_temperature_min&timezone=${timezone}`
  const currentUrl = `${baseWeatherUrl}?latitude=${latitude}&longitude=${longitude}&current=is_day,weather_code&timezone=${timezone}`

  const [airQualityRes, hourlyRes, dailyRes, currentRes] = await Promise.all([
    fetch(airQualityUrl),
    fetch(hourlyUrl),
    fetch(dailyUrl),
    fetch(currentUrl),
  ])

  if (!airQualityRes.ok || !hourlyRes.ok || !dailyRes.ok || !currentRes.ok) {
    throw new Error('Failed to fetch one or more weather endpoints')
  }

  const [airQuality, hourly, daily, current] = await Promise.all([
    airQualityRes.json(),
    hourlyRes.json(),
    dailyRes.json(),
    currentRes.json(),
  ])

  return {
    airQuality,
    hourly,
    daily,
    current,
  }
}
