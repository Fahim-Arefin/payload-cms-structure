// import { VissionMissionContentType } from '@/types'
// import React from 'react'

// type Props = {
//   vissionMissionContent: VissionMissionContentType
// }

// function VisionMissionSection({ vissionMissionContent }: Props) {
//   return (
//     <div
//       className="bg-blue-400 px-10 py-12 md:px-24 md:py-24 lg:p-[100px] 2xl:p-[200px]
//       bg-no-repeat bg-cover bg-center margin-bottom h-[400px] 2xl:h-[600px]
//       flex items-center text-white"
//       style={{
//         backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/vision.png')`,
//         backgroundColor: 'lightgray',
//         backgroundPosition: '-262.109px -99.012px',
//         backgroundSize: '123.449% 120.889%',
//       }}
//     >
//       <div className="grid grid-cols-2 w-full">
//         <div className="space-y-7 px-12">
//           <h1 className="shantaLifeIntroSection-h1 text-[#ED7125]">
//             {vissionMissionContent?.visionHeading}
//           </h1>
//           <p
//             className="text-sm md:text-lg lg:text-[16px] xl:text-[26px] font-light max-w-[550px]
//           text-justify"
//             // style={{
//             //   lineHeight: '40px',
//             // }}
//           >
//             {vissionMissionContent?.visionDescription}
//           </p>
//         </div>
//         <div className="space-y-7 px-24">
//           <h1 className="shantaLifeIntroSection-h1 text-[#ED7125]">
//             {vissionMissionContent?.missionHeading}
//           </h1>
//           <p
//             className="text-sm md:text-lg lg:text-[16px] xl:text-[26px] font-light max-w-[550px]
//           text-justify"
//             // style={{
//             //   lineHeight: '40px',
//             // }}
//           >
//             {vissionMissionContent?.missionDescription}
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default VisionMissionSection

import { VissionMissionContentType } from '@/types'
import React from 'react'

type Props = {
  vissionMissionContent: VissionMissionContentType
}

function VisionMissionSection({ vissionMissionContent }: Props) {
  return (
    <div
      className="container-padding
        lg:margin-bottom
        bg-no-repeat bg-cover bg-center
        flex items-center text-white
        h-[160px] md:h-[250px] lg:h-[380px] xl:h-[400px] 2xl:h-[600px]
      "
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/vision.png')`,
        backgroundColor: 'lightgray',
        // backgroundPosition: '-262.109px -99.012px',
        // backgroundSize: '123.449% 120.889%',
      }}
    >
      <div className="w-full grid grid-cols-2 md:gap-4 lg:gap-7 xl:gap-10">
        {/* Vision */}
        <div className="space-y-2 md:space-y-6 pr-2 md:pr-12 ">
          <h1 className="global-h1 font-semibold uppercase ">
            Our <span className="text-[#ED7125]">Vision</span>
          </h1>
          <p
            className="global-p1 max-w-[550px] 
          font-light text-justify 
          "
          >
            {vissionMissionContent?.visionDescription}
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-2 md:space-y-6 pl-2 md:pl-12 ">
          <h1 className="global-h1 font-semibold uppercase ">
            Our <span className="text-[#ED7125]">Mission</span>
          </h1>
          <p
            className="global-p2 max-w-[550px]
          font-light text-justify"
          >
            {vissionMissionContent?.missionDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VisionMissionSection
