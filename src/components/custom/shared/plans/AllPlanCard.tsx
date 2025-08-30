import { Button } from '@/components/ui/button'
import { AllPlantDataType } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: AllPlantDataType
  blur?: boolean
}

function AllPlanCard({ data, blur }: Props) {
  return (
    <Link
      href={data?.link}
      className="group relative overflow-hidden w-full mx-auto md:w-full 
    h-[250px] md:h-[250px] lg:h-[250px] xl:h-[300px] 2xl:h-[360px] 
    cursor-pointer
    rounded-[6px] xl:rounded-[10px] 2xl:rounded-[10px] "
    >
      {/* Background image only */}
      {/* web */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url('${data?.image}')`,
          backgroundColor: 'lightgray',
        }}
      /> */}

      <Image
        src={data?.image}
        alt={data?.title}
        fill
        className="object-cover object-center transition-transform duration-500 scale-100 group-hover:scale-105"
        sizes="(max-width:639px) 400px, (max-width:1023px) 300px, 500px"
      />

      {/* Gradient overlay with hover effect */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300 z-10" />

      {/* Content */}
      <div
        className="relative z-20 text-white
      flex flex-col justify-between h-full
       px-5 py-7 md:px-5 md:py-8 lg:px-4 lg:py-8 xl:px-6 xl:py-10"
      >
        <div className="h-[50%] flex items-start">
          <div
            className={`text-[20px] xl:text-[28px] 2xl:text-[32px]  uppercase mx-auto lg:mx-0 text-center lg:text-start ${data?.biggerTitle ? 'font-light' : 'font-medium'}`}
          >
            {data?.title}
            <br></br>
            {data?.biggerTitle && (
              <p className="text-[18px] lg:text-[17px] xl:text-[20px] 2xl:text-[28px] font-medium uppercase mx-auto lg:mx-0 text-center lg:text-start">
                {data?.biggerTitle}
              </p>
            )}
          </div>
        </div>
        {/* blur section */}
        <div
          className={`${blur && 'bg-[#3A3A3A]/20 backdrop-blur-[21.599998474121094px] rounded-md px-3 py-4 md:px-4 md:py-4 lg:px-3 lg:py-2 xl:py-4 xl:px-3 w-[85%] md:w-[95%] mx-auto lg:w-full'} 
        h-[60%] flex flex-col justify-between`}
        >
          <p className="global-p2 text-center lg:text-start">
            {/* {data?.description &&
              (data.description.split(' ').length > 12
                ? data.description.split(' ').slice(0, 12).join(' ') + '...'
                : data.description)} */}
                {data?.description}
          </p>
          <Button
            variant="link"
            className="text-[#ED7125] hover:underline w-fit mx-auto lg:mx-0
           global-p2 p-0 "
          >
            <div className="flex space-x-1 items-center ">
              <span>Explore</span>
              <ArrowUpRight />
            </div>
          </Button>
        </div>
      </div>
    </Link>
  )
}

export default AllPlanCard
