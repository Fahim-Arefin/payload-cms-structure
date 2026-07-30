import Tags from '@/components/custom/sagar-ropes-shared/others/Tags'
import { AboutUsIntroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AboutUsIntroBlockType
}

function AboutInfoSection({ block }: Props) {
  return (
    <div className="space-y-1 2xl:space-y-2">
      <div>{block?.companyInfo?.tag && <Tags tag={block?.companyInfo?.tag} />}</div>
      <div
        className="grid grid-cols-2
      gap-4 md:gap-10 lg:gap-16 xl:gap-24
      "
      >
        {/* left */}
        <div className="font-agency text-secondary-1 global-h7">
          {block?.companyInfo?.mainDescription}
        </div>
        {/* right */}
        <div className="font-grift text-secondary-1 global-p5">
          {block?.companyInfo?.secondaryDescription}
        </div>
      </div>
    </div>
  )
}

export default AboutInfoSection
