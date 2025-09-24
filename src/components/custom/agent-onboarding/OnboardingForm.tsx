import React, { FC } from 'react'
import OnboardingJoinForm from './OnboardingJoinForm'
import LocalizedText from '../shared/LocalizedText'

type OnboardingFormProps = {}

const OnboardingForm: FC<OnboardingFormProps> = ({}) => {
  return (
    <div className="font-avenir container-padding mt-12 lg:mt-0" id="onboarding-form">
      <div className="grid grid-cols-1 lg:grid-cols-2 z-10">
        {/* Left Side */}
        <div className="flex flex-col justify-center items-center">
          {/* Text Container */}
          <div className="text-center lg:text-left lg:px-0">
            <h1 className="global-h2 uppercase text-[#1E1E1E] font-normal">
              <LocalizedText
                bn="অন্বেষণ  করুন নতুন দিগন্তের, নিজেকে চ্যালেঞ্জ করে গড়ে তুলুন প্রত্যাশিত আগামী"
                en="Explore new horizons. Own the challenge. Build the future you deserve."
              />
            </h1>
            <p className="text-[#1E1E1E] uppercase global-p2 font-light mt-4 md:mt-10">
              <LocalizedText
                bn="গড়ে তুলুন অর্থনৈতিক ভবিষ্যতের নতুন দরজা"
                en="Unlock the Perks of Powering Financial Futures"
              />
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
