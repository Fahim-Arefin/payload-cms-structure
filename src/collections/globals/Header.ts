// src/globals/Header.ts
import type { GlobalConfig } from 'payload'
import { bnNum } from '@/lib/utils'
import { GLOBAL_HEADER_SLUG_AND_TAG } from '@/lib/constants'
import { revalidateTag } from 'next/cache'
import { globalTag } from '@/lib/cacheTags'
import { hasRole } from '@/lib/rbac';
import { getClientIP } from '@/lib/http'


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

/* ---------------- global ---------------- */
const Header: GlobalConfig = {
  slug: GLOBAL_HEADER_SLUG_AND_TAG,
  access: {
  read: () => true, // site needs to read it
  update: ({ req }) => hasRole(req.user, ['admin', 'super-admin']),
},
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
          type: 'row',
          fields: [
            // {
            //   name: 'href',
            //   type: 'text',
            //   label: 'URL / Path',
            //   required: true,
            //   maxLength: URL_MAX,
            //   validate: validateNavUrl(URL_MAX, true),
            //   admin: {
            //     description: `Starts with "/" or a full http(s) URL. Max ${URL_MAX} chars (${bnNum(
            //       URL_MAX,
            //     )}).`,
            //   },
            // },
            {
              name: 'href',
              label: 'Link to (internal page)',
              type: 'relationship',
              relationTo: 'pages',
              // validate: validateFooterCTALinkRequiredIfAnyText,
              required: true,
              admin: {
                width: '50%',
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
    async ({ req, doc, previousDoc }) => {
      // revalidate existing tag (yours)
      revalidateTag(globalTag(GLOBAL_HEADER_SLUG_AND_TAG));

      // NEW: audit
      try {
        await req.payload.create({
          collection: 'audit-logs',
          data: {
            action: 'settings-update',
            targetCollection: 'globals',
            docId: GLOBAL_HEADER_SLUG_AND_TAG,
            actor: req.user?.id ?? null,
            ip: getClientIP(req),
            diff: { before: previousDoc ?? null, after: doc ?? null },
          },
        });
      } catch (e) {
        req.payload.logger.error('Audit log (header) failed', e);
      }
    },
  ],
  },
}

export default Header
