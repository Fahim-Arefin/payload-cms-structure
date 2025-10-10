// components/custom/corporate/MedicalOfferings.tsx
import Image from 'next/image'
import LocalizedText from '../shared/LocalizedText'

type Offering = {
  title: string
  titleBN?: string
  image: string
  description?: string
  descriptionBN?: string
}

const CDN = process.env.NEXT_PUBLIC_STATIC_IMG_DOMAIN ?? ''

const MEDICAL_OFFERINGS: Offering[] = [
  {
    title: 'In-Patient Coverage (IPC)',
    titleBN: 'ইন-পেশেন্ট কভারেজ (IPC)',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon6.png`,
    description: `Shanta Life’s In-Patient Treatment Plan covers hospitalization costs for 24 hours or more due 
          to illness or injury, ensuring financial protection for room charges, medical bills, and related expenses`,
    descriptionBN: `২৪ ঘণ্টা বা তার বেশি হাসপাতালে ভর্তি হওয়ার ক্ষেত্রে (অসুস্থতা বা আঘাতের কারণে) রুম চার্জ, চিকিৎসা বিল 
          ও সম্পর্কিত খরচ কভার করা হয়।`,
  },
  {
    title: 'Maternity Benefits',
    titleBN: `মাতৃত্বকালীন সুবিধা`,
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon7.png`,
    description: `Welcoming a new life should be a moment of joy, not financial stress. Our Maternity Benefit offers coverage for:
          Normal delivery, Caesarean, ectopic, or extra-uterine pregnancies, Legal abortion or miscarriage.
          This benefit is available for female employees and/or spouses up to 45 years of age.`,
    descriptionBN: `একটি নতুন জীবনকে স্বাগত জানান আনন্দের সঙ্গে, আর্থিক চাপ ছাড়াই। কভারেজের আওতায়:
          স্বাভাবিক প্রসব
          সিজারিয়ান, একটপিক বা এক্সট্রা-ইউটেরিন গর্ভধারণ
          বৈধ গর্ভপাত বা গর্ভস্রাব
          এই সুবিধা মহিলা কর্মচারী ও/অথবা স্ত্রীদের জন্য প্রযোজ্য, বয়সসীমা ৪৫ বছর পর্যন্ত।`,
  },
  {
    title: 'Out Patient Coverage (OPC)',
    titleBN: 'আউট-পেশেন্ট কভারেজ (OPC)',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon8.png`,
    description: `Not all treatments require hospitalization. Our OPC Plan reimburses expenses for consultations, 
          medicines, and diagnostic tests, helping employees access quality healthcare without added costs. Covered services include:
          a) Doctor consultation fees,
          b) Medication,
          c) Diagnostic tests and procedures`,
    descriptionBN: `সব চিকিৎসার জন্য হাসপাতালে ভর্তি হওয়া লাগে না। আমাদের OPC সুবিধা পরামর্শ, ওষুধ ও ডায়াগনস্টিক টেস্টের খরচ ফেরত দেয়। 
          কভারেজ অন্তর্ভুক্ত:
          ডাক্তারি ফি,
          ওষুধ,
          ডায়াগনস্টিক টেস্ট `,
  },
  {
    title: 'OPC Dental',
    titleBN: 'OPC ডেন্টাল',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon9.png`,
    description: `Dental care is essential, and our Dental OPC benefit helps cover common treatments that do not require hospitalization. This includes:
          a) Dental consultations,
          b) Fillings,
          c) Routine extractions,
          d) Medication and X-rays,
          e) Root canal treatment, including bridging and capping,
          f) Scaling & polishing (once a year for each member)`,
    descriptionBN: `দাঁতের চিকিৎসায় কভারেজ, যেমন:
          ডেন্টাল কনসালটেশন,
          ফিলিংস,
          সাধারণ দাঁত তোলা,
          ওষুধ ও এক্স-রে,
          রুট ক্যানাল, ব্রিজিং ও ক্যাপিং, 
          স্কেলিং ও পলিশিং (প্রতি সদস্য বছরে একবার)`,
  },
  {
    title: 'OPC Optical',
    titleBN: 'OPC অপটিক্যাল',
    image: `${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/corporate/web/offerings_icon10.png`,
    description: `Our Optical OPC benefit provides coverage for vision care and related treatments that do not require hospital admission. The coverage includes:
          a) Eye consultations,
          b) Vision tests for refractive errors,
          c) Required medications,
          d) Lenses & spectacles`,
    descriptionBN: `চোখের যত্নের কভারেজ, যেমন:
          চোখের ডাক্তারি পরামর্শ,
          ভিশন টেস্ট,
          ওষুধ,
          চশমা ও লেন্স`,
  },
]

export default function MedicalOfferings({ className = '' }: { className?: string }) {
  return (
    <section className={`py-6 md:py-0 px-4 md:px-8 lg:px-10 xl:px-12 2xl:px-14 ${className}`}>
      <ul className="space-y-3 md:space-y-0">
        {MEDICAL_OFFERINGS.map((item, idx) => (
          <li
            key={item.title}
            className={`
              group relative cursor-pointer
              rounded-[10px] border border-transparent bg-transparent
              transition-colors duration-200
              hover:border-[#9C8639] hover:bg-white
              focus-within:border-[#9C8639] focus-within:bg-white
            `}
          >
            {/* Row */}
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 p-3 sm:p-4 md:p-5">
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
                <LocalizedText en={item?.title} bn={item?.titleBN} />
              </h4>
            </div>

            {/* Description with fade/expand effect */}
            {item.description && (
              <div
                className={`
                  px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 -mt-4
                  h-auto
                  opacity-0 overflow-hidden
                  transition-all duration-300 ease-in-out
                  group-hover:opacity-100 group-hover:max-h-40
                  hidden md:block
                `}
              >
                <p className="text-[11px] pl-[44px] md:pl-[72px] sm:text-sm md:text-[15px] leading-relaxed text-[#444]">
                  <LocalizedText en={item?.description} bn={item?.descriptionBN} />
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
