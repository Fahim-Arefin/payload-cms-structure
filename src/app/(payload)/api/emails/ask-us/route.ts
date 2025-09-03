import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (req: PayloadRequest) => {
  const payload = await getPayload({ config })
  await addDataAndFileToRequest(req)

  const { firstName, lastName, email, phone, address, message } = req.data

    const additionalEmail = process?.env?.SHANTA_ADDITIONAL_EMAIL

  // Construct the "to" field with both the original and additional email
  const toEmails = `${process?.env?.SHANTA_SUPPORT_MAIL}, ${additionalEmail}`
  // console.log({ name, email, phone, address, message })
  // console.log(payload)
  await payload?.sendEmail({
    to: toEmails,
    subject: 'Ask us email',
    text: `First Name: ${firstName}, Last Name: ${lastName}, email: ${email}, phone: ${phone}, address: ${address}, message: ${message}, `,
  })
  return Response.json({ success: true })
}
