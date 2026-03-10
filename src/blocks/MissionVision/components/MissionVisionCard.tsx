// import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
// import LocalizedText from '@/components/custom/shared/LocalizedText'

// type Props = {
//   label: string
//   desc: any
// }

// function MissionVisionCard({ label, desc }: Props) {
//   return (
//     <div
//       className="border-2 border-dashed border-white-3 text-center
//               px-4 md:px-3 lg:px-4 xl:px-12 2xl:px-14
//               py-2 md:py-1.5 lg:py-2 xl:py-8 2xl:py-10
//               space-y-4 md:space-y-3 lg:space-y-4 xl:space-y-12 2xl:space-y-14 group
//               transition-all duration-300 ease-in
//               bg-white-2 hover:bg-white-3"
//     >
//       <div
//         className="font-proxima font-bold global-h4 text-dark-1
//         transition-all duration-300 ease-in
//       group-hover:scale-150 group-hover:text-white"
//       >
//         <LocalizedText en={label} bn={label} />
//       </div>
//       <div
//         className="font-manrope global-p3 text-justify
//       transition-all duration-300 ease-in
//       group-hover:global-p2 group-hover:text-white"
//       >
//         <LocalizedRichText en={desc} bn={desc} />
//       </div>
//     </div>
//   )
// }

// export default MissionVisionCard

import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import React from 'react'

type Props = {
  label: string
  desc: any
  className?: string
}

function MissionVisionCard({ label, desc, className }: Props) {
  return (
    <div
      className={`border-2 border-dashed border-white-3 text-center
              px-4 md:px-3 lg:px-4 xl:px-12 2xl:px-14
              py-2 md:py-1.5 lg:py-2 xl:py-8 2xl:py-10
              space-y-4 md:space-y-3 lg:space-y-4 xl:space-y-12 2xl:space-y-14 group
              transition-all duration-300 ease-in
              bg-white-2 hover:bg-white-3 ${className}`}
    >
      {/* label */}
      <div
        className="relative inline-block font-proxima font-bold global-h4 text-dark-1 
  transition-all duration-300 ease-in
  group-hover:scale-125 group-hover:text-white

  after:content-['']
  after:absolute after:left-1/2 after:-translate-x-1/2
  after:-bottom-[0px]
  after:h-[1px] after:w-[105%]
  after:origin-center after:scale-x-0
  after:bg-white
  after:transition-transform after:duration-150 after:ease-linear after:delay-100
  group-hover:after:scale-x-100"
      >
        <LocalizedText en={label} bn={label} />
      </div>

      {/* desc */}
      <div className="relative">
        {/* p3 (initial) */}
        <div
          className="font-manrope global-p3 text-justify
    transition-all duration-300 ease-in
    opacity-100 scale-100
    group-hover:opacity-0 group-hover:scale-125"
        >
          <LocalizedRichText en={desc} bn={desc} />
        </div>

        {/* p2 (hover version) */}
        <div
          className="font-manrope global-p2 text-justify text-white
    absolute inset-0
    transition-all duration-300 ease-in delay-150
    opacity-0 scale-95
    group-hover:opacity-100 group-hover:scale-100"
        >
          <LocalizedRichText en={desc} bn={desc} />
        </div>
      </div>
    </div>
  )
}

export default MissionVisionCard
