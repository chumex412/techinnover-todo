'use client'

import { useState } from 'react'

import Modal from './Dialog'
import TaskForm from './TaskForm'
import TaskContent from './TaskSubContent'
import useTask from '@/hooks/useTasks'

const Content = () => {
  // const [action, setAction] = useState<'add' | 'edit'>()
  const [selectedTask, setSelectedTask] = useState<Task>()
  const { tasks } = useTask()

  // const addTask = () => {
  //   setAction('add')
  // }

  const editTask = (id: string, status: TaskStatus) => {
    const statusTasks = tasks[status]

    if (tasks) {
      const taskItem = statusTasks.find((item) => item.id === id)

      if (taskItem) {
        setSelectedTask(taskItem)
      }
    }
  }

  return (
    <>
      <section className="flex items-start gap-4 bg-white">
        <TaskContent
          title="To do"
          list={tasks.pending}
          status="pending"
          onEdit={editTask}
        />
        <TaskContent
          title="In progress"
          list={tasks.progress}
          status="progress"
          onEdit={editTask}
        />
        <TaskContent
          title="Completed"
          list={tasks.completed}
          status="completed"
          onEdit={editTask}
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
        />
      </Modal>
    </>
  )
}

export default Content
