'use client'

interface Props {
  title: string
  clicked: boolean
}

const TabGroup: React.FC<Props> = ({ title, clicked }) => {
  return (
    <div
      className={`font-bold cursor-pointer flex flex-col items-center w-full h-auto p-4 rounded-t-2xl ${clicked ? 'bg-[#5bcefc]' : 'bg-[#8fdfff]'}`}>
      <span>{title}</span>
    </div>
  )
}

export default TabGroup