import React from 'react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { MultistageIntroBlockType } from '@/types/payloadCustomTypes'
import LocalizedRichText from '../shared/LocalizedRichText'

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
      {(data?.subtitle || data?.subtitleBN) && (
        <h1 className="global-h1 lg:px-0 text-start font-semibold text-[#434342] uppercase">
          <LocalizedHighlighted
            textEn={data?.subtitle || ''}
            textBn={data?.subtitleBN || ''}
            highlightEn={data?.highlightedSubtitle || ''}
            highlightBn={data?.highlightedSubtitleBN || ''}
          />
        </h1>
      )}
      {(data?.description || data?.descriptionBN) && (
        <div className={`global-span text-[#3A3A3A] font-[350] mt-2 md:mt-4 xl:mt-6 2xl:mt-8`}>
          <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
        </div>
      )}
    </div>
  )
}

export default StagePlanTitle
