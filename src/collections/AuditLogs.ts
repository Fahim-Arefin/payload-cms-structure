import type { CollectionConfig } from 'payload'
import { hasRole } from '@/lib/rbac'

const AuditLogs: CollectionConfig = {
  slug: 'audit-logs',
  timestamps: true,
  admin: {
    useAsTitle: 'action',
    hidden: ({ user }) => !hasRole(user, ['super-admin', 'admin', 'editor']),
    defaultColumns: ['action', 'targetCollection', 'docId', 'actor', 'createdAt'],
  },
  access: {
    read: ({ req }) => {
      if (hasRole(req.user, ['super-admin', 'admin'])) return true
      if (hasRole(req.user, ['editor'])) {
        return req.user ? { actor: { equals: req.user.id } } : false
      }
      return false
    },
    create: () => false,
    update: () => false,
    delete: ({ req }) => hasRole(req.user, ['super-admin']),
  },
  fields: [
    {
      name: 'action',
      type: 'select',
      required: true,
      options: [
        // auth
        'login', 'logout',
        // content/user ops
        'create', 'update', 'delete', 'publish',
        'approve', 'reject', 'settings-update',
        'role-assign',
      ],
    },
    { name: 'targetCollection', type: 'text' }, // avoid reserved 'collection'
    { name: 'docId', type: 'text' },
    { name: 'actor', type: 'relationship', relationTo: 'users' },
    { name: 'ip', type: 'text' },
    { name: 'notes', type: 'textarea' },
    { name: 'diff', type: 'json' },
  ],
}

export default AuditLogs
