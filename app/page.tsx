'use server'

import { Task } from '@/src/domain/entities/task'
import { getSession } from '@/src/lib/auth'
import { redirect } from 'next/navigation'
import { lazy, Suspense } from 'react'

const LazyTaskList = lazy(() => import('@/src/component/task-list/task-list'))

const getAllTask = async (): Promise<Task[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    return []
  }
  const data = await res.json()
  return data.data
}

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/sign-in')
  }

  const tasks = await getAllTask()

  return (
    <div className="flex min-h-[calc(100vh-70px)] flex-col p-6">
      <main className="flex flex-col gap-4 w-full max-w-md mx-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <LazyTaskList taskData={tasks} authorId={session} />
        </Suspense>
      </main>
    </div>
  )
}
