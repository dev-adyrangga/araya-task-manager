import { cookies } from 'next/headers'

export const setSession = async (value: string) => {
  const cookieStore = await cookies()
  return cookieStore.set('userId', value)
}

export const getSession = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('userId')?.value
  return token
}

export const clearSession = async () => {
  const cookieStore = await cookies()
  return cookieStore.delete('userId')
}
