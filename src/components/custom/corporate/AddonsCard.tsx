import { Button } from '@/components/ui/button'
import { OfferDataType } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: OfferDataType
}

function AddonsCard({ data }: Props) {
  return (
    <div className=" relative z-30 overflow-hidden rounded-md">
      <Image
        src={data?.bgImage}
        alt={data?.description}
        fill
        className="inset-0 rounded-md object-cover object-center "
        sizes="(max-width: 767px) 150px,(max-width: 1349px) 350px, 600px"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0000004D] to-[#0000004D]/60 z-0" />

      {/* Foreground content */}
      <div
        className="relative z-10
        h-[220px] md:h-[240px] lg:h-[280px] xl:h-[340px] 2xl:h-[400px] 
        py-7 lg:py-9 xl:py-12 
        px-2 xl:px-5 
        flex flex-col items-center justify-center
        space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-6
        group transition-all duration-300 ease-linear
        
        hover:shadow-lg"
      >
        {/* hover:bg-[#9C8639]/60 */}
        <div
          className="transition-transform duration-300 group-hover:scale-105
          w-[60px] md:w-[70px] lg:w-[80px] xl:w-[90px] 2xl:w-[100px] 
         h-[60px] md:h-[70px] lg:h-[80px] xl:h-[90px] 2xl:h-[100px] "
        >
          <img src={data?.image} alt={data?.description} className="h-full w-full object-contain" />
        </div>

        {/* <p className="text-white group-hover:text-white global-p1 font-light text-center transition-colors duration-500">
          {data?.description}
        </p> */}
        <div
          className="
        bg-[#3A3A3A]/20 backdrop-blur-[21.599998474121094px] rounded-sm md:rounded-md 
        p-2
        w-full lg:w-[90%] xl:w-[80%] mx-auto
        min-h-fit max-h-[50%] flex flex-col justify-between"
        >
          <p
            className="text-white transition-colors duration-500 
         global-p2 text-center uppercase font-light"
          >
            {data?.description}
          </p>
          <Button
            variant="link"
            className="text-[#ED7125] hover:underline w-fit mx-auto 
            text-[10px] md:text-[12px] p-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-linear"
          >
            <Link href={data?.link ? data?.link : ''} className="flex space-x-1 items-center ">
              <div>Explore Now</div>
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddonsCard
