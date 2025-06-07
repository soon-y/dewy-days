'use client'

import { colors } from "@/theme"

interface Props {
  text: string
}

const StrokeHeader: React.FC<Props> = ({ text }) => {
  return (
    <>
      <span className={`text-[1.8rem] font-[family-name:var(--font-cherry)]`}
        style={{
          color: 'white',
          stroke: `${colors.day.stroke}`,
          strokeWidth: 10,
          WebkitTextStrokeWidth: 10,
          WebkitTextStrokeColor: `${colors.day.stroke}`,
          paintOrder: 'stroke fill',
        }}>
        {text}
      </span>
    </>
  )
}

export default StrokeHeader