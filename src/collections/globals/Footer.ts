// src/globals/Footer.ts
import type { GlobalConfig } from 'payload'
import { GLOBAL_FOOTER_SLUG_AND_TAG } from '@/lib/constants'
import { revalidateTag } from 'next/cache'
import { globalTag } from '@/lib/cacheTags'
import { withMediaLifecycle } from '@/utils/media/withMediaLifecycle'
import { triggerMediaTemporaryPurge } from '@/utils/media/triggerMediaTemporaryPurge'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import { roleAtLeast } from '@/lib/rbac'

/* ---------------- max length constants ---------------- */
const EMAIL_MAX = 120
const PHONE_MAX = 40
const ADDRESS_MAX = 220
const LABEL_MAX = 40
const URL_MAX = 300
const COPYRIGHT_MAX = 200
const COPYRIGHT_HILITE_MAX = 120
const CTA_TEXT_MAX = 60
const INTRO_MAX = 180
const MARQUEE_MAX = 120
const PRODUCT_MAX = 100

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

const validateEmail =
  (max = EMAIL_MAX, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return 'Email is required.'
    if (!s) return true
    if (s.length > max) return `Email must be at most ${max} characters.`
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s) ? true : 'Provide a valid email address.'
  }

const validatePhone =
  (max = PHONE_MAX, required = true) =>
  (val: unknown) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return 'Phone is required.'
    if (!s) return true
    if (s.length > max) return `Phone must be at most ${max} characters.`
    if (!/^\+?[0-9 ()-]{6,20}$/.test(s)) return 'Provide a valid phone number.'
    const digits = s.replace(/\D/g, '')
    if (digits.length < 6) return 'Phone must contain at least 6 digits.'
    return true
  }

const validateAbsoluteHTTPUrl =
  (max = URL_MAX, required = true) =>
  (val: unknown) => {
    const link = (val ?? '').toString().trim()
    if (required && !link) return 'URL is required.'
    if (!link) return true
    if (link.length > max) return `URL must be at most ${max} characters.`
    try {
      const u = new URL(link)
      return u.protocol === 'http:' || u.protocol === 'https:' ? true : 'URL must be http(s).'
    } catch {
      return 'Provide a valid absolute http(s) URL.'
    }
  }

const validateMaxItems = (labelPlural: string, max: number) => (val: unknown) => {
  if (!Array.isArray(val)) return true
  if (val.length > max) return `Provide at most ${max} ${labelPlural.toLowerCase()}.`
  return true
}

const validateHighlightedInField =
  (label: string, targetField: string, max = COPYRIGHT_HILITE_MAX, required = false) =>
  (val: unknown, { siblingData }: any) => {
    const s = (val ?? '').toString().trim()
    if (required && !s) return `${label} is required.`
    if (!s) return true
    if (s.length > max) return `${label} must be at most ${max} characters.`
    const target = (siblingData?.[targetField] ?? '').toString()
    return target.includes(s) ? true : `${label} must exist within ${targetField} exactly.`
  }

/* ---------------- media lifecycle ---------------- */
const footerMediaHooks = withMediaLifecycle({
  collectionSlug: GLOBAL_FOOTER_SLUG_AND_TAG,
  imageConfigs: [
    {
      fieldName: 'logo',
      aspectRatio: 1.48,
      quality: 0.92,
      maxKB: 500,
      required: true,
      label: 'Footer Logo',
      description: 'Primary footer logo.',
    },
    {
      fieldName: 'isoBadgeImage',
      aspectRatio: 308 / 130,
      quality: 0.92,
      maxKB: 400,
      required: false,
      label: 'ISO Badge Image',
      description: 'Certification / trust badge shown under the intro text.',
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

const footerBase = pickGlobalHooks(footerMediaHooks)

/* ---------------- global ---------------- */
const Footer: GlobalConfig = {
  slug: GLOBAL_FOOTER_SLUG_AND_TAG,
  label: 'Footer',
  admin: {
    description: 'Site-wide footer for Sagor Ropes.',
  },

  access: {
    read: () => true,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
  },

  fields: [
    { name: 'uploadSessionId', type: 'text', admin: { condition: () => false, readOnly: true } },

    ...generateImageFields({
      fieldName: 'logo',
      label: 'Footer Logo',
      description: 'Primary footer logo.',
      aspectRatio: 701 / 179,
      quality: 0.92,
      maxKB: 500,
      required: true,
      ownerCollection: GLOBAL_FOOTER_SLUG_AND_TAG as any,
    } as any),

    ...generateImageFields({
      fieldName: 'isoBadgeImage',
      label: 'ISO Badge Image',
      description: 'Certification / trust badge shown under the intro text.',
      aspectRatio: 544 / 204,
      quality: 0.92,
      maxKB: 400,
      required: false,
      ownerCollection: GLOBAL_FOOTER_SLUG_AND_TAG as any,
    } as any),

    {
      name: 'branding',
      type: 'group',
      label: 'Branding & Intro',
      fields: [
        {
          name: 'introText',
          type: 'textarea',
          label: 'Intro Text',
          required: true,
          validate: validateShortText('Intro Text', INTRO_MAX, true),
          defaultValue: 'A legacy of trust since 1984, pioneering rope manufacturing since 1995',
        },
      ],
    },

    {
      name: 'quickLinksSection',
      type: 'group',
      label: 'Quick Links Section',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Header',
          required: true,
          defaultValue: 'Quick Links',
          validate: validateShortText('Quick Links Header', LABEL_MAX, true),
        },
        {
          name: 'links',
          type: 'array',
          label: 'Quick Links',
          minRows: 0,
          maxRows: 8,
          validate: validateMaxItems('Quick links', 8),
          labels: { singular: 'Quick Link', plural: 'Quick Links' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  required: true,
                  label: 'Label',
                  validate: validateShortText('Label', CTA_TEXT_MAX, true),
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'buttonLink',
                  label: 'Link to (internal page)',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: false,
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'productsSection',
      type: 'group',
      label: 'Products Section',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Header',
          required: true,
          defaultValue: 'Our Products',
          validate: validateShortText('Products Header', LABEL_MAX, true),
        },
        {
          name: 'products',
          type: 'array',
          label: 'Product Links',
          minRows: 0,
          maxRows: 8,
          validate: validateMaxItems('Product links', 8),
          labels: { singular: 'Product Link', plural: 'Product Links' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  required: true,
                  label: 'Product Name',
                  validate: validateShortText('Product Name', PRODUCT_MAX, true),
                  admin: { width: '50%' },
                },
                {
                  name: 'buttonLink',
                  label: 'Link to (internal page)',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: false,
                  admin: { width: '50%' },
                },
                {
                  name: 'showNewBadge',
                  type: 'checkbox',
                  label: 'Show NEW Badge',
                  defaultValue: false,
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },

    {
      name: 'factorySection',
      type: 'group',
      label: 'Factory Section',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Header',
          required: true,
          defaultValue: 'Our Factory',
          validate: validateShortText('Factory Header', LABEL_MAX, true),
        },
        {
          type: 'row',
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Factory Address',
              required: true,
              validate: validateShortText('Factory Address', ADDRESS_MAX, true),
              defaultValue: 'Shakhari Bazar, Rampal, Munshiganj - 1501, Bangladesh',
              admin: { width: '50%' },
            },
            {
              name: 'mapUrl',
              type: 'text',
              label: 'Factory Google Maps URL',
              required: false,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, false),
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'phone',
              type: 'text',
              label: 'Factory Phone',
              required: true,
              validate: validatePhone(PHONE_MAX, true),
              admin: { width: '50%' },
              defaultValue: '+88 01753 268040',
            },
            {
              name: 'email',
              type: 'text',
              label: 'Factory Email',
              required: true,
              validate: validateEmail(EMAIL_MAX, true),
              admin: { width: '50%' },
              defaultValue: 'njenterprise@sagarfishing.com',
            },
          ],
        },
      ],
    },

    {
      name: 'social',
      type: 'group',
      label: 'Social',
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'facebookUrl',
              type: 'text',
              label: 'Facebook URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
            },
            {
              name: 'youtubeUrl',
              type: 'text',
              label: 'YouTube URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
            },
          ],
        },
        {
          type: 'row',
          fields: [
            {
              name: 'linkedinUrl',
              type: 'text',
              label: 'LinkedIn URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
            },
            {
              name: 'instagramUrl',
              type: 'text',
              label: 'Instagram URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: { width: '50%' },
            },
          ],
        },
      ],
    },

    {
      name: 'legalSection',
      type: 'group',
      label: 'Legal Section',
      fields: [
        {
          name: 'legal',
          type: 'array',
          label: 'Legal Links',
          minRows: 0,
          maxRows: 3,
          validate: validateMaxItems('Legal links', 6),
          labels: { singular: 'Legal Link', plural: 'Legal Links' },
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'buttonText',
                  type: 'text',
                  label: 'Label',
                  required: true,
                  maxLength: CTA_TEXT_MAX,
                  validate: validateShortText('Label', CTA_TEXT_MAX, true),
                  admin: { width: '50%' },
                },
                {
                  name: 'buttonLink',
                  label: 'Link to (internal page)',
                  type: 'relationship',
                  relationTo: 'pages',
                  required: false,
                  admin: { width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'marqueeSection',
          type: 'group',
          label: 'Marquee Section',
          fields: [
            {
              name: 'text',
              type: 'text',
              label: 'Marquee Text',
              required: true,
              validate: validateShortText('Marquee Text', MARQUEE_MAX, true),
              defaultValue: 'CRAFTING EXCELLENCE SINCE 1995',
            },
          ],
          admin: { width: '50%' },
        },
        {
          name: 'copyrightSection',
          type: 'group',
          label: 'Copyright Section',
          fields: [
            {
              name: 'copyright',
              type: 'text',
              label: 'Copyright Text',
              required: true,
              maxLength: COPYRIGHT_MAX,
              validate: validateShortText('Copyright', COPYRIGHT_MAX, true),
              defaultValue: '© 2025 | SAGAR',
            },
          ],
          admin: { width: '50%' },
        },
      ],
    },
  ],

  hooks: {
    beforeValidate: [...(footerBase.beforeValidate ?? [])],
    beforeChange: [...(footerBase.beforeChange ?? [])],
    afterChange: [
      ...(footerBase.afterChange ?? []),
      async () => {
        revalidateTag(globalTag(GLOBAL_FOOTER_SLUG_AND_TAG))
      },
    ],
  },
}

export default Footer
