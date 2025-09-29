// utils/collections/singleDocUtils.ts
import type { Access, CollectionSlug } from 'payload'

export function createSingleDocAccess<T extends string>(
  collectionSlug: T,
): {
  create: Access
  delete: Access
  update: Access
  read: Access
} {
  return {
    read: () => true,
    create: async ({ req }) => {
      const existingDocs = await req.payload.find({
        collection: collectionSlug as CollectionSlug, // Type assertion here
        limit: 1,
        depth: 0,
      })
      return existingDocs.totalDocs === 0
    },
    delete: () => false,
    update: () => true,
  }
}
export function createSingleDocBeforeOperationHook<T extends string>(collectionSlug: T) {
  return async ({ args, operation }: any) => {
    if (operation === 'create') {
      const { req } = args
      const existingDocs = await req.payload.find({
        collection: collectionSlug as CollectionSlug, // Type assertion here
        limit: 1,
        depth: 0,
      })
      if (existingDocs.totalDocs > 0) {
        throw new Error(`Only one document is allowed. Please update the existing one instead.`)
      }
    }
    return args
  }
}
