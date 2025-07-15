import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import MatricsSection from '@/components/custom/shared/plans/MatricsSection'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'

function page() {
  const heroSlides = [
    {
      title: '',
      subtitle: 'Shanta Accidental Coverage',
      description: '',
      image: '/assets/banner10.jpg',
    },
  ]
  const planInfoData = {
    image: '/assets/planInfo4.png',
    description:
      'Accidents can bring life to a sudden halt—impacting financial strain and uncertainty for you and your family. With Shanta Lifes Accidental Coverage, you get a reliable safety net to help safeguard your future and ease the financial burden of unforeseen events. Stay protected, stay prepared—always stay ahead in life. We have you covered, no matter the impact of an accident. Life is unpredictable—but your safety should not be.',
  }
  const offersData = [
    {
      image: '/assets/offer5.png',
      bgImage: '/assets/offerbg5.jpg',
      title: 'Medical Expense Coverage',
      description: 'Helping with treatment costs so you can focus on recovery.',
    },
    {
      image: '/assets/offer6.png',
      bgImage: '/assets/offerbg6.jpg',
      title: 'Permanent Partial Disability',
      description: 'Financial support if an accident limits your abilities.',
    },
    {
      image: '/assets/offer7.png',
      bgImage: '/assets/offerbg7.jpg',
      title: 'Permanent Total Disability',
      description: 'Security for you and your family in case of lifelong disability.',
    },
    {
      image: '/assets/offer8.png',
      bgImage: '/assets/offerbg8.jpg',
      title: 'Accidental Death',
      description:
        'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
    },
    {
      image: '/assets/offer5.png',
      bgImage: '/assets/offerbg5.jpg',
      title: 'Medical Expense Coverage',
      description: 'Helping with treatment costs so you can focus on recovery.',
    },
    {
      image: '/assets/offer6.png',
      bgImage: '/assets/offerbg6.jpg',
      title: 'Permanent Partial Disability',
      description: 'Financial support if an accident limits your abilities.',
    },
    {
      image: '/assets/offer7.png',
      bgImage: '/assets/offerbg7.jpg',
      title: 'Permanent Total Disability',
      description: 'Security for you and your family in case of lifelong disability.',
    },
    {
      image: '/assets/offer8.png',
      bgImage: '/assets/offerbg8.jpg',
      title: 'Accidental Death',
      description:
        'Your loved ones receive twice the insured amount for extra protection (including basic life coverage).',
    },
  ]
  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[578px] "
        top=" top-[150px] md:top-[200px] lg:top-[63%] "
      />
      <PlanInfoSection data={planInfoData} />
      <OffersClientWrapper
        data={offersData}
        subheading="Four types of protection to keep you and your loved ones financially secure"
        card={2}
      />
      <MatricsSection />
      <ContactUsSection />
    </div>
  )
}

export default page
