import { ComponentProps } from 'react'

type ITextFormField = ComponentProps<'input'> & {
  label: string
}

const TextFormField = ({ label, ...props }: ITextFormField) => {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-gray-700">
        {label}
        {props?.required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="shadow-theme-xs focus:border-indigo-300 focus:ring-indigo-500/10 h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden"
      />
    </div>
  )
}

export default TextFormField
