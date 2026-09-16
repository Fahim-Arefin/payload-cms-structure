import TabSectionHeading from '@/components/custom/sagar-ropes-shared/others/TabSectionHeading'
import { ServiceShowcaseBlockType } from '@/types/payloadCustomTypes'
import ServiceWhatWeBuildCarousel from './ServiceWhatWeBuildCarousel'
type ServiceTab = NonNullable<
  NonNullable<ServiceShowcaseBlockType['serviceShowcase']>['tabs']
>[number]

type Props = {
  tab: ServiceTab
  activeItemIndex: number

  onActiveItemChange: (index: number) => void

  onItemSelect: (index: number) => void
}

function ServiceWhatWeBuild({ tab, activeItemIndex, onActiveItemChange, onItemSelect }: Props) {
  const section = tab?.whatWeBuild

  const items = tab?.whatWeBuildItems?.filter(Boolean) ?? []

  if (!section || !items.length) {
    return null
  }

  return (
    <div
      className="
        container-padding

        space-y-[22px]

        md:space-y-[30px]

        lg:space-y-[40px]

        xl:space-y-[52px]

        2xl:space-y-[60px]
      "
    >
      {/* =================================================
          DARK HEADING
      ================================================= */}

      {/* <div
        className="
          [&_h1]:!text-[28px]
          [&_h2]:!text-[28px]
          [&_h3]:!text-[28px]
          [&_.global-h2]:!text-[28px]

          md:[&_h1]:!text-[34px]
          md:[&_h2]:!text-[34px]
          md:[&_h3]:!text-[34px]
          md:[&_.global-h2]:!text-[34px]

          lg:[&_h1]:!text-[40px]
          lg:[&_h2]:!text-[40px]
          lg:[&_h3]:!text-[40px]
          lg:[&_.global-h2]:!text-[40px]

          xl:[&_h1]:!text-[46px]
          xl:[&_h2]:!text-[46px]
          xl:[&_h3]:!text-[46px]
          xl:[&_.global-h2]:!text-[46px]

          2xl:[&_h1]:!text-[52px]
          2xl:[&_h2]:!text-[52px]
          2xl:[&_h3]:!text-[52px]
          2xl:[&_.global-h2]:!text-[52px]
        "
      >
        <SectionHeading01 data={section?.sectionHeading} align="middle" dark />
      </div> */}
      <TabSectionHeading data={section?.sectionHeading} align="middle" dark />

      <ServiceWhatWeBuildCarousel
        items={items}
        activeIndex={activeItemIndex}
        onActiveIndexChange={onActiveItemChange}
        onItemSelect={onItemSelect}
      />
    </div>
  )
}

export default ServiceWhatWeBuild
