import DirectorsMessageSection from '@/components/custom/about-us/DirectorsMessageSection'
import { DirectorMessagesBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: DirectorMessagesBlockType
  params: Record<string, string>
}

function DirectorMessageBlock({ block }: Props) {
  return (
    <div>
      <DirectorsMessageSection directorCardData={block} />
    </div>
  )
}

export default DirectorMessageBlock
