import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ServiceShowcaseBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ServiceShowCaseSection from './components/ServiceShowCaseSection'

type Props = {
  block: ServiceShowcaseBlockType
  params: Record<string, string>
}

function ServiceShowCaseBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <ServiceShowCaseSection block={block} />
    </WithHashScroller>
  )
}

export default ServiceShowCaseBlock
