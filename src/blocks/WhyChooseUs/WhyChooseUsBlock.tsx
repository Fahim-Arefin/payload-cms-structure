import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { WCUBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import WhyChooseUsSection from './components/WhyChooseUsSection'

type Props = {
  block: WCUBlockType
  params: Record<string, string>
}

function WhyChooseUsBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <WhyChooseUsSection block={block} />
    </WithHashScroller>
  )
}

export default WhyChooseUsBlock
