// // collection Config
// import type { CollectionConfig } from 'payload'
// import { revalidateTag } from 'next/cache'

// import { HOME_PAGE_ADMIN_GROUP, HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG } from '@/lib/constants'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import type { ImageConfig } from '@/utils/media/mediaUtils'
// import { createSingleDocAccess } from '@/utils/singleDocUtils'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'

// // ---------- validators ----------
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// const validateHighlightedInTitle = (val: unknown, { siblingData }: any) => {
//   if (!val) return true
//   if (typeof val !== 'string') return 'Highlighted Text must be text.'
//   if (typeof siblingData?.title === 'string' && !siblingData.title.includes(val)) {
//     return 'Highlighted Text must exist within the Title exactly.'
//   }
//   return true
// }

// // BN version: highlighted must exist within titleBN
// const validateHighlightedInTitleBN = (val: unknown, { siblingData }: any) => {
//   if (!val) return true
//   if (typeof val !== 'string') return 'Highlighted Text (BN) must be text.'
//   if (typeof siblingData?.titleBN === 'string' && !siblingData.titleBN.includes(val)) {
//     return 'Highlighted Text (BN) must exist within the Bangla Title exactly.'
//   }
//   return true
// }

// // ---------- images ----------
// const IMAGE_CONFIGS: ImageConfig[] = [
//   {
//     fieldName: 'backgroundImage1',
//     label: 'Background Image 1',
//     description: 'Primary background image (1.031:1 recommended).',
//     aspectRatio: 1.031 / 1,
//     quality: 0.8,
//     maxKB: 100,
//   },
//   {
//     fieldName: 'backgroundImage2',
//     label: 'Background Image 2',
//     description: 'Secondary background image (1.031:1 recommended).',
//     aspectRatio: 1.031 / 1,
//     quality: 0.8,
//     maxKB: 100,
//   },
// ]

// // ---------- collection ----------
// const HomePremiumCalculator: CollectionConfig = {
//   slug: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//   admin: {
//     useAsTitle: 'title',
//     defaultColumns: ['title', 'updatedAt'],
//     group: HOME_PAGE_ADMIN_GROUP,
//     description: 'Homepage → “Premium Calculator” header and backgrounds.',
//   },
//   access: createSingleDocAccess(HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG),

//   fields: [
//     // 🔐 Hidden per-doc session id for temp upload lifecycle (used by cropper + hooks)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Heading (EN + BN)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'heading',
//           type: 'text',
//           required: true,
//           label: 'Heading',
//           maxLength: 40,
//           validate: validateShortText('Heading', 40, true),
//           admin: {
//             width: '50%',
//             description: 'Short label above the main title. Max 40 characters.',
//           },
//         },
//         {
//           name: 'headingBN',
//           type: 'text',
//           required: true,
//           label: 'হেডিং (বাংলা)',
//           maxLength: 40,
//           validate: validateShortText('Heading (BN)', 40, true),
//           admin: {
//             width: '50%',
//             description: 'মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Title (EN + BN)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Title',
//           maxLength: 80,
//           validate: validateShortText('Header Title', 80, true),
//           admin: {
//             width: '50%',
//             description: 'Primary headline for the section. Max 80 characters.',
//           },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: true,
//           label: 'শিরোনাম (বাংলা)',
//           maxLength: 80,
//           validate: validateShortText('Header Title (BN)', 80, true),
//           admin: { width: '50%', description: 'প্রধান শিরোনাম। সর্বোচ্চ ৮০ অক্ষর।' },
//         },
//       ],
//     },

//     // Highlighted text (EN + BN)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'highlightedText',
//           type: 'text',
//           label: 'Highlighted Text (within title)',
//           maxLength: 40,
//           validate: validateHighlightedInTitle,
//           admin: {
//             width: '50%',
//             description: 'Optional. Must appear verbatim inside the Title. Max 40 characters.',
//           },
//         },
//         {
//           name: 'highlightedTextBN',
//           type: 'text',
//           label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
//           maxLength: 40,
//           validate: validateHighlightedInTitleBN,
//           admin: {
//             width: '50%',
//             description: 'ঐচ্ছিক। অবশ্যই শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ৪০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Description (EN + BN)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'description',
//           type: 'textarea',
//           required: true,
//           label: 'Description',
//           maxLength: 200,
//           validate: validateShortText('Description', 200, true),
//           admin: {
//             width: '50%',
//             description:
//               '1–2 short sentences describing the premium calculator. Max 200 characters.',
//           },
//         },
//         {
//           name: 'descriptionBN',
//           type: 'textarea',
//           required: true,
//           label: 'বর্ণনা (বাংলা)',
//           maxLength: 200,
//           validate: validateShortText('Description (BN)', 200, true),
//           admin: {
//             width: '50%',
//             description:
//               'প্রিমিয়াম ক্যালকুলেটর সম্পর্কে ১–২টি সংক্ষিপ্ত বাক্য। সর্বোচ্চ ২০০ অক্ষর।',
//           },
//         },
//       ],
//     },

//     // Background images (unchanged; media not localized)
//     ...IMAGE_CONFIGS.flatMap((c) =>
//       generateImageFields({
//         ...c,
//         ownerCollection: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG, // tag uploads
//       } as any),
//     ),
//   ],

//   // ✅ Unified media lifecycle
//   hooks: withMediaLifecycle({
//     imageConfigs: IMAGE_CONFIGS,
//     arrayFields: [],
//     skipOnDraft: true,
//     singleDocSlug: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//     collectionSlug: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
//     onAfterChange: async ({ req }) => {
//       revalidateTag(HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG)
//       triggerMediaTemporaryPurge(req) // fire-and-forget cleanup for temporary:true media
//     },
//   }),
// }

// export default HomePremiumCalculator

// ==================================================================================
// ==================================================================================
// ==================================================================================
// ==================================================================================

// src/blocks/premiumCalculator/schema.ts
import {
  HOME_PAGE,
  HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_LABEL,
  HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_THUMBNAIL_URL,
  HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import type { Block } from 'payload'

/* ------------ limits (keep at top; reuse in admin descriptions) ------------ */
const COLOR_HEX_LEN = 7
const HEADING_MAX = 40
const TITLE_MAX = 40
const HIGHLIGHTED_TEXT_MAX = 40
const DESCRIPTION_MAX = 200
const DESC_MAX = 400

/* ---------- default rich text (Lexical JSON) for consent (EN/BN) ---------- */
const CONSENT_EN_DEFAULT = {
  root: {
    type: 'root',
    version: 1,
    children: [
      {
        type: 'paragraph',
        version: 1,
        indent: 0,
        format: '',
        direction: 'ltr',
        children: [
          {
            type: 'text',
            version: 1,
            style: '',
            detail: 0,
            format: 0,
            mode: 'normal',
            text: 'By clicking Send Feedback, you agree to our terms and conditions and privacy policy.',
          },
        ],
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
  },
}

const CONSENT_BN_DEFAULT = {
  root: {
    type: 'root',
    version: 1,
    children: [
      {
        type: 'paragraph',
        version: 1,
        indent: 0,
        format: '',
        direction: 'ltr',
        children: [
          {
            type: 'text',
            version: 1,
            style: '',
            detail: 0,
            format: 0,
            mode: 'normal',
            text: 'এখানে ক্লিক করার মাধ্যমে, আপনি আমাদের টার্মস এন্ড কন্ডিশনস , ও প্রাইভেসি পলিসিতে সম্মত করছেন।',
          },
        ],
      },
    ],
    direction: 'ltr',
    format: '',
    indent: 0,
  },
}

/* ------------ validators ------------ */

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

const validateHighlightedInTitle = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'Highlighted Text must be text.'
  if (typeof siblingData?.title === 'string' && !siblingData.title.includes(val)) {
    return 'Highlighted Text must exist within the Title exactly.'
  }
  return true
}

const validateHighlightedInTitleBN = (val: unknown, { siblingData }: any) => {
  if (!val) return true
  if (typeof val !== 'string') return 'Highlighted Text (BN) must be text.'
  if (typeof siblingData?.titleBN === 'string' && !siblingData.titleBN.includes(val)) {
    return 'Highlighted Text (BN) must exist within the Bangla Title exactly.'
  }
  return true
}

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

/* ------------ Block config (default Payload media) ------------ */
const PremiumCalculatorSchema: Block = {
  slug: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG, // e.g., 'premium-calculator' as const
  labels: {
    singular: HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_LABEL,
    plural: HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_LABEL,
  },
  admin: {
    group: HOME_PAGE,
  },

  imageURL: HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HOME_PAGE_PREMIUM_CALCULATOR_BLOCK_LABEL} preview`,

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
        description: `Hex color in #RRGGBB (e.g., #FFFFFF). Length ${COLOR_HEX_LEN} (${bnNum(COLOR_HEX_LEN)}).`,
      },
    },
    // Heading (EN + BN)
    {
      type: 'row',
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
          label: 'Heading',
          maxLength: HEADING_MAX,
          validate: validateShortText('Heading', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `Short label above the main title. Max ${HEADING_MAX} characters.`,
          },
        },
        {
          name: 'headingBN',
          type: 'text',
          required: true,
          label: 'হেডিং (বাংলা)',
          maxLength: HEADING_MAX,
          validate: validateShortText('Heading (BN)', HEADING_MAX, true),
          admin: {
            width: '50%',
            description: `মূল শিরোনামের উপরে ছোট লেবেল। সর্বোচ্চ ${bnNum(HEADING_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Title (EN + BN)
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Header Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary headline for the section. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Header Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Highlighted text (EN + BN)
    {
      type: 'row',
      fields: [
        {
          name: 'highlightedText',
          type: 'text',
          label: 'Highlighted Text (within title)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInTitle,
          admin: {
            width: '50%',
            description: `Optional. Must appear verbatim inside the Title. Max ${HIGHLIGHTED_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'highlightedTextBN',
          type: 'text',
          label: 'রঙিন টেক্সট (শিরোনামের মধ্যে)',
          maxLength: HIGHLIGHTED_TEXT_MAX,
          validate: validateHighlightedInTitleBN,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। অবশ্যই শিরোনামের মধ্যে হুবহু থাকতে হবে। সর্বোচ্চ ${bnNum(HIGHLIGHTED_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Description (EN + BN)
    {
      type: 'row',
      fields: [
        {
          name: 'description',
          type: 'textarea',
          required: true,
          label: 'Description',
          maxLength: DESCRIPTION_MAX,
          validate: validateShortText('Description', DESCRIPTION_MAX, true),
          admin: {
            width: '50%',
            description: `1–2 short sentences describing the premium calculator. Max ${DESCRIPTION_MAX} characters.`,
          },
        },
        {
          name: 'descriptionBN',
          type: 'textarea',
          required: true,
          label: 'বর্ণনা (বাংলা)',
          maxLength: DESCRIPTION_MAX,
          validate: validateShortText('Description (BN)', DESCRIPTION_MAX, true),
          admin: {
            width: '50%',
            description: `প্রিমিয়াম ক্যালকুলেটর সম্পর্কে ১–২টি সংক্ষিপ্ত বাক্য। সর্বোচ্চ ${bnNum(DESCRIPTION_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Background images (default Payload media; guidance only)
    // {
    //   name: 'backgroundImage1',
    //   label: 'Background Image 1',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description: 'Primary background image (≈1.031:1 recommended). ~100KB preferred.',
    //   },
    // },
    // {
    //   name: 'backgroundImage2',
    //   label: 'Background Image 2',
    //   type: 'upload',
    //   relationTo: 'media',
    //   required: true,
    //   admin: {
    //     description: 'Secondary background image (≈1.031:1 recommended). ~100KB preferred.',
    //   },
    // },

    ...generateImageFields({
      fieldName: 'backgroundImage1',
      label: 'Background Image 1',
      description: 'Primary background image (≈1.031:1). Upload & crop here.',
      aspectRatio: 1.031,
      quality: 0.8,
      maxKB: 200,
      ownerCollection: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG as any,
    } as any),

    ...generateImageFields({
      fieldName: 'backgroundImage2',
      label: 'Background Image 2',
      description: 'Secondary background image (≈1.031:1). Upload & crop here.',
      aspectRatio: 1.031,
      quality: 0.8,
      maxKB: 200,
      ownerCollection: HOME_PAGE_PREMIUM_CALCULATOR_SLUG_AND_TAG as any,
    } as any),

    {
      name: 'premiumCalculatorForm',
      type: 'group',
      label: 'Premium Calculater Form',
      admin: {
        description: 'Consent line shown under the premium calculator form submit/CTA.',
      },
      fields: [
        {
          name: 'consentText',
          type: 'richText',
          label: 'Consent Text (EN)',
          validate: validateRichText('Description', { required: true, max: DESC_MAX }),
        },
        {
          name: 'consentTextBN',
          type: 'richText',
          label: 'Consent Text (BN)',
          validate: validateRichText('Description', { required: true, max: DESC_MAX }),
        },
      ],
    },
  ],
}

export default PremiumCalculatorSchema
