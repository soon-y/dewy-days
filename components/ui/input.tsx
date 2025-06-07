import { useState } from "react"

interface Props {
  name: string
  initial: number
  setNumber: React.Dispatch<React.SetStateAction<number>>
}

const Input: React.FC<Props> = ({ name, initial, setNumber }) => {
  const [value, setValue] = useState<number>(initial || 0)
  return (
    <div className="w-full flex justify-center items-center m-5">
      <input
        type="number"
        name={name}
        className="text-gray-800
        appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none 
        w-26 text-center font-semibold bg-white rounded-lg p-2 font-[family-name:var(--font-nunito)] border-1 border-gray-300 ml-5 mr-3"
        value={value}
        onChange={(e) => {
          const num = Number(e.target.value)
          setValue(num)
          setNumber(num)
        }} />
    </div>
  )
}

export default Input