import LocalizedRichText from '@/components/custom/shared/LocalizedRichText'
import { ServiceShowcaseBlockType } from '@/types/payloadCustomTypes'
import Image from 'next/image'

import TabSectionHeading from '@/components/custom/sagar-ropes-shared/others/TabSectionHeading'
import Line from 'public/assets/images/Line.png'
import arrowRight from 'public/assets/images/arrowRight.png'

type ServiceTab = NonNullable<
  NonNullable<ServiceShowcaseBlockType['serviceShowcase']>['tabs']
>[number]

type Props = {
  tab: ServiceTab
}

function ServiceCollaborativeMethod({ tab }: Props) {
  const method = tab?.collaborativeMethod

  const info = method?.info

  if (!method || !info) return null

  return (
    <div
      className="
        container-padding

        space-y-[22px]

        md:space-y-[28px]

        lg:space-y-[36px]

        xl:space-y-[48px]

        2xl:space-y-[56px]
      "
    >
      {/* =================================================
          COLLABORATIVE HEADING

          Slightly smaller than the main block heading.
      ================================================= */}

      {/* <div
        className="
          [&_h1]:!text-[27px]
          [&_h2]:!text-[27px]
          [&_h3]:!text-[27px]
          [&_.global-h2]:!text-[27px]

          md:[&_h1]:!text-[32px]
          md:[&_h2]:!text-[32px]
          md:[&_h3]:!text-[32px]
          md:[&_.global-h2]:!text-[32px]

          lg:[&_h1]:!text-[36px]
          lg:[&_h2]:!text-[36px]
          lg:[&_h3]:!text-[36px]
          lg:[&_.global-h2]:!text-[36px]

          xl:[&_h1]:!text-[42px]
          xl:[&_h2]:!text-[42px]
          xl:[&_h3]:!text-[42px]
          xl:[&_.global-h2]:!text-[42px]

          2xl:[&_h1]:!text-[46px]
          2xl:[&_h2]:!text-[46px]
          2xl:[&_h3]:!text-[46px]
          2xl:[&_.global-h2]:!text-[46px]
        "
      >
        <SectionHeading01 data={method?.sectionHeading} align="middle" />
      </div> */}

      <TabSectionHeading data={method?.sectionHeading} align="middle" />

      {/* =================================================
          CONTENT GRID
      ================================================= */}

      <div
        className="
          grid
          grid-cols-1

          gap-[30px]

          md:grid-cols-2
          md:gap-[28px]

          lg:gap-[50px]

          xl:gap-[90px]

          2xl:gap-[120px]
        "
      >
        {/* =================================================
            LEFT
        ================================================= */}

        <div
          className="
            flex
            flex-col

            items-center
            justify-center

            space-y-4

            md:space-y-5

            lg:space-y-6

            xl:space-y-8

            2xl:space-y-10
          "
        >
          {/* description */}

          {info?.description && (
            <div
              className="
                font-grift
                global-p4

                text-secondary-1/80
              "
            >
              <LocalizedRichText bn={info.description} en={info.description} />
            </div>
          )}

          {/* horizontal line */}

          <div
            className="
              relative

              aspect-[660/1]

              w-full
            "
          >
            <Image
              fill
              src={Line}
              alt=""
              sizes="100vw"
              quality={100}
              className="
                h-full
                w-full
              "
              placeholder="blur"
              blurDataURL={Line?.blurDataURL}
            />
          </div>

          {/* designer -> builder */}

          <div
            className="
              flex
              w-full

              items-center
              justify-around
            "
          >
            {/* designer */}

            <div
              className="
                flex
                flex-col

                items-center
                justify-center

                gap-1

                xl:gap-2
              "
            >
              <div
                className="
                  relative

                  aspect-square

                  w-[17px]

                  lg:w-[20px]

                  xl:w-[25px]

                  2xl:w-[28px]
                "
              >
                {typeof info?.designer?.designerIcon === 'object' &&
                  info?.designer?.designerIcon?.url && (
                    <Image
                      fill
                      src={info.designer.designerIcon.url}
                      alt={info?.designer?.title || 'Designer icon'}
                      className="
                        object-contain
                        object-center
                      "
                      quality={100}
                      placeholder={info?.designer?.designerIconBlurDataURL ? 'blur' : 'empty'}
                      blurDataURL={info?.designer?.designerIconBlurDataURL || undefined}
                    />
                  )}
              </div>

              <div
                className="
                  font-grift
                  global-p4
                  font-semibold

                  text-primary-1
                "
              >
                {info?.designer?.title}
              </div>

              <div
                className="
                  text-center

                  font-grift
                  global-p5

                  text-secondary-1
                "
              >
                {info?.designer?.subtitle}
              </div>
            </div>

            {/* arrow */}

            <div
              className="
                relative

                aspect-[93/58]

                w-[16px]

                xl:w-[20px]

                2xl:w-[25px]
              "
            >
              <Image
                src={arrowRight}
                alt=""
                fill
                quality={100}
                className="
                  h-full
                  w-full
                  object-contain
                "
                placeholder="blur"
                blurDataURL={arrowRight?.blurDataURL}
              />
            </div>

            {/* builder */}

            <div
              className="
                flex
                flex-col

                items-center
                justify-center

                gap-1

                xl:gap-2
              "
            >
              <div
                className="
                  relative

                  aspect-square

                  w-[17px]

                  lg:w-[20px]

                  xl:w-[25px]

                  2xl:w-[28px]
                "
              >
                {typeof info?.builder?.builderIcon === 'object' &&
                  info?.builder?.builderIcon?.url && (
                    <Image
                      fill
                      src={info.builder.builderIcon.url}
                      alt={info?.builder?.title || 'Builder icon'}
                      className="
                        object-contain
                        object-center
                      "
                      quality={100}
                      placeholder={info?.builder?.builderIconBlurDataURL ? 'blur' : 'empty'}
                      blurDataURL={info?.builder?.builderIconBlurDataURL || undefined}
                    />
                  )}
              </div>

              <div
                className="
                  font-grift
                  global-p4
                  font-semibold

                  text-primary-1
                "
              >
                {info?.builder?.title}
              </div>

              <div
                className="
                  text-center

                  font-grift
                  global-p5

                  text-[#191C1D]
                "
              >
                {info?.builder?.subtitle}
              </div>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT IMAGE
        ================================================= */}

        <div
          className="
            ml-3

            flex
            flex-col

            items-center
            justify-center

            md:ml-0
          "
        >
          <div
            className="
              relative

              aspect-[500/360]

              w-full

              rounded-sm

              lg:rounded-[6px]

              xl:rounded-[8px]
            "
          >
            {typeof info?.image === 'object' && info?.image?.url && (
              <Image
                fill
                src={info.image.url}
                alt={'Collaborative method'}
                className="
                    z-10

                    rounded-sm

                    object-contain
                    object-center

                    lg:rounded-[6px]

                    xl:rounded-[8px]
                  "
                quality={100}
                placeholder={info?.imageBlurDataURL ? 'blur' : 'empty'}
                blurDataURL={info?.imageBlurDataURL || undefined}
              />
            )}

            {/* offset cyan block */}

            <div
              className="
                absolute
                inset-0

                -left-3
                top-3

                z-0

                aspect-[500/360]

                w-full

                rounded-sm

                bg-primary-2

                md:-left-4
                md:top-4

                lg:-left-6
                lg:top-6
                lg:rounded-[6px]

                xl:-left-10
                xl:top-10
                xl:rounded-[8px]
              "
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ServiceCollaborativeMethod
