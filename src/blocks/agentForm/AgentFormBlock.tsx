import OnboardingForm from '@/components/custom/agent-onboarding/OnboardingForm'
import { AgentOnboardingFormBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: AgentOnboardingFormBlockType
    params: Record<string, string>
}

function AgentFormBlock({block, params}: Props) {
  return (
    <div>
      <OnboardingForm block={block}/>
    </div>
  )
}

export default AgentFormBlock