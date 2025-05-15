import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { fileURLToPath } from 'url'

import HeroSection from '@/components/custom/home/HeroSection'
import WhyChooseUsSection from '@/components/custom/home/WhyChooseUsSection'
import config from '@/payload.config'
import './styles.css'
import OnYourCueSection from '@/components/custom/home/OnYourCueSection'
import InsuranceSimplifiedSection from '@/components/custom/home/InsuranceSimplifiedSection'
import VideoSection from '@/components/custom/home/VideoSection'
import QuoteSection from '@/components/custom/home/QuoteSection'
import OpportunitiesSection from '@/components/custom/home/OpportunitiesSection'
import NewsSection from '@/components/custom/home/NewsSection'
export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="font-avenir">
      <HeroSection />
      <WhyChooseUsSection />
      <OnYourCueSection />
      <QuoteSection />
      <InsuranceSimplifiedSection />
      <VideoSection />
      <OpportunitiesSection />
      <NewsSection />
    </div>
  )
}
