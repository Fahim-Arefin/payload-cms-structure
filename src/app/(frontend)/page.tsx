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
      titleBN: 'বাঁচো সাহসে,',
      subtitleBN: 'আত্মবিশ্বাসে',
      description:
        'Your life evolves, and so should your protection... Shanta Life Insurance ensures you stay ahead.',
      descriptionBN: `জীবনের পথচলায় অর্থনৈতিক সুরক্ষার নির্ভরযোগ্য সঙ্গী-শান্তা লাইফ ইন্স্যুরেন্স।`,
      // image: '/assets/banners/banner3.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner3.jpg`,
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',

      titleBN: 'বাঁচো সাহসে,',
      subtitleBN: 'আত্মবিশ্বাসে',
      description:
        'Your life evolves, and so should your protection... Shanta Life Insurance ensures you stay ahead.',
      descriptionBN: `জীবনের পথচলায় অর্থনৈতিক সুরক্ষার নির্ভরযোগ্য সঙ্গী-শান্তা লাইফ ইন্স্যুরেন্স।`,
      // image: '/assets/banners/banner22.jpg',
      image: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/banners/banner22.jpg`,
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',
      titleBN: 'বাঁচো সাহসে,',
      subtitleBN: 'আত্মবিশ্বাসে',
      description:
        'Your life evolves, and so should your protection... Shanta Life Insurance ensures you stay ahead.',
      descriptionBN: `জীবনের পথচলায় অর্থনৈতিক সুরক্ষার নির্ভরযোগ্য সঙ্গী-শান্তা লাইফ ইন্স্যুরেন্স।`,
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
      subtitleBN: 'ইন্সুরেন্স হোক সহজ ও নির্ভরশীল - জেনে নিন আজই।',
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
      subtitleBN: 'জীবন বীমার সহজ টার্মস।',
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
      titleBN: 'সুরক্ষার নির্ভরতা  - ঝামেলাবিহীন',
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

  return (
    <div className="font-avenir">
      {/* <HeroSection /> */}
      <HeroSectionWrapper heroSlides={heroSlides} isHome />
      <SearchBarSection />
      <WhyChooseUsSection />
      <OnYourCueSection />
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
