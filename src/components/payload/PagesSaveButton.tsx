'use client'

import React from 'react'
import { SaveButton, useAuth } from '@payloadcms/ui'

function isEditor(user: any) {
  return user?.role === 'editor'
}

export function PagesSaveButton(props: any) {
  const { user } = useAuth()

  // ✅ editor: hide "Publish changes" button
  if (isEditor(user)) return null

  // ✅ admin/super-admin: keep default
  return <SaveButton {...props} />
}
