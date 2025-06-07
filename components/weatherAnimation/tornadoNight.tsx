import Image from "next/image"

export default function Tornado() {
  return (
    <>
      <Image src={'/weather/tornadoNight0.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleT',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />
      <Image src={'/weather/tornadoNight1.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleB',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />
      <Image src={'/weather/tornadoNight2.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleT',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />
      <Image src={'/weather/tornadoNight3.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleB',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />

    </>
  )
}