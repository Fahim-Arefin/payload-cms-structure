import React, { FC } from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type introDataProps = {
  title: string
  titleBN: string
  subTitle: string
  subTitleBN?: string
  description: string
  descriptionBN?: string
}

type CareerIntroProps = {
  data: introDataProps
}

const CareerIntro: FC<CareerIntroProps> = ({ data }) => {
  const fullTitle = `${data?.title} ${data?.subTitle}`
  const fullBNTitle = `${data?.titleBN} ${data?.subTitleBN}`
  return (
    <div className="container-padding bg-white">
      <div className="flex flex-col gap-4 lg:gap-10 xl:gap-16">
        <h1 className="global-h1 font-normal md:font-semibold text-[#ED7125] md:text-[#434343]">
          <LocalizedHighlighted
            textEn={fullTitle}
            highlightEn={data?.subTitle}
            textBn={fullBNTitle}
            highlightBn={data?.subTitleBN}
            highlightClassName="text-[#ED7125]"
          />
        </h1>
        <p className="text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] text-[#3A3A3A]">
          <LocalizedText en={data?.description} bn={data?.descriptionBN} />
        </p>
      </div>
    </div>
  )
}

export default CareerIntro
