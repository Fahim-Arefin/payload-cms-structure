import {
  HERO_LINK_BUTTON_BLOCK_LABEL,
  HERO_LINK_BUTTON_BLOCK_THUMBNAIL_URL,
  HERO_LINK_BUTTON_SLUG_AND_TAG,
} from '@/lib/constants'
import { bnNum } from './../../lib/utils'
import type { Block } from 'payload'

/* ---------- limits ---------- */
const BUTTON_LABEL_MAX = 40
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

      new URL(p)
      return 'Enter only the path (e.g., "/plans"), not a full URL.'
    } catch {
      /* ok – it’s a relative path */
    }
    return true
  }

export const pageLinkButton: Block = {
  slug: HERO_LINK_BUTTON_SLUG_AND_TAG,
  labels: {
    singular: HERO_LINK_BUTTON_BLOCK_LABEL,
    plural: HERO_LINK_BUTTON_BLOCK_LABEL,
  },

  imageURL: HERO_LINK_BUTTON_BLOCK_THUMBNAIL_URL,
  imageAltText: `${HERO_LINK_BUTTON_BLOCK_LABEL} preview`,

  // link-button-block-thumbnail.png
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
    // {
    //   name: 'page',
    //   type: 'text',
    //   required: true,
    //   label: 'Link to Page',
    //   maxLength: PATH_MAX,
    //   validate: validateInternalPath(PATH_MAX, true),
    //   admin: {
    //     description:
    //       'Enter the page path only (no domain). Example: "/plans" or "/premium-calculator".',
    //   },
    // },

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
            width: '33%',
            description:
              'Pick an internal Page to link to. External URLs are not allowed. When click on this button it will navigate to linked page, specify that page here',
          },
        },

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
