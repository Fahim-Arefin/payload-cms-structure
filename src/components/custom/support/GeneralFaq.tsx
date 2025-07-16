'use client'

import React, { useState } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import ToolTip from '../shared/ToolTip'
import GlobalButton from '../shared/GlobalButton'

type Props = {}

type AccordionItemType = {
  value: string
  title: string
  content: string[]
}

type FaqKey = 'product' | 'claims'

const faqData: Record<FaqKey, AccordionItemType[]> = {
  product: [
    {
      value: 'item-1',
      title: 'What is Shanta Life Insurance?',
      content: [
        'Shanta Life Insurance is a comprehensive life coverage plan that protects your family financially in case of untimely demise.',
        'It also offers various riders for critical illness, disability, and accidental coverage.',
      ],
    },
    {
      value: 'item-2',
      title: 'How is the premium calculated?',
      content: [
        'Premium is calculated based on age, sum assured, policy term, and optional riders selected.',
        'You can use our online premium calculator for an estimate tailored to your needs.',
      ],
    },
    {
      value: 'item-3',
      title: 'Can I customize my coverage?',
      content: [
        'Yes, our policies allow you to choose coverage amount, tenure, and add optional riders such as critical illness, hospital cash, and waiver of premium.',
      ],
    },
  ],
  claims: [
    {
      value: 'item-1',
      title: 'How do I file a claim?',
      content: [
        'You can initiate a claim by submitting a claim form along with necessary documents via our website or visiting a branch office.',
        'Our claim support team will assist you throughout the process.',
      ],
    },
    {
      value: 'item-2',
      title: 'What documents are needed to file a death claim?',
      content: [
        'Documents required include the original policy document, claimant’s ID proof, death certificate, and a copy of the hospital/discharge summary (if applicable).',
      ],
    },
    {
      value: 'item-3',
      title: 'How long does it take to settle a claim?',
      content: [
        'Once all documents are received and verified, claims are typically settled within 7 to 10 working days.',
      ],
    },
  ],
}

const selectorOptions = [
  { key: 'product', label: 'Product Details' },
  { key: 'claims', label: 'Claim Process' },
]

function GeneralFaq({}: Props) {
  const [selectedKey, setSelectedKey] = useState<FaqKey>('product')

  const accordionItems = faqData[selectedKey]

  return (
    <div
      className="px-5 py-12 
           md:px-24 md:py-[40px] 
           lg:px-[130px]  lg:py-[50px] 
           xl:px-[200px]  xl:py-[70px] 
           2xl:px-[300px] 2xl:py-[100px] bg-[#F6EDDD] "
    >
      <div className="text-[#434343] space-y-8 lg:space-y-12">
        {/* header */}
        <div className="flex items-center justify-between">
          <h3
            className="text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[32px] 
          leading-6 md:leading-7 xl:leading-[35px] 2xl:leading-[45px] 
          uppercase font-semibold lg:font-normal"
          >
            General <span className="text-[#ED7125]">faq</span>
          </h3>
          <div className="flex items-center space-x-4">
            <div className="global-p1 cursor-pointer hover:underline underline-offset-4">
              Download forms
            </div>
            <div className="bg-[#ED7125] p-1 lg:p-1.5 xl:p-2 rounded-sm lg:rounded-md">
              <img
                src="/assets/faqIcon.png"
                alt=""
                className="h-[12px] md:h-[16px] lg:h-[24px] w-[12px] md:w-[16px] lg:w-[24px]"
              />
            </div>
          </div>
        </div>

        {/* selector */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="global-h3 font-semibold lg:font-normal">I want to learn more about</div>
          <Select value={selectedKey} onValueChange={(value) => setSelectedKey(value as FaqKey)}>
            <SelectTrigger className="bg-[#FCF4EB] rounded-[6px] p-4 md:p-6 w-[140px] md:w-[260px] lg:w-[300px] xl:w-[460px]">
              <SelectValue placeholder="Select FAQ Topic" />
            </SelectTrigger>
            <SelectContent className="bg-[#FCF4EB] rounded-[6px]">
              {selectorOptions.map(({ key, label }) => (
                <SelectItem key={key} value={key} className="text-[13px] md:text-[15px]">
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* faq q/a */}
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {accordionItems.map(({ value, title, content }, index) => (
            <AccordionItem
              key={value}
              value={value}
              className="bg-[#FCF4EB] px-2 md:px-6 md:py-1 mb-2 rounded-[6px]"
            >
              <AccordionTrigger className="font-bold hover:no-underline global-p2">
                {index + 1}. {title}
              </AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance px-2 pb-4 pt-2">
                {content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-[10px] md:text-[13px]">
                    {paragraph}
                  </p>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* load more btn */}
        <div className="flex justify-center ">
          <ToolTip>
            {/* <Button
              variant="outline"
              className="cursor-not-allowed
            text-[#3A3A3A] bg-[#F6EDDD] hover:bg-[#F6EEEE]
            global-p1 
            w-[90px] sm:w-[110px] md:w-[130px] lg:w-[140px] 2xl:w-[160px]
            h-[28px] sm:h-[34px] md:h-[40px] lg:h-[44px] 2xl:h-[47px]
            text-[10px] sm:text-[12px] md:text-[14px] lg:text-[15px] 2xl:text-[16px]
            font-medium rounded-md transition-all duration-200
            "
            >
              Load more
            </Button> */}
            <GlobalButton
              variant="outline"
              text="Load more"
              className=" text-[#3A3A3A] bg-[#F6EDDD] hover:bg-[#F6EEEE] cursor-not-allowed"
            />
          </ToolTip>
        </div>
      </div>
    </div>
  )
}

export default GeneralFaq
