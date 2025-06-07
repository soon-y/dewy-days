'use client'

interface Props {
  isDay: number
  className?: string
  text: string
  strokeDay: string
  strokeNight: string
}

const StrokeText: React.FC<Props> = ({ isDay, text, strokeDay, strokeNight, className = '' }) => {
  return (
    <>
      <p className={`font-bold font-[family-name:var(--font-nunito)] ${className}`}
        style={{
          color: 'white',
          stroke: isDay ? `${strokeDay}` : `${strokeNight}`,
          strokeWidth: 6,
          WebkitTextStrokeWidth: 6,
          WebkitTextStrokeColor: isDay ? `${strokeDay}` : `${strokeNight}`,
          paintOrder: 'stroke fill',
        }}>
        {text}
      </p>
    </>
  )
}

export default StrokeText