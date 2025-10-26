// import { CustomCardSectionBlockType } from '@/types/payloadCustomTypes'
// import CarouselDesign from '../CarouselDesign'
// import GridDesign from '../GridDesign'
// import CorporateCardItem from '@/components/custom/shared/plans/CorporateCardItem'

// type Props = {
//   block: CustomCardSectionBlockType
//   data: CustomCardSectionBlockType['card'][number]
//   displayAsCarousel: CustomCardSectionBlockType['displayAsCarousel']
// }

// function CorporateCardBlock({ block, data, displayAsCarousel }: Props) {
//   return (
//     <div>
//       {displayAsCarousel ? (
//         <CarouselDesign data={data} block={block}/>
//       ) : (
//         <GridDesign data={data} />
//       )}
//     </div>
//   )
// }

// export default CorporateCardBlock
// =============================================================
// =============================================================
// =============================================================

'use client'

import { CustomCardSectionBlockType } from '@/types/payloadCustomTypes'
import CarouselDesign from '../CarouselDesign'
import GridDesign from '../GridDesign'
import CorporateCardItem from '@/components/custom/shared/plans/CorporateCardItem'

type Props = {
  block: CustomCardSectionBlockType
  data: CustomCardSectionBlockType['card'][number]
  displayAsCarousel: CustomCardSectionBlockType['displayAsCarousel']
}

export default function CorporateCardBlock({ block, data, displayAsCarousel }: Props) {
  if (!displayAsCarousel)
    return (
      <GridDesign
        data={data}
        block={block}
        renderItem={(item) => <CorporateCardItem data={item} />}
      />
    )

  return (
    <CarouselDesign
      block={block}
      data={data}
      renderItem={(item) => <CorporateCardItem data={item} />}
    />
  )
}
