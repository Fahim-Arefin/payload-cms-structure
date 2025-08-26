// import { withPayload } from '@payloadcms/next/withPayload'

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     // Allow both localhost and production domain
//     // domains: ['localhost', 'shantalife.com'],
//     deviceSizes: [350, 750, 828, 1080, 1200, 1520, 2048],
//     imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
//     formats: ['image/webp'],
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 's3.ap-southeast-1.wasabisys.com',
//         port: '', // leave empty unless you need a specific port
//         pathname: '/shantalife-static/**', // allow all under shantalife-static
//       },
//     ],
//   },
// }

// export default withPayload(nextConfig, { devBundleServerPackages: false })

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
    // unoptimized: true, // ✅ disables Next.js/Vercel optimization
    // ✅ Remote image patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.ap-southeast-1.wasabisys.com',
        port: '', // leave empty unless you need a specific port
        pathname: '/shantalife-static/**', // allow all under shantalife-static
      },
    ],
  },

  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,

  async headers() {
    const farFuture = 'Tue, 19 Jan 2038 03:14:07 GMT'
    const longCache = 'public, max-age=31536000, immutable'

    return [
      // Public assets (images, sprites, icons you keep under /public/assets)
      {
        source: '/assets/:path*',
        headers: [
          { key: 'Cache-Control', value: longCache },
          { key: 'Expires', value: farFuture },
        ],
      },

      // Fonts (local)
      {
        source: '/fonts/:path*',
        headers: [
          { key: 'Cache-Control', value: longCache },
          { key: 'Expires', value: farFuture },
        ],
      },

      // Payload uploads (adjust the path if your upload staticURL differs)
      {
        source: '/media/:path*',
        headers: [
          { key: 'Cache-Control', value: longCache },
          { key: 'Expires', value: farFuture },
        ],
      },

      // ✅ Optimized images served by Next.js
      {
        source: '/_next/image',
        headers: [
          { key: 'Cache-Control', value: longCache },
          { key: 'Expires', value: farFuture },
        ],
      },

      // Next build artifacts (already hashed, safe to cache long)
      {
        source: '/_next/static/:path*',
        headers: [
          { key: 'Cache-Control', value: longCache },
          { key: 'Expires', value: farFuture },
        ],
      },

      // Catch-all for common image extensions anywhere on the site
      {
        // Note: escape the dot for Next's path-to-regexp
        source: '/:path*\\.(png|jpg|jpeg|webp|avif|gif|svg|ico)',
        headers: [
          { key: 'Cache-Control', value: longCache },
          { key: 'Expires', value: farFuture },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
