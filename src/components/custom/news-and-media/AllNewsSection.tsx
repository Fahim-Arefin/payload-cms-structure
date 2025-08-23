'use client'
import { AllNewsAndBlogDataType } from '@/types'
import React, { useState } from 'react'
import AllNewsCard from './AllNewsCard'
import GlobalButton from '../shared/GlobalButton'

type Props = {
  allNewsData: AllNewsAndBlogDataType[]
}

function AllNewsSection({ allNewsData }: Props) {
  const [showAll, setShowAll] = useState(false)

  // Show only first 3 posts initially, all posts when showAll is true
  const displayedPosts = showAll ? allNewsData : allNewsData.slice(0, 3)
  const hasMorePosts = allNewsData.length > 3

  const handleToggle = () => {
    setShowAll(!showAll)
  }

  return (
    <div
      className={`px-5 
           md:px-24 
           lg:px-[130px]   
           xl:px-[200px]  
           2xl:px-[300px]
            pt-[30px] md:pt-[40px] lg:pt-[50px] xl:pt-[60px] 2xl:pt-[70px]
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
          <AllNewsCard data={data} key={i} index={i} length={allNewsData?.length} />
        ))}

        {/* Button after 3rd blog when showing less */}
        {hasMorePosts && !showAll && (
          <div className="flex justify-center pt-12 lg:pt-24">
            <GlobalButton variant="primary" text="Load More" size="small" onClick={handleToggle} />
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
              <AllNewsCard data={data} index={i + 3} length={allNewsData?.length} />
            </div>
          ))}

        {/* Button after 4th blog when showing all */}
        {hasMorePosts && showAll && (
          <div className="flex justify-center pt-12 lg:pt-24">
            <GlobalButton variant="primary" text="Show Less" size="small" onClick={handleToggle} />
          </div>
        )}
      </div>
    </div>
  )
}

export default AllNewsSection
