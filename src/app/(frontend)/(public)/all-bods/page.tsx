import { ProfileSection } from '@/components/custom/all-bods/ProfileSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { directors } from '@/lib/data'
import { Directors } from '@/types'
import React, { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Board of Directors',
      description: '',
      image: '/assets/all-bod-Banner.jpg',
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[578px] "
        top=" top-[150px] md:top-[200px] lg:top-[63%]"
      />
      <div className="bg-[#FCF6EF]">
        {directors.map((director, i) => (
          <div key={director.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'} py-10`}>
            <ProfileSection director={director} reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
