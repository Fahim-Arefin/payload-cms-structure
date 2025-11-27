import React from 'react'
import { MultistagePlanBlockType } from '@/types/payloadCustomTypes'
import MultiPlansSection from '@/components/custom/multistage/MultiPlansSection'

type Props = {
  block: MultistagePlanBlockType
  params: Record<string, string>
}

const MultistagePlanBlock = ({ block, params }: Props) => {
  return (
    <div>
      <MultiPlansSection data={block} />
    </div>
  )
}

export default MultistagePlanBlock
