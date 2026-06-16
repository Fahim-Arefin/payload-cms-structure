import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { GlobalContactUs } from '@/payload-types'
import { ContactUsBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ContactUsForm from './ContactUsForm'

type Props = {
  globalContactData: GlobalContactUs
  block: ContactUsBlockType
}

function ContactUsClient({ globalContactData, block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <div className="container-padding space-y-[20px] lg:space-y-[40px] xl:space-y-[56px] 2xl:space-y-[60px]">
        <SectionHeading01 data={block?.sectionHeading} align="middle" />
        <div>
          <ContactUsForm globalContactData={globalContactData} />
        </div>
      </div>
    </WithHashScroller>
  )
}

export default ContactUsClient
