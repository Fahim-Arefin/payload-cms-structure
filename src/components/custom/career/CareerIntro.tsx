'use client'

import React, { FC } from 'react'
import { RichText } from '@payloadcms/richtext-lexical/react'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import { CareerPageIntroBlockType } from '@/types/payloadCustomTypes'
import { useLanguage } from '@/context/LanguageContext'
import useMounted from '@/hooks/useMounted'

type CareerIntroProps = {
    data: CareerPageIntroBlockType
}

const CareerIntro: FC<CareerIntroProps> = ({ data }) => {
    const { language } = useLanguage()
    const mounted = useMounted()

    // Pick EN/BN richtext based on language (fallbacks included)
    const richTextData = !mounted
        ? (data?.description ?? data?.descriptionBN ?? null)
        : language === 'en'
          ? (data?.description ?? data?.descriptionBN ?? null)
          : (data?.descriptionBN ?? data?.description ?? null)

    return (
        <div className="container-padding bg-white">
            <div className="flex flex-col gap-4 lg:gap-10 xl:gap-16">
                <h1 className="global-h1 font-normal md:font-semibold text-[#ED7125] md:text-[#434343]">
                    <LocalizedHighlighted
                        textEn={data?.title}
                        highlightEn={data?.highlightedTitle}
                        textBn={data?.titleBN}
                        highlightBn={data?.highlightedTitleBN}
                        highlightClassName="text-[#ED7125]"
                    />
                </h1>

                {richTextData && (
                    <div className="rt text-[12px] md:text-[16px] lg:text-[20px] xl:text-[24px] 2xl:text-[28px] text-[#3A3A3A]">
                        <RichText data={richTextData} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default CareerIntro
