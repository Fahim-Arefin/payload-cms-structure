import { DirectorMessagesBlockType } from '@/types/payloadCustomTypes'
import DirectorCard from './DirectorCard'

type Props = {
  directorCardData: DirectorMessagesBlockType
}

async function DirectorsMessageSection({ directorCardData }: Props) {
  //   const directorCardData = [
  //     {
  //       image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/directoralone.png`,
  //       // mobileImage: '/assets/about-us/mobile/directoralone.png',
  //       name: 'Khondoker Monir Uddin',
  //       designation: 'Chairman',
  //       title: 'Charting the Course',
  //       subtitle: 'for a Bold Tomorrow',
  //       description: `At Shanta, we proudly uphold a legacy of integrity, innovation and excellence. As we embark on our journey in the insurance sector, we remain focused on our goal to offer unmatched life insurance solutions that ensure peace of mind and long-term financial security for our customers. Our determination to establish trust will remain unshakeable and so will our commitment to setting a new standard in the quality of life insurance services provided.The initiative of enhancing financial literacy among individuals and boosting confidence in them with services that bring stability is the cornerstone that carries the name of our organization, not only over the financial future of our customers but also over our community as a whole. At Shanta Life, we will continue our four decades long legacy of excellence and commitment with utmost sincerity, and I welcome you to explore planning your family's financial security with our trusted team.`,
  //       // link: 'https://shantalife.com/message-form-chairman.php',
  //       link: '/all-bods#id-1',
  //     },
  //     {
  //       image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/about-us/web/CEOalone.png`,
  //       // mobileImage: '/assets/about-us/mobile/CEOalone.png',
  //       name: 'Nafis Akhter Ahmed',
  //       designation: 'Chief Executive Officer',
  //       title: 'Redefining',
  //       subtitle: 'Life Insurance',
  //       description: `At Shanta Life, we envision a future where financial
  // security and peace of mind are accessible to
  // everyone. Our mission is to promote the desired
  // quality of life through customer-centric solutions,
  // cutting-edge digitalization, and a steadfast
  // adherence to corporate good governance. Every
  // product we design, every service we deliver, and
  // every interaction we have is guided by our core
  // values of trust, simplicity, ownership, transparency
  // and customer centricity. At the heart of Shanta Life is
  // a passionate and dedicated team who believe that
  // insurance is not just about securing lives—it’s about
  // enabling you to take control of your life. As we
  // continue our journey, we remain committed to
  // forging lasting relationships with our clients,
  // partners, and communities. Together, let’s build a
  // legacy of trust and ignite the power of possibilities
  // for a brighter tomorrow.
  // `,
  //       // link: 'https://shantalife.com/message-form-ceo.php',
  //       link: '/all-leaders#id-1',
  //     },
  //   ]

  return (
    <div>
      {directorCardData &&
        directorCardData?.cards &&
        directorCardData?.cards?.length !== 0 &&
        directorCardData?.cards?.map((item, index) => {
          return <DirectorCard data={item} index={index} key={index} />
        })}
    </div>
  )
}

export default DirectorsMessageSection
