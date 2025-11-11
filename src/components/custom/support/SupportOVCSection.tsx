'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { FC, useMemo, useState } from 'react'
import { BsPlay } from 'react-icons/bs'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'

/* ------------------------------------------------------------------ */
/* Types: keep loose to match Payload media union (string | object)    */
/* ------------------------------------------------------------------ */
type MediaField =
  | string
  | {
      url?: string | null
      alt?: string | null
      sizes?: Record<string, { url?: string | null }>
    }
  | null
  | undefined

type SupportOVCSectionProps = {
  /** Schema → block.backgroundImage (moved outside the group in schema) */
  backgroundImage?: MediaField
  /** Schema → block.ovcTab.videoLink */
  videoLink?: string | null
  /** Optional headline parts if you want to render them later */
  title?: string | null
  titleBN?: string | null
  highlightedTitle?: string | null
  highlightedTitleBN?: string | null
}

/* ------------------------------------------------------------------ */
/* Helpers                                                            */
/* ------------------------------------------------------------------ */
const mediaUrl = (m?: MediaField): string => {
  if (!m) return ''
  if (typeof m === 'string') return m
  return m.url ?? ''
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */
const SupportOVCSection: FC<SupportOVCSectionProps> = ({
  backgroundImage,
  videoLink,
  title,
  titleBN,
  highlightedTitle,
  highlightedTitleBN,
}) => {
  const [open, setOpen] = useState(false)
  const posterUrl = useMemo(() => mediaUrl(backgroundImage), [backgroundImage])

  return (
    <div
      className="pt-[100px] lg:pt-[120px] xl:pt-[160px] 2xl:pt-[200px]
                 pb-8 md:pb-12 lg:pb-[75px] xl:pb-[90px] 2xl:pb-[100px] bg-white"
    >
      <div
        className="relative w-full font-avenir h-[230px] md:h-[300px] lg:h-[370px] xl:h-[450px] 2xl:h-[500px]
                   rounded-[6px] md:rounded-[8px] lg:rounded-[11px] xl:rounded-[13px] 2xl:rounded-[15px]"
      >
        {/* ───────────────── Background GIF (unchanged) ───────────────── */}
        <img
          src="/assets/bg.gif"
          alt="background gif"
          className="absolute inset-0 w-full h-full object-cover z-0
                     rounded-[6px] md:rounded-[8px] lg:rounded-[11px] xl:rounded-[13px] 2xl:rounded-[15px]"
        />

        {/* Dim overlay on top of the GIF */}
        <div
          className="absolute inset-0 bg-black/60 z-10
                     rounded-[6px] md:rounded-[8px] lg:rounded-[11px] xl:rounded-[13px] 2xl:rounded-[15px]"
        />

        {/* ───────────────── Foreground card with poster from schema ───────────────── */}
        <div
          className="relative z-20 text-white bg-[#3A3A3A]
                     p-4 lg:p-6
                     w-[85%] md:w-[70%] lg:w-[65%] xl:w-[60%] 2xl:w-[52%]
                     h-[250px] md:h-[300px] lg:h-[400px] xl:h-[500px] 2xl:h-[560px]
                     rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px] mx-auto
                     -top-[100px] lg:-top-[120px] xl:-top-[160px] 2xl:-top-[200px]"
        >
          {/* Mobile poster */}
          <div
            className="lg:hidden flex justify-between items-center w-full h-full
                       rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2))${
                posterUrl ? `, url('${posterUrl}')` : ''
              }`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'lightgray',
            }}
          />

          {/* Desktop poster */}
          <div
            className="hidden lg:flex justify-between items-center w-full h-full
                       rounded-[24px] md:rounded-[32px] xl:rounded-[40px] 2xl:rounded-[56px]"
            style={{
              backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.2), rgba(0,0,0,0.2))${
                posterUrl ? `, url('${posterUrl}')` : ''
              }`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundColor: 'lightgray',
            }}
          />

          {/* Trigger row */}
          <div className=" -mt-14 lg:-mt-16 xl:-mt-20">
            <div className="flex items-center justify-between w-[85%] mx-auto">
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div className="flex space-x-2 2xl:space-x-4 text-white items-center cursor-pointer">
                    <div className="border-2 border-white rounded-full p-1 2xl:p-2">
                      <BsPlay />
                    </div>
                    <div className="text-white/70 global-p2">From the Expert</div>
                  </div>
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
                    src={videoLink || ''}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Bottom headline (kept as in your original) */}
        <div
          className="z-20 absolute inset-x-0
                     text-center text-white
                     bottom-8 lg:bottom-7 xl:bottom-9 2xl:bottom-12
                     global-h2 md:font-medium uppercase"
        >
          <LocalizedHighlighted
            textEn={title}
            textBn={titleBN}
            highlightEn={highlightedTitle}
            highlightBn={highlightedTitleBN}
            highlightClassName="text-[#ED7125]"
          />
        </div>
      </div>
    </div>
  )
}

export default SupportOVCSection
