import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import PlanInfoSection from '@/components/custom/shared/PlanInfoSection'
import BankingFacilities from '@/components/custom/shared/plans/BankingFacilities'
import OffersClientWrapper from '@/components/custom/shared/plans/OffersClientWrapper'
import Partners from '@/components/custom/shared/plans/Partners'

function Bancassurance() {
  const heroSlides = [
    {
      title: 'Shanta Life Bancassurance',
      subtitle: '',
      description:
        'Where banking meets protection, Tailored for individuals, Delivered through trust',
      image: '/assets/banner6.jpg',
    },
  ]
  const planInfoData = {
    image: '/assets/planInfo3.png',
    description: `At Shanta Life, we partner with leading banks and NBFIs to offer clear, affordable life insurance solutions that safeguard your financial journey.
Our customized coverage options are designed to meet the distinct needs of different banking segments—ensuring protection that truly fits.`,
  }

  const bankingFacilitiesData = [
    {
      image: '/assets/banking1.png',
      description: 'Credit Card',
    },
    {
      image: '/assets/banking2.png',
      description: 'Personal Loan/Home Loan/SME Loan',
    },
    {
      image: '/assets/banking3.png',
      description: 'Savings Account',
    },
    {
      image: '/assets/banking4.png',
      description: 'Monthly Deposit Scheme (DPS)',
    },
    {
      image: '/assets/banking1.png',
      description: 'Credit Card',
    },
    {
      image: '/assets/banking2.png',
      description: 'Personal Loan/Home Loan/SME Loan',
    },
    {
      image: '/assets/banking3.png',
      description: 'Savings Account',
    },
    {
      image: '/assets/banking4.png',
      description: 'Monthly Deposit Scheme (DPS)',
    },
  ]
  const offersData = [
    {
      image: '/assets/offer1.png',
      description: 'Life insurance',
      bgImage: '/assets/offerbg1.jpg',
    },
    {
      image: '/assets/offer2.png',
      description: 'Total permanent disability',
      bgImage: '/assets/offerbg2.jpg',
    },
    {
      image: '/assets/offer3.png',
      description: 'In-Patient Health Coverage',
      bgImage: '/assets/offerbg3.jpg',
    },
    {
      image: '/assets/offer4.png',
      description: 'Critical Illness Benefit',
      bgImage: '/assets/offerbg4.jpg',
    },
    {
      image: '/assets/offer1.png',
      description: 'Life insurance',
      bgImage: '/assets/offerbg1.jpg',
    },
    {
      image: '/assets/offer2.png',
      description: 'Total permanent disability',
      bgImage: '/assets/offerbg2.jpg',
    },
    {
      image: '/assets/offer3.png',
      description: 'In-Patient Health Coverage',
      bgImage: '/assets/offerbg3.jpg',
    },
    {
      image: '/assets/offer4.png',
      description: 'Critical Illness Benefit',
      bgImage: '/assets/offerbg4.jpg',
    },
  ]

  const partnersData = [
    {
      image: '/assets/bank1.png',
      description: 'CITY BANK PLC LIMITED',
    },
    {
      image: '/assets/bank2.png',
      description: 'DHAKA BANK PLC LIMITED',
    },
    {
      image: '/assets/bank3.png',
      description: 'EASTERN BANK PLC LIMITED',
    },
    {
      image: '/assets/bank4.png',
      description: 'STANDARD BANK PLC LIMITED',
    },
    {
      image: '/assets/bank1.png',
      description: 'CITY BANK PLC LIMITED',
    },
    {
      image: '/assets/bank2.png',
      description: 'DHAKA BANK PLC LIMITED',
    },
    {
      image: '/assets/bank3.png',
      description: 'EASTERN BANK PLC LIMITED',
    },
    {
      image: '/assets/bank4.png',
      description: 'STANDARD BANK PLC LIMITED',
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection heroSlides={heroSlides} />
      <PlanInfoSection data={planInfoData} />
      <BankingFacilities data={bankingFacilitiesData} />

      <OffersClientWrapper
        data={offersData}
        subheading="Four types of protection to keep you and your loved ones financially secure"
        card={1}
      />

      <Partners data={partnersData} />
      <ContactUsSection />
    </div>
  )
}

export default Bancassurance
