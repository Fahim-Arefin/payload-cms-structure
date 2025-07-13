import CareerIntro from '@/components/custom/career/CareerIntro'
import CareerOurStory from '@/components/custom/career/CareerOurStory'
import CareerOurStoryLg from '@/components/custom/career/CareerOurStoryLg'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import { InsuranceDataType } from '@/types'
import React, { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Build Your Legacy, Empower Every Step',
      subtitle: '',
      description: 'Join us in reimagining life insurance, where your passion meets purpose.',
      image: '/assets/careerHero.png',
    },
  ]

  const introData = {
    title: 'At Shanta Life-',
    subTitle: 'We believe in Better',
    description:
      'We’re building a movement of purpose-driven people who believe in smarter protection, stronger communities, and a world where possibilities outpace uncertainties. Together, we push boundaries — in work, in life, and in everything in between.',
  }

  const insuranceData: InsuranceDataType[] = [
    {
      sectionHeading: 'Insurance Simplified',
      content: 'left',
      title: 'Expert Knows - How',
      subtitle: 'Skip the Jagron, Unlock',
      mainImage: '/assets/is1.jpg',
      insuranceCardData: [
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is2.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is3.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is4.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
      ],
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
        >
          <ToolTip>
            <Button
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
              View All Jobs
            </Button>
          </ToolTip>

          <ToolTip className="flex items-center space-x-2 text-white 2xl:space-x-4">
            {/* <div className="flex items-center space-x-2 text-white 2xl:space-x-4"> */}
            <Button
              className="cursor-not-allowed
              bg-[#FFFFFFCC]
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[35px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal border text-black border-white backdrop-blur-md
                        hover:bg-white/30 hover:border-white transition-colors duration-300"
            >
              Become an RO 
            </Button>
            {/* </div> */}
          </ToolTip>
        </div>
      </HeroSection>
      <CareerIntro data={introData} />
      <div className="container-padding block md:space-y-[30px] lg:space-y-[40px] xl:space-y-[80px] bg-gradient-to-r from-[#FBFFD3] to-[#F8E4C6]">
        {insuranceData?.map((data, i) => (
          <CareerOurStoryLg key={i} data={data} content={data?.content} />
        ))}
      </div>
    </div>
  )
}

export default page
