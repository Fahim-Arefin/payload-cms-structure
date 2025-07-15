import AllNewsSection from '@/components/custom/news-and-media/AllNewsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import CatchTheBuzzSection from '@/components/custom/support/CatchTheBuzzSection'

export default async function NewsAndMedia() {
  const heroSlides = [
    {
      title: 'News & Media',
      subtitle: '',
      description: 'Focus on highlights',
      image: '/assets/banner-news-and-media.jpg',
    },
  ]

  const newsData = [
    {
      image: '/assets/allNews1.jpg',
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
    },
    {
      image: '/assets/allNews2.jpg',
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
    },
    {
      image: '/assets/allNews1.jpg',
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
    },
    {
      image: '/assets/allNews2.jpg',
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
    },
  ]

  return (
    <div className="font-avenir">
      {/* <HeroSection /> */}
      <HeroSection heroSlides={heroSlides}></HeroSection>
      <CatchTheBuzzSection />
      <AllNewsSection newsData={newsData}>Blogs</AllNewsSection>
      <AllNewsSection newsData={newsData}>News</AllNewsSection>
    </div>
  )
}
