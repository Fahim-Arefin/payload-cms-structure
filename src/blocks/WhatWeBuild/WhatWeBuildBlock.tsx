import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { WhatWeBuildBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import WhatWeBuildSection from './components/WhatWeBuildSection'

type Props = {
  block: WhatWeBuildBlockType
  params: Record<string, string>
}

function WhatWeBuildBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <WhatWeBuildSection block={block} />
    </WithHashScroller>
  )
}

export default WhatWeBuildBlock
