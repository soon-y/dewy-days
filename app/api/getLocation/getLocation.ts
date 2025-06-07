let _latitude: number | null = null
let _longitude: number | null = null

const getLocation = (): Promise<void> => {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      _latitude = null
      _longitude = null
      resolve()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        _latitude = position.coords.latitude
        _longitude = position.coords.longitude
        resolve()
      },
      () => {
        _latitude = null
        _longitude = null
        resolve()
      }
    )
  })
}

export const Coordinates = {
  get latitude(): number | null {
    return _latitude
  },
  get longitude(): number | null {
    return _longitude
  }
}

export { getLocation }
