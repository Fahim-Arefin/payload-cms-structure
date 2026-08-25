import SectionHeading01 from '@/components/custom/sagar-ropes-shared/others/SectionHeading01'
import { ContactInfoBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import ContactInfoCarousel from './ContactInfoCarousel'

type Props = { block: ContactInfoBlockType }

function ContactInfoSection({ block }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0 z-0
          h-[46%]
          bg-[radial-gradient(ellipse_at_center,rgba(0,108,103,0.30)_0%,rgba(0,108,103,0.16)_40%,rgba(0,108,103,0)_78%)]
          blur-[24px]
        "
      />

      <div
        className="
          container-padding relative z-10
          space-y-[34px]
          md:space-y-[42px]
          lg:space-y-[48px]
          xl:space-y-[56px]
          2xl:space-y-[60px]
        "
      >
        <SectionHeading01 data={block?.sectionHeading} align="middle" />
        <ContactInfoCarousel block={block} />
      </div>
    </section>
  )
}

export default ContactInfoSection
