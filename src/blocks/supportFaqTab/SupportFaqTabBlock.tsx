import FaqTabSection from '@/components/custom/support/FaqTabSection'
import { SupportFaqTabBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: SupportFaqTabBlockType
  params: Record<string, string>
}

function SupportFaqTabBlock({ block, params }: Props) {
  return (
    <div>
      <FaqTabSection block={block} />
    </div>
  )
}

export default SupportFaqTabBlock
