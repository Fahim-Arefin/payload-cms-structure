// // current code
// import type { GlobalConfig } from 'payload'
// import { bnNum } from '@/lib/utils'
// import { revalidateTag } from 'next/cache'
// import { globalTag } from '@/lib/cacheTags'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
// import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
// import {
//   GLOBAL_CONTACT_US_SLUG_AND_TAG,
//   GLOBAL_CONTACT_US_BLOCK_LABEL,
//   CONTACT_US_BLOCK_SLUG_AND_TAG,
// } from '@/lib/constants'

// /* ---------------- limits ---------------- */
// const TITLE_MAX = 80
// const SUBTITLE_MAX = 120
// const EMAIL_MAX = 120
// const FROM_NAME_MAX = 80

// /* ---------------- validators ---------------- */

// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     return s.length <= max ? true : `${label} must be at most ${max} characters.`
//   }

// const validateEmail =
//   (label = 'Email', required = false) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > EMAIL_MAX) return `${label} must be at most ${EMAIL_MAX} characters.`
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? true : `Provide a valid email for ${label}.`
//   }

// /* ---------------- media lifecycle (image at top-level) ---------------- */
// const mediaHooks = withMediaLifecycle({
//   collectionSlug: GLOBAL_CONTACT_US_SLUG_AND_TAG, // ownerCollection stamping
//   imageConfigs: [
//     {
//       fieldName: 'image', // top-level
//       aspectRatio: 891 / 489,
//       quality: 0.9,
//       maxKB: 400,
//       required: false,
//       label: 'Section Image',
//       description: 'Main visual near the form. 891×489 recommended.',
//     },
//   ],
//   onAfterChange: async ({ req }) => {
//     await triggerMediaTemporaryPurge(req)
//   },
// })

// const pickGlobalHooks = (h: any) => ({
//   beforeValidate: h?.beforeValidate ?? [],
//   beforeChange: h?.beforeChange ?? [],
//   afterChange: h?.afterChange ?? [],
// })

// const base = pickGlobalHooks(mediaHooks)

// /* ---------------- global ---------------- */
// const ContactUsGlobal: GlobalConfig = {
//   slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
//   label: GLOBAL_CONTACT_US_BLOCK_LABEL,
//   admin: {
//     description: 'Global Contact Us configuration (title, copy, recipients, image, links).',
//   },
//   fields: [
//     // hidden session id (cooperates with media lifecycle)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Section Title / Subtitle (EN + BN)
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'title',
//           type: 'text',
//           required: true,
//           label: 'Section Title',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Primary heading above the form. Max ${TITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'titleBN',
//           type: 'text',
//           required: true,
//           label: 'সেকশন শিরোনাম (বাংলা)',
//           maxLength: TITLE_MAX,
//           validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `ফর্মের উপরের প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },
//     {
//       type: 'row',
//       fields: [
//         {
//           name: 'subtitle',
//           type: 'text',
//           required: true,
//           label: 'Section Subtitle',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Section Subtitle', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `Supporting line under the title. Max ${SUBTITLE_MAX} characters.`,
//           },
//         },
//         {
//           name: 'subtitleBN',
//           type: 'text',
//           required: true,
//           label: 'উপশিরোনাম (বাংলা)',
//           maxLength: SUBTITLE_MAX,
//           validate: validateShortText('Section Subtitle (BN)', SUBTITLE_MAX, true),
//           admin: {
//             width: '50%',
//             description: `শিরোনামের নিচের সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
//           },
//         },
//       ],
//     },

//     // Section Image (top-level, not inside any group)
//     ...generateImageFields({
//       fieldName: 'image',
//       label: 'Section Image (891×489)',
//       description: 'Main visual near the form. 891×489 recommended.',
//       aspectRatio: 891 / 489,
//       quality: 0.9,
//       maxKB: 400,
//     } as any),

//     // Recipient Emails (now 1–5)
//     {
//       type: 'group',
//       name: 'recipientEmails',
//       label: 'Recipient Emails (1–5)', // ← updated label
//       admin: {
//         description:
//           'Provide at least one email address. All valid ones will receive the message through email.',
//       },
//       validate: (_val, { siblingData }: any) => {
//         const g = siblingData?.recipientEmails ?? {}
//         const any =
//           !!(g.email1 && String(g.email1).trim()) ||
//           !!(g.email2 && String(g.email2).trim()) ||
//           !!(g.email3 && String(g.email3).trim()) ||
//           !!(g.email4 && String(g.email4).trim()) || // ← added
//           !!(g.email5 && String(g.email5).trim()) // ← added
//         return any ? true : 'Provide at least one recipient email.'
//       },
//       fields: [
//         {
//           name: 'email1',
//           type: 'text',
//           label: 'Recipient Email 1',
//           maxLength: EMAIL_MAX,
//           validate: validateEmail('Recipient Email 1', false),
//           admin: { width: '33%' },
//         },
//         {
//           name: 'email2',
//           type: 'text',
//           label: 'Recipient Email 2',
//           maxLength: EMAIL_MAX,
//           validate: validateEmail('Recipient Email 2', false),
//           admin: { width: '33%' },
//         },
//         {
//           name: 'email3',
//           type: 'text',
//           label: 'Recipient Email 3',
//           maxLength: EMAIL_MAX,
//           validate: validateEmail('Recipient Email 3', false),
//           admin: { width: '33%' },
//         },
//         {
//           name: 'email4',
//           type: 'text',
//           label: 'Recipient Email 4', // ← new field
//           maxLength: EMAIL_MAX,
//           validate: validateEmail('Recipient Email 4', false),
//           admin: { width: '33%' },
//         },
//         {
//           name: 'email5',
//           type: 'text',
//           label: 'Recipient Email 5', // ← new field
//           maxLength: EMAIL_MAX,
//           validate: validateEmail('Recipient Email 5', false),
//           admin: { width: '33%' },
//         },
//       ],
//     },

//     // Sender override (optional)
//     {
//       type: 'group',
//       name: 'senderOverride',
//       label: 'Sender Override (optional)',
//       admin: {
//         description:
//           'If set, emails from this global will use this From name/replay email instead of the default env (SMTP_MAIL_FROM).',
//       },
//       fields: [
//         {
//           name: 'fromName',
//           type: 'text',
//           label: 'Sender Name',
//           maxLength: FROM_NAME_MAX,
//           validate: validateShortText('From Name', FROM_NAME_MAX, false),
//           admin: {
//             width: '50%',
//             description:
//               'Optional display name shown in the recipient’s inbox as the sender name. If omitted, ‘Shanta Life’ is used.',
//           },
//         },
//         {
//           name: 'fromEmail',
//           type: 'text',
//           label: 'Reply Email Address', // ← clearer label
//           maxLength: EMAIL_MAX,
//           validate: validateEmail('From Email Address', false),
//           admin: {
//             width: '50%',
//             description:
//               'If set, recipient replies are directed to this email. If not set, replies go to the default SMTP sender address.',
//           },
//         },
//       ],
//     },

//     // Internal page relationships for buttons
//     {
//       name: 'termsAndConditionButtonLink',
//       label: 'Link to Terms & Conditions (internal page)', // ← label refined
//       type: 'relationship',
//       relationTo: 'pages',
//       required: true,
//       admin: {
//         description:
//           'Pick an internal Page to link to. External URLs are not allowed. Click navigates to the linked page.',
//       },
//     },
//     {
//       name: 'privacyPolicyButtonLink',
//       label: 'Link to Privacy Policy (internal page)', // ← label refined
//       type: 'relationship',
//       relationTo: 'pages',
//       required: true,
//       admin: {
//         description:
//           'Pick an internal Page to link to. External URLs are not allowed. Click navigates to the linked page.',
//       },
//     },
//   ],

//   hooks: {
//     beforeValidate: [...(base.beforeValidate ?? [])],
//     beforeChange: [...(base.beforeChange ?? [])],
//     afterChange: [
//       ...(base.afterChange ?? []),
//       async () => {
//         revalidateTag(globalTag(GLOBAL_CONTACT_US_SLUG_AND_TAG))
//         revalidateTag(CONTACT_US_BLOCK_SLUG_AND_TAG)
//       },
//     ],
//   },
// }

// export default ContactUsGlobal

// ===============================================================
// ===============================================================
// ===============================================================
// current code
import type { GlobalConfig } from 'payload'
import { bnNum } from '@/lib/utils'
import { revalidateTag } from 'next/cache'
import { globalTag } from '@/lib/cacheTags'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import {
  GLOBAL_CONTACT_US_SLUG_AND_TAG,
  GLOBAL_CONTACT_US_BLOCK_LABEL,
  CONTACT_US_BLOCK_SLUG_AND_TAG,
} from '@/lib/constants'

/* ---------------- limits ---------------- */
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const EMAIL_MAX = 120
const FROM_NAME_MAX = 80
const DESC_MAX = 400

/* ---------------- validators ---------------- */

const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    return s.length <= max ? true : `${label} must be at most ${max} characters.`
  }

const validateEmail =
  (label = 'Email', required = false) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > EMAIL_MAX) return `${label} must be at most ${EMAIL_MAX} characters.`
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? true : `Provide a valid email for ${label}.`
  }

const validateAtLeastOneRecipientEmail = (val: unknown) => {
  const g = (val ?? {}) as Record<string, unknown>

  const hasAny = ['email1', 'email2', 'email3', 'email4', 'email5'].some((key) => {
    const v = g?.[key]
    return typeof v === 'string' && v.trim().length > 0
  })

  return hasAny ? true : 'Provide at least one recipient email.'
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

/* ---------------- media lifecycle (image at top-level) ---------------- */
const mediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_CONTACT_US_SLUG_AND_TAG, // ownerCollection stamping
  imageConfigs: [
    {
      fieldName: 'image', // top-level
      aspectRatio: 891 / 489,
      quality: 0.9,
      maxKB: 400,
      required: false,
      label: 'Section Image',
      description: 'Main visual near the form. 891×489 recommended.',
    },
  ],
  onAfterChange: async ({ req }) => {
    await triggerMediaTemporaryPurge(req)
  },
})

const pickGlobalHooks = (h: any) => ({
  beforeValidate: h?.beforeValidate ?? [],
  beforeChange: h?.beforeChange ?? [],
  afterChange: h?.afterChange ?? [],
})

const base = pickGlobalHooks(mediaHooks)

/* ---------------- global ---------------- */
const ContactUsGlobal: GlobalConfig = {
  slug: GLOBAL_CONTACT_US_SLUG_AND_TAG,
  label: GLOBAL_CONTACT_US_BLOCK_LABEL,
  admin: {
    description: 'Global Contact Us configuration (title, copy, recipients, image, links).',
  },
  fields: [
    // hidden session id (cooperates with media lifecycle)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

    // Section Title / Subtitle (EN + BN)
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          label: 'Section Title',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Primary heading above the form. Max ${TITLE_MAX} characters.`,
          },
        },
        {
          name: 'titleBN',
          type: 'text',
          required: true,
          label: 'সেকশন শিরোনাম (বাংলা)',
          maxLength: TITLE_MAX,
          validate: validateShortText('Section Title (BN)', TITLE_MAX, true),
          admin: {
            width: '50%',
            description: `ফর্মের উপরের প্রধান শিরোনাম। সর্বোচ্চ ${bnNum(TITLE_MAX)} অক্ষর।`,
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
          label: 'Section Subtitle',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `Supporting line under the title. Max ${SUBTITLE_MAX} characters.`,
          },
        },
        {
          name: 'subtitleBN',
          type: 'text',
          required: true,
          label: 'উপশিরোনাম (বাংলা)',
          maxLength: SUBTITLE_MAX,
          validate: validateShortText('Section Subtitle (BN)', SUBTITLE_MAX, true),
          admin: {
            width: '50%',
            description: `শিরোনামের নিচের সহায়ক লাইন। সর্বোচ্চ ${bnNum(SUBTITLE_MAX)} অক্ষর।`,
          },
        },
      ],
    },

    // Section Image (top-level, not inside any group)
    ...generateImageFields({
      fieldName: 'image',
      label: 'Section Image (891×489)',
      description: 'Main visual near the form. 891×489 recommended.',
      aspectRatio: 891 / 489,
      quality: 0.9,
      maxKB: 400,
    } as any),

    // Recipient Emails (now 1–5)
    {
      type: 'group',
      name: 'recipientEmails',
      label: 'Recipient Emails (1–5)', // ← updated label
      admin: {
        description:
          'Provide at least one email address. All valid ones will receive the message through email.',
      },
      validate: validateAtLeastOneRecipientEmail,
      fields: [
        {
          name: 'email1',
          type: 'text',
          label: 'Recipient Email 1',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 1', true),
          admin: { width: '33%' },
        },
        {
          name: 'email2',
          type: 'text',
          label: 'Recipient Email 2',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 2', false),
          admin: { width: '33%' },
        },
        {
          name: 'email3',
          type: 'text',
          label: 'Recipient Email 3',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 3', false),
          admin: { width: '33%' },
        },
        {
          name: 'email4',
          type: 'text',
          label: 'Recipient Email 4', // ← new field
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 4', false),
          admin: { width: '33%' },
        },
        {
          name: 'email5',
          type: 'text',
          label: 'Recipient Email 5', // ← new field
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 5', false),
          admin: { width: '33%' },
        },
      ],
    },

    // Sender override (optional)
    {
      type: 'group',
      name: 'senderOverride',
      label: 'Sender Override (optional)',
      admin: {
        description:
          'If set, emails from this global will use this From name/replay email instead of the default env (SMTP_MAIL_FROM).',
      },
      fields: [
        {
          name: 'fromName',
          type: 'text',
          label: 'Sender Name',
          maxLength: FROM_NAME_MAX,
          validate: validateShortText('From Name', FROM_NAME_MAX, false),
          admin: {
            width: '50%',
            description:
              'Optional display name shown in the recipient’s inbox as the sender name. If omitted, ‘Shanta Life’ is used.',
          },
        },
        {
          name: 'fromEmail',
          type: 'text',
          label: 'Reply Email Address', // ← clearer label
          maxLength: EMAIL_MAX,
          validate: validateEmail('From Email Address', false),
          admin: {
            width: '50%',
            description:
              'If set, recipient replies are directed to this email. If not set, replies go to the default SMTP sender address.',
          },
        },
      ],
    },

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

  hooks: {
    beforeValidate: [...(base.beforeValidate ?? [])],
    beforeChange: [...(base.beforeChange ?? [])],
    afterChange: [
      ...(base.afterChange ?? []),
      async () => {
        revalidateTag(globalTag(GLOBAL_CONTACT_US_SLUG_AND_TAG))
        revalidateTag(CONTACT_US_BLOCK_SLUG_AND_TAG)
      },
    ],
  },
}

export default ContactUsGlobal
