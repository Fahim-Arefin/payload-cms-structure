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
]

export default function AllNewsAccordionSection() {
  return (
    <div className="container-padding bg-[#FCF4EB] space-y-6 ">
      <SearchNews bgColor="#FCF4EB" text="News" />
      <Accordion
        type="single"
        collapsible
        className="space-y-2 pt-[30px] md:pt-[40px] lg:pt-[50px] xl:pt-[60px] 2xl:pt-[70px]"
      >
        {allNewsData.map((news, idx) => (
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
      </Accordion>

      <div className="flex justify-center pt-2">
        <GlobalButton
          variant="primary"
          text="Load Older News"
          size="small"
          className="w-[120px] md:w-[140px] lg:w-[150px] xl:w-[160px] 2xl:w-[180px]"
        />
      </div>
    </div>
  )
}
