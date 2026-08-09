import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { CS_DevelopmentFrameworkBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import CS_DevFrameworkSection from './components/CS_DevFrameworkSection'

type Props = {
  block: CS_DevelopmentFrameworkBlockType
  params: Record<string, string>
}

function CS_DevelopmentFrameworkBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <CS_DevFrameworkSection block={block} />
    </WithHashScroller>
  )
}

export default CS_DevelopmentFrameworkBlock
