export const ROLES = {
  SUPER_ADMIN: 'super-admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

const ORDER: Role[] = ['viewer', 'editor', 'admin', 'super-admin'];

export const hasRole = (user: any | null | undefined, roles: Role[]) =>
  !!user && roles.includes(user.role);

export const roleAtLeast = (user: any | null | undefined, min: Role) =>
  !!user && ORDER.indexOf(user.role) >= ORDER.indexOf(min);
