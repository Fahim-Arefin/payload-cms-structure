import React from 'react'
import StagePlanTitle from '@/components/custom/multistage/StagePlanTitle'
import { MultistageIntroBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: MultistageIntroBlockType
  params: Record<string, string>
}

function MultiStageTitleBlock({ block, params }: Props) {
  return <div>
    <StagePlanTitle data={block}/>
  </div>
}

export default MultiStageTitleBlock
