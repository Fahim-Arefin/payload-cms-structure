import React from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { MultistageIntroBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: MultistageIntroBlockType
}

const StagePlanTitle = ({data}: Props) => {
  return (
    <div className={`container-padding bg-[${data?.backgroundColor}]`}>
      <h1 className="global-h1 lg:px-0 text-start w-[60%] xl:w-[50%] font-semibold text-[#434342] uppercase">
        <LocalizedHighlighted
          textEn={data?.text || ''}
          textBn={data?.textBN || ''}
          highlightEn={data?.highlightedText || ''}
          highlightBn={data?.highlightedTextBN || ''}
          highlightClassName="text-[#ED7125] font-medium lg:font-semibold"
        />
      </h1>
    </div>
  )
}

export default StagePlanTitle
