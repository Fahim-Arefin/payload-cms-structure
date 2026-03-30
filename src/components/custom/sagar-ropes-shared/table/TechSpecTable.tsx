// import { TechnicalSpecificationBlockType } from '@/types/payloadCustomTypes'
// import Image from 'next/image'
// import React from 'react'

// type Props = {
//   className?: string
//   data: TechnicalSpecificationBlockType['specifications']
//   specNameHeader: TechnicalSpecificationBlockType['specNameHeader']
//   detailsHeader: TechnicalSpecificationBlockType['detailsHeader']
// }

// function TechSpecTable({ className, data, specNameHeader, detailsHeader }: Props) {
//   return (
//     <div className={` ${className}`}>
//       {/* heading */}
//       <div
//         className="grid grid-cols-12 font-proxima global-h3 font-bold border-b-2 border-[#0C1E21]
//        gap-12
//        md:pb-1.5 lg:pb-2 xl:pb-3.5 2xl:pb-4
//        md:mb-1.5 lg:mb-2 xl:mb-3.5 2xl:mb-4
//        "
//       >
//         <div className="col-span-3">{specNameHeader}</div>
//         <div className="col-span-9">{detailsHeader}</div>
//       </div>

//       {/* data */}
//       <div className="">
//         {data?.map((item, index) => (
//           <div
//             className="grid grid-cols-12 border-b-2 border-[#0C1E2160]
//        gap-12
//        md:py-0.5 lg:py-1 xl:py-2 2xl:py-2.5
//        "
//             key={index}
//           >
//             <div className="col-span-4 md:col-span-3 font-proxima global-h4 font-bold ">
//               {item?.name}
//             </div>
//             <div
//               className="col-span-8 md:col-span-9 flex items-center
//           gap-4 overflow-x-hidden"
//             >
//               <div className="font-manrope global-p1 flex flex-wrap w-auto break-words">
//                 {item?.details}
//               </div>
//               <div className="relative w-[15px] md:w-[17px] lg:w-[20px] xl:w-[25px] 2xl:w-[30px] aspect-square">
//                 {typeof item?.icon === 'object' && item?.icon?.url && (
//                   <Image
//                     src={item?.icon?.url}
//                     alt="icon"
//                     fill
//                     sizes="100vw"
//                     className={`object-cover object-center w-full h-full`}
//                     placeholder="blur"
//                     blurDataURL={item?.iconBlurDataURL || undefined}
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default TechSpecTable
import { TechnicalSpecificationBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import React from 'react'

type Props = {
  className?: string
  data: TechnicalSpecificationBlockType['specifications']
  specNameHeader: TechnicalSpecificationBlockType['specNameHeader']
  detailsHeader: TechnicalSpecificationBlockType['detailsHeader']
}

function TechSpecTable({ className, data, specNameHeader, detailsHeader }: Props) {
  return (
    <div className={` ${className}`}>
      {/* heading */}
      <div
        className="flex flex-row justify-between font-proxima global-h3 font-bold border-b-2 border-[#0C1E21]
       pb-1 md:pb-1.5 lg:pb-2 xl:pb-3.5 2xl:pb-4
       mb-1 md:mb-1.5 lg:mb-2 xl:mb-3.5 2xl:mb-4
       "
      >
        <div className="w-[35%] md:w-[25%] xl:w-[25%] 2xl:w-[23%] ">{specNameHeader}</div>
        <div className="w-[63%] md:w-[73%] xl:w-[73%] 2xl:w-[73%] ">{detailsHeader}</div>
      </div>

      {/* data */}
      <div className="">
        {data?.map((item, index) => (
          <div
            className="flex flex-row justify-between border-b-2 border-[#0C1E2160]
       py-1 lg:py-1.5 xl:py-2 2xl:py-2.5 
       "
            key={index}
          >
            <div
              className="w-[35%] md:w-[25%] xl:w-[25%] 2xl:w-[23%] 
            font-proxima global-h4 font-bold "
            >
              {item?.name}
            </div>
            <div
              className="w-[63%] md:w-[73%] xl:w-[73%] 2xl:w-[73%] 
              flex items-center gap-4 overflow-x-hidden "
            >
              <div className="font-manrope global-p1 flex flex-wrap text-[#364153]">
                {item?.details}
              </div>
              <div className="relative min-w-[17px] lg:min-w-[20px] xl:min-w-[25px] 2xl:min-w-[30px] aspect-square">
                {typeof item?.icon === 'object' && item?.icon?.url && (
                  <Image
                    src={item?.icon?.url}
                    alt="icon"
                    fill
                    sizes="100vw"
                    className={`object-cover object-center w-full h-full`}
                    placeholder="blur"
                    blurDataURL={item?.iconBlurDataURL || undefined}
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TechSpecTable
