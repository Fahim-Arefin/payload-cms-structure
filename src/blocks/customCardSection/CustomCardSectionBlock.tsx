import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import {
  CORPORATE_PAGE_CARDS_SLUG_AND_TAG,
  PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG,
} from '@/lib/constants'
import { CorporateBlock, CustomCardSectionBlockType, PlanBlock } from '@/types/payloadCustomTypes'
import React from 'react'
import CorporateCardBlock from './corporateCard/CorporateCardBlock'
import PlanCardBlock from './planCard/PlanCardBlock'

type Props = {
  block: CustomCardSectionBlockType
  params: Record<string, string>
}

function CustomCardSectionBlock({ block }: Props) {
  return (
    <div
      className={`${block?.addHorizontalPadding && 'container-padding'}`}
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      {/* Card heading section */}
      <div
        className={`${!block?.addHorizontalPadding && `container-padding-x container-padding-t`} text-[#434343] text-start
      mb-9 md:mb-[40px] lg:mb-[54px] xl:mb-[74px]`}
      >
        <div className="uppercase global-h2 font-semibold">
          <div>
            <LocalizedHighlighted
              textEn={block?.title}
              highlightEn={block?.highlightedText}
              textBn={block?.titleBN}
              highlightBn={block?.highlightedTextBN}
              highlightClassName="text-[#ED7125]"
            />
          </div>
          {(block?.subtitle || block?.subtitleBN) && (
            <div>
              <LocalizedHighlighted
                textEn={block?.subtitle}
                highlightEn={block?.highlightedSubtitle}
                textBn={block?.subtitleBN}
                highlightBn={block?.highlightedSubtitleBN}
                highlightClassName="text-[#ED7125]"
              />
            </div>
          )}
        </div>
        {(block?.description || block?.descriptionBN) && (
          <div
            className={`global-span text-[#3A3A3A] font-[350] 
            ${(block?.title || block?.titleBN) && (block?.subtitle || block?.subtitleBN) ? `mt-2 md:mt-4 xl:mt-6 2xl:mt-8` : ''}`}
          >
            <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
          </div>
        )}
      </div>

      {/* selected card from layout */}
      {block?.card?.map((eachCard, index) => {
        const key = eachCard?.id ?? index

        switch (eachCard?.blockType) {
          case CORPORATE_PAGE_CARDS_SLUG_AND_TAG: {
            const cardData = eachCard as CorporateBlock
            return (
              <div key={key}>
                <CorporateCardBlock
                  block={block}
                  data={cardData}
                  displayAsCarousel={block?.displayAsCarousel}
                />
              </div>
            )
          }
          // add more cases as you introduce new card block types
          case PLAN_PAGE_PLAN_CARD_SLUG_AND_TAG: {
            const cardData = eachCard as PlanBlock
            return (
              <div key={key}>
                <PlanCardBlock
                  block={block}
                  data={cardData}
                  displayAsCarousel={block?.displayAsCarousel}
                />
              </div>
            )
          }

          default:
            return null // unknown block type -> render nothing
        }
      })}
    </div>
  )
}

export default CustomCardSectionBlock
