import Image from "next/image"

export default function Rain() {
  return (
    <Image src={'/weather/rain.png'} alt="raindrop" width='345' height='454'
      className="absolute w-[13%] -translate-x-[50%]" style={{
        animationName: 'drop',
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    />
  )
}