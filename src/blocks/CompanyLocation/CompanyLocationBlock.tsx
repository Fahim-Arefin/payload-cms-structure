import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { LocationBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CompanyLocationSection from './components/CompanyLocationSection'

type Props = {
  block: LocationBlockType
  params: Record<string, string>
}

function CompanyLocationBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CompanyLocationSection block={block} />
    </WithHashScroller>
  )
}

export default CompanyLocationBlock
