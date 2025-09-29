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
  collections: [Users, Media, Resume, CareerApplication, AgentCareerApplication, Pages],
  // globals: [HomePage, AboutUsPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),

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
