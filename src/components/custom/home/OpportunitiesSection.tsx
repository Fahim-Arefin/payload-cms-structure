import React from 'react'

import OpportunitiesHeader from './OpportunitiesHeader'
import GlobalSwiper from '../shared/GlobalSwiper'

const opportunitiesData = [
  { src: '/assets/life-at-shanta/swiper11.jpg', alt: 'Slide 1' },
  { src: '/assets/life-at-shanta/swiper22.jpg', alt: 'Slide 2' },
  { src: '/assets/life-at-shanta/swiper33.jpg', alt: 'Slide 3' },
  { src: '/assets/life-at-shanta/swiper44.jpg', alt: 'Slide 4' },
  { src: '/assets/life-at-shanta/swiper55.jpg', alt: 'Slide 5' },
  { src: '/assets/life-at-shanta/swiper66.jpg', alt: 'Slide 6' },
  { src: '/assets/life-at-shanta/swiper77.jpg', alt: 'Slide 7' },
]

export default function OpportunitiesSection() {
  return (
    // <div className="w-full lg:w-[85%] 2xl:w-[70%] mx-auto px-4 lg:px-0 mt-12">
    <div className="container-wpm">
      <OpportunitiesHeader />

      <div className="">
        {/* <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView={5} // ✅ use only one
          coverflowEffect={{
            //   rotate: 30,
            rotate: 30,
            stretch: 0,
            depth: 200,
            //   depth: 100,
            //   modifier: 1,
            //   modifier: 2,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
          // gap
          spaceBetween={20}
        >
          {Array.from({ length: 19 }).map((_, i) => (
            <SwiperSlide key={i}>
              <img
                src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`}
                alt={`Slide ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper> */}

        <GlobalSwiper slidesData={opportunitiesData} />
      </div>
    </div>
  )
}
