import Image from "next/image"

export default function Lightening() {
  return (
    <Image src={'/weather/lightning.png'} alt="lightning" width='124' height='165'
      className="absolute w-[20%] -translate-x-[50%]" style={{
        animationName: 'drop',
        animationDuration: '3s',
        animationIterationCount: 'infinite'
      }}
    />
  )
}