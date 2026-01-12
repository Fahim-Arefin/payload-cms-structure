import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import fs from 'node:fs/promises'
import path from 'node:path'
import QRCode from 'qrcode'
import { GlobalFooter } from '@/payload-types'
import { PDFName, PDFArray, PDFString } from 'pdf-lib'

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
  footerData: GlobalFooter
  premiumBreakdown: any
  premiumBreakdownAllModes: Record<string, any>
  apiResponse: any
  // ✅ ADD THIS
  page4?: {
    coreBenefitItems?: string[]
    additionalFeatureItems?: string[]
    importantTerms?: string[]
    maturityBenefit?: string[]
    deathBenefit?: string[]
  }
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

function drawFakeBoldText(
  page: any,
  text: string,
  x: number,
  y: number,
  opts: { size: number; font: PDFFont; color: ReturnType<typeof rgb>; strength?: number },
) {
  const s = opts.strength ?? 0.6 // increase => bolder
  const offsets: Array<[number, number]> = [
    [0, 0],
    [-s, 0],
    [s, 0],
    [0, -s],
    [0, s],
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

function drawWrappedFromTop(
  page: any,
  textRaw: any,
  x: number,
  topYFromTop: number,
  maxWidth: number,
  height: number,
  opts: {
    font: PDFFont
    size: number
    color: ReturnType<typeof rgb>
    lineHeight?: number
  },
) {
  const text = safeLatin(textRaw ?? '')
  const lineHeight = opts.lineHeight ?? opts.size * 1.25
  const lines = wrapByWidth(text, opts.font, opts.size, maxWidth)

  // topYFromTop = top edge of first line box (like your image measurement)
  let y = height - topYFromTop - opts.size

  for (const line of lines) {
    page.drawText(line, { x, y, size: opts.size, font: opts.font, color: opts.color })
    y -= lineHeight
  }

  return y // returns the next y (pdf coord) after drawing
}

function drawTextSegments(
  page: any,
  x: number,
  y: number,
  segments: Array<{ text: string; font: PDFFont; size: number; color: ReturnType<typeof rgb> }>,
) {
  let cursorX = x
  for (const seg of segments) {
    const t = safeLatin(seg.text)
    page.drawText(t, { x: cursorX, y, size: seg.size, font: seg.font, color: seg.color })
    cursorX += seg.font.widthOfTextAtSize(t, seg.size)
  }
}

function addLinkAnnotation(
  pdfDoc: PDFDocument,
  page: any,
  rect: { x: number; y: number; w: number; h: number },
  url: string,
) {
  const { x, y, w, h } = rect
  const ctx = pdfDoc.context

  const linkAnnot = ctx.obj({
    Type: PDFName.of('Annot'),
    Subtype: PDFName.of('Link'),
    Rect: [x, y, x + w, y + h],
    Border: [0, 0, 0],
    A: ctx.obj({
      Type: PDFName.of('Action'),
      S: PDFName.of('URI'),
      URI: PDFString.of(url),
    }),
  })

  const linkRef = ctx.register(linkAnnot)

  // append to existing Annots (or create)
  const existing = page.node.get(PDFName.of('Annots'))
  const annots = existing ? ctx.lookup(existing, PDFArray) : ctx.obj([])

  annots.push(linkRef)
  page.node.set(PDFName.of('Annots'), annots)
}

function drawLabelValueLine(
  pdfDoc: PDFDocument,
  page: any,
  args: {
    x: number
    y: number
    label: string
    value: string
    font: PDFFont
    size: number
    labelColor: ReturnType<typeof rgb>
    valueColor: ReturnType<typeof rgb>
    linkUrl?: string
  },
) {
  const label = safeLatin(args.label)
  const value = safeLatin(args.value)

  // draw label
  page.drawText(label, {
    x: args.x,
    y: args.y,
    size: args.size,
    font: args.font,
    color: args.labelColor,
  })

  const labelW = args.font.widthOfTextAtSize(label, args.size)
  const valueX = args.x + labelW

  // draw value (olive)
  page.drawText(value, {
    x: valueX,
    y: args.y,
    size: args.size,
    font: args.font,
    color: args.valueColor,
  })

  // clickable area ONLY on value part
  if (args.linkUrl) {
    const valueW = args.font.widthOfTextAtSize(value, args.size)
    addLinkAnnotation(
      pdfDoc,
      page,
      { x: valueX, y: args.y, w: valueW, h: args.size * 1.2 },
      args.linkUrl,
    )
  }
}

type ProjectedRow = {
  year: string
  annualPremium: string
  deathBenefit: string
  surrenderValue: string
  maturityValue: string
  paidUpValue: string
}

function drawCellText(
  page: any,
  textRaw: any,
  x: number,
  y: number,
  w: number,
  h: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  align: 'left' | 'center' | 'right' = 'center',
  paddingX = 10,
) {
  const text = safeLatin(textRaw ?? '')
  const textW = font.widthOfTextAtSize(text, size)

  let tx = x + paddingX
  if (align === 'center') tx = x + (w - textW) / 2
  if (align === 'right') tx = x + w - paddingX - textW

  // vertically center
  const ty = y + (h - size) / 2 - 1

  page.drawText(text, { x: tx, y: ty, size, font, color })
}

function drawHeaderMultiline(
  page: any,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
) {
  const lines = String(text).split('\n')
  const lineH = size * 1.1
  const totalH = lines.length * lineH

  // vertically center all lines
  let yy = y + (h + totalH) / 2 - lineH

  for (const line of lines) {
    const t = safeLatin(line)
    const tw = font.widthOfTextAtSize(t, size)
    const tx = x + (w - tw) / 2

    page.drawText(t, { x: tx, y: yy, size, font, color })
    yy -= lineH
  }
}

function drawProjectedValuesTableFromTop(
  page: any,
  args: {
    height: number // page height
    x: number
    topFromTop: number // top of table measured from top
    width: number
    headerH: number
    rowH: number
    rows: ProjectedRow[] // already padded to max rows
    fonts: Fonts
  },
) {
  const { height, x, topFromTop, width, headerH, rowH, rows, fonts } = args

  // colors tuned like your sample
  const C = {
    headerBg: hexToRgb01('#8E9A83'),
    yearColBg: hexToRgb01('#8A957C'),
    rowA: hexToRgb01('#EEF0ED'),
    rowB: hexToRgb01('#F7F8F6'),
    grid: hexToRgb01('#FFFFFF'),
    headerText: hexToRgb01('#FFFFFF'),
    bodyText: hexToRgb01('#2B2B2B'),
  }

  // column widths (sum=1)
  const colPerc = [0.16, 0.17, 0.17, 0.19, 0.17, 0.14]
  const colW = colPerc.map((p) => width * p)

  const headers = [
    'Year',
    'Annual\nPremium',
    'Death\nbenefit',
    'Surrender\nValue',
    'Maturity\nValue',
    'Paid up\nvalue',
  ]

  // table top in PDF coords
  const tableTopY = height - topFromTop
  const tableTotalH = headerH + rows.length * rowH
  const tableBottomY = tableTopY - tableTotalH

  // ---- header background + text ----
  {
    let cx = x
    const y = tableTopY - headerH

    for (let c = 0; c < colW.length; c++) {
      page.drawRectangle({
        x: cx,
        y,
        width: colW[c],
        height: headerH,
        color: C.headerBg,
      })

      // drawHeaderMultiline(page, headers[c], cx, y, colW[c], headerH, fonts.bold, 20, C.headerText)
      drawHeaderMultilineFakeBold(
        page,
        headers[c],
        cx,
        y,
        colW[c],
        headerH,
        fonts.bold,
        20,
        C.headerText,
        0.85, // <- boldness (tweak 0.8 ~ 1.2)
      )

      cx += colW[c]
    }
  }

  // ---- body rows backgrounds + text ----
  for (let r = 0; r < rows.length; r++) {
    const y = tableTopY - headerH - (r + 1) * rowH
    const bg = r % 2 === 0 ? C.rowA : C.rowB

    const row = rows[r]
    const cells = [
      row.year,
      row.annualPremium,
      row.deathBenefit,
      row.surrenderValue,
      row.maturityValue,
      row.paidUpValue,
    ]

    let cx = x
    for (let c = 0; c < colW.length; c++) {
      const cellBg = c === 0 ? C.yearColBg : bg
      page.drawRectangle({
        x: cx,
        y,
        width: colW[c],
        height: rowH,
        color: cellBg,
      })

      // drawCellText(
      //   page,
      //   cells[c],
      //   cx,
      //   y,
      //   colW[c],
      //   rowH,
      //   fonts.bold,
      //   16,
      //   c === 0 ? C.headerText : C.bodyText,
      //   'center',
      //   8,
      // )
      if (c === 0) {
        // ✅ Year column = white text, make it visually bolder
        drawCellTextFakeBold(
          page,
          cells[c],
          cx,
          y,
          colW[c],
          rowH,
          fonts.bold,
          16,
          C.headerText,
          'center',
          8,
          0.85, // <- boldness (tweak 0.7 ~ 1.2)
        )
      } else {
        drawCellText(page, cells[c], cx, y, colW[c], rowH, fonts.bold, 16, C.bodyText, 'center', 8)
      }

      cx += colW[c]
    }
  }

  // ---- white grid lines (rectangle strips) ----
  const gridW = 2

  // outer border
  page.drawRectangle({
    x,
    y: tableBottomY,
    width,
    height: tableTotalH,
    borderColor: C.grid,
    borderWidth: gridW,
  })

  // vertical lines
  {
    let cx = x
    for (let c = 0; c < colW.length - 1; c++) {
      cx += colW[c]
      page.drawRectangle({
        x: cx - gridW / 2,
        y: tableBottomY,
        width: gridW,
        height: tableTotalH,
        color: C.grid,
      })
    }
  }

  // horizontal lines (header bottom + every row)
  {
    const yHeaderBottom = tableTopY - headerH
    page.drawRectangle({
      x,
      y: yHeaderBottom - gridW / 2,
      width,
      height: gridW,
      color: C.grid,
    })

    for (let i = 1; i <= rows.length; i++) {
      const yy = tableTopY - headerH - i * rowH
      page.drawRectangle({
        x,
        y: yy - gridW / 2,
        width,
        height: gridW,
        color: C.grid,
      })
    }
  }

  return { tableTopY, tableBottomY }
}

function makeFakeProjectedRows(maxRows = 28): ProjectedRow[] {
  // simple fake numbers (you can swap format later)
  const fmt = (n: number) => `BDT ${n.toLocaleString('en-US')}`

  const rows: ProjectedRow[] = []
  for (let i = 1; i <= maxRows; i++) {
    const annual = 120000 + i * 4500
    const death = 1000000 + i * 25000
    const surrender = 50000 + i * 18000
    const maturity = 900000 + i * 22000
    const paidup = 200000 + i * 9000

    rows.push({
      year: String(i),
      annualPremium: fmt(annual),
      deathBenefit: fmt(death),
      surrenderValue: fmt(surrender),
      maturityValue: fmt(maturity),
      paidUpValue: fmt(paidup),
    })
  }
  return rows
}

function formatBDT(value: any) {
  const n =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? Number(String(value).replace(/[^\d.-]/g, ''))
        : NaN

  if (!Number.isFinite(n)) return '-'
  return `BDT ${Math.ceil(n).toLocaleString('en-US')}`
}

function drawCellTextFakeBold(
  page: any,
  textRaw: any,
  x: number,
  y: number,
  w: number,
  h: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  align: 'left' | 'center' | 'right' = 'center',
  paddingX = 10,
  strength = 0.8,
) {
  const text = safeLatin(textRaw ?? '')
  const textW = font.widthOfTextAtSize(text, size)

  let tx = x + paddingX
  if (align === 'center') tx = x + (w - textW) / 2
  if (align === 'right') tx = x + w - paddingX - textW

  // vertically center (same as your drawCellText)
  const ty = y + (h - size) / 2 - 1

  drawFakeBoldText(page, text, tx, ty, { size, font, color, strength })
}

function drawHeaderMultilineFakeBold(
  page: any,
  text: string,
  x: number,
  y: number,
  w: number,
  h: number,
  font: PDFFont,
  size: number,
  color: ReturnType<typeof rgb>,
  strength = 0.9,
) {
  const lines = String(text).split('\n')
  const lineH = size * 1.1
  const totalH = lines.length * lineH

  // vertically center all lines
  let yy = y + (h + totalH) / 2 - lineH

  for (const line of lines) {
    const t = safeLatin(line)
    const tw = font.widthOfTextAtSize(t, size)
    const tx = x + (w - tw) / 2

    drawFakeBoldText(page, t, tx, yy, { size, font, color, strength })
    yy -= lineH
  }
}

function yFromTop(height: number, topFromTop: number, fontSize: number) {
  // baseline y (pdf coords) from "top distance"
  return height - topFromTop - fontSize
}

function drawTextFromTop(
  page: any,
  height: number,
  textRaw: any,
  x: number,
  topFromTop: number,
  opts: { font: PDFFont; size: number; color: ReturnType<typeof rgb> },
) {
  const text = safeLatin(textRaw ?? '')
  page.drawText(text, {
    x,
    y: yFromTop(height, topFromTop, opts.size),
    size: opts.size,
    font: opts.font,
    color: opts.color,
  })
}

function drawDashListFromTop(
  page: any,
  height: number,
  items: string[],
  args: {
    x: number
    topFromTop: number
    maxW: number
    font: PDFFont
    size: number
    color: ReturnType<typeof rgb>
    lineHeight?: number
    itemGap?: number
    dashIndent?: number // indent for wrapped lines after dash
  },
) {
  const lineH = args.lineHeight ?? args.size * 1.35
  const gap = args.itemGap ?? args.size * 0.65
  const indent = args.dashIndent ?? 18

  let t = args.topFromTop

  for (const it of items) {
    const raw = safeLatin(it ?? '').trim()
    if (!raw) continue

    // wrap without dash first, then prepend dash to first line
    const lines = wrapByWidth(raw, args.font, args.size, args.maxW - indent)

    if (lines.length === 0) continue

    // first line with dash
    const first = `- ${lines[0]}`
    drawTextFromTop(page, height, first, args.x, t, {
      font: args.font,
      size: args.size,
      color: args.color,
    })
    t += lineH

    // wrapped continuation lines aligned after dash
    for (let i = 1; i < lines.length; i++) {
      drawTextFromTop(page, height, lines[i], args.x + indent, t, {
        font: args.font,
        size: args.size,
        color: args.color,
      })
      t += lineH
    }

    t += gap
  }

  return t
}

type AutoTableCol = {
  key: string
  header: string
  width: number
  align?: 'left' | 'center' | 'right'
}

function drawAutoTableFromTop(
  page: any,
  height: number,
  args: {
    x: number
    topFromTop: number
    cols: AutoTableCol[]
    headerH: number
    minRowH: number
    paddingX?: number
    paddingY?: number
    font: PDFFont
    fontBold: PDFFont
    size: number
    headerSize?: number
    lineHeight?: number
    gridW?: number
    headerBg: ReturnType<typeof rgb>
    headerText: ReturnType<typeof rgb>
    bodyText: ReturnType<typeof rgb>
    rowBgA: ReturnType<typeof rgb>
    rowBgB: ReturnType<typeof rgb>
    grid: ReturnType<typeof rgb>
    rows: Array<Record<string, any>> // 0..2 rows
    renderEmptyRow?: boolean // if rows=0 => still show one empty row
  },
) {
  const padX = args.paddingX ?? 14
  const padY = args.paddingY ?? 10
  const headerSize = args.headerSize ?? args.size
  const lineH = args.lineHeight ?? args.size * 1.25
  const gridW = args.gridW ?? 2

  const totalW = args.cols.reduce((s, c) => s + c.width, 0)

  let t = args.topFromTop

  // header row
  {
    let cx = args.x
    const headerTop = t
    const y = height - (headerTop + args.headerH)

    for (const c of args.cols) {
      page.drawRectangle({ x: cx, y, width: c.width, height: args.headerH, color: args.headerBg })

      // "fake-bold" header text (white)
      const lines = String(c.header).split('\n')
      const lh = headerSize * 1.1
      const blockH = lines.length * lh
      let yy = y + (args.headerH + blockH) / 2 - lh

      for (const line of lines) {
        const tx = cx + padX
        // center header text within each col
        const tClean = safeLatin(line)
        const tw = args.fontBold.widthOfTextAtSize(tClean, headerSize)
        const centeredX = cx + (c.width - tw) / 2

        drawFakeBoldText(page, tClean, centeredX, yy, {
          size: headerSize,
          font: args.fontBold,
          color: args.headerText,
          strength: 0.7,
        })
        yy -= lh
      }

      cx += c.width
    }

    t += args.headerH
  }

  const rowsToDraw =
    args.rows.length > 0 ? args.rows : args.renderEmptyRow ? [{ __empty: true }] : []

  // body rows (dynamic heights with wrapping)
  for (let r = 0; r < rowsToDraw.length; r++) {
    const row = rowsToDraw[r]
    const bg = r % 2 === 0 ? args.rowBgA : args.rowBgB

    // measure row height by max wrapped lines among cells
    let maxLines = 1
    for (const col of args.cols) {
      const val = row.__empty ? '' : safeLatin(row[col.key] ?? '')
      const maxW = Math.max(1, col.width - padX * 2)
      const lines = wrapByWidth(val, args.font, args.size, maxW)
      maxLines = Math.max(maxLines, Math.max(1, lines.length))
    }
    const neededH = padY * 2 + maxLines * lineH
    const rowH = Math.max(args.minRowH, neededH)

    // draw cells
    let cx = args.x
    const rowTop = t
    const rowBottomY = height - (rowTop + rowH)

    for (const col of args.cols) {
      // cell bg
      page.drawRectangle({ x: cx, y: rowBottomY, width: col.width, height: rowH, color: bg })

      // cell text (wrapped)
      const val = row.__empty ? '' : safeLatin(row[col.key] ?? '')
      drawWrappedTextInCell(page, val, cx, rowBottomY, col.width, rowH, {
        font: args.font,
        size: args.size,
        color: args.bodyText,
        padding: padX,
        lineHeight: lineH,
        minSize: args.size, // keep same
        ellipsis: true,
      })

      cx += col.width
    }

    t += rowH
  }

  // grid lines (outer + inner)
  {
    const topY = height - args.topFromTop
    const bottomY = height - t

    // outer border
    page.drawRectangle({
      x: args.x,
      y: bottomY,
      width: totalW,
      height: topY - bottomY,
      borderColor: args.grid,
      borderWidth: gridW,
    })

    // verticals
    let cx = args.x
    for (let i = 0; i < args.cols.length - 1; i++) {
      cx += args.cols[i].width
      page.drawRectangle({
        x: cx - gridW / 2,
        y: bottomY,
        width: gridW,
        height: topY - bottomY,
        color: args.grid,
      })
    }

    // header bottom line
    const headerBottomY = height - (args.topFromTop + args.headerH)
    page.drawRectangle({
      x: args.x,
      y: headerBottomY - gridW / 2,
      width: totalW,
      height: gridW,
      color: args.grid,
    })
  }

  return t // next topFromTop cursor
}

function drawSemiBoldFromTop(
  page: any,
  height: number,
  textRaw: any,
  x: number,
  topFromTop: number,
  opts: {
    font: PDFFont
    size: number
    color: ReturnType<typeof rgb>
    strength?: number // 0.25 ~ 0.7 (tune)
  },
) {
  const text = safeLatin(textRaw ?? '')
  const y = height - topFromTop - opts.size
  drawFakeBoldText(page, text, x, y, {
    size: opts.size,
    font: opts.font,
    color: opts.color,
    strength: opts.strength ?? 0.35, // ✅ semibold default
  })
}

function generateDeathBenefitAmount(planCode: number, amount: number): number {
  if (planCode === 5 || planCode === 6 || planCode === 7) {
    return amount
  }
  if (planCode === 8 || planCode === 11) {
    return Math.ceil(amount / 100)
  }

  if (planCode === 9 || planCode === 12) {
    return Math.ceil((amount * 2) / 100)
  }
  if (planCode === 10 || planCode === 13) {
    return Math.ceil((amount * 3) / 100)
  }

  return 0
}

export async function generateQuotePdf(data: IllustrationData) {
  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)

  // Fallback (if any of your font files missing)
  const fallback = await pdfDoc.embedFont(StandardFonts.Helvetica)

  const fontDir = path.join(process.cwd(), 'public', 'pdfFont')

  const fonts: Fonts = {
    regular: await loadFontOrFallback(pdfDoc, path.join(fontDir, 'Avenir Regular.ttf'), fallback),
    bold: await loadFontOrFallback(pdfDoc, path.join(fontDir, 'Avenir Heavy.ttf'), fallback),
  }

  // Colors (0..1)
  const COLORS = {
    gold: rgb(156 / 255, 134 / 255, 57 / 255),
    // black: rgb(0, 0, 0),
    black: rgb(38 / 255, 38 / 255, 38 / 255), // #262626
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

    if (i === 2) {
      const TABLE = { left: 143, mid: 815, right: 1233 }
      const paddingX = 24
      const valueX = TABLE.mid + paddingX

      const font = fonts.bold
      const fontSize = 27

      const rowCentersImg = [
        322.0, 388.0, 456.5, 535.5, 618.5, 697.0, 772.5, 853.0, 925.0, 992.5, 1072.0,
      ]

      const values = [
        safeLatin(data.formData?.name || '-'), // 0 Proposed Insured Name
        safeLatin(data.formData?.name || '-'), // 1 Proposed Policy Owner Name
        `${data.formData?.Age || '-'} / ${formatDOB_DDMMYYYY(data.formData?.dateOfBirth) || '-'}`, // 2 Age / DOB
        safeLatin(data.meta?.gender?.displayName || '-'), // 3 Gender
        safeLatin(data.meta?.plan?.displayName || data.meta?.plan?.name || '-'), // 4 Product Name (WRAP ONLY THIS)
        safeLatin(formatBDT(data.formData?.SumAssured)), // 5 Sum Assured
        safeLatin(data.meta?.term?.label || '-'), // 6 Policy Term
        safeLatin(data.meta?.payment?.displayName || '-'), // 7 Premium Mode
        // safeLatin(Math.ceil(data.premiumBreakdown.basicPremium) || '-'), // Basic Premium
        // safeLatin(
        //   data.premiumBreakdown.addOns.reduce(
        //     (acc: any, addon: any) => acc + Math.ceil(addon.amount),
        //     0,
        //   ) || '-',
        // ), // Rider Premium
        // safeLatin(Math.ceil(data.premiumBreakdown.totalPremium) || '-'), // Total Modal Premium
        // ✅ last 3 rows with BDT
        safeLatin(formatBDT(data.premiumBreakdown?.basicPremium)), // 8 Basic Premium
        safeLatin(
          formatBDT(
            (data.premiumBreakdown?.addOns || []).reduce(
              (acc: number, addon: any) => acc + (Number(addon?.amount) || 0),
              0,
            ),
          ),
        ), // 9 Rider Premium
        safeLatin(formatBDT(data.premiumBreakdown?.totalPremium)), // 10 Total Modal Premium
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
        // if (r === 4) {
        //   const rowH = getRowHeightImg(r)
        //   const cellTopY = height - yImg + rowH / 2

        //   const lineHeight = fontSize * 1.15
        //   const maxLines = Math.max(1, Math.floor((rowH - 12) / lineHeight)) // 12px breathing room

        //   let lines = wrapByWidth(values[r], font, fontSize, wrapMaxWidth)

        //   // clamp lines + add ellipsis if still too long
        //   if (lines.length > maxLines) {
        //     lines = lines.slice(0, maxLines)
        //     let last = lines[lines.length - 1]
        //     while (last.length > 0 && font.widthOfTextAtSize(last + '…', fontSize) > wrapMaxWidth) {
        //       last = last.slice(0, -1)
        //     }
        //     lines[lines.length - 1] = (last || '').trimEnd() + '…'
        //   }

        //   // draw from top inside the cell
        //   let yy = cellTopY - fontSize - 6 // 6 = top padding
        //   for (const line of lines) {
        //     page.drawText(line, {
        //       x: valueX,
        //       y: yy,
        //       size: fontSize,
        //       font,
        //       color: COLORS.black,
        //     })
        //     yy -= lineHeight
        //   }

        //   continue
        // }
        if (r === 4) {
          const rowH = getRowHeightImg(r)

          // cell top/bottom (PDF coords)
          const cellTopY = height - yImg + rowH / 2
          const cellBottomY = height - yImg - rowH / 2

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

          // ✅ vertical center: compute total text block height
          const blockH = lines.length * lineHeight

          // start baseline for first line so the whole block is centered
          // (baseline approx one fontSize below the "top" of the line)
          let yy = cellBottomY + (rowH - blockH) / 2 + (blockH - fontSize)

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

    // -------- Page 4: dynamic content (Key Product Features + 2 dynamic tables + Important Terms) --------
    if (i === 3) {
      /**
       * ✅ FAKE DATA (replace later with your props)
       * - coreBenefitItems: string[]
       * - additionalFeatureItems: string[]
       * - baseProductCoverageRows: 0..2 rows
       * - riderCoverageRows: 0..2 rows
       * - importantTerms: string[]
       */

      // const coreBenefitItems = [
      //   'Life coverage for the full policy term',
      //   'Premium accumulation & interest crediting (if applicable)',
      //   'Benefit payable on death or maturity',
      // ]

      // const additionalFeatureItems = [
      //   'Policy loans / withdrawals (if applicable)',
      //   'Rider add-ons',
      //   'Flexible premium payment options',
      //   'Grace period benefits (as per policy rules)',
      //   'Auto premium loan (if applicable)',
      // ]

      // const importantTerms = [
      //   'Illustration based on disclosed age ,',
      //   'Early surrender may result in lower value',
      //   'Exclusions apply',
      // ]

      const coreBenefitItems = data.page4?.coreBenefitItems ?? []
      const additionalFeatureItems = data.page4?.additionalFeatureItems ?? []
      const importantTerms = data.page4?.importantTerms ?? []
      const maturityBenefit = data.page4?.maturityBenefit || []
      const deathBenefit = data.page4?.deathBenefit || []

      // console.log('coreBenefitItems', coreBenefitItems)
      // console.log('additionalFeatureItems', additionalFeatureItems)
      // console.log('importantTerms', importantTerms)
      // console.log('maturityBenefit', maturityBenefit)
      // console.log('deathBenefit', deathBenefit)

      // 0..2 rows
      const baseProductCoverageRows: Array<{ type: string; description: string; amount: string }> =
        [
          {
            type: 'Death Benefit',
            description: `${deathBenefit.join(' ') || 'No Description Available'}`,
            amount: `BDT ${generateDeathBenefitAmount(data?.meta?.plan?.code || 0, Number(data?.formData?.SumAssured) || 0) === 0 ? '-' : generateDeathBenefitAmount(data?.meta?.plan?.code || 0, Number(data?.formData?.SumAssured) || 0)}`,
          },
          {
            type: 'Maturity Benefit',
            description: `${maturityBenefit.join(' ') || 'No Description Available'}`,
            amount: `BDT ${data?.formData?.SumAssured || '-'}`,
          },
        ].slice(0, 2)

      // 0..2 rows
      // const riderCoverageRows: Array<{
      //   name: string
      //   description: string
      //   coverageAmount: string
      //   premium: string
      // }> = [
      //   {
      //     name: 'Critical Illness (19)',
      //     description: 'Coverage for 19 critical illnesses',
      //     coverageAmount: 'BDT 2,00,000',
      //     premium: 'BDT 450',
      //   },
      //   {
      //     name: 'Accidental Benefit',
      //     description: 'Additional payout on accidental death',
      //     coverageAmount: 'BDT 3,00,000',
      //     premium: 'BDT 300',
      //   },
      // ].slice(0, 2)

      const generateCoverageAmount = (key: string): number => {
        if (key === 'ci19') {
          return Math.ceil(data?.apiResponse?.ci_coverage) || 0
        }
        if (key === 'ci25') {
          return Math.ceil(data?.apiResponse?.ci_coverage) || 0
        }
        if (key === 'accident') {
          return Math.ceil(data?.apiResponse?.accidental_coverage) || 0
        }
        return 0
      }

      const generateRiderArray = () => {
        const riders = data?.premiumBreakdown?.addOns || []
        const ridersFromAPI = JSON?.parse(data?.apiResponse?.rider_info || [])

        console.log('riders', riders)
        console.log('ridersFromAPI', ridersFromAPI)

        const arr: Array<{
          name: string
          description: string
          coverageAmount: string
          premium: string
        }> = []

        for (let i = 0; i < riders.length; i++) {
          const rider = riders[i]
          arr.push({
            name: `Dummy Label `,
            description: `${rider.key || '-'}`,
            coverageAmount: `BDT ${generateCoverageAmount(rider.key || '-')}`,
            premium: `BDT ${Math.ceil(rider.amount)}`,
          })
        }
        return arr
      }

      const riderCoverageRows: Array<{
        name: string
        description: string
        coverageAmount: string
        premium: string
      }> = generateRiderArray()

      // ------------------------------
      // Styling (match your template)
      // ------------------------------
      const C = {
        orange: hexToRgb01('#FF751F'),
        olive: hexToRgb01('#989433'),
        // ✅ your requested "black" replacement: #262626
        ink: hexToRgb01('#262626'),
        white: hexToRgb01('#FFFFFF'),

        // table palette like your page-5 table but adapted to page-4 sample
        tableHeaderBg: hexToRgb01('#8E9A83'),
        tableYearColBg: hexToRgb01('#8A957C'),
        tableRowA: hexToRgb01('#EEF0ED'),
        tableRowB: hexToRgb01('#F7F8F6'),
        tableGrid: hexToRgb01('#FFFFFF'),
        disclaimerRed: hexToRgb01('#8B2D2D'),
      }

      // ------------------------------
      // Helpers (local to i===3 block)
      // ------------------------------

      // fake "semi-bold" (like your bottom right static text)
      const drawSemiBold = (textRaw: any, x: number, y: number, size: number, color = C.ink) => {
        const text = safeLatin(textRaw ?? '')
        // slightly stronger than regular, less than heavy
        drawFakeBoldText(page, text, x, y, { size, font: fonts.regular, color, strength: 0.35 })
      }

      const drawSemiBoldFromTop = (
        textRaw: any,
        x: number,
        topFromTop: number,
        size: number,
        color = C.ink,
      ) => {
        const y = height - topFromTop - size * 0.25
        drawSemiBold(textRaw, x, y, size, color)
        return y
      }

      const drawNormalFromTop = (
        textRaw: any,
        x: number,
        topFromTop: number,
        size: number,
        color = C.ink,
        font: PDFFont = fonts.regular,
      ) => {
        const text = safeLatin(textRaw ?? '')
        const y = height - topFromTop - size * 0.25
        page.drawText(text, { x, y, size, font, color })
        return y
      }

      const drawBulletsFromTop = (
        items: string[],
        x: number,
        topFromTop: number,
        opts: { size: number; maxW: number },
      ) => {
        const bullet = '- '
        const lineH = opts.size * 1.35

        // current top baseline (pdf y)
        let y = height - topFromTop - opts.size * 0.25

        for (const item of items) {
          const text = safeLatin(item)
          const lines = wrapByWidth(text, fonts.regular, opts.size, opts.maxW - 16) // leave for bullet
          for (let iLine = 0; iLine < lines.length; iLine++) {
            const prefix = iLine === 0 ? bullet : '  '
            page.drawText(prefix + lines[iLine], {
              x,
              y,
              size: opts.size,
              font: fonts.regular,
              color: C.ink,
            })
            y -= lineH
          }
          // small gap between bullet items
          y -= opts.size * 0.15
        }

        // return next topFromTop (converted) position for chaining
        const consumed = height - (y + opts.size * 0.25)
        return consumed
      }

      /**
       * ✅ Dynamic table drawer (0..2 rows, wrapped cells, bigger cell height than page-6)
       * Uses "from TOP" for placement. Returns new topFromTop after table.
       */
      const drawDynamicTableFromTop = (args: {
        x: number
        topFromTop: number
        width: number
        columns: Array<{ key: string; title: string; perc: number }>
        rows: Array<Record<string, any>>
        headerH?: number
        rowH?: number // minimum row height
        fontSize?: number
        padding?: number
      }) => {
        const headerH = args.headerH ?? 52
        const minRowH = args.rowH ?? 56
        const fontSize = args.fontSize ?? 18
        const padding = args.padding ?? 14
        const lineHeight = fontSize * 1.25

        const colW = args.columns.map((c) => args.width * c.perc)

        // ✅ compute dynamic row heights based on description wrap needs
        const rowHeights = args.rows.map((row) => {
          const descCol = args.columns.find((c) => c.key === 'description')
          if (!descCol) return minRowH

          const descText = safeLatin(row?.description ?? '')
          const descIndex = args.columns.findIndex((c) => c.key === 'description')
          const maxW = Math.max(1, colW[descIndex] - padding * 2)

          const lines =
            descText && fonts.regular.widthOfTextAtSize(descText, fontSize) > maxW
              ? wrapByWidth(descText, fonts.regular, fontSize, maxW)
              : [descText]

          const neededH = padding * 2 + lines.length * lineHeight
          return Math.max(minRowH, neededH)
        })

        const tableTopY = height - args.topFromTop
        const bodyH = rowHeights.reduce((a, b) => a + b, 0)
        const tableTotalH = headerH + bodyH
        const tableBottomY = tableTopY - tableTotalH

        // ---------------- header ----------------
        {
          let cx = args.x
          const y = tableTopY - headerH

          for (let c = 0; c < args.columns.length; c++) {
            page.drawRectangle({
              x: cx,
              y,
              width: colW[c],
              height: headerH,
              color: C.tableHeaderBg,
            })

            const title = safeLatin(args.columns[c].title)
            const tw = fonts.bold.widthOfTextAtSize(title, fontSize)
            const tx = cx + (colW[c] - tw) / 2
            const ty = y + (headerH - fontSize) / 2 - 1

            // ✅ stronger header "bold"
            drawFakeBoldText(page, title, tx, ty, {
              size: fontSize,
              font: fonts.bold,
              color: C.white,
              strength: 0.9,
            })

            cx += colW[c]
          }
        }

        // ---------------- body (dynamic row heights) ----------------
        let yCursorTop = tableTopY - headerH // top edge of body

        for (let r = 0; r < args.rows.length; r++) {
          const rowH = rowHeights[r]
          const y = yCursorTop - rowH
          const bg = r % 2 === 0 ? C.tableRowA : C.tableRowB

          let cx = args.x

          for (let c = 0; c < args.columns.length; c++) {
            page.drawRectangle({ x: cx, y, width: colW[c], height: rowH, color: bg })

            const col = args.columns[c]
            const key = col.key
            const text = safeLatin(args.rows[r]?.[key] ?? '')
            const maxW = Math.max(1, colW[c] - padding * 2)

            if (key === 'description') {
              // ✅ wrap only when needed, otherwise single line
              if (fonts.regular.widthOfTextAtSize(text, fontSize) <= maxW) {
                drawCellText(
                  page,
                  text,
                  cx,
                  y,
                  colW[c],
                  rowH,
                  fonts.regular,
                  fontSize,
                  C.ink,
                  'left',
                  padding,
                )
              } else {
                // ✅ NO ellipsis now because rowH grows to fit
                drawWrappedTextInCell(page, text, cx, y, colW[c], rowH, {
                  font: fonts.regular,
                  size: fontSize,
                  color: C.ink,
                  padding,
                  lineHeight,
                  minSize: 13,
                  ellipsis: false,
                })
              }
            } else {
              // other columns single line centered
              drawCellText(
                page,
                text,
                cx,
                y,
                colW[c],
                rowH,
                fonts.regular,
                fontSize,
                C.ink,
                'center',
                padding,
              )
            }

            cx += colW[c]
          }

          yCursorTop = y // next row starts below this one
        }

        // ---------------- grid lines ----------------
        const gridW = 2
        page.drawRectangle({
          x: args.x,
          y: tableBottomY,
          width: args.width,
          height: tableTotalH,
          borderColor: C.tableGrid,
          borderWidth: gridW,
        })

        // vertical
        {
          let cx = args.x
          for (let c = 0; c < colW.length - 1; c++) {
            cx += colW[c]
            page.drawRectangle({
              x: cx - gridW / 2,
              y: tableBottomY,
              width: gridW,
              height: tableTotalH,
              color: C.tableGrid,
            })
          }
        }

        // horizontal: header bottom + each dynamic row boundary
        {
          const yHeaderBottom = tableTopY - headerH
          page.drawRectangle({
            x: args.x,
            y: yHeaderBottom - gridW / 2,
            width: args.width,
            height: gridW,
            color: C.tableGrid,
          })

          let yy = yHeaderBottom
          for (let r = 0; r < rowHeights.length; r++) {
            yy -= rowHeights[r]
            page.drawRectangle({
              x: args.x,
              y: yy - gridW / 2,
              width: args.width,
              height: gridW,
              color: C.tableGrid,
            })
          }
        }

        // ✅ return next cursor (table height is dynamic now)
        return args.topFromTop + tableTotalH + 34
      }

      // ------------------------------
      // Layout (from TOP, dynamic stacking)
      // Tune ONLY the base X/top if needed
      // ------------------------------
      const L = {
        x: 150,
        maxW: 1100,
        top: 340, // starting block under the orange ribbon (tune if needed)
        titleSize: 30,
        subTitleSize: 26,
        bodySize: 22,
        gapBig: 26,
        gapSmall: 14,
      }

      let cursorTop = L.top

      // ✅ Key Product Features (semi-bold olive)
      drawSemiBoldFromTop('Key Product Features', L.x, cursorTop, L.titleSize, C.olive)
      cursorTop += L.titleSize + L.gapSmall

      // ✅ Core Benefit Structure (orange)
      drawSemiBoldFromTop('Core Benefit Structure', L.x, cursorTop, L.subTitleSize, C.orange)
      cursorTop += L.subTitleSize + 10

      // bullets (core)
      cursorTop =
        drawBulletsFromTop(coreBenefitItems, L.x, cursorTop, {
          size: L.bodySize,
          maxW: L.maxW,
        }) + 8

      cursorTop += L.gapSmall

      // ✅ Additional Features (orange)
      drawSemiBoldFromTop('Additional Features:', L.x, cursorTop, L.subTitleSize, C.orange)
      cursorTop += L.subTitleSize + 10

      // bullets (additional)
      cursorTop =
        drawBulletsFromTop(additionalFeatureItems, L.x, cursorTop, {
          size: L.bodySize,
          maxW: L.maxW,
        }) + 10

      cursorTop += L.gapBig

      // ✅ Coverage & Benefit Details (semi-bold olive)
      drawSemiBoldFromTop('Coverage & Benefit Details', L.x, cursorTop, L.titleSize, C.olive)
      cursorTop += L.titleSize + L.gapSmall

      // ✅ Base Product Coverage (orange)
      drawSemiBoldFromTop('Base Product Coverage', L.x, cursorTop, L.subTitleSize, C.orange)
      cursorTop += L.subTitleSize + 14

      // Table 1 (0..2 rows) - only draw if any rows
      if (baseProductCoverageRows.length) {
        cursorTop = drawDynamicTableFromTop({
          x: L.x,
          topFromTop: cursorTop,
          width: L.maxW,
          columns: [
            { key: 'type', title: 'Benefit Type', perc: 0.34 },
            { key: 'description', title: 'Description', perc: 0.42 },
            { key: 'amount', title: 'Amount', perc: 0.24 },
          ],
          rows: baseProductCoverageRows,
          headerH: 50,
          rowH: 64, // ✅ larger cell area
          fontSize: 20,
          padding: 16,
        })
      } else {
        // if no rows, still keep a small gap
        cursorTop += 22
      }

      cursorTop += 8

      // ✅ Rider Coverage (orange + note line)
      generateRiderArray()?.length > 0 &&
        drawSemiBoldFromTop('Rider Coverage', L.x, cursorTop, L.subTitleSize, C.orange)
      cursorTop += L.subTitleSize + 10

      // note line (regular)
      generateRiderArray()?.length > 0 &&
        drawNormalFromTop(
          'The following coverage is applicable only on Owner',
          L.x,
          cursorTop,
          L.bodySize,
          C.ink,
          fonts.regular,
        )
      cursorTop += L.bodySize + 18

      // Table 2 (0..2 rows)
      if (riderCoverageRows.length) {
        cursorTop = drawDynamicTableFromTop({
          x: L.x,
          topFromTop: cursorTop,
          width: L.maxW,
          columns: [
            { key: 'name', title: 'Rider Name', perc: 0.25 },
            { key: 'description', title: 'Description', perc: 0.35 },
            { key: 'coverageAmount', title: 'Coverage Amount', perc: 0.2 },
            { key: 'premium', title: 'Premium', perc: 0.2 },
          ],
          rows: riderCoverageRows,
          headerH: 50,
          rowH: 64,
          fontSize: 20,
          padding: 16,
        })
      } else {
        cursorTop += 22
      }

      cursorTop += L.gapBig

      // ✅ Important Terms & Disclaimers (semi-bold like template)
      drawSemiBoldFromTop(
        'Important Terms & Disclaimers',
        L.x,
        cursorTop,
        L.titleSize,
        C.disclaimerRed,
      )
      cursorTop += L.titleSize + 10

      // bullet list (important terms)
      cursorTop =
        drawBulletsFromTop(
          importantTerms.map((t) => `• ${t}`), // render as dot bullets (like sample)
          L.x + 20,
          cursorTop,
          { size: L.bodySize, maxW: L.maxW - 20 },
        ) + 0
    }

    // -------- Page 5: projected values (DYNAMIC TABLE DESIGN) --------
    if (i === 4) {
      // max rows = 28 (fake data)
      const rows = makeFakeProjectedRows(15)

      // ✅ table placement (measured like your other blocks)
      // You will tune ONLY these 4 numbers to match the PNG layout:
      const TABLE = {
        x: 160,
        topFromTop: 350, // where the table starts from the TOP of page
        width: 1100,
        headerH: 60,
        rowH: 44,
      }

      drawProjectedValuesTableFromTop(page, {
        height,
        x: TABLE.x,
        topFromTop: TABLE.topFromTop,
        width: TABLE.width,
        headerH: TABLE.headerH,
        rowH: TABLE.rowH,
        rows,
        fonts,
      })
    }

    // -------- Page 6: QR code generation and other data --------
    if (i === 5) {
      // -------------------------------------------------------
      // Fake dynamic data (replace later with real data)
      // -------------------------------------------------------
      const page6Data = {
        customerName: safeLatin(data.formData?.name || '-'),
        gender: safeLatin(data.meta?.gender?.displayName || '-'), // or 'Female'
        brochureUrl:
          'https://shantalife.com/api/media/file/Child%20Education%20Security%20Plan-compressed-1.pdf', // QR will point here
      }

      const salutation = page6Data.gender.toLowerCase().startsWith('f') ? 'MS' : 'MR'
      const nameText = safeLatin(`${salutation} ${page6Data.customerName}`)

      // -------------------------------------------------------
      // Coordinates measured from page-6_old.png
      // Image size is ~1415 x 2000 (same as your template PNG)
      // We use "from TOP" coordinates then convert to PDF coords.
      // -------------------------------------------------------

      // --- Name (top-left) ---
      const NAME = {
        x: 154, // left
        yBottomFromTop: 316, // bottom of text bbox (from top)
        fontSize: 28,
        color: hexToRgb01('#989433'), // sampled from old image (olive)
      }

      const nameY = height - NAME.yBottomFromTop - NAME.fontSize * 0.25
      drawFakeBoldText(page, nameText, NAME.x, nameY, {
        size: NAME.fontSize,
        font: fonts.regular, // heavy
        color: NAME.color,
        strength: 0.5, // increase if you want even bolder
      })

      // --- QR (top-right) ---
      // bbox from old image roughly: x=1029..1256, y=243..472
      const QR = {
        x: 1029,
        yTopFromTop: 243,
        w: 227,
        h: 229,
      }

      // Generate QR PNG dynamically (best way)
      const qrPng = await QRCode.toBuffer(page6Data.brochureUrl, {
        type: 'png',
        width: 300, // generate larger then we scale down => sharper
        margin: 1,
        errorCorrectionLevel: 'M',
      })

      const qrImg = await pdfDoc.embedPng(qrPng)

      const qrY = height - QR.yTopFromTop - QR.h
      page.drawImage(qrImg, {
        x: QR.x,
        y: qrY,
        width: QR.w,
        height: QR.h,
      })

      // ------------------------------
      // Page 6: Bottom Contact Block
      // ------------------------------

      // ------------------------------
      // Page 6: Bottom Contact Block
      // ------------------------------

      const OLIVE = hexToRgb01('#989433')
      const ORANGE = hexToRgb01('#ff751f')
      const BLACK = COLORS.black

      const phoneRaw = safeLatin(data?.footerData?.branding?.phone || '')
      const emailRaw = safeLatin(data?.footerData?.branding?.email || '')
      const addressRaw = safeLatin(data?.footerData?.branding?.address || '')

      // build links
      const telDigits = phoneRaw.replace(/[^\d+]/g, '') // keep + and digits
      const telHref = telDigits ? `tel:${telDigits}` : undefined
      const mailHref = emailRaw ? `mailto:${emailRaw}` : undefined
      const siteHref = 'https://shantalife.com/'

      // positions (tune only topFromTop if needed)
      const CONTACT = {
        x: 110,
        topFromTop: 1250,
        maxW: 1250, // ✅ width for wrapping
        titleSize: 30,
        bodySize: 28,
        lineGap: 40,
      }

      // Title
      drawWrappedFromTop(
        page,
        'For Any Clarifications, Please Contact :',
        CONTACT.x,
        CONTACT.topFromTop,
        CONTACT.maxW,
        height,
        {
          font: fonts.regular,
          size: CONTACT.titleSize,
          color: BLACK,
          lineHeight: CONTACT.titleSize * 1.25,
        },
      )

      // "Shanta Life Insurance PLC Customer Service"
      const line1Y = height - (CONTACT.topFromTop + 60) - CONTACT.bodySize
      drawTextSegments(page, CONTACT.x, line1Y, [
        {
          text: 'Shanta Life Insurance PLC ',
          font: fonts.regular,
          size: CONTACT.bodySize,
          color: BLACK,
        },
        { text: 'Customer Service', font: fonts.regular, size: CONTACT.bodySize, color: OLIVE },
      ])

      // Next lines base Y (pdf coords)
      const baseTop = CONTACT.topFromTop + 110
      const yPhone = height - baseTop - CONTACT.bodySize
      const yEmail = yPhone - CONTACT.lineGap
      const yWeb = yEmail - CONTACT.lineGap
      const yAddr = yWeb - CONTACT.lineGap

      // Phone: <olive value clickable>
      drawLabelValueLine(pdfDoc, page, {
        x: CONTACT.x,
        y: yPhone,
        label: 'Phone : ',
        value: phoneRaw || '—',
        font: fonts.regular,
        size: CONTACT.bodySize,
        labelColor: BLACK,
        valueColor: OLIVE,
        linkUrl: telHref,
      })

      // Email: <olive value clickable>
      drawLabelValueLine(pdfDoc, page, {
        x: CONTACT.x,
        y: yEmail,
        label: 'Email : ',
        value: emailRaw || '—',
        font: fonts.regular,
        size: CONTACT.bodySize,
        labelColor: BLACK,
        valueColor: OLIVE,
        linkUrl: mailHref,
      })

      // Website: Shanta Life (olive + clickable)
      drawLabelValueLine(pdfDoc, page, {
        x: CONTACT.x,
        y: yWeb,
        label: 'Website : ',
        value: 'Shanta Life',
        font: fonts.regular,
        size: CONTACT.bodySize,
        labelColor: BLACK,
        valueColor: OLIVE,
        linkUrl: siteHref,
      })

      /**
       * ✅ Office Address: WRAP the VALUE to next line(s)
       * - Label stays on first line
       * - Value starts right after label, then continues on next lines aligned with value start
       */
      {
        const label = 'Office Address : '
        const value = addressRaw || '—'

        const labelW = fonts.regular.widthOfTextAtSize(label, CONTACT.bodySize)
        const valueX = CONTACT.x + labelW

        // available width for the value portion on the first line
        const firstLineMaxW = Math.max(1, CONTACT.maxW - labelW)

        // wrap based on first-line available width
        const lines = wrapByWidth(value, fonts.regular, CONTACT.bodySize, firstLineMaxW)

        // draw label (black)
        page.drawText(label, {
          x: CONTACT.x,
          y: yAddr,
          size: CONTACT.bodySize,
          font: fonts.regular,
          color: BLACK,
        })

        // draw first line (olive) right after label
        if (lines.length) {
          page.drawText(lines[0], {
            x: valueX,
            y: yAddr,
            size: CONTACT.bodySize,
            font: fonts.regular,
            color: OLIVE,
          })
        }

        // draw remaining lines under the value start (same x as valueX)
        let yy = yAddr - CONTACT.lineGap
        for (let i = 1; i < lines.length; i++) {
          page.drawText(lines[i], {
            x: valueX,
            y: yy,
            size: CONTACT.bodySize,
            font: fonts.regular,
            color: OLIVE,
          })
          yy -= CONTACT.lineGap
        }
      }
    }
  }

  const bytes = await pdfDoc.save()
  return Buffer.from(bytes)
}
