import { OfferDataType2 } from '@/types'

type Props = {
  data: OfferDataType2
}

function OfferCard2({ data }: Props) {
  return (
    <div
      className="relative z-30 bg-cover bg-no-repeat bg-center overflow-hidden
            rounded-[4px] lg:rounded-[6px]"
      style={{
        backgroundImage: `url(${data?.bgImage})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0000004D] to-[#0000004D]/60 z-0" />

      {/* Foreground content */}
      <div
        className="relative z-10 cursor-pointer
        h-[220px] md:h-[240px] lg:h-[280px] xl:h-[340px] 2xl:h-[400px] 
        py-7 lg:py-4 xl:py-8 2xl:py-12 
        px-4 lg:px-3 xl:px-5 2xl:px-8 
        flex flex-col 
        space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-6
        group transition-all duration-300 ease-linear
        hover:bg-[#9C8639]/60
        hover:shadow-lg"
      >
        <div
          className="transition-transform duration-500 group-hover:scale-105
         w-[40px] lg:w-[50px] xl:w-[80px] 
         h-[40px] lg:h-[50px] xl:h-[80px] "
        >
          <img src={data?.image} alt={data?.description} className="h-full w-full object-contain" />
        </div>

        <p className="text-white group-hover:text-white  global-h4 transition-colors duration-500 uppercase">
          {data?.title}
        </p>
        <p
          className="text-white group-hover:text-white  transition-colors duration-500 
        text-[10px] md:text-[12px] lg:text-[14px]"
        >
          {data?.description}
        </p>
        {/* <div
          className="text-[10px] md:text-[12px] text-white underline underline-offset-4 opacity-0
             group-hover:opacity-100
             transition-all duration-500 ease-in font-medium "
        >
          <span>Explore Now</span>
        </div> */}
      </div>
    </div>
  )
}

export default OfferCard2
