import React from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { MultistageIntroBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: MultistageIntroBlockType
}

const StagePlanTitle = ({ data }: Props) => {
  return (
    <div className={`container-padding bg-[${data?.backgroundColor}]`}>
      <h1 className="global-h1 lg:px-0 text-start font-semibold text-[#434342] uppercase">
        <LocalizedHighlighted
          textEn={data?.text || ''}
          textBn={data?.textBN || ''}
          highlightEn={data?.highlightedText || ''}
          highlightBn={data?.highlightedTextBN || ''}
        />
      </h1>
      <h1 className="global-h1 lg:px-0 text-start font-semibold text-[#434342] uppercase">
        <LocalizedHighlighted
          textEn={data?.subtitle || ''}
          textBn={data?.subtitleBN || ''}
          highlightEn={data?.highlightedSubtitle || ''}
          highlightBn={data?.highlightedSubtitleBN || ''}
        />
      </h1>
    </div>
  )
}

export default StagePlanTitle
