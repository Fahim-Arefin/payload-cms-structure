import { cn } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'
import LocalizedText from '../LocalizedText'

type Props = {
  data?: any
}

function EndowmentKeyFeature({ data }: Props) {
  return (
    <div className="py-[15px] md:py-0 grid grid-cols-1 md:grid-cols-2 md:gap-4">
      {data?.map((content: any, i: number) => (
        <div
          key={content?.title + i}
          className={cn(
            ' flex flex-col items-center md:items-start justify-center md:justify-start w-[80%] md:w-full mx-auto lg:mx-0 md:flex-row md:space-x-2 2xl:space-x-4 xl:w-[80%] p-2 lg:p-3 xl:p-4',
            i % 2 === 0 ? '' : ' lg:ml-auto',
          )}
        >
          <div className="relative min-h-[40px] max-h-[40px] min-w-[40px] max-w-[40px] ">
            {/* web */}
            <Image fill src={content?.image} alt={content.title} className="object-contain" />
          </div>
          <div
            className="text-[#434342] 
                   2xl:max-w-[400px]"
          >
            <h3 className="global-h4 font-semibold uppercase text-center md:text-start">
              <LocalizedText en={content?.title} bn={content?.titleBN} />
            </h3>
            <p className="global-p2 font-light lg:leading-6 text-center md:text-start">
              <LocalizedText en={content?.description} bn={content?.descriptionBN} />
            </p>
            {content.listItems && Array.isArray(content.listItems) && (
              // <ul className="list-disc mt-2 space-y-1 text-[#434342] global-p2 font-light lg:leading-6 text-center md:text-start ">
              //   {content.listItems.map((item: string, liIdx: number) => (
              //     <li key={liIdx} className="leading-snug list-inside sm:list-outside">
              //       {item}
              //     </li>
              //   ))}
              // </ul>
              <ul className="list-disc list-outside pl-[26px] mt-2 space-y-1 text-[#434342] global-p2 font-light lg:leading-6 text-left md:text-start marker:text-[#434342]">
                {content.listItems.map((item: string, liIdx: number) => (
                  <li key={liIdx} className="leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default EndowmentKeyFeature
