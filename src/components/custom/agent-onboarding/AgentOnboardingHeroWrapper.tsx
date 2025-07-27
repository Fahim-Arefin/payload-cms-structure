'use client'

import React, { FC, useCallback } from 'react'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import GlobalButton from '../shared/GlobalButton'

type AgentOnboardingHeroWrapperProps = {
  heroSlides: any
}

const AgentOnboardingHeroWrapper: FC<AgentOnboardingHeroWrapperProps> = ({ heroSlides }) => {
  const scrollToForm = useCallback(() => {
    document
      .getElementById('onboarding-form')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  return (
    <HeroSection heroSlides={heroSlides}>
      <div
        className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
      >
        {/* <Button
              variant="primary"
              className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
            >
              Apply Now
            </Button> */}
        <GlobalButton size="large" onClick={scrollToForm} text="Apply Now" variant="primary" />
      </div>
    </HeroSection>
  )
}

export default AgentOnboardingHeroWrapper
