'use client'

import React, { useMemo, useState } from 'react'
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
import GlobalButton from '../shared/GlobalButton'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedText from '../shared/LocalizedText'
// If your LocalizedRichText path differs, adjust the import accordingly:
import LocalizedRichText from '../shared/LocalizedRichText'

// Types that match your schema nesting for a single category entry
type QAItem = {
  title: string
  titleBN?: string | null
  desc?: any | null // lexical rich text JSON
  descBN?: any | null
}

type Category = {
  key: 'general' | 'claims' | 'policy' | 'customer' | 'product' | 'insurance'
  title: string
  titleBN?: string | null
  items?: QAItem[]
}

type Props = {
  categories: Category[]
  containerBg?: string
  title?: string
  titleBN?: string
}

const KEY_LABELS: Record<Category['key'], string> = {
  general: 'General Query',
  claims: 'Claim',
  policy: 'New Policy',
  customer: 'Customer Care',
  product: 'Product',
  insurance: 'Group Insurance',
}

function GeneralFaq({
  categories,
  containerBg = '#F6EDDD',
  title,
  titleBN,
}: Props) {
  const lang = useSSRLanguage()

  // build selector options from provided categories (en label fallback)
  const selectorOptions = useMemo(() => {
    return (categories || []).map((c) => ({
      key: c.key,
      label: KEY_LABELS[c.key] || c.title || 'Category',
    }))
  }, [categories])

  const firstKey = selectorOptions?.[0]?.key ?? 'general'
  const [selectedKey, setSelectedKey] = useState<Category['key']>(firstKey)

  const selectedCategory = useMemo(
    () => categories?.find((c) => c.key === selectedKey),
    [categories, selectedKey],
  )

  const items = selectedCategory?.items || []
  const itemsPerPage = 8
  const [showAll, setShowAll] = useState(false)
  const hasMoreItems = items.length > itemsPerPage
  const displayedItems = showAll ? items : items.slice(0, itemsPerPage)

  return (
    <div
      className="px-5 py-12 
           md:px-24 md:py-[40px] 
           lg:px-[130px]  lg:py-[50px] 
           xl:px-[200px]  xl:py-[70px] 
           2xl:px-[300px] 2xl:py-[100px]"
      style={{ backgroundColor: containerBg }}
    >
      <div className="text-[#434343] space-y-8 lg:space-y-12">
        {/* selector header with localized category heading */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <div className="global-h3 font-semibold lg:font-normal">
            <LocalizedText
              en={title || 'I want to learn more about'}
              bn={titleBN || 'আমি জানতে চাই'}
            />
          </div>

          <Select
            value={selectedKey}
            onValueChange={(value) => setSelectedKey(value as Category['key'])}
          >
            <SelectTrigger className="bg-[#FCF4EB] rounded-[6px] p-4 md:p-6 w-[150px] md:w-[260px] lg:w-[300px] xl:w-[460px]">
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

        {/* Q/A list (rich text answers) */}
        <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
          {displayedItems.map((qa, index) => {
            const itemValue = `item-${index + 1}`
            return (
              <AccordionItem
                key={itemValue}
                value={itemValue}
                className="bg-[#FCF4EB] px-2 md:px-6 md:py-1 mb-2 rounded-[6px]"
              >
                <AccordionTrigger className="font-semibold hover:no-underline global-p1 !justify-start">
                  <span className="mr-auto text-left flex items-start gap-2 whitespace-normal">
                    <span>{index + 1}.</span>
                    <LocalizedText en={qa.title} bn={qa.titleBN || undefined} />
                  </span>
                </AccordionTrigger>

                <AccordionContent className="flex flex-col gap-4 text-balance px-2 pb-4 pt-2">
                  {/* RichText renderer — uses your LocalizedRichText */}
                  <div className="text-[12px] md:text-[14px] lg:text-[16px] leading-relaxed">
                    <LocalizedRichText en={qa.desc} bn={qa.descBN} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            )
          })}
        </Accordion>

        {/* load more/show less */}
        {hasMoreItems && (
          <div className="flex justify-center">
            <GlobalButton
              variant="outline"
              text={
                showAll
                  ? lang === 'bn'
                    ? 'কম দেখান'
                    : 'Show less'
                  : lang === 'bn'
                    ? 'আরও দেখান'
                    : 'Load more'
              }
              onClick={() => setShowAll((prev) => !prev)}
              className="text-[#3A3A3A]"
              style={{ backgroundColor: containerBg }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GeneralFaq
