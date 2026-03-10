// import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
// import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
// import { MissionVisionBlockType } from '@/types/payloadCustomTypes'
// import MissionVisionCard from './components/MissionVisionCard'

// type Props = {
//   block: MissionVisionBlockType
//   params: Record<string, string>
// }

// function MissionVisionBlock({ block }: Props) {
//   return (
//     <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
//       <div>
//         {/* section intro */}
//         <div className="container-padding">
//           <IntroSection block={block} />
//           {/* mission and vision */}
//           <div
//             className="grid grid-cols-1 md:grid-cols-2 mt-4 lg:mt-6 xl:mt-8 2xl:mt-10
//           gap-4 lg:gap-6 xl:gap-10 2xl:gap-12 "
//           >
//             {/* mission */}
//             <MissionVisionCard label={block?.missionLabel} desc={block?.missionDescription} />
//             {/* vision */}
//             <MissionVisionCard label={block?.visionLabel} desc={block?.visionDescription} />
//           </div>
//         </div>
//       </div>
//     </WithHashScroller>
//   )
// }

// export default MissionVisionBlock

import IntroSection from '@/components/custom/sagar-ropes-shared/others/IntroSection'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { MissionVisionBlockType } from '@/types/payloadCustomTypes'
import MissionVisionCard from './components/MissionVisionCard'

type Props = {
  block: MissionVisionBlockType
  params: Record<string, string>
}

function MissionVisionBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div>
        {/* section intro */}
        <div className="container-padding">
          <IntroSection block={block} />
          {/* mission and vision */}
          <div
            className="flex flex-col md:flex-row mt-4 lg:mt-6 xl:mt-8 2xl:mt-10
          gap-4 lg:gap-6 xl:gap-10 2xl:gap-12 "
          >
            {/* mission */}
            <MissionVisionCard
              label={block?.missionLabel}
              desc={block?.missionDescription}
              className="w-[100%] md:w-[50%] 
              h-fit md:h-[300px] lg:h-[350px] xl:h-[400px] 
              hover:h-[105%] md:hover:h-[350px] lg:hover:h-[400px] xl:hover:h-[450px]
              overflow-hidden hover:overflow-y-auto overflow-x-hidden"
            />
            {/* vision */}
            <MissionVisionCard
              label={block?.visionLabel}
              desc={block?.visionDescription}
              className="w-[100%] md:w-[50%] 
              h-fit md:h-[300px] lg:h-[350px] xl:h-[400px] 
              hover:h-[105%] md:hover:h-[350px] lg:hover:h-[400px] xl:hover:h-[450px]
              overflow-hidden hover:overflow-y-auto overflow-x-hidden"
            />
          </div>
        </div>
      </div>
    </WithHashScroller>
  )
}

export default MissionVisionBlock
