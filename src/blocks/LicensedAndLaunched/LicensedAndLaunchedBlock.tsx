import LiscensedInfo from '@/components/custom/about-us/LiscensedInfo'
import { LicensedAndLaunchedBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LicensedAndLaunchedBlockType
  params: Record<string, string>
}

function LicensedAndLaunchedBlock({ block }: Props) {
  return (
    <div>
      <LiscensedInfo data={block} />
    </div>
  )
}

export default LicensedAndLaunchedBlock
