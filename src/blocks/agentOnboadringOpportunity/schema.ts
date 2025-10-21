// // collection config
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

// import {
//   AGENT_ONBOARDING_PAGE_ADMIN_GROUP,
//   AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { bnNum } from '@/lib/utils'
// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 60
// const SUBTITLE_MAX = 60
// const CARD_TEXT_MAX = 40
// const LEFT_ITEM_TEXT_MAX = 60
// const NAME_MAX = 60
// const QUOTE_MAX = 240

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /* ---------------- collection ---------------- */
// const AgentOnboardingOpportunity: CollectionConfig = {
//   slug: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,

//   admin: {
//     group: AGENT_ONBOARDING_PAGE_ADMIN_GROUP,
//     defaultColumns: ['updatedAt'],
//     description:
//       'Agent Onboarding → Opportunity & Expectations: one section header (EN/BN), audience cards (mobile only), and expectations (left bullets + right avatar).',
//   },

//   access: createSingleDocAccess(AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG),

//   fields: [
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     /* ---------------- Section Header ---------------- */
//     {
//       name: 'section',
//       type: 'group',
//       label: 'Section Header',
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               maxLength: TITLE_MAX,
//               label: 'Title',
//               validate: validateShortText('Title', TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Primary heading. Max ${TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               maxLength: TITLE_MAX,
//               label: 'শিরোনাম (বাংলা)',
//               validate: validateShortText('Title (BN)', TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'subTitle',
//               type: 'text',
//               required: true,
//               maxLength: SUBTITLE_MAX,
//               label: 'Subtitle',
//               validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Second line under the title. Max ${SUBTITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'subTitleBN',
//               type: 'text',
//               required: true,
//               maxLength: SUBTITLE_MAX,
//               label: 'উপশিরোনাম (বাংলা)',
//               validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `শিরোনামের নিচের লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//       ],
//     },

//     /* ---------------- Audience Cards ---------------- */
//     {
//       name: 'audienceCards',
//       type: 'array',
//       required: true,
//       minRows: 1,
//       maxRows: 6,
//       label: 'Audience Cards (Mobile only)',
//       labels: { singular: 'Audience Card', plural: 'Audience Cards' },
//       admin: {
//         description:
//           'These cards are shown on mobile only. Each item has one image and a short line (EN/BN).',
//       },
//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Audience Image',
//           description: 'Square visual (1:1 recommended). Optimized with blur placeholder.',
//           aspectRatio: 1,
//           quality: 0.95,
//           maxKB: 200,
//           ownerCollection: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG as any,
//           required: true,
//         } as any),
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'text',
//               type: 'text',
//               required: true,
//               maxLength: CARD_TEXT_MAX,
//               label: 'Text',
//               validate: validateShortText('Text', CARD_TEXT_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Short label (e.g., “Fresh Graduates”). Max ${CARD_TEXT_MAX} characters.`,
//               },
//             },
//             {
//               name: 'textBN',
//               type: 'text',
//               required: true,
//               maxLength: CARD_TEXT_MAX,
//               label: 'টেক্সট (বাংলা)',
//               validate: validateShortText('Text (BN)', CARD_TEXT_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `সংক্ষিপ্ত লেবেল। সর্বোচ্চ ${bnNum(CARD_TEXT_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//       ],
//     },

//     /* ---------------- Expectations ---------------- */
//     {
//       name: 'expectations',
//       type: 'group',
//       label: 'Expectations',
//       fields: [
//         // Left bullets
//         {
//           name: 'left',
//           type: 'array',
//           required: true,
//           minRows: 4,
//           maxRows: 12,
//           label: 'Left Bullets',
//           labels: { singular: 'Bullet', plural: 'Bullets' },
//           admin: { description: 'Bullets with icon + EN/BN short text.' },
//           fields: [
//             ...generateArrayImageFields({
//               fieldName: 'icon',
//               label: 'Icon',
//               description: 'Square icon (1:1). PNG with transparent background preferred.',
//               aspectRatio: 1,
//               quality: 0.95,
//               maxKB: 100,
//               ownerCollection:
//                 AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG as any,
//               required: true,
//             } as any),
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'text',
//                   type: 'text',
//                   required: true,
//                   maxLength: LEFT_ITEM_TEXT_MAX,
//                   label: 'Text',
//                   validate: validateShortText('Text', LEFT_ITEM_TEXT_MAX, true),
//                   admin: {
//                     width: '50%',
//                     description: `Short line. Max ${LEFT_ITEM_TEXT_MAX} characters.`,
//                   },
//                 },
//                 {
//                   name: 'textBN',
//                   type: 'text',
//                   required: true,
//                   maxLength: LEFT_ITEM_TEXT_MAX,
//                   label: 'টেক্সট (বাংলা)',
//                   validate: validateShortText('Text (BN)', LEFT_ITEM_TEXT_MAX, true),
//                   admin: {
//                     width: '50%',
//                     description: `সংক্ষিপ্ত লাইন। সর্বোচ্চ ${bnNum(LEFT_ITEM_TEXT_MAX)} অক্ষর।`,
//                   },
//                 },
//               ],
//             },
//           ],
//         },

//         // Right card (array with min=1, max=1)
//         {
//           name: 'right',
//           type: 'array',
//           required: true,
//           minRows: 1,
//           maxRows: 1,
//           label: 'Right Card (Avatar + Quote)',
//           labels: { singular: 'Right Card', plural: 'Right Card' },
//           admin: { description: 'Single agent testimonial: avatar + EN/BN name + EN/BN quote.' },
//           fields: [
//             ...generateArrayImageFields({
//               fieldName: 'avatar',
//               label: 'Avatar',
//               description: 'Agent photo (prefer 1:1 portrait). Optimized with blur placeholder.',
//               aspectRatio: 1,
//               quality: 0.95,
//               maxKB: 200,
//               ownerCollection:
//                 AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG as any,
//               required: true,
//             } as any),
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'name',
//                   type: 'text',
//                   required: true,
//                   maxLength: NAME_MAX,
//                   label: 'Name',
//                   validate: validateShortText('Name', NAME_MAX, true),
//                   admin: {
//                     width: '50%',
//                     description: `Agent’s name. Max ${NAME_MAX} characters.`,
//                   },
//                 },
//                 {
//                   name: 'nameBN',
//                   type: 'text',
//                   required: true,
//                   maxLength: NAME_MAX,
//                   label: 'নাম (বাংলা)',
//                   validate: validateShortText('Name (BN)', NAME_MAX, true),
//                   admin: {
//                     width: '50%',
//                     description: `এজেন্টের নাম। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
//                   },
//                 },
//               ],
//             },
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'quote',
//                   type: 'textarea',
//                   required: true,
//                   maxLength: QUOTE_MAX,
//                   label: 'Quote',
//                   validate: validateShortText('Quote', QUOTE_MAX, true),
//                   admin: {
//                     width: '50%',
//                     description: `Short testimonial sentence. Max ${QUOTE_MAX} characters.`,
//                   },
//                 },
//                 {
//                   name: 'quoteBN',
//                   type: 'textarea',
//                   required: true,
//                   maxLength: QUOTE_MAX,
//                   label: 'উক্তি (বাংলা)',
//                   validate: validateShortText('Quote (BN)', QUOTE_MAX, true),
//                   admin: {
//                     width: '50%',
//                     description: `সংক্ষিপ্ত উক্তি। সর্বোচ্চ ${bnNum(QUOTE_MAX)} অক্ষর।`,
//                   },
//                 },
//               ],
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   /* ---------------- hooks ---------------- */
//   hooks: withMediaLifecycle({
//     arrayFields: [
//       {
//         fieldName: 'audienceCards',
//         mediaFields: ['image'],
//         itemLabelField: 'text',
//         mediaFieldLabels: { image: 'Audience Image' },
//       },
//     ],
//     groupFields: [
//       {
//         groupKey: 'expectations',
//         arrayKey: 'left',
//         mediaFields: ['icon'],
//         itemLabelField: 'text',
//         mediaFieldLabels: { icon: 'Icon' },
//       },
//       {
//         groupKey: 'expectations',
//         arrayKey: 'right',
//         mediaFields: ['avatar'],
//         itemLabelField: 'name',
//         mediaFieldLabels: { avatar: 'Avatar' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//     collectionSlug: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default AgentOnboardingOpportunity

// ===========================================================================================
// ===========================================================================================
// ===========================================================================================

// src/collections/AgentOnboardingOpportunity.ts
import type { Block } from 'payload'

import {
  AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_LABEL,
  AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_THUMBNAIL_URL,
  AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,
} from '@/lib/constants'

import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 60
const SUBTITLE_MAX = 60
// const CARD_TEXT_MAX = 40
const LEFT_ITEM_TEXT_MAX = 100
const NAME_MAX = 60
const QUOTE_MAX = 240

/* ---------------- validators ---------------- */

const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true // optional field
  const s = String(val).trim()
  if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
    return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
  }
  return true
}

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/* ---------------- collection ---------------- */
const AgentOnboardingOpportunitySchema: Block = {
  slug: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG,

  labels: {
    singular: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_LABEL,
    plural: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_LABEL,
  },

  imageURL: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_THUMBNAIL_URL,
  imageAltText: `${AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_BLOCK_LABEL} preview`,

  fields: [
    // Appearance
    {
      name: 'backgroundColor',
      type: 'text',
      label: 'Section Background Color',
      maxLength: COLOR_HEX_LEN,
      validate: validateHexColor,
      defaultValue: '#FCF4EB',
      admin: {
        width: '33%',
        description: `Hex color in #RRGGBB (e.g., #FCF4EB). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    /* ---------------- Section Header ---------------- */
    {
      name: 'section',
      type: 'group',
      label: 'Section Header',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              maxLength: TITLE_MAX,
              label: 'Title',
              validate: validateShortText('Title', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Primary heading. Max ${TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              maxLength: TITLE_MAX,
              label: 'শিরোনাম (বাংলা)',
              validate: validateShortText('Title (BN)', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'subTitle',
              type: 'text',
              required: true,
              maxLength: SUBTITLE_MAX,
              label: 'Subtitle',
              validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Second line under the title. Max ${SUBTITLE_MAX} characters.`,
              },
            },
            {
              name: 'subTitleBN',
              type: 'text',
              required: true,
              maxLength: SUBTITLE_MAX,
              label: 'উপশিরোনাম (বাংলা)',
              validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
              admin: {
                width: '50%',
                description: `শিরোনামের নিচের লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },

    /* ---------------- Audience Cards ---------------- */
    {
      name: 'audienceCards',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 6,
      label: 'Audience Cards (Mobile only)',
      labels: { singular: 'Audience Card', plural: 'Audience Cards' },
      admin: {
        description:
          'These cards are shown on mobile only. Each item has one image and a short line (EN/BN).',
      },
      fields: [
        // {
        //   name: 'image',
        //   label: 'Audience Image',
        //   type: 'upload',
        //   relationTo: 'media',
        //   required: true,
        //   admin: {
        //     description: 'Square visual (1:1 recommended). Optimized with blur placeholder.',
        //   },
        // },
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Audience Image',
          description: 'Square visual (1:1 recommended). Optimized with blur placeholder.',
          aspectRatio: 1,
          quality: 0.9,
          maxKB: 300,
          ownerCollection: AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG as any,
        } as any),

        // {
        //   type: 'row',
        //   fields: [
        //     {
        //       name: 'text',
        //       type: 'text',
        //       required: true,
        //       maxLength: CARD_TEXT_MAX,
        //       label: 'Text',
        //       validate: validateShortText('Text', CARD_TEXT_MAX, true),
        //       admin: {
        //         width: '50%',
        //         description: `Short label (e.g., “Fresh Graduates”). Max ${CARD_TEXT_MAX} characters.`,
        //       },
        //     },
        //     {
        //       name: 'textBN',
        //       type: 'text',
        //       required: true,
        //       maxLength: CARD_TEXT_MAX,
        //       label: 'টেক্সট (বাংলা)',
        //       validate: validateShortText('Text (BN)', CARD_TEXT_MAX, true),
        //       admin: {
        //         width: '50%',
        //         description: `সংক্ষিপ্ত লেবেল। সর্বোচ্চ ${bnNum(CARD_TEXT_MAX)} অক্ষর।`,
        //       },
        //     },
        //   ],
        // },
      ],
    },

    /* ---------------- Expectations ---------------- */
    {
      name: 'expectations',
      type: 'group',
      label: 'Expectations',
      fields: [
        // Left bullets
        {
          name: 'left',
          type: 'array',
          required: true,
          minRows: 4,
          maxRows: 12,
          label: 'Left Bullets',
          labels: { singular: 'Bullet', plural: 'Bullets' },
          admin: { description: 'Bullets with icon + EN/BN short text.' },
          fields: [
            // {
            //   name: 'icon',
            //   label: 'Icon',
            //   type: 'upload',
            //   relationTo: 'media',
            //   required: true,
            //   admin: {
            //     description: 'Square icon (1:1). PNG with transparent background preferred.',
            //   },
            // },
            ...generateArrayImageFields({
              fieldName: 'icon',
              label: 'Icon',
              description: 'Square icon (1:1). PNG with transparent background preferred.',
              aspectRatio: 1,
              quality: 0.9,
              maxKB: 200,
              ownerCollection:
                AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG as any,
            } as any),

            {
              type: 'row',
              fields: [
                {
                  name: 'text',
                  type: 'text',
                  required: true,
                  maxLength: LEFT_ITEM_TEXT_MAX,
                  label: 'Text',
                  validate: validateShortText('Text', LEFT_ITEM_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Short line. Max ${LEFT_ITEM_TEXT_MAX} characters.`,
                  },
                },
                {
                  name: 'textBN',
                  type: 'text',
                  required: true,
                  maxLength: LEFT_ITEM_TEXT_MAX,
                  label: 'টেক্সট (বাংলা)',
                  validate: validateShortText('Text (BN)', LEFT_ITEM_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                    description: `সংক্ষিপ্ত লাইন। সর্বোচ্চ ${bnNum(LEFT_ITEM_TEXT_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
          ],
        },

        // Right card (array with min=1, max=1)
        {
          name: 'right',
          type: 'array',
          required: true,
          minRows: 1,
          maxRows: 1,
          label: 'Right Card (Avatar + Quote)',
          labels: { singular: 'Right Card', plural: 'Right Card' },
          admin: { description: 'Single agent testimonial: avatar + EN/BN name + EN/BN quote.' },
          fields: [
            // {
            //   name: 'avatar',
            //   label: 'Avatar',
            //   type: 'upload',
            //   relationTo: 'media',
            //   required: true,
            //   admin: {
            //     description: 'Agent photo (prefer 1:1 portrait). Optimized with blur placeholder.',
            //   },
            // },
            ...generateArrayImageFields({
              fieldName: 'avatar',
              label: 'Avatar',
              description:
                'Agent photo (1:1 portrait preferred and also prefered transparent img).',
              aspectRatio: 1,
              quality: 1,
              maxKB: 300,
              ownerCollection:
                AGENT_ONBOARDING_PAGE_AGENT_ONBOARDING_OPPORTUNITY_SLUG_AND_TAG as any,
            } as any),

            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  maxLength: NAME_MAX,
                  label: 'Name',
                  validate: validateShortText('Name', NAME_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Agent’s name. Max ${NAME_MAX} characters.`,
                  },
                },
                {
                  name: 'nameBN',
                  type: 'text',
                  required: true,
                  maxLength: NAME_MAX,
                  label: 'নাম (বাংলা)',
                  validate: validateShortText('Name (BN)', NAME_MAX, true),
                  admin: {
                    width: '50%',
                    description: `এজেন্টের নাম। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'quote',
                  type: 'textarea',
                  required: true,
                  maxLength: QUOTE_MAX,
                  label: 'Quote',
                  validate: validateShortText('Quote', QUOTE_MAX, true),
                  admin: {
                    width: '50%',
                    description: `Short testimonial sentence. Max ${QUOTE_MAX} characters.`,
                  },
                },
                {
                  name: 'quoteBN',
                  type: 'textarea',
                  required: true,
                  maxLength: QUOTE_MAX,
                  label: 'উক্তি (বাংলা)',
                  validate: validateShortText('Quote (BN)', QUOTE_MAX, true),
                  admin: {
                    width: '50%',
                    description: `সংক্ষিপ্ত উক্তি। সর্বোচ্চ ${bnNum(QUOTE_MAX)} অক্ষর।`,
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default AgentOnboardingOpportunitySchema
