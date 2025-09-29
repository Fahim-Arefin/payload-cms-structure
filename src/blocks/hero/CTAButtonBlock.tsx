'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Link from 'next/link'
import { BsPlay } from 'react-icons/bs'
import { useState } from 'react'
import GlobalButton from '@/components/custom/shared/GlobalButton'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import CallNowButton from '@/components/custom/shared/CallNowButton'
import { Page } from '@/payload-types'

type HeroBlock = Extract<Page['layout'][number], { blockType: 'hero' }>
type ctaButtons = NonNullable<HeroBlock['ctaButtons']>

type Props = {
  ctaButtons: ctaButtons
}

export default function CTAButtonBlock({ ctaButtons }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div
      className="absolute top-[245px] md:top-[355px] lg:top-[70%] xl:top-[70%]  2xl:top-[730px] 
        inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
        hero-content-width flex justify-left space-x-4 md:space-x-6 lg:justify-start"
    >
      {ctaButtons?.map((block, index) => {
        if (block?.blockType === 'pageLink') {
          // If GlobalButton supports children (you already do in the YT button), render label as child:
          return (
            <div key={`pageLink-${index}`}>
              <Link href={block.page}>
                <GlobalButton size="large" variant={block.style || 'primary'}>
                  <LocalizedText en={block.label} bn={block.labelBN} />
                </GlobalButton>
              </Link>
            </div>
          )
        }

        if (block?.blockType === 'youtubeVideo') {
          return (
            <div key={`youtubeVideo-${index}`}>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <GlobalButton className="shadow-none flex items-center self-center space-x-0 xl:space-x-1 px-4 py-2 bg-transparent hover:bg-transparent">
                    <div className="p-1 rounded-full border-2 border-white 2xl:p-2">
                      <BsPlay />
                    </div>
                    <div className="text-[12px] sm:text-[13px] md:text-[15px] xl:text-[16px] 2xl:text-[18px] font-normal">
                      <LocalizedText en={block.label} bn={block.labelBN} />
                    </div>
                  </GlobalButton>
                </DialogTrigger>

                <DialogContent
                  className="max-w-5xl w-full aspect-video p-0 bg-black 
                    [&>button.absolute]:top-3 [&>button.absolute]:right-3 
                    [&>button.absolute]:bg-black/50 
                    [&>button.absolute]:text-white 
                    [&>button.absolute]:hover:bg-black/80"
                >
                  <VisuallyHidden>
                    <DialogTitle>Expert Video</DialogTitle>
                  </VisuallyHidden>
                  <iframe
                    width="100%"
                    height="100%"
                    src={block.youtubeUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </DialogContent>
              </Dialog>
            </div>
          )
        }

        if (block?.blockType === 'callNow') {
          const label = (<LocalizedText en={block.label} bn={block.labelBN} />) as unknown as string

          return (
            <div key={`callNow-${index}`}>
              <CallNowButton
                label={label}
                number={block.phoneNumber}
                variant={block.style || 'glass'}
              />
            </div>
          )
        }

        return null
      })}
    </div>
  )
}
