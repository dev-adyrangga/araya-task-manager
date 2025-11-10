import { ComponentProps } from 'react'

type FilledButtonProps = ComponentProps<'button'>

const FilledButton = (props: FilledButtonProps) => {
  return (
    <button
      {...props}
      className="bg-indigo-500 shadow-theme-xs hover:bg-indigo-600 flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-bold text-white transition"
    />
  )
}

export default FilledButton
