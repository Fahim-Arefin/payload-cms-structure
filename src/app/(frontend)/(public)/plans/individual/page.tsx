import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'

import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { Button } from '@/components/ui/button'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import Link from 'next/link'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedText from '@/components/custom/shared/LocalizedText'

function PlanPage() {
  const heroSlides = [
    {
      title: 'Individual Plans',
      titleBN: 'একক বীমা',
      subtitle: '',
      description: 'Because real life doesn’t come with a rewind button.',
      descriptionBN: 'আজকের প্রস্তুতি আগামীর নির্ভরতা',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/planBanner.jpg`,
    },
  ]

  const indivisualPlantData = [
    {
      title: 'Saving and Investment Plans',
      titleBN: 'সেভিংস এন্ড ইনভেস্টমেন্ট প্ল্যানস',
      description: `Because life has more than one milestone. We’re with you at every one.`,
      descriptionBN: `জীবনের প্রতিটি মাইলস্টোনে আমরা আছি আপনার পাশে`,
      link: '/plans/individual/saving-and-investment',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/web/saving-and-investment.png`,
      // mobileImage: '/assets/solutions/individual/mobile/saving-and-investment.png',
    },

    {
      title: 'Health and Protection Plans',
      titleBN: 'হেলথ এন্ড প্রটেকশন প্ল্যানস',
      description: `Preventive care meets powerful protection. Let us be your financial shield you can count on.`,
      descriptionBN: `স্বাস্থ্য আর সুরক্ষার শক্তি— নির্ভরযোগ্য আর্থিক ঢাল হয়ে আপনার পাশে সবসময়`,
      link: '/plans/individual/health-and-protection',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/web/health-and-protection.jpg`,
      // mobileImage: '/assets/solutions/individual/mobile/health-and-protection.jpg',
    },
    {
      title: 'Child Education Plan',
      titleBN: `চাইল্ড এডুকেশন প্ল্যান`,
      description: `A brighter future starts with a thoughtful plan.`,
      descriptionBN: 'উজ্জ্বল ভবিষ্যৎ শুরু হয় সঠিক পরিকল্পনা দিয়ে',
      link: '/plans/individual/child-education',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/web/child-education.jpg`,
      // mobileImage: '/assets/solutions/individual/mobile/child-education.jpg',
    },
    // {
    //   title: 'Retirement',
    //   description: 'Plan today for the freedom you deserve tomorrow.',
    //   link: '/',
    //   image: '/assets/plan7.jpg',
    // },
    // {
    //   title: 'Takaful',
    //   description: 'Guided by Shariah, united in trust — protection with integrity.',
    //   link: '/',
    //   image: '/assets/plan8.jpg',
    // },
  ]

  return (
    <div className="font-avenir bg-white ">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute bottom-12 lg:top-[500px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <Link href="/purchase">
            <GlobalButton size="large" text="Purchase" variant="primary" className="">
              <LocalizedString en="Purchase" bn="কিনুন" />
            </GlobalButton>
          </Link>
          <CallNowButton />
        </div>
      </HeroSection>
      <AllPlanSection plantData={indivisualPlantData} blur>
        <div className="uppercase global-h2 font-medium">
          <LocalizedHighlighted
            textEn={`Not Just policies`}
            highlightEn={`policies`}
            textBn="সম্ভবনার নতুন দিগন্ত"
            highlightBn="নতুন দিগন্ত"
            highlightClassName="text-[#ED7125]"
          />
          <br />
          <LocalizedHighlighted
            textEn={`It's POSSIBILITIES`}
            highlightEn={`It's POSSIBILITIES`}
            textBn=""
            highlightBn=""
            highlightClassName="text-[#ED7125]"
          />
        </div>
        <div className="hidden lg:block global-span text-[#3A3A3A] font-[350] mt-4 xl:mt-6 2xl:mt-12">
          <LocalizedText
            en="From wealth-building solutions to education-focused coverage,"
            bn="অর্থ সঞ্চয়ের সমাধান থেকে শুরু করে সন্তানের ভবিষ্যত শিক্ষার নির্ভরতা—"
          />
        </div>
        <div className="hidden lg:block global-span text-[#3A3A3A] font-[350]">
          <LocalizedText
            en="we bring you tailored plans that meet your ambitions."
            bn="আপনার স্বপ্ন অনুযায়ী আমাদের পরিকল্পনা।"
          />
        </div>
      </AllPlanSection>
      <ContactUsSection />
    </div>
  )
}

export default PlanPage
