import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
import { getGlobalCached } from '@/lib/cachedGlobals'
import type { Footer } from '@/payload-types'

import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

import At from 'public/assets/icons/at.png'
import AtColored from 'public/assets/icons/atC.png'

import Facebook from 'public/assets/icons/fb.png'
import FacebookColored from 'public/assets/icons/fbC.png'

import Linkdin from 'public/assets/icons/ln.png'
import LinkdinColored from 'public/assets/icons/lnC.png'

import WhatsApp from 'public/assets/icons/wa.png'
import WhatsAppColored from 'public/assets/icons/waC.png'

type SocialItem = {
  label: string
  href: string
  normalIcon: StaticImageData
  coloredIcon: StaticImageData
  external?: boolean
}

function GlobalSocialIcon({ item }: { item: SocialItem }) {
  return (
    <Link
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className="
        group relative flex aspect-square w-full items-center justify-center
        overflow-hidden rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]
        shadow-[0_8px_24px_rgba(10,17,40,0.12)]
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

async function GlobalSocialLinks() {
  const footer = await getGlobalCached<Footer>(GLOBAL_FOOTER_SLUG_AND_TAG, 1)

  const footerAny = footer as any

  const email =
    footerAny?.contactInfoSection?.email ||
    footerAny?.factorySection?.email ||
    footerAny?.contactInfo?.email

  const items: SocialItem[] = [
    footer?.social?.facebookUrl
      ? {
          label: 'Facebook',
          href: footer.social.facebookUrl,
          normalIcon: Facebook,
          coloredIcon: FacebookColored,
          external: true,
        }
      : null,
    footer?.social?.linkedinUrl
      ? {
          label: 'LinkedIn',
          href: footer.social.linkedinUrl,
          normalIcon: Linkdin,
          coloredIcon: LinkdinColored,
          external: true,
        }
      : null,

    email
      ? {
          label: 'Email',
          href: `mailto:${email}`,
          normalIcon: At,
          coloredIcon: AtColored,
        }
      : null,
    footer?.social?.whatsApp
      ? {
          label: 'WhatsApp',
          href: footer.social.whatsApp,
          normalIcon: WhatsApp,
          coloredIcon: WhatsAppColored,
          external: true,
        }
      : null,
  ].filter(Boolean) as SocialItem[]

  if (!items.length) return null

  return (
    <div
      className="
        fixed z-40
        left-[18px] xl:left-[24px] top-2/3 -translate-y-1/2

        hidden lg:flex flex-col items-center justify-center
        gap-[6px]
        lg:gap-[8px]
        xl:gap-[9px]
        2xl:gap-[10px]

        w-[32px]
        lg:w-[38px]
        xl:w-[44px]
      "
    >
      {items.map((item) => (
        <div key={item.label} className="w-full">
          <GlobalSocialIcon item={item} />
        </div>
      ))}
    </div>
  )
}

export default GlobalSocialLinks
