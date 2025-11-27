'use client'
import Image from 'next/image'
import { Carousel, CarouselApi, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { useEffect, useState } from 'react'
import CarouselNavButtons from '../shared/CarousalNavButtons'
import LocalizedText from '../shared/LocalizedText'
import { CareerPageProcessingBlockType } from '@/types/payloadCustomTypes'
import { formatLocalizedNumber } from '@/utils/numberLocalization'
import useSSRLanguage from '@/hooks/useSSRLanguage'
// import your navigation buttons if you have

// const processData = [
//   {
//     img: '/assets/career/web/process1.png',
//     mobileImg: '/assets/career/mobile/process1.png',
//     title: 'INITIAL SCREENING',
//     titleBN: 'প্রারম্ভিক বাছাই',
//   },
//   {
//     img: '/assets/career/web/process2.png',
//     mobileImg: '/assets/career/mobile/process2.png',
//     title: 'PRELIMINARY DISCUSSION',
//     titleBN: 'প্রাথমিক আলোচনা',
//   },
//   {
//     img: '/assets/career/web/process3.png',
//     mobileImg: '/assets/career/mobile/process3.png',
//     title: 'ASSESSMENT CENTER',
//     titleBN: 'মূল্যায়ন কেন্দ্র',
//   },
//   {
//     img: '/assets/career/web/process4.png',
//     mobileImg: '/assets/career/mobile/process4.png',
//     title: 'FINAL INTERVIEW',
//     titleBN: 'সাক্ষাৎকার',
//   },
//   {
//     img: '/assets/career/web/process5.png',
//     mobileImg: '/assets/career/mobile/process5.png',
//     title: 'ON BOARDING',
//     titleBN: 'যোগদান',
//   },
// ]

type Props = {
  processData: CareerPageProcessingBlockType
}

export default function CareerProcessingFlow({ processData }: Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)
  const lang = useSSRLanguage()
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
      <div className="mb-10 uppercase">
        <span className="global-h3 text-[#343434] font-light block mb-0">
          <LocalizedText en={processData?.title} bn={processData?.titleBN} />
        </span>
        <h2 className="global-h1 font-bold">
          <span className="text-[#ED7125]">
            <LocalizedText en={processData?.subtitle} bn={processData?.subtitleBN} />
          </span>
        </h2>
      </div>

      {/* Always Carousel: For ALL screens! */}

      <div className="w-full relative overflow-hidden">
        <Carousel opts={{ align: 'start', loop: false }} setApi={setCarouselApi}>
          <CarouselContent className="flex items-stretch">
            {processData?.processingCards.map((item, i) => (
              <CarouselItem
                key={i}
                className="
                  flex flex-col items-center justify-start px-2
                  w-[85vw] sm:w-[56vw] md:w-[35vw] lg:w-[100vw] xl:w-[260px] 2xl:w-[230px]
                  max-w-[340px] md:max-w-fit lg:max-w-fit xl:max-w-fit 2xl:max-w-[270px]
                "
              >
                {/* Top line & numbers */}
                <div className="relative w-full flex items-center mb-6" style={{ height: 44 }}>
                  {/* Line */}
                  <div
                    className={`absolute top-1/2 right-0 h-1 border-t border-[#000000] z-0 ${i == processData?.processingCards.length - 1 ? 'right-1/2' : 'right-0'} ${i == 0 ? 'left-1/2' : 'left-0'}`}
                  />
                  <div className="relative flex flex-row items-center justify-center w-full z-10">
                    {/* Step number (localized) */}
                    <div
                      style={{ boxShadow: '0px 4px 6px 0px #00000033 inset' }}
                      className="w-[38px] h-[38px] xl:w-[40px] xl:h-[40px] bg-white border border-[#E0E0E0] rounded-[10px] flex items-center justify-center text-[19px] font-bold text-[#343434] z-10 relative"
                    >
                      {formatLocalizedNumber(i + 1, lang)}
                    </div>
                    {/* Arrow if not last */}
                    {i < processData?.processingCards.length - 1 && (
                      <div className="absolute right-[-26px] top-1/2 -translate-y-1/2 z-10">
                        <img
                          src="/assets/career/web/process-arrow.png"
                          alt="Arrow"
                          className="w-[26px] h-[16px] select-none"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Card */}
                <>
                  {typeof item?.image === 'object' && item?.image?.url && (
                    <div className="flex flex-col items-center text-center w-full">
                      <div className="hidden md:block mb-2">
                        <Image
                          src={item?.image?.url}
                          alt={item?.title || 'process image'}
                          width={186}
                          height={157}
                          className="rounded-[12px] w-[186px] h-[157px] object-contain"
                          placeholder="blur"
                          blurDataURL={item?.imageBlurDataURL || ''}
                          quality={80}
                        />
                      </div>
                      {/* Mobile */}
                      <div className="block md:hidden mb-2">
                        <Image
                          src={item?.image?.url}
                          alt={item?.title || 'process image'}
                          width={186}
                          height={157}
                          className="rounded-[12px] w-[186px] h-[157px] object-contain"
                          placeholder="blur"
                          blurDataURL={item?.imageBlurDataURL || ''}
                          quality={80}
                        />
                      </div>
                      <span className="mt-2 text-[#343434] text-center text-[12px] font-medium uppercase max-w-[145px] mx-auto leading-tight break-words">
                        <LocalizedText en={item?.title} bn={item?.titleBN} />
                      </span>
                    </div>
                  )}
                </>
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
