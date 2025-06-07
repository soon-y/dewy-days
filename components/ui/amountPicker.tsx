'use client'

import { useState, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useSwipeable } from 'react-swipeable'
import { AmountPickerProps } from '@/types'

const AmountPicker: React.FC<AmountPickerProps> = ({ unit, initial, step, min, max, setNumber }) => {
  const [hasMounted, setHasMounted] = useState<boolean>(false)
  const [windowWidth, setWindowWidth] = useState<number>(0)
  const [numArray, setNumArray] = useState<number[]>([])
  const [isGrabbing, setIsGrabbing] = useState<boolean>(false)
  const amountGroup = useRef<HTMLDivElement>(null)
  const elementRef = useRef<HTMLDivElement>(null)
  const total: number = Math.floor(((max - min) / step) + 1)
  const isDesktop = useMediaQuery({ minWidth: 768 })

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (amountGroup.current) {
        setIsGrabbing(true)
        setTimeout(() => setIsGrabbing(false), 300)
        amountGroup.current.scrollBy({ left: isDesktop ? amountGroup.current.clientWidth / 11 : amountGroup.current.clientWidth / 5, behavior: "smooth" })
      }
    },
    onSwipedRight: () => {
      if (amountGroup.current) {
        setIsGrabbing(true)
        setTimeout(() => setIsGrabbing(false), 300)
        amountGroup.current.scrollBy({ left: isDesktop ? -amountGroup.current.clientWidth / 11 : -amountGroup.current.clientWidth / 5, behavior: "smooth" })
      }
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
  })

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (elementRef.current) {
        elementRef.current.style.width = `${window.innerWidth}px`
      }
    }

    handleResize()
    setHasMounted(true)
    const array: number[] = []
    let num: number = min
    const last = max - step

    while (num < last + step + 1) {
      array.push(num)
      num = num + step
    }
    setNumArray(array)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const colWidth = isDesktop ? windowWidth / 100 * 11.11 : windowWidth / 100 * 20
    if (amountGroup.current) amountGroup.current.scrollLeft = initial / step * colWidth
  }, [windowWidth, initial])

  function getFianlNum() {
    const colWidth = isDesktop ? windowWidth / 100 * 11.11 : windowWidth / 100 * 20
    if (amountGroup.current) {
      const finalValue = Math.round(((amountGroup.current.scrollLeft) / colWidth) * step)
      setNumber(finalValue)
    }
  }

  if (!hasMounted) return null
  return (
    <div className='w-full m-auto pb-6 font-[family-name:var(--font-nunito)]'>
      <div className='translate-y-12 relative h-12 w-full sm:w-[30rem] m-auto bg-[linear-gradient(to_right,rgba(255,255,255,0),rgba(255,255,255,0.2),rgba(255,255,255,0))]'>
        <div className='relative h-full rounded-xl bg-[#0898da] m-auto' style={{
          width: isDesktop ? '11.11vw' : '20vw'
        }}></div>
        <div className="relative w-0 h-0 m-auto border-l-[0.8rem] border-l-transparent border-r-[0.8rem] border-r-transparent border-t-[1rem] border-t-[#0898da]"></div>
      </div>

      <div {...handlers} ref={amountGroup} onScroll={getFianlNum}
        className='amountGroup relative w-screen h-12 bg-transparent overflow-x-auto overflow-y-hidden scroll-snap-stop-always grid' style={{
          gridTemplateColumns: isDesktop ? `repeat(${total}, 11.11vw)` : `repeat(${total}, 20vw)`,
          paddingLeft: isDesktop ? `calc(50% - 5.55vw)` : `calc(50% - 10vw)`,
          paddingRight: isDesktop ? `calc(50% - 5.55vw)` : `calc(50% - 10vw)`,
          scrollSnapType: 'x mandatory', cursor: isGrabbing ? "grabbing" : "grab",
        }}
      >
        {numArray.map((el, index) => (
          <p key={index} className='relative m-auto text-center snap-center font-bold'>{el}{unit}</p>
        ))}
      </div>
    </div>
  )
}

export default AmountPicker