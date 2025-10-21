import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'
import { PlanCardBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PlanCardBlockType
  params: Record<string, string>
}

function PlanCardBlock({ block }: Props) {
  return (
    <div>
      <AllPlanSection plantData={block} blur>
        <div className="uppercase global-h2 font-medium">
          <LocalizedHighlighted
            textEn={block?.title}
            highlightEn={block?.highlightedText}
            textBn={block?.titleBN}
            highlightBn={block?.highlightedTextBN}
            highlightClassName="text-[#ED7125]"
          />
        </div>
        <div className="global-span text-[#3A3A3A] font-[350]">
          <LocalizedText en={block?.description} bn={block?.descriptionBN} />
        </div>
      </AllPlanSection>
    </div>
  )
}

export default PlanCardBlock
