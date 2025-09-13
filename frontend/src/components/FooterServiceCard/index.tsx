import { BiSolidCube } from 'react-icons/bi'
import type { FooterServiceCardProps } from '../../types/FooterServiceCard'

const FooterServiceCard = ({ className, name, description }: FooterServiceCardProps) => {
  return (
    <div className={`flex items-start gap-3 pl-4 ${className}`}>
     <BiSolidCube className='text-[20px] mt-1'/>
     <div className='flex flex-col items-start justify-start gap-3'>
        <span className='font-semibold text-xl'>{name}</span>
        <p className='text-base text-gray-400'>{description}</p>
     </div>
    </div>
  )
}

export default FooterServiceCard
