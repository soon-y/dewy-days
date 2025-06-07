import Image from "next/image"

export default function Tornado() {
  return (
    <>
      <Image src={'/weather/tornado0.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleT',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />
      <Image src={'/weather/tornado1.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleB',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />
      <Image src={'/weather/tornado2.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleT',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />
      <Image src={'/weather/tornado3.png'} alt="tornado" width='665' height='827'
        className="absolute left-[50%] w-[80%]" style={{
          animationName: 'wiggleB',
          animationDuration: '3s',
          animationIterationCount: 'infinite'
        }}
      />

    </>
  )
}