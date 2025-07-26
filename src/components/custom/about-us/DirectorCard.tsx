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
//     <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'}`}>
//       <div className="relative grid grid-cols-2 container-padding">
//         {/* Image Container */}
//         <div
//           className="relative
//         h-[160px] md:h-[250px] lg:h-[360px] xl:h-[420px] 2xl:h-[600px]
//         w-[160px] md:w-[250px] lg:w-[360px] xl:w-[420px] 2xl:w-[550px]"
//         >
//           {/* Gradient Background Frame */}
//           <div
//             className={`absolute bottom-0 z-0 w-full h-2/3
//     rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]
//     ${
//       index % 2 === 0
//         ? 'bg-gradient-to-t from-[#ED7125] via-[#ED7125]/30 to-transparent'
//         : 'bg-gradient-to-t from-[#9C8639] via-[#9C8639]/30 to-transparent'
//     }
//   `}
//           />

//           {/* Foreground Image */}
//           <img
//             src={data.image}
//             alt={data.title}
//             className="relative z-10 w-full h-full object-cover
//             rounded-sm md:rounded-md lg:rounded-lg 2xl:rounded-[24px]"
//           />
//         </div>

//         {/* Text Content */}
//         <div className="z-40 space-y-2 md:space-y-6 lg:space-y-10 2xl:space-y-12">
//           <div>
//             <h1 className="global-h1 font-normal lg:font-semibold text-[#ED7125] uppercase">
//               {data.title}
//             </h1>
//             <h1 className="global-h1 font-normal lg:font-semibold uppercase">{data.subtitle}</h1>
//           </div>
//           <p className="text-[#434343] global-p2 font-light ">
//             {data?.description?.slice(0, 1030) + (data?.description?.length > 1030 ? '...' : '')}
//           </p>
//           <Link
//             href={data?.link}
//             className="uppercase
//              text-[10px] md:text-sm lg:text-lg flex"
//           >
//             <span className="text-[#ED7125] hidden lg:flex items-center space-x-1 md:space-x-2 hover:underline font-medium">
//               <span>Read More</span>
//               <GoArrowUpRight className="drop-shadow-sm" fontSize={22} fontWeight={700} />
//             </span>

//             <span className="text-[#9C8639] lg:hidden flex items-center space-x-1 hover:underline font-semibold">
//               <span>Explore Now</span>
//               <GoArrowUpRight
//                 className="drop-shadow-sm text-[16px] md:text-[20px] -mt-0.5"
//                 fontWeight={700}
//               />
//             </span>
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DirectorCard

'use client'

import { DirectorCardDataType } from '@/types'
import { useState } from 'react'

type Props = {
  data: DirectorCardDataType
  index: number
}

function DirectorCard({ data, index }: Props) {
  const [expand, setExpand] = useState(false)

  const handleExpand = () => {
    setExpand(!expand)
  }

  return (
    <div className={`${index % 2 === 0 ? 'bg-white' : 'bg-[#F6EDDD]'}`}>
      <div className="relative grid grid-cols-2 container-padding">
        {/* Image Container */}
        <div className="flex flex-col space-y-2 md:space-y-4">
          <div
            className="relative
          h-[160px] md:h-[250px] lg:h-[360px] xl:h-[420px] 2xl:h-[600px] 
          w-[160px] md:w-[250px] lg:w-[360px] xl:w-[420px] 2xl:w-[550px]"
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
          
          {/* Name and Designation under image */}
          {data.name && data.designation && (
            <div className="space-y-1">
              <h2 className="text-[#1E1E1E] text-lg md:text-xl lg:text-2xl font-semibold">
                {data.name}
              </h2>
              <p className="text-[#ED7125] text-sm md:text-base lg:text-lg font-medium uppercase">
                {data.designation}
              </p>
            </div>
          )}
        </div>

        {/* Text Content */}
        <div className="z-40 space-y-1 md:space-y-4 lg:space-y-4 2xl:space-y-6">
          <div>
            <h1 className="global-h1 font-normal lg:font-semibold text-[#ED7125] uppercase">
              {data.title}
            </h1>
            <h1 className="global-h1 font-normal lg:font-semibold uppercase">{data.subtitle}</h1>
          </div>
          {!expand ? (
            <p className="text-[#434343] global-p2 font-light text-justify line-clamp-2 md:line-clamp-4 lg:line-clamp-5 xl:line-clamp-[9] 2xl:line-clamp-[12]">
              {data?.description}
            </p>
          ) : (
            <p className="text-[#434343] global-p2 font-light text-justify">{data?.description}</p>
          )}

          <div
            onClick={handleExpand}
            className="uppercase cursor-pointer  
             text-[10px] md:text-sm lg:text-lg flex"
          >
            <span className="text-[#ED7125] flex items-center space-x-1 md:space-x-2 hover:underline hover:underline-offset-8 font-medium">
              <span>{expand ? 'Read less' : 'Read more'}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DirectorCard
