import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CodingLanguageBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CodingLanguageSection from './components/CodingLanguageSection'

type Props = {
  block: CodingLanguageBlockType
  params: Record<string, string>
}

function CodingLanguageBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CodingLanguageSection block={block} />
    </WithHashScroller>
  )
}

export default CodingLanguageBlock
