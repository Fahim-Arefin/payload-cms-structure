// import { withPayload } from '@payloadcms/next/withPayload'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Your Next.js config here
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     domains: ['localhost', 'shantalife.com'], // Add your development and production domains
//     deviceSizes: [350, 750, 828, 1080, 1200, 1520, 2048],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     formats: ['image/webp'], // Automatically convert to WebP
//   },
// }

// export default withPayload(nextConfig, { devBundleServerPackages: false })
// next.config.js

import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    // Allow both localhost and production domain
    // domains: ['localhost', 'shantalife.com'],
    deviceSizes: [350, 750, 828, 1080, 1200, 1520, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    // loader: 'default',
    // unoptimized: false,
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
