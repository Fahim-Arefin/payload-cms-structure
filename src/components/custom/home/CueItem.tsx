// import { Button } from '@/components/ui/button'
// import React from 'react'
// import { LuArrowUpRight } from 'react-icons/lu'

// type Props = {
//   card: {
//     icon: string
//     title: string
//     subtitle: string
//     description: string
//     image: string
//   }
// }
// function CueItem({ card }: Props) {
//   return (
//     <div className="w-full">
//       <div
//         className="bg-white p-12 h-[388px] rounded-t-2xl mx-auto"
//         style={{
//           boxShadow: '0px -1px 25px 0px #00000040',
//         }}
//       >
//         <div className="h-[108px] w-[108px]">
//           <img className="h-full w-full" src={card.icon} alt={card.title} />
//         </div>
//         <h1 className="text-[30px] mt-4 font-bold">{card.title}</h1>
//         <h2 className="text-[30px] font-bold">{card.subtitle}</h2>
//         <p className="text-sm mt-2 text-[#404041] font-extralight">{card.description}</p>
//         <Button
//           variant="link"
//           className="mt-2 px-0 text-[#ED7125] text-[24px] flex items-center gap-2"
//         >
//           Explore Now
//           <LuArrowUpRight style={{ fontSize: '30px', lineHeight: '1' }} />
//         </Button>
//       </div>
//       <div className=" h-[388px] mx-auto">
//         <img
//           className="h-full w-full rounded-b-2xl"
//           src={card.image}
//           alt={`${card.title} visual`}
//         />
//       </div>
//     </div>
//   )
// }

// export default CueItem

import { Button } from '@/components/ui/button'
import React from 'react'
import { LuArrowUpRight } from 'react-icons/lu'

type Props = {
  card: {
    icon: string
    title: string
    subtitle: string
    description: string
    image: string
  }
  index: number
}

function CueItem({ card, index }: Props) {
  return (
    <div className="relative flex flex-col w-full max-w-md mx-auto shadow-md font-avenir">
      {/* Top Card */}
      <div
        className={` h-[400px] lg:h-[300px] xl:h-[330px] 2xl:h-[350px] z-20 lg:bg-white text-white lg:text-[#404041] absolute inset-0 bottom-0 flex flex-col justify-end lg:inset-auto lg:relative 
          p-6 sm:p-8 md:p-10 lg:p-6 xl:p-8 ${
            index % 2 === 0 ? 'order-1 rounded-t-2xl' : 'order-2 rounded-b-2xl'
          }`}
      >
        <div className="h-[80px] w-[80px] lg:h-[60px] lg:w-[60px] xl:h-[80px] xl:w-[80px]">
          <img className="h-full w-full" src={card.icon} alt={card.title} />
        </div>
        <h1 className="text-xl lg:text-xl xl:text-2xl mt-4 font-bold">{card.title}</h1>
        <h2 className="text-lg lg:text-xl xl:text-2xl font-bold">{card.subtitle}</h2>
        <p className="global-p2 mt-2 text-white lg:text-[#404041] font-light ">
          {card.description}
        </p>
        <Button
          variant="link"
          className="mt-2 px-0 text-white lg:text-[#ED7125] lg:text-sm xl:text-xl flex justify-start items-center gap-2 underline lg:no-underline"
        >
          Explore Now
          <LuArrowUpRight className="text-[24px] sm:text-[26px] md:text-[30px]" />
        </Button>
      </div>

      {/* Bottom Image */}
      <div
        className={`z-0 w-full h-[400px] lg:h-[300px] xl:h-[350px] ${index % 2 === 0 ? 'order-2' : 'order-1'}`}
      >
        <img
          className={`h-full w-full object-cover rounded-2xl ${index % 2 === 0 ? 'lg:rounded-b-2xl lg:rounded-t-none' : 'lg:rounded-t-2xl lg:rounded-b-none'}`}
          src={card.image}
          alt={`${card.title} visual`}
        />
      </div>

      {/* overlay background: #0000005E;*/}
      <div className="lg:hidden absolute inset-0 bg-black/50 rounded-2xl z-10" />
    </div>
  )
}

export default CueItem
