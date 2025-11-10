'use client'

import FilledButton from '@/src/component/button/filled-button'
import TextFormField from '@/src/component/forms/text-form-field'
import { useActionState } from 'react'
import { signInAction } from '../actions/users/sign-in-action'
import Link from 'next/link'

export default function SignIn() {
  const [state, formAction] = useActionState(signInAction, { error: '' })

  return (
    <div className="flex min-h-[calc(100vh-70px)] items-center justify-center">
      <main className="flex flex-col gap-4 text-base">
        <form className="min-w-sm flex flex-col gap-4" action={formAction}>
          <h1 className="text-4xl pb-4 font-bold text-gray-800 text-center">
            Sign In
          </h1>
          <TextFormField
            label="Email"
            type="email"
            id="email"
            name="email"
            required
          />
          <TextFormField
            label="Password"
            type="password"
            id="password"
            name="password"
            required
          />
          {state?.error && (
            <p className="text-red-600 text-sm text-center pt-4">
              {state.error}
            </p>
          )}
          <div className="pt-4">
            <FilledButton type="submit">Sign In</FilledButton>
          </div>
          <div className="mt-5">
            <p className="text-center text-sm font-normal text-gray-700 sm:text-start">
              {`Don't have an account? `}
              <Link
                href="/sign-up"
                className="text-indigo-500 hover:text-brand-600"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </main>
    </div>
  )
}
