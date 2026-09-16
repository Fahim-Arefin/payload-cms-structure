import type { Block } from 'payload'

import {
  SERVICE,
  SERVICE_SHOWCASE_BLOCK_LABEL,
  SERVICE_SHOWCASE_BLOCK_THUMBNAIL_URL,
  SERVICE_SHOWCASE_SLUG_AND_TAG,
} from '@/lib/constants'

import { BgColorAndSectionIdField } from '@/utils/block/fields/BgColorAndSectionIdField'
import { SectionHeadingFields } from '@/utils/block/fields/SectionHeading'
import { validateShortText } from '@/utils/block/fields-validation'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* =========================================================
   LIMITS
========================================================= */

const TAG_MAX = 40
const HEADING_MAX = 90

const TAB_LABEL_MAX = 50

const DESCRIPTION_ICON_TITLE_MAX = 40
const DESCRIPTION_ICON_SUBTITLE_MAX = 80

const ITEM_TITLE_MAX = 60
const ITEM_DESCRIPTION_MAX = 180

/* =========================================================
   URL / ANCHOR ID VALIDATION

   Valid:
   website-design
   ecommerce
   business-websites

   Invalid:
   Website Design
   website_design
   website design
========================================================= */

const validateAnchorId = (value: unknown, label: string) => {
  const id = String(value ?? '').trim()

  if (!id) {
    return `${label} is required.`
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
    return `${label} must use lowercase letters, numbers and "-" only. Example: website-design.`
  }

  return true
}

/* =========================================================
   UNIQUE TAB + ITEM ID VALIDATION

   tabId and itemId share one namespace so URL hashes
   always resolve to exactly one location.

   Example:

   #website-design
   -> opens Website Design tab

   #ecommerce-platforms
   -> opens parent Website Design tab
   -> activates E-Commerce Platforms carousel item
========================================================= */

const validateShowcaseIds = (value: unknown) => {
  if (!Array.isArray(value)) {
    return true
  }

  const usedIds = new Set<string>()

  for (const tab of value as any[]) {
    const tabId = String(tab?.tabId ?? '').trim()

    if (tabId) {
      if (usedIds.has(tabId)) {
        return `Duplicate ID "${tabId}". Every service tab and What We Build item must have a unique ID.`
      }

      usedIds.add(tabId)
    }

    const items = Array.isArray(tab?.whatWeBuildItems) ? tab.whatWeBuildItems : []

    for (const item of items) {
      const itemId = String(item?.itemId ?? '').trim()

      if (!itemId) continue

      if (usedIds.has(itemId)) {
        return `Duplicate ID "${itemId}". Every service tab and What We Build item must have a unique ID.`
      }

      usedIds.add(itemId)
    }
  }

  return true
}

/* =========================================================
   COLLABORATIVE METHOD MEDIA
========================================================= */

const collaborativeMainImageFields = generateArrayImageFields({
  required: true,

  fieldName: 'image',

  label: 'Main Image',

  description: 'Upload the collaborative method main image. Recommended ratio 500:360.',

  aspectRatio: 500 / 360,

  quality: 0.9,

  maxKB: 600,

  ownerCollection: SERVICE_SHOWCASE_SLUG_AND_TAG as any,
} as any)

const designerIconFields = generateArrayImageFields({
  required: true,

  fieldName: 'designerIcon',

  label: 'Designer Icon',

  description: 'Upload the designer icon. Recommended transparent PNG/WebP.',

  aspectRatio: 1 / 1,

  quality: 0.9,

  maxKB: 120,

  ownerCollection: SERVICE_SHOWCASE_SLUG_AND_TAG as any,
} as any)

const builderIconFields = generateArrayImageFields({
  required: true,

  fieldName: 'builderIcon',

  label: 'Builder Icon',

  description: 'Upload the builder icon. Recommended transparent PNG/WebP.',

  aspectRatio: 1 / 1,

  quality: 0.9,

  maxKB: 120,

  ownerCollection: SERVICE_SHOWCASE_SLUG_AND_TAG as any,
} as any)

/* =========================================================
   WHAT WE BUILD MEDIA

   Same ratio as standalone What We Build:
   1200 : 340
========================================================= */

const whatWeBuildImageFields = generateArrayImageFields({
  required: true,

  fieldName: 'image',

  label: 'Item Image',

  description: 'Upload the image for this What We Build item. Recommended wide ratio 1200:340.',

  aspectRatio: 1200 / 340,

  quality: 0.9,

  maxKB: 800,

  ownerCollection: SERVICE_SHOWCASE_SLUG_AND_TAG as any,
} as any)

/* =========================================================
   SERVICE SHOWCASE SCHEMA
========================================================= */

const ServiceShowcaseSchema: Block = {
  slug: SERVICE_SHOWCASE_SLUG_AND_TAG,

  labels: {
    singular: SERVICE_SHOWCASE_BLOCK_LABEL,

    plural: SERVICE_SHOWCASE_BLOCK_LABEL,
  },

  admin: {
    group: SERVICE,
  },

  imageURL: SERVICE_SHOWCASE_BLOCK_THUMBNAIL_URL,

  imageAltText: `${SERVICE_SHOWCASE_BLOCK_LABEL} preview`,

  fields: [
    /* =====================================================
       UPLOAD SESSION
    ===================================================== */

    {
      name: 'uploadSessionId',

      type: 'text',

      admin: {
        condition: () => false,
      },
    },

    /* =====================================================
       1. SERVICE SHOWCASE SECTION SETTINGS

       Controls the entire outer block.
    ===================================================== */

    {
      name: 'sectionSettings',

      type: 'group',

      label: 'Service Showcase Section Settings',

      admin: {
        description: 'Background color and section ID for the complete Service Showcase block.',
      },

      fields: [
        BgColorAndSectionIdField({
          defaultBackground: 'white-2',
        }),
      ],
    },

    /* =====================================================
       MAIN SERVICE SHOWCASE HEADING

       Example:

       Engineering Digital Solutions:
       Built Around Your Business
    ===================================================== */

    {
      name: 'sectionHeading',

      type: 'group',

      label: 'Main Section Heading',

      admin: {
        description: 'Main heading displayed above the service tabs.',
      },

      fields: [
        ...SectionHeadingFields({
          tagMax: TAG_MAX,

          heading1Max: HEADING_MAX,
          heading1HighlightMax: HEADING_MAX,

          heading2Max: HEADING_MAX,
          heading2HighlightMax: HEADING_MAX,

          heading3Max: HEADING_MAX,
          heading3HighlightMax: HEADING_MAX,

          noCTA: true,

          includeHeading3: false,
        }),
      ],
    },

    /* =====================================================
       SERVICE SHOWCASE CONTENT
    ===================================================== */

    {
      name: 'serviceShowcase',

      type: 'group',

      label: 'Service Showcase',

      admin: {
        description:
          'Manage the service tabs. Every tab contains its own Collaborative Method and What We Build content.',
      },

      fields: [
        /* =================================================
           SERVICE TABS
        ================================================= */

        {
          name: 'tabs',

          type: 'array',

          label: 'Service Tabs',

          required: true,

          minRows: 1,

          maxRows: 12,

          validate: validateShowcaseIds,

          labels: {
            singular: 'Service Tab',

            plural: 'Service Tabs',
          },

          admin: {
            description:
              'Each tab represents one service category, such as Website Design & Development or Business Management Systems.',
          },

          fields: [
            /* =============================================
               TAB SETTINGS
            ============================================= */

            {
              type: 'row',

              fields: [
                {
                  name: 'tabLabel',

                  type: 'text',

                  label: 'Tab Label',

                  required: true,

                  maxLength: TAB_LABEL_MAX,

                  validate: validateShortText('Tab Label', TAB_LABEL_MAX, true),

                  admin: {
                    width: '50%',

                    description: 'Example: Website Design & Development.',
                  },
                },

                {
                  name: 'tabId',

                  type: 'text',

                  label: 'Tab ID',

                  required: true,

                  validate: (value: unknown) => validateAnchorId(value, 'Tab ID'),

                  admin: {
                    width: '50%',

                    description:
                      'Used by the URL hash to activate this tab. Example: website-design.',
                  },
                },
              ],
            },

            {
              name: 'defaultActive',

              type: 'checkbox',

              label: 'Default Active Tab',

              defaultValue: false,

              admin: {
                description:
                  'Used when the URL does not contain a matching Tab ID or What We Build Item ID.',
              },
            },

            /* =============================================
               COLLABORATIVE METHOD
            ============================================= */

            {
              name: 'collaborativeMethod',

              type: 'group',

              label: 'Collaborative Method',

              admin: {
                description: 'Independent Collaborative Method content for this service tab.',
              },

              fields: [
                /* =========================================
                   2. COLLABORATIVE METHOD
                      SECTION SETTINGS
                ========================================= */

                {
                  name: 'sectionSettings',

                  type: 'group',

                  label: 'Collaborative Method Section Settings',

                  admin: {
                    description:
                      'Background color and section ID for this Collaborative Method section.',
                  },

                  fields: [
                    BgColorAndSectionIdField({
                      defaultBackground: 'white-2',
                    }),
                  ],
                },

                /* =========================================
                   COLLABORATIVE METHOD HEADING

                   Example:

                   Built For Performance.
                   Designed For Growth.
                ========================================= */

                {
                  name: 'sectionHeading',

                  type: 'group',

                  label: 'Collaborative Method Heading',

                  fields: [
                    ...SectionHeadingFields({
                      tagMax: TAG_MAX,

                      heading1Max: HEADING_MAX,

                      heading1HighlightMax: HEADING_MAX,

                      heading2Max: HEADING_MAX,

                      heading2HighlightMax: HEADING_MAX,

                      heading3Max: HEADING_MAX,

                      heading3HighlightMax: HEADING_MAX,

                      noCTA: true,

                      includeHeading3: false,
                    }),
                  ],
                },

                /* =========================================
                   COLLABORATIVE METHOD INFO
                ========================================= */

                {
                  name: 'info',

                  type: 'group',

                  label: 'Collaborative Method Info',

                  admin: {
                    description: 'Manage the image, description, designer and builder information.',
                  },

                  fields: [
                    /* =====================================
                       MAIN IMAGE
                    ===================================== */

                    ...collaborativeMainImageFields,

                    /* =====================================
                       DESCRIPTION
                    ===================================== */

                    {
                      name: 'description',

                      type: 'richText',

                      label: 'Description',

                      required: true,

                      admin: {
                        description:
                          'Collaborative method description displayed beside the main image.',
                      },
                    },

                    /* =====================================
                       DESIGNER
                    ===================================== */

                    {
                      name: 'designer',

                      type: 'group',

                      label: 'Designer',

                      fields: [
                        ...designerIconFields,

                        {
                          name: 'title',

                          type: 'text',

                          label: 'Title',

                          required: true,

                          defaultValue: 'DESIGNER',

                          maxLength: DESCRIPTION_ICON_TITLE_MAX,

                          validate: validateShortText(
                            'Designer Title',

                            DESCRIPTION_ICON_TITLE_MAX,

                            true,
                          ),

                          admin: {
                            description: `Example: DESIGNER. Max ${DESCRIPTION_ICON_TITLE_MAX} characters.`,
                          },
                        },

                        {
                          name: 'subtitle',

                          type: 'text',

                          label: 'Subtitle',

                          required: true,

                          defaultValue: 'Visual Storytelling',

                          maxLength: DESCRIPTION_ICON_SUBTITLE_MAX,

                          validate: validateShortText(
                            'Designer Subtitle',

                            DESCRIPTION_ICON_SUBTITLE_MAX,

                            true,
                          ),

                          admin: {
                            description: `Example: Visual Storytelling. Max ${DESCRIPTION_ICON_SUBTITLE_MAX} characters.`,
                          },
                        },
                      ],
                    },

                    /* =====================================
                       BUILDER
                    ===================================== */

                    {
                      name: 'builder',

                      type: 'group',

                      label: 'Builder',

                      fields: [
                        ...builderIconFields,

                        {
                          name: 'title',

                          type: 'text',

                          label: 'Title',

                          required: true,

                          defaultValue: 'BUILDER',

                          maxLength: DESCRIPTION_ICON_TITLE_MAX,

                          validate: validateShortText(
                            'Builder Title',

                            DESCRIPTION_ICON_TITLE_MAX,

                            true,
                          ),

                          admin: {
                            description: `Example: BUILDER. Max ${DESCRIPTION_ICON_TITLE_MAX} characters.`,
                          },
                        },

                        {
                          name: 'subtitle',

                          type: 'text',

                          label: 'Subtitle',

                          required: true,

                          defaultValue: 'Rapid Prototyping',

                          maxLength: DESCRIPTION_ICON_SUBTITLE_MAX,

                          validate: validateShortText(
                            'Builder Subtitle',

                            DESCRIPTION_ICON_SUBTITLE_MAX,

                            true,
                          ),

                          admin: {
                            description: `Example: Rapid Prototyping. Max ${DESCRIPTION_ICON_SUBTITLE_MAX} characters.`,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },

            /* =============================================
               WHAT WE BUILD
            ============================================= */

            {
              name: 'whatWeBuild',

              type: 'group',

              label: 'What We Build',

              admin: {
                description: 'Independent What We Build content for this service tab.',
              },

              fields: [
                /* =========================================
                   3. WHAT WE BUILD SECTION SETTINGS
                ========================================= */

                {
                  name: 'sectionSettings',

                  type: 'group',

                  label: 'What We Build Section Settings',

                  admin: {
                    description: 'Background color and section ID for this What We Build section.',
                  },

                  fields: [
                    BgColorAndSectionIdField({
                      defaultBackground: 'secondary-1',
                    }),
                  ],
                },

                /* =========================================
                   WHAT WE BUILD HEADING

                   Example:

                   Tailored Solutions
                   For Every Business
                ========================================= */

                {
                  name: 'sectionHeading',

                  type: 'group',

                  label: 'What We Build Heading',

                  fields: [
                    ...SectionHeadingFields({
                      tagMax: TAG_MAX,

                      heading1Max: HEADING_MAX,

                      heading1HighlightMax: HEADING_MAX,

                      heading2Max: HEADING_MAX,

                      heading2HighlightMax: HEADING_MAX,

                      heading3Max: HEADING_MAX,

                      heading3HighlightMax: HEADING_MAX,

                      noCTA: true,

                      includeHeading3: false,
                    }),
                  ],
                },
              ],
            },

            /* =============================================
               WHAT WE BUILD ITEMS

               This stays directly under the tab so the
               current media lifecycle can track:

               serviceShowcase
                 -> tabs[]
                   -> whatWeBuildItems[]
                     -> image
            ============================================= */

            {
              name: 'whatWeBuildItems',

              type: 'array',

              label: 'What We Build Items',

              required: true,

              minRows: 1,

              maxRows: 12,

              labels: {
                singular: 'What We Build Item',

                plural: 'What We Build Items',
              },

              admin: {
                description:
                  'Carousel/service items belonging to this service tab. Every item can be targeted directly from the URL.',
              },

              fields: [
                /* =========================================
                   ITEM URL ID
                ========================================= */

                {
                  name: 'itemId',

                  type: 'text',

                  label: 'Item ID',

                  required: true,

                  validate: (value: unknown) => validateAnchorId(value, 'Item ID'),

                  admin: {
                    description:
                      'URL hash that activates this item and automatically opens its parent tab. Example: ecommerce-platforms.',
                  },
                },

                /* =========================================
                   DEFAULT ACTIVE ITEM
                ========================================= */

                {
                  name: 'defaultActive',

                  type: 'checkbox',

                  label: 'Default Active Item',

                  defaultValue: false,

                  admin: {
                    description:
                      'Used when the parent tab opens without a matching What We Build Item ID.',
                  },
                },

                /* =========================================
                   TITLE
                ========================================= */

                {
                  name: 'title',

                  type: 'text',

                  label: 'Title',

                  required: true,

                  maxLength: ITEM_TITLE_MAX,

                  validate: validateShortText(
                    'Item Title',

                    ITEM_TITLE_MAX,

                    true,
                  ),

                  admin: {
                    description: `Example: E-Commerce Platforms. Max ${ITEM_TITLE_MAX} characters.`,
                  },
                },

                /* =========================================
                   DESCRIPTION
                ========================================= */

                {
                  name: 'description',

                  type: 'textarea',

                  label: 'Description',

                  required: true,

                  maxLength: ITEM_DESCRIPTION_MAX,

                  validate: validateShortText(
                    'Item Description',

                    ITEM_DESCRIPTION_MAX,

                    true,
                  ),

                  admin: {
                    description: `Short description for this service item. Max ${ITEM_DESCRIPTION_MAX} characters.`,
                  },
                },

                /* =========================================
                   IMAGE
                ========================================= */

                ...whatWeBuildImageFields,
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default ServiceShowcaseSchema
