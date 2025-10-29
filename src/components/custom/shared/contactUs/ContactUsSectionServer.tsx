import { ContactUsFormBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import NoDataFound from '../NoDataFound'
import ContactUsSection from './ContactUsSection'
import { getGlobalCached } from '@/lib/cachedGlobals'
import { GlobalContactUsForm } from '@/payload-types'
import { CONTACT_US_BLOCK_SLUG_AND_TAG, GLOBAL_CONTACT_US_SLUG_AND_TAG } from '@/lib/constants'

type Props = {
  block: ContactUsFormBlockType
}

async function ContactUsSectionServer({ block }: Props) {
  const data = await getGlobalCached<GlobalContactUsForm>(
    GLOBAL_CONTACT_US_SLUG_AND_TAG,
    2,
    CONTACT_US_BLOCK_SLUG_AND_TAG,
  )

  return (
    <div>
      {data ? (
        <ContactUsSection data={data} block={block} />
      ) : (
        <NoDataFound
          message="No Data Found"
          description="Please fill up Global 'Contact Us' collection data"
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default ContactUsSectionServer
