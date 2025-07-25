import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import WhyChooseUsSection from '@/components/custom/home/WhyChooseUsSection'
import config from '@/payload.config'
import './styles.css'
import OnYourCueSection from '@/components/custom/home/OnYourCueSection'
import InsuranceSimplifiedSection from '@/components/custom/home/InsuranceSimplifiedSection'
import VideoSection from '@/components/custom/home/VideoSection'
import QuoteSection from '@/components/custom/home/QuoteSection'
import OpportunitiesSection from '@/components/custom/home/OpportunitiesSection'
import NewsSection from '@/components/custom/home/NewsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
// import { Button } from '@/components/ui/button'
import { BsPlay } from 'react-icons/bs'
import SearchBarSection from '@/components/custom/home/SearchBarSection'
import InsuranceSimplifiedLargeSection from '@/components/custom/home/InsuranceSimplifiedLargeSection'
import { InsuranceDataType } from '@/types'
import ToolTip from '@/components/custom/shared/ToolTip'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import HeroSectionWrapper from '@/components/custom/home/HeroSectionWrapper'

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
      description:
        'Your life evolves, and so should your protection.. Shanta Life Insurance ensures you stay ahead.',
      image: '/assets/homepage/banner3.jpg',
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',
      description:
        'Your life evolves, and so should your protection. Shanta Life Insurance ensures you stay ahead.',
      image: '/assets/homepage/banner2.jpg',
    },
    {
      title: 'Empower yourself',
      subtitle: 'to live on your terms',
      description:
        'Your life evolves, and so should your protection. Shanta Life Insurance ensures you stay ahead.',
      image: '/assets/homepage/banner1.jpg',
    },
  ]

  const insuranceData: InsuranceDataType[] = [
    {
      sectionHeading: 'Life Insurance Simplified',
      content: 'left',
      title: 'Expert Know - How',
      subtitle:
        'Life can be messy but your insurance doesn’t have to be. Learn how from our Experts.',
      mainImage: '/assets/thumbnails/yt-thumbnail-1.jpg',
      mainVIdeoLink: 'https://www.youtube.com/embed/rcduE_ff314',
      insuranceCardData: [
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-4.jpg',
          videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
          description: '',
        },
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-1.jpg',
          videoLink: 'https://www.youtube.com/embed/rcduE_ff314',
          description: '',
        },
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-4.jpg',
          videoLink: 'https://www.youtube.com/embed/YbnlDrexiGE',
          description: '',
        },
      ],
    },
    {
      sectionHeading: '',
      content: 'right',
      title: 'demystify Life Insurance',
      subtitle: 'Detangle the basics of Life Insurance.',
      mainImage: '/assets/thumbnails/yt-thumbnail-2.jpg',
      mainVIdeoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
      insuranceCardData: [
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-5.jpg',
          videoLink: 'https://www.youtube.com/embed/CkKkdNkBk9g',
          description: '',
        },
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-6.jpg',
          videoLink: 'https://www.youtube.com/embed/h11sOPnfnhw',
          description: '',
        },
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-7.jpg',
          videoLink: 'https://www.youtube.com/embed/1CuBIcn5Ops',
          description: '',
        },
      ],
    },
    {
      sectionHeading: '',
      content: 'left',
      title: 'Zero-Hassle protection',
      subtitle: 'Get your life covered - fast, simple & smart.',
      mainImage: '/assets/thumbnails/yt-thumbnail-3.jpg',
      mainVIdeoLink: 'https://youtube.com/embed/n9fFhLkJwLg',
      insuranceCardData: [
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-8.jpg',
          videoLink: 'https://www.youtube.com/embed/mUn_HAvpbag',
          description: '',
        },
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-9.jpg',
          videoLink: 'https://www.youtube.com/embed/DzMzN76gELM',
          description: '',
        },
        {
          title: '',
          image: '/assets/thumbnails/yt-thumbnail-3.jpg',
          videoLink: 'https://youtube.com/embed/n9fFhLkJwLg',
          description: '',
        },
      ],
    },
  ]

  // const email = await payload.sendEmail({
  //   to: 'mauchchhash@gmail.com',
  //   subject: 'hello from shanta',
  //   text: 'hello from shanta',
  // })

  return (
    <div className="font-avenir">
      {/* <HeroSection /> */}
      <HeroSectionWrapper heroSlides={heroSlides} />
      <SearchBarSection />
      <WhyChooseUsSection />
      <OnYourCueSection />
      <QuoteSection />
      <InsuranceSimplifiedSection />
      <div className="container-padding hidden md:block md:space-y-[40px] lg:space-y-[50px] xl:space-y-[100px] bg-white">
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
