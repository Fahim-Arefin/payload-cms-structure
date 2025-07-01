import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { DirectorProfileDataType } from '@/types'
import DirectorProfile from './DirectorProfile'

type Props = {
  directorProfileData: DirectorProfileDataType[]
}

function DirectorListSection({ directorProfileData }: Props) {
  return (
    <div className="bg-white  pb-12 lg:pb-0">
      <div
        className="
    px-4 py-12 md:p-24 lg:p-30 xl:p-40 2xl:p-[200px]"
      >
        {/* top section */}
        <div className="lg:w-[50%] space-y-6 2xl:space-y-12 ">
          <div
            className="shantaLifeIntroSection-h1 font-semibold text-[#4A4A4A] 
          flex space-x-2 justify-center lg:block lg:space-x-0 lg:justify-start"
          >
            <h1>The Power of One</h1>
            <h1 className="text-[#ED7125]">Connected Vision</h1>
          </div>
          <p className="shantaLifeIntroSection-p text-[#4A4A4A] text-center lg:text-justify ">
            Shaping tomorrow, today. Our board is all about steering Shanta Life into the future.
            Lets get to know them.
          </p>
          <h2 className="hidden lg:block shantaLifeIntroSection-h2 font-semibold text-[#4A4A4A] text-center lg:text-start">
            Board of directors
          </h2>
        </div>

        {/* profile card list */}
        <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-12">
          {directorProfileData?.map((data, index) => <DirectorProfile key={index} data={data} />)}
        </div>

        {/* profile card carousal */}
        <div className="lg:hidden mt-12 lg:mt-16 xl:mt-20 2xl:mt-32">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full max-w-[95%] mx-auto"
          >
            <CarouselContent>
              {directorProfileData?.map((data, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 mx-auto lg:py-4">
                  <DirectorProfile data={data} />
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Carousel Navigation */}
            <div
              className="flex gap-2 absolute
            inset-x-0 justify-center lg:justify-end -bottom-16 md:-bottom-20 lg:-top-8 2xl:-top-12 lg:right-0"
            >
              <CarouselPrevious
                className="
         w-6 xl:w-8 
         h-6 xl:h-8 
        static rounded-full border border-gray-400 bg-white text-gray-700 flex items-center justify-center hover:bg-gray-100 transition"
              />
              <CarouselNext
                className="
         px-6 xl:px-9 
         h-6 xl:h-8
        static rounded-full bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition"
              />
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  )
}

export default DirectorListSection
