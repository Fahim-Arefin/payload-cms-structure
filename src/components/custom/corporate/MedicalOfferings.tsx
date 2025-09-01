// components/custom/corporate/MedicalOfferings.tsx
import Image from 'next/image'

type Offering = { title: string; image: string }

const CDN = process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN ?? ''

const MEDICAL_OFFERINGS: Offering[] = [
  {
    title: 'In-Patient Coverage (IPC)',
    image: `${CDN}/solutions/corporate/web/offerings_icon6.png`,
  },
  {
    title: 'Maternity Benefits',
    image: `${CDN}/solutions/corporate/web/offerings_icon7.png`,
  },
  {
    title: 'Out Patient Coverage (OPC)',
    image: `${CDN}/solutions/corporate/web/offerings_icon8.png`,
  },
  {
    title: 'OPC Dental',
    image: `${CDN}/solutions/corporate/web/offerings_icon9.png`,
  },
  {
    title: 'OPC Optical',
    image: `${CDN}/solutions/corporate/web/offerings_icon10.png`,
  },
]

export default function MedicalOfferings({ className = '' }: { className?: string }) {
  return (
    <section className="py-6 sm:py-8 md:py-10 lg:py-12 px-4 md:px-8 lg:px-10 xl:px-12 2xl:px-14">
      <ul className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
        {MEDICAL_OFFERINGS.map((item, idx) => (
          <li key={item.title} className="flex items-center gap-3 sm:gap-4 md:gap-5">
            <span className="relative w-[30px] h-[30px] md:w-[50px] md:h-[50px] shrink-0">
              <Image
                src={item.image}
                alt={item.title}
                width={50}
                height={50}
                sizes="50px"
                className="object-contain"
                priority={idx === 0}
              />
            </span>
            <h4 className="text-[#292929] font-semibold tracking-wide text-[10px] sm:text-base md:text-lg uppercase">
              {item.title}
            </h4>
          </li>
        ))}
      </ul>
    </section>
  )
}
