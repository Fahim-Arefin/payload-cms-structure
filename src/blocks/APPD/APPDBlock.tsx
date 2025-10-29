import AccidentalPermanentPartialDisabilitySection from '@/components/custom/shared/plans/AccidentalPermanentPartialDisabilitySection'
import { APPDBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: APPDBlockType
  params: Record<string, string>
}

function APPDBlock({ block }: Props) {
  return (
    <div>
      <AccidentalPermanentPartialDisabilitySection data={block} />
    </div>
  )
}

export default APPDBlock
