import React from 'react'
import { MicroinsuranceMattersBlockType } from '@/types/payloadCustomTypes'
import WhyMicroInsuranceMatter from '@/components/custom/microinsurance/WhyMicroinsuranceMatters'

type Props = {
  block: MicroinsuranceMattersBlockType
  params: Record<string, string>
}

function MicroinsuranceMattersBlock({ block, params }: Props) {
  return (
    <div>
      <WhyMicroInsuranceMatter block={block} />
    </div>
  )
}

export default MicroinsuranceMattersBlock
