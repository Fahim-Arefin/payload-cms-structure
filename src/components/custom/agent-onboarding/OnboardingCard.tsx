import { MoreThanAWorkplaceBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'

type Props = {
  data: MoreThanAWorkplaceBlockType['gallery'][number]
  isActive?: boolean
}

function OnboardingCard({ data, isActive = false }: Props) {
  return (
    <div
      // className={`cursor-pointer
      //   mx-auto relative p-4 md:p-6 overflow-hidden text-white
      //   transition-all duration-500 ease-in-out
      //   rounded-md
      //   w-[97%] md:w-[95%] lg:w-[95%] xl:w-[90%]
      //   h-[80px] md:h-[170px] lg:h-[220px] xl:h-[280px] 2xl:h-[350px]
      //   hover:w-full
      //   hover:h-full
      //   flex flex-col justify-end
      // `}
      className={`cursor-pointer
        mx-auto relative p-4 md:p-6 overflow-hidden text-white
        transition-all duration-500 ease-in-out
        rounded-md
        w-[85%] md:w-[85%] lg:w-[85%] xl:w-[83%] 2xl:w-[80%]
        aspect-[1.5/1]
        hover:w-full 
        flex flex-col justify-end
      `}
    >
      {/* Background image */}
      {/* <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${data.image}')`,
        }}
      /> */}
      {typeof data?.image === 'object' && data?.image?.url && (
        <Image
          src={data?.image?.url}
          alt="Slider Image"
          fill
          className="object-cover object-center"
          sizes="(max-width: 767px) 300px, 500px"
          placeholder="blur"
          blurDataURL={data?.imageBlurDataURL || ''}
          quality={80}
        />
      )}

      {/* Overlay gradient */}
      {/* <div className="absolute inset-0 bg-black/20" /> */}

      {/* Foreground content */}
      {/* <div className="relative z-10 text-white space-y-2 text-justify flex flex-col justify-between h-full">
        <p className="text-xs xl:text-sm font-light leading-snug line-clamp-5">
          {data?.description}
        </p>
        <h1 className="text-lg font-bold">{data?.title}</h1>
      </div> */}
    </div>
  )
}

export default OnboardingCard
