import NoDataFound from '@/components/custom/shared/NoDataFound'
import { CONTACT_US_BLOCK_LABEL } from '@/lib/constants'
import { ContactUsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ContactUsServer from './components/ContactUsServer'

type Props = {
  block: ContactUsBlockType
  params: Record<string, string>
}

function ContactUsBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <ContactUsServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description={`In the admin panel, go to current page and open the “${CONTACT_US_BLOCK_LABEL}” block and check the checkbox.`}
          bgColor={block?.sectionSettings?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default ContactUsBlock
