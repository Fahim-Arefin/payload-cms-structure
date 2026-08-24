// import NoDataFound from '@/components/custom/shared/NoDataFound'
// import { getGlobalCached } from '@/lib/cachedGlobals'
// import {
//   CONTACT_US_SLUG_AND_TAG,
//   GLOBAL_CONTACT_US_LABEL,
//   GLOBAL_CONTACT_US_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { GlobalContactUs } from '@/payload-types'
// import { ContactUsBlockType } from '@/types/payloadCustomTypes'
// import React from 'react'
// import ContactUsClient from './ContactUsClient'

// type Props = {
//   block: ContactUsBlockType
// }

// async function ContactUsServer({ block }: Props) {
//   const [globalContactData] = await Promise.all([
//     getGlobalCached<GlobalContactUs>(GLOBAL_CONTACT_US_SLUG_AND_TAG, 2, CONTACT_US_SLUG_AND_TAG),
//   ])

//   return (
//     <div>
//       {globalContactData?.currencies &&
//       globalContactData?.ourSolutions &&
//       globalContactData?.budgetRange &&
//       globalContactData?.currencies?.length > 0 &&
//       globalContactData?.ourSolutions?.length > 0 ? (
//         <ContactUsClient globalContactData={globalContactData} block={block} />
//       ) : (
//         <NoDataFound
//           message="No Data Found"
//           description={`Please fill up ${GLOBAL_CONTACT_US_LABEL} collection data (Solutions, Currencies and Budget Range)`}
//           bgColor={block?.sectionSettings?.backgroundColor || ''}
//         />
//       )}
//     </div>
//   )
// }

// export default ContactUsServer

import NoDataFound from '@/components/custom/shared/NoDataFound'
import { getGlobalCached } from '@/lib/cachedGlobals'
import {
  CONTACT_US_SLUG_AND_TAG,
  GLOBAL_CONTACT_US_LABEL,
  GLOBAL_CONTACT_US_SLUG_AND_TAG,
} from '@/lib/constants'
import { GlobalContactUs } from '@/payload-types'
import { ContactUsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ContactUsClient from './ContactUsClient'

type Props = {
  block: ContactUsBlockType
}

async function ContactUsServer({ block }: Props) {
  const [globalContactData] = await Promise.all([
    getGlobalCached<GlobalContactUs>(GLOBAL_CONTACT_US_SLUG_AND_TAG, 2, CONTACT_US_SLUG_AND_TAG),
  ])

  const hasCurrencies =
    Array.isArray(globalContactData?.currencies) && globalContactData.currencies.length > 0

  const hasSolutions =
    Array.isArray(globalContactData?.ourSolutions) && globalContactData.ourSolutions.length > 0

  return (
    <div>
      {hasCurrencies && hasSolutions ? (
        <ContactUsClient globalContactData={globalContactData} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up ${GLOBAL_CONTACT_US_LABEL} collection data (Solutions and Currencies)`}
          bgColor={block?.sectionSettings?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default ContactUsServer
