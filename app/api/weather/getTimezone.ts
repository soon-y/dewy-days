const API = process.env.NEXT_PUBLIC_GEOAPLIFY_API

let _timezone: string = ''
let _suburb: string = ''

export const fetchTimezone = async (
  { lat, lon }: { lat: number; lon: number }
): Promise<void> => {
  try {
    const res = await fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${API}`)
    const result = await res.json()
    const properties = result.features[0].properties

    _timezone = properties.timezone?.name.replace("/", "%2F") || ''
    _suburb = properties.suburb || properties.city || ''
  } catch (error) {
    console.error(error)
    _timezone = ''
    _suburb = ''
  }
}

export const Location = {
  get timezone(): string {
    return _timezone
  },
  get suburb(): string {
    return _suburb
  }
}