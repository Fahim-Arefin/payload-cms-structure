import Link from 'next/link'
import React from 'react'
import Button01 from './Button01'
import LocalizedText from '../../shared/LocalizedText'
import Button02 from './Button02'
import { pageHref, resolvePageSlug } from '@/lib/utils'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'

type Props = {
  item: BasicHeroBlockType['heroes'][number]['ctaButtons']
  groupName?: string
  groupColor?: string
  groupBg?:
    | 'bg-cyan'
    | 'bg-bg-1'
    | 'bg-white-1'
    | 'bg-white-2'
    | 'bg-white-3'
    | 'bg-dark-1'
    | 'bg-dark-2'
    | 'bg-dark-2b'
    | 'bg-dark-3'
}

function CtaButtons({ item, groupName, groupColor = 'text-cyan', groupBg = 'bg-cyan' }: Props) {
  return (
    <>
      {item?.map((block, index) => {
        // If GlobalButton supports children (you already do in the YT button), render label as child:
        const href = block?.sectionId
          ? `/${resolvePageSlug(block?.buttonLink)}/#${block?.sectionId}`
          : pageHref(block.buttonLink)
        return (
          <div key={`pageLink-${index}`}>
            {/* <Link href={pageHref(block.buttonLink)}> */}
            <Link href={href}>
              {block?.style === 'btn01' && (
                <Button01>
                  <LocalizedText en={block.label} bn={block.label} />
                </Button01>
              )}
              {block?.style === 'btn02' && (
                <Button02 groupName={groupName} groupBg={groupBg} groupColor={groupColor}>
                  <LocalizedText en={block.label} bn={block.label} />
                </Button02>
              )}
            </Link>
          </div>
        )
      })}
    </>
  )
}

export default CtaButtons
