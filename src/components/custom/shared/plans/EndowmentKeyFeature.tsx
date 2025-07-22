import { cn } from '@/lib/utils'
import React from 'react'

type Props = {
  data?: any
}

function EndowmentKeyFeature({ data }: Props) {
  return (
    <div className="py-8 md:py-0 grid grid-cols-1 md:grid-cols-2 md:gap-4 ">
      {data?.map((content: any, i: number) => (
        <div
          key={content?.title + i}
          className={cn(
            'flex flex-col items-center md:items-start justify-center md:justify-start space-y-4 md:space-y-0 w-[65%] md:w-full mx-auto lg:mx-0 md:flex-row md:space-x-2 2xl:space-x-4 xl:w-[80%] p-4',
            i % 2 === 0 ? '' : ' lg:ml-auto',
          )}
        >
          <div className="h-[40px] w-[40px] ">
            <img
              src={content?.image}
              alt={content.title}
              className="h-full w-full object-contain"
            />
          </div>
          <div
            className="text-[#434342] 
                   2xl:max-w-[400px]"
          >
            <h3 className="global-h4 font-semibold uppercase text-center md:text-start">
              {content.title}
            </h3>
            <p className="global-p2 font-light lg:leading-6 text-center md:text-start">
              {content.description}
            </p>
            {content.listItems && Array.isArray(content.listItems) && (
              // <ul className="list-disc  pl-4 mt-2 space-y-1 text-[#434342] global-p2 font-light lg:leading-6 text-center md:text-start">
              //   {content.listItems.map((item: string, liIdx: number) => (
              //     <li key={liIdx} className="leading-snug">
              //       {item}
              //     </li>
              //   ))}
              // </ul>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-[#434342] global-p2 font-light lg:leading-6 text-center md:text-start ">
                {content.listItems.map((item: string, liIdx: number) => (
                  <li key={liIdx} className="leading-snug list-inside sm:list-outside">
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
