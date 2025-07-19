import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (req: PayloadRequest) => {
  const payload = await getPayload({ config })
  await addDataAndFileToRequest(req)
  const { name, email, phone, address, feedback } = req.data
  // console.log({ name, email, phone, address, feedback })
  // console.log(payload)
  await payload?.sendEmail({
    to: process?.env?.SHANTA_SUPPORT_MAIL,
    subject: 'ask us email',
    text: `name: ${name}, email: ${email}, phone: ${phone}, address: ${address}, feedback: ${feedback}, `,
  })
  return Response.json({ success: true })
}
