import React, { FC } from 'react'
import GlobalButton from '../shared/GlobalButton'
import LocalizedString from '../shared/LocalizedString'
import LocalizedText from '../shared/LocalizedText'

type CareerOpeningCardProps = {
  type: any
  typeBN: any
  title: string
  titleBN: string
  description: string
  descriptionBN: string
  btnText: string
  btnTextBN?: string
  detailsBtnText?: string
  detailsBtnTextBN?: string
  onApply?: (type: string, title: string) => void
  onViewDetails?: () => void  // ✅ no param needed
}

const CareerOpeningCard: FC<CareerOpeningCardProps> = ({
  type,
  typeBN,
  title,
  titleBN,
  description,
  descriptionBN,
  btnText,
  btnTextBN,
  detailsBtnText,
  detailsBtnTextBN,
  onApply,
  onViewDetails,
}) => {
  return (
    <div className="rounded-[12px] bg-[#FCF4EB] px-5 py-4 flex flex-col gap-3 min-h-[170px] h-full">
      <span className="text-[#CCCCCC] text-[14px] lg:text-[22px] font-bold">
        <LocalizedText en={type} bn={typeBN} />
      </span>

      <span className="text-[#434342] text-[14px] lg:text-[18px] font-bold uppercase">
        <LocalizedText en={title} bn={titleBN} />
      </span>

      <span className="text-[#434342] text-[14px] font-normal line-clamp-3">
        <LocalizedText en={description} bn={descriptionBN} />
      </span>

      <div className="flex items-center gap-2 lg:gap-1 xl:gap-2 mt-auto">
        <GlobalButton
          size="small"
          onClick={() => onApply?.(type, title)}
          className="bg-[#ED7125] text-white text-[16px] py-1.5 px-5 rounded-[5px] w-max transition-colors hover:bg-[#d15d15]"
        >
          <LocalizedString en={btnText} bn={btnTextBN} />
        </GlobalButton>

        <GlobalButton variant="outline" size="small" onClick={onViewDetails}>
          <LocalizedString en={detailsBtnText} bn={detailsBtnTextBN} />
        </GlobalButton>
      </div>
    </div>
  )
}

export default CareerOpeningCard
