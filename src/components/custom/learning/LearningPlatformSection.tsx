'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import { LearningMediaSectionBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: LearningMediaSectionBlockType
}

export default function LearningMediaSection({ block }: Props) {
  const bgColor = block?.bgColor || '#FCF4EB'

  const instagramImages = Array.isArray(block?.instagramImages)
    ? block.instagramImages.slice(0, 9)
    : []
  const facebookImages = Array.isArray(block?.facebookImages)
    ? block.facebookImages.slice(0, 9)
    : []
  const linkedinImages = Array.isArray(block?.linkedinImages)
    ? block.linkedinImages.slice(0, 9)
    : []

  const followEn = (block?.buttonText ?? 'Follow').trim()
  const followBn = (block?.buttonTextBN ?? 'ফলো করুন').trim()

  return (
    <section className="w-full container-padding" style={{ backgroundColor: bgColor }}>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 xl:gap-8">
          {/* Instagram column */}
          <SocialGridCard
            icon={block?.instagramIcon as any}
            iconBlur={block?.instagramIconBlurDataURL}
            label="Instagram"
            images={instagramImages as any}
            followEn={followEn}
            followBn={followBn}
            linkHref={block?.instagramLinkText || undefined}
          />

          {/* Facebook column */}
          <SocialGridCard
            icon={block?.facebookIcon as any}
            iconBlur={block?.facebookIconBlurDataURL}
            label="Facebook"
            images={facebookImages as any}
            followEn={followEn}
            followBn={followBn}
            linkHref={block?.facebookLinkText || undefined}
          />

          {/* LinkedIn column */}
          <SocialGridCard
            icon={block?.linkedinIcon as any}
            iconBlur={block?.linkedinIconBlurDataURL}
            label="LinkedIn"
            images={linkedinImages as any}
            followEn={followEn}
            followBn={followBn}
            linkHref={block?.linkedinLinkText || undefined}
          />

          {/* YouTube subscribe column */}
          <YoutubeSubscribeCard block={block} />
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Social grid card (Instagram / Facebook / LinkedIn)                 */
/* ------------------------------------------------------------------ */

type SocialImage = {
  image?: { url?: string } | string | null
  imageBlurDataURL?: string | null
}

type SocialGridCardProps = {
  icon?: { url?: string } | string | null
  iconBlur?: string | null
  label: string
  images: SocialImage[]
  followEn: string
  followBn: string
  /** external profile URL; if present the whole card becomes clickable */
  linkHref?: string
}

function SocialGridCard({
  icon,
  iconBlur,
  label,
  images,
  followEn,
  followBn,
  linkHref,
}: SocialGridCardProps) {
  const iconUrl =
    icon && typeof icon === 'object'
      ? ((icon as any).url ?? '')
      : typeof icon === 'string'
        ? icon
        : ''

  const cardBody = (
    <div className="flex flex-col items-center">
      {/* icon */}
      <div className="h-12 w-12 md:h-14 md:w-14 relative mb-4">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt={`${label} icon`}
            fill
            className="object-contain"
            placeholder={iconBlur ? 'blur' : 'empty'}
            blurDataURL={iconBlur || undefined}
            // sizes="80px"
          />
        )}
      </div>

      {/* orange line */}
      <div className="w-1/3 border-t-2 border-[#ED7125] mb-4" />

      {/* 3x3 images grid */}
      <div className="grid grid-cols-3 gap-[2px] md:gap-1 w-full mb-3 justify-items-center">
        {images.map((item, idx) => {
          const img = item?.image
          const imgUrl =
            img && typeof img === 'object'
              ? ((img as any).url ?? '')
              : typeof img === 'string'
                ? img
                : ''

          if (!imgUrl) return null

          return (
            <div key={idx} className="relative w-[80px] h-[100px] overflow-hidden">
              <Image
                src={imgUrl}
                alt={`${label} image ${idx + 1}`}
                fill
                className="object-cover"
                placeholder={item?.imageBlurDataURL ? 'blur' : 'empty'}
                blurDataURL={item?.imageBlurDataURL || undefined}
                // sizes="62px"
              />
            </div>
          )
        })}
      </div>

      {/* Follow label */}
      <p className="text-[#ED7125] text-xs md:text-sm font-normal">
        <LocalizedString en={followEn} bn={followBn} />
      </p>
    </div>
  )

  // If we have a link, wrap the whole column in an <a> so icon, grid and text are clickable
  if (linkHref) {
    return (
      <a
        href={linkHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center hover:opacity-90 transition-opacity cursor-pointer"
        aria-label={`${label} profile`}
      >
        {cardBody}
      </a>
    )
  }

  // Fallback: not clickable
  return <div className="flex flex-col items-center">{cardBody}</div>
}

/* ------------------------------------------------------------------ */
/*  YouTube subscribe card                                            */
/* ------------------------------------------------------------------ */

type YoutubeCardProps = {
  block: LearningMediaSectionBlockType
}

function YoutubeSubscribeCard({ block }: YoutubeCardProps) {
  const icon = block?.youtubeIcon
  const iconUrl =
    icon && typeof icon === 'object'
      ? ((icon as any).url ?? '')
      : typeof icon === 'string'
        ? icon
        : ''
  const iconBlur = block?.youtubeIconBlurDataURL || undefined

  const leadingEn = block?.youtubeLeadingText || ''
  const leadingBn = block?.youtubeLeadingTextBN || ''
  const placeholderEn = block?.youtubeInputPlaceholder || ''
  const placeholderBn = block?.youtubeInputPlaceholderBN || ''
  const buttonEn = (block?.youtubeButtonText ?? 'Subscribe').trim()
  const buttonBn = (block?.youtubeButtonTextBN ?? 'সাবস্ক্রাইব করুন').trim()

  return (
    <div className="w-full bg-[#f7f7f7] rounded-lg px-6 pb-10 flex flex-col items-center shadow-sm">
      {/* icon */}
      <div className="h-16 w-20 relative mb-6">
        {iconUrl && (
          <Image
            src={iconUrl}
            alt="YouTube icon"
            fill
            className="object-contain"
            placeholder={iconBlur ? 'blur' : 'empty'}
            blurDataURL={iconBlur}
            sizes="120px"
          />
        )}
      </div>

      {/* leading text */}
      <p className="text-center text-[#262626] text-xs md:text-sm mb-5 leading-relaxed">
        <LocalizedText en={leadingEn} bn={leadingBn} />
      </p>

      {/* input */}
      <div className="w-full mb-4 ">
        <input
          type="email"
          className="w-full py-6 md:h-11 rounded-sm bg-white placeholder:text-[#AEB2B3] px-3 text-xs md:text-sm outline-none"
          placeholder={
            placeholderEn || placeholderBn
              ? `${placeholderEn}${placeholderEn && placeholderBn ? ' / ' : ''}${placeholderBn}`
              : ''
          }
        />
      </div>

      {/* button */}
      <Button className="w-full bg-black text-[#FEFEFE] py-6 mb-10 hover:bg-black/90 rounded-none text-xs md:text-sm">
        <LocalizedString en={buttonEn} bn={buttonBn} />
      </Button>
    </div>
  )
}
