import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { ServiceShowcaseBlockType } from '@/types/payloadCustomTypes'
import React from 'react'
import Tags from './Tags'

type ServiceTab = NonNullable<
  NonNullable<ServiceShowcaseBlockType['serviceShowcase']>['tabs']
>[number]

type CollaborativeHeading = NonNullable<ServiceTab['collaborativeMethod']>['sectionHeading']

type WhatWeBuildHeading = NonNullable<ServiceTab['whatWeBuild']>['sectionHeading']

type Props = {
  data?: CollaborativeHeading | WhatWeBuildHeading
  align: 'left' | 'right' | 'middle'
  dark?: boolean
}

function TabSectionHeading({ data, align, dark = false }: Props) {
  const hasDesc = !!data?.description && !!data?.description?.root?.direction

  const alignmentClass =
    align === 'left' ? 'items-start' : align === 'right' ? 'items-end' : 'items-center'

  const textAlignmentClass =
    align === 'left' ? 'text-start' : align === 'right' ? 'text-end' : 'text-center'

  return (
    <div
      className={`
        flex flex-col justify-center
        ${alignmentClass}

        space-y-1
        lg:space-y-2
        xl:space-y-2.5
        2xl:space-y-3
      `}
    >
      {/* =================================================
          TAG

          One step smaller than normal SectionHeading01.
      ================================================= */}

      {data?.tag && (
        <div
          className="
            origin-center

            [&_*]:!text-[8px]

            md:[&_*]:!text-[9px]

            lg:[&_*]:!text-[10px]

            xl:[&_*]:!text-[11px]

            2xl:[&_*]:!text-[12px]

            3xl:[&_*]:!text-[14px]
          "
        >
          <Tags tag={data.tag} dark={dark} />
        </div>
      )}

      {/* =================================================
          HEADINGS

          Normal SectionHeading01:
          global-h3

          TabSectionHeading:
          global-h4
      ================================================= */}

      <div>
        {data?.heading1 && (
          <div
            className={`
              font-agency
              global-h4

              ${dark ? 'text-white-2' : 'text-secondary-1'}

              ${textAlignmentClass}
            `}
          >
            <LocalizedHighlighted
              textBn={data.heading1}
              textEn={data.heading1}
              highlightEn={data.heading1Highlighted}
              highlightBn={data.heading1Highlighted}
              highlightClassName={
                data?.heading1HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
              }
            />
          </div>
        )}

        {data?.heading2 && (
          <div
            className={`
              font-agency
              global-h4

              ${dark ? 'text-white-2' : 'text-secondary-1'}

              ${textAlignmentClass}
            `}
          >
            <LocalizedHighlighted
              textBn={data.heading2}
              textEn={data.heading2}
              highlightEn={data.heading2Highlighted}
              highlightBn={data.heading2Highlighted}
              highlightClassName={
                data?.heading2HighlightColor === 'primary' ? 'text-primary-2' : 'text-primary-1'
              }
            />
          </div>
        )}
      </div>

      {/* =================================================
          DESCRIPTION

          Normal SectionHeading01:
          global-p4

          TabSectionHeading:
          global-p5
      ================================================= */}

      {hasDesc && (
        <div
          className={`
            font-grift
            global-p5

            ${dark ? 'text-white-1' : 'text-secondary-2'}

            ${textAlignmentClass}
          `}
        >
          <LocalizedRichText en={data.description} bn={data.description} />
        </div>
      )}
    </div>
  )
}

export default TabSectionHeading
