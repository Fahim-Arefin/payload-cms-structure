'use client'

import { AgentVisionBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import LocalizedRichText from '../shared/LocalizedRichText'

type Props = {
  visionData: AgentVisionBlockType
}

/* ---------- helpers ---------- */
function hexToRgb(hex: string): [number, number, number] {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || '')
  if (!m) return [0, 0, 0]
  return [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)]
}

function overlayToCss(layer: { color: string; opacity: number; angle: number }) {
  const [r, g, b] = hexToRgb(layer.color || '#000000')
  const a = Math.max(0, Math.min(1, Number(layer.opacity ?? 1)))
  const ang = Number.isFinite(layer.angle) ? Number(layer.angle) : 0
  // flat linear-gradient (same color at both stops)
  return `linear-gradient(${ang}deg, rgba(${r}, ${g}, ${b}, ${a}), rgba(${r}, ${g}, ${b}, ${a}))`
}

function OnboardingVision({ visionData }: Props) {
  const { backgroundImage, items = [], overlayLayers = [] } = visionData || {}
  // Fallback overlay if CMS array is empty:
  const effectiveOverlays =
    (overlayLayers || []).length > 0
      ? overlayLayers
      : [{ color: '#000000', opacity: 0.72, angle: 0 }]

  return (
    <div className="container-padding text-white relative">
      {/* Desktop bg */}
      {typeof backgroundImage === 'object' && backgroundImage?.url && (
        <Image
          fill
          src={backgroundImage?.url}
          alt="vision background image"
          className="object-cover object-center z-10"
          sizes="100vw"
          placeholder="blur"
          blurDataURL={visionData?.backgroundImageBlurDataURL || ''}
          quality={80}
        />
      )}

      {/* Overlay (one layer for both) */}
      {/* <div
        aria-hidden
        className="z-20 absolute inset-0 pointer-events-none "
        style={{
          backgroundImage:
            'linear-gradient(0deg, rgba(0, 0, 0, 0.72) 0%, rgba(0, 0, 0, 0.72) 100%)',
        }}
      /> */}
      {/* Overlay 1: black 20% (top-most) */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(0,0,0,0.20), rgba(0,0,0,0.20))',
        }}
      /> */}

      {/* Overlay 2: white 20% (below the black, still above img) */}
      {/* <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          backgroundImage: 'linear-gradient(0deg, rgba(255,255,255,0.20), rgba(255,255,255,0.20))',
        }}
      /> */}

      {/* Overlays — topmost first as entered in CMS */}
      {(effectiveOverlays || []).map((layer, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: overlayToCss(layer as any),
            zIndex: 30 - i,
          }}
        />
      ))}

      {/* Title */}
      <h1 className="relative z-30 global-h1 font-semibold uppercase mb-10 text-white">
        {/* Join Our <span className="text-[#ED7125]">Vision</span> */}
        <LocalizedHighlighted
          textEn={visionData?.title}
          textBn={visionData?.titleBN}
          highlightEn={visionData?.highlightedText}
          highlightBn={visionData?.highlightedTextBN}
        />
      </h1>

      {/* Cards */}
      <div className="relative z-30 grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8 ">
        {items.map((item, index: number) => (
          //bg-[#43434333]
          // bg-[#9C86394D]
          <div
            key={index}
            className="rounded-xl  flex flex-col border-[1.667px] border-white 
            space-y-3 md:space-y-4 lg:space-y-8 xl:space-y-12 2xl:space-y-16
            px-5 md:px-8 lg:px-10 xl:px-14 2xl:px-[70px]
            py-5 md:py-8 lg:py-10 xl:py-14 2xl:py-[70px] 
            min-h-[150px] md:min-h-[250px] lg:min-h-[450px] xl:min-h-[550px] 2xl:min-h-[650px]"
            style={{
              backdropFilter: 'blur(16.6667px)',
              WebkitBackdropFilter: 'blur(16.6667px)',
              backgroundColor: item?.cardBgHex8 || '',
            }}
          >
            <div className="relative w-[44px] h-[44px] lg:w-[100px] lg:h-[100px]">
              {typeof item?.icon === 'object' && item?.icon?.url && (
                <Image
                  fill
                  src={item?.icon?.url}
                  alt={`icon-${index}`}
                  className="object-contain object-center"
                  placeholder="blur"
                  blurDataURL={item?.iconBlurDataURL || ''}
                  quality={80}
                />
              )}
            </div>

            <h2 className="global-p1 font-bold uppercase text-white">
              <LocalizedText en={item?.title} bn={item?.titleBN} />
            </h2>

            {/* Bullet List */}
            <div
              className="flex flex-col  mb-4 lg:mb-10 
            gap-2 md:gap-3 xl:gap-4 2xl:gap-5 "
            >
              {/* {item.points.map((point, i) => (
                <div key={i} className="relative pl-6 text-white/90 global-p1">
                  <span className="absolute left-0 top-0 font-medium">•</span>
                  {point}
                </div>
              ))} */}
              <div className="text-white/90 global-p1 [--rt-li-gap-y:1rem] lg:-mt-4">
                <LocalizedRichText en={item?.description} bn={item?.descriptionBN} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnboardingVision
