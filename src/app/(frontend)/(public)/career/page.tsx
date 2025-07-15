import CareerIntro from '@/components/custom/career/CareerIntro'
import CareerOpening from '@/components/custom/career/CareerOpening'
import CareerOpeningPrograms from '@/components/custom/career/CareerOpeningPrograms'
import CareerOurStoryLg from '@/components/custom/career/CareerOurStoryLg'
import CareerProcessingFlow from '@/components/custom/career/CareerProcessingFlow'
import { CareerResourceSection } from '@/components/custom/career/CareerResources'
import CareerSwiper from '@/components/custom/career/CareerSwiper'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import { CareerCard, OurStoryDataType } from '@/types'
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
      mainImage: '/assets/careerVideoMain.png',
      insuranceCardData: [
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/careerVideo1.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/careerVideo2.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/careerVideo3.jpg',
          description: 'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa.',
        },
      ],
    },
  ]

  const resourceData = [
    {
      title: 'Rabeya Dihan',
      image: '/assets/Dihan.jpg',
      description: `Working at Shanta Life Insurance PLC has been a rewarding and professionally enriching journey.As part of the Customers Experience Team.I've had the opportunity to enagage directy with our valued custromers ensuring they recived timely support ,clear communication &  a seamless service experience.Everyday at Shanta Life brings new opportunity to grow, learn & make a sure meaningful impact. `,
      designation: 'Customer Service',
    },
    {
      title: 'Md. Arif Hossain',
      image: '/assets/Arif.jpg',
      description: `Working at Shanta Life has been a truly rewarding experience. The team is supportive, the environment is positive, and there’s a strong focus on growth and innovation. I’ve learned a lot and felt valued every step of the way.  `,
      designation: 'Corporate Sales',
    },
    //     {
    //       title: 'Rafiqul Ahsan Mohin',
    //       image: '/assets/avatar2.jpg',
    //       description: `Shanta Life is more than just a workplace - it's a movement built on purpose, passion, and people. From the very first day, I felt the pulse of something extraordinary: a culture rooted in trust, driven by values and fueled by a collective dream to redefine life insurance in Bangladesh.
    // Here, every role matters, every voice is heard, and every idea has the power to inspire change. As a young HR professional, I’ve been fortunate to be part of an environment that doesn’t just talk about transformation - it lives it. From nurturing talent to shaping culture, from building systems to unlocking human potential, I’ve seen firsthand how a clear vision, aligned values and courageous leadership can create something truly exceptional.
    // At Shanta Life, we don’t just offer protection - we ignite possibility. I am proud—honored—to be part of this inspiring journey, alongside brilliant minds and warm hearts who are committed to making a difference. `,
    //       designation: 'Human Resources',
    //     },
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

  // data.ts
  const careerCards: CareerCard[] = [
    {
      title: 'We Celebrate Impact',
      description:
        'We spotlight wins, reward outcomes, and champion the people behind the progress.',
    },
    {
      title: 'We Co-sign your Success',
      description: 'We cheer your hustle, amplify your milestones, and move forward—together.',
    },
    {
      title: 'We Drive Knowledge',
      description:
        'We support your quest for knowledge with our curated training programs. We\u2019re committed to nurturing expertise.  ',
    },
    {
      title: 'We-Centric Culture',
      description:
        'We foster a culture where "we"is stonger than "I". Thrive with synergy and get the support without limits. ',
    },
    {
      title: 'We Ignite Journeys',
      description: 'We build each other up, every day, Let\u2019s ignite possibilities together.',
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
      <CareerSwiper careerCards={careerCards} />
      <CareerResourceSection data={resourceData} />
      <CareerOpening openingData={openingData} />
      <CareerOpeningPrograms />
      <CareerProcessingFlow />
    </div>
  )
}

export default page
