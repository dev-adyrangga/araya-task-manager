'use client'

import { debounce } from '@/src/utils/debounce'
import TextFormField from './text-form-field'
import { useMemo } from 'react'

type IFilterFormField = {
  onFilterSearch: (value: string) => void
}

const FilterFormField = ({ onFilterSearch }: IFilterFormField) => {
  const debouncedSearch = useMemo(
    () => debounce(onFilterSearch, 400),
    [onFilterSearch]
  )

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
