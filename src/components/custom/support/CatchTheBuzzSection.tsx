'use client'

import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import AllNewsContainer from './AllNewsContainer'
import SupportOVCSection from './SupportOVCSection'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { useLanguage } from '@/context/LanguageContext'

// 👉 Import your Payload type if you have it generated.
// Replace this with your actual generated type import.
import type { SupportBuzzBlockType } from '@/types/payloadCustomTypes'
import LocalizedText from '../shared/LocalizedText'

type Props = {
  block: SupportBuzzBlockType
}

function CatchTheBuzzSection({ block }: Props) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<'all' | 'ovc'>(
    (block?.allTab?.value as 'all' | 'ovc') || 'all',
  )

  const heading = useMemo(() => {
    const textEn = block?.title || ''
    const textBn = block?.titleBN || ''
    const highlightEn = block?.highlightedTitle || ''
    const highlightBn = block?.highlightedTitleBN || ''
    return { textEn, textBn, highlightEn, highlightBn }
  }, [block])

  return (
    <>
      <div
        className="container-width flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0
          py-12 
           md:py-[50px]
             lg:py-[70px] 
             xl:py-[100px]
           px-8 
           "
      >
        <div>
          <h3
            className="text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] 2xl:text-[32px] 
          leading-6 md:leading-7 xl:leading-[35px] 2xl:leading-[45px] 
          uppercase font-semibold lg:font-normal"
          >
            <LocalizedHighlighted
              textEn={heading.textEn || `See What's on The Highlights`}
              textBn={heading.textBn || 'শান্তা লাইফ হাইলাইটস'}
              highlightEn={heading.highlightEn || 'The Highlights'}
              highlightBn={heading.highlightBn || 'হাইলাইটস'}
              highlightClassName="text-[#ED7125]"
            />
          </h3>
        </div>

        {/* (Optional) client-side search box UI (not wired to results yet) */}
        <div className="relative w-[130px] md:w-[340px]">
          <Search className="absolute left-3 top-[18px] md:top-[21px] -translate-y-1/2 text-[#434343] w-4 h-4" />
          <Input
            type="text"
            placeholder={language === 'bn' ? 'অনুসন্ধান' : 'Search'}
            className="pl-9 pr-4 md:py-5 bg-[#FCF4EB] text-[#434343] text-sm rounded-md border border-[#3A3A3A] placeholder:text-[#43434380]"
          />
        </div>
      </div>

      <div className="relative ">
        {/* Tabs (Triggers only) */}
        <Tabs
          value={activeTab}
          onValueChange={(v) => setActiveTab(v as 'all' | 'ovc')}
          className="container-width px-8"
        >
          <TabsList className="w-full justify-start space-x-12 md:space-x-24 lg:space-x-32 xl:space-x-60 rounded-none bg-transparent ">
            <TabsTrigger
              value="all"
              className="text-[13px] md:text-base uppercase text-[#3A3A3A] data-[state=active]:text-[#ED7125]"
            >
              <LocalizedText en={block?.allTab?.value} bn={block?.allTab?.valueBN} />
            </TabsTrigger>

            <TabsTrigger
              value="ovc"
              className="text-[13px] md:text-base uppercase text-[#3A3A3A] data-[state=active]:text-[#ED7125]"
            >
              <LocalizedText en={block?.ovcTab?.value} bn={block?.ovcTab?.valueBN} />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Outside Tab Content (so layout stays like your original) */}
        <div className="pt-12 w-full lg:w-[85%] mx-auto">
          {activeTab === 'all' && (
            <AllNewsContainer
              mainImage={block?.mainImage}
              mainImageSrcLink={block?.allTab?.mainImageSrcLink || ''}
              newsItems={block?.allTab?.newsItems || []}
              block={block}
            />
          )}

          {activeTab === 'ovc' && (
            <SupportOVCSection
              backgroundGif={block?.ovcTab?.backgroundGIF}
              backgroundImage={block?.backgroundImage} // ← schema media (outside group)
              videoLink={block?.ovcTab?.videoLink || null} // ← YouTube URL
              title={block?.ovcTab?.title || null}
              titleBN={block?.ovcTab?.titleBN || null}
              highlightedTitle={block?.ovcTab?.highlightedTitle || null}
              highlightedTitleBN={block?.ovcTab?.highlightedTitleBN || null}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default CatchTheBuzzSection
