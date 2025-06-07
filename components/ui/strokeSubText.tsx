'use client'

import { colors } from "@/theme"

interface Props {
  text: string
  className?: string
}

const StrokeSubText: React.FC<Props> = ({ text, className = '' }) => {
  return (
    <>
      <span className={`text-[1.4rem] font-[family-name:var(--font-cherry)] ${className}`}
        style={{
          color: 'white',
          stroke: `${colors.bg.dark}`,
          strokeWidth: '0.3rem',
          WebkitTextStrokeWidth: '0.3rem',
          WebkitTextStrokeColor: `${colors.bg.dark}`,
          paintOrder: 'stroke fill',
        }}>
        {text}
      </span>
    </>
  )
}

export default StrokeSubText