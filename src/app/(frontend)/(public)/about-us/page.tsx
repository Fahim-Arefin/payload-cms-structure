import AllAboutSection from '@/components/custom/about-us/AllAboutSection'
import ShantaLifeIntroSection from '@/components/custom/about-us/ShantaLifeIntroSection'
import VisionMissionSection from '@/components/custom/about-us/VisionMissionSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import React from 'react'

function page() {
  const heroSlides = [
    {
      title: 'MORE THAN INSURANCE',
      subtitle: '',
      description:
        'At Shanta Life, our values aren\u2019t just nice words — they\u2019re the GPS guiding every decision, every smile, and every we\u2019ve got you covered moment.',
      image: '/assets/banner3.png',
    },
    // {
    //   title: 'Building Better Futures',
    //   subtitle: 'One Step at a Time',
    //   description:
    //     'We walk with you on your journey, providing the tools you need to succeed and grow.',
    //   image: '/assets/banner2.jpg',
    // },
    // {
    //   title: 'Innovative Thinking',
    //   subtitle: 'Impactful Living',
    //   description: "Harness innovation to redefine your future. Together, let's make a difference.",
    //   image: '/assets/banner1.jpg',
    // },
  ]

  const shantaIntroContent = {
    heading: 'Advancing',
    subheading: 'A Legacy of Setting Standards',
    paragraphTitle: 'Trust is our base. The future is our move.',
    image: '/assets/shantaIntroImage.png',
    paragraph:
      'Shanta Life enters the insurance landscape with a singular, powerful advantage: the backing of a financial and industrial powerhouse. Powered by the combined force of Shanta’s unmatched foundation.',
  }
  const vissionMissionContent = {
    visionDescription:
      'To be the most trusted insurance brand by protecting the uncertainties of life through simple solutions and delivering maximum value.',
    missionDescription:
      'To promote the desired quality of life through innovation, digitalization and customer centricity.',
  }

  return (
    <div className="font-avenir">
      <HeroSection heroSlides={heroSlides} />
      <ShantaLifeIntroSection shantaIntroContent={shantaIntroContent} />
      <VisionMissionSection vissionMissionContent={vissionMissionContent} />
      <AllAboutSection />
    </div>
  )
}

export default page
