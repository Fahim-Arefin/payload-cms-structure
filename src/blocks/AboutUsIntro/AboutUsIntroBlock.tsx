import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { AboutUsIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import AboutUsIntroSection from './components/AboutUsIntroSection'
type Props = {
  block: AboutUsIntroBlockType
  params: Record<string, string>
}

function AboutUsIntroBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
      className="rounded-t-[18px] lg:rounded-t-[25px] xl:rounded-t-[30px]"
    >
      <AboutUsIntroSection block={block} />
    </WithHashScroller>
  )
}

export default AboutUsIntroBlock
