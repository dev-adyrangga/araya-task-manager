import { ChangeEvent, useState } from 'react'
import CloseIcon from '../icons/close-icon'
import DropdownFormField from './dropdown-form-field'
import TextFormField from './text-form-field'
import TextareaFormField from './textarea-form-field'
import { Task } from '@/src/domain/entities/task'
import { Status } from '@/src/infrastructure/prisma/generated/prisma/enums'

type ITaskFormModal = {
  data?: Task
  onCancel: () => void
  onSave: (
    formValues: {
      id: number
      title: string
      status: Status
      description: string
    },
    formType: 'add' | 'edit'
  ) => void
}

const TaskFormModal = ({ data, onCancel, onSave }: ITaskFormModal) => {
  const [formValues, setFormValues] = useState({
    id: data?.id || 0,
    title: data?.title || '',
    status: data?.status || 'TODO',
    description: data?.description || '',
  })

  const onTextFormChanged = (event: ChangeEvent<HTMLInputElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    const { id, value } = event.target
    setFormValues((prevState) => ({ ...prevState, [id]: value }))
  }

  const onDropdownChanged = (event: ChangeEvent<HTMLSelectElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    const { id, value } = event.target
    setFormValues((prevState) => ({ ...prevState, [id]: value }))
  }

  const onTextareaChanged = (event: ChangeEvent<HTMLTextAreaElement>) => {
    event?.preventDefault()
    event?.stopPropagation()
    const { id, value } = event.target
    setFormValues((prevState) => ({ ...prevState, [id]: value }))
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-5 overflow-y-auto z-99999">
      <div className="fixed inset-0 h-full w-full bg-gray-400/50 backdrop-blur-sm"></div>
      <div className="relative w-full max-w-md overflow-y-auto rounded-3xl bg-white p-6 shadow-lg">
        <form className="space-y-4" noValidate>
          <button
            type="button"
            onClick={onCancel}
            className="absolute right-5 top-5 z-999 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600 cursor-pointer"
          >
            <CloseIcon />
          </button>
          <div className="flex">
            <p className="text-lg font-semibold">
              {data ? 'Add New Task' : 'Edit Task'}
            </p>
          </div>
          <TextFormField
            label="Title"
            id="title"
            name="title"
            required
            value={formValues.title}
            onChange={onTextFormChanged}
          />
          <DropdownFormField
            label="Status"
            id="status"
            name="status"
            options={[
              { label: 'To Do', value: Status.TODO },
              { label: 'In Progress', value: Status.IN_PROGRESS },
              { label: 'Done', value: Status.DONE },
            ]}
            required
            value={formValues.status}
            onChange={onDropdownChanged}
          />
          <TextareaFormField
            label="Description"
            id="description"
            name="description"
            value={formValues.description}
            onChange={onTextareaChanged}
          />
          <div className="flex flex-row gap-6 justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-2 py-1 font-medium cursor-pointer hover:bg-gray-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onSave(formValues, data ? 'edit' : 'add')}
              className="px-2 py-1 font-medium cursor-pointer hover:bg-gray-200 rounded-lg text-green-500"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskFormModal
