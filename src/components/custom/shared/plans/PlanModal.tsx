'use client'

import {
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/components/ui/dialog'
import { PlanBlock } from '@/types/payloadCustomTypes'
import Image from 'next/image'
import LocalizedRichText from '../LocalizedRichText'
import LocalizedText from '../LocalizedText'
import GlobalButton from '../GlobalButton'
import Link from 'next/link'
import LocalizedString from '../LocalizedString'

type Props = {
  data: PlanBlock['planCards'][number]
  items?: PlanBlock['planCards'][number]['modalItems']
}

export default function PlanModal({ data, items }: Props) {
  // brochurePDF can be populated object (with url) or just an ID string
  const href =
    (typeof data.brochurePDF === 'object' && data.brochurePDF?.url) ||
    (typeof data.brochurePDF === 'string' ? `/media/${data.brochurePDF}` : '#')

  const hasPdf = href && href !== '#'

  //   if (!hasPdf) return null

  return (
    <DialogPortal>
      <DialogOverlay className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-sm" />
      <DialogContent className="z-[70] w-[95vw] h-[80vh] lg:h-fit overflow-scroll lg:overflow-hidden md:max-w-2xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl bg-white rounded-lg px-0 py-8">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-[#ED7125] text-center">
            <LocalizedText en={data?.modalTitle} bn={data?.modalTitleBN} />
          </DialogTitle>
        </DialogHeader>
        <div className="px-8 py-4 grid grid-cols-1 justify-center items-start lg:grid-cols-1 gap-x-20 gap-y-6 md:gap-y-6">
          {/* Left column: First 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 xl:gap-12">
            {items &&
              items.map((content, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div
                    className="relative flex-shrink-0
                h-[38px] w-[38px]
                 md:h-[48px] md:w-[48px]
                  flex items-center justify-center"
                  >
                    {typeof content?.icon === 'object' && content?.icon?.url && (
                      <Image
                        fill
                        src={content?.icon?.url}
                        alt={content.title || 'Title'}
                        className="h-full w-full object-contain object-center"
                        placeholder="blur"
                        blurDataURL={content?.iconBlurDataURL || ''}
                        quality={80}
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 md:gap-2">
                    <h3 className="text-[#434342] text-base md:text-lg font-semibold uppercase">
                      <LocalizedText en={content.title} bn={content?.titleBN} />
                    </h3>
                    {(content?.description || content?.descriptionBN) && (
                      <div className="text-[#434342] text-[15px] md:text-base leading-normal font-normal">
                        <LocalizedRichText en={content.description} bn={content.descriptionBN} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        {hasPdf && (
          <div className="flex justify-center gap-x-4 mt-8">
            <Link href={href} target="_blank" prefetch={false}>
              <GlobalButton variant={data?.style ?? 'primary'} text="" size="medium">
                <LocalizedString en={data.label} bn={data.labelBN} />
              </GlobalButton>
            </Link>
          </div>
        )}
      </DialogContent>
    </DialogPortal>
  )
}
