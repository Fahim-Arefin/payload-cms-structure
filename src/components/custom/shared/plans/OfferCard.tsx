// import { OfferDataType } from '@/types'

// type Props = {
//   data: OfferDataType
// }

// function OfferCard({ data }: Props) {
//   return (
//     <div
//       className="z-30 bg-[lightgray] bg-cover bg-no-repeat bg-center"
//       style={{
//         backgroundImage: `url(${data?.bgImage})`,
//       }}
//     >
//       <div
//         className="relative cursor-pointer
//         h-[140px] md:h-[150px] lg:h-[200px] xl:h-[240px] 2xl:h-[270px]
//         py-7  lg:py-9 xl:py-12
//         px-2 xl:px-5
//         rounded-[8px] md:rounded-[10px] lg:rounded-[14px] xl:rounded-[20px]
//         flex flex-col items-center
//         space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-6
//         group transition-all duration-300 ease-linear
//         hover:bg-[#9C8639]/70
//         hover:shadow-lg"
//       >
//         <div
//           className="transition-transform duration-500 group-hover:scale-105
//          w-[40px] lg:w-[50px] xl:w-[80px]
//          h-[40px] lg:h-[50px] xl:h-[80px] "
//         >
//           <img src={data?.image} alt={data?.description} className="h-full w-full object-contain" />
//         </div>

//         <p className="text-white group-hover:text-white global-p1 font-medium text-center transition-colors duration-500 uppercase">
//           {data?.description}
//         </p>

//         {/* <span
//           className="global-p2 text-white underline underline-offset-4 opacity-0
//              group-hover:opacity-100
//              transition-all duration-500 ease-in font-medium mx-auto"
//         >
//           <span>Explore Now</span>
//         </span> */}
//       </div>
//     </div>
//   )
// }

// export default OfferCard

import { OfferDataType } from '@/types'

type Props = {
  data: OfferDataType
}

function OfferCard({ data }: Props) {
  return (
    <div
      className="relative z-30 bg-cover bg-no-repeat bg-center overflow-hidden
            rounded-[4px] lg:rounded-[6px]"
      style={{
        backgroundImage: `url(${data?.bgImage})`,
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0000004D] to-[#0000004D]/60 z-0" />

      {/* Foreground content */}
      <div
        className="relative z-10 cursor-pointer
        h-[220px] md:h-[240px] lg:h-[280px] xl:h-[340px] 2xl:h-[400px] 
        py-7 lg:py-9 xl:py-12 
        px-2 xl:px-5 
        flex flex-col items-center justify-center
        space-y-2 lg:space-y-4 xl:space-y-6 2xl:space-y-6
        group transition-all duration-300 ease-linear
        hover:bg-[#9C8639]/60
        hover:shadow-lg"
      >
        <div
          className="transition-transform duration-500 group-hover:scale-105
         w-[40px] lg:w-[50px] xl:w-[80px] 
         h-[40px] lg:h-[50px] xl:h-[80px] "
        >
          <img src={data?.image} alt={data?.description} className="h-full w-full object-contain" />
        </div>

        <p className="text-white group-hover:text-white global-p1 font-medium text-center transition-colors duration-500 uppercase">
          {data?.description}
        </p>
        <span
          className="text-[12px] text-white underline underline-offset-4 opacity-0
             group-hover:opacity-100
             transition-all duration-500 ease-in font-medium mx-auto"
        >
          <span>Explore Now</span>
        </span>
      </div>
    </div>
  )
}

export default OfferCard
