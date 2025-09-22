import { ProfileSection } from '@/components/custom/all-bods/ProfileSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { leaders } from '@/lib/data'
import React, { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Leadership Team',
      subtitleBN: 'লিডারশিপ টিম',
      description: '',
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/leadersBanner.jpg`,
    },
  ]

  return (
    <div className="font-avenir">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[578px] "
        top=" top-[150px] md:top-[200px] lg:top-[63%]"
      />
      <div className="">
        {leaders.map((leader, i) => (
          <div key={leader.id} className={`${i % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'} py-10`}>
            <ProfileSection data={leader} titleColor="#9C8639" reverse={i % 2 === 1} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default page
