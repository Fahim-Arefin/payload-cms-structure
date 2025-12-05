import React from 'react'
import { MicroinsuranceServiceBlockType } from '@/types/payloadCustomTypes'
import OSAP from '@/components/custom/microinsurance/OSAP'
import OnYourCueSection3 from '@/components/custom/microinsurance/OnYourCueSection3'

type Props = {
  block: MicroinsuranceServiceBlockType
  params: Record<string, string>
}

function MicroinsuranceServiceBlock({ block, params }: Props) {
  return (
    <div>
      <OSAP data={block} />
      <div>
        <OnYourCueSection3 data={block} bg="#f6eddd" />
      </div>
    </div>
  )
}

export default MicroinsuranceServiceBlock
