import { ComponentProps } from 'react'

export type IDropdownFormFieldOption = {
  label: string
  value: string
}

type IDropdownFormField = ComponentProps<'select'> & {
  label: string
  options: IDropdownFormFieldOption[]
}

const DropdownFormField = ({
  label,
  options,
  ...props
}: IDropdownFormField) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-gray-700">
        {label}
        {props?.required && <span className="text-red-500">*</span>}
      </label>
      <select
        {...props}
        className="focus:border-indigo-300 focus:ring-indigo-500/10 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
      >
        {options.map((i, idx) => (
          <option key={idx} value={i.value} className="text-gray-700">
            {i.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropdownFormField
