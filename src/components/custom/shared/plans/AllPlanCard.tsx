import { Button } from '@/components/ui/button'
import { AllPlantDataType } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

type Props = {
  data: AllPlantDataType
  blur?: boolean
}

function AllPlanCard({ data, blur }: Props) {
  return (
    <Link
      href={data?.link}
      className="group relative overflow-hidden w-[70%] mx-auto md:w-full 
    h-[250px] md:h-[250px] xl:h-[300px] 2xl:h-[330px] 
    rounded-[12.5px] cursor-pointer "
    >
      {/* Background image only */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 scale-100 group-hover:scale-105"
        style={{
          backgroundImage: `url('${data?.image}')`,
          backgroundColor: 'lightgray',
        }}
      />

      {/* Gradient overlay with hover effect */}
      <div className="absolute inset-0 bg-black/35 group-hover:bg-black/50 transition-all duration-300 z-10" />

      {/* Content */}
      <div
        className="relative z-20 text-white
      flex flex-col justify-between h-full
       px-5 py-7 md:px-5 md:py-8 lg:px-4 lg:py-8 xl:px-6 xl:py-10"
      >
        <div className="h-[50%] flex items-start">
          <h3 className="text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] font-medium uppercase">
            {data?.title}
          </h3>
        </div>
        <div
          className={`${blur && 'bg-black/20 backdrop-blur-[16.666666px] rounded-md px-3 py-4 md:px-4 md:py-4 lg:px-3 lg:py-2 xl:py-4 xl:px-3'} 
        h-[60%] flex flex-col justify-between`}
        >
          <p className="global-p2">
            {data?.description &&
              (data.description.split(' ').length > 12
                ? data.description.split(' ').slice(0, 12).join(' ') + '...'
                : data.description)}
          </p>
          <Button
            variant="link"
            className="text-[#ED7125] hover:underline w-fit 
           global-p2 p-0"
          >
            <div className="flex space-x-1 items-center">
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
