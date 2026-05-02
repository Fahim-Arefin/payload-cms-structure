import IntroSectionDesign04 from '@/components/custom/sagar-ropes-shared/others/IntroSectionDesign04'
import WithHashScroller from '@/components/custom/sagar-ropes-shared/others/WithHashScroller'
import { QualityBenchmarkCardBlockType } from '@/types/payloadCustomTypes'
import MissionVisionCard from '../MissionVision/components/MissionVisionCard'

type Props = {
  block: QualityBenchmarkCardBlockType
  params: Record<string, string>
}

function QualityBenchmarkCardBlock({ block }: Props) {
  return (
    <WithHashScroller id={block?.sectionId} bgColor={block?.backgroundColor}>
      <div className="container-padding">
        <IntroSectionDesign04 block={block} position="center" />
        <div
          className="mt-4 lg:mt-6 xl:mt-8 2xl:mt-10
          grid grid-cols-1 md:grid-cols-2
          gap-4 lg:gap-6 xl:gap-8 2xl:gap-10 "
        >
          {block?.benchmarks?.map((benchmark, index) => (
            // hover:h-[110%] md:hover:h-[150px] lg:hover:h-[180px] xl:hover:h-[250px]  2xl:hover:h-[270px]
            <MissionVisionCard
              key={index}
              label={benchmark.title}
              desc={benchmark.description}
              className="
              border-2 border-dashed border-cyan bg-white-2 hover:bg-cyan
              h-fit md:h-[110px] lg:h-[130px] xl:h-[200px] 2xl:h-[230px]
              overflow-hidden hover:overflow-y-auto overflow-x-hidden"
            />
          ))}
        </div>
      </div>
    </WithHashScroller>
  )
}

export default QualityBenchmarkCardBlock
