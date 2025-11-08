import TextFormField from '@/src/component/forms/text-form-field'
import { getSession } from '@/src/lib/auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getSession()

  if (!session) {
    redirect('/sign-in')
  }

  return (
    <div className="flex min-h-[calc(100vh-70px)] flex-col items-center p-6">
      <main className="">
        <div>
          <TextFormField
            label="Filter"
            id="filter"
            name="filter"
            type="search"
          />
        </div>
      </main>
    </div>
  )
}
