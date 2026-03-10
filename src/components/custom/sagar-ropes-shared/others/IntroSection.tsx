import { MissionVisionBlockType, ProductIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import LocalizedText from '../../shared/LocalizedText'
import LocalizedHighlighted from '../../shared/LocalizedHighlighted'
import CtaButtons from '../buttons/CtaButtons'
import LocalizedRichText from '../../shared/LocalizedRichText'

type Props = {
  block: ProductIntroBlockType | MissionVisionBlockType
  className?: React.ReactNode
}

function IntroSection({ block, className }: Props) {
  const h3Layout = (block?.heading3Layout ?? 'solo') as 'solo' | 'besideDescription'

  const hasH3 = !!block?.heading3
  const hasDesc = !!block?.description && !!block?.description?.root?.direction // or lexicalHasRealText(block.description?.root)

  const useBeside = hasH3 && h3Layout === 'besideDescription' && hasDesc

  return (
    <div className={`space-y-4 lg:space-y-6 xl:space-y-8 2xl:space-y-10 ${className}`}>
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
            <div className="font-proxima font-bold global-h2 text-dark-1">
              <LocalizedHighlighted
                textBn={block?.heading1}
                textEn={block?.heading1}
                highlightEn={block?.heading1Highlighted}
                highlightBn={block?.heading1Highlighted}
                highlightClassName={`${block?.heading1HighlightColor === 'primary' ? 'text-cyan' : 'text-white-3'} `}
              />
            </div>
          )}

          {/* heading 2 */}
          {block?.heading2 && (
            <div className="font-proxima font-bold global-h2 text-dark-1">
              <LocalizedHighlighted
                textBn={block?.heading2}
                textEn={block?.heading2}
                highlightEn={block?.heading2Highlighted}
                highlightBn={block?.heading2Highlighted}
                highlightClassName={`${block?.heading2HighlightColor === 'primary' ? 'text-cyan' : 'text-white-3'} `}
              />
            </div>
          )}

          {hasH3 && !useBeside && (
            <div className="font-proxima font-bold global-h2 text-dark-1">
              <LocalizedHighlighted
                textBn={block?.heading3}
                textEn={block?.heading3}
                highlightEn={block?.heading3Highlighted}
                highlightBn={block?.heading3Highlighted}
                highlightClassName={`${block?.heading3HighlightColor === 'primary' ? 'text-cyan' : 'text-white-3'} `}
              />
            </div>
          )}
        </div>
        {/* right */}
        {block?.ctaButtons && (
          <div>
            <CtaButtons item={block?.ctaButtons} />
          </div>
        )}
      </div>

      {/* Description section */}
      {(hasDesc || useBeside) && (
        <div className={useBeside ? 'grid gap-2 lg:gap-1 xl:gap-3 lg:grid-cols-12' : ''}>
          {useBeside && (
            <div className="lg:col-span-6 xl:col-span-5 font-proxima font-bold global-h3 text-dark-1">
              <LocalizedHighlighted
                textBn={block.heading3}
                textEn={block.heading3}
                highlightEn={block?.heading3Highlighted}
                highlightBn={block?.heading3Highlighted}
                highlightClassName={
                  block?.heading3HighlightColor === 'primary' ? 'text-cyan' : 'text-white-3'
                }
              />
            </div>
          )}

          {hasDesc && (
            <div
              className={
                useBeside
                  ? 'lg:col-span-6 xl:col-span-7 font-manrope text-dark-2 global-p2 text-justify'
                  : ' font-manrope text-dark-2 global-p2 text-justify'
              }
            >
              <LocalizedRichText en={block.description} bn={block.description} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default IntroSection
