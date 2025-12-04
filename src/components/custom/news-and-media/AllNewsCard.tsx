import { Button } from '@/components/ui/button'
import { GlobalBlog } from '@/payload-types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import LocalizedText from '../shared/LocalizedText'
import LocalizedRichText from '../shared/LocalizedRichText'
import { buildDetailHref, formatLocalDhaka, formatMonDYYYYBN, resolvePageSlug } from '@/lib/utils'
import { AllBlogsSectionType } from '@/types/payloadCustomTypes'

type Props = {
  data: GlobalBlog['blogs'][number]
  index: number
  length: number
  block: AllBlogsSectionType
}

function AllNewsCard({ data, index, length, block }: Props) {
  const pattern = resolvePageSlug(block?.linkTarget) ?? ''

  return (
    <div
      className="relative grid grid-cols-1 lg:grid-cols-9 
    gap-6 xl:gap-12"
    >
      {/* left */}
      <div
        className={` relative 
       w-full aspect-[600/375] 
        lg:col-span-4 ${index % 2 !== 0 ? ' lg:order-2' : ' lg:order-1 '}`}
      >
        {typeof data?.image === 'object' && data?.image?.url && (
          <Image
            fill
            src={data?.image?.url}
            alt={data?.title}
            className="object-cover object-center"
            sizes="(max-width: 767px) 300px, 600px"
            placeholder="blur"
            blurDataURL={data?.imageBlurDataURL || ''}
            quality={80}
          />
        )}
        <div
          className={`h-5 w-5 bg-white absolute bottom-0 ${index % 2 !== 0 ? ' right-0' : ' left-0 '}`}
        ></div>
      </div>
      {/* right */}
      <div
        className={` lg:col-span-5 
        space-y-3 xl:space-y-6 
        text-center lg:text-start
        max-w-[90%] lg:max-w-full mx-auto lg:mx-0 ${index % 2 !== 0 ? ' lg:order-1 ' : ' lg:order-2 '}`}
      >
        <h5 className="text-[#6E6E6E] global-p2 uppercase tracking-[2px]">
          {data?.importantDate && data?.importantDateBN ? (
            <LocalizedText en={data?.importantDate} bn={data?.importantDateBN} />
          ) : (
            <LocalizedText
              en={formatLocalDhaka(data?.updatedAt ? data?.updatedAt : '')}
              bn={formatMonDYYYYBN(data?.updatedAt ? data?.updatedAt : '')}
            />
          )}
        </h5>
        <h3 className="global-span ">
          <LocalizedText en={data?.title} bn={data?.titleBN} />
        </h3>
        <div
          className="global-p2 leading-6 line-clamp-4 lg:line-clamp-3 xl:line-clamp-4 2xl:line-clamp-[6] text-justify"
          style={{
            alignSelf: 'stretch',
          }}
        >
          {/* {data?.description} */}
          <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />
        </div>
        <div>
          <Button
            asChild
            variant="link"
            className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit mx-auto lg:mx-0
            global-p2 p-0"
          >
            <Link href={buildDetailHref(pattern, data.id ? data.id : '')} passHref>
              <div className="flex space-x-1 items-center uppercase ">
                {/* <span>Read More</span> */}
                {/* <LocalizedText en={`Read More`} bn={`বিস্তারিত পড়ুন`} /> */}
                <LocalizedText en={block?.readMoreText} bn={block?.readMoreTextBN} />
                <ArrowUpRight />
              </div>
            </Link>
          </Button>
        </div>
      </div>
      {/* horizontal line */}
      {/* index !== length - 1 */}
      {index !== length - 1 && (
        <div className="hidden lg:block absolute inset-x-0 -bottom-12 mx-auto w-full lg:w-[60%] xl:w-fit">
          <img src="/assets/images/verticalline.png" alt="" className="w-full h-full" />
        </div>
      )}
    </div>
  )
}

export default AllNewsCard
