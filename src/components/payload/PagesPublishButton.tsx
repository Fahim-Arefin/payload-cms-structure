'use client'

import React from 'react'
import { PublishButton, useAuth } from '@payloadcms/ui'

function isEditor(user: any) {
  return user?.role === 'editor'
}

export function PagesPublishButton(props: any) {
  const { user } = useAuth()

  // ✅ editor: hide publish/unpublish/revert
  if (isEditor(user)) return null

  // ✅ admin/super-admin: keep default
  return <PublishButton {...props} />
}
