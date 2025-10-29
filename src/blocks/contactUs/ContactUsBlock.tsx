import ContactUsSectionServer from '@/components/custom/shared/contactUs/ContactUsSectionServer'
import NoDataFound from '@/components/custom/shared/NoDataFound'
import { ContactUsFormBlockType } from '@/types/payloadCustomTypes'

type Props = {
  block: ContactUsFormBlockType
  params: Record<string, string>
}

function ContactUsBlock({ block }: Props) {
  return (
    <div>
      {block?.useSharedData ? (
        <ContactUsSectionServer block={block} />
      ) : (
        <NoDataFound
          message="Please Turn On The Checkbox"
          description="In the admin panel, open the “Contact Us Form” block and check the “Use shared Contact Us (Global)” checkbox."
          bgColor={block?.backgroundColor || ''}
        />
      )}
    </div>
  )
}

export default ContactUsBlock
