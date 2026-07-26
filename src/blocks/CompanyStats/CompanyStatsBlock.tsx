import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CompanyStatsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CompanyStatsSection from './components/CompanyStatsSection'

type Props = {
  block: CompanyStatsBlockType
  params: Record<string, string>
}

function CompanyStatsBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CompanyStatsSection block={block} />
    </WithHashScroller>
  )
}

export default CompanyStatsBlock
