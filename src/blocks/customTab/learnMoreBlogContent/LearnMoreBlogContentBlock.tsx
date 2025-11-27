'use client'

import GlobalButton from '@/components/custom/shared/GlobalButton'
import LocalizedHighlighted from '@/components/custom/shared/LocalizedHighlighted'
import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import LocalizedString from '@/components/custom/shared/LocalizedString'
import { LearnMoreBlogContentBlockType } from '@/types/payloadCustomTypes'
import { useState } from 'react'
import BlogItem from './BlogItem'

type Props = {
  data: LearnMoreBlogContentBlockType
}

const SLICE_PART = 4

function LearnMoreBlogContentBlock({ data }: Props) {
  // track which groups are expanded (show all blogs)
  const [expandedGroups, setExpandedGroups] = useState<Record<number, boolean>>({})

  const groups = data?.groups ?? []
  if (!groups.length) return null

  const handleToggle = (groupIndex: number) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupIndex]: !prev[groupIndex],
    }))
  }

  return (
    <div className="">
      {groups.map((group, groupIndex) => {
        const blogs = group?.blogs ?? []
        if (!blogs.length) return null

        const isExpanded = !!expandedGroups[groupIndex]
        const hasMoreThanSlice = blogs.length > SLICE_PART

        const blogsToShow = isExpanded ? blogs : blogs.slice(0, SLICE_PART)

        // button label: use CMS text when collapsed, generic "Show Less" when expanded
        const btnLabelEn = isExpanded ? group?.loadLessText : group?.loadMoreText
        const btnLabelBn = isExpanded ? group?.loadLessTextBN : group?.loadMoreTextBN

        return (
          <div
            key={groupIndex}
            className="text-[#434343] text-start space-y-6 md:space-y-12 lg:space-y-12 xl:space-y-20 container-padding-x py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16"
            style={{
              backgroundColor: group?.backgroundColor || '',
            }}
          >
            {/* heading */}
            <div className={`${groupIndex % 2 === 0 ? 'text-start' : 'text-end'}`}>
              <div className="uppercase global-h3 font-medium">
                <div>
                  <LocalizedHighlighted
                    textEn={group?.title}
                    highlightEn={group?.highlightedTitle}
                    textBn={group?.titleBN}
                    highlightBn={group?.highlightedTitleBN}
                  />
                </div>
                {(group?.subtitle || group?.subtitleBN) && (
                  <div>
                    <LocalizedHighlighted
                      textEn={group?.subtitle}
                      highlightEn={group?.highlightedSubtitle}
                      textBn={group?.subtitleBN}
                      highlightBn={group?.highlightedSubtitleBN}
                    />
                  </div>
                )}
              </div>

              {(group?.description || group?.descriptionBN) && (
                <div
                  className={`global-p1 text-[#3A3A3A] font-[350] ${
                    (group?.title || group?.titleBN) && (group?.subtitle || group?.subtitleBN)
                      ? 'mt-2 md:mt-4 xl:mt-6 2xl:mt-8'
                      : ''
                  }`}
                >
                  <LocalizedRichText en={group?.description} bn={group?.descriptionBN} />
                </div>
              )}
            </div>

            {/* content section */}
            {blogsToShow.map((blog, index) => (
              <BlogItem key={index} blog={blog} index={index} bg={group?.backgroundColor || ''} />
            ))}

            {/* toggle load more / load less */}
            {hasMoreThanSlice && (
              <div className="flex justify-center">
                <GlobalButton
                  onClick={() => handleToggle(groupIndex)}
                  variant={
                    (group?.style as
                      | 'link'
                      | 'primary'
                      | 'glass'
                      | 'default'
                      | 'destructive'
                      | 'outline'
                      | 'secondary') ?? 'outline'
                  }
                  size="small"
                  className={`${group?.style === 'outline' && 'bg-[#FCF4EB]'}`}
                >
                  <LocalizedString en={btnLabelEn} bn={btnLabelBn} />
                </GlobalButton>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default LearnMoreBlogContentBlock
