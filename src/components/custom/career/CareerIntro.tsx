import React, { FC } from 'react'

type introDataProps = {
  title: string
  subTitle: string
  description: string
}

type CareerIntroProps = {
  data: introDataProps
}

const CareerIntro: FC<CareerIntroProps> = ({ data }) => {
  return (
    <div className="container-padding bg-white">
      <div className="flex flex-col gap-4 lg:gap-10 xl:gap-16">
        <h1 className="global-h1 font-normal md:font-semibold text-[#ED7125] md:text-[#434343]">
          {data?.title} <span className="text-[#434343] md:text-[#ED7125]">{data?.subTitle}</span>
        </h1>
        <p className="text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] text-[#3A3A3A]">{data?.description}</p>
      </div>
    </div>
  )
}

export default CareerIntro
