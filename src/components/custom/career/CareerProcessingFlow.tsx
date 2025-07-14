'use client'
import Image from 'next/image'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
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
  return (
    <section className="container-padding w-full py-12 flex flex-col items-center bg-white">
      {/* Header */}
      <div className="mb-10">
        <span className="global-h3 text-[#343434] font-light block mb-0">OUR SELECTION</span>
        <h2 className="global-h1 font-bold tracking-tight">
          <span className="text-[#ED7125]">PROCESS</span>
        </h2>
      </div>

      {/* Always Carousel: For ALL screens! */}
      <div className="w-full max-w-[1200px] relative overflow-hidden">
        <Carousel opts={{ align: 'start', loop: false }}>
          <CarouselContent className="flex items-stretch">
            {processData.map((item, i) => (
              <CarouselItem
                key={i}
                className={`
                  flex flex-col items-center justify-start px-2
                  w-[85vw] sm:w-[56vw] md:w-[39vw] xl:w-[260px] 2xl:w-[230px]
                  max-w-[330px] md:max-w-[320px] xl:max-w-[260px]
                `}
              >
                {/* Top line & numbers */}
                <div className="relative w-full flex items-center mb-6" style={{ height: 44 }}>
                  {/* Line */}
                  <div className="absolute top-1/2 left-0 right-0 h-1 border-t border-[#C3C3C3] z-0" />
                  <div className="relative flex flex-row items-center justify-center w-full z-10">
                    {/* Step number */}
                    <div className="w-[38px] h-[38px] bg-white border border-[#E0E0E0] rounded-[10px] flex items-center justify-center text-[19px] font-bold text-[#343434] shadow-sm z-10 relative">
                      {i + 1}
                    </div>
                    {/* Arrow if not last */}
                    {i < processData.length - 1 && (
                      <div className="absolute right-[-32px] top-1/2 -translate-y-1/2 z-10">
                        <Image
                          src="/assets/process-arrow.png"
                          alt="Arrow"
                          width={26}
                          height={16}
                          className="w-[26px] h-[16px] select-none"
                        />
                      </div>
                    )}
                  </div>
                </div>
                {/* Card */}
                <div className="flex flex-col items-center text-center w-full">
                  <Image
                    src={item.img}
                    alt={item.title}
                    width={110}
                    height={80}
                    className="rounded-[12px] mb-2 w-[110px] h-[80px] object-contain"
                    draggable={false}
                  />
                  <span className="mt-2 text-[#343434] text-[12px] font-medium tracking-wide uppercase">
                    {item.title}
                  </span>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Navigation buttons */}
          <div className="flex justify-center mt-6 gap-3">
            {/* Place your CarouselNavButtons here */}
          </div>
        </Carousel>
      </div>
    </section>
  )
}
