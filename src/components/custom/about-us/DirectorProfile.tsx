import { DirectorProfileDataType } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  data: DirectorProfileDataType
}

function DirectorProfile({ data }: Props) {
  return (
    <Link href={`/all-bods#id-${data?.id}`}>
      <div
        className="group
     hover:bg-[#585859]/60 transition-all duration-300 cursor-pointer
        p-3 xl:p-5
      rounded-md"
      >
        {/* prfile card */}
        <div
          className="relative mx-auto z-0
      w-[180px] lg:w-[190px] xl:w-[200px] 2xl:w-[280px]
      h-[180px] lg:h-[190px] xl:h-[200px] 2xl:h-[280px]
      mt-8 lg:mt-10 xl:mt-12 2xl:mt-14 "
        >
          {/* Inner Circle with Image and Beige Background */}
          {/* <div
            className="
    relative w-full h-full rounded-full z-10
    bg-[#D3C59D]
    bg-contain bg-no-repeat bg-center
  "
          >
            <img
              src={data?.image}
              alt={data?.title}
              className="absolute z-20 bottom-0
            w-full
            h-[220px] lg:h-[240px] xl:h-[260px] 2xl:h-[350px]
            rounded-b-full"
            />
          </div> */}
          <div className="relative w-full h-full rounded-full z-10 bg-[#D3C59D] bg-contain bg-no-repeat bg-center">
            <div className="w-full h-[220px] lg:h-[240px] xl:h-[260px] 2xl:h-[350px] absolute z-20 bottom-0 rounded-b-full">
              <Image
                fill
                src={data?.image}
                alt={data?.title}
                className="z-20 bottom-0 rounded-b-full"
                sizes="(max-width: 767px) 300px, (max-width: 1023px) 50vw , 33vw"
              />
            </div>
          </div>

          {/* Orange curved stroke — placed OUTSIDE clipping context */}
          <div
            className="pointer-events-none absolute
       -bottom-[15px] lg:-bottom-[15px] 2xl:-bottom-[15px]
       -right-[15px] lg:-right-[15px] 2xl:-right-[15px]
        z-20 rounded-full border-[10px] border-[#ED7125] border-t-transparent border-l-transparent
         w-[210px] lg:w-[220px] xl:w-[230px] 2xl:w-[310px]
         h-[210px] lg:h-[220px] xl:h-[230px] 2xl:h-[310px]"
          />
        </div>
        <div className="mt-6">
          <p
            className="text-[14px] xl:text-[16px] 2xl:text-[18px]
         text-[#434342] group-hover:text-white capitalize font-medium text-center"
          >
            {data?.name}
          </p>
          <p
            className="text-[12px] xl:text-[14px] 2xl:text-[16px]
         text-[#9C8639] group-hover:text-white uppercase font-medium text-center"
          >
            {data?.title}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default DirectorProfile
