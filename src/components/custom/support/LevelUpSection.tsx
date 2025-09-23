'use client'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import LevelUpCard from './LevelUpCard'
import Autoplay from 'embla-carousel-autoplay'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  data: {
    image: string
    mobileImage: string
    title: string
    link?: string
  }[]
}

function LevelUpSection({ data }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  useEffect(() => {
    if (!carouselApi) return

    const updateScrollButtons = () => {
      setCanScrollPrev(carouselApi.canScrollPrev())
      setCanScrollNext(carouselApi.canScrollNext())
    }

    updateScrollButtons()
    carouselApi.on('select', updateScrollButtons)

    return () => {
      carouselApi.off('select', updateScrollButtons)
    }
  }, [carouselApi])

  return (
    <div className="pb-24">
      <div
        className="w-[80%] lg:w-[85%] xl:w-[72%] mx-auto
   py-[50px] lg:py-[70px] xl:py-[100px] 2xl:py-[120px] space-y-2"
      >
        <h1 className="global-h1 uppercase font-semibold text-[#1E1E1E]">
          <LocalizedHighlighted
            textBn="এক্সপার্টদের কাছে শিখুন"
            highlightBn={`শিখুন`}
            textEn={`Level up with our experts`}
            highlightEn={`our experts`}
            highlightClassName="text-[#ED7125]"
          />
        </h1>
        <p className="text-[12px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[32px] text-[#434343]">
          <LocalizedText
            en={`Level up your financial literacy game with our Industry Experts `}
            bn={`আপনার ফিনান্সিয়াল গেম আরো তীক্ষ্ণ করতে এক্সপার্টদের সাহায্য নিন `}
          />
        </p>
      </div>
      <div className="px-2">
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
            }),
          ]}
          className=""
          setApi={setCarouselApi}
        >
          <CarouselContent className="">
            {data?.map((item, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/3  md:pl-0 -ml-2 md:ml-2">
                <LevelUpCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Carousel Navigation */}
          <div
            className="lg:hidden flex gap-2 absolute h-fit
                  inset-x-0 justify-center lg:justify-end -bottom-10 md:-bottom-12 lg:-top-8 2xl:-top-12 lg:right-0"
          >
            <CarouselNavButtons
              onPrev={() => carouselApi?.scrollPrev()}
              onNext={() => carouselApi?.scrollNext()}
              hasPrev={canScrollPrev}
              hasNext={canScrollNext}
            />
          </div>
        </Carousel>
      </div>
    </div>
  )
}

export default LevelUpSection
