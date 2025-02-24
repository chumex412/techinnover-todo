'use client'

import { useCallback, useMemo, useState } from 'react'
import { ListTodo } from 'lucide-react'
import { DndContext, DragEndEvent } from '@dnd-kit/core'

import useTask from '@/hooks/useTasks'
import { type TaskStatusContents } from '@/domain/types/types-ui'
import { notify } from '@/lib/notification'
import { useRemoveTaskMutation } from '@/redux/slice/task'

import Modal from './Dialog'
import TaskForm from './TaskForm'
import TaskContent from './TaskSubContent'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'

const taskStat: TaskStatus[] = ['pending', 'progress', 'completed']

const getTaskItem = (tasks: Task[], id: string) => {
  const taskItem = tasks?.find((item) => item.id === id)

  return taskItem
}

const Content = () => {
  const [statusAction, setStatusAction] = useState<TaskStatus>('pending')
  const [selectedTask, setSelectedTask] = useState<Task>()

  const [removeTask] = useRemoveTaskMutation()

  const { originalTasks, filteredTasks, updateTask, updateFilteredTasks } =
    useTask()

  const pending = filteredTasks?.filter((task) => task.status === 'pending')
  const progress = filteredTasks?.filter((task) => task.status === 'progress')
  const completed = filteredTasks?.filter((task) => task.status === 'completed')

  const tasks: TaskStatusContents[] = useMemo(
    () => [
      { id: 'pending', items: pending },
      { id: 'progress', items: progress },
      { id: 'completed', items: completed },
    ],
    [pending, progress, completed]
  )

  const editTask = useCallback(
    (id: string, status: TaskStatus) => {
      const statusTasks = tasks.find((item) => item.id === status)
      if (statusTasks) {
        const taskItem = getTaskItem(statusTasks.items, id)

        if (taskItem) {
          setSelectedTask(taskItem)
        }
      }
    },
    [tasks]
  )

  const handleTaskDelete = useCallback(
    (id: string) => {
      let error = ''

      removeTask(id)
        .unwrap()
        .catch(() => {
          error =
            'Failed to delete the selected due to an error, please try again'
        })
        .finally(() => {
          notify(
            error ? error : 'Deleted successfully',
            error ? 'error' : 'success'
          )
        })
    },
    [removeTask]
  )

  const moveTask = (id: string, status: TaskStatus) => {
    if (originalTasks) {
      const taskItem = getTaskItem(originalTasks, id)

      if (taskItem) {
        updateFilteredTasks(
          filteredTasks.map((item) => {
            if (item.id === id) {
              return { ...item, status }
            }

            return item
          })
        )
        updateTask({ id, task: { ...taskItem, status } })
      }
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    const status = over?.id as TaskStatus
    moveTask(active.id as string, status)
  }

  const closeModal = useCallback(() => setSelectedTask(undefined), [])

  return (
    <section>
      <section className="h mb-5 flex justify-end xs:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-md border border-gray-100 p-2 shadow-md">
            <ListTodo />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {taskStat.map((stat) => (
              <DropdownMenuItem
                key={stat}
                onClick={() => setStatusAction(stat)}
              >
                <span className="font-inter text-xs font-normal capitalize text-gray-700">
                  {stat === 'pending'
                    ? 'To do'
                    : stat === 'progress'
                      ? 'In progress'
                      : 'Completed'}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <DndContext onDragEnd={handleDragEnd}>
        <section className="relative flex w-full flex-col items-start gap-4 bg-white xs:flex-row">
          {tasks.map((item) => (
            <TaskContent
              key={item.id}
              title={
                item.id === 'pending'
                  ? 'To do'
                  : item.id === 'progress'
                    ? 'In progress'
                    : 'Completed'
              }
              list={item.items}
              status={item.id}
              onEdit={editTask}
              activeOnSD={statusAction === item.id}
              onDelete={handleTaskDelete}
            />
          ))}
        </section>
      </DndContext>
      <Modal
        title="Edit Task"
        isOpen={!!selectedTask}
        onOpen={() => setSelectedTask(undefined)}
      >
        <TaskForm
          defaultData={selectedTask}
          btnLabel="Update"
          endpoint="/edit-task"
          onClose={closeModal}
        />
      </Modal>
    </section>
  )
}

export default Content
