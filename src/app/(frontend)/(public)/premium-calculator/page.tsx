import React, { FC } from 'react'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CalculatorSection from '@/components/custom/premium-calculator/CalculatorSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import LocalizedString from '@/components/custom/shared/LocalizedString'

type Props = {}

const page: FC<Props> = ({}) => {
  const heroSlides = [
    {
      title: 'Premium Calculator',
      titleBN: 'প্রিমিয়াম ক্যালকুলেটর',
      subtitle: '',
      description: 'Future-Proof Me',
      descriptionBN: 'ভবিষ্যতের প্রমাণ',
      image: '/assets/premCalculator.png',
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
        >
          <ToolTip>
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
              Purchase Now
            </Button> */}
            <GlobalButton
              variant="primary"
              className="cursor-not-allowed"
              text="Purchase"
              size="large"
            >
              <LocalizedString en={`Purchase`} bn={`কিনুন`} />
            </GlobalButton>
          </ToolTip>

          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <CallNowButton />
          </div>
        </div>
      </HeroSection>

      <section id="calculator">
        <CalculatorSection />
      </section>

      <ContactUsSection />
    </div>
  )
}

export default page
