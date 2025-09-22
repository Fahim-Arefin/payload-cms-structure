import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import AllPlanSection from '@/components/custom/shared/plans/AllPlanSection'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedText from '@/components/custom/shared/LocalizedText'

function PlanPage() {
  const heroSlides = [
    {
      title: 'The right insurance stands with you.',
      subtitle: 'Every step. Every Turn.',
      titleBN: 'জীবনের প্রতিটি ধাপে আর্থিক',
      subtitleBN: 'সুরক্ষার নিশ্চয়তা',
      // description:
      //   'Life\u2019s full of surprises. We\u2019re here to help you navigate them. Let\u2019s build a confident future together.',
      description:
        'Life\u2019s full of surprises. We\u2019re here to help you navigate them... Let\u2019s build a confident future together.',
      descriptionBN: `জীবনের প্রতিটি স্বপ্নে আপনার ভবিষ্যৎ যেন থাকে সুরক্ষিত, শান্তা লাইফের সাথে থাকুন নিশ্চিন্ত`,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutionHeroBanner.jpg`,
    },
  ]

  const allPlantData = [
    {
      title: 'INDIVIDUAL',
      titleBN: 'একক বীমা',
      description: 'Because your protection should be as exceptional as you are.',
      descriptionBN: `আপনার নিরাপত্তা আপনার মতোই অনন্য`,
      link: '/plans/individual',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/web/plan1.jpg`,
      // mobileImage: '/assets/solutions/mobile/plan1.jpg',
    },
    {
      title: 'CORPORATE',
      titleBN: 'কর্পোরেট',
      description: 'Corporate policies as sharp as your strategy.',
      descriptionBN: `কৌশল ও নীতির সমন্বয়ে তৈরী শক্তিশালী কভারেজ`,
      link: '/plans/corporate',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/web/plan2.jpg`,
      // mobileImage: '/assets/solutions/mobile/plan2.jpg',
    },
    // BANCASSURANCE will be omitted for now
    {
      title: 'BANCASSURANCE',
      titleBN: `ব্যাংকাসুরেন্স`,
      description:
        'Money moves meet smart moves. Integrated coverage that fits into your financial routine.',
      descriptionBN: `আপনার প্রতিদিনের আর্থিক সিদ্ধান্তে সুরক্ষার প্রতিশ্রুতি`,
      link: '/plans/bancassurance',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/web/plan3.jpg`,
    },
  ]

  return (
    <div className="font-avenir">
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
      <AllPlanSection plantData={allPlantData} blur>
        <div className="uppercase global-h2 font-medium">
          <LocalizedHighlighted
            textEn="Choose your fit"
            highlightEn="your fit"
            textBn="প্রয়োজনমতো আপনার পছন্দ"
            highlightBn="আপনার পছন্দ"
            highlightClassName="text-[#ED7125]"
          />
        </div>
        <div className="global-span text-[#3A3A3A] font-[350]">
          <LocalizedText
            en="Explore plans built for your need"
            bn="আমাদের প্ল্যানগুলো ঘুরে দেখুন "
          />
        </div>
      </AllPlanSection>
    </div>
  )
}

export default PlanPage
