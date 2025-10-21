import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'
import { PlanCardBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: PlanCardBlockType
  params: Record<string, string>
}

function PlanCardBlock({ block }: Props) {
  return (
    <div>
      <AllPlanSection plantData={block} blur>
        <div className="uppercase global-h2 font-medium">
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
        <div className="global-span text-[#3A3A3A] font-[350] mt-2 md:mt-4 xl:mt-6 2xl:mt-8">
          <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
        </div>
      </AllPlanSection>
    </div>
  )
}

export default PlanCardBlock
