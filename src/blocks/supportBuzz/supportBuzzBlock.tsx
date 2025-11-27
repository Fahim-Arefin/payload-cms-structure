import React from 'react'
import { SupportBuzzBlockType } from '@/types/payloadCustomTypes'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'

type Props = {
  block: SupportBuzzBlockType
  params: Record<string, string>
}

function SupportBuzzBlock({ block, params }: Props) {
  return (
    <div>
      <CatchTheBuzzSection block={block} />
    </div>
  )
}

export default SupportBuzzBlock
