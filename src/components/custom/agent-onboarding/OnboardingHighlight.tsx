import React from 'react'

type Props = {
  highlightSlides: {
    mainDescription: string
    images: {
      src: string
      title: string
    }[]
  }
}

const OnboardingHighlight = (highlightSlides: Props) => {
  return (
    <div className="">
      <div className="px-5 py-12 lg:px-[130px]  lg:py-[110px] 2xl:px-[300px] 2xl:py-[150px]  ">
        <p className="global-h3 text-gray-800  text-center">
          {highlightSlides.highlightSlides.mainDescription}
        </p>
      </div>

      {/* White section with icons */}
      <div className=" bg-white px-5 lg:px-[130px]  2xl:px-[300px] py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-center">
          {/* Card 1 */}
          <div className="flex flex-col gap-4 items-center">
            <div className=" w-[256px] h-[326px]">
              <img
                src="/assets/onboarding1.png"
                alt="Earning Potential"
                className="w-full h-auto object-cover"
              />
            </div>
            <p className=" text-gray-700">
              Attractive Earning Potential
              <br />
              Based on Performance
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center">
            <div className=" w-[256px] h-[326px]">
              <img
                src="/assets/onboarding2.png"
                alt="Learning"
                className="w-full h-auto object-cover rounded"
              />
            </div>
            <p className="mt-4 text-sm text-gray-700">
              Learning from the top-tier
              <br />
              Industry insider in BD
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center">
            <div className=" w-[256px] h-[326px]">
              <img
                src="/assets/onboarding3.png"
                alt="Applicable"
                className="w-full h-auto object-cover rounded"
              />
            </div>
            <p className="mt-4 text-sm text-gray-700">
              Applicable for professionals,
              <br />
              Freshers & Undergraduates
            </p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center">
            <div className=" w-[256px] h-[326px]">
              <img
                src="/assets/onboarding4.png"
                alt="Flexible Hours"
                className="w-full h-auto object-cover rounded"
              />
            </div>
            <p className="mt-4 text-sm text-gray-700">
              Completely Flexible Work
              <br />
              Hours
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingHighlight
