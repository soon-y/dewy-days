
'use client'

import Cloud from "./weatherAnimation/cloud"
import CloudNight from "./weatherAnimation/cloudNight"
import Moon from "./weatherAnimation/moon"
import Sun from "./weatherAnimation/sun"
import Fog from "./weatherAnimation/fog"
import FogNight from "./weatherAnimation/fogNight"
import Rain from "./weatherAnimation/rain"
import RainNight from "./weatherAnimation/rainNight"
import Snow from "./weatherAnimation/snow"
import SnowNight from "./weatherAnimation/snowNight"
import Lightening from "./weatherAnimation/lightening"
import Tornado from "./weatherAnimation/tornado"
import TornadoNight from "./weatherAnimation/tornadoNight"
import Image from "next/image"

interface Props {
  code: number
  isDay: number
  opc: boolean
}

const WeatherIcon: React.FC<Props> = ({ code, isDay, opc }) => {
  return (
    <div className="w-full, h-full relative">
      {(code === 0 || code === 1) && isDay === 1 && <Sun />}
      {(code === 0 || code === 1) && isDay === 0 && <Moon opc={opc} />}
      {code === 2 && isDay === 1 &&
        <>
          <div className="absolute w-[76%] h-[76%]"><Sun /></div>
          <div className="absolute w-[80%] h-[80%] left-[20%] top-[30%]"><Cloud /></div>
        </>}
      {code === 2 && isDay === 0 &&
        <>
          <div className="absolute w-[64%] h-[64%] top-[6%] left-[6%]"><Moon opc={opc} /></div>
          <div className="absolute w-[80%] h-[80%] left-[20%] top-[30%]"><CloudNight /></div>
        </>}
      {code === 3 && isDay === 1 && <Cloud />}
      {code === 3 && isDay === 0 && <CloudNight />}
      {(code === 45 || code === 48) && isDay === 1 &&
        <>
          <div className="absolute w-full h-full"><Fog /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 45 || code === 48) && isDay === 0 &&
        <>
          <div className="absolute w-full h-full"><FogNight /></div>
          <div className="absolute w-full h-full -top-[15%]"><CloudNight /></div>
        </>}
      {(code === 51 || code === 53 || code === 55) && isDay === 1 &&
        <>
          <div className="absolute w-[60%] h-full left-[20%] -top-[10%]"><Rain /></div>
          <div className="absolute w-[60%] h-full left-[50%]"><Rain /></div>
          <div className="absolute w-[60%] h-full left-[80%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 51 || code === 53 || code === 55) && isDay === 0 &&
        <>
          <div className="absolute w-[60%] h-full left-[20%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-[60%] h-full left-[50%]"><RainNight /></div>
          <div className="absolute w-[60%] h-full left-[80%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-full h-full -top-[15%]"><CloudNight /></div>
        </>}
      {(code === 56 || code === 57) && isDay === 1 &&
        <>
          <div className="absolute w-[60%] h-full left-[20%] -top-[10%]"><Rain /></div>
          <div className="absolute w-[70%] h-full left-[50%]"><Snow /></div>
          <div className="absolute w-[60%] h-full left-[80%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 56 || code === 57) && isDay === 0 &&
        <>
          <div className="absolute w-[60%] h-full left-[20%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-[70%] h-full left-[50%]"><SnowNight /></div>
          <div className="absolute w-[60%] h-full left-[80%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-full h-full -top-[15%]"><CloudNight /></div>
        </>}
      {(code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) && isDay === 1 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full left-[50%]"><Rain /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 61 || code === 63 || code === 65 || code === 80 || code === 81 || code === 82) && isDay === 0 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-full h-full left-[50%]"><RainNight /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-full h-full -top-[15%]"><CloudNight /></div>
        </>}
      {(code === 66 || code === 67) && isDay === 1 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full left-[50%]"><Snow /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 66 || code === 67) && isDay === 0 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full left-[50%]"><Snow /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) && isDay === 1 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><Snow /></div>
          <div className="absolute w-full h-full left-[50%]"><Snow /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><Snow /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 71 || code === 73 || code === 75 || code === 77 || code === 85 || code === 86) && isDay === 0 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><SnowNight /></div>
          <div className="absolute w-full h-full left-[50%]"><SnowNight /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><SnowNight /></div>
          <div className="absolute w-full h-full -top-[15%]"><CloudNight /></div>
        </>}
      {(code === 95 || code === 96 || code === 99) && isDay === 1 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full left-[50%] -top-[5%]"><Lightening /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><Rain /></div>
          <div className="absolute w-full h-full -top-[15%]"><Cloud /></div>
        </>}
      {(code === 95 || code === 96 || code === 99) && isDay === 0 &&
        <>
          <div className="absolute w-full h-full left-[20%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-full h-full left-[50%] -top-[5%]"><Lightening /></div>
          <div className="absolute w-full h-full left-[80%] -top-[10%]"><RainNight /></div>
          <div className="absolute w-full h-full -top-[15%]"><CloudNight /></div>
        </>}
      {(code === 100) && isDay === 1 && <Tornado />}
      {(code === 100) && isDay === 0 && <TornadoNight />}
      {(code === 999) && isDay === 1 &&
        <Image alt="unknown" width={800} height={800} src={'/weather/location_unknown.png'}
          className="animate-[pulse_4s_ease-in-out_infinite]"
        />}
    </div>
  )
}

export default WeatherIcon