import Image from "next/image"
import { useState, useEffect } from "react"

interface Props {
  opc: boolean
}

const Moon: React.FC<Props> = ({ opc }) => {
  const [phase, setPhase] = useState<number>(5)
  const today = new Date()
  let year = today.getFullYear()
  let month = today.getMonth()+1
  const day = today.getDate()

  useEffect(() => {
    setPhase(moonphase)
  }, [])

  const moonphase = (): number => {
    let c: number = 0
    let e: number = 0
    let jd: number = 0
    let b: number = 0
    if (month < 3) {
      year--
      month += 12
    }
    ++month
    c = 365.25 * year
    e = 30.6 * month
    jd = c + e + day - 694039.09;	//total days elapsed
    jd /= 29.5305882	//divide by the moon cycle
    b = Math.floor(jd)
    jd -= b
    b = Math.round(jd * 8);	//scale fraction from 0-8 and round

    if (b >= 8) { b = 0; }
    return b
  }

  return (
    <>
      {phase === 4 &&
        <>
          <Image src="/weather/moonlight.png" alt="moonlight" width={646} height={646}
            className="absolute w-[80%] animate-[ping_2s_linear_infinite] left-[10%] top-[10%]" />
          <Image src="/weather/moonFace.png" alt="moon" width={425} height={429}
            className="absolute w-[80%] left-[10%] top-[10%]" />
        </>
      }

      {(phase === 0 || phase === 8) &&
        <>
          {opc ?
            <Image src="/weather/moon0opc.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" /> :
            <Image src="/weather/moon0.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" />
          }
        </>
      }

      {(phase === 1) &&
        <>
          {opc ?
            <Image src="/weather/moon1opc.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" /> :
            <Image src="/weather/moon1.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" />
          }
        </>
      }

      {(phase === 2) &&
        <>
          {opc ?
            <Image src="/weather/moon2opc.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" /> :
            <Image src="/weather/moon2.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" />
          }
        </>
      }

      {(phase === 3) &&
        <>
          {opc ?
            <Image src="/weather/moon3opc.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" /> :
            <Image src="/weather/moon3.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" />
          }
        </>
      }

      {(phase === 5) &&
        <>
          {opc ?
            <Image src="/weather/moon5opc.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" /> :
            <Image src="/weather/moon5.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" />
          }
        </>
      }

      {(phase === 6) &&
        <>
          {opc ?
            <Image src="/weather/moon6opc.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" /> :
            <Image src="/weather/moon6.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" />
          }
        </>
      }

      {(phase === 7) &&
        <>
          {opc ?
            <Image src="/weather/moon7opc.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" /> :
            <Image src="/weather/moon7.png" alt="moon" width={425} height={429}
              className="absolute w-[80%] left-[10%] top-[10%]" />
          }
        </>
      }
    </>
  )
}
export default Moon