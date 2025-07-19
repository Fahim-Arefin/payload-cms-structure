import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (req: PayloadRequest) => {
  const payload = await getPayload({ config })
  await addDataAndFileToRequest(req)
  const { firstName, lastName, email, phone, address, message } = req.data
  // console.log({ name, email, phone, address, message })
  // console.log(payload)
  await payload?.sendEmail({
    to: process?.env?.SHANTA_SUPPORT_MAIL,
    subject: 'Ask us email',
    text: `First Name: ${firstName}, Last Name: ${lastName}, email: ${email}, phone: ${phone}, address: ${address}, message: ${message}, `,
  })
  return Response.json({ success: true })
}
