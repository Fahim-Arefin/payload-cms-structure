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
      className="
        lg:margin-bottom
        bg-no-repeat bg-cover bg-center
        px-6 md:px-10 lg:px-[100px] 2xl:px-[200px]
        py-12 md:py-24 lg:py-[100px] 2xl:py-[200px]
        flex items-center text-white
        h-[150px] md:h-[250px] 2xl:h-[600px]
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
        <div className="space-y-2 md:space-y-6 px-2 md:px-12 ">
          <h1 className="shantaLifeIntroSection-h1 font-bold uppercase ">
            Our <span className="text-[#ED7125]">Vision</span>
          </h1>
          <p className="text-[10px] md:text-sm lg:text-lg 2xl:text-[26px] font-light text-justify leading-[18px] md:leading-[28px] lg:leading-[32px] 2xl:leading-[40px] max-w-[550px]">
            {vissionMissionContent?.visionDescription}
          </p>
        </div>

        {/* Mission */}
        <div className="space-y-2 md:space-y-6 px-2 md:px-12 ">
          <h1 className="shantaLifeIntroSection-h1 font-bold uppercase ">
            Our <span className="text-[#ED7125]">Mission</span>
          </h1>
          <p className="text-[10px] md:text-sm lg:text-lg 2xl:text-[26px] font-light text-justify leading-[18px] md:leading-[28px] lg:leading-[32px] 2xl:leading-[40px] max-w-[550px]">
            {vissionMissionContent?.missionDescription}
          </p>
        </div>
      </div>
    </div>
  )
}

export default VisionMissionSection
