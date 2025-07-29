import { AllNewsAndBlogDataType } from '@/types'
import { notFound } from 'next/navigation'
import React from 'react'

type Props = {
  id: number
  data: AllNewsAndBlogDataType[]
}

function NewsDetailsSection({ data, id }: Props) {
  const news = data.find((item, i) => item.id === id)

  if (!news) {
    notFound()
  }

  console.log(news)

  return (
    <div className="container-padding ">
      <div className="space-y-8 lg:space-y-12">
        <div className="">
          <div className="text-[#6E6E6E] global-p2 uppercase tracking-[2px] mb-2">{news?.date}</div>
          <h2 className="global-h2 font-normal">{news?.title}</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 ">
          <div
            role="img"
            aria-label={news.title}
            className={`
    rounded-lg 
    w-full md:min-w-[200px] lg:min-w-[230px] xl:min-w-[300px] 2xl:min-w-[350px]
    h-[220px] md:h-[350px] lg:h-[160px] xl:h-[200px] 2xl:h-[220px]
    bg-no-repeat bg-cover
    bg-[position:0px_0px] 
  `}
            style={{ backgroundImage: `url(${news.image})` }}
          ></div>

          <div
            className="global-p2 leading-6 text-justify"
            style={{
              alignSelf: 'stretch',
            }}
          >
            {news?.description.split('\n').map((line, index) => {
              // Check if line is a numbered list item
              if (/^\d+\.\s/.test(line.trim())) {
                return (
                  <div key={index} className="ml-4 mb-2">
                    {line.trim()}
                  </div>
                )
              }
              // Check if line is empty (for spacing)
              if (line.trim() === '') {
                return <br key={index} />
              }
              // Regular paragraph
              return (
                <p key={index} className="mb-4">
                  {line}
                </p>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailsSection
