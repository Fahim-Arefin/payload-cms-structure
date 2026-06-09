import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { CompanyIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CompanyIntroSection from './CompanyIntroSection'

type Props = {
  block: CompanyIntroBlockType
  params: Record<string, string>
}

function CompanyIntroBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CompanyIntroSection block={block} />
    </WithHashScroller>
  )
}

export default CompanyIntroBlock
