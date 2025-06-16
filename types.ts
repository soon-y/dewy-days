export interface MainRow {
  id: number
  goal: number
  cup_index: number
  current_amount: number
}

export interface CupRow {
  id: number
  amount: number
}

export interface ProfileRow {
  id: number
  manual: boolean
  weight: number
  activity_mode: boolean
  duration: number
}

export interface TimelineRow {
  id: number
  cup_index: number
  amount: number
  date: Date
  goal: number
}

export interface RawTimelineRow {
  id: number
  cup_index: number
  amount: number
  date: string
  goal: number
}

export interface AlarmSettingRow {
  id: number
  on: boolean
  tab_index: number
  repeat_mon: boolean
  repeat_tue: boolean
  repeat_wed: boolean
  repeat_thu: boolean
  repeat_fri: boolean
  repeat_sat: boolean
  repeat_sun: boolean
  range_start: number
  range_end: number
  interval: number
}

export interface AlarmRow {
  id: number
  time: number
  alarm_mon: boolean
  alarm_tue: boolean
  alarm_wed: boolean
  alarm_thu: boolean
  alarm_fri: boolean
  alarm_sat: boolean
  alarm_sun: boolean
  on: boolean
}

export interface current {
  current: {
    interval: number
    is_day: number
    weather_code: number
    time: string
  }
  current_units: {
    interval: string
    is_day: string
    time: string
    weather_code: string
    elevation: number
    generationtime_ms: number
  }
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export interface Daily {
  daily: {
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    time: string[]
    weather_code: number[]
  }
  daily_unit: {
    apparent_temperature_max: string
    apparent_temperature_min: string
    time: string
    weather_code: string
  }
  elevation: number
  generationtime_ms: number
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export interface Hourly {
  hourly: {
    apparent_temperature: number[]
    is_day: number[]
    precipitation_probability: number[]
    time: string[]
    uv_index: number[]
    weather_code: number[]
  }
  hourly_units: {
    apparent_temperature: string
    is_day: string
    precipitation_probability: string
    time: string
    uv_index: string
    weather_code: string
  }
  elevation: number
  generationtime_ms: number
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export interface airQuality {
  hourly: {
    european_aqi_pm2_5: number[]
    european_aqi_pm10: number[]
    time: string[]
  }
  hourly_units: {
    european_aqi_pm2_5: string
    european_aqi_pm10: string
    time: string
  }
  elevation: number
  generationtime_ms: number
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export interface DailyForecast {
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  time: string[]
  weather_code: number[]
}

export interface HourlyForecast {
  apparent_temperature: number[]
  is_day: number[]
  precipitation_probability: number[]
  time: string[]
  uv_index: number[]
  weather_code: number[]
}

export interface UVForcast {
  european_aqi_pm2_5: number[]
  european_aqi_pm10: number[]
  time: string[]
}

export interface FilteredDaily {
  id: number
  days: number
  low: number
  high: number
  code: number
}

export interface Days {
  id: number
  days: number
}

export interface AmountPickerProps {
  unit: string
  min: number
  max: number
  initial: number
  step: number
  setNumber: React.Dispatch<React.SetStateAction<number>>
}