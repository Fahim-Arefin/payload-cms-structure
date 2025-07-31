import PurchaseCardSection from '@/components/custom/purchase/PurchaseCardSection'
import PurchaseSection from '@/components/custom/purchase/PurchaseSection'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import ToolTip from '@/components/custom/shared/ToolTip'
import React, { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Purchase Now',
      subtitle: '',
      description: '',
      image: '/assets/purchaseBanner.jpg',
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        // height=" h-[252px] md:h-[352px] lg:h-[470px] xl:h-[570px] 2xl:h-[670px] "
        // top=" top-[100px] md:top-[150px] lg:top-[43%]"
      >
        <div
          className="absolute top-[145px] md:top-[215px] lg:top-[280px] xl:top-[330px]  2xl:top-[430px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
        >
          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <CallNowButton />
          </div>
        </div>
      </HeroSection>

      <PurchaseSection />

      <ContactUsSection />
    </div>
  )
}

export default page
