import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import { ContactUsFormBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: ContactUsFormBlockType
  params: Record<string, string>
}

function ContactUsBlock({ block }: Props) {
  return (
    <div>
      <ContactUsSection data={block} />
    </div>
  )
}

export default ContactUsBlock
