import { IntroHeroBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

import IntroHeroVideo from './IntroHeroVideo'

type Props = {
  block: IntroHeroBlockType
}

function IntroHeroSection({ block }: Props) {
  const video = typeof block?.video === 'object' ? block.video : null

  const thumbnail = typeof block?.thumbnail === 'object' ? block.thumbnail : null

  if (!video?.url) {
    return null
  }

  return (
    <section
      className="
        relative
        w-full
        overflow-hidden
        container-padding
      "
    >
      {/* =================================================
          SUBTLE BACKGROUND LIGHTING

          Keeps the background visually close to the Figma
          without requiring another CMS media field.
      ================================================= */}
      {/* 
      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute
          inset-0

          bg-[radial-gradient(circle_at_70%_15%,rgba(255,255,255,0.055),transparent_38%),radial-gradient(circle_at_18%_66%,rgba(255,255,255,0.025),transparent_38%)]
        "
      /> */}

      <div
        className="
          relative
          z-10

          mx-auto

          w-full

         
        "
      >
        {/* =================================================
            TITLE AREA
        ================================================= */}

        <div
          className="
            mx-auto

            flex

            w-fit
            max-w-full

            flex-col

            items-end

            text-right
            [--intro-title-size:58px]
            md:[--intro-title-size:82px]
            lg:[--intro-title-size:92px]
            xl:[--intro-title-size:106px]
            2xl:[--intro-title-size:120px]
            3xl:[--intro-title-size:132px]
          "
        >
          {block?.title && (
            <h1
              className="
                text-white

                

                font-normal

                leading-[.92]
                max-w-full
                [overflow-wrap:anywhere]
                text-[length:var(--intro-title-size)]

                
              "
              style={{
                fontFamily: 'Baltiholm, cursive',
              }}
            >
              {block.title}
            </h1>
          )}

          {block?.subtitle && (
            <p
              className={`
                [overflow-wrap:anywhere]
                ${block?.title ? 'mt-[calc(var(--intro-title-size)*-0.1)] pr-[calc(var(--intro-title-size)*0.55)]' : ''}

                font-roboto
                font-normal
                leading-[1.35]
                text-white
                global-p1
              `}
            >
              {block.subtitle}
            </p>
          )}
        </div>

        {/* =================================================
            VIDEO

            Shared 16:9 ratio for:
            video + poster thumbnail
        ================================================= */}

        <div
          className="
            relative

            mx-auto

            mt-[24px]

            aspect-video

            w-full

            overflow-hidden

            rounded-[6px]

            bg-[#191817]

            shadow-[0_22px_65px_rgba(0,0,0,0.20)]


            md:mt-[30px]

            md:rounded-[8px]

            lg:mt-[40px]

            lg:rounded-[10px]
            xl:rounded-[16px]
            2xl:rounded-[20px]

            xl:mt-[50px]

            2xl:mt-[66px]
          "
        >
          <IntroHeroVideo
            src={video.url}
            poster={thumbnail?.url || undefined}
            mimeType={video?.mimeType}
          />

          {/* subtle dark treatment matching Figma */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none

              absolute
              inset-0

              z-10

              bg-gradient-to-b

              from-black/[0.03]

              via-transparent

              to-black/[0.10]
            "
          />
        </div>
      </div>
    </section>
  )
}

export default IntroHeroSection
