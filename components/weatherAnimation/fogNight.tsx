import Image from "next/image"

export default function FogNight() {
  return (
    <div className="relative w-full h-full top-[50%]" style={{
      animationName: 'dungdung',
      animationDuration: '6s',
      animationIterationCount: 'infinite'
    }}>
      <Image src={'/weather/smogNight.png'} alt="smog" width='675' height='131'
        className="absolute left-[50%] w-[90%] top-[60%]" style={{
          animationName: 'wiggleT',
          animationDuration: '6s',
          animationIterationCount: 'infinite'
        }}
      />
      <Image src={'/weather/smogNight.png'} alt="smog" width='675' height='131'
        className="absolute left-[50%] w-[90%] top-[80%]" style={{
          animationName: 'wiggleB',
          animationDuration: '6s',
          animationIterationCount: 'infinite'
        }}
      />
    </div>
  )
}