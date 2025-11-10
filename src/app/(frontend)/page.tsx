import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import InsuranceSimplifiedSection from '@/components/custom/home/InsuranceSimplifiedSection'
import NewsSection from '@/components/custom/home/NewsSection'
import OnYourCueSection from '@/components/custom/home/OnYourCueSection'
import OpportunitiesSection from '@/components/custom/home/OpportunitiesSection'
import QuoteSection from '@/components/custom/home/QuoteSection'
import VideoSection from '@/components/custom/home/VideoSection'
import WhyChooseUsSection from '@/components/custom/home/WhyChooseUsSection'
import config from '@/payload.config'
import './styles.css'
// import { Button } from '@/components/ui/button'
import HeroSectionWrapper from '@/components/custom/home/HeroSectionWrapper'
import InsuranceSimplifiedLargeSection from '@/components/custom/home/InsuranceSimplifiedLargeSection'
import SearchBarSection from '@/components/custom/home/SearchBarSection'
import { InsuranceDataType } from '@/types'
import LottiePlayer from '@/components/custom/shared/LottiePlayer'
import OnYourCueSection2 from '@/components/custom/shared/plans/OnYourCueSection2'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const heroSlides = [
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',
      titleBN: 'বাঁচো সাহসে',
      subtitleBN: 'আত্মবিশ্বাসে',
      description:
        'Your life evolves, and so should your protection. Shanta Life Insurance ensures you stay ahead.',
      descriptionBN: `জীবনের পথচলায় অর্থনৈতিক সুরক্ষার নির্ভরযোগ্য সঙ্গী-শান্তা লাইফ ইন্স্যুরেন্স`,
      // image: '/assets/banners/banner3.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner3.jpg`,
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',

      titleBN: 'বাঁচো সাহসে',
      subtitleBN: 'আত্মবিশ্বাসে',
      description:
        'Your life evolves, and so should your protection. Shanta Life Insurance ensures you stay ahead.',
      descriptionBN: `জীবনের পথচলায় অর্থনৈতিক সুরক্ষার নির্ভরযোগ্য সঙ্গী-শান্তা লাইফ ইন্স্যুরেন্স`,
      // image: '/assets/banners/banner22.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner22.jpg`,
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',
      titleBN: 'বাঁচো সাহসে',
      subtitleBN: 'আত্মবিশ্বাসে',
      description:
        'Your life evolves, and so should your protection. Shanta Life Insurance ensures you stay ahead.',
      descriptionBN: `জীবনের পথচলায় অর্থনৈতিক সুরক্ষার নির্ভরযোগ্য সঙ্গী-শান্তা লাইফ ইন্স্যুরেন্স`,
      // image: '/assets/banners/banner1.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner1.jpg`,
    },
  ]

  const insuranceData: InsuranceDataType[] = [
    {
      sectionHeading: 'Life Insurance Simplified',
      content: 'left',
      title: 'Expert Know - How',
      titleBN: 'এক্সপার্টদের সাথে শিখুন',
      subtitle:
        'Life can be messy but your insurance doesn’t have to be. Learn how from our experts.',
      subtitleBN: 'ইন্স্যুরেন্স হোক সহজ ও নির্ভরশীল - জেনে নিন আজই।',
      // mainImage: '/assets/homepage/web/thumbnails/yt-thumbnail-1.jpg',
      mainImage: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-1.jpg`,
      // mainMobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-1.jpg',
      mainVIdeoLink: 'https://www.youtube.com/embed/rcduE_ff314',
      insuranceCardData: [
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/yt-thumbnail-4.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-4.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-4.jpg',
          videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
          description: '',
        },
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/yt-thumbnail-1.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-1.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-1.jpg',
          videoLink: 'https://www.youtube.com/embed/rcduE_ff314',
          description: '',
        },
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/yt-thumbnail-4.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-4.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-4.jpg',
          videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
          description: '',
        },
      ],
    },
    {
      sectionHeading: '',
      content: 'right',
      title: 'demystify Life Insurance',
      titleBN: 'জীবন বীমার খুঁটিনাটি',
      subtitle: 'Detangle the basics of Life Insurance.',
      subtitleBN: 'সহজ ভাষায় জীবন বীমা।',
      // mainImage: '/assets/homepage/web/thumbnails/yt-thumbnail-2.jpg',
      mainImage: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-2.jpg`,
      // mainMobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-2.jpg',
      mainVIdeoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
      insuranceCardData: [
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/yt-thumbnail-5.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-5.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-5.jpg',
          videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
          description: '',
        },
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/yt-thumbnail-6.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-6.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-6.jpg',
          videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
          description: '',
        },
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/yt-thumbnail-7.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/yt-thumbnail-7.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/yt-thumbnail-7.jpg',
          videoLink: 'https://www.youtube.com/embed/1CuBIcn5Ops',
          description: '',
        },
      ],
    },
    {
      sectionHeading: '',
      content: 'left',
      title: 'Zero-Hassle protection',
      titleBN: 'সুরক্ষার নির্ভরতা  - ঝামেলাহীন',
      subtitle: 'Get your life covered - fast, simple & smart.',
      subtitleBN: 'আপনার জীবনের আর্থিক নিরাপত্তার শুরু এখানেই - সহজ, স্বচ্ছ ও ঝামেলাহীন।',
      // mainImage: '/assets/homepage/web/thumbnails/1.png',
      mainImage: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/1.png`,
      // mainMobileImage: '/assets/homepage/mobile/thumbnails/1.png',
      mainVIdeoLink: 'https://youtube.com/embed/n9fFhLkJwLg',
      insuranceCardData: [
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/1.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/1.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/1.jpg',
          videoLink: 'https://youtube.com/embed/n9fFhLkJwLg',
          description: '',
        },
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/2.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/2.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/2.jpg',
          videoLink: 'https://www.youtube.com/embed/mUn_HAvpbag',
          description: '',
        },
        {
          title: '',
          // image: '/assets/homepage/web/thumbnails/3.jpg',
          image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/thumbnails/3.jpg`,
          // mobileImage: '/assets/homepage/mobile/thumbnails/3.jpg',
          videoLink: 'https://www.youtube.com/embed/DzMzN76gELM',
          description: '',
        },
      ],
    },
  ]

  const cueData = {
    sectionHeading: `Let's do this`,
    sectionHeadingBN: `আপনার প্ল্যান`,
    sectionTitle: `On Your Terms`,
    highlighedSectionTitle: 'Terms',
    sectionTitleBN: 'আপনার পছন্দ',
    highlighedSectionTitleBN: 'পছন্দ',
    description: `Advance your ambitions with Life Insurance tailored to you. Enjoy flexible options,
        affordable premiums, and hassle-free claims.`,
    descriptionBN: `সহজ ও স্বল্প প্রিমিয়াম এবং ঝামেলামুক্ত ক্লেইম প্রসেস - কন্ট্রোল এখন আপনার হাতে।`,
    cards: [
      {
        // icon: '/assets/homepage/web/cue2.png',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue2.png`,
        // mobileIcon: '/assets/homepage/mobile/cue2.png',
        title: 'Shanta',
        titleBN: 'শান্তা',
        subtitle: 'Child Education Plan',
        subtitleBN: 'চাইল্ড এডুকেশন প্ল্যান',
        description: 'They’re building castles in the sky — we’re here to anchor the ground.',
        descriptionBN: 'তাদের স্বপ্নের ঘুড়ি যেন উড়ে বাঁধাহীন।',
        // image: '/assets/homepage/web/child-education.jpg',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/child-education.jpg`,
        // mobileImage: '/assets/homepage/mobile/child-education.jpg',
        link: '/plans/individual/child-education',
      },
      {
        // icon: '/assets/homepage/web/cue1.png',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue1.png`,
        // mobileIcon: '/assets/homepage/mobile/cue1.png',
        title: 'Shanta',
        titleBN: 'শান্তা',
        subtitle: 'Multi Stage Maturity Plans',
        subtitleBN: 'মাল্টি স্টেজ ম্যাচিউরিটি প্ল্যান ',
        description: 'Multiple payouts, 2 powerful plans - because your future is in your hands.',
        descriptionBN: '২টি পাওয়ারফুল প্ল্যান - ধাপে ধাপে অর্থপ্রাপ্তির নিশ্চয়তা।',
        // image: '/assets/homepage/web/multi-stage.jpg',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/multi-stage.jpg`,
        // mobileImage: '/assets/homepage/mobile/multi-stage.jpg',
        link: '/plans/individual/saving-and-investment/multistage',
      },
      {
        // icon: '/assets/homepage/web/cue3.png',
        icon: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/cue3.png`,
        // mobileIcon: '/assets/homepage/mobile/cue3.png',
        title: 'Shanta',
        titleBN: 'শান্তা',
        subtitle: 'Endowment Plan',
        subtitleBN: 'এনডাওমেন্ট প্ল্যান',
        description: 'For the life you’re building and the ones you’re building it for.',
        descriptionBN: 'নিজ ও প্রিয়জনের আর্থিক সুরক্ষায় অবিচল নির্ভরতা।',
        // image: '/assets/homepage/web/endowment.jpg',
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/endowment.jpg`,
        // mobileImage: '/assets/homepage/mobile/endowment.jpg',
        link: '/plans/individual/saving-and-investment/endowment',
      },
    ],
  }

  return (
    <div className="font-avenir">
      {/* <HeroSection /> */}
      <HeroSectionWrapper heroSlides={heroSlides} isHome />
      <SearchBarSection />
      <WhyChooseUsSection />
      {/* <OnYourCueSection /> */}
      <OnYourCueSection2 data={cueData} bg="#FFFFFF" />
      <QuoteSection />

      <div className="bg-white py-12 md:hidden">
        <InsuranceSimplifiedSection data={insuranceData} />
      </div>
      <div className="container-padding hidden md:block space-y-[20px] md:space-y-[40px] lg:space-y-[50px] xl:space-y-[100px] bg-white">
        {insuranceData?.map((data, i) => (
          <InsuranceSimplifiedLargeSection key={i} data={data} content={data?.content} />
        ))}
      </div>

      <VideoSection />
      <OpportunitiesSection />
      <NewsSection />
    </div>
  )
}
