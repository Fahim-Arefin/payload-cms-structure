import { Button } from '@/components/ui/button'
import { OfferDataType2 } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import ToolTip from '../ToolTip'

type Props = {
  data: OfferDataType2
}

function OfferCard2({ data }: Props) {
  return (
    <div
      className="relative z-30 overflow-hidden
            rounded-[4px] lg:rounded-[6px]"
      // style={{
      //   backgroundImage: `url(${data?.bgImage})`,
      // }}
    >
      {/* mobile */}
      <img
        className="lg:hidden absolute inset-0  w-full h-full object-cover rounded-[4px] lg:rounded-[6px]"
        src={data?.bgMobileImage}
        alt={data?.title}
        aria-hidden="true"
      />
      {/* web */}
      <img
        className="hidden lg:block absolute inset-0  w-full h-full object-cover rounded-[4px] lg:rounded-[6px]"
        src={data?.bgImage}
        alt={data?.title}
        aria-hidden="true"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0000004D] to-[#0000004D]/60 z-0" />

      {/* Foreground content */}
      <div
        className="relative z-10
        h-[240px] md:h-[270px] lg:h-[300px] xl:h-[380px] 2xl:h-[420px] 
       py-4 lg:py-4 xl:py-8 2xl:py-12 
       px-2 lg:px-3 xl:px-4 2xl:px-6 
        flex flex-col justify-between 
        space-y-2 lg:space-y-3 xl:space-y-5 2xl:space-y-6
        group transition-all duration-300 ease-linear
        hover:shadow-lg
        "
      >
        {/*  hover:bg-[#9C8639]/60 */}
        <div
          className="transition-transform duration-500 group-hover:scale-105
         w-[40px] lg:w-[50px] xl:w-[70px] 2xl:w-[80px] 
         h-[40px] lg:h-[50px] xl:h-[70px] 2xl:h-[80px]"
        >
          <img
            src={data?.mobileImage}
            alt={data?.description}
            className="lg:hidden h-full w-full object-contain"
          />
          <img
            src={data?.image}
            alt={data?.description}
            className="hidden lg:block h-full w-full object-contain"
          />
        </div>

        <p
          className="text-white group-hover:text-white  transition-colors duration-500 uppercase
        text-[12px] md:text-[13px] lg:text-[14px] xl:text-[18px] 2xl:text-[20px]"
        >
          {data?.title}
        </p>

        <div
          className="
        bg-[#3A3A3A]/20 backdrop-blur-[21.599998474121094px] rounded-md 
        px-2 py-2 lg:px-2 lg:py-2 xl:py-4 xl:px-3 
        w-full
        min-h-[50%] flex flex-col justify-between"
        >
          <p
            className="text-white group-hover:text-white  transition-colors duration-500 
        text-[10px] md:text-[12px] lg:text-[12px] xl:text-[14px]"
          >
            {data?.description}
          </p>
          {/* <div
            className="cursor-pointer text-[10px] md:text-[12px] text-[#ED7125] underline underline-offset-4 
             opacity-100
             group-hover:opacity-100
             transition-all duration-300 ease-in font-medium 
             flex space-x-1 items-center"
          >
            <div>Explore Now</div>
            <ArrowUpRight size={15} className="mt-0.5" />
          </div> */}
          <ToolTip>
            <Button
              variant="link"
              className="text-[#ED7125] hover:underline w-fit mx-auto lg:mx-0 
            text-[10px] md:text-[12px] p-0
            cursor-not-allowed"
            >
              <div className="flex space-x-1 items-center ">
                <div>Explore Now</div>
                <ArrowUpRight />
              </div>
            </Button>
          </ToolTip>
        </div>
      </div>
    </div>
  )
}

export default OfferCard2
