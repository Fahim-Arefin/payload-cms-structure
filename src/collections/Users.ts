import type { CollectionConfig } from 'payload'
import { ROLES, hasRole } from '@/lib/rbac'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },

  access: {
    read: ({ req }) => {
      if (!req.user) return false
      // Super/Admin see all; others only themselves
      return hasRole(req.user, ['super-admin', 'admin']) ? true : { id: { equals: req.user.id } }
    },
    create: ({ req }) => hasRole(req.user, ['super-admin']), // only Super Admin
    update: ({ req }) =>
      hasRole(req.user, ['super-admin']) ? true : { id: { equals: req.user?.id } },
    delete: ({ req }) => hasRole(req.user, ['super-admin']),
  },

  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: ROLES.SUPER_ADMIN,
      options: [
        { label: 'Super Admin', value: ROLES.SUPER_ADMIN },
        { label: 'Admin', value: ROLES.ADMIN },
        { label: 'Editor', value: ROLES.EDITOR },
        { label: 'Viewer', value: ROLES.VIEWER },
      ],
      admin: {
        description: 'Only Super Admin can set or change this.',
        // hide from UI for non-super admins
        condition: (_, __, { user }) => hasRole(user, ['super-admin']),
      },
      access: {
        create: ({ req }) => hasRole(req.user, ['super-admin']),
        update: ({ req }) => hasRole(req.user, ['super-admin']),
      },
    },
  ],

  hooks: {
    afterChange: [
      async ({ req, doc, previousDoc, operation }) => {
        try {
          await req.payload.create({
            collection: 'audit-logs',
            data: {
              action: operation,
              targetCollection: 'users',
              docId: String(doc.id),
              actor: req.user?.id ?? null,
              ip: (() => {
                const headersAny = req.headers as any
                // If headers is a Fetch Headers-like object
                if (typeof headersAny?.get === 'function') {
                  return headersAny.get('x-forwarded-for') ?? (req as any).ip ?? ''
                }
                // Otherwise treat headers as a plain object possibly containing string | string[] | undefined
                const h = headersAny['x-forwarded-for']
                if (Array.isArray(h)) return h.join(', ')
                return (h as string) ?? (req as any).ip ?? ''
              })(),
              diff: { before: previousDoc ?? null, after: doc ?? null },
            },
          })
        } catch (e) {
          req.payload.logger.error('Audit log (users) failed', e)
        }
      },
    ],
  },
}
