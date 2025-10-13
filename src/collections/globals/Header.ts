// src/globals/Header.ts
import type { GlobalConfig } from 'payload'
import { bnNum } from '@/lib/utils'
import { GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'
import { revalidateTag } from 'next/cache'
import { globalTag } from '@/lib/cacheTags'

const LABEL_MAX = 60
const URL_MAX = 300

/* ---------------- validators ---------------- */
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

/** Allow internal path (starts with "/") OR absolute http(s) URL. */
const validateNavUrl =
  (max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'Link is required.'
    if (!link) return true
    if (link.length > max) return `Link must be at most ${max} characters.`
    if (link.startsWith('/')) return true
    try {
      const u = new URL(link)
      if (u.protocol === 'http:' || u.protocol === 'https:') return true
    } catch {
      /* ignore */
    }
    return 'Link must start with "/" or be a valid http(s) URL.'
  }

/* ---------------- global ---------------- */
const Header: GlobalConfig = {
  slug: GLOBAL_HEADER_SLUG_AND_TAG,
  label: 'Header',
  admin: {
    description:
      'Top strip above navbar: flat set of links (non-nested) and whether to show the language toggle.',
  },

  fields: [
    // Flat list of simple links (no nesting)
    {
      name: 'links',
      type: 'array',
      label: 'Links',
      minRows: 0,
      maxRows: 10,
      labels: { singular: 'Link', plural: 'Links' },
      admin: {
        description:
          'Add simple links for the top header. No nesting. Each link has EN/BN label and a URL/path.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              maxLength: LABEL_MAX,
              validate: validateShortText('Label', LABEL_MAX, true),
              admin: { width: '50%', description: `Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).` },
            },
            {
              name: 'labelBN',
              type: 'text',
              label: 'লেবেল (বাংলা)',
              required: true,
              maxLength: LABEL_MAX,
              validate: validateShortTextBN('লেবেল', LABEL_MAX, true),
              admin: { width: '50%', description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।` },
            },
          ],
        },
        {
          name: 'href',
          type: 'text',
          label: 'URL / Path',
          required: true,
          maxLength: URL_MAX,
          validate: validateNavUrl(URL_MAX, true),
          admin: {
            description: `Starts with "/" or a full http(s) URL. Max ${URL_MAX} chars (${bnNum(
              URL_MAX,
            )}).`,
          },
        },
      ],
    },
    // Show language toggle (BN/EN)
    {
      name: 'showLocalizationToggle',
      type: 'checkbox',
      label: 'Show BN/EN toggle',
      defaultValue: true,
      admin: { description: 'Enable / disable the language switcher in the top header.' },
    },
  ],

  hooks: {
    afterChange: [
      async () => {
        revalidateTag(globalTag(GLOBAL_HEADER_SLUG_AND_TAG))
      },
    ],
  },
}

export default Header
