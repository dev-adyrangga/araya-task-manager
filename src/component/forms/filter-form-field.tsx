'use client'

import { debounce } from '@/src/utils/debounce'
import TextFormField from './text-form-field'
import { useRouter } from 'next/navigation'

const FilterFormField = () => {
  const router = useRouter()

  const handleSearch = (value: string) => {
    router.push(`?query=${value}`)
  }

  const debouncedSearch = debounce(handleSearch, 400)

  return (
    <TextFormField
      label="Filter"
      id="filter"
      name="filter"
      type="search"
      onChange={(event) => {
        debouncedSearch(event?.target?.value)
      }}
    />
  )
}

export default FilterFormField
