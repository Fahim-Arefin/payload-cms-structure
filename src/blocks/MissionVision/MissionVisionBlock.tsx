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
import Image from 'next/image'
import Pattern01 from '/public/assets/images/BOpattern2.png'
import Pattern02 from '/public/assets/images/BOpattern2.png'

type Props = {
  block: MissionVisionBlockType
  params: Record<string, string>
}

function MissionVisionBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="relative z-10">
        <div className="container-padding">
          {/* section intro */}
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
              h-fit md:h-[300px] lg:h-[330px] xl:h-[400px]
              border-2 border-dashed border-white-3 bg-white-2 hover:bg-white-3
              hover:h-[105%] md:hover:h-[350px] lg:hover:h-[400px] xl:hover:h-[450px]
              overflow-hidden hover:overflow-y-auto overflow-x-hidden"
            />
            {/* vision */}
            <MissionVisionCard
              label={block?.visionLabel}
              desc={block?.visionDescription}
              className="w-[100%] md:w-[50%] 
              h-fit md:h-[300px] lg:h-[330px] xl:h-[400px]
              border-2 border-dashed border-white-3 bg-white-2 hover:bg-white-3
              hover:h-[105%] md:hover:h-[350px] lg:hover:h-[400px] xl:hover:h-[450px]
              overflow-hidden hover:overflow-y-auto overflow-x-hidden"
            />
          </div>
        </div>

        {/* pattern 1 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute left-0 top-0 z-30 h-[70%]
                   md:w-[120px] 
                   lg:w-[170px] 
                   xl:w-[225px] 
                   2xl:w-[280px]
                "
          >
            <Image
              fill
              src={Pattern01}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className=""
              placeholder="blur"
              blurDataURL={Pattern01?.blurDataURL}
            />
          </div>
        )}
        {/* pattern 2 */}
        {block?.showPatternDesign && (
          <div
            className="invisible md:visible absolute right-0 bottom-0 z-30 h-[50%]
                   md:w-[120px] 
                   lg:w-[170px] 
                   xl:w-[225px] 
                   2xl:w-[280px]
                "
          >
            <Image
              fill
              src={Pattern02}
              alt="pattern image 02"
              quality={90}
              sizes="100vw"
              className="object-cover rotate-180"
              placeholder="blur"
              blurDataURL={Pattern02?.blurDataURL}
            />
          </div>
        )}
      </div>
    </WithHashScroller>
  )
}

export default MissionVisionBlock
