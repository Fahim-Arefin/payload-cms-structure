import { pageHrefWithAnchor } from '@/lib/utils'
import { BasicHeroBlockType } from '@/types/payloadCustomTypes'
import Link from 'next/link'
import LocalizedText from '../../shared/LocalizedText'
import Button01 from './Button01'
import Button02 from './Button02'

type Props = {
  item: BasicHeroBlockType['heroes'][number]['ctaButtons']
}

function CtaButtons({ item }: Props) {
  return (
    <>
      {item?.map((block, index) => {
        const href = pageHrefWithAnchor(block?.buttonLink, block?.sectionId)

        return (
          <div key={`pageLink-${index}`}>
            <Link href={href}>
              {block?.style === 'btn01' && (
                <Button01>
                  <LocalizedText en={block.label} bn={block.label} />
                </Button01>
              )}
              {block?.style === 'btn02' && (
                <Button02>
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
