import React from 'react'
import { StrategicPartnersBlockType } from '@/types/payloadCustomTypes'
import StrategicPatners from '@/components/custom/microinsurance/StrategicPartners'

type Props = {
  block: StrategicPartnersBlockType
  params: Record<string, string>
}

function StrategicPartnersBlock({ block, params }: Props) {
  return (
    <div>
      <StrategicPatners block={block} />
    </div>
  )
}

export default StrategicPartnersBlock
