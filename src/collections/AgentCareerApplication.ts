import type { CollectionConfig } from 'payload'
import axios from 'axios'
import { FORM_DATA } from '@/lib/constants'

export const AgentCareerApplication: CollectionConfig = {
  slug: 'agent-career-application',
  access: {
    read: () => true,
    create: () => true,
  },
  admin: {
    group: FORM_DATA,
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
    // {
    //   name: 'email',
    //   type: 'email',
    //   required: true,
    // },
    // {
    //   name: 'position',
    //   type: 'text',
    //   required: true,
    // },
    // {
    //   name: 'message',
    //   type: 'text',
    //   required: true,
    // },
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
          const additionalEmail = process?.env?.SHANTA_ADDITIONAL_EMAIL

          // Construct the "to" field with both the career email and the additional email
          const toEmails = `${process?.env?.SHANTA_AGENT_CAREER_MAIL}, ${additionalEmail}`

          req.payload.sendEmail({
            to: toEmails,
            subject: 'New applicant: For Agent Onboarding',
            text: 'New applicant: ' + doc.name,
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
