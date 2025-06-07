import { useState } from "react"
import clsx from 'clsx'

interface Props {
  name: string
  unit: string
  min: number
  initial: number
  step: number
  disable: boolean
  setNumber: React.Dispatch<React.SetStateAction<number>>
}

const NumInput: React.FC<Props> = ({ name, unit, initial, step, min = 0, setNumber, disable = false }) => {
  const [value, setValue] = useState<number>(initial || 0)
  const btnStyle = clsx(
    'text-xl px-2 rounded-full border-0 text-gray-500 items-center flex duration-400 ease-out',
    {
      'bg-gray-200 border-gray-300 text-gray-500 cursor-auto opacity-50':
        disable,
      'bg-gray-200 border-gray-300 hover:bg-[#1a9ee1] hover:cursor-pointer hover:text-white':
        !disable,
    }
  )
  const increment = () => {
    setValue(Math.round(value + step))
    setNumber(Math.round(value + step))
  }

  const decrement = () => {
    const newValue = value - step > min ? value - step : value
    setValue(Math.round(newValue))
    setNumber(Math.round(newValue))
  }

  return (
    <div className="w-full flex justify-center items-center m-5">
      <button onClick={decrement} disabled={value <= min || disable} className={btnStyle}>
        <span className="p-1">&minus;</span>
      </button>
      <input
        type="number"
        name={name}
        className="text-gray-800
        appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
        w-16 text-center font-semibold bg-white rounded-lg p-2 font-[family-name:var(--font-nunito)] border-1 border-gray-300 ml-5 mr-3
        disabled:opacity-50"
        value={value}
        disabled={disable}
        onChange={(e) => {
          const num = Number(e.target.value)
          setValue(num)
          setNumber(num)
        }} />
      <span className="w-8 text-gray-600 mr-5 font-[family-name:var(--font-nunito)]">{unit}</span>
      <button onClick={increment} disabled={disable} className={btnStyle}>
        <span className="p-1">&#43;</span>
      </button>
    </div>
  )
}

export default NumInput