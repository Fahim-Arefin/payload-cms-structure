export function decodeDataURL(dataURL: string): { buffer: Buffer; mime: string; ext: string } {
  const m = dataURL.match(/^data:(.+);base64,(.*)$/)
  if (!m) throw new Error('Invalid dataURL')
  const mime = m[1]
  const b64 = m[2]
  const buffer = Buffer.from(b64, 'base64')
  const ext = mime.split('/')[1] || 'bin'
  return { buffer, mime, ext }
}
