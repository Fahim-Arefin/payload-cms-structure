// import { FootPrintDataType } from '@/types'
// import React, { SetStateAction } from 'react'

// type Props = {
//   data: FootPrintDataType
//   isActive?: boolean
// }

// function FootPrintCard({ data, isActive = false }: Props) {
//   return (
//     <div
//       //   className="relative p-6
//       //                   h-[600px] w-[600px] rounded-xl overflow-hidden
//       //                   "
//       className={`mx-auto
//           relative p-6 overflow-hidden rounded-xl text-white
//           transition-all duration-300 ease-in-out
//           ${isActive ? '2xl:w-[666px] 2xl:h-[688px]' : '2xl:w-[311px] 2xl:h-[375px]'}
//         `}
//     >
//       {/* Background image */}
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat"
//         style={{
//           backgroundImage: `url('${data.image}')`,
//         }}
//       />

//       {/* Overlay gradient */}
//       <div className="absolute inset-0 bg-black/30 " />

//       {/* Content on top */}
//       <div
//         className="relative z-10 text-white space-y-2 text-justify flex flex-col justify-between
//       h-full"
//       >
//         <h1 className="text-[10px] md:text-[12px] lg:text-[14px] xl:text-[16px] 2xl:text-[18px] font-light">
//           {data?.description}
//         </h1>
//         <h1 className="shantaLifeIntroSection-h3 font-bold">{data?.title}</h1>
//       </div>
//     </div>
//   )
// }

// export default FootPrintCard

// v1
import { FootPrintDataType } from '@/types'
import React from 'react'

type Props = {
  data: FootPrintDataType
  isActive?: boolean
}

function FootPrintCard({ data, isActive = false }: Props) {
  return (
    <div
      className={`
        mx-auto relative p-6 overflow-hidden rounded-xl text-white
        transition-all duration-500 ease-in-out
        ${isActive ? 'h-[250px] md:h-[320px] lg:h-[420px] xl:h-[500px] 2xl:h-[600px]' : 'h-[180px] md:h-[220px] lg:h-[250px] xl:h-[300px] 2xl:h-[375px]'}
      `}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${data.image}')`,
        }}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Foreground content */}
      <div className="relative z-10 text-white space-y-2 text-justify flex flex-col justify-between h-full">
        <p className="text-xs xl:text-sm font-light leading-snug line-clamp-5">
          {data?.description}
        </p>
        <h1 className="text-lg font-bold">{data?.title}</h1>
      </div>
    </div>
  )
}

export default FootPrintCard
