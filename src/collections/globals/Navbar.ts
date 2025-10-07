// src/globals/Navbar.ts
import type { GlobalConfig } from 'payload'
import type { Field } from 'payload' // <-- fixes TS7023 when we type the recursive helper

import { bnNum } from '@/lib/utils'
import { GLOBAL_NAVBAR_SLUG_AND_TAG } from '@/lib/constants' // add: export const GLOBAL_NAVBAR_SLUG_AND_TAG = 'global-navbar';

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

/* ------------------------------- nav item fields ------------------------------ */
/**
 * Depth-limited recursive fields for menu items.
 * - levelLabel: used in labels/help text (e.g., "Item", "Child")
 * - depth/maxDepth: prevents infinite recursion (default 3 levels)
 */
const navItemFields = (
  levelLabel: string = 'Item',
  depth: number = 0,
  maxDepth: number = 4,
): Field[] => {
  // base fields (label/en + labelBN + href)
  const base: Field[] = [
    {
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: `${levelLabel} Label`,
          required: true,
          maxLength: LABEL_MAX,
          validate: validateShortText(`${levelLabel} Label`, LABEL_MAX, true),
          admin: {
            width: '50%',
            description: `Max ${LABEL_MAX} chars (${bnNum(LABEL_MAX)}).`,
          },
        },
        {
          name: 'labelBN',
          type: 'text',
          label: `${levelLabel} লেবেল (বাংলা)`,
          required: true,
          maxLength: LABEL_MAX,
          validate: validateShortTextBN(`${levelLabel} লেবেল`, LABEL_MAX, true),
          admin: {
            width: '50%',
            description: `সর্বোচ্চ ${bnNum(LABEL_MAX)} অক্ষর।`,
          },
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
        description: `Use "#", start with "/", or a full http(s) URL. Max ${URL_MAX} chars (${bnNum(
          URL_MAX,
        )}).`,
      },
    },
  ]

  // add children only if we’re below max depth
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
  fields: [
    /* Branding (logo) */
    {
      name: 'branding',
      type: 'group',
      label: 'Branding',
      fields: [
        {
          name: 'logo',
          label: 'Navbar Logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Primary logo shown in the navbar. Recommended transparent PNG/SVG.',
          },
        },
      ],
    },

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
          fields: navItemFields('Item', 0, DEPTH_MAX), // 5 levels: Item -> Child -> Child
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
          fields: navItemFields('Item', 0, DEPTH_MAX), // 5 levels: Item -> Child -> Child
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
}

export default Navbar
