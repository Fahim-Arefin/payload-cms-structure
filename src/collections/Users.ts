import type { CollectionAfterLoginHook, CollectionAfterLogoutHook, CollectionConfig } from 'payload'
import { ROLES, hasRole } from '@/lib/rbac'
import { getClientIP } from '@/lib/http'
import { sanitizeUserSnapshot, onlyBenignUserUpdate, recentAuthAuditExists } from '@/lib/audit'
import { AUDIT_LOG } from '@/lib/constants'

const afterLogin: CollectionAfterLoginHook = async ({ req, user }) => {
  try {
    const actorId = user?.id ?? req.user?.id ?? null

    // 1) de-dupe recent identical auth audits
    if (!(await recentAuthAuditExists(req, actorId, 'login'))) {
      await req.payload.create({
        collection: 'audit-logs',
        data: {
          action: 'login',
          targetCollection: 'auth',
          docId: '',
          actor: actorId,
          ip: getClientIP(req),
          notes: 'User logged in',
        },
      })
    }

    // 2) stamp lastLoginAt and AVOID creating a "random users update" auditss
    if (actorId) {
      await req.payload.update({
        collection: 'users',
        id: actorId,
        data: { lastLoginAt: new Date().toISOString() },
        overrideAccess: true,
        // ✅ pass context so our afterChange can skip its audit row
        context: { __skipUserAudit: true },
      })
    }
  } catch (e) {
    req.payload.logger.error('afterLogin audit/stamp failed', e)
  }
}

const afterLogout: CollectionAfterLogoutHook = async ({ req, user }: any) => {
  try {
    // after logout, req.user may be cleared — prefer the hook arg
    const actorId = user?.id ?? req.user?.id ?? null

    if (!(await recentAuthAuditExists(req, actorId, 'logout'))) {
      await req.payload.create({
        collection: 'audit-logs',
        data: {
          action: 'logout',
          targetCollection: 'auth',
          docId: '',
          actor: actorId,
          ip: getClientIP(req),
          notes: 'User logged out',
        },
      })
    }

    if (actorId) {
      await req.payload.update({
        collection: 'users',
        id: actorId,
        data: { lastLogoutAt: new Date().toISOString() },
        overrideAccess: true,
        context: { __skipUserAudit: true },
      })
    }
  } catch (e) {
    req.payload.logger.error('afterLogout audit/stamp failed', e)
  }
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,

  admin: {
    useAsTitle: 'email',
    group: AUDIT_LOG,
    defaultColumns: ['email', 'role', 'lastLoginAt', 'lastLogoutAt', 'updatedAt'],
  },

  access: {
    read: ({ req }) => {
      if (!req.user) return false
      return hasRole(req.user, ['super-admin', 'admin']) ? true : { id: { equals: req.user.id } }
    },
    create: ({ req }) => hasRole(req.user, ['super-admin']),
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
        condition: (_d, _s, { user }) => hasRole(user, ['super-admin']),
      },
      access: {
        create: ({ req }) => hasRole(req.user, ['super-admin']),
        update: ({ req }) => hasRole(req.user, ['super-admin']),
      },
    },

    // stamped by auth hooks, read-only in the UI
    { name: 'lastLoginAt', type: 'date', admin: { readOnly: true } },
    { name: 'lastLogoutAt', type: 'date', admin: { readOnly: true } },
  ],

  hooks: {
    // ✅ correct place for auth events
    afterLogin: [afterLogin],
    afterLogout: [afterLogout],

    // user create/update audit — but:
    //  1) skip if we are only stamping login/logout (context flag),
    //  2) skip if ONLY benign fields changed (login/logout stamps, updatedAt),
    //  3) sanitize snapshots to remove sensitive fields.
    afterChange: [
      async ({ req, doc, previousDoc, operation }) => {
        const ctx = (req as any)?.context ?? {}
        if (ctx.__skipUserAudit) return doc
        if (onlyBenignUserUpdate(previousDoc, doc)) return doc

        try {
          await req.payload.create({
            collection: 'audit-logs',
            data: {
              action: operation, // 'create' | 'update'
              targetCollection: 'users',
              docId: String(doc.id),
              actor: req.user?.id ?? null,
              ip: getClientIP(req),
              diff: {
                before: sanitizeUserSnapshot(previousDoc ?? null),
                after: sanitizeUserSnapshot(doc ?? null),
              },
            },
          })
        } catch (e) {
          req.payload.logger.error('Audit log (users) failed', e)
        }
        return doc
      },
    ],
  },
}
