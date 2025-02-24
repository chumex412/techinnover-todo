'use client'

import { useCallback, useState } from 'react'
import { ListTodo } from 'lucide-react'

import useTask from '@/hooks/useTasks'

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

const Content = () => {
  const [statusAction, setStatusAction] = useState<TaskStatus>('pending')
  const [selectedTask, setSelectedTask] = useState<Task>()
  const { tasks, handleTaskDelete } = useTask()

  const editTask = (id: string, status: TaskStatus) => {
    const statusTasks = tasks[status]

    if (tasks) {
      const taskItem = statusTasks.find((item) => item.id === id)

      if (taskItem) {
        setSelectedTask(taskItem)
      }
    }
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
      <section className="relative flex items-start gap-4 bg-white">
        <TaskContent
          title="To do"
          list={tasks.pending}
          status="pending"
          onEdit={editTask}
          activeOnSD={statusAction === 'pending'}
          onDelete={handleTaskDelete}
        />
        <TaskContent
          title="In progress"
          list={tasks.progress}
          status="progress"
          onEdit={editTask}
          activeOnSD={statusAction === 'progress'}
          onDelete={handleTaskDelete}
        />
        <TaskContent
          title="Completed"
          list={tasks.completed}
          status="completed"
          onEdit={editTask}
          activeOnSD={statusAction === 'completed'}
          onDelete={handleTaskDelete}
        />
      </section>
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
