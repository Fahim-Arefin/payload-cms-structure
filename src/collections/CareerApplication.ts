import type { CollectionConfig } from 'payload'
import axios from 'axios'

export const CareerApplication: CollectionConfig = {
  slug: 'career-application',
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'position',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'text',
      required: true,
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'resume',
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation != 'create') return

        try {
          const resume = doc.resume

          const fileUrl = `${process?.env?.API_URL}${resume?.url}`
          const response = await axios.get(fileUrl, {
            responseType: 'stream',
          })
                    // Get the additional email from the environment variable
          const additionalEmail = process?.env?.SHANTA_ADDITIONAL_EMAIL

          // Construct the "to" field with both the career email and the additional email
          const toEmails = `${process?.env?.SHANTA_CAREER_MAIL}, ${additionalEmail}`
          req.payload.sendEmail({
            to: toEmails,
            subject: 'New applicant: ' + doc.name + ' for ' + doc.position + ' position',
            text: 'New applicant: ' + doc.name + ' for ' + doc.position + ' position',
            attachments: [
              {
                filename: resume?.filename ?? 'Applicant',
                content: response?.data,
              },
            ],
          })
        } catch (err) {
          console.error('Error sending resume email: ', err)
        }
      },
    ],
  },
}
