import Image from "next/image"

export default function Sun() {
  return (
    <>
      <Image src="/weather/sunMane.png" alt="sun" width='445' height='443'
        className="absolute h-full m-auto animate-[spin_60s_linear_infinite]"
      />
      <Image src="/weather/sunFace.png" alt="sun" width='425' height='429'
        className=" absolute w-[64%] left-[18%] top-[18%]"
      />
    </>
  )
}