import { ClaimTabs } from '@/components/custom/claims/ClaimTabs'
import ContactUsSection from '@/components/custom/shared/contactUs/ContactUsSection'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { FC } from 'react'

type pageProps = {}

const page: FC<pageProps> = ({}) => {
  const heroSlides = [
    {
      title: 'Claim',
      subtitle: '',
      description:
        'Experience a hassle-free, seamless claims journey- submit, track, and settle your claim in just 5 Days!  ',
      image: '/assets/claims.jpg',
    },
  ]

  const tabItems = [
    {
      value: 'individual',
      label: 'Individual Claim',
    },
    {
      value: 'corporate',
      label: 'Corporate Claim',
    },
  ]

  const tabContent = [
    {
      content: [
        {
          title: 'Customizable Coverage',
          description: 'Choose a sum assured based on your child’s future needs.',
          image: '/assets/childTabIcon1.png',
        },
        {
          title: 'Maturity Benefit',
          description:
            'Receive the full sum assured at the end of the policy term to support higher education goals.',
          image: '/assets/childTabIcon2.png',
        },
        {
          title: 'Tax Benefits',
          description: 'Enjoy tax rebates on premiums, avail upto 15% tax rebate. ',
          image: '/assets/childTabIcon3.png',
        },
        {
          title: 'Partner Discounts',
          description:
            'Avail exclusive discounts on medical and diagnostic services at partnered hospitals and diagnostic centers.',
          image: '/assets/childTabIcon4.png',
        },
        {
          title: 'Life Coverage',
          description: 'In the event of the parent’s death, the plan ensures:',
          listItems: [
            "Monthly stipend (1%, 2%, or 3% of the sum assured, based on plan choice) till policy maturity to ensure the child's education quality.",
            'Waiver of all future premiums while continuing full coverage.',
            'Full maturity benefit paid at term-end.',
          ],
          image: '/assets/childTabIcon5.png',
        },
        {
          title: 'Flexible Premium Payments',
          description: 'Opt for monthly, quarterly, half-yearly, or annual premium modes.',
          image: '/assets/childTabIcon6.png',
        },
      ],
    },
    {
      content: [
        {
          title: 'Customizable sdfsdfsdf',
          description: 'Choose a sum assured based on your child’s future needs.',
          image: '/assets/childTabIcon1.png',
        },
        {
          title: 'Maturity Benefit',
          description:
            'Receive the full sum assured at the end of the policy term to support higher education goals.',
          image: '/assets/childTabIcon2.png',
        },
        {
          title: 'Tax Benefits',
          description: 'Enjoy tax rebates on premiums, avail upto 15% tax rebate. ',
          image: '/assets/childTabIcon3.png',
        },
        {
          title: 'Partner Discounts',
          description:
            'Avail exclusive discounts on medical and diagnostic services at partnered hospitals and diagnostic centers.',
          image: '/assets/childTabIcon4.png',
        },
        {
          title: 'Life Coverage',
          description: 'In the event of the parent’s death, the plan ensures:',
          listItems: [
            "Monthly stipend (1%, 2%, or 3% of the sum assured, based on plan choice) till policy maturity to ensure the child's education quality.",
            'Waiver of all future premiums while continuing full coverage.',
            'Full maturity benefit paid at term-end.',
          ],
          image: '/assets/childTabIcon5.png',
        },
        {
          title: 'Flexible Premium Payments',
          description: 'Opt for monthly, quarterly, half-yearly, or annual premium modes.',
          image: '/assets/childTabIcon6.png',
        },
      ],
    },
  ]

  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[470px] xl:h-[570px] 2xl:h-[670px] "
        top=" top-[100px] md:top-[150px] lg:top-[43%]"
      />
      <ClaimTabs data={tabContent} config={tabItems} />
      <ContactUsSection />
    </div>
  )
}

export default page
