// 'use client'

// import Offers from './Offers'
// import OfferCard from './OfferCard'
// import { OfferDataType, OfferDataType2 } from '@/types'
// import OfferCard2 from './OfferCard2'

// type Props = {
//   data: OfferDataType[] | OfferDataType2[]
//   subheading?: string
//   card: number
// }

// export default function OffersClientWrapper({ data, subheading, card }: Props) {
//   return (
//     <Offers
//       data={data}
//       subheading={subheading}
//       cardComponent={card === 1 ? OfferCard : OfferCard2}
//     />
//   )
// }

'use client'

import Offers from './Offers'
import OfferCard from './OfferCard'
import OfferCard2 from './OfferCard2'
import { OfferDataType, OfferDataType2 } from '@/types'

type Props =
  | { data: OfferDataType[]; subheading?: string; card: 1 }
  | { data: OfferDataType2[]; subheading?: string; card: 2 }

export default function OffersClientWrapper(props: Props) {
  if (props.card === 1) {
    return <Offers data={props.data} subheading={props.subheading} cardComponent={OfferCard} />
  }

  return <Offers data={props.data} subheading={props.subheading} cardComponent={OfferCard2} />
}
