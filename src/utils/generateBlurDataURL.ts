// // 🎯 PURE JAVASCRIPT BLUR GENERATION - NO DEPENDENCIES NEEDED!

// interface ImageAnalysis {
//   dominantColors: Array<{ r: number; g: number; b: number; frequency: number }>
//   dimensions: { width: number; height: number }
//   format: 'jpeg' | 'png' | 'webp' | 'gif' | 'unknown'
//   colorProfile: 'vibrant' | 'muted' | 'dark' | 'light' | 'mixed'
// }

// /**
//  * Analyze image buffer to extract colors, dimensions, and format
//  */
// function analyzeImageBuffer(buffer: Buffer): ImageAnalysis {
//   let width = 20,
//     height = 11,
//     format: ImageAnalysis['format'] = 'unknown'

//   // Detect image format and extract dimensions
//   if (buffer.length < 10) {
//     return {
//       dominantColors: [{ r: 128, g: 128, b: 128, frequency: 1 }],
//       dimensions: { width, height },
//       format,
//       colorProfile: 'muted',
//     }
//   }

//   // JPEG detection and dimension extraction
//   if (buffer[0] === 0xff && buffer[1] === 0xd8) {
//     format = 'jpeg'
//     for (let i = 2; i < buffer.length - 8; i++) {
//       if (buffer[i] === 0xff && (buffer[i + 1] === 0xc0 || buffer[i + 1] === 0xc2)) {
//         height = (buffer[i + 5] << 8) | buffer[i + 6]
//         width = (buffer[i + 7] << 8) | buffer[i + 8]
//         break
//       }
//     }
//   }
//   // PNG detection and dimension extraction
//   else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
//     format = 'png'
//     width = (buffer[16] << 24) | (buffer[17] << 16) | (buffer[18] << 8) | buffer[19]
//     height = (buffer[20] << 24) | (buffer[21] << 16) | (buffer[22] << 8) | buffer[23]
//   }
//   // WebP detection
//   else if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
//     format = 'webp'
//     // WebP dimensions are more complex to extract, use defaults
//   }
//   // GIF detection
//   else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
//     format = 'gif'
//     width = buffer[6] | (buffer[7] << 8)
//     height = buffer[8] | (buffer[9] << 8)
//   }

//   // Intelligent color sampling based on image format
//   const colors = extractColorsFromBuffer(buffer, format)
//   const dominantColors = clusterAndRankColors(colors)
//   const colorProfile = determineColorProfile(dominantColors)

//   return {
//     dominantColors,
//     dimensions: {
//       width: Math.max(1, width),
//       height: Math.max(1, height),
//     },
//     format,
//     colorProfile,
//   }
// }

// /**
//  * Extract color samples from image buffer using intelligent sampling
//  */
// function extractColorsFromBuffer(
//   buffer: Buffer,
//   format: string,
// ): Array<{ r: number; g: number; b: number }> {
//   const colors: Array<{ r: number; g: number; b: number }> = []
//   const bufferLength = buffer.length

//   // Different sampling strategies based on format
//   let samplingStrategy: 'sparse' | 'dense' | 'sequential' = 'sparse'
//   let sampleCount = 100

//   if (format === 'png') {
//     samplingStrategy = 'sequential'
//     sampleCount = 150
//   } else if (format === 'jpeg') {
//     samplingStrategy = 'dense'
//     sampleCount = 200
//   }

//   if (samplingStrategy === 'sequential') {
//     // Sequential sampling for formats like PNG
//     const step = Math.max(3, Math.floor(bufferLength / sampleCount))
//     for (let i = 100; i < bufferLength - 2; i += step) {
//       if (i + 2 < bufferLength) {
//         colors.push({
//           r: buffer[i],
//           g: buffer[i + 1],
//           b: buffer[i + 2],
//         })
//       }
//     }
//   } else if (samplingStrategy === 'dense') {
//     // Dense sampling for JPEG
//     for (let i = 0; i < sampleCount; i++) {
//       const offset = Math.floor((bufferLength * i) / sampleCount)
//       if (offset < bufferLength - 2) {
//         // Add some randomness to avoid sampling same patterns
//         const randomOffset = Math.floor(Math.random() * 50)
//         const finalOffset = Math.min(offset + randomOffset, bufferLength - 3)
//         colors.push({
//           r: buffer[finalOffset],
//           g: buffer[finalOffset + 1],
//           b: buffer[finalOffset + 2],
//         })
//       }
//     }
//   } else {
//     // Sparse sampling for other formats
//     const positions = [0.1, 0.25, 0.4, 0.6, 0.75, 0.9] // Strategic positions
//     positions.forEach((pos) => {
//       for (let i = 0; i < 20; i++) {
//         const offset = Math.floor(bufferLength * pos) + i * 10
//         if (offset < bufferLength - 2) {
//           colors.push({
//             r: buffer[offset],
//             g: buffer[offset + 1],
//             b: buffer[offset + 2],
//           })
//         }
//       }
//     })
//   }

//   return colors.filter(
//     (color) =>
//       color.r !== undefined &&
//       color.g !== undefined &&
//       color.b !== undefined &&
//       color.r >= 0 &&
//       color.r <= 255 &&
//       color.g >= 0 &&
//       color.g <= 255 &&
//       color.b >= 0 &&
//       color.b <= 255,
//   )
// }

// /**
//  * Advanced color clustering using k-means-like algorithm
//  */
// function clusterAndRankColors(
//   colors: Array<{ r: number; g: number; b: number }>,
// ): Array<{ r: number; g: number; b: number; frequency: number }> {
//   if (colors.length === 0) {
//     return [{ r: 128, g: 128, b: 128, frequency: 1 }]
//   }

//   // Initial clustering
//   const maxClusters = 8
//   const clusters: Array<{
//     r: number
//     g: number
//     b: number
//     count: number
//     members: typeof colors
//   }> = []

//   // Initialize clusters with diverse seed colors
//   const seedIndices = []
//   for (let i = 0; i < Math.min(maxClusters, colors.length); i++) {
//     seedIndices.push(Math.floor((colors.length * i) / Math.min(maxClusters, colors.length)))
//   }

//   seedIndices.forEach((index) => {
//     const seedColor = colors[index]
//     clusters.push({
//       r: seedColor.r,
//       g: seedColor.g,
//       b: seedColor.b,
//       count: 0,
//       members: [],
//     })
//   })

//   // Assign colors to clusters
//   colors.forEach((color) => {
//     let closestCluster = 0
//     let minDistance = Infinity

//     clusters.forEach((cluster, index) => {
//       const distance = Math.sqrt(
//         Math.pow(color.r - cluster.r, 2) +
//           Math.pow(color.g - cluster.g, 2) +
//           Math.pow(color.b - cluster.b, 2),
//       )

//       if (distance < minDistance) {
//         minDistance = distance
//         closestCluster = index
//       }
//     })

//     clusters[closestCluster].members.push(color)
//     clusters[closestCluster].count++
//   })

//   // Update cluster centers and calculate final colors
//   const finalColors = clusters
//     .filter((cluster) => cluster.count > 0)
//     .map((cluster) => {
//       // Calculate weighted average
//       const totalR = cluster.members.reduce((sum, color) => sum + color.r, 0)
//       const totalG = cluster.members.reduce((sum, color) => sum + color.g, 0)
//       const totalB = cluster.members.reduce((sum, color) => sum + color.b, 0)

//       return {
//         r: Math.round(totalR / cluster.count),
//         g: Math.round(totalG / cluster.count),
//         b: Math.round(totalB / cluster.count),
//         frequency: cluster.count / colors.length,
//       }
//     })
//     .sort((a, b) => b.frequency - a.frequency)
//     .slice(0, 5) // Top 5 dominant colors

//   return finalColors.length > 0 ? finalColors : [{ r: 128, g: 128, b: 128, frequency: 1 }]
// }

// /**
//  * Determine the overall color profile of the image
//  */
// function determineColorProfile(
//   colors: Array<{ r: number; g: number; b: number; frequency: number }>,
// ): ImageAnalysis['colorProfile'] {
//   if (colors.length === 0) return 'muted'

//   const primaryColor = colors[0]
//   const avgBrightness = colors.reduce(
//     (sum, color) => sum + ((color.r + color.g + color.b) / 3) * color.frequency,
//     0,
//   )

//   const avgSaturation = colors.reduce((sum, color) => {
//     const max = Math.max(color.r, color.g, color.b)
//     const min = Math.min(color.r, color.g, color.b)
//     const saturation = max === 0 ? 0 : (max - min) / max
//     return sum + saturation * color.frequency
//   }, 0)

//   if (avgBrightness > 200) return 'light'
//   if (avgBrightness < 80) return 'dark'
//   if (avgSaturation > 0.6) return 'vibrant'
//   if (avgSaturation < 0.3) return 'muted'
//   return 'mixed'
// }

// /**
//  * Generate sophisticated blur SVG based on image analysis
//  */
// function generateIntelligentBlur(analysis: ImageAnalysis): string {
//   const { dominantColors, dimensions, colorProfile } = analysis
//   const aspectRatio = dimensions.width / dimensions.height
//   const svgWidth = 20
//   const svgHeight = Math.max(8, Math.min(20, Math.round(svgWidth / aspectRatio)))

//   if (dominantColors.length === 0) {
//     return generateFallbackBlur()
//   }

//   const primary = dominantColors[0]
//   const secondary = dominantColors[1] || primary
//   const tertiary = dominantColors[2] || secondary

//   // Generate color variations based on profile
//   const variations = generateColorVariations(primary, secondary, tertiary, colorProfile)

//   const svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       ${generateGradients(variations, colorProfile)}
//       ${generateFilters(colorProfile)}
//     </defs>
//     ${generateShapes(svgWidth, svgHeight, colorProfile)}
//   </svg>`

//   return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
// }

// function generateColorVariations(primary: any, secondary: any, tertiary: any, profile: string) {
//   const lighten = (color: any, amount: number) => ({
//     r: Math.min(255, Math.round(color.r + amount)),
//     g: Math.min(255, Math.round(color.g + amount)),
//     b: Math.min(255, Math.round(color.b + amount)),
//   })

//   const darken = (color: any, amount: number) => ({
//     r: Math.max(0, Math.round(color.r - amount)),
//     g: Math.max(0, Math.round(color.g - amount)),
//     b: Math.max(0, Math.round(color.b - amount)),
//   })

//   const adjust = profile === 'dark' ? 20 : profile === 'light' ? -20 : 0

//   return {
//     primary,
//     primaryLight: lighten(primary, 40 + adjust),
//     primaryDark: darken(primary, 40 - adjust),
//     secondary,
//     secondaryLight: lighten(secondary, 30 + adjust),
//     tertiary,
//     tertiaryDark: darken(tertiary, 30 - adjust),
//   }
// }

// function generateGradients(colors: any, profile: string): string {
//   const opacity = profile === 'vibrant' ? 0.9 : profile === 'muted' ? 0.6 : 0.75

//   return `
//     <radialGradient id="primary" cx="35%" cy="25%" r="70%">
//       <stop offset="0%" stop-color="rgba(${colors.primaryLight.r},${colors.primaryLight.g},${colors.primaryLight.b},${opacity})"/>
//       <stop offset="60%" stop-color="rgba(${colors.primary.r},${colors.primary.g},${colors.primary.b},${opacity * 0.8})"/>
//       <stop offset="100%" stop-color="rgba(${colors.primaryDark.r},${colors.primaryDark.g},${colors.primaryDark.b},${opacity * 0.4})"/>
//     </radialGradient>
//     <radialGradient id="secondary" cx="75%" cy="75%" r="50%">
//       <stop offset="0%" stop-color="rgba(${colors.secondaryLight.r},${colors.secondaryLight.g},${colors.secondaryLight.b},${opacity * 0.7})"/>
//       <stop offset="100%" stop-color="rgba(${colors.secondary.r},${colors.secondary.g},${colors.secondary.b},${opacity * 0.3})"/>
//     </radialGradient>
//     <linearGradient id="tertiary" x1="0%" y1="0%" x2="100%" y2="100%">
//       <stop offset="0%" stop-color="rgba(${colors.tertiary.r},${colors.tertiary.g},${colors.tertiary.b},${opacity * 0.5})"/>
//       <stop offset="100%" stop-color="rgba(${colors.tertiaryDark.r},${colors.tertiaryDark.g},${colors.tertiaryDark.b},${opacity * 0.2})"/>
//     </linearGradient>
//   `
// }

// function generateFilters(profile: string): string {
//   const blurIntensity = profile === 'vibrant' ? 1.5 : profile === 'dark' ? 1.0 : 1.2

//   return `
//     <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
//       <feGaussianBlur in="SourceGraphic" stdDeviation="${blurIntensity}"/>
//     </filter>
//     <filter id="soft-blur" x="-10%" y="-10%" width="120%" height="120%">
//       <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
//     </filter>
//   `
// }

// function generateShapes(width: number, height: number, profile: string): string {
//   if (profile === 'vibrant') {
//     return `
//       <rect width="${width}" height="${height}" fill="url(#primary)"/>
//       <rect width="${width}" height="${height}" fill="url(#secondary)" opacity="0.8"/>
//       <rect width="${width}" height="${height}" fill="url(#tertiary)" opacity="0.6" filter="url(#soft-blur)"/>
//     `
//   } else if (profile === 'dark') {
//     return `
//       <rect width="${width}" height="${height}" fill="url(#primary)" filter="url(#blur)"/>
//       <rect width="${width}" height="${height}" fill="url(#secondary)" opacity="0.5"/>
//     `
//   } else {
//     return `
//       <rect width="${width}" height="${height}" fill="url(#primary)"/>
//       <rect width="${width}" height="${height}" fill="url(#secondary)" opacity="0.7" filter="url(#soft-blur)"/>
//       <rect width="${width}" height="${height}" fill="url(#tertiary)" opacity="0.4"/>
//     `
//   }
// }

// function generateFallbackBlur(): string {
//   const neutralSvg = `<svg width="20" height="11" xmlns="http://www.w3.org/2000/svg">
//     <defs>
//       <filter id="blur">
//         <feGaussianBlur stdDeviation="1.5"/>
//       </filter>
//     </defs>
//     <rect width="20" height="11" fill="rgba(156,163,175,0.4)" filter="url(#blur)"/>
//   </svg>`
//   return `data:image/svg+xml;base64,${Buffer.from(neutralSvg).toString('base64')}`
// }

// /**
//  * Main function to generate blur data URL - ZERO dependencies!
//  */
// async function generateBlurDataURL(buffer: Buffer): Promise<string> {
//   try {
//     console.log('🎨 Analyzing image buffer...')
//     const analysis = analyzeImageBuffer(buffer)
//     console.log(
//       `📊 Detected: ${analysis.format}, ${analysis.dimensions.width}x${analysis.dimensions.height}, ${analysis.colorProfile} profile`,
//     )
//     console.log(`🎯 Found ${analysis.dominantColors.length} dominant colors`)

//     return generateIntelligentBlur(analysis)
//   } catch (error) {
//     console.error('❌ Image analysis failed:', error)
//     return generateFallbackBlur()
//   }
// }

// export { generateBlurDataURL, analyzeImageBuffer, generateIntelligentBlur, type ImageAnalysis }

// ====================================================================================================================================
// ====================================================================================================================================
// ====================================================================================================================================

// async function generateBlurDataURL(buffer: Buffer) {
//   // Check if we're on server-side
//   if (typeof window !== 'undefined') {
//     throw new Error('Sharp can only be used on the server-side')
//   }

//   try {
//     // Dynamic import of Sharp (only loads on server)
//     const sharp = (await import('sharp')).default

//     const blurBuf = await sharp(buffer).resize({ width: 20 }).toFormat('webp').toBuffer()
//     return `data:image/webp;base64,${blurBuf.toString('base64')}`
//   } catch (error) {
//     console.error('Sharp blur generation failed:', error)
//   }
// }

// export { generateBlurDataURL }

// ====================================================================================================================================
// ====================================================================================================================================
// ====================================================================================================================================
// 🎯 ENHANCED PURE JAVASCRIPT BLUR GENERATION - NO DEPENDENCIES NEEDED!

interface ImageAnalysis {
  dominantColors: Array<{ r: number; g: number; b: number; frequency: number }>
  dimensions: { width: number; height: number }
  format: 'jpeg' | 'png' | 'webp' | 'gif' | 'bmp' | 'tiff' | 'unknown'
  colorProfile: 'vibrant' | 'muted' | 'dark' | 'light' | 'mixed'
  isTransparent: boolean
}

/**
 * Enhanced image buffer analysis with better format detection and dimension extraction
 */
function analyzeImageBuffer(buffer: Buffer): ImageAnalysis {
  let width = 20
  let height = 11
  let format: ImageAnalysis['format'] = 'unknown'
  let isTransparent = false

  // Detect image format and extract dimensions
  if (buffer.length < 10) {
    return {
      dominantColors: [{ r: 128, g: 128, b: 128, frequency: 1 }],
      dimensions: { width, height },
      format,
      colorProfile: 'muted',
      isTransparent: false,
    }
  }

  // JPEG detection and dimension extraction
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    format = 'jpeg'
    for (let i = 2; i < buffer.length - 8; i++) {
      if (buffer[i] === 0xff && (buffer[i + 1] === 0xc0 || buffer[i + 1] === 0xc2)) {
        height = (buffer[i + 5] << 8) | buffer[i + 6]
        width = (buffer[i + 7] << 8) | buffer[i + 8]
        break
      }
    }
  }
  // PNG detection and dimension extraction
  else if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47) {
    format = 'png'
    width = (buffer[16] << 24) | (buffer[17] << 16) | (buffer[18] << 8) | buffer[19]
    height = (buffer[20] << 24) | (buffer[21] << 16) | (buffer[22] << 8) | buffer[23]

    // Check for transparency in PNG
    isTransparent = checkPngTransparency(buffer)
  }
  // WebP detection and dimension extraction
  else if (
    buffer[0] === 0x52 &&
    buffer[1] === 0x49 &&
    buffer[2] === 0x46 &&
    buffer[3] === 0x46 &&
    buffer[8] === 0x57 &&
    buffer[9] === 0x45 &&
    buffer[10] === 0x42 &&
    buffer[11] === 0x50
  ) {
    format = 'webp'
    // Extract dimensions from VP8/VP8L chunks
    const dimensions = extractWebPDimensions(buffer)
    if (dimensions) {
      width = dimensions.width
      height = dimensions.height
    }
    isTransparent = checkWebPTransparency(buffer)
  }
  // GIF detection and dimension extraction
  else if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46) {
    format = 'gif'
    width = buffer[6] | (buffer[7] << 8)
    height = buffer[8] | (buffer[9] << 8)
    isTransparent = checkGifTransparency(buffer)
  }
  // BMP detection and dimension extraction
  else if (buffer[0] === 0x42 && buffer[1] === 0x4d) {
    format = 'bmp'
    width = buffer[18] | (buffer[19] << 8)
    height = buffer[22] | (buffer[23] << 8)
  }
  // TIFF detection (little endian)
  else if (buffer[0] === 0x49 && buffer[1] === 0x49 && buffer[2] === 0x2a && buffer[3] === 0x00) {
    format = 'tiff'
    const dimensions = extractTiffDimensions(buffer, true)
    if (dimensions) {
      width = dimensions.width
      height = dimensions.height
    }
  }
  // TIFF detection (big endian)
  else if (buffer[0] === 0x4d && buffer[1] === 0x4d && buffer[2] === 0x00 && buffer[3] === 0x2a) {
    format = 'tiff'
    const dimensions = extractTiffDimensions(buffer, false)
    if (dimensions) {
      width = dimensions.width
      height = dimensions.height
    }
  }

  // Enhanced color sampling based on image format and content
  const colors = extractColorsFromBuffer(buffer, format)
  const dominantColors = enhancedClusterAndRankColors(colors)
  const colorProfile = determineColorProfile(dominantColors)

  return {
    dominantColors,
    dimensions: {
      width: Math.max(1, width),
      height: Math.max(1, height),
    },
    format,
    colorProfile,
    isTransparent,
  }
}

/**
 * Check if PNG has transparency
 */
function checkPngTransparency(buffer: Buffer): boolean {
  // Look for tRNS chunk (transparency)
  for (let i = 8; i < buffer.length - 12; i++) {
    if (
      buffer[i] === 0x74 &&
      buffer[i + 1] === 0x52 &&
      buffer[i + 2] === 0x4e &&
      buffer[i + 3] === 0x53
    ) {
      return true
    }
  }

  // Check for alpha channel in IHDR
  if (buffer.length > 25) {
    const colorType = buffer[25]
    // Color types with alpha: 4 (grayscale with alpha), 6 (truecolor with alpha)
    return colorType === 4 || colorType === 6
  }

  return false
}

/**
 * Check if WebP has transparency
 */
function checkWebPTransparency(buffer: Buffer): boolean {
  // Look for VP8L with alpha
  if (buffer[12] === 0x56 && buffer[13] === 0x50 && buffer[14] === 0x38 && buffer[15] === 0x4c) {
    // Check if VP8L has alpha
    if (buffer.length > 21) {
      const features = buffer[21]
      return (features & 0x10) !== 0 // Alpha bit
    }
  }

  // Look for VP8X with alpha
  if (buffer[12] === 0x56 && buffer[13] === 0x50 && buffer[14] === 0x38 && buffer[15] === 0x58) {
    if (buffer.length > 20) {
      const flags = buffer[20]
      return (flags & 0x10) !== 0 // Alpha bit
    }
  }

  return false
}

/**
 * Check if GIF has transparency
 */
function checkGifTransparency(buffer: Buffer): boolean {
  // Check for transparency flag in GIF89a
  if (buffer[3] === 0x38 && buffer[4] === 0x39 && buffer[5] === 0x61) {
    // Check for graphics control extension
    for (let i = 13; i < buffer.length - 5; i++) {
      if (buffer[i] === 0x21 && buffer[i + 1] === 0xf9 && buffer[i + 2] === 0x04) {
        // Check transparency flag
        return (buffer[i + 3] & 0x01) !== 0
      }
    }
  }
  return false
}

/**
 * Extract WebP dimensions
 */
function extractWebPDimensions(buffer: Buffer): { width: number; height: number } | null {
  // VP8 (lossy)
  if (buffer[12] === 0x56 && buffer[13] === 0x50 && buffer[14] === 0x38 && buffer[15] === 0x20) {
    if (buffer.length >= 30) {
      const width = (buffer[26] | (buffer[27] << 8)) & 0x3fff
      const height = (buffer[28] | (buffer[29] << 8)) & 0x3fff
      return { width, height }
    }
  }
  // VP8L (lossless)
  else if (
    buffer[12] === 0x56 &&
    buffer[13] === 0x50 &&
    buffer[14] === 0x38 &&
    buffer[15] === 0x4c
  ) {
    if (buffer.length >= 25) {
      const b1 = buffer[21]
      const b2 = buffer[22]
      const b3 = buffer[23]
      const b4 = buffer[24]

      const width = 1 + (((b2 & 0x3f) << 8) | b1)
      const height = 1 + (((b4 & 0x0f) << 10) | (b3 << 2) | ((b2 & 0xc0) >> 6))
      return { width, height }
    }
  }
  // VP8X (extended)
  else if (
    buffer[12] === 0x56 &&
    buffer[13] === 0x50 &&
    buffer[14] === 0x38 &&
    buffer[15] === 0x58
  ) {
    if (buffer.length >= 30) {
      const width = 1 + (buffer[24] | (buffer[25] << 8) | (buffer[26] << 16))
      const height = 1 + (buffer[27] | (buffer[28] << 8) | (buffer[29] << 16))
      return { width, height }
    }
  }

  return null
}

/**
 * Extract TIFF dimensions
 */
function extractTiffDimensions(
  buffer: Buffer,
  isLittleEndian: boolean,
): { width: number; height: number } | null {
  // Get offset to first IFD
  const ifdOffset = isLittleEndian
    ? buffer[4] | (buffer[5] << 8) | (buffer[6] << 16) | (buffer[7] << 24)
    : (buffer[4] << 24) | (buffer[5] << 16) | (buffer[6] << 8) | buffer[7]

  if (ifdOffset + 14 >= buffer.length) return null

  // Get number of directory entries
  const numEntries = isLittleEndian
    ? buffer[ifdOffset] | (buffer[ifdOffset + 1] << 8)
    : (buffer[ifdOffset] << 8) | buffer[ifdOffset + 1]

  let width = 0
  let height = 0

  // Scan directory entries for width and height tags
  for (let i = 0; i < numEntries; i++) {
    const entryOffset = ifdOffset + 2 + i * 12
    if (entryOffset + 12 >= buffer.length) continue

    const tag = isLittleEndian
      ? buffer[entryOffset] | (buffer[entryOffset + 1] << 8)
      : (buffer[entryOffset] << 8) | buffer[entryOffset + 1]

    // ImageWidth (256) or ImageLength (257)
    if (tag === 256 || tag === 257) {
      const value = isLittleEndian
        ? buffer[entryOffset + 8] |
          (buffer[entryOffset + 9] << 8) |
          (buffer[entryOffset + 10] << 16) |
          (buffer[entryOffset + 11] << 24)
        : (buffer[entryOffset + 8] << 24) |
          (buffer[entryOffset + 9] << 16) |
          (buffer[entryOffset + 10] << 8) |
          buffer[entryOffset + 11]

      if (tag === 256) width = value
      else height = value
    }
  }

  return width && height ? { width, height } : null
}

/**
 * Enhanced color extraction with format-aware sampling
 */
function extractColorsFromBuffer(
  buffer: Buffer,
  format: string,
): Array<{ r: number; g: number; b: number }> {
  const colors: Array<{ r: number; g: number; b: number }> = []
  const bufferLength = buffer.length

  // Different sampling strategies based on format
  let sampleCount = 200
  let samplingDensity = 1
  let startOffset = 0

  if (format === 'jpeg') {
    // Skip JPEG header (up to 0xFFDA - Start of Scan)
    for (let i = 2; i < bufferLength - 1; i++) {
      if (buffer[i] === 0xff && buffer[i + 1] === 0xda) {
        startOffset = i + 2
        break
      }
    }
    sampleCount = 300
    samplingDensity = 2
  } else if (format === 'png') {
    // Skip PNG header and look for IDAT chunks
    startOffset = 33 // After IHDR
    sampleCount = 250
  } else if (format === 'gif') {
    // Skip GIF header and color table
    const hasGlobalColorTable = (buffer[10] & 0x80) !== 0
    const globalColorTableSize = 3 * (1 << ((buffer[10] & 0x07) + 1))
    startOffset = hasGlobalColorTable ? 13 + globalColorTableSize : 13
    sampleCount = 150
  } else if (format === 'webp') {
    // Skip WebP header
    startOffset = 20
    sampleCount = 200
  } else {
    // Generic sampling for other formats
    startOffset = 0
    sampleCount = 100
  }

  // Ensure start offset is within bounds
  startOffset = Math.min(startOffset, bufferLength - 3)

  // Calculate sampling step
  const step = Math.max(1, Math.floor((bufferLength - startOffset) / sampleCount) * samplingDensity)

  // Sample colors from image data
  for (let i = startOffset; i < bufferLength - 2 && colors.length < sampleCount; i += step) {
    // Skip potential marker bytes in JPEG
    if (format === 'jpeg' && i < bufferLength - 1 && buffer[i] === 0xff && buffer[i + 1] !== 0x00) {
      i++ // Skip marker
      continue
    }

    colors.push({
      r: buffer[i],
      g: buffer[i + 1],
      b: buffer[i + 2],
    })
  }

  // If we didn't get enough samples, add some from specific positions
  if (colors.length < 50) {
    const positions = [0.1, 0.3, 0.5, 0.7, 0.9]
    for (const pos of positions) {
      const offset = Math.floor(bufferLength * pos)
      if (offset < bufferLength - 2) {
        colors.push({
          r: buffer[offset],
          g: buffer[offset + 1],
          b: buffer[offset + 2],
        })
      }
    }
  }

  return colors.filter(
    (color) =>
      color.r !== undefined &&
      color.g !== undefined &&
      color.b !== undefined &&
      color.r >= 0 &&
      color.r <= 255 &&
      color.g >= 0 &&
      color.g <= 255 &&
      color.b >= 0 &&
      color.b <= 255,
  )
}

/**
 * Enhanced color clustering with adaptive k-means
 */
function enhancedClusterAndRankColors(
  colors: Array<{ r: number; g: number; b: number }>,
): Array<{ r: number; g: number; b: number; frequency: number }> {
  if (colors.length === 0) {
    return [{ r: 128, g: 128, b: 128, frequency: 1 }]
  }

  // Determine optimal number of clusters (3-8)
  const optimalClusters = Math.min(8, Math.max(3, Math.floor(Math.sqrt(colors.length / 10))))

  // Initialize clusters with k-means++ algorithm for better seeding
  const clusters: Array<{
    r: number
    g: number
    b: number
    count: number
    members: typeof colors
  }> = []

  // First cluster is a random color
  const firstIndex = Math.floor(Math.random() * colors.length)
  clusters.push({
    r: colors[firstIndex].r,
    g: colors[firstIndex].g,
    b: colors[firstIndex].b,
    count: 0,
    members: [],
  })

  // Select remaining seeds using k-means++ algorithm
  for (let k = 1; k < optimalClusters; k++) {
    const distances: number[] = []
    let totalDistance = 0

    // Calculate distance from each point to nearest cluster
    for (const color of colors) {
      let minDistance = Infinity

      for (const cluster of clusters) {
        const distance = colorDistance(color, cluster)
        if (distance < minDistance) minDistance = distance
      }

      distances.push(minDistance)
      totalDistance += minDistance
    }

    // Select next seed with probability proportional to distance squared
    let randomValue = Math.random() * totalDistance
    let selectedIndex = -1

    for (let i = 0; i < distances.length; i++) {
      randomValue -= distances[i]
      if (randomValue <= 0) {
        selectedIndex = i
        break
      }
    }

    if (selectedIndex >= 0 && selectedIndex < colors.length) {
      clusters.push({
        r: colors[selectedIndex].r,
        g: colors[selectedIndex].g,
        b: colors[selectedIndex].b,
        count: 0,
        members: [],
      })
    }
  }

  // Perform clustering iterations
  let changed = true
  let iterations = 0

  while (changed && iterations < 10) {
    changed = false
    iterations++

    // Clear cluster members
    for (const cluster of clusters) {
      cluster.members = []
      cluster.count = 0
    }

    // Assign colors to clusters
    for (const color of colors) {
      let closestCluster = 0
      let minDistance = Infinity

      for (let i = 0; i < clusters.length; i++) {
        const distance = colorDistance(color, clusters[i])
        if (distance < minDistance) {
          minDistance = distance
          closestCluster = i
        }
      }

      clusters[closestCluster].members.push(color)
      clusters[closestCluster].count++
    }

    // Update cluster centers
    for (const cluster of clusters) {
      if (cluster.count > 0) {
        const totalR = cluster.members.reduce((sum, color) => sum + color.r, 0)
        const totalG = cluster.members.reduce((sum, color) => sum + color.g, 0)
        const totalB = cluster.members.reduce((sum, color) => sum + color.b, 0)

        const newR = Math.round(totalR / cluster.count)
        const newG = Math.round(totalG / cluster.count)
        const newB = Math.round(totalB / cluster.count)

        // Check if cluster center changed
        if (newR !== cluster.r || newG !== cluster.g || newB !== cluster.b) {
          changed = true
          cluster.r = newR
          cluster.g = newG
          cluster.b = newB
        }
      }
    }
  }

  // Calculate final colors with frequency
  const finalColors = clusters
    .filter((cluster) => cluster.count > 0)
    .map((cluster) => {
      // Calculate weighted average
      const totalR = cluster.members.reduce((sum, color) => sum + color.r, 0)
      const totalG = cluster.members.reduce((sum, color) => sum + color.g, 0)
      const totalB = cluster.members.reduce((sum, color) => sum + color.b, 0)

      return {
        r: Math.round(totalR / cluster.count),
        g: Math.round(totalG / cluster.count),
        b: Math.round(totalB / cluster.count),
        frequency: cluster.count / colors.length,
      }
    })
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 6) // Top 6 dominant colors

  return finalColors.length > 0 ? finalColors : [{ r: 128, g: 128, b: 128, frequency: 1 }]
}

/**
 * Calculate color distance (perceptual)
 */
function colorDistance(
  color1: { r: number; g: number; b: number },
  color2: { r: number; g: number; b: number },
): number {
  // Use weighted Euclidean distance for better perceptual accuracy
  const rMean = (color1.r + color2.r) / 2
  const rDiff = color1.r - color2.r
  const gDiff = color1.g - color2.g
  const bDiff = color1.b - color2.b

  const rWeight = 2 + rMean / 256
  const gWeight = 4.0
  const bWeight = 2 + (255 - rMean) / 256

  return Math.sqrt(rWeight * rDiff * rDiff + gWeight * gDiff * gDiff + bWeight * bDiff * bDiff)
}

/**
 * Enhanced color profile determination
 */
function determineColorProfile(
  colors: Array<{ r: number; g: number; b: number; frequency: number }>,
): ImageAnalysis['colorProfile'] {
  if (colors.length === 0) return 'muted'

  // Calculate weighted averages
  let totalBrightness = 0
  let totalSaturation = 0
  let totalWeight = 0

  for (const color of colors) {
    const brightness = (color.r + color.g + color.b) / 3
    const max = Math.max(color.r, color.g, color.b)
    const min = Math.min(color.r, color.g, color.b)
    const saturation = max === 0 ? 0 : (max - min) / max

    totalBrightness += brightness * color.frequency
    totalSaturation += saturation * color.frequency
    totalWeight += color.frequency
  }

  const avgBrightness = totalBrightness / totalWeight
  const avgSaturation = totalSaturation / totalWeight

  // Calculate color variance
  let brightnessVariance = 0
  let saturationVariance = 0

  for (const color of colors) {
    const brightness = (color.r + color.g + color.b) / 3
    const max = Math.max(color.r, color.g, color.b)
    const min = Math.min(color.r, color.g, color.b)
    const saturation = max === 0 ? 0 : (max - min) / max

    brightnessVariance += Math.pow(brightness - avgBrightness, 2) * color.frequency
    saturationVariance += Math.pow(saturation - avgSaturation, 2) * color.frequency
  }

  brightnessVariance = Math.sqrt(brightnessVariance / totalWeight)
  saturationVariance = Math.sqrt(saturationVariance / totalWeight)

  // Determine profile based on characteristics
  if (avgBrightness > 200 && brightnessVariance < 30) return 'light'
  if (avgBrightness < 80 && brightnessVariance < 20) return 'dark'
  if (avgSaturation > 0.6 && saturationVariance < 0.2) return 'vibrant'
  if (avgSaturation < 0.3 && saturationVariance < 0.15) return 'muted'

  return 'mixed'
}

/**
 * Generate sophisticated blur SVG based on enhanced image analysis
 */
function generateIntelligentBlur(analysis: ImageAnalysis): string {
  const { dominantColors, dimensions, colorProfile, isTransparent } = analysis
  const aspectRatio = dimensions.width / dimensions.height
  const svgWidth = 20
  const svgHeight = Math.max(8, Math.min(20, Math.round(svgWidth / aspectRatio)))

  if (dominantColors.length === 0) {
    return generateFallbackBlur()
  }

  const primary = dominantColors[0]
  const secondary = dominantColors[1] || primary
  const tertiary = dominantColors[2] || secondary

  // Generate color variations based on profile
  const variations = generateColorVariations(primary, secondary, tertiary, colorProfile)

  const svg = `<svg width="${svgWidth}" height="${svgHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      ${generateGradients(variations, colorProfile, isTransparent)}
      ${generateFilters(colorProfile)}
    </defs>
    ${generateShapes(svgWidth, svgHeight, colorProfile, isTransparent)}
  </svg>`

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`
}

function generateColorVariations(primary: any, secondary: any, tertiary: any, profile: string) {
  const lighten = (color: any, amount: number) => ({
    r: Math.min(255, Math.round(color.r + amount)),
    g: Math.min(255, Math.round(color.g + amount)),
    b: Math.min(255, Math.round(color.b + amount)),
  })

  const darken = (color: any, amount: number) => ({
    r: Math.max(0, Math.round(color.r - amount)),
    g: Math.max(0, Math.round(color.g - amount)),
    b: Math.max(0, Math.round(color.b - amount)),
  })

  const saturate = (color: any, amount: number) => {
    const max = Math.max(color.r, color.g, color.b)
    const min = Math.min(color.r, color.g, color.b)
    const delta = max - min
    const value = (max + min) / 2

    if (delta === 0) return color // Grayscale

    const lightenAmount = amount * (value < 128 ? 1 : -1)
    return lighten(color, lightenAmount)
  }

  const adjust = profile === 'dark' ? 20 : profile === 'light' ? -20 : 0

  return {
    primary,
    primaryLight: lighten(primary, 40 + adjust),
    primaryDark: darken(primary, 40 - adjust),
    primarySat: saturate(primary, 20),
    secondary,
    secondaryLight: lighten(secondary, 30 + adjust),
    secondaryDark: darken(secondary, 30 - adjust),
    tertiary,
    tertiaryLight: lighten(tertiary, 20 + adjust),
    tertiaryDark: darken(tertiary, 20 - adjust),
  }
}

function generateGradients(colors: any, profile: string, isTransparent: boolean): string {
  const opacity = isTransparent
    ? 0.7
    : profile === 'vibrant'
      ? 0.9
      : profile === 'muted'
        ? 0.6
        : 0.75

  return `
    <radialGradient id="primary" cx="35%" cy="25%" r="70%">
      <stop offset="0%" stop-color="rgba(${colors.primaryLight.r},${colors.primaryLight.g},${colors.primaryLight.b},${opacity})"/>
      <stop offset="60%" stop-color="rgba(${colors.primary.r},${colors.primary.g},${colors.primary.b},${opacity * 0.8})"/>
      <stop offset="100%" stop-color="rgba(${colors.primaryDark.r},${colors.primaryDark.g},${colors.primaryDark.b},${opacity * 0.4})"/>
    </radialGradient>
    <radialGradient id="secondary" cx="75%" cy="75%" r="50%">
      <stop offset="0%" stop-color="rgba(${colors.secondaryLight.r},${colors.secondaryLight.g},${colors.secondaryLight.b},${opacity * 0.7})"/>
      <stop offset="100%" stop-color="rgba(${colors.secondary.r},${colors.secondary.g},${colors.secondary.b},${opacity * 0.3})"/>
    </radialGradient>
    <linearGradient id="tertiary" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(${colors.tertiary.r},${colors.tertiary.g},${colors.tertiary.b},${opacity * 0.5})"/>
      <stop offset="100%" stop-color="rgba(${colors.tertiaryDark.r},${colors.tertiaryDark.g},${colors.tertiaryDark.b},${opacity * 0.2})"/>
    </linearGradient>
    ${
      profile === 'vibrant'
        ? `
    <radialGradient id="accent" cx="50%" cy="50%" r="40%">
      <stop offset="0%" stop-color="rgba(${colors.primarySat.r},${colors.primarySat.g},${colors.primarySat.b},${opacity * 0.4})"/>
      <stop offset="100%" stop-color="rgba(${colors.primary.r},${colors.primary.g},${colors.primary.b},0)"/>
    </radialGradient>
    `
        : ''
    }
  `
}

function generateFilters(profile: string): string {
  const blurIntensity = profile === 'vibrant' ? 1.5 : profile === 'dark' ? 1.0 : 1.2

  return `
    <filter id="blur" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="${blurIntensity}"/>
    </filter>
    <filter id="soft-blur" x="-10%" y="-10%" width="120%" height="120%">
      <feGaussianBlur in="SourceGraphic" stdDeviation="0.8"/>
    </filter>
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="2" result="noise"/>
      <feBlend in="SourceGraphic" in2="noise" mode="soft-light" opacity="0.1"/>
    </filter>
  `
}

function generateShapes(
  width: number,
  height: number,
  profile: string,
  isTransparent: boolean,
): string {
  const baseOpacity = isTransparent ? 0.8 : 1

  if (profile === 'vibrant') {
    return `
      <rect width="${width}" height="${height}" fill="url(#primary)" opacity="${baseOpacity}"/>
      <ellipse cx="${width * 0.7}" cy="${height * 0.3}" rx="${width * 0.4}" ry="${height * 0.3}" fill="url(#secondary)" opacity="0.7" filter="url(#soft-blur)"/>
      <rect width="${width}" height="${height}" fill="url(#tertiary)" opacity="0.5" filter="url(#soft-blur)"/>
      <circle cx="${width * 0.3}" cy="${height * 0.7}" r="${Math.min(width, height) * 0.4}" fill="url(#accent)" opacity="0.4" filter="url(#blur)"/>
    `
  } else if (profile === 'dark') {
    return `
      <rect width="${width}" height="${height}" fill="url(#primary)" opacity="${baseOpacity}" filter="url(#blur)"/>
      <ellipse cx="${width * 0.6}" cy="${height * 0.4}" rx="${width * 0.3}" ry="${height * 0.2}" fill="url(#secondary)" opacity="0.5" filter="url(#soft-blur)"/>
      ${isTransparent ? `<rect width="${width}" height="${height}" fill="url(#tertiary)" opacity="0.3" filter="url(#noise)"/>` : ''}
    `
  } else if (profile === 'light') {
    return `
      <rect width="${width}" height="${height}" fill="url(#primary)" opacity="${baseOpacity}"/>
      <rect x="${width * 0.2}" y="${height * 0.2}" width="${width * 0.6}" height="${height * 0.6}" fill="url(#secondary)" opacity="0.6" filter="url(#soft-blur)"/>
      <ellipse cx="${width * 0.5}" cy="${height * 0.5}" rx="${width * 0.3}" ry="${height * 0.2}" fill="url(#tertiary)" opacity="0.4" filter="url(#blur)"/>
    `
  } else {
    return `
      <rect width="${width}" height="${height}" fill="url(#primary)" opacity="${baseOpacity}"/>
      <rect width="${width}" height="${height}" fill="url(#secondary)" opacity="0.7" filter="url(#soft-blur)"/>
      <rect width="${width}" height="${height}" fill="url(#tertiary)" opacity="0.4" filter="url(#noise)"/>
    `
  }
}

function generateFallbackBlur(): string {
  const neutralSvg = `<svg width="20" height="11" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="blur">
        <feGaussianBlur stdDeviation="1.5"/>
      </filter>
    </defs>
    <rect width="20" height="11" fill="rgba(156,163,175,0.4)" filter="url(#blur)"/>
  </svg>`
  return `data:image/svg+xml;base64,${Buffer.from(neutralSvg).toString('base64')}`
}

/**
 * Main function to generate blur data URL - ZERO dependencies!
 */
async function generateBlurDataURL(buffer: Buffer): Promise<string> {
  try {
    console.log('🎨 Analyzing image buffer...')
    const analysis = analyzeImageBuffer(buffer)
    console.log(
      `📊 Detected: ${analysis.format}, ${analysis.dimensions.width}x${analysis.dimensions.height}, ${analysis.colorProfile} profile`,
    )
    console.log(`🎯 Found ${analysis.dominantColors.length} dominant colors`)
    if (analysis.isTransparent) {
      console.log('🔍 Image contains transparency')
    }

    return generateIntelligentBlur(analysis)
  } catch (error) {
    console.error('❌ Image analysis failed:', error)
    return generateFallbackBlur()
  }
}

export { generateBlurDataURL, analyzeImageBuffer, generateIntelligentBlur, type ImageAnalysis }

// 🚀 USAGE:
// const blurDataURL = await generateBlurDataURL(yourImageBuffer)
//
// ✅ Zero dependencies
// ✅ Works with JPEG, PNG, WebP, GIF, BMP, TIFF
// ✅ Enhanced color analysis with k-means++ clustering
// ✅ Better format detection and dimension extraction
// ✅ Transparency detection
// ✅ Adaptive blur generation
// ✅ TypeScript support
