import { FounderQuoteBlockType } from '@/types/payloadCustomTypes'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

import At from 'public/assets/icons/at.png'
import AtColored from 'public/assets/icons/atC.png'

import Facebook from 'public/assets/icons/fb.png'
import FacebookColored from 'public/assets/icons/fbC.png'

import Linkdin from 'public/assets/icons/ln.png'
import LinkdinColored from 'public/assets/icons/lnC.png'

// Change these names if your WhatsApp files are different
import WhatsApp from 'public/assets/icons/wa.png'
import WhatsAppColored from 'public/assets/icons/waC.png'

type Props = {
  data: FounderQuoteBlockType['founderInfo']
  className?: string
}

type SocialItem = {
  label: string
  href: string
  normalIcon: StaticImageData
  coloredIcon: StaticImageData
  external?: boolean
}

function SocialIcon({ item }: { item: SocialItem }) {
  return (
    <Link
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className="
        group relative flex aspect-square w-full items-center justify-center
        overflow-hidden rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]
      "
    >
      {/* normal icon */}
      <Image
        src={item.normalIcon}
        alt={item.label}
        fill
        sizes="80px"
        quality={90}
        placeholder="blur"
        blurDataURL={item.normalIcon.blurDataURL}
        className="
          object-contain
          transition-opacity duration-300 ease-out
          group-hover:opacity-0
        "
      />

      {/* colored icon */}
      <Image
        src={item.coloredIcon}
        alt=""
        fill
        sizes="80px"
        quality={90}
        placeholder="blur"
        blurDataURL={item.coloredIcon.blurDataURL}
        className="
          object-contain opacity-0
          transition-opacity duration-300 ease-out
          group-hover:opacity-100
        "
      />
    </Link>
  )
}

function SocialSection({ data, className }: Props) {
  const items: SocialItem[] = [
    data?.facebookUrl
      ? {
          label: 'Facebook',
          href: data.facebookUrl,
          normalIcon: Facebook,
          coloredIcon: FacebookColored,
          external: true,
        }
      : null,

    data?.linkedinUrl
      ? {
          label: 'LinkedIn',
          href: data.linkedinUrl,
          normalIcon: Linkdin,
          coloredIcon: LinkdinColored,
          external: true,
        }
      : null,
    data?.emailAddress
      ? {
          label: 'Email',
          href: `mailto:${data.emailAddress}`,
          normalIcon: At,
          coloredIcon: AtColored,
        }
      : null,
    data?.whatsApp
      ? {
          label: 'WhatsApp',
          href: data.whatsApp,
          normalIcon: WhatsApp,
          coloredIcon: WhatsAppColored,
          external: true,
        }
      : null,
  ].filter(Boolean) as SocialItem[]

  if (!items.length) return null

  return (
    <div
      className={`
        flex w-full items-center justify-center 
        gap-[4px]
        lg:gap-[8px]
        2xl:gap-[9px]
        ${className ?? ''}
      `}
    >
      {items.map((item) => (
        <div key={item.label} className="w-[20%]">
          <SocialIcon item={item} />
        </div>
      ))}
    </div>
  )
}

export default SocialSection
