import { GetToKnowBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import GetToKnowSection from './components/GetToKnowSection'

type Props = {
  block: GetToKnowBlockType
  params: Record<string, string>
}

function GetToKnowBlock({ block }: Props) {
  return (
    <div>
      <GetToKnowSection data={block} />
    </div>
  )
}

export default GetToKnowBlock
