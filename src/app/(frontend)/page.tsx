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
import { Button } from '@/components/ui/button'
import { BsPlay } from 'react-icons/bs'
import SearchBarSection from '@/components/custom/home/SearchBarSection'
import InsuranceSimplifiedLargeSection from '@/components/custom/home/InsuranceSimplifiedLargeSection'
import { InsuranceDataType } from '@/types'
import ToolTip from '@/components/custom/shared/ToolTip'
import GlobalButton from '@/components/custom/shared/GlobalButton'
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
        'Your life evolves, and so should your protection. Shanta Life Insurance  will make sure you stay ahead',
      image: '/assets/banner1.jpg',
    },
    {
      title: 'Building Better Futures',
      subtitle: 'One Step at a Time',
      description:
        'We walk with you on your journey, providing the tools you need to succeed and grow.',
      image: '/assets/banner2.jpg',
    },
    {
      title: 'Innovative Thinking',
      subtitle: 'Impactful Living',
      description: "Harness innovation to redefine your future. Together, let's make a difference.",
      image: '/assets/banner3.png',
    },
  ]

  const insuranceData: InsuranceDataType[] = [
    {
      sectionHeading: 'Life Insurance Simplified',
      content: 'left',
      title: 'Expert Knows - How',
      subtitle:
        'Life can be messy but your insurance doesn’t have to be. Learn how with our Experts',
      mainImage: '/assets/is1.jpg',
      mainVIdeoLink: 'https://www.youtube.com/embed/rcduE_ff314',
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
    {
      sectionHeading: '',
      content: 'right',
      title: 'Decode Life Insurance',
      subtitle: 'Detangle the basics of Life Insurace',
      mainImage: '/assets/is5.jpg',
      mainVIdeoLink: 'https://www.youtube.com/embed/Fj_BE9D64W4',
      insuranceCardData: [
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is6.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is7.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is8.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
      ],
    },
    {
      sectionHeading: '',
      content: 'left',
      title: 'Zero-Hassle protection',
      subtitle: 'Get your life covered fast, simple and smart',
      mainImage: '/assets/is9.jpg',
      mainVIdeoLink: 'https://www.youtube.com/embed/n9fFhLkJwLg',
      insuranceCardData: [
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is10.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is11.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
        {
          title: 'Lorem ipsum dolor sit amet consectetur.',
          image: '/assets/is12.jpg',
          description:
            'Lorem ipsum dolor sit amet consectetur. Massa et nulla urna massa. Cursus ornare rhoncus et orci imperdiet elementum nulla adipiscing dignissim.',
        },
      ],
    },
  ]

  return (
    <div className="font-avenir">
      {/* <HeroSection /> */}
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[245px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start cursor-not-allowed
        "
        >
          <ToolTip>
            {/* <Button
              variant="primary"
              className="
            cursor-not-allowed
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6
            h-[30px] md:h-[40px] lg:h-[45px] xl:h-[55px] 2xl:h-[60px] 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
            >
              Explore Now
            </Button> */}
            <GlobalButton
              size="large"
              variant="primary"
              text="Explore Now"
              className="cursor-not-allowed"
            />
          </ToolTip>

          <ToolTip className="flex items-center space-x-2 text-white 2xl:space-x-4">
            {/* <div className="p-1 rounded-full border-2 border-white 2xl:p-2">
              <BsPlay />
            </div>
            <div className="global-h4 font-normal ">From the Expert</div> */}
            <GlobalButton className="flex items-center space-x-2 px-4 py-2 bg-transparent hover:bg-transparent cursor-not-allowed">
              <div className="p-1 rounded-full border-2 border-white 2xl:p-2">
                <BsPlay />
              </div>
              <div className="global-h4 font-normal">From the Expert</div>
            </GlobalButton>
          </ToolTip>
        </div>
      </HeroSection>
      <SearchBarSection />
      <WhyChooseUsSection />
      <OnYourCueSection />
      <QuoteSection />
      <InsuranceSimplifiedSection />
      <div className="container-padding hidden md:block md:space-y-[30px] lg:space-y-[40px] xl:space-y-[80px] bg-white">
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
