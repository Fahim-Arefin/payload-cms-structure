'use client'

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useMemo, useState } from 'react'
import { BsPlay } from 'react-icons/bs'
import { useLanguage } from '@/context/LanguageContext'

/** Accept either a plain URL string or a Payload Media object (with nullable url) */
type MediaLike =
  | string
  | {
      url?: string | null
      alt?: string | null
      sizes?: Record<string, { url?: (string | null) }>
      // ...other media fields are fine; we only read url
    }
  | null
  | undefined

type NewsItem = {
  image?: MediaLike
  date: string // ISO string from Payload date field
  title: string
  titleBN?: string | null
  description?: string | null
  descriptionBN?: string | null
  videoLink?: string | null
}

type Props = {
  mainImage?: MediaLike
  mainImageSrcLink?: string
  newsItems?: NewsItem[] | null
}

/** Safely extract a URL from either string or Payload media (nullable url). */
const getMediaUrl = (m?: MediaLike): string => {
  if (!m) return ''
  if (typeof m === 'string') return m
  return m.url ?? '' // normalize null → ''
}

/** Example: "15 Jan 2024 | 10.00am" */
const formatDateTime = (iso: string) => {
  try {
    const d = new Date(iso)
    const day = d.getDate().toString().padStart(2, '0')
    const month = d.toLocaleString('en-US', { month: 'short' })
    const year = d.getFullYear()
    let hours = d.getHours()
    const mins = d.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'pm' : 'am'
    hours = hours % 12 || 12
    return `${day} ${month} ${year} | ${hours}.${mins}${ampm}`
  } catch {
    return iso
  }
}

function AllNewsContainer({ mainImage, mainImageSrcLink = '', newsItems }: Props) {
  const { language } = useLanguage()

  // schema enforces exactly 3; defensively slice
  const items = useMemo(
    () => (Array.isArray(newsItems) ? newsItems.slice(0, 3) : []),
    [newsItems]
  )

  const heroSrc = getMediaUrl(mainImage)

  const [heroOpen, setHeroOpen] = useState(false)
  const [newsCardOpen, setNewsCardOpen] = useState(false)
  const [selectedVideo, setSelectedVideo] = useState('')

  return (
    <div
      className="bg-[#434343] 
        rounded-[6px]  md:rounded-[8px] lg:rounded-[11px] xl:rounded-[13px] 2xl:rounded-[15px]
        p-8 lg:p-[20px] xl:p-[40px] 2xl:p-[50px]
        grid grid-cols-1 lg:grid-cols-2 text-white gap-6 xl:gap-12 
        mb-12 lg:mb-16 xl:mb-24"
    >
      {/* Left Banner (uses top-level mainImage) */}
      <Dialog open={heroOpen} onOpenChange={setHeroOpen}>
        <div
          className="relative rounded-[6px] cursor-pointer"
          onClick={() => {
            const firstVideo = items[0]?.videoLink || ''
            if (firstVideo) {
              setSelectedVideo(firstVideo)
              setHeroOpen(true)
            }
          }}
        >
          {heroSrc ? (
            <img
              src={heroSrc}
              alt="Main news"
              className="w-full rounded-[6px] object-cover 
                h-[250px] md:h-[350px] lg:h-full"
            />
          ) : (
            <div className="w-full h-[250px] md:h-[350px] lg:h-full rounded-[6px] bg-black/20 grid place-items-center">
              <span className="opacity-70 text-sm">No main image</span>
            </div>
          )}

          {mainImageSrcLink ? (
            <a
              href={mainImageSrcLink}
              target="_blank"
              rel="noreferrer"
              className="absolute bottom-2 right-2 text-[10px] bg-black/50 px-2 py-1 rounded"
            >
              {language === 'bn' ? 'সূত্র' : 'Source'}
            </a>
          ) : null}

          {(items[0]?.videoLink || '') && (
            <div className="opacity-0 hover:opacity-100 flex transition-all duration-300 absolute inset-0 items-center bg-black/50 justify-center rounded-[6px]">
              <img
                className="w-12 h-12 md:w-16 md:h-16"
                src="/assets/supportpage/web/play2.png"
                alt="play"
              />
            </div>
          )}
        </div>

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
          {selectedVideo ? (
            <iframe
              width="100%"
              height="100%"
              src={selectedVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-white/70">No video</div>
          )}
        </DialogContent>
      </Dialog>

      {/* News List */}
      <div className="space-y-6">
        {items.map((item, idx) => {
          const img = getMediaUrl(item.image)
          const title = language === 'bn' ? item.titleBN || item.title : item.title
          const desc =
            language === 'bn'
              ? item.descriptionBN || item.description || ''
              : item.description || item.descriptionBN || ''
          const dateStr = formatDateTime(item.date)

          return (
            <div key={idx} className="flex items-center space-x-4 lg:space-x-6 h-fit">
              <div
                className="relative rounded-[6px] cursor-pointer
                  min-w-[110px] max-w-[110px] xl:min-w-[140px] xl:max-w-[140px] 
                  h-[110px] xl:h-[140px]"
                onClick={() => {
                  if (item.videoLink) {
                    setSelectedVideo(item.videoLink)
                    setNewsCardOpen(true)
                  }
                }}
              >
                {img ? (
                  <img src={img} alt={title} className="object-cover rounded-md h-full w-full" />
                ) : (
                  <div className="object-cover rounded-md h-full w-full bg-black/20 grid place-items-center">
                    <span className="text-[10px] opacity-70">No image</span>
                  </div>
                )}

                {item.videoLink ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 rounded-md">
                    <BsPlay className="text-white text-2xl xl:text-3xl" />
                  </div>
                ) : null}
              </div>

              <div className="space-y-2 xl:space-y-3">
                <div className="flex items-center">
                  <img src="/assets/supportpage/web/calender2.png" alt="calendar" />
                  <p className="text-[11px] ml-2">{dateStr}</p>
                </div>

                <h3 className="text-[#ED7125] text-[11px] md:text-[15px]">{title}</h3>

                <p className="hidden 2xl:block text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                  {desc.split(' ').slice(0, 40).join(' ')}
                </p>
                <p className="hidden xl:block 2xl:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                  {desc.split(' ').slice(0, 28).join(' ')}
                </p>
                <p className="hidden lg:block xl:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                  {desc.split(' ').slice(0, 13).join(' ')}
                </p>
                <p className="hidden md:block lg:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                  {desc.split(' ').slice(0, 18).join(' ')}
                </p>
                <p className="md:hidden text-[10px] md:text-[13px] leading-relaxed text-[#E5E5E5]">
                  {desc.split(' ').slice(0, 10).join(' ')}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* News Card Video Modal */}
      <Dialog open={newsCardOpen} onOpenChange={setNewsCardOpen}>
        <DialogContent
          className="max-w-5xl w-full aspect-video p-0 bg-black 
            [&>button.absolute]:top-3 [&>button.absolute]:right-3 
            [&>button.absolute]:bg-black/50 
            [&>button.absolute]:text-white 
            [&>button.absolute]:hover:bg-black/80"
        >
          <VisuallyHidden>
            <DialogTitle>News Video</DialogTitle>
          </VisuallyHidden>

          {selectedVideo ? (
            <iframe
              width="100%"
              height="100%"
              src={selectedVideo}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-white/70">No video</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AllNewsContainer
