// import type { Block } from 'payload'

// /* ---------- limits ---------- */
// const BUTTON_LABEL_MAX = 24
// const PATH_MAX = 200

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

// /** Internal path ONLY: must start with "/" (no domain), disallow javascript: */
// const validateInternalPath =
//   (max = PATH_MAX, required = true) =>
//   (val: unknown) => {
//     const p = (val ?? '').toString().trim()
//     if (required && !p) return 'Path is required.'
//     if (!p) return true
//     if (p.length > max) return `Path must be at most ${max} characters.`
//     if (/^\s*javascript:/i.test(p)) return 'Path cannot use the "javascript:" protocol.'
//     if (!p.startsWith('/')) return 'Path must start with "/" and must not include the domain.'
//     // discourage full URLs
//     try {
//       // If user pasted a full URL like https://site.com/abc, tell them to enter only the path.
//       // new URL('/x') throws, so this only triggers for absolute URLs.
//       // eslint-disable-next-line no-new
//       new URL(p)
//       return 'Enter only the path (e.g., "/plans"), not a full URL.'
//     } catch {
//       /* path is fine */
//     }
//     return true
//   }

// export const pageLinkButton: Block = {
//   slug: 'pageLink',
//   labels: {
//     singular: 'Page Link Button',
//     plural: 'Page Link Button',
//   },
//   fields: [
//     {
//       name: 'label',
//       type: 'text',
//       required: true,
//       label: 'Button Text',
//       maxLength: BUTTON_LABEL_MAX,
//       validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
//       admin: { description: `Max ${BUTTON_LABEL_MAX} characters.` },
//     },
//     {
//       name: 'page',
//       type: 'text',
//       required: true,
//       label: 'Link to Page',
//       maxLength: PATH_MAX,
//       validate: validateInternalPath(PATH_MAX, true),
//       admin: {
//         description:
//           'Enter the page path only (no domain). Example: "/plans" or "/premium-calculator".',
//       },
//     },
//     {
//       name: 'style',
//       type: 'select',
//       label: 'Button Style',
//       options: [
//         { label: 'Primary', value: 'primary' },
//         { label: 'Glass', value: 'glass' },
//       ],
//       defaultValue: 'primary',
//     },
//   ],
// }

// ===========================================================================================
// ===========================================================================================
// ===========================================================================================

import type { Block } from 'payload'

/* ---------- limits ---------- */
const BUTTON_LABEL_MAX = 24
const PATH_MAX = 200

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

/** Internal path ONLY: must start with "/" (no domain), disallow javascript: */
const validateInternalPath =
  (max = PATH_MAX, required = true) =>
  (val: unknown) => {
    const p = (val ?? '').toString().trim()
    if (required && !p) return 'Path is required.'
    if (!p) return true
    if (p.length > max) return `Path must be at most ${max} characters.`
    if (/^\s*javascript:/i.test(p)) return 'Path cannot use the "javascript:" protocol.'
    if (!p.startsWith('/')) return 'Path must start with "/" and must not include the domain.'
    try {
      // Will only succeed for absolute URLs; if so, we want to block it.
      // eslint-disable-next-line no-new
      new URL(p)
      return 'Enter only the path (e.g., "/plans"), not a full URL.'
    } catch {
      /* ok – it’s a relative path */
    }
    return true
  }

export const pageLinkButton: Block = {
  slug: 'pageLink',
  labels: {
    singular: 'Page Link Button',
    plural: 'Page Link Button',
  },
  fields: [
    // EN
    {
      name: 'label',
      type: 'text',
      required: true,
      label: 'Button Text',
      maxLength: BUTTON_LABEL_MAX,
      validate: validateShortText('Button Text', BUTTON_LABEL_MAX, true),
      admin: { description: `Max ${BUTTON_LABEL_MAX} characters.` },
    },
    // BN
    {
      name: 'labelBN',
      type: 'text',
      required: true,
      label: 'বাটনের টেক্সট (বাংলা)',
      maxLength: BUTTON_LABEL_MAX,
      validate: validateShortText('Button Text (BN)', BUTTON_LABEL_MAX, true),
      admin: { description: `সর্বোচ্চ ${BUTTON_LABEL_MAX} অক্ষর।` },
    },
    {
      name: 'page',
      type: 'text',
      required: true,
      label: 'Link to Page',
      maxLength: PATH_MAX,
      validate: validateInternalPath(PATH_MAX, true),
      admin: {
        description:
          'Enter the page path only (no domain). Example: "/plans" or "/premium-calculator".',
      },
    },

    // Non-localized control (not user-facing text)
    {
      name: 'style',
      type: 'select',
      label: 'Button Style',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Glass', value: 'glass' },
      ],
      defaultValue: 'primary',
    },
  ],
}
