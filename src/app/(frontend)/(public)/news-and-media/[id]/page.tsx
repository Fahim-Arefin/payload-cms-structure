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
      title: 'What is the Potential of the Insurance Sector in Bangladesh?',
      description:
        'We know that currently, there are 36 life insurance companies in Bangladesh. If we look at the life insurance penetration in Bangladesh, it is just over 0.4% of the GDP. This figure alone indicates that the existing insurance companies in Bangladesh have not yet fully capitalized on the available opportunities. There is immense potential here, and we believe that if the insurance industry can bring the right products to the market and properly serve clients when it comes to claims, we will see a significant positive shift in Bangladesh\'s insurance sector. In our neighboring country India, the penetration rate is over 4%. While we may not match India at this moment, even if we can increase our penetration by just 1%, the number of policyholders and the overall premium income will increase significantly.',
    },
    {
      id: 3,
      image: '/assets/newsandblog3.jpg',
      date: 'Jul 17, 2025',
      title: 'What Steps Should Be Taken to Develop the Insurance Sector?',
      description:
        'Companies working in the insurance sector — along with regulatory body, IDRA — have been making efforts for a long time. One of the biggest ongoing challenges in our industry is the lack of trust. Restoring that trust is essential, and we all know why it\'s missing — the reasons are clear and well-understood.\n\nSo, the first priority for developing the insurance sector should be to rebuild that trust. Generally, you\'ll notice that people hesitate to talk about insurance, and the main reason is exactly that — lack of trust. If we can regain people\'s confidence and build meaningful relationships between insurance companies and the public, the industry in Bangladesh will progress significantly.\n\nIf you look at other countries — again taking India as an example — you\'ll see that insurance is considered a necessity, not a luxury product that people think about only after all other needs are met. It\'s viewed as a lifesaving necessity.\n\nEven from a Bangladeshi perspective, the need is evident. Healthcare costs are rising, accidents are increasing, and more people are being hospitalized due to critical illnesses. For middle- and lower-income families, the financial burden from these events can be overwhelming, often affecting them for a lifetime. Helping these families and becoming a source of trust for them should be the number one goal of the insurance industry.\n\nSecondly, we must bring in new, need-based products that meet real-life requirements. The weaknesses in our healthcare system were clearly exposed during the COVID pandemic — it showed just how far behind we are compared to other countries. If we can introduce innovative insurance products in the health sector, the people of Bangladesh will benefit greatly, and the insurance industry will be able to make a meaningful contribution to society.\n\nFinally, I believe digitalization is crucial. In many companies, even after buying a policy, customers have to wait over a month to receive documentation. Families often suffer for years trying to claim insurance benefits — this is simply unacceptable.\n\nIn summary, if we can focus on these three key areas:\n\n1. Restoring trust\n2. Introducing relevant new products\n3. Accelerating digitalization\n\nThen significant progress in Bangladesh\'s insurance sector can happen very soon. There are other areas needing improvement too, but focusing on these three will set a strong foundation for industry transformation.',
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
