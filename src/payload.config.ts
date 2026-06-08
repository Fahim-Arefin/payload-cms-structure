// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'

import AuditLogs from './collections/AuditLogs'
import Media from './collections/Media'
import { Pages } from './collections/Pages'
import { Resume } from './collections/Resume'
import { Users } from './collections/Users'
import Footer from './collections/globals/Footer'
import Navbar from './collections/globals/Navbar'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// ✨ toggle S3 via env
const enableS3 = process.env.USE_S3_STORAGE === 'true'

const s3Plugin =
  enableS3 &&
  process.env.S3_BUCKET_NAME &&
  process.env.S3_ENDPOINT &&
  process.env.S3_REGION &&
  process.env.S3_ACCESS_KEY &&
  process.env.S3_SECRET_KEY
    ? s3Storage({
        collections: {
          media: {
            prefix: 'media',
          },
          resume: {
            prefix: 'resumes',
          },
        },
        bucket: process.env.S3_BUCKET_NAME || '',
        config: {
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY || '',
            secretAccessKey: process.env.S3_SECRET_KEY || '',
          },
          region: process.env.S3_REGION,
          endpoint: process.env.S3_ENDPOINT,
          forcePathStyle: true,
        },
      })
    : null

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // livePreview: {
    //   url: 'http://localhost:3000',
    //   collections: ['pages'],
    // },

    // below code on and also on the preview route
    livePreview: {
      collections: ['pages'],
      url: ({ data }) => {
        const raw = typeof data?.slug === 'string' ? data.slug.trim() : ''
        const slug = raw || 'index'
        // 👉 this hits the dynamic preview route
        // return `http://localhost:3000/preview/${slug}`
        return `${process?.env?.API_URL}/preview/${slug}`
      },
    },
    // ✅ add this
    components: {
      providers: ['/components/payload/AdminRoleStylesProvider#AdminRoleStylesProvider'],
    },
  },

  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50 MB per file
      fieldSize: 50 * 1024 * 1024, // buffer for form fields
      files: 50,
    },
    abortOnLimit: true,
  },
  collections: [Users, Media, Resume, AuditLogs, Pages],
  globals: [Navbar, Footer],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  onInit: async (payload) => {
    try {
      const countResult = (await payload.count({ collection: 'users' })) as
        | number
        | { totalDocs: number }
      const totalUsers = typeof countResult === 'number' ? countResult : countResult.totalDocs

      if (totalUsers > 0) {
        payload.logger.info('Bootstrap skipped: users already exist.')
        return
      }

      const email = (process.env.BOOTSTRAP_SUPER_EMAIL || '').trim()
      const password = (process.env.BOOTSTRAP_SUPER_PASSWORD || '').trim()

      if (!email || !password) {
        payload.logger.warn(
          'Bootstrap skipped: set BOOTSTRAP_SUPER_EMAIL and BOOTSTRAP_SUPER_PASSWORD for first-run.',
        )
        return
      }

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role: 'super-admin', // ← your RBAC role
          name: 'Super Admin',
        },
        overrideAccess: true, // ← bypass access since no super exists yet
      })

      payload.logger.info(`✅ Bootstrap Super Admin created: ${email}`)
    } catch (e) {
      payload.logger.error('Bootstrap failed:', e)
    }
  },

  // sharp,
  email: nodemailerAdapter({
    defaultFromAddress: process?.env?.SMTP_MAIL_FROM ?? 'uchchhash@xynolab.com',
    defaultFromName: 'Shanta Life',
    transportOptions: {
      host: process?.env?.SMTP_HOST,
      port: parseInt(process?.env?.SMTP_PORT ?? '587'),
      auth: {
        user: process?.env?.SMTP_USER,
        pass: process?.env?.SMTP_PASSWORD,
      },
    },
  }),
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
    // s3Storage({
    //   bucket: process.env.S3_BUCKET_NAME ?? 'shanta-life',
    //   collections: {
    //     media: {
    //       prefix: 'media',
    //     },
    //     resume: {
    //       prefix: 'resumes',
    //     },
    //   },
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY ?? '',
    //       secretAccessKey: process.env.S3_SECRET_KEY ?? '',
    //     },
    //     endpoint: process.env.S3_ENDPOINT ?? '',
    //     region: process.env.S3_BUCKET_NAME ?? '',
    //   },
    // }),
    // s3Storage({
    //   collections: {
    //     media: {
    //       prefix: 'media',
    //     },
    //   },
    //   bucket: process.env.S3_BUCKET_NAME || '',
    //   config: {
    //     credentials: {
    //       accessKeyId: process.env.S3_ACCESS_KEY || '',
    //       secretAccessKey: process.env.S3_SECRET_KEY || '',
    //     },
    //     region: process.env.S3_REGION,
    //     endpoint: process.env.S3_ENDPOINT,
    //     forcePathStyle: true,
    //     // ... Other S3 configuration
    //   },
    // }),
    ...(s3Plugin ? [s3Plugin] : []),
  ],
})
