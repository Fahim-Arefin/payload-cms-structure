import { getGlobalCached } from '@/lib/cachedGlobals'
import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
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
import Phone from 'public/assets/icons/phone1.png'
import PhoneColored from 'public/assets/icons/phoneC.png'
import WhatsApp from 'public/assets/icons/wa.png'
import WhatsAppColored from 'public/assets/icons/waC.png'

type SocialItem = {
  label: string
  href: string
  normalIcon: StaticImageData
  coloredIcon: StaticImageData
  external?: boolean
}

function cleanPhoneHref(phone?: string | null) {
  if (!phone) return '#'

  const cleaned = phone.replace(/[^\d+]/g, '')

  return cleaned ? `tel:${cleaned}` : '#'
}

// function GlobalSocialIcon({ item }: { item: SocialItem }) {
//   return (
//     <Link
//       href={item.href}
//       target={item.external ? '_blank' : undefined}
//       rel={item.external ? 'noopener noreferrer' : undefined}
//       aria-label={item.label}
//       className="
//         group relative flex aspect-square w-full items-center justify-center
//         overflow-hidden rounded-[4px]
//         shadow-[0_8px_24px_rgba(10,17,40,0.12)]
//         transition-transform duration-300 ease-out
//         hover:scale-105
//         active:scale-95
//         md:rounded-[5px]
//         lg:rounded-[6px]
//         xl:rounded-[8px]
//       "
//     >
//       <Image
//         src={item.normalIcon}
//         alt={item.label}
//         fill
//         sizes="80px"
//         quality={90}
//         placeholder="blur"
//         blurDataURL={item.normalIcon.blurDataURL}
//         className="
//           object-contain
//           transition-opacity duration-300 ease-out
//           group-hover:opacity-0
//         "
//       />

//       <Image
//         src={item.coloredIcon}
//         alt=""
//         fill
//         sizes="80px"
//         quality={90}
//         placeholder="blur"
//         blurDataURL={item.coloredIcon.blurDataURL}
//         className="
//           object-contain opacity-0
//           transition-opacity duration-300 ease-out
//           group-hover:opacity-100
//         "
//       />
//     </Link>
//   )
// }
function GlobalSocialIcon({ item }: { item: SocialItem }) {
  return (
    <Link
      href={item.href}
      target={item.external ? '_blank' : undefined}
      rel={item.external ? 'noopener noreferrer' : undefined}
      aria-label={item.label}
      className="
        group relative flex aspect-square w-full items-center justify-center
        overflow-hidden rounded-[4px]
        shadow-[0_8px_24px_rgba(10,17,40,0.12)]
        transition-[transform,box-shadow] duration-[850ms]
        ease-[cubic-bezier(0.22,1,0.36,1)]
        will-change-transform
        hover:scale-[1.08]
        hover:shadow-[0_12px_32px_rgba(10,17,40,0.18)]
        active:scale-95
        md:rounded-[5px]
        lg:rounded-[6px]
        xl:rounded-[8px]
      "
    >
      <Image
        src={item.normalIcon}
        alt={item.label}
        fill
        sizes="80px"
        quality={90}
        placeholder="blur"
        blurDataURL={item.normalIcon.blurDataURL}
        className="
          object-contain opacity-100 scale-100
          transition-[opacity,transform] duration-[850ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          will-change-[opacity,transform]
          group-hover:opacity-0
          group-hover:scale-90
        "
      />

      <Image
        src={item.coloredIcon}
        alt=""
        fill
        sizes="80px"
        quality={90}
        placeholder="blur"
        blurDataURL={item.coloredIcon.blurDataURL}
        className="
          object-contain opacity-0 scale-110
          transition-[opacity,transform] duration-[850ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          will-change-[opacity,transform]
          group-hover:opacity-100
          group-hover:scale-100
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

  const phone =
    footerAny?.contactInfoSection?.phone ||
    footerAny?.factorySection?.phone ||
    footerAny?.contactInfo?.phone

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

    phone
      ? {
          label: 'Phone',
          href: cleanPhoneHref(phone),
          normalIcon: Phone,
          coloredIcon: PhoneColored,
        }
      : null,
  ].filter(Boolean) as SocialItem[]

  if (!items.length) return null

  return (
    <div
      className="
        fixed z-40
        left-[8px] top-[84%] -translate-y-1/2
        flex flex-col items-center justify-center
        w-[22px] gap-[4px]

        sm:left-[9px]
        sm:top-[83%]
        sm:w-[24px]
        sm:gap-[5px]

        md:left-[10px]
        md:top-[82%]
        md:w-[26px]
        md:gap-[5px]

        lg:left-[12px]
        lg:top-[80%]
        lg:w-[30px]
        lg:gap-[6px]

        xl:left-[24px]
        xl:top-2/3
        xl:w-[44px]
        xl:gap-[9px]

        2xl:gap-[10px]
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
