import FootPrintSection from '@/components/custom/about-us/FootPrintSection'
import { ShantaFootprintBlockType } from '@/types/payloadCustomTypes'
import React from 'react'

type Props = {
  block: ShantaFootprintBlockType
  params: Record<string, string>
}
function ShantaFootPrintBlock({ block }: Props) {
  const footPrintData = {
    title: 'Shanta’s FOOTPRINT',
    subTitle: 'Where Every Venture Connects',
    // bgImage: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint.mp4`,
    bgImage: `/assets/about-us/web/footprint.mp4`,
    // bgMobileImage: '/assets/about-us/mobile/footprint.gif',
    data: [
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint3.png`,
        // mobileImage: '/assets/about-us/mobile/footprint3.png',
        title: 'Shanta Holdings',
        link: 'https://shantaholdings.com/',
        description:
          'The premier real estate developer of Bangladesh on a mission to transform the lifestyle of city dwellers by providing luxurious, functional and aesthetic living and working spaces that can rival the caliber of the finest developers across the globe.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint4.jpg`,
        // mobileImage: '/assets/about-us/mobile/footprint4.jpg',
        title: 'Shanta Securities',
        link: 'https://www.shantasecurities.com/',
        description:
          'An innovative financial services company offering a range of brokerage and investing solutions.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/assetmanagement.jpg`,
        // mobileImage: '/assets/about-us/mobile/assetmanagement.jpg',
        title: 'Shanta Asset Management',
        link: 'https://www.shanta-aml.com/',
        description:
          'Shanta Asset Management Limited is a leading asset management company in Bangladesh offering corporate and open-end mutual fund management solutions to address the distinct investment objectives of its diverse clientele, including individuals and institutions.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/shanta-equity-img.jpg`,
        // mobileImage: '/assets/about-us/mobile/shanta-equity-img.jpg',
        title: 'Shanta Equity',
        link: 'https://shantaequity.net/',
        description:
          'A full-fledged merchant bank offering a range of investment banking, corporate advisory and portfolio management solutions.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint5.jpg`,
        // mobileImage: '/assets/about-us/mobile/footprint5.jpg',
        title: 'Shanta Lifestyle',
        link: 'https://shantalifestyle.com/',
        description:
          'Luxury home décor company established with an aim to cater to the increasingly sophisticated interior design needs of Bangladeshi consumers searching for customization, luxury and exclusivity.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/footprint2.jpg`,
        // mobileImage: '/assets/about-us/mobile/footprint2.jpg',
        title: 'Shanta Multiverse',
        link: 'https://shantamultiverse.com/',
        description:
          'Shanta Multiverse owns and operates The White Canary Café, a specialty all-day brunch and cafe chain with its presence spanning 5 locations in Dhaka, Bangladesh.',
      },
      {
        image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/shanta_property.jpg`,
        // mobileImage: '/assets/about-us/mobile/shanta_property.jpg',
        title: 'Shanta Property Management',
        link: 'https://www.shantapml.com/',
        description:
          'Shanta Property Management Limited offers integrated property management solutions in Bangladesh, specializing in facilities management, rental services, and buy-sell advisory for a seamless living experience.',
      },
    ],
  }
  return (
    <div>
      <FootPrintSection footPrintData={block} />
    </div>
  )
}

export default ShantaFootPrintBlock
