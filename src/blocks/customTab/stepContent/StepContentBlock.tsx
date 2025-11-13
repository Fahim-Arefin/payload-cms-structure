import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { StepContentBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  data: StepContentBlockType
}

function StepContentBlock({ data }: Props) {
  return (
    <div>
      <LocalizedRichText en={data?.items[0]?.description} bn={data?.items[0]?.descriptionBN} />
    </div>
  )
}

export default StepContentBlock
