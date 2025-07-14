import React, { FC } from 'react'
import { OurStoryDataType } from '@/types'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import InsuranceCard from '../home/InsuranceCard'
import CareerStoryCard from './CareerStoryCard'

type CareerOurStoryLgProps = {
  data: OurStoryDataType
}

const CareerOurStoryLg: FC<CareerOurStoryLgProps> = ({ data }) => {
  return (
    <div className="">
      <div className="">
        {/* headline */}

        <div className={cn(`space-y-6`)}>
          {/* 1st row */}
          <div className={cn(`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-0`)}>
            {/* Left Text Section */}
            <div className={cn(`text-[#434343] flex flex-col justify-center`, 'order-1')}>
              <h4 className="font-light hidden md:block global-h3 uppercase">{data?.title}</h4>
              <h4 className="text-[#ED7125] hidden md:block font-semibold global-h1">
                {data?.subtitle}
              </h4>
              <h4 className="block md:hidden text-base uppercase">
                Shanta Life <span className="text-[#ED7125]">Unveiled</span>
              </h4>
            </div>
            {/* <div>
              <h4 className="block md:hidden text-[16px] uppercase">
                Shanta Life <span className="text-[#ED7125]">Unveiled</span>
              </h4>
            </div> */}
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className={cn(
                    `relative group cursor-pointer h-[200px] lg:h-[250px] xl:h-[300px] w-full bg-no-repeat bg-[length:100%_212.5%] bg-[position:0px_-180.566px] md:rounded-[5.333px_5.333px_53.333px_5.333px] lg:rounded-[8.333px_8.333px_53.333px_8.333px] overflow-hidden transition-all`,
                    'order-1',
                  )}
                  style={{
                    backgroundImage: `url(${data.mainImage})`,
                  }}
                >
                  {/* Hover dark overlay */}
                  {/* <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition duration-300 rounded-[8.333px_8.333px_53.333px_8.333px]" /> */}

                  {/* Play Button */}
                  <div className="absolute -bottom-0 lg:-bottom-0.5 xl:-bottom-2 -right-0 lg:-right-1 xl:-right-1">
                    <img
                      src="/assets/play2.svg"
                      alt=""
                      className="w-[65px] lg:w-[80px] xl:w-[100px]  
                  h-[65px] lg:h-[80px] xl:h-[100px]"
                    />
                  </div>
                </div>
              </DialogTrigger>

              <DialogContent
                className="max-w-5xl w-full aspect-video p-0 bg-black 
      [&>button.absolute]:top-3 [&>button.absolute]:right-3 
      [&>button.absolute]:bg-black/50 
      [&>button.absolute]:text-white 
      [&>button.absolute]:hover:bg-black/80"
              >
                <DialogTitle>Story Video</DialogTitle>
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Dwr1V4cgZ0o?si=Ov6TKtgNY-oI6XTL"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </DialogContent>
            </Dialog>
          </div>
          {/* second row */}
          <div className="grid grid-cols-3 gap-6">
            {data?.insuranceCardData?.map((item, i) => <CareerStoryCard data={item} key={i} />)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerOurStoryLg
