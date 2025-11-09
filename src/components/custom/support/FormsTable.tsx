'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import GlobalButton from '../shared/GlobalButton'
import useSSRLanguage from '@/hooks/useSSRLanguage'
import LocalizedText from '../shared/LocalizedText'

// Each form row from schema
type FormRow = {
  title: string
  titleBN?: string | null
}

type Props = {
  forms: FormRow[]
  buttonTextEn: string
  buttonTextBn?: string | null
  containerBg?: string
  headerBg?: string
}

function FormsTable({
  forms,
  buttonTextEn,
  buttonTextBn,
  containerBg = '#F6EDDD',
  headerBg = '#a08d2c',
}: Props) {
  const lang = useSSRLanguage()
  const btnText = lang === 'bn' ? buttonTextBn || buttonTextEn : buttonTextEn

  return (
    <div
      className="px-5 py-12 
           md:px-24 md:py-[40px] 
           lg:px-[130px]  lg:py-[50px] 
           xl:px-[200px]  xl:py-[70px] 
           2xl:px-[300px] 2xl:py-[100px] 
            overflow-x-auto rounded-md"
      style={{ backgroundColor: containerBg }}
    >
      <Table className="overflow-x-auto min-w-[500px] text-[12px] md:text-[16px] font-medium">
        <TableHeader style={{ backgroundColor: headerBg, color: '#ffffff' }}>
          <TableRow className="text-center hover:bg-transparent">
            <TableHead className="p-4 text-white text-center w-[80px] border border-[#42424242]">
              ID
            </TableHead>
            <TableHead className="p-4 text-white text-center border border-[#42424242]">
              Title
            </TableHead>
            <TableHead className="p-4 text-white text-center w-[260px] border border-[#42424242]">
              Download
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(forms || []).map((form, idx) => (
            <TableRow key={`form-${idx}`} className="text-center border border-[#42424242]">
              <TableCell className="p-4 text-center border border-[#42424242]">
                {idx + 1}
              </TableCell>
              <TableCell className="p-4 text-center border border-[#42424242]">
                <LocalizedText en={form.title} bn={form.titleBN || undefined} />
              </TableCell>
              <TableCell className="p-4 text-center border border-[#42424242]">
                {/* No URL for now → just a button that does nothing */}
                <GlobalButton
                  variant="outline"
                  size="small"
                  className="hover:opacity-90"
                  // keep visual contrast: outline on light background
                  style={{ borderColor: headerBg }}
                >
                  {btnText}
                </GlobalButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default FormsTable
