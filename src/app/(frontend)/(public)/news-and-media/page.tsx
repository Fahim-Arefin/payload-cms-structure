import AllNewsAccordianSection from '@/components/custom/news-and-media/AllNewsAccordianSection'
import AllNewsSection from '@/components/custom/news-and-media/AllNewsSection'
import SearchNews from '@/components/custom/news-and-media/SearchNews'
import HeroSection from '@/components/custom/shared/hero/HeroSection'

export default async function NewsAndMedia() {
  const heroSlides = [
    {
      title: 'News & Media',
      subtitle: '',
      description: 'Focus on highlights',
      image: '/assets/news_media_hero.jpg',
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] "
        top=" top-[150px] md:top-[200px] lg:top-[43%]"
        position="[object-position:50%_60%]"
      />
      <SearchNews paddingOn text="BLOGS" />
      <AllNewsSection />
      <AllNewsAccordianSection />
    </div>
  )
}
