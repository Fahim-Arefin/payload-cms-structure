// import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import ProjectApproachCard from './ProjectApproachCard'

// type Props = {
//   data: ProjectApproachBlockType['projectApproach']
//   cardsRef: React.RefObject<HTMLDivElement | null>
// }

// function ProjectApproachCardSection({ data, cardsRef }: Props) {
//   return (
//     <div ref={cardsRef} className="relative">
//       {data?.approachItems &&
//         data?.approachItems?.length > 0 &&
//         data?.approachItems?.map((item, i) => (
//           <div key={i}>
//             <ProjectApproachCard data={item} index={i} />
//           </div>
//         ))}
//     </div>
//   )
// }

// export default ProjectApproachCardSection

import { ProjectApproachBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ProjectApproachCard from './ProjectApproachCard'

type Props = {
  data: ProjectApproachBlockType['projectApproach']
  cardsRef: React.RefObject<HTMLDivElement | null>
}

function ProjectApproachCardSection({ data, cardsRef }: Props) {
  const items = data?.approachItems ?? []
  const totalCards = items.length

  return (
    <div
      ref={cardsRef}
      className="
        relative w-full
        [--card-offset:42px]
        lg:[--card-offset:60px]
        xl:[--card-offset:90px]
        2xl:[--card-offset:100px]

        [--card-height:220px]
        lg:[--card-height:240px]
        xl:[--card-height:260px]
        2xl:[--card-height:280px]
      "
      style={{
        height: `calc((${totalCards - 1}) * var(--card-offset) + var(--card-height))`,
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          className="absolute inset-x-0"
          style={{
            top: `calc(${i} * var(--card-offset))`,
            zIndex: i + 1,
          }}
        >
          <ProjectApproachCard data={item} index={i} />
        </div>
      ))}
    </div>
  )
}

export default ProjectApproachCardSection
