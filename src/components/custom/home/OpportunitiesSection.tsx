import { LifeAtShantaBlockType } from '@/types/payloadCustomTypes'
import GlobalSwiper from '../shared/GlobalSwiper'
import OpportunitiesHeader from './OpportunitiesHeader'

const opportunitiesData = [
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper55.jpg`,
    alt: 'Slide 5',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper22.jpg`,
    alt: 'Slide 2',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper11.jpg`,
    alt: 'Slide 1',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper33.jpg`,
    alt: 'Slide 3',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper44.jpg`,
    alt: 'Slide 4',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper66.jpg`,
    alt: 'Slide 6',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper77.jpg`,
    alt: 'Slide 7',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper88.jpg`,
    alt: 'Slide 8',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper99.jpg`,
    alt: 'Slide 9',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper100.jpg`,
    alt: 'Slide 10',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper101.jpg`,
    alt: 'Slide 11',
  },
  {
    src: `${process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/life-at-shanta/swiper102.jpg`,
    alt: 'Slide 12',
  },
]

type Props = {
  lifeAtShantaData: LifeAtShantaBlockType
}

export default async function OpportunitiesSection({ lifeAtShantaData }: Props) {
  return (
    <>
      <div className="container-width">
        <OpportunitiesHeader data={lifeAtShantaData} />

        <div className="">
          <GlobalSwiper slidesData={lifeAtShantaData?.gallery} />
        </div>
      </div>
    </>
  )
}
