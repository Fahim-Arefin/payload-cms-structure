import { GlobalBlog } from '@/payload-types'
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'
import { formatLocalDhaka, formatMonDYYYYBN } from '@/lib/utils'
import LocalizedRichText from '../shared/LocalizedRichText'
import { BlogDetailsSectionType } from '@/types/payloadCustomTypes'

type Props = {
  data: GlobalBlog['blogs'][number]
  block: BlogDetailsSectionType
}

function NewsDetailsSection({ data, block }: Props) {
  return (
    <div className="container-padding " style={{ backgroundColor: block?.backgroundColor || '' }}>
      <div className="space-y-8 lg:space-y-12">
        <div className="">
          <div className="text-[#6E6E6E] global-p2 uppercase tracking-[2px] mb-2">
            {data?.importantDate && data?.importantDateBN ? (
              <LocalizedText en={data?.importantDate} bn={data?.importantDateBN} />
            ) : (
              <LocalizedText
                en={formatLocalDhaka(data?.updatedAt ? data?.updatedAt : '')}
                bn={formatMonDYYYYBN(data?.updatedAt ? data?.updatedAt : '')}
              />
            )}
          </div>
          <h2 className="global-h2 font-normal">
            <LocalizedText en={data?.title} bn={data?.titleBN} />
          </h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 ">
          <div
            role="img"
            aria-label={data?.title}
            className={`relative
    md:rounded-md lg:rounded-lg xl:rounded-xl 
    w-full md:min-w-[200px] lg:min-w-[230px] lg:max-w-[230px] xl:min-w-[300px] xl:max-w-[300px] 2xl:min-w-[350px] 2xl:max-w-[350px] h-fit
    aspect-[600/375]
  `}
          >
            {typeof data?.image === 'object' && data?.image?.url && (
              <Image
                src={data?.image?.url}
                alt={data?.title}
                fill
                className="md:rounded-md lg:rounded-lg xl:rounded-xl "
                sizes="(max-width: 767px) 300px, 600px"
                placeholder="blur"
                blurDataURL={data?.imageBlurDataURL || ''}
                quality={80}
              />
            )}
          </div>

          <div
            className="global-p2 leading-6 text-justify"
            style={{
              alignSelf: 'stretch',
            }}
          >
            <LocalizedRichText en={data?.description} bn={data?.descriptionBN} />

            {/* External News Link */}
            {(data?.newsLinkBtnText || data?.newsLinkBtnTextBN) && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <a
                  href={data.newsLink ?? ''}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#9C8639] hover:text-[#7A6B2D] font-medium transition-colors"
                >
                  <LocalizedText en={data?.newsLinkBtnText} bn={data?.newsLinkBtnTextBN} />
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-current"
                  >
                    <path
                      d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailsSection
