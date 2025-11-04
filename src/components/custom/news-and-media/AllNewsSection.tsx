'use client'
import { GlobalBlog } from '@/payload-types'
import { useState } from 'react'
import GlobalButton from '../shared/GlobalButton'
import AllNewsCard from './AllNewsCard'
import { AllBlogsSectionType } from '@/types/payloadCustomTypes'
import LocalizedString from '../shared/LocalizedString'

type Props = {
  allNewsData: GlobalBlog['blogs']
  block: AllBlogsSectionType
}

function AllNewsSection({ allNewsData, block }: Props) {
  const [showAll, setShowAll] = useState(false)

  const hasMorePosts = allNewsData.length > 3

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
      <div className="space-y-12 lg:space-y-24">
        {/* First 3 blogs - always visible */}
        {allNewsData.slice(0, 3).map((data, i) => (
          <AllNewsCard block={block} data={data} key={i} index={i} length={allNewsData?.length} />
        ))}

        {/* Button after 3rd blog when showing less */}
        {hasMorePosts && !showAll && (
          <div className="flex justify-center ">
            <GlobalButton variant="primary" size="small" onClick={handleToggle}>
              <LocalizedString en={block?.loadMoreText} bn={block?.loadMoreTextBN} />
            </GlobalButton>
          </div>
        )}

        {/* 4th blog with animation - only render when showing all */}
        {showAll &&
          allNewsData.slice(3).map((data, i) => (
            <div
              key={i + 3}
              className="opacity-0 translate-y-4 transition-all duration-700 ease-in-out"
              style={{
                transitionDelay: `${i * 150}ms`,
              }}
              ref={(el) => {
                if (el) {
                  setTimeout(() => {
                    el.classList.remove('opacity-0', 'translate-y-4')
                    el.classList.add('opacity-100', 'translate-y-0')
                  }, i * 150)
                }
              }}
            >
              <AllNewsCard block={block} data={data} index={i + 3} length={allNewsData?.length} />
            </div>
          ))}

        {/* Button after 4th blog when showing all */}
        {hasMorePosts && showAll && (
          <div className="flex justify-center ">
            <GlobalButton variant="primary" size="small" onClick={handleToggle}>
              <LocalizedString en={block?.seeLessText} bn={block?.seeLessTextBN} />
            </GlobalButton>
          </div>
        )}
      </div>
    </div>
  )
}

export default AllNewsSection
