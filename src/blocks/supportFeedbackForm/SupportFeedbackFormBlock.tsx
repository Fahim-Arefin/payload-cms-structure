import FeedBackSection from '@/components/custom/support/FeedBackSection'
import { SupportFeedbackFormBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: SupportFeedbackFormBlockType
    params: Record<string, string>
}

function SupportFeedbackFormBlock({block, params}: Props) {
  return (
    <div>
      <FeedBackSection block={block}/>
    </div>
  )
}

export default SupportFeedbackFormBlock