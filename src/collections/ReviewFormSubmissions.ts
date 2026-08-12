// import { CUSTOMER_REVIEW_SLUG_AND_TAG, FORMS } from '@/lib/constants'
// import { roleAtLeast } from '@/lib/rbac'
// import { generateImageFields } from '@/utils/media/fieldGenerators'
// import { revalidateTag } from 'next/cache'
// import type { CollectionConfig } from 'payload'

// const REVIEW_MAX_LENGTH = 500
// const REVIEW_FORM_SUBMISSIONS_SLUG = 'review-form-submissions'

// const companyIconFields = generateImageFields({
//   required: false,
//   fieldName: 'companyIcon',
//   label: 'Company Icon',
//   description:
//     'Upload & crop the company icon. This can be uploaded from this collection only. Ratio 140:50',
//   aspectRatio: 140 / 50,
//   quality: 0.9,
//   maxKB: 350,
//   ownerCollection: REVIEW_FORM_SUBMISSIONS_SLUG as any,
// } as any)

// const userProfileImageFields = generateImageFields({
//   required: false,
//   fieldName: 'userProfileImage',
//   label: 'User Profile Image',
//   description:
//     'Upload & crop the user profile image. This can be uploaded from this collection only. Ratio 240:301',
//   aspectRatio: 240 / 301,
//   quality: 0.9,
//   maxKB: 350,
//   ownerCollection: REVIEW_FORM_SUBMISSIONS_SLUG as any,
// } as any)

// const revalidateCustomerReview = () => {
//   revalidateTag(CUSTOMER_REVIEW_SLUG_AND_TAG)
//   revalidateTag(REVIEW_FORM_SUBMISSIONS_SLUG)
// }

// export const ReviewFormSubmissions: CollectionConfig = {
//   slug: REVIEW_FORM_SUBMISSIONS_SLUG,

//   labels: {
//     singular: 'Review Form Submission',
//     plural: 'Review Form Submissions',
//   },

//   admin: {
//     useAsTitle: 'buyersFullName',
//     defaultColumns: ['buyersFullName', 'companyName', 'position', 'rating', 'status', 'createdAt'],
//     group: FORMS,
//   },

//   access: {
//     read: ({ req }) => roleAtLeast(req.user, 'editor'),
//     create: () => false,
//     update: ({ req }) => roleAtLeast(req.user, 'editor'),
//     delete: ({ req }) => roleAtLeast(req.user, 'admin'),
//   },

//   hooks: {
//     afterChange: [
//       async () => {
//         revalidateCustomerReview()
//       },
//     ],

//     afterDelete: [
//       async () => {
//         revalidateCustomerReview()
//       },
//     ],
//   },

//   timestamps: true,

//   fields: [
//     {
//       name: 'uploadSessionId',
//       type: 'text',
//       admin: {
//         condition: () => false,
//       },
//     },
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
//       name: 'status',
//       type: 'select',
//       label: 'Status',
//       required: true,
//       defaultValue: 'new',
//       options: [
//         { label: 'New', value: 'new' },
//         { label: 'Reviewed', value: 'reviewed' },
//         { label: 'Published', value: 'published' },
//       ],
//     },
//     {
//       name: 'adminImages',
//       type: 'group',
//       label: 'Admin Uploaded Images',
//       admin: {
//         description:
//           'These images are uploaded only from this collection in the admin panel. They are not submitted from the frontend form.',
//       },
//       fields: [...companyIconFields, ...userProfileImageFields],
//     },
//   ],
// }

// export default ReviewFormSubmissions

import { CUSTOMER_REVIEW_SLUG_AND_TAG, FORMS } from '@/lib/constants'
import { roleAtLeast } from '@/lib/rbac'
import { revalidateTag } from 'next/cache'
import type { CollectionConfig } from 'payload'

const REVIEW_MAX_LENGTH = 500
const REVIEW_FORM_SUBMISSIONS_SLUG = 'review-form-submissions'

const revalidateCustomerReview = () => {
  revalidateTag(CUSTOMER_REVIEW_SLUG_AND_TAG)
  revalidateTag(REVIEW_FORM_SUBMISSIONS_SLUG)
}

export const ReviewFormSubmissions: CollectionConfig = {
  slug: REVIEW_FORM_SUBMISSIONS_SLUG,

  labels: {
    singular: 'Review Form Submission',
    plural: 'Review Form Submissions',
  },

  admin: {
    useAsTitle: 'buyersFullName',
    defaultColumns: ['buyersFullName', 'companyName', 'position', 'rating', 'status', 'createdAt'],
    group: FORMS,
  },

  access: {
    read: ({ req }) => roleAtLeast(req.user, 'editor'),
    create: () => false,
    update: ({ req }) => roleAtLeast(req.user, 'editor'),
    delete: ({ req }) => roleAtLeast(req.user, 'admin'),
  },

  hooks: {
    afterChange: [
      async () => {
        revalidateCustomerReview()
      },
    ],

    afterDelete: [
      async () => {
        revalidateCustomerReview()
      },
    ],
  },

  timestamps: true,

  fields: [
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
      label: 'Status',
      required: true,
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
      fields: [
        {
          name: 'companyIcon',
          type: 'upload',
          relationTo: 'media',
          label: 'Company Icon',
          required: false,
          admin: {
            description:
              'Optional. Upload company logo/icon from admin only. Recommended ratio 140:50.',
          },
        },

        {
          name: 'userProfileImage',
          type: 'upload',
          relationTo: 'media',
          label: 'User Profile Image',
          required: false,
          admin: {
            description:
              'Optional. Upload user profile image from admin only. Recommended ratio 240:301.',
          },
        },
      ],
    },
  ],
}

export default ReviewFormSubmissions
