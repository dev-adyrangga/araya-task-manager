'use server'

import { clearSession } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

export const logoutAction = async () => {
  await clearSession()
  redirect('/sign-in')
}
