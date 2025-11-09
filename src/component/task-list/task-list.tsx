'use client'

import { useEffect, useState } from 'react'
import FilterFormField from '../forms/filter-form-field'
import TaskFormModal from '../forms/task-form-modal'
import { Task } from '@/src/domain/entities/task'
import { createTaskAction } from '@/app/actions/tasks/create-action'
import { Status } from '@/src/infrastructure/prisma/generated/prisma/enums'
import { useRouter } from 'next/navigation'
import { updateTaskAction } from '@/app/actions/tasks/update-action'
import { deleteAction } from '@/app/actions/tasks/delete-action'

type IFormModalState = {
  show: boolean
  data?: Task
}

type ITaskList = { taskData: Task[]; authorId: string }

const TaskList = ({ taskData = [], authorId }: ITaskList) => {
  const router = useRouter()
  const [taskList, setTaskList] = useState(taskData)
  const [formModal, setFormModal] = useState<IFormModalState>({
    show: false,
    data: undefined,
  })

  useEffect(() => {
    setTaskList(taskData)
  }, [taskData])

  const onShowFormModal = (task?: Task) => {
    setFormModal({ show: true, data: task })
  }

  const onClickDelete = async (task?: Task) => {
    const result = await deleteAction({
      id: task?.id,
    })
    if (result.success) {
      onCloseFormModal()
      router.refresh()
    } else {
      alert(result.error)
    }
  }

  const onCloseFormModal = () => setFormModal({ show: false })

  const onSaveHandler = async (
    formValues: {
      id: number
      title: string
      status: Status
      description: string
    },
    formType: 'add' | 'edit'
  ) => {
    if (formType === 'add') {
      const result = await createTaskAction({
        ...formValues,
        authorId: Number(authorId),
      })
      if (result.success) {
        onCloseFormModal()
        router.refresh()
      } else {
        alert(result.error)
      }
    } else if (formType === 'edit') {
      const result = await updateTaskAction({
        ...formValues,
        authorId: Number(authorId),
      })
      if (result.success) {
        onCloseFormModal()
        router.refresh()
      } else {
        alert(result.error)
      }
    }
  }

  const onFilterHandler = (value: string) => {
    const filtered = value
      ? taskData.filter(
          (task) =>
            task?.title?.includes?.(value) ||
            task?.status?.includes?.(value) ||
            task?.description?.includes?.(value)
        )
      : taskData

    setTaskList(filtered)
  }

  return (
    <div className="pt-6">
      <FilterFormField onFilterSearch={onFilterHandler} />
      <div className="flex flex-row justify-between pt-6">
        <h2 className="text-xl font-bold">Task List</h2>
        <button
          className="px-2 py-1 font-medium cursor-pointer hover:bg-gray-200 rounded-lg"
          onClick={() => onShowFormModal()}
        >
          Add Task
        </button>
      </div>
      <div className="pt-2">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border border-gray-400">
              <th className="text-start p-2">Title</th>
              <th className="text-start p-2">Description</th>
              <th className="text-start p-2">Status</th>
              <th className="text-end  p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {taskList.length === 0 && (
              <tr className="border border-gray-400">
                <td colSpan={4} className="p-2 text-center">
                  No tasks found
                </td>
              </tr>
            )}
            {taskList.map((task, idx) => {
              return (
                <tr key={idx} className="border border-gray-400">
                  <td className="p-2">{task.title}</td>
                  <td className="p-2">{task.description}</td>
                  <td className="p-2">{task.status}</td>
                  <td className="p-2">
                    <div className="flex flex-row gap-1 justify-end">
                      <button
                        className="px-2 py-1 font-medium cursor-pointer hover:bg-gray-200 rounded-lg"
                        onClick={() => onShowFormModal(task)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-2 py-1 font-medium cursor-pointer text-red-500  hover:bg-gray-200 rounded-lg"
                        onClick={() => onClickDelete(task)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {formModal?.show && (
        <TaskFormModal
          data={formModal.data}
          onCancel={onCloseFormModal}
          onSave={onSaveHandler}
        />
      )}
    </div>
  )
}

export default TaskList
