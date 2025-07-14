// import { Button } from '@/components/ui/button'
// import { ArrowUpRight } from 'lucide-react'
// import React from 'react'

// type Props = {
//   item: {
//     title: string
//     image: string
//     date: string
//   }
// }

// function NewsSliderCard({ item }: Props) {
//   return (
//     <div className="">
//       <div
//         className="cursor-pointer rounded-[8px] border-[8px] border-white
//     relative overflow-hidden
//      bg-[length:270%_100%] bg-[position:-100px_0px]
//   sm:bg-[length:220%_100%] sm:bg-[position:-150px_0px]
//   md:bg-[length:199.742%_100%] md:bg-[position:-244.025px_0px]
//     before:content-[''] before:absolute before:inset-0
//     before:bg-black before:opacity-15 hover:before:opacity-35
//     before:transition-opacity before:duration-300
//     flex items-end
//     w-full
//     h-[250px] md:h-[340px] xl:h-[400px] 2xl:h-[500px]"
//         style={{
//           backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('${item.image}')`,
//         }}
//       >
//         <div className="p-2 md:p-6 space-y-2 md:space-y-3">
//           <div className="flex space-x-1">
//             <div className="w-4 h-4 md:w-6 md:h-6">
//               <img src="/assets/calender.png" alt={item?.title} className="w-full h-full" />
//             </div>
//             <p className="text-white text-sm md:mt-1">{item.date}</p>
//           </div>
//           <h3 className="text-white global-p2 font-semibold leading-4 md:leading-6">
//             {item.title}
//           </h3>
//           <div>
//             <Button
//               variant="link"
//               className="text-white hover:underline w-fit
//             p-0 text-[10px] md:text-[13px]"
//             >
//               <div className="flex space-x-1 items-center underline underline-offset-8">
//                 <span className="uppercase global-p2">Read more</span>
//                 <ArrowUpRight className="w-12 h-12" />
//               </div>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default NewsSliderCard

import { Button } from '@/components/ui/button'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

type Props = {
  item: {
    title: string
    image: string
    date: string
  }
}

function NewsSliderCard({ item }: Props) {
  return (
    <div className="">
      <div
        className="cursor-pointer rounded-[8px] border-[8px] border-white 
    relative overflow-hidden 
    bg-no-repeat 
    bg-[length:270%_100%] bg-[position:-100px_0px]  
    sm:bg-[length:220%_100%] sm:bg-[position:-150px_0px]
    md:bg-[length:199.742%_100%] md:bg-[position:-244.025px_0px]
    before:content-[''] before:absolute before:inset-0 
    before:bg-black before:opacity-30 hover:before:opacity-50 
    before:transition-opacity before:duration-300
    flex items-end 
    h-[250px] md:h-[340px] xl:h-[400px] 2xl:h-[500px]"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)), url('${item.image}')`,
        }}
      >
        {/* Content Layer */}
        <div className="relative z-10 p-2 md:p-6 lg:p-5 space-y-2 md:space-y-3 xl:space-y-4">
          <div className="flex space-x-1">
            <div className="w-4 h-4 md:w-6 md:h-6">
              <img src="/assets/calender.png" alt={item?.title} className="w-full h-full" />
            </div>
            <p className="text-white text-sm md:mt-1">{item.date}</p>
          </div>
          <h3 className="text-white global-p2 font-semibold leading-4 md:leading-6">
            {item.title}
          </h3>
          <div>
            <Button variant="link" className="text-white hover:underline w-fit p-0">
              <div className="flex space-x-1 items-center underline underline-offset-8">
                <span className="uppercase text-[10px] md:text-[13px]">Read more</span>
                <ArrowUpRight className="w-12 h-12" />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsSliderCard
