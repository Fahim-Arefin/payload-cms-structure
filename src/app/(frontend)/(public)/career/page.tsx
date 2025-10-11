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
import LocalizedString from '@/components/custom/shared/LocalizedString'
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
      titleBN: 'আত্মবিশ্বাসে ভরপুর প্রতিটি পদক্ষেপ',
      subtitle: '',
      description: 'Join us in reimagining life insurance, where your passion meets purpose.',
      descriptionBN: `লাইফ ইন্স্যুরেন্স সেক্টরে নতুন দিনের সূচনায় যোগ দিন আমাদের সাথে`,
      image: '/assets/career/web/careerHero.png',
    },
  ]
  // We’re bringing together people who believe in better protection, stronger communities, and a future full of possibilities.
  const introData = {
    title: 'At Shanta Life -',
    titleBN: 'শান্তা লাইফে আমরা বিশ্বাস রাখি',
    subTitle: 'We believe in Better',
    subTitleBN: 'অগ্রগতির নিরন্তর প্রচেষ্টায়',
    description:
      'We’re bringing together people who believe in better protection, stronger communities, and a future full of possibilities. Together, we push boundaries-in work, in life, and in everything in between.',
    descriptionBN: `আমরা একত্রে গড়ে তুলি শক্তিশালী কমিউনিটি - আর নিশ্চিত করি এক সম্ভাবনাময় আগামী।`,
  }

  const careerStoryData: OurStoryDataType[] = [
    {
      title: 'SNAPSHOTs of',
      subtitle: 'Our Story',
      titleBN: 'আমাদের পথচলার',
      subtitleBN: 'কিছু মুহূর্ত',
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
      titleBN: 'মানতাকা ফারুকী অর্থী',
      image: '/assets/career/testimonials/Aurthi.jpg',
      mobileImage: `/assets/career/mobile/Aurthi.jpg`,
      description: `Shanta Life isn’t just a workplace—it’s a dynamic space where ideas thrive, creativity is celebrated, and every voice matters. As a woman in the Marketing department, I’ve experienced firsthand how empowering and inclusive the culture is. Here, I’m encouraged to think differently, challenge norms, and bring bold, creative ideas to life. It’s a place where talent is nurtured, innovation is embraced, and individuality is valued. If you're looking for an environment that inspires you to grow, lead, and make a difference, Shanta Life is the perfect place to be!`,
      descriptionBN: `শান্তা লাইফ শুধু একটা ওয়ার্কপ্লেস না বরং এটি ডায়নামিক স্পেস, যেখানে আইডিয়া গ্রো করে, ক্রিয়েটিভিটি সেলিব্রেটে  হয়, আর প্রতিটা ভয়েস  গুরুত্ব পায়।
      মার্কেটিং টিম -এ একজন নারী হিসেবে আমি ফার্স্টহ্যান্ড ফিল করেছি কতোটা এমপাওয়ারিং এবং ইনক্লুসিভ এখানের কালচার।
      এখানে আপনাকে প্রশংসা করা হয় ভিন্নভাবে চিন্তা করতে, বাঁধাধরা নিয়মকে চ্যালেঞ্জ করতে আর সাহসী, ক্রিয়েটিভ আইডিয়া-কে লাইফে আনতে।
      শান্তা লাইফ হলো সেই জায়গা যেখানে ট্যালেন্ট নার্চার করা হয়, ইনোভেশনকে সবচেয়ে বেশি গুরুত্ব দেয়া, আর নিজ আত্মপরিচয় সম্মান পায়।
      যদি চান এমন একটা পরিবেশ  যেখানে আপনি গ্রো, লিড এবং আসল পরিবর্তন  করতে পারবেন—তাহলে  শান্তা লাইফ আপনার জন্য !`,
      designation: 'Marketing',
      designationBN: 'মার্কেটিং',
    },
    {
      title: 'Saurab Borua',
      titleBN: 'সৌরব বড়ুয়া',
      image: '/assets/career/testimonials/Saurab Borua.jpg',
      mobileImage: `/assets/career/mobile/Saurab Borua.jpg`,
      description: `At Shanta Life, innovation is in our DNA, and every challenge is an opportunity to grow. 
      As a member of the IT Department, I’ve had the chance to work on building the digital backbone of a next-gen life insurance brand. 
      Here, IT isn’t just support — it’s strategy, speed, and serious innovation. Every day is a mix of clean code, caffeine, 
      and conversations that actually spark change.`,
      descriptionBN: `শান্তা লাইফ-এ ইনোভেশন আছে আমাদের ডিএনএ-তে—আর প্রতিটা চ্যালেঞ্জ মানে নতুন গ্রোথ অপরচুনিটি।
      আইটি ডিপার্টমেন্ট-এর একজন হিসেবে আমি সুযোগ পেয়েছি  একটা নেক্সট-জেন লাইফ ইন্স্যুরেন্স ব্র্যান্ড-এর ডিজিটাল ব্যাকবোন বানানোর।
      এখানে আইটি মানে শুধু সাপোর্ট না—এটা হলো স্ট্র্যাটেজি, স্পিড & সিরিয়াস ইনোভেশন।
      প্রতিদিনের রুটিন, ক্লিন কোড, ক্যাফেইন আর অফিস কনভারসেশনস যেগুলো সত্যিই চেঞ্জ স্পার্ক করে।`,
      designation: 'Information Technology',
      designationBN: `তথ্য ও প্রযুক্তি`,
    },
    {
      title: 'Rafiqul Ahsan Mohin',
      titleBN: 'রফিকুল আহসান মহিন',
      image: '/assets/career/testimonials/Mohin.jpg',
      mobileImage: `/assets/career/mobile/Mohin.jpg`,
      description: `Shanta Life is more than just a workplace - it's a movement built on purpose, passion, and people. 
      From the very first day, I felt the pulse of something extraordinary: a culture rooted in trust, driven by values and fueled by a 
      collective dream to redefine life insurance in Bangladesh.Here, every role matters, every voice is heard, and every idea has the 
      power to inspire change. As a young HR professional, I’ve been fortunate to be part of an environment that doesn’t just talk about 
      transformation - it lives it. From nurturing talent to shaping culture, from building systems to unlocking human potential, 
      I’ve seen firsthand how a clear vision, aligned values and courageous leadership can create something truly exceptional. 
      At Shanta Life, we don’t just offer protection - we ignite possibility. I am proud—honored—to be part of this inspiring journey, 
      alongside brilliant minds and warm hearts who are committed to making a difference.`,
      descriptionBN: `শান্তা লাইফ শুধু একটা ওয়ার্কপ্লেস না—এটা একটা মুভমেন্ট, যেটা তৈরি হয়েছে পারপাস, প্যাশন আর পিপল-এর উপর।
      ফার্স্ট ডে থেকেই আমি ফিল করেছি কিছু এক্সট্রঅর্ডিনারি—একটা কালচার যেটা ট্রাস্টে রুটেড, ভ্যালুতে ড্রিভেন আর এক কালেক্টিভ ড্রিমে ফুয়েল্ড—বাংলাদেশে লাইফ ইন্স্যুরেন্স রিডিফাইন করার জন্য।
      এখানে প্রতিটা রোল ম্যাটার করে, প্রতিটা ভয়েস শোনা হয়, আর প্রতিটা আইডিয়া ইনস্পায়ার করে চেঞ্জ।
      একজন ইয়ং এইচআর প্রফেশনাল হিসেবে আমি ভাগ্যবান যে এমন একটা এনভায়রনমেন্টের পার্ট হতে পেরেছি—যেটা শুধু ট্রান্সফরমেশন নিয়ে টক করে না, আসলেই লিভ করে।
      ট্যালেন্ট নার্চার করা থেকে কালচার শেপ করা, সিস্টেম বিল্ড করা থেকে হিউম্যান পটেনশিয়াল আনলক করা—আমি ফার্স্টহ্যান্ড দেখেছি কীভাবে একটা ক্লিয়ার ভিশন, অ্যালাইন্ড ভ্যালুজ আর কারেজিয়াস লিডারশিপ কিছু ট্রুলি এক্সসেপশনাল তৈরি করতে পারে।
      শান্তা লাইফে আমরা শুধু প্রটেকশন দেই না—আমরা ইগনাইট করি পসিবিলিটি।
      প্রাউড আর অনারড ফিল করি এই ইনস্পায়ারিং জার্নির অংশ হতে পেরে—ব্রিলিয়ান্ট মাইন্ডস আর ওয়ার্ম হার্টস-এর পাশে থেকে যারা রিয়েলি মেক এ ডিফারেন্স করতে কমিটেড।`,
      designation: 'Human Resources',
      designationBN: 'হিউমান রিসোর্স',
    },
    {
      title: 'Rabeya Dihan',
      titleBN: `রাবেয়া দিহান`,
      image: '/assets/career/testimonials/Dihan.jpg',
      mobileImage: `/assets/career/mobile/Dihan.jpg`,
      description: `Working at Shanta Life Insurance PLC has been a rewarding and professionally enriching journey.As part of the Customers Experience Team.I've had the opportunity to enagage directy with our valued custromers ensuring they recived timely support ,clear communication &  a seamless service experience.Everyday at Shanta Life brings new opportunity to grow, learn & make a sure meaningful impact. `,
      descriptionBN: `শান্তা লাইফ ইন্স্যুরেন্স পিএলসি-তে কাজ করা আমার জন্য একটা রিওয়ার্ডিং আর প্রফেশনালি এনরিচিং জার্নি।
কাস্টমার এক্সপেরিয়েন্স টিম-এর পার্ট হয়ে আমি ডিরেক্টলি আমাদের ভ্যালুড কাস্টমারদের সাথে এনগেজ করার সুযোগ পেয়েছি—যাতে তারা পান টাইমলি সাপোর্ট, ক্লিয়ার কমিউনিকেশন আর একদম সিমলেস সার্ভিস এক্সপেরিয়েন্স।
প্রতিদিন শান্তা লাইফ মানে নতুন অপরচুনিটি—গ্রো, লার্ন আর মেক এ মীনিংফুল ইমপ্যাক্ট`,
      designation: 'Customer Service',
      designationBN: `কাস্টমার সার্ভিস`,
    },

    {
      title: 'Md. Arif Hossain',
      titleBN: `আরিফ হোসেইন`,
      image: '/assets/career/testimonials/Arif.jpg',
      mobileImage: `/assets/career/mobile/Arif.jpg`,
      description: `Working at Shanta Life has been a truly rewarding experience. The team is supportive, the environment is positive, and there’s a strong focus on growth and innovation. I’ve learned a lot and felt valued every step of the way.  `,
      descriptionBN: `শান্তা লাইফে কাজ করা আমার জন্য ট্রুলি রিওয়ার্ডিং এক্সপেরিয়েন্স।
      এখানে টিম সবসময় সাপোর্টিভ, এনভায়রনমেন্ট একদম পজিটিভ—আর ফোকাস সবসময় গ্রোথ আর ইনোভেশন-এ।
      আমি এখানে অনেক কিছু শিখেছি আর প্রতিটা স্টেপে ভ্যালুড ফিল করেছি।`,
      designation: 'Corporate Sales',
      designationBN: `কর্পোরেট সেলস`,
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
      titleBN: 'আমরা উদযাপন করি প্রভাব',
      description:
        'We spotlight wins, reward outcomes, and champion the people behind the progress.',
      descriptionBN: 'সাফল্যের কারিগরদের আমরা তুলে ধরি সবার সামনে',
    },
    {
      title: 'We Co-sign your Success',
      titleBN: 'আমরা সহযাত্রী আপনার সাফল্যে',
      description: 'We cheer your hustle, amplify your milestones, and move forward—together.',
      descriptionBN: `আপনার সাফল্য আমরা উজ্জাপন করি একসাথে`,
    },
    {
      title: 'We Drive Knowledge',
      titleBN: 'আমরা এগিয়ে নেই জ্ঞানচর্চা',
      description:
        'We support your quest for knowledge with our curated training programs. We’re committed to nurturing expertise.',
      descriptionBN: `নতুন স্কিল অর্জনের যাত্রায় আমরা আছি আপনার সাথে`,
    },
    {
      title: 'We-Centric Culture',
      titleBN: 'আমাদের সংস্কৃতি আমরা-কেন্দ্রিক',
      description:
        'We foster a culture where "we" is stronger than "I". Thrive with synergy and get the support without limits.',
      descriptionBN: `আমাদের সংস্কৃতি "আমি" নয় "আমরা"-তে বিশ্বাসী`,
    },
    {
      title: 'We Ignite Journeys',
      titleBN: 'আমরা প্রজ্জ্বলিত করি যাত্রাপথ',
      description: 'We build each other up, every day, Let’s ignite possibilities together.',
      descriptionBN: `আপনার ক্যারিয়ারের পথ উদ্ভাসিত করি সম্ভাবনার আলোয়`,
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
          >
            <LocalizedString en="View All Jobs" bn="চাকরির সুযোগ" />
          </GlobalButton>

          <Link href="/agent-onboarding">
            <GlobalButton
              size="large"
              className=" border border-white text-white bg-white/30 backdrop-blur-md  hover:bg-white/30 hover:border-white "
              text="Become an RO"
              variant="primary"
            >
              <LocalizedString en="Become an RO" bn="রিলেশনশিপ অফিসার" />
            </GlobalButton>
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
