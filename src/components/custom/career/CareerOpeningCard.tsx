import React, { FC } from 'react'

type CareerOpeningCardProps = {
  type: any
  title: string
  description: string
  btnText: string
}

const CareerOpeningCard: FC<CareerOpeningCardProps> = ({ type, title, description, btnText }) => {
  return (
    <div className="rounded-[12px] bg-[#FCF4EB] px-5 py-4 flex flex-col gap-3 min-h-[170px]">
      <span className="text-[#CCCCCC] text-[14px] lg:text-[22px] font-bold">{type}</span>
      <span className="text-[#434342] text-[14px] lg:text-[18px] font-bold uppercase">{title}</span>
      <span className="text-[#434342] text-[16px] font-normal line-clamp-3">{description}</span>
      <button className="bg-[#ED7125] text-white text-[16px] py-1.5 px-5 rounded-[5px] mt-auto w-max transition-colors hover:bg-[#d15d15]">
        {btnText}
      </button>
    </div>
  )
}

export default CareerOpeningCard
