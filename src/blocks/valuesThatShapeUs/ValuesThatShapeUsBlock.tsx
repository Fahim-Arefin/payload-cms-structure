import AllAboutSection from '@/components/custom/about-us/AllAboutSection'
import { ValuesThatShapeUsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: ValuesThatShapeUsBlockType
  params: Record<string, string>
}

function ValuesThatShapeUsBlock({ block }: Props) {
  return (
    <div style={{ backgroundColor: block?.backgroundColor || '' }}>
      <AllAboutSection valuesThatSavesUs={block} />
    </div>
  )
}

export default ValuesThatShapeUsBlock
