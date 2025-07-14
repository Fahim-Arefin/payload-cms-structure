import { AllAboutCardDataType } from '@/types'
import AllAboutCardList from './AllAboutCardList'

type Props = {
  allAboutData: AllAboutCardDataType[]
}

function AllAboutSection({ allAboutData }: Props) {
  return (
    <div className="margin-bottom lg:px-2 relative lg:overflow-hidden">
      <div>
        {/* left side */}
        <div className="lg:flex lg:gap-12 xl:gap-20 2xl:gap-x-24">
          {/* image with gradient */}
          <div
            className="flex flex-col items-center gap-4 relative overflow-hidden
           w-full lg:w-[350px] xl:w-[500px] 2xl:w-[600px] 
           h-[150px] md:h-[250px] lg:h-[500px] xl:h-[650px] 2xl:h-[820px]
           lg:rounded-[10px] xl:rounded-[13px] 2xl:rounded-[15px]"
          >
            {/* Image */}
            <img
              src="/assets/allAbout.jpg"
              alt="All About"
              className="object-cover w-full h-full"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/25 rounded-[15px] z-10"></div>

            <h1 className="shantaLifeIntroSection-h1 uppercase absolute inset-x-0 top-1/4 text-center z-20 text-white lg:hidden">
              WE Are All <span className="text-[#ED7125]">About</span>
            </h1>
          </div>
          {/* heading */}
          <h1 className="global-h1 font-semibold text-[#434342] uppercase hidden lg:block mt-6">
            WE Are All <span className="text-[#ED7125]">About</span>
          </h1>
        </div>
        {/* right-side */}
        <div
          className="absolute z-40 
        top-[60%] md:top-[61%] lg:top-[22%] xl:top-[23%] 2xl:top-1/4 
        left-[2%] md:left-[5%] lg:left-[200px] xl:left-[220px] 2xl:left-[400px] 
        w-[95%] md:w-[90%] lg:w-[800px] xl:w-[1200px] 2xl:w-[1500px]"
        >
          <AllAboutCardList allAboutData={allAboutData} />
        </div>
      </div>
    </div>
  )
}

export default AllAboutSection
