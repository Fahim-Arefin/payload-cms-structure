import EndowmentSection from '@/components/custom/shared/plans/EndowmentSection'
import { PlanInfoDesignBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: PlanInfoDesignBlockType
  params: Record<string, string>
}

function PlanInfoDesignBlock({ block }: Props) {
  return (
    <div>
      <EndowmentSection
        data={block}
        content={block?.imageOrder === 'left' ? 'left' : 'right'}
        bgColor={block?.backgroundColor || ''}
      />
    </div>
  )
}

export default PlanInfoDesignBlock
