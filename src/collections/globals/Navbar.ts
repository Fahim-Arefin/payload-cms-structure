// // src/globals/Navbar.ts
// import type { GlobalConfig, CollectionConfig } from 'payload'
// import type { Field } from 'payload' // <-- fixes TS7023 when we type the recursive helper

// import { bnNum } from '@/lib/utils'
// import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants' // add: export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'global-navbar';
// import { revalidateTag } from 'next/cache'
// import { globalTag } from '@/lib/cacheTags'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import { generateImageFields } from '@/utils/media/fieldGenerators'

// const LABEL_MAX = 40
// const URL_MAX = 300
// const DEPTH_MAX = 4 // max depth for nav items (0 = no children, 1 = one level of children, etc.)

// /* -------------------------------- validators -------------------------------- */

// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// const validateShortTextBN =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} আবশ্যক।`
//     if (!s) return true
//     if (s.length > max) return `${label} সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`
//     return true
//   }

// /** Allow "#", internal path (starts with "/"), or absolute http(s) URL */
// const validateNavUrl =
//   (max = URL_MAX, required = true) =>
//   (val: unknown) => {
//     const link = (val ?? '').toString().trim()
//     if (required && !link) return 'Link is required.'
//     if (!link) return true
//     if (link.length > max) return `Link must be at most ${max} characters.`

//     if (link === '#') return true
//     if (link.startsWith('/')) return true
//     try {
//       const u = new URL(link)
//       if (u.protocol === 'http:' || u.protocol === 'https:') return true
//     } catch {
//       /* fall through */
//     }
//     return 'Link must be "#", start with "/" or be a valid http(s) URL.'
//   }

// // ⬇️ media hook obj for Navbar
// const mediaHooks = withMediaLifecycle({
//   collectionSlug: GLOBAL_NAVBAR_SLUG_AND_TAG,
//   // Track plain uploads that are NOT cropper-generated:
//   otherUploadFields: ['branding.logo'], // ✅ top-level upload inside a group
//   // No groupFields needed for branding since it's not an array
//   // groupFields: [],
// })

// // accept either Collection or Global hooks and coerce just the bits we need
// const pickGlobalHooks = (h: any) => ({
//   beforeValidate: h?.beforeValidate ?? [],
//   beforeChange: h?.beforeChange ?? [],
//   afterChange: h?.afterChange ?? [],
// })

// const base = pickGlobalHooks(mediaHooks)

// /* ------------------------------- nav item fields ------------------------------ */
// /**
//  * Depth-limited recursive fields for menu items.
//  * - levelLabel: used in labels/help text (e.g., "Item", "Child")
//  * - depth/maxDepth: prevents infinite recursion (default 3 levels)
//  */
// const navItemFields = (
//   levelLabel: string = 'Item',
//   depth: number = 0,
//   maxDepth: number = 4,
// ): Field[] => {
//   // base fields (label/en + labelBN + href)
//   const base: Field[] = [
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'label',
//           type: 'text',
//           label: `${levelLabel} Label`,
//           required: true,
//           maxLength: LABEL_MAX,
//           validate: validateShortText(`${levelLabel} Label`, LABEL_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
//           },
//         },
//         {
//           name: 'labelBN',
//           type: 'text',
//           label: `${levelLabel} লেবেল (বাংলা)`,
//           required: true,
//           maxLength: LABEL_MAX,
//           validate: validateShortTextBN(`${levelLabel} লেবেল`, LABEL_MAX, true),
//           admin: {
//             width: '50%',
//             description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       name: 'href',
//       type: 'text',
//       label: 'URL / Path',
//       required: true,
//       maxLength: URL_MAX,
//       validate: validateNavUrl(URL_MAX, true),
//       admin: {
//         description: `Use "#", start with "/", or a full http(s) URL. Max ${URL_MAX} chars (${bnNum(
//           URL_MAX,
//         )}).`,
//       },
//     },
//   ]

//   // add children only if we’re below max depth
//   if (depth < maxDepth) {
//     base.push({
//       name: 'children',
//       type: 'array',
//       label: 'Children',
//       minRows: 0,
//       maxRows: 20,
//       labels: { singular: 'Child', plural: 'Children' },
//       admin: {
//         description: `Optional submenu items. You can nest up to ${maxDepth + 1} levels.`,
//       },
//       fields: navItemFields('Child', depth + 1, maxDepth),
//     })
//   }

//   return base
// }

// /* --------------------------------- config --------------------------------- */

// const Navbar: GlobalConfig = {
//   slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
//   label: 'Navbar',
//   admin: {
//     description:
//       'Global navbar: logo and multi-level navigation (desktop & mobile), plus an optional portal link.',
//   },
//   fields: [
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },
//     /* Branding (logo) */
//     // {
//     //   name: 'branding',
//     //   type: 'group',
//     //   label: 'Branding',
//     //   fields: [
//     //     {
//     //       name: 'logo',
//     //       label: 'Navbar Logo',
//     //       type: 'upload',
//     //       relationTo: 'media',
//     //       required: true,
//     //       admin: {
//     //         description: 'Primary logo shown in the navbar. Recommended transparent PNG/SVG.',
//     //       },
//     //     },
//     //   ],
//     // },
//     // ⬇️ replace the existing Branding > logo field with the generated cropper set
//     {
//       name: 'branding',
//       type: 'group',
//       label: 'Branding',
//       fields: [
//         ...generateImageFields({
//           fieldName: 'logo',
//           label: 'Navbar Logo',
//           description:
//             'Primary navbar logo. Transparent PNG/SVG preferred. Square crop recommended.',
//           aspectRatio: 1.48 / 1, // 1:1; adjust if you want a wide logo (e.g., 3.5 for ~7:2)
//           quality: 0.92,
//           maxKB: 500,
//           required: true,
//           ownerCollection: GLOBAL_NAVBAR_SLUG_AND_TAG as any,
//         } as any),
//       ],
//     },

//     /* Desktop navigation */
//     {
//       name: 'desktop',
//       type: 'group',
//       label: 'Desktop Navigation',
//       fields: [
//         {
//           name: 'items',
//           type: 'array',
//           label: 'Menu Items',
//           minRows: 1,
//           maxRows: 20,
//           labels: { singular: 'Menu Item', plural: 'Menu Items' },
//           admin: {
//             description:
//               'Top-level nav items for desktop. Each item can optionally have nested children.',
//           },
//           fields: navItemFields('Item', 0, DEPTH_MAX), // 5 levels: Item -> Child -> Child
//         },
//       ],
//     },

//     /* Mobile navigation (separate structure if you want differences) */
//     {
//       name: 'mobile',
//       type: 'group',
//       label: 'Mobile Navigation',
//       fields: [
//         {
//           name: 'items',
//           type: 'array',
//           label: 'Menu Items (Mobile)',
//           minRows: 1,
//           maxRows: 30,
//           labels: { singular: 'Menu Item', plural: 'Menu Items' },
//           admin: {
//             description:
//               'Mobile menu items. Often mirrors desktop, but can differ if needed (ordering, labels, etc.).',
//           },
//           fields: navItemFields('Item', 0, DEPTH_MAX), // 5 levels: Item -> Child -> Child
//         },
//       ],
//     },

//     /* Optional external portal link on the right side */
//     {
//       name: 'portal',
//       type: 'group',
//       label: 'Right-side “Portal” Link',
//       admin: { description: 'Optional action link (e.g., “My Portal”) on the right in desktop.' },
//       fields: [
//         {
//           type: 'row',
//           fields: [
//             {
//               name: 'label',
//               type: 'text',
//               label: 'Portal Label',
//               maxLength: LABEL_MAX,
//               validate: validateShortText('Portal Label', LABEL_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
//               },
//               defaultValue: 'My Portal',
//             },
//             {
//               name: 'labelBN',
//               type: 'text',
//               label: 'পোর্টাল লেবেল (বাংলা)',
//               maxLength: LABEL_MAX,
//               validate: validateShortTextBN('পোর্টাল লেবেল', LABEL_MAX, false),
//               admin: {
//                 width: '50%',
//                 description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
//               },
//               defaultValue: 'মাই পোর্টাল',
//             },
//           ],
//         },
//         {
//           name: 'href',
//           type: 'text',
//           label: 'Portal URL',
//           maxLength: URL_MAX,
//           validate: validateNavUrl(URL_MAX, false), // allow empty (omit the button)
//           admin: {
//             description: `"#", internal path ("/…"), or full http(s) URL. Max ${URL_MAX} chars (${bnNum(
//               URL_MAX,
//             )}).`,
//           },
//           defaultValue: 'https://portal.shantalife.com/',
//         },
//       ],
//     },
//   ],

//   // hooks: {
//   //   afterChange: [
//   //     async () => {
//   //       revalidateTag(globalTag(GLOBAL_NAVBAR_SLUG_AND_TAG))
//   //     },
//   //   ],
//   // },
//   // ⬇️ add/merge hooks in the Navbar config
//   hooks: {
//     beforeValidate: [...(base.beforeValidate ?? [])],
//     beforeChange: [...(base.beforeChange ?? [])],
//     afterChange: [
//       ...(base.afterChange ?? []),
//       async () => {
//         revalidateTag(globalTag(GLOBAL_NAVBAR_SLUG_AND_TAG))
//       },
//     ],
//   },
// }

// export default Navbar

// ==============================================================================================================================
// ==============================================================================================================================
// ==============================================================================================================================
// src/globals/Navbar.ts
import type { Field, GlobalConfig } from 'payload'

import { globalTag } from '@/lib/cacheTags'
import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants' // export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'global-navbar';
import { bnNum } from '@/lib/utils'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { revalidateTag } from 'next/cache'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { roleAtLeast } from '@/lib/rbac'

const CTA_TEXT_MAX = 100
const LABEL_MAX = 40
const URL_MAX = 300
const DEPTH_MAX = 4 // max depth for nav items (0 = no children, 1 = one level of children, etc.)

/* -------------------------------- validators -------------------------------- */

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    return true
  }

const validateShortTextBN =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} আবশ্যক।`
    if (!s) return true
    if (s.length > max) return `${label} সর্বোচ্চ ${bnNum(max)} অক্ষর হতে পারবে।`
    return true
  }

/** Allow "#", internal path (starts with "/"), or absolute http(s) URL */
const validateNavUrl =
  (max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'Link is required.'
    if (!link) return true
    if (link.length > max) return `Link must be at most ${max} characters.`

    if (link === '#') return true
    if (link.startsWith('/')) return true
    try {
      const u = new URL(link)
      if (u.protocol === 'http:' || u.protocol === 'https:') return true
    } catch {
      /* fall through */
    }
    return 'Link must be "#", start with "/" or be a valid http(s) URL.'
  }

// near other validators
// === Section ID validator ===
// Rules:
//  - required (cannot be empty)
//  - no leading or trailing spaces
//  - no spaces in between
//  - only letters, numbers, and hyphens are allowed
//  - recommend using hyphen for multi-word ids (e.g., "blog-section")
const validateSectionIdOptional = (val: unknown) => {
  const raw = String(val ?? '')

  // required
  if (!raw.trim()) {
    return true // optional
  }

  // no leading/trailing spaces
  if (raw !== raw.trim()) {
    return 'Section ID must not have leading or trailing spaces.'
  }

  const s = raw.trim()

  // no spaces at all
  if (/\s/.test(s)) {
    return 'No spaces allowed. Use "-" to separate words (e.g., "blog-section", not "blog section").'
  }

  // allowed chars: letters, numbers, hyphen
  if (!/^[A-Za-z0-9-]+$/.test(s)) {
    return 'Section ID can only contain letters, numbers, and hyphens (e.g., "blog-section").'
  }

  return true
}

/* -----------------------------------------------------------------------------
   MEDIA LIFECYCLE WIRING
----------------------------------------------------------------------------- */

// ✅ Configure lifecycle for the Navbar global
// CHANGED: track top-level "logo" (not "branding.logo")
const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_NAVBAR_SLUG_AND_TAG, // stamps ownerCollection during finalize
  imageConfigs: [
    {
      fieldName: 'logo', // <— moved out of branding group
      aspectRatio: 1.48, // 1.48 / 1
      quality: 0.92,
      maxKB: 500,
      required: true,
      label: 'Navbar Logo',
      description: 'Primary navbar logo. Transparent PNG/SVG preferred.',
    },
  ],
  onAfterChange: async ({ req }) => {
    await triggerMediaTemporaryPurge(req)
  },
})

// Coerce hooks for GlobalConfig
const pickGlobalHooks = (h: any) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})

const base = pickGlobalHooks(mediaHooks)

/* ------------------------------- nav item fields ------------------------------ */

const navItemFields = (
  levelLabel: string = 'Item',
  depth: number = 0,
  maxDepth: number = 4,
): Field[] => {
  const base: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: `${levelLabel} Label`,
          maxLength: CTA_TEXT_MAX,
          required: true,
          // validate: validateFooterCTAEnglishText,
          admin: {
            width: '50%',
            description: `Optional. Max ${CTA_TEXT_MAX} characters.`,
          },
        },
        {
          name: 'labelBN',
          type: 'text',
          label: `${levelLabel} লেবেল (বাংলা)`,
          maxLength: CTA_TEXT_MAX,
          // validate: validateFooterCTABanglaText,
          required: true,
          admin: {
            width: '50%',
            description: `ঐচ্ছিক। সর্বোচ্চ ${bnNum(CTA_TEXT_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Internal page relationship (preferred)
    {
      type: 'row',
      fields: [
        {
          name: 'href',
          label: 'Link to (internal page)',
          type: 'relationship',
          relationTo: 'pages',
          // validate: validateFooterCTALinkRequiredIfAnyText,
          required: true,
          admin: {
            description:
              'Pick an internal Page to link to. If CTA text is provided, either this or URL (below) is required.',
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
  ]

  if (depth < maxDepth) {
    base.push({
      name: 'children',
      type: 'array',
      label: 'Children',
      minRows: 0,
      maxRows: 20,
      labels: { singular: 'Child', plural: 'Children' },
      admin: {
        description: `Optional submenu items. You can nest up to ${maxDepth + 1} levels.`,
      },
      fields: navItemFields('Child', depth + 1, maxDepth),
    })
  }

  return base
}

/* --------------------------------- config --------------------------------- */

const Navbar: GlobalConfig = {
  slug: GLOBAL_NAVBAR_SLUG_AND_TAG,
  label: 'Navbar',
  admin: {
    description:
      'Global navbar: logo and multi-level navigation (desktop & mobile), plus an optional portal link.',
  },

  access: {
    read: () => true, // public read
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    // NEW: Top-level logo (not inside "branding")
    ...generateImageFields({
      fieldName: 'logo',
      label: 'Navbar Logo',
      description:
        'Primary navbar logo. Transparent PNG/SVG preferred. Square-ish crop recommended.',
      aspectRatio: 1.48 / 1,
      quality: 0.92,
      maxKB: 500,
      required: true,
      ownerCollection: GLOBAL_NAVBAR_SLUG_AND_TAG as any,
    } as any),

    /* Desktop navigation */
    {
      name: 'desktop',
      type: 'group',
      label: 'Desktop Navigation',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Menu Items',
          minRows: 1,
          maxRows: 20,
          labels: { singular: 'Menu Item', plural: 'Menu Items' },
          admin: {
            description:
              'Top-level nav items for desktop. Each item can optionally have nested children.',
          },
          fields: navItemFields('Item', 0, DEPTH_MAX),
        },
      ],
    },

    /* Mobile navigation (separate structure if you want differences) */
    {
      name: 'mobile',
      type: 'group',
      label: 'Mobile Navigation',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Menu Items (Mobile)',
          minRows: 1,
          maxRows: 30,
          labels: { singular: 'Menu Item', plural: 'Menu Items' },
          admin: {
            description:
              'Mobile menu items. Often mirrors desktop, but can differ if needed (ordering, labels, etc.).',
          },
          fields: navItemFields('Item', 0, DEPTH_MAX),
        },
      ],
    },

    /* Optional external portal link on the right side */
    {
      name: 'portal',
      type: 'group',
      label: 'Right-side “Portal” Link',
      admin: { description: 'Optional action link (e.g., “My Portal”) on the right in desktop.' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Portal Label',
              maxLength: LABEL_MAX,
              validate: validateShortText('Portal Label', LABEL_MAX, false),
              admin: {
                width: '50%',
                description: `Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
              },
              defaultValue: 'My Portal',
            },
            {
              name: 'labelBN',
              type: 'text',
              label: 'পোর্টাল লেবেল (বাংলা)',
              maxLength: LABEL_MAX,
              validate: validateShortTextBN('পোর্টাল লেবেল', LABEL_MAX, false),
              admin: {
                width: '50%',
                description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
              },
              defaultValue: 'মাই পোর্টাল',
            },
          ],
        },
        {
          name: 'href',
          type: 'text',
          label: 'Portal URL',
          maxLength: URL_MAX,
          validate: validateNavUrl(URL_MAX, false), // allow empty (omit the button)
          admin: {
            description: `"#", internal path ("/…"), or full http(s) URL. Max ${URL_MAX} chars (${bnNum(
              URL_MAX,
            )}).`,
          },
          defaultValue: 'https://portal.shantalife.com/',
        },
      ],
    },
  ],

  // Merge in lifecycle hooks & keep your revalidateTag
  hooks: {
    beforeValidate: [...(base.beforeValidate ?? [])],
    beforeChange: [...(base.beforeChange ?? [])],
    afterChange: [
      ...(base.afterChange ?? []),
      async () => {
        // Keep your cache revalidation
        revalidateTag(globalTag(GLOBAL_NAVBAR_SLUG_AND_TAG))
      },
    ],
  },
}

export default Navbar
