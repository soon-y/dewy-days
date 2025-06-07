import Image from "next/image"

export default function Cloud() {
  return (
    <Image src={'/weather/cloud.png'} alt="cloud" width='475' height='270'
      className="absolute w-full top-[46%]" style={{
        animationName: 'dungdung',
        animationDuration: '6s',
        animationIterationCount: 'infinite'
      }}
    />
  )
}