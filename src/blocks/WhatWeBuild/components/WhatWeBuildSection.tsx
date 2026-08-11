import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { WhatWeBuildBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import WhatWeBuildCarousal from './WhatWeBuildCarousal'

type Props = { block: WhatWeBuildBlockType }

function WhatWeBuildSection({ block }: Props) {
  return (
    <div
      className="container-padding
        space-y-[20px]
        lg:space-y-[40px]
        xl:space-y-[56px]
        2xl:space-y-[60px]
      "
    >
      <SectionHeading01 data={block?.sectionHeading} align="middle" dark />
      <WhatWeBuildCarousal block={block} />
    </div>
  )
}

export default WhatWeBuildSection
