import CareerIntro from '@/components/custom/career/CareerIntro'
import CareerOpening from '@/components/custom/career/CareerOpening'
import CareerOpeningPrograms from '@/components/custom/career/CareerOpeningPrograms'
import CareerOurStoryLg from '@/components/custom/career/CareerOurStoryLg'
import CareerProcessingFlow from '@/components/custom/career/CareerProcessingFlow'
import { CareerResourceSection } from '@/components/custom/career/CareerResources'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import { OurStoryDataType } from '@/types'
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

  const careerStoryData: OurStoryDataType[] = [
    {
      title: 'SNAPSHOTs of',
      subtitle: 'Our Story',
      mainImage: '/assets/is1.jpg',
      insuranceCardData: [
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is2.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is3.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is4.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa.',
        },
      ],
    },
  ]

  const resourceData = [
    {
      title: 'Mantaka Faruqui Aurthi',
      image: '/assets/avatar1.jpg',
      description:
        'Shanta Life isn’t just a workplace—it’s a dynamic space where ideas thrive, creativity is celebrated, and every voice matters. As a woman in the Marketing department, I’ve experienced firsthand how empowering and inclusive the culture is. Here,',
      designation: 'Marketing',
    },
    {
      title: 'Surab Barua',
      image: '/assets/avatar2.jpg',
      description:
        'At Shanta Life, innovation is in our DNA, and every challenge is an opportunity to grow. As a member of the IT department, I’ve had the chance to work on...',
      designation: 'Information Technology.',
    },
  ]

  const openingData = [
    {
      type: 'Internship',
      title: 'RELATIONSHIP OFFICER',
      description:
        'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
      btnText: 'Apply Now',
    },
    {
      type: 'Part-time',
      title: 'CAMPUS AMBASSADOR',
      description:
        'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
      btnText: 'Apply Now',
    },
    {
      type: 'Full time',
      title: 'MANAGEMENT TRAINEE',
      description:
        'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
      btnText: 'Apply Now',
    },
    {
      type: 'Full time',
      title: 'RELATIONSHIP OFFICER',
      description:
        'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
      btnText: 'Apply Now',
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
      <div className="container-padding block bg-gradient-to-r from-[#FBFFD3] to-[#F8E4C6]">
        {careerStoryData?.map((data, i) => <CareerOurStoryLg key={i} data={data} />)}
      </div>
      <CareerResourceSection data={resourceData} />
      <CareerOpening openingData={openingData} />
      <CareerOpeningPrograms />
      {/* <CareerProcessingFlow /> */}
    </div>
  )
}

export default page
