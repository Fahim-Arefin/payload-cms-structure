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

  return (
    <div>
      {globalContactData?.budgets &&
      globalContactData?.ourSolutions &&
      globalContactData?.budgets?.length > 0 &&
      globalContactData?.ourSolutions?.length > 0 ? (
        <ContactUsClient globalContactData={globalContactData} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description={`Please fill up ${GLOBAL_CONTACT_US_LABEL} collection data (Both Solution and Budget array)`}
          bgColor={block?.sectionSettings?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default ContactUsServer
