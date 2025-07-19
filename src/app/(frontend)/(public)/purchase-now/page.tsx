import PurchaseCardSection from '@/components/custom/purchase-now/PurchaseCardSection';
import PurchaseSection from '@/components/custom/purchase-now/PurchaseSection';
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection';
import GlobalButton from '@/components/custom/shared/GlobalButton';
import HeroSection from '@/components/custom/shared/hero/HeroSection';
import ToolTip from '@/components/custom/shared/ToolTip';
import React, { FC } from 'react';

type pageProps = {

}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Purcahse Now',
      subtitle: '',
      description:
        '',
      image: '/assets/purchaseBanner.jpg',
    },
  ]



  return (
    <div className='font-avenir bg-white'>
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
        >
          <ToolTip>
            <GlobalButton
              variant="primary"
              className="cursor-not-allowed"
              text="Purchase Now"
              size="large"
            />
          </ToolTip>

          <ToolTip className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <GlobalButton
              variant="primary"
              className="cursor-not-allowed border border-white text-white bg-white/30 backdrop-blur-md hover:bg-white/40 hover:border-white"
              text="Call Now"
              size="large"
            />
          </ToolTip>
        </div>
      </HeroSection>

      <PurchaseSection />


      <ContactUsSection />
     
    </div>
  );
};

export default page;