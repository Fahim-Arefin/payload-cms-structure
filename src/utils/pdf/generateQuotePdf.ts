import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import fs from 'node:fs/promises'
import path from 'node:path'

function safeLatin(text: any) {
  return String(text ?? '').replace(/[^\x20-\x7E]/g, '')
}

type Fonts = {
  regular: PDFFont
  bold: PDFFont
  // italic: PDFFont
  // boldItalic: PDFFont
}

async function loadFontOrFallback(pdfDoc: PDFDocument, filePath: string, fallback: PDFFont) {
  try {
    const bytes = await fs.readFile(filePath)
    return await pdfDoc.embedFont(bytes, { subset: true })
  } catch {
    return fallback
  }
}

export type IllustrationData = {
  formData: any
  meta?: {
    plan?: { code: number; name: string; displayName?: string }
    payment?: { id: number; name: string; displayName?: string }
    gender?: { id: number; name: string; displayName?: string }
    term?: { value: number; label: string }
    lang?: 'en' | 'bn'
  }

  benefits: Array<{ type: string; description: string; amount: string }>
  riders: Array<{ name: string; description: string; coverageAmount: string; premium: string }>
  projectedValues: Array<{
    year: number
    annualPremium: string
    deathBenefit: string
    surrenderValue: string
    maturityValue: string
    paidUpValue: string
  }>
}

function clip(text: any, max = 30) {
  const s = String(text ?? '')
  return s.length > max ? s.slice(0, max - 1) + '…' : s
}

function hexToRgb01(hex: string) {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16) / 255
  const g = parseInt(h.slice(2, 4), 16) / 255
  const b = parseInt(h.slice(4, 6), 16) / 255
  return rgb(r, g, b)
}

function wrapByWidth(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = String(text ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  const lines: string[] = []
  let line = ''

  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    const width = font.widthOfTextAtSize(next, size)
    if (width <= maxWidth) {
      line = next
    } else {
      if (line) lines.push(line)
      line = w
    }
  }
  if (line) lines.push(line)
  return lines
}

type OutlinedTextOptions = {
  size: number
  font: PDFFont
  fill: ReturnType<typeof rgb>
  outline: ReturnType<typeof rgb>

  // outer stroke
  outlineWidth?: number // how far the outline is pushed out
  outlinePasses?: 4 | 8 // 4 = thinner look, 8 = fuller outline

  // inner fill "thickness"
  fillWidth?: number // tiny offset radius to thicken the fill (sub-pixel)
  fillPasses?: 1 | 5 | 9

  shadow?: { dx: number; dy: number; color: ReturnType<typeof rgb> }
}

function drawOutlinedText(
  page: any,
  text: string,
  x: number,
  y: number,
  opts: OutlinedTextOptions,
) {
  const outlineWidth = opts.outlineWidth ?? 1.2
  const outlinePasses = opts.outlinePasses ?? 4

  const fillWidth = opts.fillWidth ?? 0.45
  const fillPasses = opts.fillPasses ?? 5

  // shadow (optional)
  if (opts.shadow) {
    page.drawText(text, {
      x: x + opts.shadow.dx,
      y: y + opts.shadow.dy,
      size: opts.size,
      font: opts.font,
      color: opts.shadow.color,
    })
  }

  // OUTLINE first (thinner)
  const outlineOffsets4: Array<[number, number]> = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const outlineOffsets8: Array<[number, number]> = [
    ...outlineOffsets4,
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]
  const outlineOffsets = outlinePasses === 8 ? outlineOffsets8 : outlineOffsets4

  for (const [ox, oy] of outlineOffsets) {
    page.drawText(text, {
      x: x + ox * outlineWidth,
      y: y + oy * outlineWidth,
      size: opts.size,
      font: opts.font,
      color: opts.outline,
    })
  }

  // FILL on top (fatter / more dominant)
  const fillOffsets1: Array<[number, number]> = [[0, 0]]
  const fillOffsets5: Array<[number, number]> = [
    [0, 0],
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]
  const fillOffsets9: Array<[number, number]> = [
    ...fillOffsets5,
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ]

  const fillOffsets =
    fillPasses === 9 ? fillOffsets9 : fillPasses === 5 ? fillOffsets5 : fillOffsets1

  for (const [fx, fy] of fillOffsets) {
    page.drawText(text, {
      x: x + fx * fillWidth,
      y: y + fy * fillWidth,
      size: opts.size,
      font: opts.font,
      color: opts.fill,
    })
  }
}

function drawOutlinedCenteredLines(
  page: any,
  lines: string[],
  centerX: number,
  startY: number,
  opts: OutlinedTextOptions,
) {
  const lineHeight = opts.size * 1.15

  lines.forEach((line, i) => {
    const w = opts.font.widthOfTextAtSize(line, opts.size)
    const x = centerX - w / 2
    const y = startY - i * lineHeight
    drawOutlinedText(page, line, x, y, opts)
  })
}

function drawCenteredText(
  page: any,
  text: string,
  centerX: number,
  y: number,
  opts: { size: number; font: PDFFont; color: ReturnType<typeof rgb> },
) {
  const w = opts.font.widthOfTextAtSize(text, opts.size)
  page.drawText(text, {
    x: centerX - w / 2,
    y,
    size: opts.size,
    font: opts.font,
    color: opts.color,
  })
}

function drawCenteredBoldTextFake(
  page: any,
  text: string,
  centerX: number,
  y: number,
  opts: { size: number; font: PDFFont; color: ReturnType<typeof rgb>; strength?: number },
) {
  const strength = opts.strength ?? 0.6 // 0.4 ~ 1.0
  const w = opts.font.widthOfTextAtSize(text, opts.size)
  const x = centerX - w / 2

  // draw a few times with tiny offsets (heavier)
  const offsets: Array<[number, number]> = [
    [0, 0],
    [strength, 0],
    [-strength, 0],
    [0, strength],
    [0, -strength],
  ]

  for (const [dx, dy] of offsets) {
    page.drawText(text, {
      x: x + dx,
      y: y + dy,
      size: opts.size,
      font: opts.font,
      color: opts.color,
    })
  }
}
function drawWrappedTextInCell(
  page: any,
  textRaw: any,
  cellX: number,
  cellY: number, // bottom
  cellW: number,
  cellH: number,
  opts: {
    font: PDFFont
    size: number
    color: ReturnType<typeof rgb>
    padding?: number
    lineHeight?: number
    minSize?: number
    ellipsis?: boolean
  },
) {
  const text = safeLatin(textRaw ?? '')
  const padding = opts.padding ?? 8
  const lineHeight = opts.lineHeight ?? opts.size * 1.15
  const minSize = opts.minSize ?? 10
  const ellipsis = opts.ellipsis ?? true

  const maxWidth = Math.max(1, cellW - padding * 2)
  const maxLines = Math.max(1, Math.floor((cellH - padding * 2) / lineHeight))

  let size = opts.size
  let lines = wrapByWidth(text, opts.font, size, maxWidth)

  while (size > minSize && lines.length > maxLines) {
    size -= 1
    lines = wrapByWidth(text, opts.font, size, maxWidth)
  }

  if (lines.length > maxLines) {
    lines = lines.slice(0, maxLines)
    if (ellipsis && lines.length) {
      let last = lines[lines.length - 1]
      while (last.length > 0 && opts.font.widthOfTextAtSize(last + '…', size) > maxWidth) {
        last = last.slice(0, -1)
      }
      lines[lines.length - 1] = (last || '').trimEnd() + '…'
    }
  }

  // draw from top
  let y = cellY + cellH - padding - size
  for (const line of lines) {
    page.drawText(line, {
      x: cellX + padding,
      y,
      size,
      font: opts.font,
      color: opts.color,
    })
    y -= lineHeight
  }
}

function formatDDMMYYYY(d = new Date()) {
  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = String(d.getFullYear())
  return `${dd}/${mm}/${yyyy}`
}

function formatDOB_DDMMYYYY(dob: Date | string | number) {
  const d = dob instanceof Date ? dob : new Date(dob)
  if (Number.isNaN(d.getTime())) return '' // invalid date

  const dd = String(d.getDate()).padStart(2, '0')
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const yyyy = String(d.getFullYear())
  return `${dd}-${mm}-${yyyy}`
}

export async function generateQuotePdf(data: IllustrationData) {
  console.log('data', data)
  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)

  // Fallback (if any of your font files missing)
  const fallback = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const fontDir = path.join(process.cwd(), 'public', 'pdfFont')

  const fonts: Fonts = {
    regular: await loadFontOrFallback(pdfDoc, path.join(fontDir, 'Avenir Regular.ttf'), fallback),
    bold: await loadFontOrFallback(pdfDoc, path.join(fontDir, 'Avenir Heavy.ttf'), fallback),
    // italic: await loadFontOrFallback(pdfDoc, path.join(fontDir, 'Avenir Italic.ttf'), fallback),
    // boldItalic: await loadFontOrFallback(
    //   pdfDoc,
    //   path.join(fontDir, 'Avenir Bold Italic.ttf'),
    //   fallback,
    // ),
  }

  // Colors (0..1)
  const COLORS = {
    gold: rgb(156 / 255, 134 / 255, 57 / 255),
    black: rgb(0, 0, 0),
    gray: rgb(0.35, 0.35, 0.35),
    white: rgb(1, 1, 1),
    brown: rgb(129 / 255, 87 / 255, 62 / 255), // #81573e ✅
  }

  // Unified draw helper (choose font + color per call)
  const draw = (
    page: any,
    text: string,
    x: number,
    y: number,
    opts?: { size?: number; font?: PDFFont; color?: ReturnType<typeof rgb> },
  ) => {
    page.drawText(text, {
      x,
      y,
      size: opts?.size ?? 10,
      font: opts?.font ?? fonts.regular,
      color: opts?.color ?? COLORS.black,
    })
  }

  const baseDir = path.join(process.cwd(), 'public', 'pdf-templates')
  const bgPaths = [
    'page-1.png',
    'page-2.png',
    'page-3.png',
    'page-4.png',
    'page-5.png',
    'page-6.png',
  ].map((p) => path.join(baseDir, p))
  const bgs = await Promise.all(bgPaths.map((p) => fs.readFile(p)))

  for (let i = 0; i < 6; i++) {
    const img = await pdfDoc.embedPng(bgs[i])
    const { width, height } = img.scale(1)

    const page = pdfDoc.addPage([width, height])
    page.drawImage(img, { x: 0, y: 0, width, height })

    // -------- Page 1: customer name (gold + bold) --------
    if (i === 0) {
      // ✅ PLAN NAME (Avenir + outline effect)
      const planTitleRaw = safeLatin(data?.meta?.plan?.displayName || data?.meta?.plan?.name || '—')

      // Adjust these to match the template exactly
      const titleCenterX = 530 // ← move left/right
      const titleTopY = 1450 // ← move up/down
      const titleSize = 60
      const maxWidth = 650 // wrap width for 2 lines (tune)

      const lines = wrapByWidth(planTitleRaw, fonts.bold, titleSize, maxWidth).slice(0, 3)

      drawOutlinedCenteredLines(page, lines, titleCenterX, titleTopY, {
        size: titleSize,
        font: fonts.bold,
        fill: hexToRgb01('#FFFFFF'),
        outline: hexToRgb01('#7F8E4A'),

        outlineWidth: 4.15, // thin border
        outlinePasses: 8, // thinner look than 8

        fillWidth: 1.55, // makes white heavier
        fillPasses: 9, // strong fill dominance

        shadow: { dx: 1.2, dy: -1.2, color: hexToRgb01('#2F2F2F') },
      })

      // ✅ DATE (always today)
      const dateText = formatDDMMYYYY(new Date())

      const dateY = 1000

      // drawCenteredText(page, dateText, titleCenterX, dateY, {
      //   size: 40,
      //   font: fonts.bold, // or fonts.regular if you want thinner
      //   color: hexToRgb01('#FFFFFF'),
      // })

      drawCenteredBoldTextFake(page, dateText, titleCenterX, dateY, {
        size: 40,
        font: fonts.bold,
        color: hexToRgb01('#FFFFFF'),
        strength: 0.7,
      })

      // ✅ customer name
      const text = safeLatin(data.formData?.name || '-')
      const size = 28
      const y = 590
      const x = 258

      // const textWidth = fonts.bold.widthOfTextAtSize(text, size)
      const centerX = 342

      draw(page, text, x, y, { size, font: fonts.bold, color: COLORS.brown })
    }

    // -------- Page 3: table dummy fill --------
    // if (i === 2) {
    //   // table geometry (from your screenshot)
    //   const TABLE = {
    //     left: 143,
    //     mid: 815,
    //     right: 1233,
    //   }

    //   const paddingX = 24
    //   const valueX = TABLE.mid + paddingX

    //   const font = fonts.regular
    //   const fontSize = 22

    //   const rowCentersImg = [
    //     322.0, 388.0, 456.5, 535.5, 618.5, 697.0, 772.5, 853.0, 925.0, 992.5, 1072.0,
    //   ]

    //   // const values = [
    //   //   'Md. Arif Hossain', // Proposed Insured Name
    //   //   'Md. Arif Hossain', // Proposed Policy Owner Name
    //   //   '30 / 15-08-1995', // Age / Date of Birth
    //   //   'Male', // Gender
    //   //   'Shanta Multi-Stage Maturity Plan',
    //   //   'BDT 10,00,000', // Sum Assured
    //   //   '20 Years', // Policy Term
    //   //   'Monthly', // Premium Mode
    //   //   'BDT 4,500', // Basic Premium
    //   //   'BDT 500', // Rider Premium
    //   //   'BDT 5,000', // Total Modal Premium
    //   // ]

    //   const values = [
    //     safeLatin(data.formData?.name || '-'), // Proposed Insured Name
    //     safeLatin(data.formData?.name || '-'), // Proposed Policy Owner Name
    //     `${data.formData?.Age || '-'} / ${formatDOB_DDMMYYYY(data.formData?.dateOfBirth) || '-'}`, // Age / Date of Birth
    //     safeLatin(data.meta?.gender?.displayName || '-'), // Gender
    //     safeLatin(data.meta?.plan?.displayName || data.meta?.plan?.name || '-'), // Plan Name
    //     safeLatin(data.formData?.SumAssured || '-'), // Sum Assured
    //     safeLatin(data.meta?.term?.label || '-'), // Policy Term
    //     safeLatin(data.meta?.payment?.displayName || '-'), // Premium Mode
    //     // safeLatin(data.formData?.basicPremium || '-'), // Basic Premium
    //     // safeLatin(data.formData?.riderPremium || '-'), // Rider Premium
    //     // safeLatin(data.formData?.totalModalPremium || '-'), // Total Modal Premium
    //   ]

    //   for (let r = 0; r < values.length; r++) {
    //     const yImg = rowCentersImg[r]
    //     const y = height - yImg - fontSize * 0.35

    //     page.drawText(values[r], {
    //       x: valueX,
    //       y,
    //       size: fontSize,
    //       font,
    //       color: COLORS.black,
    //     })
    //   }
    // }
    if (i === 2) {
      const TABLE = { left: 143, mid: 815, right: 1233 }
      const paddingX = 24
      const valueX = TABLE.mid + paddingX

      const font = fonts.bold
      const fontSize = 24

      const rowCentersImg = [
        322.0, 388.0, 456.5, 535.5, 618.5, 697.0, 772.5, 853.0, 925.0, 992.5, 1072.0,
      ]

      const values = [
        safeLatin(data.formData?.name || '-'), // 0 Proposed Insured Name
        safeLatin(data.formData?.name || '-'), // 1 Proposed Policy Owner Name
        `${data.formData?.Age || '-'} / ${formatDOB_DDMMYYYY(data.formData?.dateOfBirth) || '-'}`, // 2 Age / DOB
        safeLatin(data.meta?.gender?.displayName || '-'), // 3 Gender
        safeLatin(data.meta?.plan?.displayName || data.meta?.plan?.name || '-'), // 4 Product Name (WRAP ONLY THIS)
        safeLatin(data.formData?.SumAssured || '-'), // 5 Sum Assured
        safeLatin(data.meta?.term?.label || '-'), // 6 Policy Term
        safeLatin(data.meta?.payment?.displayName || '-'), // 7 Premium Mode
      ]

      // right column cell width
      const cellW = TABLE.right - TABLE.mid
      const wrapMaxWidth = cellW - paddingX * 2

      // estimate row height from centers (image coords)
      const getRowHeightImg = (idx: number) => {
        if (idx < rowCentersImg.length - 1) return rowCentersImg[idx + 1] - rowCentersImg[idx]
        return rowCentersImg[idx] - rowCentersImg[idx - 1]
      }

      for (let r = 0; r < values.length; r++) {
        const yImg = rowCentersImg[r]
        const y = height - yImg - fontSize * 0.35

        // ✅ ONLY Product Name wraps (row index 4)
        if (r === 4) {
          const rowH = getRowHeightImg(r)
          const cellTopY = height - yImg + rowH / 2

          const lineHeight = fontSize * 1.15
          const maxLines = Math.max(1, Math.floor((rowH - 12) / lineHeight)) // 12px breathing room

          let lines = wrapByWidth(values[r], font, fontSize, wrapMaxWidth)

          // clamp lines + add ellipsis if still too long
          if (lines.length > maxLines) {
            lines = lines.slice(0, maxLines)
            let last = lines[lines.length - 1]
            while (last.length > 0 && font.widthOfTextAtSize(last + '…', fontSize) > wrapMaxWidth) {
              last = last.slice(0, -1)
            }
            lines[lines.length - 1] = (last || '').trimEnd() + '…'
          }

          // draw from top inside the cell
          let yy = cellTopY - fontSize - 6 // 6 = top padding
          for (const line of lines) {
            page.drawText(line, {
              x: valueX,
              y: yy,
              size: fontSize,
              font,
              color: COLORS.black,
            })
            yy -= lineHeight
          }

          continue
        }

        // ✅ all other cells: same as before (single line)
        page.drawText(values[r], {
          x: valueX,
          y,
          size: fontSize,
          font,
          color: COLORS.black,
        })
      }
    }

    // -------- Page 4 tables: regular black (or mix) --------
    if (i === 3) {
      const benefitRowY = [430, 405]
      const benefitX = { type: 85, desc: 220, amount: 450 }

      data.benefits.slice(0, 2).forEach((b, idx) => {
        draw(page, clip(b.type, 16), benefitX.type, benefitRowY[idx], { size: 9, font: fonts.bold })
        draw(page, clip(b.description, 45), benefitX.desc, benefitRowY[idx], {
          size: 9,
          font: fonts.regular,
        })
        draw(page, clip(b.amount, 18), benefitX.amount, benefitRowY[idx], {
          size: 9,
          font: fonts.regular,
        })
      })
    }

    // -------- Page 5: projected values --------
    if (i === 4) {
      const colX = {
        year: 60,
        annualPremium: 145,
        deathBenefit: 245,
        surrenderValue: 345,
        maturityValue: 440,
        paidUpValue: 520,
      }
      const startY = 650
      const rowH = 28

      data.projectedValues.slice(0, 12).forEach((r, idx) => {
        const y = startY - idx * rowH
        draw(page, String(r.year), colX.year, y, { size: 9, font: fonts.regular })
        draw(page, clip(r.annualPremium, 12), colX.annualPremium, y, {
          size: 9,
          font: fonts.regular,
        })
        draw(page, clip(r.deathBenefit, 12), colX.deathBenefit, y, { size: 9, font: fonts.regular })
        draw(page, clip(r.surrenderValue, 12), colX.surrenderValue, y, {
          size: 9,
          font: fonts.regular,
        })
        draw(page, clip(r.maturityValue, 12), colX.maturityValue, y, {
          size: 9,
          font: fonts.regular,
        })
        draw(page, clip(r.paidUpValue, 12), colX.paidUpValue, y, { size: 9, font: fonts.regular })
      })
    }
  }

  const bytes = await pdfDoc.save()
  return Buffer.from(bytes)
}
