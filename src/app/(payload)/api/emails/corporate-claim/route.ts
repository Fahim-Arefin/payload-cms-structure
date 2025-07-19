import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (req: PayloadRequest) => {
  const payload = await getPayload({ config })
  await addDataAndFileToRequest(req)
  const { phone } = req.data
  // console.log({ name, email, phone, address, message })
  // console.log(payload)
  await payload?.sendEmail({
    to: process?.env?.SHANTA_SUPPORT_MAIL,
    subject: 'Corporate mail',
    text: `phone: ${phone}`,
  })
  return Response.json({ success: true })
}
