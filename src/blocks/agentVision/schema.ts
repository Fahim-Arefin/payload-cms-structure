import { AGENT_ONBOARDING_PAGE_AGENT_VISION_BLOCK_LABEL } from './../../lib/constants'
// // collection config
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

// import {
//   AGENT_ONBOARDING_PAGE_ADMIN_GROUP,
//   AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
// } from '@/lib/constants'

// import { bnNum } from '@/lib/utils'
// import { generateArrayImageFields, generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 80
// const HILITE_MAX = 80
// const ITEM_TITLE_MAX = 60
// const DESC_MAX = 300 // rich text (~1–3 short paragraphs)

// /* ---------------- short-text validators ---------------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// /** Require that highlight appears verbatim inside sibling `targetField`. */
// const validateHighlightedInField =
//   (label: string, targetField: string, max = HILITE_MAX, required = false) =>
//   (val: unknown, { siblingData }: any) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     const target = (siblingData?.[targetField] ?? '').toString()
//     if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
//     return true
//   }

// /* ---------------- rich text (Lexical) validators — same technique as BOD/Leaders ---------------- */
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
//       for (const c of node) stack.push(c)
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
//       for (const c of node) stack.push(c)
//     } else if (typeof node === 'object') {
//       for (const k of Object.keys(node)) {
//         if (k === 'text') continue
//         stack.push((node as any)[k])
//       }
//     }
//   }
//   return count
// }

// /** Single source-of-truth validator for richText fields (handles required + max) */
// const validateRichText =
//   (label: string, { required, max }: { required: boolean; max: number }) =>
//   (val: unknown) => {
//     const root = (val as any)?.root ?? val
//     if (required && !lexicalHasRealText(root)) return `${label} is required.`
//     if (!root) return true
//     const chars = lexicalCharCount(root)
//     if (max && chars > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// /* ---------------- images ---------------- */
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'backgroundImage',
//     label: 'Background Image',
//     description: 'Large section background visual. 16:9 recommended.',
//     aspectRatio: 16 / 9,
//     quality: 0.9,
//     maxKB: 400,
//   },
// ]

// /* ---------------- collection ---------------- */
// const AgentVision: CollectionConfig = {
//   slug: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,

//   admin: {
//     useAsTitle: 'title',
//     group: AGENT_ONBOARDING_PAGE_ADMIN_GROUP,
//     defaultColumns: ['title', 'updatedAt'],
//     description:
//       'Agent Vision → Background image + EN/BN title with highlighted part + up to 2 cards (icon + EN/BN title + rich description).',
//   },

//   access: createSingleDocAccess(AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Background image (not localized)
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
//         required: true,
//       } as any),
//     ),

//     /* ---------- Title (EN/BN) + highlighted (EN/BN) ---------- */
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: true,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within Title)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
//           admin: {
//             width: '50%',
//             description: `Optional. Must appear verbatim in Title. Max ${HILITE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//           maxLength: HILITE_MAX,
//           validate: validateHighlightedInField(
//             'Highlighted Text (BN)',
//             'titleBN',
//             HILITE_MAX,
//             false,
//           ),
//           admin: {
//             width: '50%',
//             description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     /* ---------- Cards (max 2): icon + title(EN/BN) + rich description(EN/BN) ---------- */
//     {
//       name: 'items',
//       type: 'array',
//       label: 'Vision Cards',
//       required: true,
//       minRows: 1,
//       maxRows: 2,
//       labels: { singular: 'Card', plural: 'Cards' },
//       admin: {
//         description:
//           'Add up to two cards. Each card has an icon, title (EN/BN), and a rich description (EN/BN).',
//       },
//       fields: [
//         // Icon (not localized)
//         ...generateArrayImageFields({
//           fieldName: 'icon',
//           label: 'Icon',
//           description: 'Square icon (1:1). PNG with transparent background preferred.',
//           aspectRatio: 1,
//           quality: 0.9,
//           maxKB: 120,
//           ownerCollection: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG as any,
//           required: true,
//         } as any),

//         // Title (EN/BN)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'title',
//               type: 'text',
//               required: true,
//               label: 'Card Title',
//               maxLength: ITEM_TITLE_MAX,
//               validate: validateShortText('Card Title', ITEM_TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `Short headline. Max ${ITEM_TITLE_MAX} characters.`,
//               },
//             },
//             {
//               name: 'titleBN',
//               type: 'text',
//               required: true,
//               label: 'কার্ড শিরোনাম (বাংলা)',
//               maxLength: ITEM_TITLE_MAX,
//               validate: validateShortText('Card Title (BN)', ITEM_TITLE_MAX, true),
//               admin: {
//                 width: '50%',
//                 description: `সংক্ষিপ্ত শিরোনাম। সর্বোচ্চ ${bnNum(ITEM_TITLE_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },

//         // Description (EN/BN) — rich text (BOD/Leaders-style validation: no `required` prop)
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'description',
//               type: 'richText',
//               label: 'Description',
//               validate: validateRichText('Description', { required: true, max: DESC_MAX }),
//               admin: {
//                 width: '50%',
//                 description: `Rich text (about 1–3 short paragraphs). Up to ~${DESC_MAX} characters.`,
//               },
//             },
//             {
//               name: 'descriptionBN',
//               type: 'richText',
//               label: 'বর্ণনা (বাংলা)',
//               validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
//               admin: {
//                 width: '50%',
//                 description: `রিচ টেক্সট (১–৩টি সংক্ষিপ্ত অনুচ্ছেদ)। সর্বোচ্চ প্রায় ${bnNum(DESC_MAX)} অক্ষর।`,
//               },
//             },
//           ],
//         },
//       ],
//     },
//   ],

//   // ✅ Unified media lifecycle (finalize temps, purge temps, diff-delete on edits)
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [
//       {
//         fieldName: 'items',
//         mediaFields: ['icon'],
//         itemLabelField: 'title',
//         mediaFieldLabels: { icon: 'Icon' },
//       },
//     ],
//     skipOnDraft: true,
//     singleDocSlug: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
//     collectionSlug: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req)
//     },
//   }),
// }

// export default AgentVision

// =================================================================================
// =================================================================================
// =================================================================================
// =================================================================================

// src/collections/AgentVision.ts
import type { Block } from 'payload'

import { AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG } from '@/lib/constants'

import { bnNum } from '@/lib/utils'
import { generateArrayImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const TITLE_MAX = 80
const HILITE_MAX = 80
const ITEM_TITLE_MAX = 60
const DESC_MAX = 300 // rich text (~1–3 short paragraphs)

/* ---------------- short-text validators ---------------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

/** Require that highlight appears verbatim inside sibling `targetField`. */
const validateHighlightedInField =
  (label: string, targetField: string, max = HILITE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    if (!target.includes(s)) return `${label} must exist within ${targetField} exactly.`
    return true
  }

/* ---------------- rich text (Lexical) validators — same technique as BOD/Leaders ---------------- */
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
      for (const c of node) stack.push(c)
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
      for (const c of node) stack.push(c)
    } else if (typeof node === 'object') {
      for (const k of Object.keys(node)) {
        if (k === 'text') continue
        stack.push((node as any)[k])
      }
    }
  }
  return count
}

/** Single source-of-truth validator for richText fields (handles required + max) */
const validateRichText =
  (label: string, { required, max }: { required: boolean; max: number }) =>
  (val: unknown) => {
    const root = (val as any)?.root ?? val
    if (required && !lexicalHasRealText(root)) return `${label} is required.`
    if (!root) return true
    const chars = lexicalCharCount(root)
    if (max && chars > max) return `${label} must be at most ${max} characters.`
    return true
  }

/* ---------------- collection ---------------- */
const AgentVisionSchema: Block = {
  slug: AGENT_ONBOARDING_PAGE_AGENT_VISION_SLUG_AND_TAG,
  labels: {
    singular: AGENT_ONBOARDING_PAGE_AGENT_VISION_BLOCK_LABEL,
    plural: AGENT_ONBOARDING_PAGE_AGENT_VISION_BLOCK_LABEL,
  },

  fields: [
    // Background image (not localized)
    {
      name: 'backgroundImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Large section background visual. 16:9 recommended.',
      },
    },

    /* ---------- Title (EN/BN) + highlighted (EN/BN) ---------- */
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
            description: `Primary heading. Max ${TITLE_MAX} characters.`,
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
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within Title)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField('Highlighted Text', 'title', HILITE_MAX, false),
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim in Title. Max ${HILITE_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HILITE_MAX,
          validate: validateHighlightedInField(
            'Highlighted Text (BN)',
            'titleBN',
            HILITE_MAX,
            false,
          ),
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HILITE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    /* ---------- Cards (max 2): icon + title(EN/BN) + rich description(EN/BN) ---------- */
    {
      name: 'items',
      type: 'array',
      label: 'Vision Cards',
      required: true,
      minRows: 1,
      maxRows: 2,
      labels: { singular: 'Card', plural: 'Cards' },
      admin: {
        description:
          'Add up to two cards. Each card has an icon, title (EN/BN), and a rich description (EN/BN).',
      },
      fields: [
        // Icon (not localized)
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Square icon (1:1). PNG with transparent background preferred.',
          },
        },
        // Title (EN/BN)
        {
          type: 'row',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              label: 'Card Title',
              maxLength: ITEM_TITLE_MAX,
              validate: validateShortText('Card Title', ITEM_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `Short headline. Max ${ITEM_TITLE_MAX} characters.`,
              },
            },
            {
              name: 'titleBN',
              type: 'text',
              required: true,
              label: 'কার্ড শিরোনাম (বাংলা)',
              maxLength: ITEM_TITLE_MAX,
              validate: validateShortText('Card Title (BN)', ITEM_TITLE_MAX, true),
              admin: {
                width: '50%',
                description: `সংক্ষিপ্ত শিরোনাম। সর্বোচ্চ ${bnNum(ITEM_TITLE_MAX)} অক্ষর।`,
              },
            },
          ],
        },

        // Description (EN/BN) — rich text (BOD/Leaders-style validation: no `required` prop)
        {
          type: 'row',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Description',
              validate: validateRichText('Description', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `Rich text (about 1–3 short paragraphs). Up to ~${DESC_MAX} characters.`,
              },
            },
            {
              name: 'descriptionBN',
              type: 'richText',
              label: 'বর্ণনা (বাংলা)',
              validate: validateRichText('Description (BN)', { required: true, max: DESC_MAX }),
              admin: {
                width: '50%',
                description: `রিচ টেক্সট (১–৩টি সংক্ষিপ্ত অনুচ্ছেদ)। সর্বোচ্চ প্রায় ${bnNum(DESC_MAX)} অক্ষর।`,
              },
            },
          ],
        },
      ],
    },
  ],
}

export default AgentVisionSchema
