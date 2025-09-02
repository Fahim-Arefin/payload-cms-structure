// components/custom/corporate/LifeOfferings.tsx
import Image from 'next/image'

type Offering = { title: string; image: string }

const CDN = process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN ?? ''

const LIFE_OFFERINGS: Offering[] = [
  {
    title: 'Group Life Insurance (GL)',
    image: `${CDN}/solutions/corporate/web/offerings_icon1.png`,
  },
  {
    title: 'Accidental Death Coverage (AD)',
    image: `${CDN}/solutions/corporate/web/offerings_icon1.png`,
  },
  {
    title: 'Permanent and Total Disability (PTD)',
    image: `${CDN}/solutions/corporate/web/offerings_icon3.png`,
  },
  {
    title: 'Permanent and Partial Disability (PPD)',
    image: `${CDN}/solutions/corporate/web/offerings_icon4.png`,
  },
  {
    title: 'Critical Illness Coverage (CIB)',
    image: `${CDN}/solutions/corporate/web/offerings_icon5.png`,
  },
]

function LifeOfferings({}) {
  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
      <ul className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
        {LIFE_OFFERINGS.map((item, idx) => (
          <li key={item.title} className="flex items-center gap-3 sm:gap-4 md:gap-5">
            <div className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
                sizes="50px"
                className="object-contain"
                priority={idx === 0}
              />
            </div>

            <h4 className="text-[#292929] font-semibold tracking-wide text-[10px] md:text-base lg:text-[18px] uppercase">
              {item.title}
            </h4>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default LifeOfferings
