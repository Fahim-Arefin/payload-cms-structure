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
const LABEL_MAX = 40
const URL_MAX = 300
const COPYRIGHT_MAX = 200
const COPYRIGHT_HILITE_MAX = 120
const CTA_TEXT_MAX = 60
const INTRO_MAX = 180
const PRODUCT_MAX = 100
const OFFICE_TIME_MAX = 120
const WHATSAPP_MAX = 50
const TERMS_CONDITION_MAX = 180

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
      fieldName: 'logoBackgroundImage',
      aspectRatio: 1437 / 280,
      quality: 0.92,
      maxKB: 600,
      required: false,
      label: 'Logo Background Image',
      description: 'Optional background image shown behind/below the footer logo.',
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
      description: 'Primary footer logo. Aspect ratio (922:512)',
      aspectRatio: 922 / 512,
      quality: 0.92,
      maxKB: 500,
      required: true,
      ownerCollection: GLOBAL_FOOTER_SLUG_AND_TAG as any,
    } as any),

    ...generateImageFields({
      fieldName: 'logoBackgroundImage',
      label: 'Logo Background Image',
      description:
        'Optional background image shown behind/below the footer logo. Aspect ratio (1437:280)',
      aspectRatio: 1437 / 280,
      quality: 0.92,
      maxKB: 600,
      required: false,
      ownerCollection: GLOBAL_FOOTER_SLUG_AND_TAG as any,
    } as any),

    // branding
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
          defaultValue: 'Subscribe to Our Newsletter',
        },
        {
          name: 'termsConditionText',
          type: 'textarea',
          label: 'Terms & Condition Text',
          required: false,
          validate: validateShortText('Terms & Condition Text', TERMS_CONDITION_MAX, false),
          admin: {
            description: 'Optional terms and condition text shown in footer.',
          },
        },
      ],
    },

    // resourses
    {
      name: 'resourses',
      type: 'group',
      label: 'Resourse Section',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Resourse Header',
          required: true,
          defaultValue: '<Resourses>',
          validate: validateShortText('Resourse Header', LABEL_MAX, true),
        },
        {
          name: 'links',
          type: 'array',
          label: 'Resourse Links',
          minRows: 0,
          maxRows: 8,
          validate: validateMaxItems('Resourse links', 8),
          labels: { singular: 'Resourse Link', plural: 'Resourse Links' },
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

    // services
    {
      name: 'serviceSection',
      type: 'group',
      label: 'Services Section',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Services Header',
          required: true,
          defaultValue: '<Services>',
          validate: validateShortText('Services Header', LABEL_MAX, true),
        },
        {
          name: 'services',
          type: 'array',
          label: 'Service Links',
          minRows: 0,
          maxRows: 8,
          validate: validateMaxItems('Service links', 8),
          labels: { singular: 'Service Link', plural: 'Service Links' },
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

    // contact info
    {
      name: 'contactInfoSection',
      type: 'group',
      label: 'Contact Info Section',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Header',
          required: true,
          defaultValue: '<Contact Info>',
          validate: validateShortText('Contact Info', LABEL_MAX, true),
        },
        {
          type: 'row',
          fields: [
            {
              name: 'companyAddress',
              type: 'richText',
              label: 'Company Address',
              admin: {
                width: '50%',
                description: ``,
              },
              required: true,
            },
            {
              name: 'mapUrl',
              type: 'text',
              label: 'Company Google Maps Location URL',
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
              name: 'officeTime',
              type: 'text',
              label: 'Office Time',
              defaultValue: 'Mon-Fri 09am-06pm',
              required: true,
              validate: validateShortText('Office Time', OFFICE_TIME_MAX, false),
              admin: {
                width: '33%',
                description: 'Example: Sat - Thu, 9:00 AM - 6:00 PM',
              },
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Company Phone',
              required: true,
              validate: validatePhone(PHONE_MAX, true),
              admin: { width: '33%' },
              defaultValue: '+880 1777 189611',
            },
            {
              name: 'email',
              type: 'text',
              label: 'Company Email',
              required: true,
              validate: validateEmail(EMAIL_MAX, true),
              admin: { width: '33%' },
              defaultValue: 'contact@xynolab.com',
            },
          ],
        },
      ],
    },

    // social
    {
      name: 'social',
      type: 'group',
      label: 'Social',
      fields: [
        {
          name: 'header',
          type: 'text',
          label: 'Header',
          required: true,
          defaultValue: 'Stay In Touch',
          validate: validateShortText('Social Header', LABEL_MAX, true),
        },
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
            // {
            //   name: 'whatsApp',
            //   type: 'text',
            //   label: 'Whats App URL',
            //   required: true,
            //   maxLength: URL_MAX,
            //   validate: validateAbsoluteHTTPUrl(URL_MAX, true),
            //   admin: { width: '50%' },
            // },
            {
              name: 'whatsApp',
              type: 'text',
              label: 'WhatsApp URL',
              required: true,
              maxLength: URL_MAX,
              validate: validateAbsoluteHTTPUrl(URL_MAX, true),
              admin: {
                width: '50%',
                description:
                  'Full WhatsApp URL. Example: https://api.whatsapp.com/send?phone=%2B8801777189611&brid=YQYMKgmDKn-ZQ3Gbr7U7AA',
              },
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
          ],
        },
      ],
    },

    // copyright and legal
    {
      type: 'row',
      fields: [
        {
          name: 'copyright',
          type: 'group',
          label: 'Copyright',
          fields: [
            {
              name: 'copyrightText',
              type: 'text',
              label: 'Copyright Text',
              required: true,
              validate: validateShortText('Copyright Text', COPYRIGHT_MAX, true),
              defaultValue: '© 2025 Sagor Ropes. All rights reserved.',
            },
            {
              name: 'copyrightHighlightedText',
              type: 'text',
              label: 'Copyright Highlighted Text',
              required: false,
              validate: validateHighlightedInField(
                'Copyright Highlighted Text',
                'copyrightText',
                COPYRIGHT_HILITE_MAX,
                false,
              ),
              admin: {
                description:
                  'Write the exact part of the copyright text that should be highlighted. It must exist inside Copyright Text exactly.',
                width: '50%',
              },
            },
          ],
        },
        {
          name: 'legalSection',
          type: 'group',
          label: 'Legal Links',
          fields: [
            {
              name: 'legalValue',
              type: 'richText',
              label: 'Legal Text',
              required: true,
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
