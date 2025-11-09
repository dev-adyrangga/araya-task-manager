'use server'

import { User } from '@/src/domain/entities/user'
import { signUpSchema } from '@/src/helpers/validator-schemas/sign-up-schema'
import { setSession } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

export const signUpAction = async (_: unknown, formData: FormData) => {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const validatedFields = signUpSchema.safeParse({
    email,
    password,
  })

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.issues?.[0]?.message,
    }
  }

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/users/sign-up`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  )

  if (result.ok) {
    const data = (await result.json()).data as User

    if (!data?.id) {
      return {
        error: 'An error occurred while registering. Please try again.',
      }
    }

    await setSession(`${data.id}`)
    redirect('/')
  }

  return {
    error: 'Oops, something went wrong',
  }
}
