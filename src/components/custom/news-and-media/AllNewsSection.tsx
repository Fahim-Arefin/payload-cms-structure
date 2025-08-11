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
      image: '/assets/news-and-media/web/newsandblog1.jpg',
      mobileImage: '/assets/news-and-media/mobile/newsandblog1.jpg',
      date: 'Jul 17, 2025',
      title: 'What is the Potential of the Insurance Sector in Bangladesh?',
      description:
        "We know that currently, there are 36 life insurance companies in Bangladesh. If we look at the life insurance penetration in Bangladesh, it is just over 0.4% of the GDP. This figure alone indicates that the existing insurance companies in Bangladesh have not yet fully capitalized on the available opportunities. There is immense potential here, and we believe that if the insurance industry can bring the right products to the market and properly serve clients when it comes to claims, we will see a significant positive shift in Bangladesh's insurance sector. In our neighboring country India, the penetration rate is over 4%. While we may not match India at this moment, even if we can increase our penetration by just 1%, the number of policyholders and the overall premium income will increase significantly.",
    },
    {
      id: 3,
      image: '/assets/news-and-media/web/newsandblog3.jpg',
      mobileImage: '/assets/news-and-media/mobile/newsandblog3.jpg',
      date: 'Jul 17, 2025',
      title: 'What Steps Should Be Taken to Develop the Insurance Sector?',
      description:
        "Companies working in the insurance sector — along with regulatory body, IDRA — have been making efforts for a long time. One of the biggest ongoing challenges in our industry is the lack of trust. Restoring that trust is essential, and we all know why it's missing — the reasons are clear and well-understood.\n\nSo, the first priority for developing the insurance sector should be to rebuild that trust. Generally, you'll notice that people hesitate to talk about insurance, and the main reason is exactly that — lack of trust. If we can regain people's confidence and build meaningful relationships between insurance companies and the public, the industry in Bangladesh will progress significantly.\n\nIf you look at other countries — again taking India as an example — you'll see that insurance is considered a necessity, not a luxury product that people think about only after all other needs are met. It's viewed as a lifesaving necessity.\n\nEven from a Bangladeshi perspective, the need is evident. Healthcare costs are rising, accidents are increasing, and more people are being hospitalized due to critical illnesses. For middle- and lower-income families, the financial burden from these events can be overwhelming, often affecting them for a lifetime. Helping these families and becoming a source of trust for them should be the number one goal of the insurance industry.\n\nSecondly, we must bring in new, need-based products that meet real-life requirements. The weaknesses in our healthcare system were clearly exposed during the COVID pandemic — it showed just how far behind we are compared to other countries. If we can introduce innovative insurance products in the health sector, the people of Bangladesh will benefit greatly, and the insurance industry will be able to make a meaningful contribution to society.\n\nFinally, I believe digitalization is crucial. In many companies, even after buying a policy, customers have to wait over a month to receive documentation. Families often suffer for years trying to claim insurance benefits — this is simply unacceptable.\n\nIn summary, if we can focus on these three key areas:\n\n1. Restoring trust\n2. Introducing relevant new products\n3. Accelerating digitalization\n\nThen significant progress in Bangladesh's insurance sector can happen very soon. There are other areas needing improvement too, but focusing on these three will set a strong foundation for industry transformation.",
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
          <AllNewsCard data={data} key={i} index={i} />
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
              <AllNewsCard data={data} index={i + 3} />
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
