import { ProductIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import LocalizedText from '../../shared/LocalizedText'
import LocalizedHighlighted from '../../shared/LocalizedHighlighted'
import CtaButtons from '../buttons/CtaButtons'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  block: ProductIntroBlockType
}

function IntroSection({ block }: Props) {
  return (
    <div className="space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
        {/* left */}
        <div>
          {/* tag */}
          {block?.tag && (
            <div
              className="font-manrope text-cyan text-xs xl:text-[14px] leading-[157.143%] tracking-[1.4px]
              px-2 py-1 bg-white-1 w-fit uppercase
              mb-2 lg:mb-3 xl:mb-4"
            >
              <LocalizedText en={block?.tag} bn={block?.tag} />
            </div>
          )}

          {/* heading 1 */}
          {block?.heading1 && (
            <div className="font-proxima font-bold global-h2 text-dark-1 leading-[112.5%] tracking-[-1.44px]">
              <LocalizedHighlighted
                textBn={block?.heading1}
                textEn={block?.heading1}
                highlightEn={block?.heading1Highlighted}
                highlightBn={block?.heading1Highlighted}
                highlightClassName="text-white-3"
              />
            </div>
          )}

          {/* heading 2 */}
          {block?.heading2 && (
            <div className="font-proxima font-bold global-h2 text-dark-1 leading-[112.5%] tracking-[-1.44px]">
              <LocalizedHighlighted
                textBn={block?.heading2}
                textEn={block?.heading2}
                highlightEn={block?.heading2Highlighted}
                highlightBn={block?.heading2Highlighted}
                highlightClassName="text-white-3"
              />
            </div>
          )}
        </div>
        {/* right */}
        <div>
          <CtaButtons item={block?.ctaButtons} />
        </div>
      </div>
      <div>
        {/* desc */}
        {block?.description && block?.description?.root?.direction && (
          <div className="font-manrope text-dark-2 global-p2 leading-[166.667%] tracking-[5%] text-justify">
            <LocalizedRichText en={block?.description} bn={block?.description} />
          </div>
        )}
      </div>
    </div>
  )
}

export default IntroSection
