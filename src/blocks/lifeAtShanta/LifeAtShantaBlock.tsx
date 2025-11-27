import OpportunitiesSection from '@/components/custom/home/OpportunitiesSection'
import { LifeAtShantaBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LifeAtShantaBlockType
  params: Record<string, string>
}

function LifeAtShantaBlock({ block }: Props) {
  return (
    <div
      className="container-padding-y"
      style={{
        backgroundColor: block?.backgroundColor || '',
      }}
    >
      <OpportunitiesSection lifeAtShantaData={block} />
    </div>
  )
}

export default LifeAtShantaBlock
