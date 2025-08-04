import React, { FC } from 'react'
import GlobalButton from '../shared/GlobalButton'

type CareerOpeningCardProps = {
  type: any
  title: string
  description: string
  btnText: string
  onApply?: (type: string, title: string) => void
  onViewDetails?: (title: string) => void
}

const CareerOpeningCard: FC<CareerOpeningCardProps> = ({
  type,
  title,
  description,
  btnText,
  onApply,
  onViewDetails,
}) => {
  return (
    <div className="rounded-[12px] bg-[#FCF4EB] px-5 py-4 flex flex-col gap-3 min-h-[170px]">
      <span className="text-[#CCCCCC] text-[14px] lg:text-[22px] font-bold">{type}</span>
      <span className="text-[#434342] text-[14px] lg:text-[18px] font-bold uppercase">{title}</span>
      <span className="text-[#434342] text-[14px] font-normal line-clamp-3">{description}</span>
      <div className='flex items-center gap-2 lg:gap-1 xl:gap-2'>

     
      <GlobalButton
      size='small'
        onClick={() => onApply?.(type, title)}
        className="bg-[#ED7125] text-white text-[16px] py-1.5 px-5 rounded-[5px] mt-auto w-max transition-colors hover:bg-[#d15d15]"
      >
        {btnText}
      </GlobalButton>
      <GlobalButton
        variant="outline"
        size='small'
        text="View Details"
        onClick={() => onViewDetails?.(title)}
      />
       </div>
      {/* <GlobalButton size="small" className="cursor-not-allowed " text={btnText} variant="primary" /> */}
    </div>
  )
}

export default CareerOpeningCard
