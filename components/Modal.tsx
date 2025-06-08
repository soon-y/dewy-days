import { ReactNode } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
}


const Modal: React.FC<Props> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null
  
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50" onClick={onClose}>
      <div className="text-center font-[family-name:var(--font-nunito)] bg-[#06608e]/90 rounded-xl shadow-lg m-6 p-4 max-w-md w-full" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
