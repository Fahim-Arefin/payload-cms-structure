import { AllNewsAndBlogDataType } from '@/types'
import React, { useState } from 'react'
import AllNewsCard from './AllNewsCard'
import GlobalButton from '../shared/GlobalButton'

type Props = {}

function AllNewsSection({}: Props) {
  const [showAll, setShowAll] = useState(false)
  const allNewsData: AllNewsAndBlogDataType[] = [
    {
      id: 1,
      image: '/assets/newsandblog1.jpg',
      date: 'Jul 17, 2025',
      title: 'Shanta Life to Hold Conference Call for Second Quarter 2025 Results',
      description:
        'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset you!',
    },
    {
      id: 2,
      image: '/assets/newsandblog2.jpg',
      date: 'Jul 17, 2025',
      title: 'How Insurance can help you to keep your loved ones safe?',
      description:
        'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset you!',
    },
    {
      id: 3,
      image: '/assets/newsandblog3.jpg',
      date: 'Jul 17, 2025',
      title: 'How you can be benefited by Santa Life insurance?',
      description:
        'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset you!',
    },
    {
      id: 4,
      image: '/assets/newsandblog4.jpg',
      date: 'Jul 17, 2025',
      title: 'Why is Insurance important?',
      description:
        'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset you!',
    },
  ]
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
            ${showAll 
              ? 'pb-12 md:pb-24 lg:pb-[110px] xl:pb-[100px] 2xl:pb-[150px]' 
              : 'pb-6 md:pb-12 lg:pb-[60px] xl:pb-[70px] 2xl:pb-[80px]'
            }
            transition-all duration-700 ease-in-out`}
    >
      <div className="space-y-12 lg:space-y-24">
        {/* First 3 blogs - always visible */}
        {allNewsData.slice(0, 3).map((data, i) => (
          <AllNewsCard data={data} key={i} index={i} />
        ))}
        
        {/* Button after 3rd blog when showing less */}
        {hasMorePosts && !showAll && (
          <div className="flex justify-center pt-12 lg:pt-24">
            <GlobalButton 
              variant="primary" 
              text="Load More"
              size="small" 
              onClick={handleToggle}
            />
          </div>
        )}
        
        {/* 4th blog with animation - only render when showing all */}
        {showAll && allNewsData.slice(3).map((data, i) => (
          <div
            key={i + 3}
            className="opacity-0 translate-y-4 transition-all duration-700 ease-in-out"
            style={{
              transitionDelay: `${i * 150}ms`
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
            <AllNewsCard data={data} index={i + 3} />
          </div>
        ))}
        
        {/* Button after 4th blog when showing all */}
        {hasMorePosts && showAll && (
          <div className="flex justify-center pt-12 lg:pt-24">
            <GlobalButton 
              variant="primary" 
              text="Show Less"
              size="small" 
              onClick={handleToggle}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AllNewsSection
