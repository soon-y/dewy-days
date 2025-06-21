import Image from 'next/image'

export default function DewyLoading({ msg, isDay }: { msg: string, isDay: number }) {

  return (
    <div className='backdrop-blur-sm fixed w-full h-full flex flex-col left-0 top-0 items-center justify-center'>
      <Image className='w-40' alt='loading' src={'/dewy/dewy_smile.png'} width={671} height={653} priority />
      <p className={`animate-pulse text-xl mt-4 font-[family-name:var(--font-nunito)] ${isDay === 1 ? 'text-[#05aee6]' : 'text-white'}`}>{msg}</p>
    </div>
  )
}