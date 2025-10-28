import { PlanData } from '@/types'
import CirclePieChart from './CirclePieChart'
import EligibilityPlans from './EligibilityPlans'
import Image from 'next/image'
import LocalizedHighlighted from '../shared/LocalizedHighlighted'
import LocalizedText from '../shared/LocalizedText'
import { MultistagePlanBlockType } from '@/types/payloadCustomTypes'

type Props = { data: MultistagePlanBlockType; bgColor?: string }

const MultiPlansSection = ({ data, bgColor }: Props) => {
  return (
    <div className={`container-padding ${bgColor ? `bg-[${bgColor}]` : 'bg-white'}`}>
      <div className="flex flex-col gap-4 items-start">
        <h3 className="global-h3 font-semibold uppercase">
          <LocalizedHighlighted
            textEn={data?.title || ''}
            textBn={data?.titleBN || ''}
            highlightEn={data?.highlightedTitle || ''}
            highlightBn={data?.highlightedTitleBN || ''}
            highlightClassName="text-[#ED7125] font-semibold"
          />
        </h3>
        <p className="global-p1 w-full lg:w-[70%] xl:w-[60%] 2xl:w-[50%]">
          <LocalizedText
            en={data?.description || ''}
            bn={data?.descriptionBN || ''}
          />
        </p>
      </div>
      {/* Chart section */}
      <div className="mt-6 lg:mt-10">
        <div className="flex flex-col gap-2 lg:gap-4 items-center md:items-start">
          <h4 className="global-h3 md:global-h4 uppercase font-normal md:font-semibold">
            <LocalizedText
              en={data?.mainTitle || 'Payout Milestones'}
              bn={data?.mainTitleBN || 'অর্থ প্রাপ্তির ধাপসমূহ'}
            />
          </h4>
          <div className="h-[1px] w-full bg-[#7D7D7D] mb-0 lg:mb-4" />

          {/*
      Grid + dynamic ordering:
      - Mobile: stack (chart first).
      - md+: 2 columns; if chartSide === 'right', chart goes right.
    */}
          {(() => {
            const chartOnRight = (data as any)?.chartSide === 'right'
            return (
              <div className="w-full grid grid-cols-2 gap-4 md:gap-0 items-center justify-center">
                {/* Chart column */}
                <div
                  className={`${chartOnRight ? 'md:order-2' : 'md:order-1'} flex items-center justify-center h-[300px]`}
                >
                  <CirclePieChart data={data?.stageData} />
                </div>

                {/* Labels + dotted line column */}
                <div
                  className={`order-2 ${chartOnRight ? 'md:order-1' : 'md:order-2'} flex justify-center`}
                >
                  {/* When chart is on RIGHT, put the dotted line AFTER the stage names by reversing the row */}
                  <div
                    className={`flex items-center gap-2 md:gap-4 ${chartOnRight ? 'md:flex-row-reverse' : 'flex-row'}`}
                  >
                    {/* Dotted line image */}
                    <img
                      src="/assets/line.png"
                      alt="connector"
                      className="h-[180px] select-none"
                      draggable={false}
                    />

                    {/* Stage labels from schema (no static text) */}
                    <div className="flex flex-col items-start gap-4 text-[10px] md:global-p2">
                      {data?.stageData?.map((stg: any, i: number) => (
                        <span key={i} className="line-clamp-2">
                          <LocalizedText en={stg?.name} bn={stg?.nameBN} />
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>
      </div>

      {/* multistage timeline */}
      <div className="flex flex-col gap-2 lg:gap-4 items-center lg:items-start">
        <h4 className="global-h3 md:global-h4 uppercase font-normal md:font-semibold">
          <LocalizedText en={data?.secondaryTitle} bn={data?.secondaryTitleBN} />
        </h4>
        <div className="h-[1px] w-full bg-[#7D7D7D] mb-2 lg:mb-4" />

        <div className="w-full">
          {/* connecting dotted line image */}

          <div className="flex w-fit mx-auto gap-4 md:gap-4 lg:gap-[60px] relative">
            <div className="absolute inset-0 hidden md:block top-[20px] w-[88%] lg:w-[90%] md:left-[6%] lg:left-[4%]">
              <img
                src="/assets/lineStraight.svg"
                alt="timeline connector"
                className="w-full h-auto"
              />
            </div>

            {data?.planData?.map((item: any, idx: number) => (
              <div key={idx} className="flex flex-col items-center space-y-2 relative z-10">
                {typeof data?.planIcon === 'object' && data?.planIcon?.url && (
                  <>
                    <div className="relative w-[40px] md:w-[50px] aspect-[1/1]">
                      <Image
                        src={data?.planIcon?.url}
                        alt={`term-${item.timeline}`}
                        fill
                        sizes="( max-width: 767px) 40px, (max-width: 1349px) 50px, 60px"
                        // className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]"
                      />
                    </div>
                  </>
                )}
                <p className="text-[8px] md:text-sm text-center font-regular text-[#434343]">
                  <LocalizedText en={item?.timeline} bn={item?.timelineBN} />
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* finishing touch */}
      <div>
        <EligibilityPlans data={data}/>
      </div>
    </div>
  )
}

export default MultiPlansSection
