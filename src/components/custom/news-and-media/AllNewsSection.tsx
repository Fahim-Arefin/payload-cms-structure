import { AllNewsAndBlogDataType } from '@/types'
import React from 'react'
import AllNewsCard from './AllNewsCard'
import GlobalButton from '../shared/GlobalButton'

type Props = {}

function AllNewsSection({}: Props) {
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
  return (
    <div
      className="px-5 
           md:px-24 
           lg:px-[130px]   
           xl:px-[200px]  
           2xl:px-[300px]
           space-y-12 lg:space-y-24
            pb-12 md:pb-24 lg:pb-[110px] xl:pb-[100px] 2xl:pb-[150px]
            pt-[30px] md:pt-[40px] lg:pt-[50px] xl:pt-[60px] 2xl:pt-[70px]"
    >
      {allNewsData?.map((data, i) => <AllNewsCard data={data} key={i} index={i} />)}
      <div className="flex justify-center">
        <GlobalButton variant="primary" text="Load More" size="small" />
      </div>
    </div>
  )
}

export default AllNewsSection
