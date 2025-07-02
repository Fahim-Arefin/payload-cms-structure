// import { DirectorCardDataType } from '@/types'
// import Link from 'next/link'
// import React from 'react'
// import { GoArrowUpRight } from 'react-icons/go'

// type Props = {
//   data: DirectorCardDataType
//   index: number
// }

// function DirectorCard({ data, index }: Props) {
//   return (
//     <div className="bg-white">
//       <div
//         className="grid grid-cols-2
//       px-4 py-12 md:p-24 lg:p-30 xl:p-40 2xl:p-[200px]"
//       >
//         <div
//           className="relative
//         h-[160px] md:h-[250px] lg:h-[360px] xl:h-[460px] 2xl:h-[600px]
//         w-[160px] md:w-[250px] lg:w-[360px] xl:w-[460px] 2xl:w-[550px]"
//         >
//           {/* Background Frame (Image) */}
//           <img
//             src={index % 2 === 0 ? '/assets/frame1.png' : '/assets/frame2.png'}
//             alt="bg-frame"
//             className="absolute bottom-0 z-0 w-full h-2/3 rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]"
//           />

//           {/* Foreground Image */}
//           <img
//             src={data.image}
//             alt={data.title}
//             className="relative z-10 w-full h-full rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]"
//           />
//         </div>

//         <div className="space-y-2 md:space-y-6 lg:space-y-10 2xl:space-y-12">
//           <div>
//             <h1 className="shantaLifeIntroSection-h1 text-[#ED7125] ">{data.title}</h1>
//             <h1 className="shantaLifeIntroSection-h1 ">{data.subtitle}</h1>
//           </div>
//           <p className="text-[#434343] text-[10px] md:text-sm lg:text-lg 2xl:text-[26px] font-light ">
//             {data?.description?.slice(0, 130) + (data?.description?.length > 130 ? '...' : '')}
//           </p>
//           <Link
//             href={data?.link}
//             className="uppercase text-[#ED7125] flex items-center space-x-1 md:space-x-2 hover:underline
//             text-[10px] md:text-sm lg:text-lg"
//           >
//             <span>Read More</span> <GoArrowUpRight className="" />
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DirectorCard

import { DirectorCardDataType } from '@/types'
import Link from 'next/link'
import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'

type Props = {
  data: DirectorCardDataType
  index: number
}

function DirectorCard({ data, index }: Props) {
  return (
    <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'}`}>
      <div className="relative grid grid-cols-2 container-padding">
        {/* Image Container */}
        <div
          className="relative
        h-[160px] md:h-[250px] lg:h-[360px] xl:h-[460px] 2xl:h-[600px] 
        w-[160px] md:w-[250px] lg:w-[360px] xl:w-[460px] 2xl:w-[550px]"
        >
          {/* Gradient Background Frame */}
          <div
            className={`absolute bottom-0 z-0 w-full h-2/3 
    rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]
    ${
      index % 2 === 0
        ? 'bg-gradient-to-t from-[#ED7125] via-[#ED7125]/30 to-transparent'
        : 'bg-gradient-to-t from-[#9C8639] via-[#9C8639]/30 to-transparent'
    }
  `}
          />

          {/* Foreground Image */}
          <img
            src={data.image}
            alt={data.title}
            className="relative z-10 w-full h-full object-cover 
            rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]"
          />
        </div>

        {/* bg img */}
        <img
          src="/assets/comma.png"
          alt={data.title}
          className="z-0 absolute hidden lg:block object-cover -mt-4
            rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]
            lg:left-[360px] xl:left-[550px] 2xl:left-[700px] 
            lg:w-[230px] xl:w-[250px] 2xl:w-fit "
        />

        {/* Text Content */}
        <div className="z-50 space-y-2 md:space-y-6 lg:space-y-10 2xl:space-y-12">
          <div>
            <h1 className="global-h1 font-normal lg:font-semibold text-[#ED7125] ">{data.title}</h1>
            <h1 className="global-h1 font-normal lg:font-semibold">{data.subtitle}</h1>
          </div>
          <p className="text-[#434343] global-p2 font-light ">
            {data?.description?.slice(0, 130) + (data?.description?.length > 130 ? '...' : '')}
          </p>
          <Link
            href={data?.link}
            className="uppercase  
             text-[10px] md:text-sm lg:text-lg flex"
          >
            <span className="text-[#ED7125] hidden lg:flex items-center space-x-1 md:space-x-2 hover:underline font-semibold">
              <span>Read More</span>
              <GoArrowUpRight className="drop-shadow-sm" fontSize={22} fontWeight={700} />
            </span>

            <span className="text-[#9C8639] lg:hidden flex items-center space-x-1 hover:underline font-semibold">
              <span>Explore Now</span>
              <GoArrowUpRight
                className="drop-shadow-sm text-[16px] md:text-[20px] -mt-0.5"
                fontWeight={700}
              />
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DirectorCard
