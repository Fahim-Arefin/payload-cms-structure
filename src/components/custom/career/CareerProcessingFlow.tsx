'use client'
import Image from 'next/image'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
// import your navigation buttons if you have

const processData = [
  {
    img: '/assets/process1.png',
    title: 'INITIAL SCREENING',
  },
  {
    img: '/assets/process2.png',
    title: 'PRELIMINARY DISCUSSION',
  },
  {
    img: '/assets/process3.png',
    title: 'ASSESSMENT CENTER',
  },
  {
    img: '/assets/process4.png',
    title: 'FINAL INTERVIEW',
  },
  {
    img: '/assets/process5.png',
    title: 'ON BOARDING',
  },
]

export default function CareerProcessingFlow() {
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
    <section className="container-padding w-full py-12 flex flex-col bg-white">
      {/* Header */}
      <div className="mb-10">
        <span className="global-h3 text-[#343434] font-light block mb-0">OUR SELECTION</span>
        <h2 className="global-h1 font-bold">
          <span className="text-[#ED7125]">PROCESS</span>
        </h2>
      </div>

      {/* Always Carousel: For ALL screens! */}
      <div className="w-full  relative overflow-hidden">
        <Carousel opts={{ align: 'start', loop: false }} setApi={setCarouselApi}>
          <CarouselContent className="flex items-stretch">
            {processData.map((item, i) => (
              <CarouselItem
                key={i}
                className={`
                  flex flex-col items-center justify-start px-2
                  w-[85vw] sm:w-[56vw] md:w-[39vw] xl:w-[260px] 2xl:w-[230px]
                  max-w-[250px] md:max-w-[320px] xl:max-w-[220px] 2xl:max-w-[270px]
                `}
              >
                {/* Top line & numbers */}
                <div className="relative w-full flex items-center mb-6" style={{ height: 44 }}>
                  {/* Line */}
                  <div
                    className={`absolute top-1/2 right-0 h-1 border-t border-[#000000] z-0 ${i == processData.length - 1 ? 'right-1/2' : 'right-0'} ${i == 0 ? 'left-1/2' : 'left-0'}`}
                  />
                  <div className="relative flex flex-row items-center justify-center w-full z-10">
                    {/* Step number */}
                    <div
                      style={{ boxShadow: '0px 4px 6px 0px #00000033 inset' }}
                      className="w-[38px] h-[38px] xl:w-[40px] xl:h-[40px] bg-white border border-[#E0E0E0] rounded-[10px] flex items-center justify-center text-[19px] font-bold text-[#343434] z-10 relative"
                    >
                      {i + 1}
                    </div>
                    {/* Arrow if not last */}
                    {i < processData.length - 1 && (
                      <div className="absolute right-[-26px] top-1/2 -translate-y-1/2 z-10">
                        <img
                          src="/assets/process-arrow.png"
                          alt="Arrow"
                          className="w-[26px] h-[16px] select-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* Card */}
                <div className="flex flex-col items-center text-center w-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="rounded-[12px] mb-2 w-[125px] h-[106px] md:w-[186px] md:h-[157px] object-contain"
                    draggable={false}
                  />
                  <span className="mt-2 text-[#343434] text-center text-[12px] font-medium uppercase max-w-[145px] mx-auto leading-tight break-words">
                    {item.title}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation buttons */}
          <div className="flex md:hidden gap-2 justify-center mt-10">
            <CarouselNavButtons
              onPrev={() => carouselApi?.scrollPrev()}
              onNext={() => carouselApi?.scrollNext()}
              hasPrev={canScrollPrev}
              hasNext={canScrollNext}
            />
          </div>
        </Carousel>
      </div>
    </section>
  )
}
