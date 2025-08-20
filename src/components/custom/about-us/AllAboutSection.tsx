import { AllAboutCardDataType } from '@/types'
import AllAboutCardList from './AllAboutCardList'
import Image from 'next/image'

type AllAboutData = {
  image: string
  mobileImage?: string
  title: string
  coloredTitle: string
  data: AllAboutCardDataType[]
}

type Props = {
  allAboutData: AllAboutData
}

function AllAboutSection({ allAboutData }: Props) {
  const { image, mobileImage, title, coloredTitle, data } = allAboutData
  return (
    <div className="margin-bottom lg:px-2 relative lg:overflow-hidden">
      <div>
        {/* left side */}
        <div className="lg:flex lg:gap-12 xl:gap-20 2xl:gap-x-24">
          {/* image with gradient */}
          <div
            className="flex flex-col items-center gap-4 relative overflow-hidden
           w-full lg:w-[350px] xl:w-[500px] 2xl:w-[600px] 
           h-[200px] md:h-[250px] lg:h-[500px] xl:h-[650px] 2xl:h-[820px]
           lg:rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15px]"
          >
            {/* web */}
            <Image
              fill
              src={image}
              alt={title}
              className="object-cover object-center"
              sizes="(max-width: 767px) 300px, (max-width: 1023px) 50vw , (max-width: 1349px) 350px, 500px"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 lg:rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15px] z-10"></div>

            <h1 className="shantaLifeIntroSection-h1 font-medium lg:font-semibold uppercase absolute inset-x-0 top-1/4 text-center z-20 text-white lg:hidden">
              {title} <span className="text-[#ED7125]">{coloredTitle}</span>
            </h1>
          </div>
          {/* heading */}
          <h1 className="global-h1 font-medium lg:font-semibold text-[#434342] uppercase hidden lg:block mt-6">
            {title} <span className="text-[#ED7125]">{coloredTitle}</span>
          </h1>
        </div>
        {/* right-side */}
        <div
          className="absolute z-40
        top-[60%] md:top-[61%] lg:top-[22%] xl:top-[23%] 2xl:top-1/4 
        left-[2%] md:left-[5%] lg:left-[200px] xl:left-[220px] 2xl:left-[400px] 
        w-[95%] md:w-[90%] lg:w-[80%] xl:w-[83%] 2xl:w-[1500px]"
        >
          <AllAboutCardList allAboutData={data} />
        </div>
      </div>
    </div>
  )
}

export default AllAboutSection
