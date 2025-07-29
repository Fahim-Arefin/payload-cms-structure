import NewsDetailsSection from '@/components/custom/news-and-media/NewsDetailsSection'
import NewsDetailsSlider from '@/components/custom/news-and-media/NewsDetailsSlider'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { AllNewsAndBlogDataType } from '@/types'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

async function page({ params }: Props) {
  const allNewsData: AllNewsAndBlogDataType[] = [
    {
      id: 1,
      image: '/assets/newsandblog1.jpg',
      date: 'Jul 17, 2025',
      title: 'Shanta Life to Hold Conference Call for Second Quarter 2025 Results',
      description:
        "Shanta Life Insurance PLC, a new venture under the renowned corporate house Shanta Holdings, signed an MoU with Dhaka Bank, one of the esteemed banks of Bangladesh, with the aim to provide Bancassurance services through the banks distribution channel. Sheikh Mohammad Maroof, Managing Director & CEO of Dhaka Bank, and Nafis A. Ahmed, Chief Executive Officer of Shanta Life Insurance, signed the MoU at the bank's head office in Dhaka recently. Through this MoU, Shanta Life Insurance intends to leverage the robust banking network of Dhaka Bank to offer tailored insurance policies to the banks clients. This collaboration will help provide a broader range of financial products to customers of the bank. Sheikh Mohammad Maroof stated, “Bancassurance enhances financial protection by integrating banking and insurance services. Dhaka Banks collaboration with Shanta Life will provide customers with convenient, customized insurance solutions, promoting financial security and risk management. This partnership reflects our commitment to innovation and expanding financial inclusion across Bangladesh.” Nafis A. Ahmed, CEO of Shanta Life Insurance, added, “Bancassurance is the new horizon for the insurance sector in Bangladesh. We believe such institutional arrangements will benefit customers in the long run.” This MoU marks the starting point of building a complete framework to deliver smooth Bancassurance services to customers, along with capacity building for bank employees. Bancassurance will allow clients of the bank to purchase insurance policies through banking channels. The collaboration is expected to further strengthen the partnership between the insurer and the bank, bringing greater depth to the relationship. The signing event was graced by other high officials of both organizations.",
    },
    {
      id: 2,
      image: '/assets/newsandblog2.jpg',
      date: 'Jul 17, 2025',
      title: 'How Insurance can help you to keep your loved ones safe?',
      description:
        "Shanta Life Insurance PLC, a new venture under the renowned corporate house Shanta Holdings, signed an MoU with Dhaka Bank, one of the esteemed banks of Bangladesh, with the aim to provide Bancassurance services through the banks distribution channel. Sheikh Mohammad Maroof, Managing Director & CEO of Dhaka Bank, and Nafis A. Ahmed, Chief Executive Officer of Shanta Life Insurance, signed the MoU at the bank's head office in Dhaka recently. Through this MoU, Shanta Life Insurance intends to leverage the robust banking network of Dhaka Bank to offer tailored insurance policies to the banks clients. This collaboration will help provide a broader range of financial products to customers of the bank. Sheikh Mohammad Maroof stated, “Bancassurance enhances financial protection by integrating banking and insurance services. Dhaka Banks collaboration with Shanta Life will provide customers with convenient, customized insurance solutions, promoting financial security and risk management. This partnership reflects our commitment to innovation and expanding financial inclusion across Bangladesh.” Nafis A. Ahmed, CEO of Shanta Life Insurance, added, “Bancassurance is the new horizon for the insurance sector in Bangladesh. We believe such institutional arrangements will benefit customers in the long run.” This MoU marks the starting point of building a complete framework to deliver smooth Bancassurance services to customers, along with capacity building for bank employees. Bancassurance will allow clients of the bank to purchase insurance policies through banking channels. The collaboration is expected to further strengthen the partnership between the insurer and the bank, bringing greater depth to the relationship. The signing event was graced by other high officials of both organizations.",
    },
    {
      id: 3,
      image: '/assets/newsandblog3.jpg',
      date: 'Jul 17, 2025',
      title: 'How you can be benefited by Santa Life insurance?',
      description:
        "Shanta Life Insurance PLC, a new venture under the renowned corporate house Shanta Holdings, signed an MoU with Dhaka Bank, one of the esteemed banks of Bangladesh, with the aim to provide Bancassurance services through the banks distribution channel. Sheikh Mohammad Maroof, Managing Director & CEO of Dhaka Bank, and Nafis A. Ahmed, Chief Executive Officer of Shanta Life Insurance, signed the MoU at the bank's head office in Dhaka recently. Through this MoU, Shanta Life Insurance intends to leverage the robust banking network of Dhaka Bank to offer tailored insurance policies to the banks clients. This collaboration will help provide a broader range of financial products to customers of the bank. Sheikh Mohammad Maroof stated, “Bancassurance enhances financial protection by integrating banking and insurance services. Dhaka Banks collaboration with Shanta Life will provide customers with convenient, customized insurance solutions, promoting financial security and risk management. This partnership reflects our commitment to innovation and expanding financial inclusion across Bangladesh.” Nafis A. Ahmed, CEO of Shanta Life Insurance, added, “Bancassurance is the new horizon for the insurance sector in Bangladesh. We believe such institutional arrangements will benefit customers in the long run.” This MoU marks the starting point of building a complete framework to deliver smooth Bancassurance services to customers, along with capacity building for bank employees. Bancassurance will allow clients of the bank to purchase insurance policies through banking channels. The collaboration is expected to further strengthen the partnership between the insurer and the bank, bringing greater depth to the relationship. The signing event was graced by other high officials of both organizations.",
    },
    {
      id: 4,
      image: '/assets/newsandblog4.jpg',
      date: 'Jul 17, 2025',
      title: 'Why is Insurance important?',
      description:
        "Shanta Life Insurance PLC, a new venture under the renowned corporate house Shanta Holdings, signed an MoU with Dhaka Bank, one of the esteemed banks of Bangladesh, with the aim to provide Bancassurance services through the banks distribution channel. Sheikh Mohammad Maroof, Managing Director & CEO of Dhaka Bank, and Nafis A. Ahmed, Chief Executive Officer of Shanta Life Insurance, signed the MoU at the bank's head office in Dhaka recently. Through this MoU, Shanta Life Insurance intends to leverage the robust banking network of Dhaka Bank to offer tailored insurance policies to the banks clients. This collaboration will help provide a broader range of financial products to customers of the bank. Sheikh Mohammad Maroof stated, “Bancassurance enhances financial protection by integrating banking and insurance services. Dhaka Banks collaboration with Shanta Life will provide customers with convenient, customized insurance solutions, promoting financial security and risk management. This partnership reflects our commitment to innovation and expanding financial inclusion across Bangladesh.” Nafis A. Ahmed, CEO of Shanta Life Insurance, added, “Bancassurance is the new horizon for the insurance sector in Bangladesh. We believe such institutional arrangements will benefit customers in the long run.” This MoU marks the starting point of building a complete framework to deliver smooth Bancassurance services to customers, along with capacity building for bank employees. Bancassurance will allow clients of the bank to purchase insurance policies through banking channels. The collaboration is expected to further strengthen the partnership between the insurer and the bank, bringing greater depth to the relationship. The signing event was graced by other high officials of both organizations.",
    },
  ]
  const { id } = await params
  const idNumber = parseInt(id, 10)

  const heroSlides = [
    {
      title: 'News & Media',
      subtitle: '',
      description:
        'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
      image: '/assets/newsSingleBanner.jpg',
    },
  ]
  return (
    <div className="font-avenir bg-white">
      <HeroSection
        heroSlides={heroSlides}
        height=" h-[252px] md:h-[352px] lg:h-[400px] xl:h-[500px] 2xl:h-[600px] "
        top=" top-[150px] md:top-[200px] lg:top-[43%]"
        position="[object-position:50%_30%]"
      />
      <NewsDetailsSection id={idNumber} data={allNewsData} />
      <NewsDetailsSlider id={idNumber} data={allNewsData} />
    </div>
  )
}

export default page
