import { bnNum } from '@/lib/utils'
// // collection config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import {
//   ABOUT_US_PAGE_ADMIN_GROUP,
//   ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// /* ---------------- limits ---------------- */
// const NAME_MAX = 40
// const DESIGNATION_MAX = 40
// const TITLE_MAX = 100
// const SUBTITLE_MAX = 100
// const DESC_MAX = 1200 // long messages from Chairman/CEO

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// /** True if there is ANY real (non-zero-width, non-whitespace) text node in the Lexical tree */
// function lexicalHasRealText(root: any): boolean {
//   if (!root) return false
//   const stack = [root]
//   while (stack.length) {
//     const node = stack.pop()
//     if (!node) continue

//     // Text node with real characters?
//     if (node.type === 'text' && typeof node.text === 'string') {
//       const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
//       if (stripped.length > 0) return true
//     }

//     // Traverse children/fields
//     if (Array.isArray(node)) {
//       for (const child of node) stack.push(child)
//     } else if (typeof node === 'object') {
//       for (const k of Object.keys(node)) {
//         if (k === 'text') continue
//         stack.push(node[k])
//       }
//     }
//   }
//   return false
// }

// /** Count characters in Lexical tree (ignores zero-width chars but keeps normal spaces) */
// function lexicalCharCount(root: any): number {
//   let count = 0
//   const stack = [root]
//   while (stack.length) {
//     const node = stack.pop()
//     if (!node) continue
//     if (node.type === 'text' && typeof node.text === 'string') {
//       count += node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').length
//     }
//     if (Array.isArray(node)) {
//       for (const child of node) stack.push(child)
//     } else if (typeof node === 'object') {
//       for (const k of Object.keys(node)) {
//         if (k === 'text') continue
//         stack.push(node[k])
//       }
//     }
//   }
//   return count
// }

// /** Single source of truth validator for richText fields */
// const validateRichText =
//   (label: string, { required, max }: { required: boolean; max: number }) =>
//   (val: unknown) => {
//     const root = (val as any)?.root ?? val
//     if (required && !lexicalHasRealText(root)) {
//       return `${label} is required.`
//     }
//     if (!root) return true
//     const chars = lexicalCharCount(root)
//     if (max && chars > max) {
//       return `${label} must be at most ${max} characters.`
//     }
//     return true
//   }

// /* ---------------- images ---------------- */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'image',
//     label: 'Portrait Image',
//     description: 'Director/Leader portrait. Maintain 8:9 aspect ratio',
//     aspectRatio: 8 / 9,
//     quality: 0.9,
//     maxKB: 300,
//   },
// ]

// const DirectorsMessages: CollectionConfig = {
//   slug: ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'id',
//     group: ABOUT_US_PAGE_ADMIN_GROUP,
//     defaultColumns: ['updatedAt'],
//     description: 'About Us → Directors messages (EN/BN twins).',
//   },

//   access: createSingleDocAccess(ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG),

//   fields: [
//     // 🔐 hidden per-doc session id used for temp upload lifecycle
//     {
//       name: 'uploadSessionId',
//       type: 'text',
//       admin: {
//         condition: () => false,
//         description:
//           'Internal: Associates temporary uploads with this document during save lifecycle.',
//       },
//     },

//     {
//       name: 'cards',
//       type: 'array',
//       label: 'Director / Leadership Cards',
//       required: true,
//       minRows: 1,
//       maxRows: 3,
//       labels: { singular: 'Card', plural: 'Cards' },
//       admin: {
//         description:
//           'Add one card per leader (portrait + EN/BN name, designation, title, subtitle, and rich description).',
//       },
//       fields: [
//         // Portrait (direct upload via cropper; will also save imageBlurDataURL)
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Portrait Image',
//           description:
//             'Leader portrait (8:9 recommended). Will be optimized and a blur placeholder generated.',
//           aspectRatio: 8 / 9,
//           quality: 0.9,
//           maxKB: 300,
//           ownerCollection: ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG as any,
//           required: true,
//         } as any),

//         // Name (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'name',
//               type: 'text',
//               required: true,
//               label: 'Name',
//               maxLength: NAME_MAX,
//               validate: validateShortText('Name', NAME_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Leader’s name (English). Max ${NAME_MAX} characters.`,
//               },
//             },
//             {
//               name: 'nameBN',
//               type: 'text',
//               required: true,
//               label: 'নাম (বাংলা)',
//               maxLength: NAME_MAX,
//               validate: validateShortText('Name (BN)', NAME_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `নেতৃত্বের নাম (বাংলা)। সর্বোচ্চ ${NAME_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Designation (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'designation',
//               type: 'text',
//               required: true,
//               label: 'Designation',
//               maxLength: DESIGNATION_MAX,
//               validate: validateShortText('Designation', DESIGNATION_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Official designation (English). Max ${DESIGNATION_MAX} characters.`,
//               },
//             },
//             {
//               name: 'designationBN',
//               type: 'text',
//               required: true,
//               label: 'পদবি (বাংলা)',
//               maxLength: DESIGNATION_MAX,
//               validate: validateShortText('Designation (BN)', DESIGNATION_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `আনুষ্ঠানিক পদবি (বাংলা)। সর্বোচ্চ ${DESIGNATION_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Title + Subtitle (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               label: 'Title',
//               maxLength: TITLE_MAX,
//               validate: validateShortText('Title', TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Short message header (English). Max ${TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'শিরোনাম (বাংলা)',
//               maxLength: TITLE_MAX,
//               validate: validateShortText('Title (BN)', TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `সংক্ষিপ্ত বার্তার শিরোনাম (বাংলা)। সর্বোচ্চ ${TITLE_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'subtitle',
//               type: 'text',
//               required: true,
//               label: 'Subtitle',
//               maxLength: SUBTITLE_MAX,
//               validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Support line under the title (English). Max ${SUBTITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'subtitleBN',
//               type: 'text',
//               required: true,
//               label: 'উপশিরোনাম (বাংলা)',
//               maxLength: SUBTITLE_MAX,
//               validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `শিরোনামের সহায়ক লাইন (বাংলা)। সর্বোচ্চ ${SUBTITLE_MAX} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Description (EN/BN) → RICHTEXT with length validator
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'richText',
//               //   required: true, // keep Payload's built-in required too
//               label: 'Description',
//               validate: validateRichText('Description', { required: true, max: DESC_MAX }),
//               admin: { width: '50%', description: 'Up to ~2000 characters.' },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'richText',
//               //   required: true,
//               label: 'বর্ণনা (বাংলা)',
//               validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
//               admin: { width: '50%', description: 'সর্বোচ্চ ~২০০০ অক্ষর।' },
//             },
//           ],
//         },

//         // NOTE: You said links are not used in JSX for this schema → no link fields included.
//       ],
//     },
//   ],

//   // ✅ media lifecycle: finalize temps on success, purge temps via endpoint, diff delete on edits
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [
//       {
//         fieldName: 'cards',
//         mediaFields: ['image'],
//         itemLabelField: 'name',
//         mediaFieldLabels: { image: 'Portrait Image' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
//     collectionSlug: ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default DirectorsMessages

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================

// block
import type { Block } from 'payload'

import {
  ABOUT_US_PAGE_DIRECTORS_MESSAGES_BLOCK_LABEL,
  ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,
} from '@/lib/constants'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const NAME_MAX = 40
const DESIGNATION_MAX = 40
const TITLE_MAX = 100
const SUBTITLE_MAX = 100
const DESC_MAX = 1500 // long messages from Chairman/CEO

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
    if (s.length > max) return `${label} must be at most ${max} characters.`
    return true
  }

/** True if there is ANY real (non-zero-width, non-whitespace) text node in the Lexical tree */
function lexicalHasRealText(root: any): boolean {
  if (!root) return false
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue

    // Text node with real characters?
    if (node.type === 'text' && typeof node.text === 'string') {
      const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
      if (stripped.length > 0) return true
    }

    // Traverse children/fields
    if (Array.isArray(node)) {
      for (const child of node) stack.push(child)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push(node[k])
      }
    }
  }
  return false
}

/** Count characters in Lexical tree (ignores zero-width chars but keeps normal spaces) */
function lexicalCharCount(root: any): number {
  let count = 0
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      count += node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').length
    }
    if (Array.isArray(node)) {
      for (const child of node) stack.push(child)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push(node[k])
      }
    }
  }
  return count
}

/** Single source of truth validator for richText fields */
const validateRichText =
  (label: string, { required, max }: { required: boolean; max: number }) =>
  (val: unknown) => {
    const root = (val as any)?.root ?? val
    if (required && !lexicalHasRealText(root)) {
      return `${label} is required.`
    }
    if (!root) return true
    const chars = lexicalCharCount(root)
    if (max && chars > max) {
      return `${label} must be at most ${max} characters.`
    }
    return true
  }

const DirectorsMessagesSchema: Block = {
  slug: ABOUT_US_PAGE_DIRECTORS_MESSAGES_SLUG_AND_TAG,

  labels: {
    singular: ABOUT_US_PAGE_DIRECTORS_MESSAGES_BLOCK_LABEL,
    plural: ABOUT_US_PAGE_DIRECTORS_MESSAGES_BLOCK_LABEL,
  },

  fields: [
    {
      name: 'cards',
      type: 'array',
      label: 'Director / Leadership Cards',
      required: true,
      minRows: 1,
      maxRows: 3,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        description:
          'Add one card per leader (portrait + EN/BN name, designation, title, subtitle, and rich description).',
      },
      fields: [
        // Appearance
        {
          name: 'backgroundColor',
          type: 'text',
          label: 'Section Background Color',
          maxLength: COLOR_HEX_LEN,
          validate: validateHexColor,
          defaultValue: '#F6EDDD',
          admin: {
            width: '33%',
            description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
          },
        },

        // portrait (direct upload via cropper; will also save imageBlurDataURL)
        {
          name: 'image',
          label: 'Portrait Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Leader portrait (8:9 recommended). Will be optimized and a blur placeholder generated.',
          },
        },

        // Name (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              label: 'Name',
              maxLength: NAME_MAX,
              validate: validateShortText('Name', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `Leader’s name (English). Max ${NAME_MAX} characters.`,
              },
            },
            {
              name: 'nameBN',
              type: 'text',
              required: true,
              label: 'নাম (বাংলা)',
              maxLength: NAME_MAX,
              validate: validateShortText('Name (BN)', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `নেতৃত্বের নাম (বাংলা)। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Designation (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'designation',
              type: 'text',
              required: true,
              label: 'Designation',
              maxLength: DESIGNATION_MAX,
              validate: validateShortText('Designation', DESIGNATION_MAX, true),
              admin: {
                width: '50%',
                description: `Official designation (English). Max ${DESIGNATION_MAX} characters.`,
              },
            },
            {
              name: 'designationBN',
              type: 'text',
              required: true,
              label: 'পদবি (বাংলা)',
              maxLength: DESIGNATION_MAX,
              validate: validateShortText('Designation (BN)', DESIGNATION_MAX, true),
              admin: {
                width: '50%',
                description: `আনুষ্ঠানিক পদবি (বাংলা)। সর্বোচ্চ ${bnNum(DESIGNATION_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Title + Subtitle (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Title',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Short message header (English). Max ${TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'শিরোনাম (বাংলা)',
              maxLength: TITLE_MAX,
              validate: validateShortText('Title (BN)', TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত বার্তার শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'subtitle',
              type: 'text',
              required: true,
              label: 'Subtitle',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Subtitle', SUBTITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Support line under the title (English). Max ${SUBTITLE_MAX} characters.`,
              },
            },
            {
              name: 'subtitleBN',
              type: 'text',
              required: true,
              label: 'উপশিরোনাম (বাংলা)',
              maxLength: SUBTITLE_MAX,
              validate: validateShortText('Subtitle (BN)', SUBTITLE_MAX, true),
              admin: {
                width: '50%',
                description: `শিরোনামের সহায়ক লাইন (বাংলা)। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Description (EN/BN) → RICHTEXT with length validator
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              //   required: true, // keep Payload's built-in required too
              label: 'Description',
              validate: validateRichText('Description', { required: true, max: DESC_MAX }),
              admin: { width: '50%', description: `Up to ${DESC_MAX} characters.` },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              //   required: true,
              label: 'বর্ণনা (বাংলা)',
              validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
              admin: { width: '50%', description: `সর্বোচ্চ ~${bnNum(DESC_MAX)} অক্ষর।` },
            },
          ],
        },
      ],
    },
  ],
}

export default DirectorsMessagesSchema
