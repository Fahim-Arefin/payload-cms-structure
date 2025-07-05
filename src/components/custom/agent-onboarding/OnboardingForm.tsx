import React, { FC } from 'react'
import OnboardingJoinForm from './OnboardingJoinForm'

type OnboardingFormProps = {}

const OnboardingForm: FC<OnboardingFormProps> = ({}) => {
  return (
    <div className="font-avenir container-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 z-10">
        {/* Left Side */}
        <div className="p-4 flex flex-col justify-center items-center">
          {/* Text Container */}
          <div className="text-center lg:text-left px-10 lg:px-0">
            <h1 className="global-h2 uppercase text-[#1E1E1E] font-normal">
              Explore the possibilities. Embrace the challenge. Build your future.
            </h1>
            <p className="text-[#1E1E1E] uppercase global-p2 font-light mt-10">
              Unlock the Perks of Powering Financial Futures
            </p>
          </div>
          {/* Info Container */}
        </div>
        {/* Right Side */}
        <div className="p-4 lg:pr-0 z-10">
          <OnboardingJoinForm />
        </div>
      </div>

    </div>
  )
}

export default OnboardingForm
