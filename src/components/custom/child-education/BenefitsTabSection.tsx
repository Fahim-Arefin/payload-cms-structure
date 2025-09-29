'use client'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { LuArrowUpRight } from 'react-icons/lu'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import LocalizedString from '../shared/LocalizedString'

const riders = [
  {
    en: 'Accidental Medical Reimbursement (AMR)',
    bn: 'দুর্ঘটনাজনিত চিকিৎসার আর্থিক খরচ',
  },
  {
    en: 'Permanent Partial Disability (PPD)',
    bn: 'দুর্ঘটনায় আংশিক চিরস্থায়ী অক্ষমতায় বীমা',
  },
  {
    en: 'Permanent Total Disability (PTD)',
    bn: 'দুর্ঘটনায় পূর্ণাঙ্গ চিরস্থায়ী অক্ষমতায় বীমা',
  },
  {
    en: 'Accidental Death (AD)',
    bn: 'দুর্ঘটনায় মৃত্যুতে মূল পলিসি কাভারেজের দ্বিগুণ সুবিধা (মূল বীমা কভারেজ সহ)',
  },
]

export function BenefitsTabSection() {
  return (
    <div className="p-2 lg:p-3 xl:p-4">
      {/* <div className="w-full flex flex-col lg:flex-row md:items-start gap-8 mt-[15px] md:mt-0 "> */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-5 xl:grid-cols-3 gap-8 mt-[15px] md:mt-0 ">
        {/* Right Image - top on mobile/tablet, right on desktop */}
        <div className="w-full h-auto order-1 lg:order-2 col-span-1 lg:col-span-2 xl:col-span-1">
          {/* mobile */}
          <div className="relative lg:hidden rounded-md w-full aspect-[300/200] ">
            <Image
              fill
              src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/child-education/mobile/benefitBannerTab.jpg`}
              alt="Benifit Section Image"
              className="object-cover object-center rounded-md"
              sizes="100vw"
            />
          </div>
          {/* web */}
          <div className="relative hidden lg:block w-full h-full rounded-md lg:rounded-lg xl:rounded-xl">
            <Image
              fill
              src={`${process?.env?.NEXT_PUBLIC_STATIC_IMG_DOMAIN}/solutions/individual/child-education/web/benefitBannerTab.jpg`}
              alt="Benifit Section Image"
              className="object-cover lg:object-[83%] xl:object-[88%] rounded-md lg:rounded-lg xl:rounded-xl"
              sizes="50vw"
            />
          </div>
        </div>

        {/* Left Content */}
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 xl:col-span-2">
          <h2 className="global-h1 font-semibold uppercase mb-2 lg:mb-10 text-[#434343]">
            <LocalizedText en="BOOST YOUR COVERAGE WITH" bn="আপনার সুরক্ষাকে করুন" />
            <br />
            <LocalizedHighlighted
              textEn="THESE SUPERCHARGED RIDERS!"
              textBn="আরোও আকর্ষণীয়!"
              highlightEn="SUPERCHARGED RIDERS!"
              highlightBn="আকর্ষণীয়!"
              highlightClassName="text-[#ED7125]"
            />
          </h2>
          <div className="space-y-4 lg:space-y-8 mt-6 text-[#434343] ">
            <p className="global-p2 font-light">
              <span className="font-semibold">
                <LocalizedText en={`Shanta Spouse Shield: `} bn={`শান্তা স্পাউস শিল্ড: `} />
              </span>
              <LocalizedText
                en={`A smart, practical, and
              future-focused protection plan designed to secure your family’s financial well-being.`}
                bn={`শান্তা স্পাউস শিল্ড আপনার ভবিষ্যৎ অর্থনৈতিক সুরক্ষায় একটি স্মার্ট ও বাস্তবমুখী প্ল্যান - 
              যেন একসাথে পথচলার প্রতিটি পদক্ষেপে থাকে নিশ্চিন্ত সুরক্ষার ছায়া।`}
              />
            </p>
            <p className="global-p2 font-light">
              <span className="font-semibold ">
                <LocalizedText
                  en={`Shanta Premium of Waiver: `}
                  bn={`শান্তা ওয়েভার অফ প্রিমিয়াম: `}
                />
              </span>{' '}
              <LocalizedText
                en={`When life takes an unexpected turn, your family stays protected. In case of death or
              disability, all premiums are waived but coverage remains intact.`}
                bn={`দুর্ঘটনায় আয়ের পথ রুদ্ধ হলেও আপনার পলিসি থাকবে অবিচল! এই শক্তিশালী রাইডারের সাথে, 
                    বীমাকৃত ব্যক্তির অবর্তমানে বা পূর্ণাঙ্গভাবে উপার্জনের ক্ষমতা হারালে ভবিষ্যতের সকল প্রিমিয়াম মওকুফ হবে, 
                    আর বীমার সুরক্ষা থাকবে পুরোপুরি অটুট!`}
              />
            </p>
            <p className="global-p2 font-light">
              <span className="font-semibold ">
                <LocalizedText
                  en="Shanta Critical Illness:"
                  bn="শান্তা ক্রিটিক্যাল প্রটেকশন (CP): "
                />
              </span>
              <LocalizedText
                en={`Safeguard yourself
              against life’s serious health challenges with coverage for up to 25 critical
              illnesses. On diagnosis, receive a lump sum payout—so you can focus on recovery, not
              financial strain.`}
                bn={`জীবনের কঠিন স্বাস্থ্য সমস্যা মোকাবেলায় আর্থিক সহযোগিতা নিশ্চিত করুন ২৫টি পর্যন্ত গুরুতর রোগের কভারেজের মাধ্যমে। নির্দিষ্ট রোগ নির্ণয়ের সাপেক্ষে এককালীন অর্থ প্রাপ্তি —যাতে আপনি আর্থিক দুশ্চিন্তা থেকে মুক্ত হয়ে সুস্থ হওয়ার পথে এগিয়ে যেতে পারেন।`}
              />
            </p>
            <p className="global-p2 font-light">
              <span className="font-semibold ">
                <LocalizedText
                  en="Shanta Accidental Coverage: "
                  bn="শান্তা অ্যাক্সিডেন্টাল কাভারেজ: "
                />
              </span>{' '}
              <LocalizedText
                en={`Strengthen your policy with added protection against unforeseen accidents. This rider
              offers financial support across:`}
                bn={`অপ্রত্যাশিত দুর্ঘটনার শারীরিক ক্ষতি মোকাবেলায় থাকুন অর্থনৈতিকভাবে সুরক্ষিত। দুর্ঘটনায় আর্থিক নিশ্চয়তা প্রদানের 
                  জন্য শান্তা অ্যাক্সিডেন্টাল কাভারেজ চারটি ভিন্ন বীমা সুবিধা প্রদান করে`}
              />
            </p>
            <ul className="flex flex-col gap-2 md:gap-4 justify-center px-4 md:px-8 lg:px-16 xl:px-24">
              {riders.map((r, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-5 h-5 md:w-6 md:h-6 xl:h-8 rounded bg-[#ED7125] text-white font-light flex items-center justify-center text-[12px] md:text-base mr-2">
                    {idx + 1}
                  </span>
                  <span className="global-p2">
                    <LocalizedText en={r.en} bn={r.bn} />
                  </span>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-2 md:gap-4 justify-center text-center px-4 md:px-8 lg:px-16 xl:px-24">
              <li className="flex items-center gap-1 lg:gap-2">
                <Link href="/plans/individual/health-and-protection">
                  <Button
                    variant="link"
                    className="px-0 text-[#ED7125] flex justify-start items-center gap-1 lg:gap-2 hover:underline hover:underline-offset-8 global-p2 font-normal"
                  >
                    <LocalizedString en={`See Rider Benefits`} bn={`রাইডারের সুবিধাসমূহ দেখুন`} />
                    <LuArrowUpRight className="global-h4" />
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
