import React, { FC } from 'react'

type CareerOpeningCardProps = {
  type: any
  title: string
  description: string
  btnText: string
}

const CareerOpeningCard: FC<CareerOpeningCardProps> = ({ type, title, description, btnText }) => {
  return (
    <div className="rounded-[12px] bg-[#F9F4EE] px-5 py-4 flex flex-col gap-3 shadow-sm min-h-[170px]">
      <span className="text-[#B0B0B0] text-[15px] font-semibold">{type}</span>
      <span className="text-[#343434] text-[18px] font-bold uppercase">{title}</span>
      <span className="text-[#343434] text-[14px] font-normal leading-tight line-clamp-2">
        {description}
      </span>
      <button className="bg-[#ED7125] text-white text-[15px] font-semibold py-1.5 px-5 rounded-[5px] mt-auto w-max transition-colors hover:bg-[#d15d15]">
        {btnText}
      </button>
    </div>
  )
}

export default CareerOpeningCard
