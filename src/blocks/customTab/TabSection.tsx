'use client'
import LocalizedText from '@/components/custom/shared/LocalizedText'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DESCRIPTIVE_CONTENT_SLUG_AND_TAG, STEP_CONTENT_SLUG_AND_TAG } from '@/lib/constants'
import { CustomTabBlockType } from '@/types/payloadCustomTypes'
import { useMemo, useState } from 'react'
import DescriptiveContentBlock from './descriptiveContent/DescriptiveContentBlock'
import StepContentBlock from './stepContent/StepContentBlock'

type Props = {
  block: CustomTabBlockType
}
function ArrowIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
      <path
        d="M4.76388 3.90426L16.4372 10.4709C16.5013 10.5073 16.5547 10.56 16.5918 10.6236C16.6289 10.6873 16.6484 10.7597 16.6484 10.8334C16.6484 10.9071 16.6289 10.9795 16.5918 11.0432C16.5547 11.1069 16.5013 11.1596 16.4372 11.1959L4.76388 17.7626C4.68904 17.8044 4.60314 17.822 4.51789 17.8132C4.43265 17.8044 4.35219 17.7695 4.2875 17.7133C4.22281 17.657 4.17703 17.5822 4.1564 17.4991C4.13577 17.4159 4.14129 17.3284 4.17221 17.2484L6.60721 10.9843C6.64489 10.8872 6.64489 10.7796 6.60721 10.6826L4.17138 4.41843C4.14028 4.33839 4.13466 4.25071 4.15529 4.16736C4.17593 4.08401 4.22181 4.00908 4.28666 3.9528C4.35151 3.89653 4.43216 3.86166 4.51758 3.85297C4.603 3.84428 4.68902 3.86219 4.76388 3.90426Z"
        fill="white"
        stroke="#3A3A3A"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function TabSection({ block }: Props) {
  const tabs = block?.tabs
  const defaultValue = useMemo(() => tabs[0]?.value ?? 'tab1', [tabs])
  const [active, setActive] = useState(defaultValue)
  return (
    <div>
      {/* Tabs */}
      <Tabs defaultValue={defaultValue} value={active} onValueChange={setActive}>
        <div className="relative w-full border-b border-[#434343] md:py-3 bg-white md:mb-10">
          <TabsList className="w-full flex overflow-x-auto bg-transparent border-none p-0 gap-6">
            {tabs.map((t) => (
              <TabsTrigger
                key={t.value}
                value={t.value}
                className={`global-p1 font-semibold px-2 py-2.5 md:py-6 relative uppercase
                ${
                  active === t.value
                    ? 'text-[#434343] after:absolute after:inset-x-0 after:bottom-0 after:h-[6px] after:bg-orange-500 after:rounded-full'
                    : 'text-[#434343]'
                }`}
              >
                <span className={`${active === t.value ? 'text-[#ED7125]' : 'text-[#434343]'}`}>
                  <LocalizedText en={t.label} bn={t.labelBN} />
                </span>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* arrows between tabs (desktop) */}
          {tabs.length > 1 &&
            tabs.slice(1).map((_, i) => {
              const percent = ((i + 1) / tabs.length) * 100
              return (
                <div
                  key={`arrow-${i}`}
                  className="hidden md:block absolute -bottom-2.5 z-10"
                  style={{ left: `${percent}%`, transform: 'translateX(-150%)' }}
                >
                  <ArrowIcon />
                </div>
              )
            })}
        </div>

        {/* Content: dispatch on the single block inside each tab */}
        {tabs.map((t) => {
          const single = t.content?.[0]
          return (
            <TabsContent key={t.value} value={t.value}>
              {single?.blockType === DESCRIPTIVE_CONTENT_SLUG_AND_TAG && (
                <DescriptiveContentBlock data={single} />
              )}

              {single?.blockType === STEP_CONTENT_SLUG_AND_TAG && (
                <StepContentBlock data={single} />
              )}
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}

export default TabSection
