import Button01 from '@/components/custom/sagar-ropes-shared/buttons/Button01'
import CtaButtons from '@/components/custom/sagar-ropes-shared/buttons/CtaButtons'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'

import Image from 'next/image'
import DownloadIcon from 'public/assets/icons/downloadIcon.png'
import Link from 'next/link'
import React from 'react'
import Tags from './Tags'
import { CS_DevelopmentFrameworkBlockType } from '@/types/payloadCustomTypes'

type Props = {
  data: CS_DevelopmentFrameworkBlockType['sectionHeading']
  align: 'left' | 'right' | 'middle'
  dark?: boolean
}

function getDownloadFileUrl(file: unknown) {
  if (!file || typeof file !== 'object') return ''

  const fileObject = file as {
    url?: string | null
    filename?: string | null
  }

  return fileObject?.url || ''
}

function SectionHeading02({ data, align, dark = false }: Props) {
  const hasDesc = !!data?.description && !!data?.description?.root?.direction
  const hasCtaButtons = !!data?.ctaButtons && data?.ctaButtons?.length > 0

  const downloadLabel = data?.downloadButton?.label
  const downloadUrl = getDownloadFileUrl(data?.downloadButton?.file)

  const hasDownloadButton = !!downloadLabel && !!downloadUrl
  const hasActions = hasCtaButtons || hasDownloadButton

  return (
    <div
      className={`
        flex flex-col justify-center
        ${align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center'}
        space-y-1 lg:space-y-2 xl:space-y-3 2xl:space-y-4
      `}
    >
      {data?.tag && <Tags tag={data.tag} dark={dark} />}

      {data?.heading1 && (
        <div
          className={`
            font-agency global-h3
            ${dark ? 'text-white-2' : 'text-secondary-1'}
            ${align === 'left' ? 'text-start' : align === 'right' ? 'text-end' : 'text-center'}
          `}
        >
          <LocalizedHighlighted
            textBn={data.heading1}
            textEn={data.heading1}
            highlightEn={data.heading1Highlighted}
            highlightBn={data.heading1Highlighted}
            highlightClassName={`${
              data?.heading1HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
            }`}
          />
        </div>
      )}

      {data?.heading2 && (
        <div
          className={`
            font-agency global-h3
            ${dark ? 'text-white-2' : 'text-secondary-1'}
            ${align === 'left' ? 'text-start' : align === 'right' ? 'text-end' : 'text-center'}
          `}
        >
          <LocalizedHighlighted
            textBn={data.heading2}
            textEn={data.heading2}
            highlightEn={data.heading2Highlighted}
            highlightBn={data.heading2Highlighted}
            highlightClassName={`${
              data?.heading2HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
            }`}
          />
        </div>
      )}

      {hasDesc && (
        <div
          className={`
            font-grift global-p4
            ${dark ? 'text-white-1' : 'text-secondary-2'}
            ${align === 'left' ? 'text-start' : align === 'right' ? 'text-end' : 'text-center'}
          `}
        >
          <LocalizedRichText en={data.description} bn={data.description} />
        </div>
      )}

      {hasActions && (
        <div
          className={`
            flex flex-wrap items-center gap-3 pt-[14px]
            lg:gap-4 lg:pt-[18px]
            xl:pt-[22px]
            ${
              align === 'left'
                ? 'justify-start'
                : align === 'right'
                  ? 'justify-end'
                  : 'justify-center'
            }
          `}
        >
          {hasCtaButtons && <CtaButtons item={data.ctaButtons} />}

          {hasDownloadButton && (
            <Link
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="
      group/download-btn
      relative isolate overflow-hidden
      inline-flex items-center justify-center
      font-grift global-btn font-bold
      text-white-1
      bg-primary-1 hover:bg-primary-1
      rounded-[8px] lg:rounded-[12px] xl:rounded-[15px]
      h-[35px] lg:h-[40px] xl:h-[52px]
      px-[12px] lg:px-[18px] xl:px-[24px]
    "
              style={{
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 10px 24px rgba(0, 108, 103, 0.28)',
              }}
            >
              <span
                className="
        pointer-events-none
        absolute left-0 top-0 z-0
        h-full w-0
        rounded-r-[15px]
        bg-[#6EC9C71A]
        opacity-0
        backdrop-blur-[10px]
        transition-all duration-300 ease-out
        group-hover/download-btn:w-[95%]
        group-hover/download-btn:opacity-100
      "
              />

              <span className="relative z-10 pr-2 xl:pr-2.5">{downloadLabel}</span>

              <Image
                src={DownloadIcon}
                alt=""
                width={18}
                height={18}
                className="
        relative z-10 shrink-0 object-contain
        h-[13px] w-[13px]
        lg:h-[15px] lg:w-[15px]
        xl:h-[18px] xl:w-[18px]
        transition-transform duration-300 ease-out
        group-hover/download-btn:translate-y-[2px]
      "
              />

              <span
                aria-hidden="true"
                className="
        pointer-events-none
        absolute inset-0 z-20
        rounded-[8px] lg:rounded-[12px] xl:rounded-[15px]
      "
                style={{
                  boxShadow: `
          inset 0 0 0 1px rgba(110, 201, 199, 0.65),
          inset 1.5px 1.5px 0 rgba(255, 251, 252, 0.45),
          inset -1.5px -1.5px 0 rgba(255, 251, 252, 0.28),
          inset 0 -2px 8px rgba(110, 201, 199, 0.35),
          0 0 0 1px rgba(110, 201, 199, 0.35),
          0 8px 18px rgba(0, 108, 103, 0.35)
        `,
                }}
              />
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default SectionHeading02
