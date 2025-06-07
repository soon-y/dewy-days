import Image from "next/image"

export default function Snow() {
  return (
    <Image src={'/weather/snow.png'} alt="snow" width='672' height='689'
      className="absolute w-[14%] origin-[0%_50%] -translate-x-[50%]" style={{
        animationName: 'dropNrotate',
        animationDuration: '3s',
        animationIterationCount: 'infinite',
      }}
    />
  )
}