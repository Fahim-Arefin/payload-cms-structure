import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import LocalizedHighlighted from '../../shared/LocalizedHighlighted'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  data: CompanyIntroBlockType['sectionHeading']
  align: 'left' | 'right' | 'middle'
}

// Light version
// 2 heading
// No CTA
// LefT Right Middle by props
function SectionHeading01({ data, align }: Props) {
  const hasDesc = !!data?.description && !!data?.description?.root?.direction // or lexicalHasRealText(block.description?.root)

  return (
    <div
      className={`flex flex-col justify-center ${align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center'}
      space-y-1 lg:space-y-2 xl:space-y-3 2xl:space-y-4
      `}
    >
      {data?.tag && (
        <div className="font-grift global-p5 font-semibold text-primary-1">{data?.tag}</div>
      )}
      <div>
        {data?.heading1 && (
          <div
            className={`font-agency global-h3 global-h2 text-secondary-1 
          ${align === 'left' ? 'text-start' : align === 'right' ? 'text-end' : 'text-center'}`}
          >
            <LocalizedHighlighted
              textBn={data?.heading1}
              textEn={data?.heading1}
              highlightEn={data?.heading1Highlighted}
              highlightBn={data?.heading1Highlighted}
              highlightClassName={`${data?.heading1HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'} `}
            />
          </div>
        )}
        {data?.heading2 && (
          <div
            className={`font-agency global-h3 global-h2 text-secondary-1 
          ${align === 'left' ? 'text-start' : align === 'right' ? 'text-end' : 'text-center'}`}
          >
            <LocalizedHighlighted
              textBn={data?.heading2}
              textEn={data?.heading2}
              highlightEn={data?.heading2Highlighted}
              highlightBn={data?.heading2Highlighted}
              highlightClassName={`${data?.heading2HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'} `}
            />
          </div>
        )}
      </div>

      {hasDesc && (
        <div
          className={`font-grift global-p4 text-secondary-2 
          ${align === 'left' ? 'text-start' : align === 'right' ? 'text-end' : 'text-center'}`}
        >
          <LocalizedRichText en={data.description} bn={data.description} />
        </div>
      )}
    </div>
  )
}

export default SectionHeading01
