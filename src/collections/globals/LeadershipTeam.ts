// // collection config
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

// import {
//   LEADERS_PAGE_ADMIN_GROUP,
//   LEADERS_PAGE_LEADERS_SLUG_AND_TAG, // add these in your constants
// } from '@/lib/constants'

// import { generateArrayImageFields } from '@/utils/media/fieldGenerators'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { bnNum } from '@/lib/utils'

// /* ---------------- limits (same as BOD schema) ---------------- */
// const TITLE_MAX = 60
// const NAME_MAX = 100
// const DESIGNATION_MAX = 80
// const DESC_MAX = 3000 // long bios welcome

// /* ---------------- validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /** True if there is ANY real (non-zero-width, non-whitespace) text node in the Lexical tree */
// function lexicalHasRealText(root: any): boolean {
//   if (!root) return false
//   const stack = [root]
//   while (stack.length) {
//     const node = stack.pop()
//     if (!node) continue
//     if (node.type === 'text' && typeof node.text === 'string') {
//       const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
//       if (stripped.length > 0) return true
//     }
//     if (Array.isArray(node)) {
//       for (const child of node) stack.push(child)
//     } else if (typeof node === 'object') {
//       for (const k of Object.keys(node)) {
//         if (k === 'text') continue
//         stack.push((node as any)[k])
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
//         stack.push((node as any)[k])
//       }
//     }
//   }
//   return count
// }

// /** RichText validator (required + max length) */
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

// const Leaders: CollectionConfig = {
//   slug: LEADERS_PAGE_LEADERS_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'id',
//     group: LEADERS_PAGE_ADMIN_GROUP,
//     defaultColumns: ['id', 'updatedAt'],
//     description:
//       'This collection powers BOTH pages: About Us + Leaders. About Us uses ROOT fields (Section Title) and the aboutImage (transparent, BG-removed, 4:5 PNG). Leaders page uses leaders[] items (portrait image 4:5, EN/BN name, EN/BN designation, rich bio). Note: aboutImage must be background-removed (transparent PNG) for About Us overlays.',
//   },

//   // Single-document behavior (like other About sections)
//   access: createSingleDocAccess(LEADERS_PAGE_LEADERS_SLUG_AND_TAG),

//   fields: [
//     // 🔐 hidden per-doc session id used by cropper + hooks for temp uploads
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     /* ----- Root section header (EN/BN twins) ----- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'sectionTitle',
//           type: 'text',
//           required: true,
//           label: 'Section Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading for this page. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'sectionTitleBN',
//           type: 'text',
//           required: true,
//           label: 'সেকশন শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `প্রধান শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ----- Leaders array ----- */
//     {
//       name: 'leaders',
//       type: 'array',
//       label: 'Leaders',
//       minRows: 1,
//       maxRows: 50,
//       required: true,
//       labels: { singular: 'Leader', plural: 'Leaders' },
//       admin: { description: 'Add one card per leader.' },
//       fields: [
//         // Main Portrait (same as BOD: 4:5)
//         ...generateArrayImageFields({
//           fieldName: 'image',
//           label: 'Portrait Image',
//           description:
//             'Leader portrait (4:5 recommended). Optimized and blur placeholder generated automatically.',
//           aspectRatio: 4 / 5,
//           quality: 0.93,
//           maxKB: 250,
//           ownerCollection: LEADERS_PAGE_LEADERS_SLUG_AND_TAG as any,
//           required: true,
//         } as any),

//         // BG-removed Portrait for overlays (aspect 400x450 ≈ 8:9)
//         ...generateArrayImageFields({
//           fieldName: 'aboutImage',
//           label: 'Portrait Image (BG-removed • 400×450 ≈ 8:9)',
//           description:
//             'Upload a background-removed PNG (transparent) framed ~8:9 (e.g., 400×450). Keep subject centered; same person/pose as the main Portrait Image.',
//           aspectRatio: 8 / 9,
//           quality: 0.95,
//           maxKB: 250,
//           ownerCollection: LEADERS_PAGE_LEADERS_SLUG_AND_TAG as any,
//           required: true,
//         } as any),

//         // Name (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               label: 'Name',
//               maxLength: NAME_MAX,
//               validate: validateShortText('Name', NAME_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Leader’s full name (English). Max ${NAME_MAX} characters.`,
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'নাম (বাংলা)',
//               maxLength: NAME_MAX,
//               validate: validateShortText('Name (BN)', NAME_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `নেতৃত্বের পূর্ণ নাম (বাংলা)। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
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
//                 description: `আনুষ্ঠানিক পদবি (বাংলা)। সর্বোচ্চ ${bnNum(DESIGNATION_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Bio / Description (EN/BN) — rich text
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'richText',
//               label: 'Bio / Description',
//               validate: validateRichText('Description', { required: true, max: DESC_MAX }),
//               admin: {
//                 width: '50%',
//                 description: `Long bio (English). Up to ~${DESC_MAX} characters.`,
//               },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'richText',
//               label: 'বায়ো / বর্ণনা (বাংলা)',
//               validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
//               admin: {
//                 width: '50%',
//                 description: `দীর্ঘ বায়ো (বাংলা)। প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।`,
//               },
//             },
//           ],
//         },
//       ],
//       hooks: {
//         // Auto-assign id = index + 1 on every validate/save.
//         beforeValidate: [
//           ({ data }) => {
//             if (Array.isArray(data?.leaders)) {
//               data.leaders = data.leaders.map((item: any, idx: number) => ({
//                 ...item,
//                 id: idx + 1,
//               }))
//             }
//           },
//         ],
//       },
//     },
//   ],

//   // ✅ media lifecycle
//   hooks: withMediaLifecycle({
//     imageConfigs: [], // all images live in the array
//     arrayFields: [
//       {
//         fieldName: 'leaders',
//         mediaFields: ['image', 'aboutImage'],
//         itemLabelField: 'title',
//         mediaFieldLabels: {
//           image: 'Portrait Image',
//           aboutImage: 'BG-removed Portrait (8:9)',
//         },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: LEADERS_PAGE_LEADERS_SLUG_AND_TAG,
//     collectionSlug: LEADERS_PAGE_LEADERS_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(LEADERS_PAGE_LEADERS_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default Leaders

// =======================================================================================
// =======================================================================================
// =======================================================================================
// src/collections/Leaders.ts
import type { GlobalConfig } from 'payload'

import {
  ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG,
  GLOBAL_LEADERSHIP_TEAM_BLOCK_LABEL,
  GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
  LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG,
} from '@/lib/constants'

import { globalTag } from '@/lib/cacheTags'
import { bnNum } from '@/lib/utils'
import { revalidateTag } from 'next/cache'

/* ---------------- limits (same as BOD schema) ---------------- */
const TITLE_MAX = 60
const NAME_MAX = 100
const DESIGNATION_MAX = 80
const DESC_MAX = 3000 // long bios welcome

/* ---------------- validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** True if there is ANY real (non-zero-width, non-whitespace) text node in the Lexical tree */
function lexicalHasRealText(root: any): boolean {
  if (!root) return false
  const stack = [root]
  while (stack.length) {
    const node = stack.pop()
    if (!node) continue
    if (node.type === 'text' && typeof node.text === 'string') {
      const stripped = node.text.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, '')
      if (stripped.length > 0) return true
    }
    if (Array.isArray(node)) {
      for (const child of node) stack.push(child)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push((node as any)[k])
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
        stack.push((node as any)[k])
      }
    }
  }
  return count
}

/** RichText validator (required + max length) */
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

const LeadershipTeam: GlobalConfig = {
  slug: GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG,
  label: GLOBAL_LEADERSHIP_TEAM_BLOCK_LABEL,
  admin: {
    description:
      'This collection powers BOTH pages: About Us + Leaders. About Us uses ROOT fields (Section Title) and the aboutImage (transparent, BG-removed, 4:5 PNG). Leaders page uses leaders[] items (portrait image 4:5, EN/BN name, EN/BN designation, rich bio). Note: aboutImage must be background-removed (transparent PNG) for About Us overlays.',
  },

  fields: [
    /* ----- Root section header (EN/BN twins) ----- */
    {
      type: 'row',
      fields: [
        {
          name: 'sectionTitle',
          type: 'text',
          required: true,
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading for this page. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'sectionTitleBN',
          type: 'text',
          required: true,
          label: 'সেকশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম (বাংলা)। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ----- Leaders array ----- */
    {
      name: 'leaders',
      type: 'array',
      label: 'Leaders',
      minRows: 1,
      maxRows: 50,
      required: true,
      labels: { singular: 'Leader', plural: 'Leaders' },
      admin: { description: 'Add one card per leader.' },
      fields: [
        // Main Portrait (same as BOD: 4:5)
        {
          name: 'image',
          label: 'Portrait Image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Leader portrait (4:5 recommended). Optimized and blur placeholder generated automatically.',
          },
        },

        // BG-removed Portrait for overlays (aspect 400x450 ≈ 8:9
        {
          name: 'aboutImage',
          label: 'Portrait Image (BG-removed • 400×450 ≈ 8:9)',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description:
              'Upload a background-removed PNG (transparent) framed ~8:9 (e.g., 400×450). Keep subject centered; same person/pose as the main Portrait Image.',
          },
        },

        // Name (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Name',
              maxLength: NAME_MAX,
              validate: validateShortText('Name', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `Leader’s full name (English). Max ${NAME_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'নাম (বাংলা)',
              maxLength: NAME_MAX,
              validate: validateShortText('Name (BN)', NAME_MAX, true),
              admin: {
                width: '50%',
                description: `নেতৃত্বের পূর্ণ নাম (বাংলা)। সর্বোচ্চ ${bnNum(NAME_MAX)} অক্ষর।`,
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

        // Bio / Description (EN/BN) — rich text
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Bio / Description',
              validate: validateRichText('Description', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `Long bio (English). Up to ~${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              label: 'বায়ো / বর্ণনা (বাংলা)',
              validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `দীর্ঘ বায়ো (বাংলা)। প্রায় ${bnNum(DESC_MAX)} অক্ষর পর্যন্ত।`,
              },
            },
          ],
        },
      ],
      hooks: {
        // Auto-assign id = index + 1 on every validate/save.
        beforeValidate: [
          ({ data }) => {
            if (Array.isArray(data?.leaders)) {
              data.leaders = data.leaders.map((item: any, idx: number) => ({
                ...item,
                id: idx + 1,
              }))
            }
          },
        ],
      },
    },
  ],
  hooks: {
    afterChange: [
      async () => {
        revalidateTag(globalTag(GLOBAL_LEADERSHIP_TEAM_SLUG_AND_TAG))
        revalidateTag(ABOUT_US_PAGE_LEADERSHIP_TEAM_CARD_SLUG_AND_TAG)
        revalidateTag(LEADERSHIP_TEAM_PAGE_LEADERSHIP_TEAM_LIST_SLUG_AND_TAG)
      },
    ],
  },
}

export default LeadershipTeam
