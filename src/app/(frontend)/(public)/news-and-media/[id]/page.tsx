import NewsDetailsSection from '@/components/custom/news-and-media/NewsDetailsSection'
import NewsDetailsSlider from '@/components/custom/news-and-media/NewsDetailsSlider'
import HeroSection from '@/components/custom/shared/hero/HeroSection'
import { AllNewsAndBlogDataType } from '@/types'
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}

async function page({ params }: Props) {
  // Blog data (from AllNewsSection)
  const blogData: AllNewsAndBlogDataType[] = [
    {
      id: 1,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/news-and-media/web/newsandblog1.jpg`,
      // mobileImage: '/assets/news-and-media/mobile/newsandblog1.jpg',
      date: 'Jul 17, 2025',
      title: 'What is the Potential of the Insurance Sector in Bangladesh?',
      description:
        "We know that currently, there are 36 life insurance companies in Bangladesh. If we look at the life insurance penetration in Bangladesh, it is just over 0.4% of the GDP. This figure alone indicates that the existing insurance companies in Bangladesh have not yet fully capitalized on the available opportunities. There is immense potential here, and we believe that if the insurance industry can bring the right products to the market and properly serve clients when it comes to claims, we will see a significant positive shift in Bangladesh's insurance sector. In our neighboring country India, the penetration rate is over 4%. While we may not match India at this moment, even if we can increase our penetration by just 1%, the number of policyholders and the overall premium income will increase significantly.",
    },
    {
      id: 3,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/news-and-media/web/newsandblog3.jpg`,
      // mobileImage: '/assets/news-and-media/mobile/newsandblog3.jpg',
      date: 'Jul 17, 2025',
      title: 'What Steps Should Be Taken to Develop the Insurance Sector?',
      description:
        "Companies working in the insurance sector — along with regulatory body, IDRA — have been making efforts for a long time. One of the biggest ongoing challenges in our industry is the lack of trust. Restoring that trust is essential, and we all know why it's missing — the reasons are clear and well-understood.\n\nSo, the first priority for developing the insurance sector should be to rebuild that trust. Generally, you'll notice that people hesitate to talk about insurance, and the main reason is exactly that — lack of trust. If we can regain people's confidence and build meaningful relationships between insurance companies and the public, the industry in Bangladesh will progress significantly.\n\nIf you look at other countries — again taking India as an example — you'll see that insurance is considered a necessity, not a luxury product that people think about only after all other needs are met. It's viewed as a lifesaving necessity.\n\nEven from a Bangladeshi perspective, the need is evident. Healthcare costs are rising, accidents are increasing, and more people are being hospitalized due to critical illnesses. For middle- and lower-income families, the financial burden from these events can be overwhelming, often affecting them for a lifetime. Helping these families and becoming a source of trust for them should be the number one goal of the insurance industry.\n\nSecondly, we must bring in new, need-based products that meet real-life requirements. The weaknesses in our healthcare system were clearly exposed during the COVID pandemic — it showed just how far behind we are compared to other countries. If we can introduce innovative insurance products in the health sector, the people of Bangladesh will benefit greatly, and the insurance industry will be able to make a meaningful contribution to society.\n\nFinally, I believe digitalization is crucial. In many companies, even after buying a policy, customers have to wait over a month to receive documentation. Families often suffer for years trying to claim insurance benefits — this is simply unacceptable.\n\nIn summary, if we can focus on these three key areas:\n\n1. Restoring trust\n2. Introducing relevant new products\n3. Accelerating digitalization\n\nThen significant progress in Bangladesh's insurance sector can happen very soon. There are other areas needing improvement too, but focusing on these three will set a strong foundation for industry transformation.",
    },
  ]

  // News data (from AllNewsAccordianSection)
  const newsData: AllNewsAndBlogDataType[] = [
    {
      id: 2,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/news-and-media/web/news2.jpg`,
      // mobileImage: '/assets/news-and-media/mobile/news2.jpg',
      date: 'Jul 17, 2025',
      title: 'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance',
      description: `Shanta Life Insurance PLC, a new venture under Shanta Holdings, signed an MoU with Dhaka Bank to provide Bancassurance service through the bank's distribution channel.
    Sheikh Mohammad Maroof, managing director & CEO of Dhaka Bank and Nafis A Ahmed, chief executive officer of the Shanta Life Insurance, signed the MoU at the bank's head office in Dhaka recently.
    Through this MoU, Shanta Life Insurance intends to leverage the robust banking channel of Dhaka Bank to provide tailored insurance policies to the clients of the latter. This proposition will help to offer more financial products to the customers of the bank.`,
      externalLink:
        'https://www.thedailystar.net/business/organisation-news/press-releases/news/shanta-life-insurance-and-dhaka-bank-sign-mou-jointly-prepare-bancassurance-3843041',
    },
    {
      id: 4,
      image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/news-and-media/web/news11.jpg`,
      // mobileImage: '/assets/news-and-media/mobile/news11.jpg',
      date: 'Jul 17, 2025',
      title: 'Shanta Life Insurance gets license to launch',
      description: `Bangladesh's insurance sector is set to expand through the launch of a new venture, "Shanta Life Insurance PLC".
      The company came into being through a consortium comprising Shanta Holdings Ltd, Shanta Lifestyle, Shanta Securities Ltd, Shanta Multiverse, Shanta Property Management, FAR Asset Management and Nasah Holdings Limited.
      It received the licence on November 7 from the Insurance Development and Regulatory Authority (IDRA), said a press release.
      "We are excited to step into a new sector," said Khondoker Monir Uddin, chairman and managing director of business conglomerate Shanta Holdings Ltd.`,
      externalLink:
        'https://www.thedailystar.net/business/news/shanta-life-insurance-gets-licence-launch-3464831',
    },
  ]

  // Combine all data
  const allNewsData = [...blogData, ...newsData]

  const { id } = await params
  const idNumber = parseInt(id, 10)

  // Determine if it's a blog or news based on ID
  const isBlog = blogData.some((item) => item.id === idNumber)
  const isNews = newsData.some((item) => item.id === idNumber)

  // Find the current item to get its title for description
  const currentItem = allNewsData.find((item) => item.id === idNumber)

  // Dynamic hero title, description, and image
  const heroTitle = isBlog ? 'Blog' : isNews ? 'News' : 'News & Media'
  const heroDescription =
    currentItem?.title ||
    'Shanta Life Insurance and Dhaka Bank sign MoU to jointly prepare for Bancassurance'

  // Use high-quality fallback for low-resolution images (like news2.jpg which is only 370x212)
  const lowQualityImages = [
    `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/news-and-media/web/news2.jpg`,
  ]
  const heroImage =
    currentItem?.image && !lowQualityImages.includes(currentItem.image)
      ? currentItem.image
      : `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/homepage/web/newsSingleBanner.jpg`

  const heroSlides = [
    {
      title: heroTitle,
      subtitle: '',
      description: heroDescription,
      image: heroImage,
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
