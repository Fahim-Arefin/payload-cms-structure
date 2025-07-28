// import { Button } from '@/components/ui/button'
// import { EndowmentDataType } from '@/types'
// import { ArrowUpRight } from 'lucide-react'
// import Link from 'next/link'
// import React from 'react'

// type Props = {
//   data: EndowmentDataType
//   content: 'left' | 'right'
//   bgColor?: string
// }

// function EndowmentSection({ data, content, bgColor }: Props) {
//   return (
//     <div
//       className="container-padding"
//       style={{
//         backgroundColor: bgColor,
//       }}
//     >
//       <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 xl:gap-28">
//         <div
//           className={`order-2
//                      ${content === 'left' ? 'md:order-1' : 'md:order-2'}
//                      space-y-2 lg:space-y-2 xl:space-y-4 2xl:space-y-6`}
//         >
//           <h3 className="ml-[20%] md:ml-0 md:text-start global-h3 uppercase text-[#3A3A3C]">
//             {data?.subtitle}
//           </h3>
//           <h1 className="ml-[20%] md:ml-0 md:text-start global-h1 font-semibold uppercase text-[#3A3A3C]">
//             {data?.title}
//           </h1>
//           <p className="ml-[20%] md:ml-0 md:text-start global-p1 w-60 md:w-full">
//             {data?.description}
//           </p>
//           <h4 className="md:text-start global-h4 uppercase text-[#3A3A3C] font-semibold ml-[20%] md:ml-0">
//             Key <span className="text-[#ED7125]">Features</span>
//           </h4>
//           <div
//             className="
//             md:ml-7 xl:ml-10
//            space-y-1 xl:space-y-4
//            "
//           >
//             {data?.feature?.map((value, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-start space-x-1 lg:space-x-2 xl:space-x-3 ml-[20%] md:ml-0 "
//               >
//                 <div className="w-[20px] lg:w-[25px] xl:w-[30px] h-[20px] lg:h-[25px] xl:h-[30px]">
//                   <img src={value?.image} alt={value?.name} className="h-full w-full" />
//                 </div>
//                 <div className="global-h4 capitalize">{value?.name}</div>
//               </div>
//             ))}
//             <Button
//               variant="link"
//               className="text-[#ED7125] hover:underline w-fit
//            text-[12px] md:text-[14px] xl:text-[14px] 2xl:text-[16px]
//            hover:underline-offset-8 p-0 ml-[20%] md:ml-0"
//             >
//               <Link href={data?.link} className="flex space-x-1 items-center">
//                 <span>Explore</span>
//                 <ArrowUpRight />
//               </Link>
//             </Button>
//           </div>
//         </div>

//         <div
//           className={`
//         order-1
//         ${content === 'left' ? 'md:order-2 justify-end' : 'md:order-1 justify-start'}
//          flex `}
//         >
//           <img
//             src={data?.image}
//             alt={data?.title}
//             className="h-[180px] md:h-full lg:max-h-[580px] xl:max-h-[600px] 2xl:max-h-[720px] md:rounded-md object-cover
//           w-full md:w-[90%] lg:w-[90%] 2xl:w-[85%] "
//           />
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EndowmentSection
import { Button } from '@/components/ui/button'
import { EndowmentDataType } from '@/types'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {
  data: EndowmentDataType
  content: 'left' | 'right'
  bgColor?: string
}

function EndowmentSection({ data, content, bgColor }: Props) {
  return (
    <div
      className="container-padding"
      style={{
        backgroundColor: bgColor,
      }}
    >
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-2 xl:gap-28">
        <div
          className={`order-2
                     ${content === 'left' ? 'md:order-1' : 'md:order-2'}   
                     space-y-2 lg:space-y-2 xl:space-y-4 2xl:space-y-6`}
        >
          <h3 className="ml-[20%] md:ml-0 md:text-start global-h3 uppercase text-[#3A3A3C]">
            {data?.subtitle}
          </h3>
          <h1 className="ml-[20%] md:ml-0 md:text-start global-h1 font-semibold uppercase text-[#3A3A3C]">
            {data?.title}
          </h1>
          <p className="ml-[20%] md:ml-0 md:text-start text-justify global-p1 w-60 md:w-full">
            {data?.description}
          </p>
          <h4 className="md:text-start global-h4 uppercase text-[#3A3A3C] font-semibold ml-[20%] md:ml-0">
            Key <span className="text-[#ED7125]">Features</span>
          </h4>
          <div
            className="
            md:ml-7 xl:ml-10
           space-y-1 xl:space-y-4
           "
          >
            {data?.feature?.map((value, index) => (
              <div
                key={index}
                className="flex items-center justify-start space-x-1 lg:space-x-2 xl:space-x-3 ml-[20%] md:ml-0 "
              >
                <div className="w-[20px] lg:w-[25px] xl:w-[30px] h-[20px] lg:h-[25px] xl:h-[30px]">
                  <img src={value?.image} alt={value?.name} className="h-full w-full" />
                </div>
                <div className="global-h4 capitalize">{value?.name}</div>
              </div>
            ))}
            <Button
              variant="link"
              className="text-[#ED7125] hover:underline w-fit 
           text-[12px] md:text-[14px] xl:text-[14px] 2xl:text-[16px] 
           hover:underline-offset-8 p-0 ml-[20%] md:ml-0"
            >
              <Link href={data?.link} className="flex space-x-1 items-center">
                <span>Explore</span>
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>

        <div
          className={`
        order-1 
        ${content === 'left' ? 'md:order-2 justify-end' : 'md:order-1 justify-start'}   
         flex `}
        >
          <img
            src={data?.image}
            alt={data?.title}
            className="h-[180px] md:h-full lg:max-h-[580px] xl:max-h-[600px] 2xl:max-h-[720px] md:rounded-md object-cover
          w-full md:w-[90%] lg:w-[90%] 2xl:w-[85%] "
          />
        </div>
      </div>
    </div>
  )
}

export default EndowmentSection
