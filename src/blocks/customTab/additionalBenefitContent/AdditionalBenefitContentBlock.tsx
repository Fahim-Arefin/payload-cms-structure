import { BenefitsTabSection } from '@/components/custom/child-education/BenefitsTabSection'
import { AdditionalBenefitContentBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  data: AdditionalBenefitContentBlockType
}

function AdditionalBenefitContentBlock({ data }: Props) {
  return (
    <div>
      <BenefitsTabSection data={data} />
    </div>
  )
}

export default AdditionalBenefitContentBlock
