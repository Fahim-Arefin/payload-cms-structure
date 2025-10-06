import VideoSection from '@/components/custom/home/VideoSection'
import { LifeInsuranceVideoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: LifeInsuranceVideoBlockType
  params: Record<string, string>
}
function LifeInsuranceVideoBlock({ block }: Props) {
  return (
    <div>
      <VideoSection homeVideoData={block} />
    </div>
  )
}

export default LifeInsuranceVideoBlock
