'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import Image from 'next/image'
import { ArrowUpRight, ChevronRight } from 'lucide-react'
import GlobalButton from '../shared/GlobalButton'
import { AllNewsAndBlogDataType } from '@/types'
import SearchNews from './SearchNews'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useState } from 'react'

const allNewsData: AllNewsAndBlogDataType[] = [
  {
    id: 1,
    image: '/assets/newsandblog1.jpg',
    date: 'Jul 17, 2025',
    title: 'Shanta Life to Hold Conference Call for Second Quarter 2025 Results',
    description:
      'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset – you!',
  },
  {
    id: 2,
    image: '/assets/newsandblog2.jpg',
    date: 'Jul 17, 2025',
    title: 'How Insurance can help you to keep your loved ones safe?',
    description:
      'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset – you!',
  },
  {
    id: 3,
    image: '/assets/newsandblog3.jpg',
    date: 'Jul 17, 2025',
    title: 'How you can be benefited by Santa Life insurance?',
    description:
      'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset – you!',
  },
  {
    id: 4,
    image: '/assets/news11.jpg',
    date: 'Dec 1, 2024',
    title: 'Shanta Life Insurance gets license to launch',
    description: `The company is set to drive financial security and peace of mind by launching simplified insurance products, designed to address the varied needs of individuals across Bangladesh. Given Shanta's legacy of trust and quality in all its businesses, the group plans to ensure the same values in the life insurance sector, which is currently riddled with issues of transparency and policyholders' trust. `,
  },
  {
    id: 5,
    image: '/assets/news2.jpg',
    date: 'Mar 8, 2025',
    title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
    description: `Sheikh Mohammad Maroof, managing director & CEO of Dhaka Bank and Nafis A Ahmed, chief executive officer of the Shanta Life Insurance, signed the MoU at the bank's head office in Dhaka recently.`,
  },
]

export default function AllNewsAccordionSection() {
  const [showAll, setShowAll] = useState(false)

  const hasMoreNews = allNewsData.length > 3

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  return (
    <div
      className={`container-padding bg-[#FCF4EB] space-y-6 
      ${
        showAll
          ? 'pb-12 md:pb-24 lg:pb-[110px] xl:pb-[100px] 2xl:pb-[150px]'
          : 'pb-6 md:pb-12 lg:pb-[60px] xl:pb-[70px] 2xl:pb-[80px]'
      }
      transition-all duration-700 ease-in-out`}
    >
      <SearchNews bgColor="#FCF4EB" text="News" />
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
                <p className="text-[#6E6E6E] global-p2 uppercase tracking-[2px] ">{news.date}</p>
                <p className="text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[24px] font-normal">
                  {news.title}
                </p>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 lg:pt-2 xl:pt-3.5 2xl:pt-4 ">
              <div className="flex flex-col md:flex-row gap-8 ">
                <div className="">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="rounded-lg
                     w-full md:min-w-[200px] lg:min-w-[230px] xl:min-w-[300px] 2xl:min-w-[350px]  
        h-[200px] md:h-[150px] lg:h-[160px] xl:h-[200px] 2xl:h-[220px] "
                  />
                </div>
                <div className="flex flex-col justify-between text-[#3C3C3C]">
                  <p
                    className="global-p2 leading-6"
                    style={{
                      alignSelf: 'stretch',
                    }}
                  >
                    {news.description}
                  </p>
                  <div>
                    <Link href={`/news-and-media/${news?.id}`}>
                      <Button
                        variant="link"
                        className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit global-p2 p-0 "
                      >
                        <div className="flex space-x-1 items-center uppercase ">
                          <span>Read More</span>
                          <ArrowUpRight />
                        </div>
                      </Button>
                    </Link>
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
              text="Load More"
              size="small"
              className="w-[120px] md:w-[140px] lg:w-[150px] xl:w-[160px] 2xl:w-[180px]"
              onClick={handleToggle}
            />
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
                  <p className="text-[#6E6E6E] global-p2 uppercase tracking-[2px] ">{news.date}</p>
                  <p className="text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] 2xl:text-[24px] font-normal">
                    {news.title}
                  </p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 lg:pt-2 xl:pt-3.5 2xl:pt-4 ">
                <div className="flex flex-col md:flex-row gap-8 ">
                  <div className="">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="rounded-lg
                     w-full md:min-w-[200px] lg:min-w-[230px] xl:min-w-[300px] 2xl:min-w-[350px]  
        h-[200px] md:h-[150px] lg:h-[160px] xl:h-[200px] 2xl:h-[220px] "
                    />
                  </div>
                  <div className="flex flex-col justify-between text-[#3C3C3C]">
                    <p
                      className="global-p2 leading-6"
                      style={{
                        alignSelf: 'stretch',
                      }}
                    >
                      {news.description}
                    </p>
                    <div>
                      <Link href={`/news-and-media/${news?.id}`}>
                        <Button
                          variant="link"
                          className="text-[#ED7125] hover:underline hover:underline-offset-8 w-fit global-p2 p-0 "
                        >
                          <div className="flex space-x-1 items-center uppercase ">
                            <span>Read More</span>
                            <ArrowUpRight />
                          </div>
                        </Button>
                      </Link>
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
              text="Show Less"
              size="small"
              className="w-[120px] md:w-[140px] lg:w-[150px] xl:w-[160px] 2xl:w-[180px]"
              onClick={handleToggle}
            />
          </div>
        )}
      </Accordion>
    </div>
  )
}
