'use client'

import useSSRLanguage from '@/hooks/useSSRLanguage'

const SUPPORT_EMAIL = 'info@shantalife.com'
const CLAIM_FORM_URL = 'https://portal.shantalife.com/'

// helper: EN → BN digits
function toBengaliNumber(num: string) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return num.replace(/\d/g, (d) => bnDigits[parseInt(d, 10)])
}

export function IndividualClaim() {
  const lang = useSSRLanguage()
  const phone = '09610889900'
  const phoneBn = toBengaliNumber(phone)

  const data = [
    {
      // EN with markup
      descriptionContent: `
        <b>Step 1:</b><br/>
        Complete the Health Insurance <a href="${CLAIM_FORM_URL}" target="_blank" rel="noopener noreferrer"
          class="text-[#9C8639] underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#9C8639]/40">
          Claim Form
        </a> duly signed off by the Policy Owner.
      `,
      // BN with the SAME markup + links
      descriptionContentBN: `
        <b>ধাপ ১:</b><br/>
        পলিসি গ্রাহক কর্তৃক স্বাক্ষরিত স্বাস্থ্য বীমার
        <a href="${CLAIM_FORM_URL}" target="_blank" rel="noopener noreferrer"
          class="text-[#9C8639] underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#9C8639]/40">
          ক্লেইম ফর্ম
        </a>
        সঠিকভাবে পূরণ করুন।
      `,
    },
    {
      descriptionContent: `
        <b>Step 2:</b><br/>
        Attach all treatment documents along with the claim form. You may also find the list of required documents at the end of the form.
      `,
      descriptionContentBN: `
        <b>ধাপ ২:</b><br/>
        ক্লেইম ফর্মের সাথে চিকিৎসার সকল কাগজপত্র সংযুক্ত করুন। প্রয়োজনীয় ডকুমেন্টের তালিকা ফর্মের শেষ অংশে উল্লেখ আছে।
      `,
    },
    {
      descriptionContent: `
        <b>Step 3:</b><br/>
        Send the documents via email to
        <a href="mailto:${SUPPORT_EMAIL}"
          class="text-[#9C8639] underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#9C8639]/40">
          ${SUPPORT_EMAIL}
        </a>
        or via your representative to our head office.
      `,
      descriptionContentBN: `
        <b>ধাপ ৩:</b><br/>
        ডকুমেন্টগুলো ইমেইলের মাধ্যমে
        <a href="mailto:${SUPPORT_EMAIL}"
          class="text-[#9C8639] underline underline-offset-2 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-[#9C8639]/40">
          ${SUPPORT_EMAIL}
        </a>
        ঠিকানায় পাঠান অথবা আপনার প্রতিনিধি মারফত আমাদের হেড অফিসে জমা দিন।
      `,
    },
  ]

  return (
    <div>
      <div>
        <div className="flex flex-col mt-12 space-y-4 lg:space-y-4 xl:space-y-7">
          {data.map((eachItem, i) => {
            const html =
              lang === 'en'
                ? (eachItem.descriptionContent ?? '')
                : (eachItem.descriptionContentBN ?? eachItem.descriptionContent ?? '')
            return (
              <div
                key={i}
                className="flex items-center bg-white/50 backdrop-blur-[12.5px] border-[1.25px] border-[#9C8639]
                           space-x-2 lg:space-x-1 xl:space-x-3 2xl:space-x-4
                           p-1.5 md:px-3 md:py-1.5 lg:px-3 lg:py-2 xl:p-3 2xl:p-4 
                           rounded-[4px] lg:rounded-[6px] xl:rounded-[8px]"
              >
                <div className="text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px] text-[#434343]">
                  <div dangerouslySetInnerHTML={{ __html: html }} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <h4 className="mt-[30px] lg:mt-[50px] xl:mt-[80px] text-[12px] md:text-[14px] lg:text-[16px] xl:text-[18px] 2xl:text-[20px]">
        {lang === 'en' ? (
          <>
            For any further queries please contact{' '}
            <a href={`tel:${phone}`} className="text-[#9C8639]">
              {phone}
            </a>
          </>
        ) : (
          <>
            যে কোনো তথ্যের জন্য অনুগ্রহ করে{' '}
            <a href={`tel:${phone}`} className="text-[#9C8639]">
              {phoneBn}
            </a>{' '}
            নম্বরে যোগাযোগ করুন।
          </>
        )}
      </h4>
    </div>
  )
}
