import { CollaborativeMethodBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CM_LeftsideContent from './CM_LeftsideContent'
import CM_RightSideImage from './CM_RightSideImage'

type Props = { block: CollaborativeMethodBlockType }

function CollaborativeMethodGrid({ block }: Props) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 
    gap-6 md:gap-4 lg:gap-10 xl:gap-28 2xl:gap-36"
    >
      {/* left */}
      <CM_LeftsideContent block={block} />
      {/* right */}
      <CM_RightSideImage block={block} />
    </div>
  )
}

export default CollaborativeMethodGrid
