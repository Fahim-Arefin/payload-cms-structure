import { AllNewsAndBlogDataType } from '@/types'
import React from 'react'
import AllNewsCard from './AllNewsCard'

type Props = {}

function AllNewsSection({}: Props) {
  const allNewsData: AllNewsAndBlogDataType[] = [
    {
      image: '/assets/newsandblog1.jpg',
      date: 'Jul 17, 2025',
      title: 'Why is Insurance important?',
      description:
        'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset you!',
    },
    {
      image: '/assets/newsandblog2.jpg',
      date: 'Jul 17, 2025',
      title: 'How Insurance can help you to keep your loved ones safe?',
      description:
        'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset you!',
    },
    {
      image: '/assets/newsandblog3.jpg',
      date: 'Jul 17, 2025',
      title: 'How you can be benefited by Santa Life insurance?',
      description:
        'Nothing is more important than your life and your ability to earn a living. Therefore, it is sensible to seek insurance coverage for the most valuable of asset you!',
    },
    {
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
           space-y-12"
    >
      {allNewsData?.map((data, i) => <AllNewsCard data={data} key={i} />)}
    </div>
  )
}

export default AllNewsSection
