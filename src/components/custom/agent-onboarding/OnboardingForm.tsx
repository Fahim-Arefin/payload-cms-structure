'use client'

import React, { FC } from 'react'
import OnboardingJoinForm from './OnboardingJoinForm'
import LocalizedText from '../shared/LocalizedText'
import LocalizedRichText from '../shared/LocalizedRichText'
import { AgentOnboardingFormBlockType } from '@/types/payloadCustomTypes'

type OnboardingFormProps = {
  block: AgentOnboardingFormBlockType
}

const OnboardingForm: FC<OnboardingFormProps> = ({ block }) => {
  const bg = block?.bgColor || '#f6eddd'

  return (
    <div
      className="font-avenir container-padding mt-12 lg:mt-0"
      id="onboarding-form"
      style={{ backgroundColor: bg }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 z-10">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center">
          {/* Text Container */}
          <div className="text-center lg:text-left lg:px-0">
            {/* Description (Rich Text) replaces the first LocalizedText */}
            {(block?.description || block?.descriptionBN) && (
              <div className="global-h2 uppercase text-[#1E1E1E] font-normal">
                <LocalizedRichText en={block?.description} bn={block?.descriptionBN} />
              </div>
            )}

            {/* Subdescription (Plain text) replaces the second LocalizedText */}
            {(block?.subdescription || block?.subdescriptionBN) && (
              <p className="text-[#1E1E1E] uppercase global-p2 font-light mt-4 md:mt-10">
                <LocalizedText en={block?.subdescription} bn={block?.subdescriptionBN} />
              </p>
            )}
          </div>
          {/* Info Container */}
        </div>

        {/* Right Side */}
        <div className="p-4 lg:pr-0 z-10">
          <OnboardingJoinForm consentEn={block?.consentText}
            consentBn={block?.consentTextBN} />
        </div>
      </div>
    </div>
  )
}

export default OnboardingForm
