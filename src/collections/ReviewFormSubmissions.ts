// import { FORMS } from '@/lib/constants'
// import type { CollectionConfig } from 'payload'

// const REVIEW_MAX_LENGTH = 500

// const isAuthenticated = ({ req }: any) => Boolean(req.user)

// export const ReviewFormSubmissions: CollectionConfig = {
//   slug: 'review-form-submissions',

//   labels: {
//     singular: 'Review Form Submission',
//     plural: 'Review Form Submissions',
//   },

//   admin: {
//     useAsTitle: 'buyersFullName',
//     defaultColumns: ['buyersFullName', 'companyName', 'position', 'rating', 'createdAt'],
//     group: FORMS,
//   },

//   access: {
//     read: isAuthenticated,
//     create: isAuthenticated,
//     update: isAuthenticated,
//     delete: isAuthenticated,
//   },

//   timestamps: true,

//   fields: [
//     {
//       name: 'buyersFullName',
//       type: 'text',
//       label: 'Buyer Full Name',
//       required: true,
//     },
//     {
//       name: 'linkedIn',
//       type: 'text',
//       label: 'LinkedIn',
//     },
//     {
//       name: 'companyName',
//       type: 'text',
//       label: 'Company Name',
//       required: true,
//     },
//     {
//       name: 'position',
//       type: 'text',
//       label: 'Position',
//       required: true,
//     },
//     {
//       name: 'country',
//       type: 'text',
//       label: 'Country',
//       required: true,
//     },
//     {
//       name: 'countryDialCode',
//       type: 'text',
//       label: 'Country Dial Code',
//     },
//     {
//       name: 'phone',
//       type: 'text',
//       label: 'Contact Number',
//       required: true,
//     },
//     {
//       name: 'rating',
//       type: 'number',
//       label: 'Rating',
//       required: true,
//       min: 1,
//       max: 5,
//     },
//     {
//       name: 'review',
//       type: 'textarea',
//       label: 'Review',
//       required: true,
//       maxLength: REVIEW_MAX_LENGTH,
//     },

//     {
//       name: 'adminImages',
//       type: 'group',
//       label: 'Admin Uploaded Images',
//       admin: {
//         description:
//           'These images are uploaded only from this collection in the admin panel. They are not submitted from the frontend form.',
//       },
//       fields: [
//         {
//           name: 'companyIcon',
//           type: 'upload',
//           relationTo: 'media',
//           label: 'Company Icon',
//           admin: {
//             description: 'Optional. Upload company logo/icon from admin only.',
//           },
//         },
//         {
//           name: 'userProfileImage',
//           type: 'upload',
//           relationTo: 'media',
//           label: 'User Profile Image',
//           admin: {
//             description: 'Optional. Upload user profile image from admin only.',
//           },
//         },
//       ],
//     },
//   ],
// }

// export default ReviewFormSubmissions

import { FORMS } from '@/lib/constants'
import { generateImageFields } from '@/utils/media/fieldGenerators'
import type { CollectionConfig } from 'payload'

const REVIEW_MAX_LENGTH = 500
const REVIEW_FORM_SUBMISSIONS_SLUG = 'review-form-submissions'

const isAuthenticated = ({ req }: any) => Boolean(req.user)

const companyIconFields = generateImageFields({
  required: false,
  fieldName: 'companyIcon',
  label: 'Company Icon',
  description:
    'Upload & crop the company icon. This can be uploaded from this collection only. Ratio 200:80',
  aspectRatio: 200 / 80,
  quality: 0.9,
  maxKB: 350,
  ownerCollection: REVIEW_FORM_SUBMISSIONS_SLUG as any,
} as any)

const userProfileImageFields = generateImageFields({
  required: false,
  fieldName: 'userProfileImage',
  label: 'User Profile Image',
  description:
    'Upload & crop the user profile image. This can be uploaded from this collection only. Ratio 325:385',
  aspectRatio: 325 / 385,
  quality: 0.9,
  maxKB: 350,
  ownerCollection: REVIEW_FORM_SUBMISSIONS_SLUG as any,
} as any)

export const ReviewFormSubmissions: CollectionConfig = {
  slug: REVIEW_FORM_SUBMISSIONS_SLUG,

  labels: {
    singular: 'Review Form Submission',
    plural: 'Review Form Submissions',
  },

  admin: {
    useAsTitle: 'buyersFullName',
    defaultColumns: ['buyersFullName', 'companyName', 'position', 'rating', 'createdAt'],
    group: FORMS,
  },

  access: {
    read: isAuthenticated,
    create: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },

  timestamps: true,

  fields: [
    {
      name: 'uploadSessionId',
      type: 'text',
      admin: {
        condition: () => false,
      },
    },
    {
      name: 'buyersFullName',
      type: 'text',
      label: 'Buyer Full Name',
      required: true,
    },
    {
      name: 'linkedIn',
      type: 'text',
      label: 'LinkedIn',
    },
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      label: 'Position',
      required: true,
    },
    {
      name: 'country',
      type: 'text',
      label: 'Country',
      required: true,
    },
    {
      name: 'countryDialCode',
      type: 'text',
      label: 'Country Dial Code',
    },
    {
      name: 'phone',
      type: 'text',
      label: 'Contact Number',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      label: 'Rating',
      required: true,
      min: 1,
      max: 5,
    },
    {
      name: 'review',
      type: 'textarea',
      label: 'Review',
      required: true,
      maxLength: REVIEW_MAX_LENGTH,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Published', value: 'published' },
      ],
    },

    {
      name: 'adminImages',
      type: 'group',
      label: 'Admin Uploaded Images',
      admin: {
        description:
          'These images are uploaded only from this collection in the admin panel. They are not submitted from the frontend form.',
      },
      fields: [...companyIconFields, ...userProfileImageFields],
    },
  ],
}

export default ReviewFormSubmissions
