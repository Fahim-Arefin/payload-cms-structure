import { bnNum } from './../../lib/utils'
// import type { Block } from 'payload'

// /* ---------- limits ---------- */
// const BUTTON_LABEL_MAX = 24
// const PHONE_MAX = 40

// /* ---------- validators ---------- */
// const validateShortText =
//   (label: string, max: number, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return `${label} is required.`
//     if (!s) return true
//     if (s.length > max) return `${label} must be at most ${max} characters.`
//     return true
//   }

// const validatePhone =
//   (max = PHONE_MAX, required = true) =>
//   (val: unknown) => {
//     const s = (val ?? '').toString().trim()
//     if (required && !s) return 'Phone number is required.'
//     if (!s) return true
//     if (s.length > max) return `Phone number must be at most ${max} characters.`
//     // allow +, digits, spaces, dashes, parentheses; 6–20 chars; at least 6 digits overall
//     if (!/^\+?[0-9 ()-]{6,20}$/.test(s)) return 'Please enter a valid phone number.'
//     const digits = s.replace(/\D/g, '')
//     if (digits.length < 6) return 'Phone number must contain at least 6 digits.'
//     return true
//   }

// export const callNowButton: Block = {
//   slug: 'callNow',
//   labels: {
//     singular: 'Call Now Button',
//     plural: 'Call Now Button',
//   },
//   fields: [
//     {
//       name: 'label',
//       type: 'text',
//       required: true,
//       label: 'Button Text',
//       defaultValue: 'Call Now',
//       maxLength: BUTTON_LABEL_MAX,
//       validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
//       admin: { description: `Max ${BUTTON_LABEL_MAX} characters.` },
//     },
//     {
//       name: 'phoneNumber',
//       type: 'text',
//       required: true,
//       label: 'Phone Number',
//       maxLength: PHONE_MAX,
//       validate: validatePhone(PHONE_MAX, true),
//       admin: { description: 'Example: +88 09610889900' },
//     },
//     {
//       name: 'style',
//       type: 'select',
//       label: 'Button Style',
//       options: [
//         { label: 'Primary', value: 'primary' },
//         { label: 'Glass', value: 'glass' },
//       ],
//       defaultValue: 'glass',
//     },
//   ],
// }

// ============================================================================================
// ============================================================================================
// ============================================================================================

import type { Block } from 'payload'

/* ---------- limits ---------- */
const BUTTON_LABEL_MAX = 40
const PHONE_MAX = 40

/* ---------- validators ---------- */
const validateShortText =
  (label: string, max: number, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    return true
  }

const validatePhone =
  (max = PHONE_MAX, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return 'Phone number is required.'
    if (!s) return true
    if (s.length > max) return `Phone number must be at most ${max} characters.`
    // allow +, digits, spaces, dashes, parentheses; 6–20 chars; at least 6 digits overall
    if (!/^\+?[0-9 ()-]{6,20}$/.test(s)) return 'Please enter a valid phone number.'
    const digits = s.replace(/\D/g, '')
    if (digits.length < 6) return 'Phone number must contain at least 6 digits.'
    return true
  }

export const callNowButton: Block = {
  slug: 'callNow',
  labels: {
    singular: 'Call Now Button',
    plural: 'Call Now Button',
  },
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
          defaultValue: 'Call Now',
          maxLength: BUTTON_LABEL_MAX,
          validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
          admin: { width: '50%', description: `Max ${BUTTON_LABEL_MAX} characters.` },
        },
        // BN twins
        {
          name: 'labelBN',
          type: 'text',
          required: true,
          label: 'বাটনের টেক্সট (বাংলা)',
          defaultValue: 'কল করুন',
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
          name: 'phoneNumber',
          type: 'text',
          required: true,
          label: 'Phone Number',
          maxLength: PHONE_MAX,
          validate: validatePhone(PHONE_MAX, true),
          defaultValue: '09610889900',
          admin: { width: '33%', description: 'Example: +88 09610889900' },
        },

        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Glass', value: 'glass' },
          ],
          defaultValue: 'glass',
          admin: {
            width: '33%',
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
            width: '33%',
            description: 'Select the button size',
          },
        },
      ],
    },
  ],
}
