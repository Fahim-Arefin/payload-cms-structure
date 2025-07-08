// import { BankingFacilitiesDataType } from '@/types'
// import React from 'react'

// type Props = {
//   data: BankingFacilitiesDataType
// }

// function BankingCard({ data }: Props) {
//   return (
//     <div className="z-30">
//       <div
//         className="relative cursor-pointer border-[0.417px] border-[#434343]
//       h-[270px]
//       py-12 px-5
//       rounded-[20px]
//       flex flex-col items-center space-y-8
//       bg-[#FCF4EB]  hover:bg-[rgba(156,134,57,0.7)]
//       group transition-all duration-300 "
//       >
//         <div className="w-[80px] h-[80px]">
//           <img src={data?.image} alt={data?.description} className="h-full w-full" />
//         </div>
//         <p className="text-[#434343] group-hover:text-white global-p2 font-medium text-center">
//           {data?.description}
//         </p>
//         {/* arrow */}
//         <div className="invisible group-hover:visible absolute -top-7 right-3">
//           <img src="/assets/bankingarrow.png" alt="" className="w-full h-full" />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default BankingCard

import { BankingFacilitiesDataType } from '@/types'
import React from 'react'

type Props = {
  data: BankingFacilitiesDataType
}

function BankingCard({ data }: Props) {
  return (
    <div className="z-30">
      <div
        className="relative cursor-pointer border-[0.417px] border-[#434343]/30 hover:border-none
        h-[140px] md:h-[150px] lg:h-[200px] xl:h-[240px] 2xl:h-[270px] 
        py-7  lg:py-9 xl:py-12 
        px-2 xl:px-5 
        rounded-[8px] md:rounded-[10px] lg:rounded-[14px] xl:rounded-[20px]
        flex flex-col items-center 
        space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-8
        bg-[#FCF4EB]
        group transition-all duration-300 ease-linear
        hover:bg-[rgba(156,134,57,0.7)]
        hover:shadow-lg"
      >
        <div
          className="transition-transform duration-500 group-hover:scale-105
         w-[40px] lg:w-[50px] xl:w-[80px] 
         h-[40px] lg:h-[50px] xl:h-[80px]"
        >
          <img src={data?.image} alt={data?.description} className="h-full w-full object-contain" />
        </div>

        <p className="text-[#434343] group-hover:text-white global-p2 font-medium text-center transition-colors duration-500">
          {data?.description}
        </p>

        <div
          className="absolute 
          -top-1 lg:-top-3 xl:-top-5  2xl:-top-7 
          right-3 
             opacity-0 -translate-x-3
             group-hover:opacity-100 group-hover:translate-x-0
             transition-all duration-500 ease-in"
        >
          <img src="/assets/bankingarrow.png" alt="" className="w-full h-full object-contain" />
        </div>
      </div>
    </div>
  )
}

export default BankingCard
