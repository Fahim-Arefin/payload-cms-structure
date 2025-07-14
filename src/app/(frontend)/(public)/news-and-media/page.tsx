import AllNewsSection from '@/components/custom/news-and-media/AllNewsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'

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
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
    {
      image: 'dummy image',
      title: 'dummy title',
    },
  ]

  return (
    <div className="font-avenir">
      {/* <HeroSection /> */}
      <HeroSection heroSlides={heroSlides}></HeroSection>
      <AllNewsSection newsData={newsData}>News</AllNewsSection>
    </div>
  )
}
