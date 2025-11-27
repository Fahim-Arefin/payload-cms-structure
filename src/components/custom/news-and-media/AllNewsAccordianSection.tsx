'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { GlobalBlog } from '@/payload-types'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import GlobalButton from '../shared/GlobalButton'
import SearchNews from './SearchNews'
import { AllNewsSectionType } from '@/types/payloadCustomTypes'
import LocalizedText from '../shared/LocalizedText'
import { formatLocalDhaka, formatMonDYYYYBN } from '@/lib/utils'
import LocalizedRichText from '../shared/LocalizedRichText'
import LocalizedString from '../shared/LocalizedString'

type Props = {
  allNewsData: GlobalBlog['blogs']
  allContent: GlobalBlog['blogs']
  block: AllNewsSectionType
}

export default function AllNewsAccordionSection({ allNewsData, allContent, block }: Props) {
  const [showAll, setShowAll] = useState(false)

  const hasMoreNews = allNewsData.length > 3

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  return (
    <div
      className={`container-padding
      ${
        showAll
          ? 'pb-12 md:pb-24 lg:pb-[110px] xl:pb-[100px] 2xl:pb-[150px]'
          : 'pb-6 md:pb-12 lg:pb-[60px] xl:pb-[70px] 2xl:pb-[80px]'
      }
      transition-all duration-700 ease-in-out`}
    >
      <SearchNews block={block} allContent={allContent} />
      <Accordion
        type="single"
        collapsible
        className="space-y-2 pt-[30px] md:pt-[40px] lg:pt-[50px] xl:pt-[60px] 2xl:pt-[70px]"
      >
        {/* First 3 news - always visible */}
        {allNewsData.slice(0, 3).map((news, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="rounded-xl border border-[#EAD9C6] bg-white px-4 md:px-6"
          >
            <AccordionTrigger className="py-4 text-left hover:no-underline font-normal">
              <div
                className="flex flex-col items-start 
              space-y-1 lg:space-y-1.5 xl:space-y-2 2xl:space-y-2.5 "
              >
                <p className="text-[#6E6E6E] global-p2 uppercase tracking-[2px] ">
                  {news?.importantDate && news?.importantDateBN ? (
                    <LocalizedText en={news?.importantDate} bn={news?.importantDateBN} />
                  ) : (
                    <LocalizedText
                      en={formatLocalDhaka(news?.updatedAt ? news?.updatedAt : '')}
                      bn={formatMonDYYYYBN(news?.updatedAt ? news?.updatedAt : '')}
                    />
                  )}
                </p>
                <div className="global-p1 font-normal">
                  <LocalizedText en={news?.title} bn={news?.titleBN} />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 lg:pt-2 xl:pt-3.5 2xl:pt-4 ">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
                <div
                  // md:h-[150px] lg:h-[160px] xl:h-[200px] 2xl:h-[220px]
                  className="col-span-1 relative rounded-md lg:rounded-lg xl:rounded-xl 
                  w-full h-fit
                  aspect-[600/375] 
                  "
                >
                  {typeof news?.image === 'object' && news?.image?.url && (
                    <Image
                      fill
                      src={news.image?.url}
                      alt={news.title}
                      className="rounded-md lg:rounded-lg xl:rounded-xl"
                      sizes="(max-width: 767px) 300px, 500px"
                      placeholder="blur"
                      blurDataURL={news?.imageBlurDataURL || ''}
                      quality={80}
                    />
                  )}
                </div>
                <div className="col-span-1 lg:col-span-3 flex flex-col justify-between text-[#3C3C3C]">
                  <div className="global-p2 leading-6">
                    <LocalizedRichText en={news?.description} bn={news?.descriptionBN} />
                  </div>
                  <div>
                    {/* <Link href={news?.newsLink ?? ''} target="_blank">
                      <Button
                        variant="link"
                        className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit global-p2 p-0 "
                      >
                        <div className="flex space-x-1 items-center uppercase ">
                          <span>
                            <LocalizedText
                              en={news?.newsLinkBtnText}
                              bn={news?.newsLinkBtnTextBN}
                            />
                          </span>
                          <ArrowUpRight />
                        </div>
                      </Button>
                    </Link> */}
                    {news?.newsLinkBtnText && news?.newsLinkBtnTextBN && news?.newsLink && (
                      <Button
                        variant="link"
                        asChild
                        className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit global-p2 p-0"
                      >
                        <Link
                          href={news?.newsLink ?? ''}
                          target="_blank"
                          rel="noopener noreferrer"
                          prefetch={false}
                        >
                          <span className="flex space-x-1 items-center uppercase">
                            <span>
                              <LocalizedText
                                en={news?.newsLinkBtnText}
                                bn={news?.newsLinkBtnTextBN}
                              />
                            </span>
                            <ArrowUpRight />
                          </span>
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}

        {/* Button after 3rd news when showing less */}
        {hasMoreNews && !showAll && (
          <div className="flex justify-center pt-2">
            <GlobalButton
              variant="primary"
              // text="Load More"
              size="small"
              // className="w-[120px] md:w-[140px] lg:w-[150px] xl:w-[160px] 2xl:w-[180px]"
              onClick={handleToggle}
            >
              <LocalizedString en={block?.loadMoreText} bn={block?.loadMoreTextBN} />
            </GlobalButton>
          </div>
        )}

        {/* Additional news items with animation - only render when showing all */}
        {showAll &&
          allNewsData.slice(3).map((news, idx) => (
            <AccordionItem
              key={idx + 3}
              value={`item-${idx + 3}`}
              className="rounded-xl border border-[#EAD9C6] bg-white px-4 md:px-6 opacity-0 translate-y-4 transition-all duration-700 ease-in-out"
              style={{
                transitionDelay: `${idx * 150}ms`,
              }}
              ref={(el) => {
                if (el) {
                  setTimeout(() => {
                    el.classList.remove('opacity-0', 'translate-y-4')
                    el.classList.add('opacity-100', 'translate-y-0')
                  }, idx * 150)
                }
              }}
            >
              <AccordionTrigger className="py-4 text-left hover:no-underline font-normal">
                <div
                  className="flex flex-col items-start 
              space-y-1 lg:space-y-1.5 xl:space-y-2 2xl:space-y-2.5 "
                >
                  <p className="text-[#6E6E6E] global-p2 uppercase tracking-[2px] ">
                    {news?.importantDate && news?.importantDateBN ? (
                      <LocalizedText en={news?.importantDate} bn={news?.importantDateBN} />
                    ) : (
                      <LocalizedText
                        en={formatLocalDhaka(news?.updatedAt ? news?.updatedAt : '')}
                        bn={formatMonDYYYYBN(news?.updatedAt ? news?.updatedAt : '')}
                      />
                    )}
                  </p>
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[24px] font-normal">
                    <LocalizedText en={news?.title} bn={news?.titleBN} />
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 lg:pt-2 xl:pt-3.5 2xl:pt-4 ">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 ">
                  <div
                    className="col-span-1 relative rounded-md lg:rounded-lg xl:rounded-xl
                  w-full h-fit
                  aspect-[600/375] 
                  "
                  >
                    {typeof news?.image === 'object' && news?.image?.url && (
                      <Image
                        fill
                        src={news.image?.url}
                        alt={news.title}
                        className="rounded-md lg:rounded-lg xl:rounded-xl"
                        sizes="(max-width: 767px) 300px, 500px"
                        placeholder="blur"
                        blurDataURL={news?.imageBlurDataURL || ''}
                        quality={80}
                      />
                    )}
                  </div>
                  <div className="col-span-1 lg:col-span-3 flex flex-col justify-between text-[#3C3C3C]">
                    <div
                      className="global-p2 leading-6"
                      style={{
                        alignSelf: 'stretch',
                      }}
                    >
                      <LocalizedRichText en={news?.description} bn={news?.descriptionBN} />
                    </div>
                    <div>
                      {/* <Link href={news?.newsLink ?? ''} target="_blank">
                        <Button
                          variant="link"
                          className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit global-p2 p-0 "
                        >
                          <div className="flex space-x-1 items-center uppercase ">
                            <LocalizedText
                              en={news?.newsLinkBtnText}
                              bn={news?.newsLinkBtnTextBN}
                            />
                            <ArrowUpRight />
                          </div>
                        </Button>
                      </Link> */}
                      <Button
                        variant="link"
                        asChild
                        className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit global-p2 p-0"
                      >
                        <Link
                          href={news?.newsLink ?? '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          prefetch={false}
                        >
                          <span className="flex space-x-1 items-center uppercase">
                            <span>
                              <LocalizedText
                                en={news?.newsLinkBtnText}
                                bn={news?.newsLinkBtnTextBN}
                              />
                            </span>
                            <ArrowUpRight />
                          </span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}

        {/* Button after additional news when showing all */}
        {hasMoreNews && showAll && (
          <div className="flex justify-center pt-2">
            <GlobalButton
              variant="primary"
              // text="Show Less"
              size="small"
              // className="w-[120px] md:w-[140px] lg:w-[150px] xl:w-[160px] 2xl:w-[180px]"
              onClick={handleToggle}
            >
              <LocalizedString en={block?.seeLessText} bn={block?.seeLessTextBN} />
            </GlobalButton>
          </div>
        )}
      </Accordion>
    </div>
  )
}
