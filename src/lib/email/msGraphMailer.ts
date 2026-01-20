import { ConfidentialClientApplication } from '@azure/msal-node'

type GraphAttachment = {
  filename: string
  contentBase64: string
  contentType?: string
}

type SendViaGraphInput = {
  subject: string
  html?: string
  text?: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  replyTo?: string
  saveToSentItems?: boolean
  attachments?: GraphAttachment[] // ✅ NEW
}

const msalClient = new ConfidentialClientApplication({
  auth: {
    clientId: process.env.MS_CLIENT_ID!,
    authority: `https://login.microsoftonline.com/${process.env.MS_TENANT_ID!}`,
    clientSecret: process.env.MS_CLIENT_SECRET!,
  },
})

async function getAccessToken() {
  const result = await msalClient.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default'],
  })
  if (!result?.accessToken) throw new Error('Failed to acquire MS Graph access token')
  return result.accessToken
}

function mapRecipients(addresses: string[]) {
  return addresses.map((address) => ({
    emailAddress: { address },
  }))
}

export async function sendEmailViaMsGraph(input: SendViaGraphInput) {
  const sender = process.env.MS_SENDER_EMAIL
  if (!sender) throw new Error('MS_SENDER_EMAIL is missing')

  if (!input.to?.length) throw new Error('No recipients provided')

  const token = await getAccessToken()

  const payload = {
    message: {
      subject: input.subject,
      body: {
        contentType: input.html ? 'HTML' : 'Text',
        content: input.html ?? input.text ?? '',
      },
      toRecipients: mapRecipients(input.to),
      ...(input.cc?.length ? { ccRecipients: mapRecipients(input.cc) } : {}),
      ...(input.bcc?.length ? { bccRecipients: mapRecipients(input.bcc) } : {}),
      ...(input.replyTo ? { replyTo: [{ emailAddress: { address: input.replyTo } }] } : {}),
      ...(input.attachments?.length
        ? {
            attachments: input.attachments.map((a) => ({
              '@odata.type': '#microsoft.graph.fileAttachment',
              name: a.filename,
              contentType: a.contentType || 'application/octet-stream',
              contentBytes: a.contentBase64,
            })),
          }
        : {}),
    },
    saveToSentItems: input.saveToSentItems ?? true,
  }

  const res = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    },
  )

  if (!res.ok) {
    const err = await res.text().catch(() => '')
    throw new Error(`Graph sendMail failed: ${res.status} ${res.statusText} ${err}`)
  }
}
