import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { ContactInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ContactInfoSection from './components/ContactInfoSection'

type Props = {
  block: ContactInfoBlockType
  params: Record<string, string>
}

function ContactInfoBlock({ block }: Props) {
  return (
    <WithHashScroller
      id={block?.sectionSettings?.sectionId}
      bgColor={block?.sectionSettings?.backgroundColor}
    >
      <ContactInfoSection block={block} />
    </WithHashScroller>
  )
}

export default ContactInfoBlock
