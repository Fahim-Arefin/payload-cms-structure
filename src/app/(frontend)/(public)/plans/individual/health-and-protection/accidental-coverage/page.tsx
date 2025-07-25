import CallNowButton from '@/components/custom/shared/CallNowButton'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import MatricsSection from '@/components/custom/shared/plans/MatricsSection'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'

function page() {
  const heroSlides = [
    {
      title: 'Shanta Accidental Coverage',
      subtitle: '',
      description: `We're here to be your grounded force because a stumble should never steal your stride.`,
      image: '/assets/banner10.jpg',
    },
  ]
  const planInfoData = {
    image: '/assets/planInfo4.png',
    description: `Accidents can bring life to a sudden halt, impacting financial strain and uncertainty for you and your family. With Shanta Life's Accidental Coverage, you get a reliable safety net to help safeguard your future and ease the financial burden of unforeseen events. We've got you covered, so you can focus on the recovery. `,
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
      <HeroSection heroSlides={heroSlides}>
        <div
          className="absolute top-[250px] md:top-[330px] lg:top-[420px] xl:top-[450px]  2xl:top-[700px] 
          inset-x-0 -left-[24px] lg:left-[105px] xl:left-[185px] 2xl:left-[258px] lg:right-auto 
       hero-content-width
        flex justify-left space-x-4 md:space-x-6 lg:justify-start
        "
        >
          <div className="flex items-center space-x-2 text-white 2xl:space-x-4">
            <CallNowButton />
          </div>
        </div>
      </HeroSection>
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
