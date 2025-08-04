'use client'

import CareerIntro from '@/components/custom/career/CareerIntro'
import CareerOpening from '@/components/custom/career/CareerOpening'
import CareerOpeningPrograms from '@/components/custom/career/CareerOpeningPrograms'
import CareerOurStoryLg from '@/components/custom/career/CareerOurStoryLg'
import CareerProcessingFlow from '@/components/custom/career/CareerProcessingFlow'
import { CareerResourceSection } from '@/components/custom/career/CareerResources'
import CareerSwiper from '@/components/custom/career/CareerSwiper'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import ToolTip from '@/components/custom/shared/ToolTip'
import { Button } from '@/components/ui/button'
import { CareerCard, OurStoryDataType } from '@/types'
import Link from 'next/link'
import React, { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Build Your Legacy, Empower Every Step',
      subtitle: '',
      description: 'Join us in reimagining life insurance, where your passion meets purpose.',
      image: '/assets/career/web/careerHero.png',
    },
  ]
  // We’re bringing together people who believe in better protection, stronger communities, and a future full of possibilities.
  const introData = {
    title: 'At Shanta Life -',
    subTitle: 'We believe in Better',
    description:
      'We’re bringing together people who believe in better protection, stronger communities, and a future full of possibilities. Together, we push boundaries — in work, in life, and in everything in between.',
  }

  const careerStoryData: OurStoryDataType[] = [
    {
      title: 'SNAPSHOTs of',
      subtitle: 'Our Story',
      mainImage: '/assets/career/web/careerVideoMain.png',
      mainMobileImage: `/assets/career/mobile/careerVideoMain.png`,
      insuranceCardData: [
        {
          title: 'Leadership Recognition',
          image: '/assets/career/web/careerVideo1.jpg',
          mobileImage: `/assets/career/mobile/careerVideo1.jpg`,
          description:
            'Always get the appricaition on your achievements and milestones in our professional journey.',
        },
        {
          title: 'Team Sports & Unity',
          image: '/assets/career/web/careerVideo2.jpg',
          mobileImage: `/assets/career/mobile/careerVideo2.jpg`,
          description:
            'Company sports teams building camaraderie and teamwork beyond the workplace. We value out employee engagement.',
        },
        {
          title: 'Office Culture & Moments',
          image: '/assets/career/web/careerVideo3.jpg',
          mobileImage: `/assets/career/mobile/careerVideo3.jpg`,
          description: `Diverse team make you feel with companion rather than collgue in our vibrant office environment.`,
        },
      ],
    },
  ]

  const resourceData = [
    {
      title: 'Mantaka Faruqui Aurthi',
      image: '/assets/career/testimonials/Aurthi.jpg',
      mobileImage: `/assets/career/mobile/Aurthi.jpg`,
      description: `Shanta Life isn’t just a workplace—it’s a dynamic space where ideas thrive, creativity is celebrated, and every voice matters. As a woman in the Marketing department, I’ve experienced firsthand how empowering and inclusive the culture is. Here, I’m encouraged to think differently, challenge norms, and bring bold, creative ideas to life. It’s a place where talent is nurtured, innovation is embraced, and individuality is valued. If you're looking for an environment that inspires you to grow, lead, and make a difference, Shanta Life is the perfect place to be!`,
      designation: 'Marketing',
    },
    {
      title: 'Saurab Borua',
      image: '/assets/career/testimonials/Saurab Borua.jpg',
      mobileImage: `/assets/career/mobile/Saurab Borua.jpg`,
      description: `Shanta Life is more than just a workplace - it's a movement built on purpose, passion, and people. From the very first day, I felt the pulse of something extraordinary: a culture rooted in trust, driven by values and fueled by a collective dream to redefine life insurance in Bangladesh.
    Here, every role matters, every voice is heard, and every idea has the power to inspire change. As a young HR professional, I’ve been fortunate to be part of an environment that doesn’t just talk about transformation - it lives it. From nurturing talent to shaping culture, from building systems to unlocking human potential, I’ve seen firsthand how a clear vision, aligned values and courageous leadership can create something truly exceptional.
    At Shanta Life, we don’t just offer protection - we ignite possibility. I am proud—honored—to be part of this inspiring journey, alongside brilliant minds and warm hearts who are committed to making a difference. `,
      designation: 'Information Technology.',
    },
    {
      title: 'Rabeya Dihan',
      image: '/assets/career/testimonials/Dihan.jpg',
      mobileImage: `/assets/career/mobile/Dihan.jpg`,
      description: `Working at Shanta Life Insurance PLC has been a rewarding and professionally enriching journey.As part of the Customers Experience Team.I've had the opportunity to enagage directy with our valued custromers ensuring they recived timely support ,clear communication &  a seamless service experience.Everyday at Shanta Life brings new opportunity to grow, learn & make a sure meaningful impact. `,
      designation: 'Customer Service',
    },

    {
      title: 'Md. Arif Hossain',
      image: '/assets/career/testimonials/Arif.jpg',
      mobileImage: `/assets/career/mobile/Arif.jpg`,
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
      type: 'Full time',
      title: 'IT PROJECT MANAGER',
      description:
        'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
      btnText: 'Apply Now',
    },
    {
      type: 'Full time',
      title: 'Head of Agency Business',
      description:
        'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
      btnText: 'Apply Now',
    },
    {
      type: 'Full time',
      title: 'Full Stack Engineer',
      description:
        'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
      btnText: 'Apply Now',
    },
    // {
    //   type: 'Full time',
    //   title: 'RELATIONSHIP OFFICER',
    //   description:
    //     'At Shanta Life Insurance, your journey will be more than just a job. We believe in fostering a culture where every voice is heard and every idea is valued, regardless of your background. ',
    //   btnText: 'Apply Now',
    // },
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
          <GlobalButton
            size="large"
            // className="cursor-not-allowed"
            text="View All Jobs"
            variant="primary"
            onClick={() => {
              const section = document.getElementById('career-opening-section')
              if (section) {
                section.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          />

          <Link href="/agent-onboarding">
            <GlobalButton
              size="large"
              className=" border border-white text-white bg-white/30 backdrop-blur-md  hover:bg-white/30 hover:border-white "
              text="Become an RO"
              variant="primary"
            />
          </Link>
        </div>
      </HeroSection>
      <CareerIntro data={introData} />
      <div className="container-padding block bg-gradient-to-r from-[#FBFFD3] to-[#F8E4C6]">
        {careerStoryData?.map((data, i) => (
          <CareerOurStoryLg key={i} data={data} />
        ))}
      </div>
      <CareerSwiper careerCards={careerCards} />
      <CareerResourceSection data={resourceData} />
      <CareerOpening openingData={openingData} />
      {/* <CareerOpeningPrograms /> */}
      <CareerProcessingFlow />
    </div>
  )
}

export default page
