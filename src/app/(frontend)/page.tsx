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
export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const heroSlides = [
    {
      title: 'Driven by Purpose,',
      subtitle: 'Designed for Life ',
      description:
        'Empower yourself to live on your terms. Enjoy the confidence of your potential and let us take the risk. ',
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

  return (
    <div className="font-avenir">
      {/* <HeroSection /> */}
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[255px] md:top-[355px] lg:top-[470px] xl:top-[490px]  2xl:top-[730px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <Button
            variant="primary"
            className="
            px-2 md:px-6 2xl:px-10
            py-1 md:py-2 2xl:py-6 
            rounded-[4px] lg:rounded-[8px] 
            w-[100px] md:w-[150px] lg:w-[208.41px] 2xl:w-[258.41px] 
            global-h4 font-normal"
          >
            Explore Now
          </Button>
          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <div className="p-1 rounded-full border-2 border-white 2xl:p-2">
              <BsPlay />
            </div>
            <div className="global-h4 font-normal ">From the Expert</div>
          </div>
        </div>
      </HeroSection>
      <SearchBarSection />
      <WhyChooseUsSection />
      <OnYourCueSection />
      <QuoteSection />
      {/* <InsuranceSimplifiedSection /> */}
      <VideoSection />
      <OpportunitiesSection />
      <NewsSection />
    </div>
  )
}
