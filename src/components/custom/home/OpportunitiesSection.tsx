import React from 'react'

import OpportunitiesHeader from './OpportunitiesHeader'
import GlobalSwiper from '../shared/GlobalSwiper'

const opportunitiesData = [
  {
    src: '/assets/homepage/web/life-at-shanta/swiper55.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper55.jpg',
    alt: 'Slide 5',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper22.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper22.jpg',
    alt: 'Slide 2',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper11.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper11.jpg',
    alt: 'Slide 1',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper33.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper33.jpg',
    alt: 'Slide 3',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper44.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper44.jpg',
    alt: 'Slide 4',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper66.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper66.jpg',
    alt: 'Slide 6',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper77.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper77.jpg',
    alt: 'Slide 7',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper88.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper88.jpg',
    alt: 'Slide 8',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper99.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper99.jpg',
    alt: 'Slide 9',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper100.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper100.jpg',
    alt: 'Slide 10',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper101.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper101.jpg',
    alt: 'Slide 11',
  },
  {
    src: '/assets/homepage/web/life-at-shanta/swiper102.jpg',
    mobileSrc: '/assets/homepage/mobile/life-at-shanta/swiper102.jpg',
    alt: 'Slide 12',
  },
]

export default function OpportunitiesSection() {
  return (
    // <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto px-4 lg:px-0 mt-12">
    <div className="container-wpm ">
      <OpportunitiesHeader />

      <div className="">
        <GlobalSwiper slidesData={opportunitiesData} />
      </div>
    </div>
  )
}
