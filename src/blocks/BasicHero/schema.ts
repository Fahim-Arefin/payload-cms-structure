// import { bnNum } from './../../lib/utils'
// // with localization
// import type { Block } from 'payload'

// import {
//   HERO_BLOCKS,
//   BASIC_HERO_BLOCK_LABEL,
//   BASIC_HERO_BLOCK_THUMBNAIL_URL,
//   BASIC_HERO_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

// const TITLE_MAX = 120
// const SUB_TITLE_MAX = 160

// /* ---------- CTA limits ---------- */
// const BUTTON_LABEL_MAX = 40

// /* ---------- CTA validators (exact) ---------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// const validateSectionIdOptional = (val: unknown) => {
//   const raw = String(val ?? '')

//   // required
//   if (!raw.trim()) {
//     return true // optional
//   }

//   // no leading/trailing spaces
//   if (raw !== raw.trim()) {
//     return 'Section ID must not have leading or trailing spaces.'
//   }

//   const s = raw.trim()

//   // no spaces at all
//   if (/\s/.test(s)) {
//     return 'No spaces allowed. Use "-" to separate words (e.g., "blog-section", not "blog section").'
//   }

//   // allowed chars: letters, numbers, hyphen
//   if (!/^[A-Za-z0-9-]+$/.test(s)) {
//     return 'Section ID can only contain letters, numbers, and hyphens (e.g., "blog-section").'
//   }

//   return true
// }

// const BasicHeroSchema: Block = {
//   slug: BASIC_HERO_SLUG_AND_TAG,
//   labels: {
//     singular: BASIC_HERO_BLOCK_LABEL,
//     plural: BASIC_HERO_BLOCK_LABEL,
//   },

//   admin: {
//     group: HERO_BLOCKS,
//   },

//   imageURL: BASIC_HERO_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${BASIC_HERO_BLOCK_LABEL} preview`,

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle (used by the cropper + hooks)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     {
//       name: 'heroes',
//       type: 'array',
//       required: true,
//       minRows: 1,
//       maxRows: 5,
//       labels: { singular: 'Hero Item', plural: 'Hero Items' },

//       fields: [
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Hero Image',
//           description: 'Upload & crop a 16:9 hero image.',
//           aspectRatio: 16 / 9,
//           quality: 0.9,
//           maxKB: 700, // UI hint only; server accepts big files now
//           ownerCollection: BASIC_HERO_SLUG_AND_TAG as any, // pass through to cropper
//         } as any),

//         ...generateArrayImageFields({
//           fieldName: 'logo',
//           label: 'Logo Image',
//           description: 'Upload & crop a 1:1 logo image.',
//           aspectRatio: 1 / 1,
//           quality: 0.9,
//           maxKB: 400, // UI hint only; server accepts big files now
//           ownerCollection: BASIC_HERO_SLUG_AND_TAG as any, // pass through to cropper
//         } as any),

//         // ===== Heading fields (EN + BN twins) =====
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'heading1',
//               type: 'text',
//               required: true,
//               label: 'Heading 1',
//               maxLength: TITLE_MAX,
//               admin: {
//                 width: '50%',
//                 description: `Heading 1 (English). Max ${TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'heading1BN',
//               type: 'text',
//               required: true,
//               label: 'শিরোনাম ১ (বাংলা)',
//               maxLength: TITLE_MAX,
//               admin: {
//                 width: '50%',
//                 description: `শিরোনাম ১ (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'heading2',
//               type: 'text',
//               label: 'Heading 2',
//               maxLength: SUB_TITLE_MAX,
//               admin: {
//                 width: '50%',
//                 description: `Heading 2 (English). Max ${SUB_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'heading2BN',
//               type: 'text',
//               label: 'শিরোনাম ২ (বাংলা)',
//               maxLength: SUB_TITLE_MAX,
//               admin: {
//                 width: '50%',
//                 description: `শিরোনাম ২ (বাংলা)। সর্বোচ্চ ${bnNum(SUB_TITLE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'heading3',
//               type: 'text',
//               label: 'Heading 3',
//               maxLength: SUB_TITLE_MAX,
//               admin: {
//                 width: '50%',
//                 description: `Heading 3 (English). Max ${SUB_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'heading3BN',
//               type: 'text',
//               label: 'শিরোনাম ৩ (বাংলা)',
//               maxLength: SUB_TITLE_MAX,
//               admin: {
//                 width: '50%',
//                 description: `শিরোনাম ৩ (বাংলা)। সর্বোচ্চ ${bnNum(SUB_TITLE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'richText',
//               label: 'Description',
//               admin: {
//                 width: '50%',
//                 description: ``,
//               },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'richText',
//               label: 'বিবরণ (বাংলা)',
//               admin: {
//                 width: '50%',
//                 description: ``,
//               },
//             },
//           ],
//         },
//       ],
//     },

//     // ===== CTA Buttons (array format, exactly like the block fields) =====
//     {
//       name: 'ctaButtons',
//       type: 'array',
//       required: false,
//       minRows: 0,
//       maxRows: 2,
//       labels: { singular: 'CTA Button', plural: 'CTA Buttons' },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             // EN
//             {
//               name: 'label',
//               type: 'text',
//               required: true,
//               label: 'Button Text',
//               maxLength: BUTTON_LABEL_MAX,
//               validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
//               admin: { width: '50%', description: `Max ${BUTTON_LABEL_MAX} characters.` },
//             },
//             // BN
//             {
//               name: 'labelBN',
//               type: 'text',
//               required: true,
//               label: 'বাটনের টেক্সট (বাংলা)',
//               maxLength: BUTTON_LABEL_MAX,
//               validate: validateShortText('Button Text (BN)', BUTTON_LABEL_MAX, true),
//               admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(BUTTON_LABEL_MAX)} অক্ষর।` },
//             },
//           ],
//         },

//         {
//           type: 'row',
//           fields: [
//             {
//               type: 'row',
//               fields: [
//                 {
//                   name: 'buttonLink',
//                   label: 'Link to (internal page)',
//                   type: 'relationship',
//                   relationTo: 'pages',
//                   required: true,
//                   admin: {
//                     width: '50%',
//                     description:
//                       'Pick an internal Page to link to. External URLs are not allowed. Do not select this same page.',
//                   },
//                 },
//                 {
//                   name: 'sectionId',
//                   type: 'text',
//                   label: 'Section ID (anchor)',
//                   required: false,
//                   admin: {
//                     width: '50%',
//                     description:
//                       'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
//                   },
//                   validate: validateSectionIdOptional,
//                 },
//               ],
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             // Non-localized control (not user-facing text)
//             {
//               name: 'style',
//               type: 'select',
//               label: 'Button Style',
//               options: [
//                 { label: 'Primary', value: 'primary' },
//                 { label: 'Secondary', value: 'secondary' },
//                 { label: 'Glass', value: 'glass' },
//               ],
//               defaultValue: 'primary',
//               admin: {
//                 width: '50%',
//                 description: 'Select the button style',
//               },
//             },
//             // size?: 'small' | 'medium' | 'large' | 'extraLarge'
//             {
//               name: 'size',
//               type: 'select',
//               label: 'Button Size',
//               options: [
//                 { label: 'Small', value: 'small' },
//                 { label: 'Medium', value: 'medium' },
//                 { label: 'Large', value: 'large' },
//                 { label: 'ExtraLarge', value: 'extraLarge' },
//               ],
//               defaultValue: 'extraLarge',
//               admin: {
//                 width: '50%',
//                 description: 'Select the button size',
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],
// }

// export default BasicHeroSchema

// ============================================================
// ============================================================
// ============================================================

import { bnNum } from './../../lib/utils'
// with localization
import type { Block } from 'payload'

import {
  HERO_BLOCKS,
  BASIC_HERO_BLOCK_LABEL,
  BASIC_HERO_BLOCK_THUMBNAIL_URL,
  BASIC_HERO_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
import {
  validateHighlightedInField,
  validateSectionIdOptional,
  validateShortText,
} from '@/utils/block'

const TITLE_MAX = 120
const SUB_TITLE_MAX = 160
const HIGHLIGHT_MAX = 40
const BUTTON_LABEL_MAX = 40

const BasicHeroSchema: Block = {
  slug: BASIC_HERO_SLUG_AND_TAG,
  labels: {
    singular: BASIC_HERO_BLOCK_LABEL,
    plural: BASIC_HERO_BLOCK_LABEL,
  },

  admin: {
    group: HERO_BLOCKS,
  },

  imageURL: BASIC_HERO_BLOCK_THUMBNAIL_URL,
  imageAltText: `${BASIC_HERO_BLOCK_LABEL} preview`,

  fields: [
    // 🔐 Hidden per-doc session id for temp upload lifecycle (used by the cropper + hooks)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    {
      name: 'heroes',
      type: 'array',
      required: true,
      minRows: 1,
      maxRows: 5,
      labels: { singular: 'Hero Item', plural: 'Hero Items' },

      fields: [
        ...generateArrayImageFields({
          fieldName: 'image',
          label: 'Hero Image',
          description: 'Upload & crop a 16:9 hero image.',
          aspectRatio: 16 / 9,
          quality: 0.9,
          maxKB: 700, // UI hint only; server accepts big files now
          ownerCollection: BASIC_HERO_SLUG_AND_TAG as any, // pass through to cropper
        } as any),

        ...generateArrayImageFields({
          fieldName: 'logo',
          label: 'Logo Image',
          description: 'Upload & crop a 1:1 logo image.',
          aspectRatio: 1 / 1,
          quality: 0.9,
          maxKB: 400, // UI hint only; server accepts big files now
          required: false,
          ownerCollection: BASIC_HERO_SLUG_AND_TAG as any, // pass through to cropper
        } as any),

        // ===== Heading 1 (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'heading1',
              type: 'text',
              required: true,
              label: 'Heading 1',
              maxLength: TITLE_MAX,
              validate: validateShortText('Heading 1', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Heading 1 (English). Max ${TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading1BN',
              type: 'text',
              required: true,
              label: 'শিরোনাম ১ (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Heading 1 (BN)', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `শিরোনাম ১ (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'heading1Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 1)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 1)',
                'heading1',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 1. Max ${HIGHLIGHT_MAX}.`,
              },
            },
            {
              name: 'heading1HighlightedBN',
              type: 'text',
              required: false,
              label: 'রঙিন টেক্সট (শিরোনাম ১-এর মধ্যে)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 1) (BN)',
                'heading1BN',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। শিরোনাম ১-এর মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
                  HIGHLIGHT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        // ===== Heading 2 (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'heading2',
              type: 'text',
              required: false,
              label: 'Heading 2',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 2', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `Heading 2 (English). Max ${SUB_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading2BN',
              type: 'text',
              required: false,
              label: 'শিরোনাম ২ (বাংলা)',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 2 (BN)', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `শিরোনাম ২ (বাংলা)। সর্বোচ্চ ${bnNum(SUB_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'heading2Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 2)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 2)',
                'heading2',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 2. Max ${HIGHLIGHT_MAX}.`,
              },
            },
            {
              name: 'heading2HighlightedBN',
              type: 'text',
              required: false,
              label: 'রঙিন টেক্সট (শিরোনাম ২-এর মধ্যে)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 2) (BN)',
                'heading2BN',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। শিরোনাম ২-এর মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
                  HIGHLIGHT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        // ===== Heading 3 (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'heading3',
              type: 'text',
              required: false,
              label: 'Heading 3',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 3', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `Heading 3 (English). Max ${SUB_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'heading3BN',
              type: 'text',
              required: false,
              label: 'শিরোনাম ৩ (বাংলা)',
              maxLength: SUB_TITLE_MAX,
              validate: validateShortText('Heading 3 (BN)', SUB_TITLE_MAX, false),
              admin: {
                width: '50%',
                description: `শিরোনাম ৩ (বাংলা)। সর্বোচ্চ ${bnNum(SUB_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'heading3Highlighted',
              type: 'text',
              required: false,
              label: 'Highlighted Text (within heading 3)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 3)',
                'heading3',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `Optional. Must be inside Heading 3. Max ${HIGHLIGHT_MAX}.`,
              },
            },
            {
              name: 'heading3HighlightedBN',
              type: 'text',
              required: false,
              label: 'রঙিন টেক্সট (শিরোনাম ৩-এর মধ্যে)',
              maxLength: HIGHLIGHT_MAX,
              validate: validateHighlightedInField(
                'Highlighted Text (Heading 3) (BN)',
                'heading3BN',
                HIGHLIGHT_MAX,
                false,
              ),
              admin: {
                width: '50%',
                description: `ঐচ্ছিক। শিরোনাম ৩-এর মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(
                  HIGHLIGHT_MAX,
                )} অক্ষর।`,
              },
            },
          ],
        },

        // ===== Description (EN + BN) =====
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              admin: {
                width: '50%',
                description: ``,
              },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              label: 'বিবরণ (বাংলা)',
              admin: {
                width: '50%',
                description: ``,
              },
            },
          ],
        },
      ],
    },

    // ===== CTA Buttons (array format, exactly like the block fields) =====
    {
      name: 'ctaButtons',
      type: 'array',
      required: false,
      minRows: 0,
      maxRows: 2,
      labels: { singular: 'CTA Button', plural: 'CTA Buttons' },
      fields: [
        {
          type: 'row',
          fields: [
            // EN
            {
              name: 'label',
              type: 'text',
              required: true,
              label: 'Button Text',
              maxLength: BUTTON_LABEL_MAX,
              validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
              admin: { width: '50%', description: `Max ${BUTTON_LABEL_MAX} characters.` },
            },
            // BN
            {
              name: 'labelBN',
              type: 'text',
              required: true,
              label: 'বাটনের টেক্সট (বাংলা)',
              maxLength: BUTTON_LABEL_MAX,
              validate: validateShortText('Button Text (BN)', BUTTON_LABEL_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(BUTTON_LABEL_MAX)} অক্ষর।` },
            },
          ],
        },

        {
          type: 'row',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonLink',
                  label: 'Link to (internal page)',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: true,
                  admin: {
                    width: '50%',
                    description:
                      'Pick an internal Page to link to. External URLs are not allowed. Do not select this same page.',
                  },
                },
                {
                  name: 'sectionId',
                  type: 'text',
                  label: 'Section ID (anchor)',
                  required: false,
                  admin: {
                    width: '50%',
                    description:
                      'Used for direct jump links to this section (e.g., "blog-section"). Required. No spaces. Use "-" to separate words (e.g., "blog-section", not "blog section").',
                  },
                  validate: validateSectionIdOptional,
                },
              ],
            },
          ],
        },
        {
          type: 'row',
          fields: [
            // Non-localized control (not user-facing text)
            {
              name: 'style',
              type: 'select',
              label: 'Button Style',
              options: [
                { label: 'Primary', value: 'primary' },
                { label: 'Secondary', value: 'secondary' },
                { label: 'Glass', value: 'glass' },
              ],
              defaultValue: 'primary',
              admin: {
                width: '50%',
                description: 'Select the button style',
              },
            },
            // size?: 'small' | 'medium' | 'large' | 'extraLarge'
            {
              name: 'size',
              type: 'select',
              label: 'Button Size',
              options: [
                { label: 'Small', value: 'small' },
                { label: 'Medium', value: 'medium' },
                { label: 'Large', value: 'large' },
                { label: 'ExtraLarge', value: 'extraLarge' },
              ],
              defaultValue: 'extraLarge',
              admin: {
                width: '50%',
                description: 'Select the button size',
              },
            },
          ],
        },
      ],
    },
  ],
}

export default BasicHeroSchema
