
'use client'

import { useState } from "react"
import { animated, useSpring, useTrail } from '@react-spring/web'
import Image from "next/image"
import { ChevronUp } from 'lucide-react'
import Bubble from "@/components/ui/bubble"

export default function Navigation() {
  const [checked, setChecked] = useState<boolean>(true)
  const [angle, setAngle] = useState<number>(0)
  const links: string[] = ['profile', 'timeline', 'weather', 'alarm']
  const [trail, api] = useTrail(links.length, () => ({}))
  const rotate = useSpring<{ transform: string }>({ transform: `rotate(${angle}deg)` })

  const clicked = () => {
    setChecked(state => !state)
    setAngle(a => a + 180);

    if (!checked) {
      api.start({
        from: { opacity: 0, scale: 0 },
        to: { opacity: 1, scale: 1 },
        config: {
          tension: 400,
          mass: 2,
        }
      })
    } else {
      api.start({
        from: { opacity: 1, scale: 1 },
        to: { opacity: 0, scale: 2 },
        config: {
          tension: 300,
          mass: 1,
        }
      })
    }
  }

  return (
    <div className="fixed right-6">
      <div className='bubble navPos' onClick={clicked} style={{ zIndex: 1 }}>
        <Bubble link="/">
          <animated.div style={rotate}>
            <ChevronUp className="w-7 h-7" />
          </animated.div>
        </Bubble>
      </div>

      {trail.map(({ ...otherProps }, i) => (
        <animated.div key={links[i]} style={{ ...otherProps }}>
          <Bubble link={"/" + links[i]} className="mt-3">
            <Image alt={links[i]} width={30} height={30} src={'/menu/' + links[i] + '.png'} />
          </Bubble>
        </animated.div>
      ))}
    </div>
  )
}
