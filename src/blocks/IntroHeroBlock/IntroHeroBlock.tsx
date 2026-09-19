import WithHashScroller from '@/components/custom/shared/WithHashScroller'
import { IntroHeroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import IntroHeroSection from './components/IntroHeroSection'

type Props = {
  block: IntroHeroBlockType
  params: Record<string, string>
}

function IntroHeroBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={null}
      // className="bg-[#D8CFBF]"
      className="bg-[#1E1E1E] "
    >
      <IntroHeroSection block={block} />
    </WithHashScroller>
  )
}

export default IntroHeroBlock
