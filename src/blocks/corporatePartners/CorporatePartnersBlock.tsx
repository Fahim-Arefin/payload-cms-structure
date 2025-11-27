import PartnerCarousel from '@/components/custom/corporate/PartnerCarousel'
import { CorporatePartnersBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: CorporatePartnersBlockType
  params: Record<string, string>
}

function CorporatePartnersBlock({ block }: Props) {
  const partnerData = [
    { img: '/assets/valued-clients/ShantaHolding.png', title: 'Shanta Holdings Limited' },
    {
      img: '/assets/valued-clients/shantaMultiverse.png',
      title: 'Shanta Multiverse Limited',
    },
    { img: '/assets/valued-clients/ShantaLifestyle.png', title: 'Shanta Lifestyle Limited' },
    { img: '/assets/valued-clients/amariDhaka.png', title: 'Amari Dhaka' },
    {
      img: '/assets/valued-clients/hohensteiname.png',
      title: 'Hohenstein Laboratories Bangladesh Limited',
    },
    {
      img: '/assets/valued-clients/63a0499788734fea9d45a6a1_Logo-eskimi.png',
      title: 'Eskimi Bangladesh',
    },
    { img: '/assets/valued-clients/seml-bg.png', title: 'Strategic Equity Management' },
    { img: '/assets/valued-clients/STS_Group_logo.png', title: 'STS Capital Limited' },
    { img: '/assets/valued-clients/Golden-Sky-LOGO-3.png', title: 'Golden Sky Footwear' },
    { img: '/assets/valued-clients/Blucheez-Red_Blucheez_logo.png', title: 'Blucheez Fashion' },
    // {
    //   img: '/assets/valued-clients/Eduko_Logo_Transparent_Background.png',
    //   title: 'Eduko Bangladesh',
    // },
    {
      img: '/assets/valued-clients/Glenrich-New-Logo-2048x1016.png',
      title: 'Glenrich International School',
    },
    { img: '/assets/valued-clients/Line2.png', title: 'Bengal Airlift Limited' },
    {
      img: '/assets/valued-clients/acebangladesh-e1729689682400.png',
      title: 'Ace Bangladesh Limited',
    },
    { img: '/assets/valued-clients/Fitsair_logo.png', title: 'FitsAir' },
    { img: '/assets/valued-clients/airAlliance.png', title: 'Air Alliance Ltd. (SP)' },
    { img: '/assets/valued-clients/ups.png', title: 'UPS Authorized Service Contractor' },
    {
      img: '/assets/valued-clients/pixel_speedmark_8fb3bdc46abb8be4b9e2d982fdffea1d-4-4.png',
      title: 'Speedmark Transportation (BD) Limited',
    },
  ]
  return (
    <div>
      <PartnerCarousel data={block} />
    </div>
  )
}

export default CorporatePartnersBlock
