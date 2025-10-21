// // src/payload/blocks/ContactUs.ts
// import type { Block } from 'payload'
// import { bnNum } from '@/lib/utils'
// import {
//   CONTACT_US_BLOCK_LABEL,
//   CONTACT_US_BLOCK_THUMBNAIL_URL,
//   CONTACT_US_BLOCK_SLUG_AND_TAG,
// } from '@/lib/constants'
// import { generateImageFields } from '@/utils/media/fieldGenerators'

// /* ---------------- limits ---------------- */
// const COLOR_HEX_LEN = 7
// const TITLE_MAX = 80
// const SUBTITLE_MAX = 120
// const EMAIL_MAX = 120

// /* ---------------- validators ---------------- */
// const validateHexColor = (val: unknown) => {
//   if (val == null || val === '') return true
//   const s = String(val).trim()
//   if (!/^#[0-9A-Fa-f]{6}$/.test(s)) {
//     return 'Must be a valid hex color in #RRGGBB (e.g., #FFFFFF).'
//   }
//   return true
// }

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

// /* ---------------- block ---------------- */
// const ContactUsSchema: Block = {
//   slug: CONTACT_US_BLOCK_SLUG_AND_TAG,
//   labels: {
//     singular: CONTACT_US_BLOCK_LABEL,
//     plural: CONTACT_US_BLOCK_LABEL,
//   },

//   imageURL: CONTACT_US_BLOCK_THUMBNAIL_URL,
//   imageAltText: `${CONTACT_US_BLOCK_LABEL} preview`,

//   fields: [
//     // hidden session id (cooperates with media lifecycle)
//     { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

//     // Appearance
//     {
//       name: 'backgroundColor',
//       type: 'text',
//       label: 'Section Background Color',
//       maxLength: COLOR_HEX_LEN,
//       validate: validateHexColor,
//       defaultValue: '#F6EDDD',
//       admin: {
//         width: '33%',
//         description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(
//           COLOR_HEX_LEN,
//         )}).`,
//       },
//     },

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

//     ...generateImageFields({
//       fieldName: 'image',
//       label: 'Section Image (891:489)',
//       description: 'Main visual near the form. 891:489 recommended.',
//       aspectRatio: 891 / 489,
//       quality: 0.9,
//       maxKB: 400,
//       // ownerCollection will be stamped by withMediaLifecycle since this is on "pages" blocks
//     } as any),

//     // Recipient Emails (at least one required)
//     {
//       type: 'group',
//       name: 'recipientEmails',
//       label: 'Recipient Emails (1–3)',
//       admin: {
//         description: 'Provide at least one email address. All valid ones will receive the message.',
//       },
//       validate: (_val, { siblingData }: any) => {
//         const g = siblingData?.recipientEmails ?? {}
//         const any =
//           !!(g.email1 && String(g.email1).trim()) ||
//           !!(g.email2 && String(g.email2).trim()) ||
//           !!(g.email3 && String(g.email3).trim())
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
//       ],
//     },
//   ],
// }

// export default ContactUsSchema

// =========================================================================================
// =========================================================================================
// =========================================================================================

// src/payload/blocks/ContactUs.ts
import type { Block } from 'payload'
import { bnNum } from '@/lib/utils'
import {
  CONTACT_US_BLOCK_LABEL,
  CONTACT_US_BLOCK_THUMBNAIL_URL,
  CONTACT_US_BLOCK_SLUG_AND_TAG,
} from '@/lib/constants'
import { generateImageFields } from '@/utils/media/fieldGenerators'

/* ---------------- limits ---------------- */
const COLOR_HEX_LEN = 7
const TITLE_MAX = 80
const SUBTITLE_MAX = 120
const EMAIL_MAX = 120
const FROM_NAME_MAX = 80

/* ---------------- validators ---------------- */
const validateHexColor = (val: unknown) => {
  if (val == null || val === '') return true
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

const validateEmail =
  (label = 'Email', required = false) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > EMAIL_MAX) return `${label} must be at most ${EMAIL_MAX} characters.`
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? true : `Provide a valid email for ${label}.`
  }

/* ---------------- block ---------------- */
const ContactUsSchema: Block = {
  slug: CONTACT_US_BLOCK_SLUG_AND_TAG,
  labels: {
    singular: CONTACT_US_BLOCK_LABEL,
    plural: CONTACT_US_BLOCK_LABEL,
  },

  imageURL: CONTACT_US_BLOCK_THUMBNAIL_URL,
  imageAltText: `${CONTACT_US_BLOCK_LABEL} preview`,

  fields: [
    // hidden session id (cooperates with media lifecycle)
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false } },

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
        description: `Hex color in #RRGGBB (e.g., #F6EDDD). Length ${COLOR_HEX_LEN} (${bnNum(
          COLOR_HEX_LEN,
        )}).`,
      },
    },

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

    // Generated image (with original + compressed and alt management)
    ...generateImageFields({
      fieldName: 'image',
      label: 'Section Image (891:489)',
      description: 'Main visual near the form. 891:489 recommended.',
      aspectRatio: 891 / 489,
      quality: 0.9,
      maxKB: 400,
      // ownerCollection stamped by withMediaLifecycle (pages)
    } as any),

    // Recipient Emails (at least one required)
    {
      type: 'group',
      name: 'recipientEmails',
      label: 'Recipient Emails (1–3)',
      admin: {
        description: 'Provide at least one email address. All valid ones will receive the message.',
      },
      validate: (_val, { siblingData }: any) => {
        const g = siblingData?.recipientEmails ?? {}
        const any =
          !!(g.email1 && String(g.email1).trim()) ||
          !!(g.email2 && String(g.email2).trim()) ||
          !!(g.email3 && String(g.email3).trim())
        return any ? true : 'Provide at least one recipient email.'
      },
      fields: [
        {
          name: 'email1',
          type: 'text',
          label: 'Recipient Email 1',
          maxLength: EMAIL_MAX,
          validate: validateEmail('Recipient Email 1', false),
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
      ],
    },

    // Sender override (optional): lets admin set the From Name/Email used by the API route
    {
      type: 'group',
      name: 'senderOverride',
      label: 'Sender Override (optional)',
      admin: {
        description:
          'If set, emails from this block will use this From name/email instead of the default env (SMTP_MAIL_FROM).',
      },
      fields: [
        {
          name: 'fromName',
          type: 'text',
          label: 'From Name',
          maxLength: FROM_NAME_MAX,
          validate: validateShortText('From Name', FROM_NAME_MAX, false),
          admin: { width: '50%' },
        },
        {
          name: 'fromEmail',
          type: 'text',
          label: 'From Email',
          maxLength: EMAIL_MAX,
          validate: validateEmail('From Email', false),
          admin: { width: '50%' },
        },
      ],
    },

    {
      name: 'termsAndConditionButtonLink',
      label: 'Link To Terms And Conditions (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
      },
    },
    {
      name: 'privacyPolicyButtonLink',
      label: 'Link To Privacy Policy (internal page)',
      type: 'relationship',
      relationTo: 'pages',
      required: true,
      admin: {
        description:
          'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
      },
    },
  ],
}

export default ContactUsSchema
