import { addDataAndFileToRequest, PayloadRequest } from 'payload'
import { getPayload } from 'payload'
import config from '@payload-config'

export const POST = async (req: PayloadRequest) => {
  const payload = await getPayload({ config })
  await addDataAndFileToRequest(req)
  const { planName, age, gender, name, phoneNumber, email, city, occupation } = req.data as {
    planName: string
    age: number
    gender: string
    name: string
    phoneNumber: string
    email: string
    city: string
    occupation: string
  }

  const additionalEmail = process?.env?.ADDITIONAL_EMAIL

  // Construct the "to" field with both the original and additional email
  const toEmails = `${process?.env?.PURCHASE_MAIL}, ${additionalEmail}`

  await payload?.sendEmail({
    to: toEmails,
    subject: 'Purchase Request - Insurance Plan',
    text: `New Purchase Request:
    
Plan: ${planName}
Age: ${age}
Gender: ${gender}
Name: ${name}
Phone: ${phoneNumber}
Email: ${email}
City: ${city}
Occupation: ${occupation}

This customer is interested in purchasing the ${planName} and has provided their details for follow-up.`,
  })

  return Response.json({ success: true })
}
