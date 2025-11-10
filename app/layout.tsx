import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { getSession } from '@/src/lib/auth'
import { logoutAction } from './actions/users/logout-action'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Araya Task Manager',
  description: 'a collaborative task management by araya',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getSession()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="bg-zinc-100 h-16 border border-b-gray-300">
          <div className="px-6 py-2 flex flex-row items-center justify-between h-full">
            <p className="text-2xl font-bold">Araya Task Manager</p>
            {!!session && (
              <button onClick={logoutAction} className="hover:cursor-pointer">
                Logout
              </button>
            )}
          </div>
        </nav>
        {children}
      </body>
    </html>
  )
}
