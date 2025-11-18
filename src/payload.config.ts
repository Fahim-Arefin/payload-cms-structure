// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Resume } from './collections/Resume'
import { CareerApplication } from './collections/CareerApplication'
import { AgentCareerApplication } from './collections/AgentCareerApplication'
import { Pages } from './collections/Pages'
import Footer from './collections/globals/Footer'
import Navbar from './collections/globals/Navbar'
import Header from './collections/globals/Header'
import BoardOfDirectors from './collections/globals/BoardOfDirectors'
import LeadershipTeam from './collections/globals/LeadershipTeam'
import ContactUsGlobal from './collections/globals/GlobalContactUs'
import GlobalBlogs from './collections/globals/Blogs'
import GlobalVlogs from './collections/globals/Vlogs'
import AuditLogs from './collections/AuditLogs'
import { getClientIP } from './lib/http'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
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
  globals: [
    Header,
    Navbar,
    Footer,
    BoardOfDirectors,
    LeadershipTeam,
    ContactUsGlobal,
    GlobalBlogs,
    GlobalVlogs,
  ],
  collections: [Users, Media, Resume, CareerApplication, AgentCareerApplication, Pages, AuditLogs],
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
  ],
  // endpoints: [
  //   {
  //     path: '/yolo/hello',
  //     method: 'get',
  //     handler: (_req) => {
  //       return Response.json({ message: 'world' })
  //     },
  //   },
  // ],
})
