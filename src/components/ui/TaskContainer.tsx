'use client'

import { useState } from 'react'

import Modal from './Dialog'
import TaskForm from './TaskForm'
import TaskContent from './TaskSubContent'

const Content = (props: Record<TaskStatus, Task[]>) => {
  // const [action, setAction] = useState<'add' | 'edit'>()
  const [selectedTask, setSelectedTask] = useState<Task>()

  // const addTask = () => {
  //   setAction('add')
  // }

  const editTask = (id: string, status: TaskStatus) => {
    const tasks = props[status]

    if (tasks) {
      const taskItem = tasks.find((item) => item.id === id)

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
          list={props.pending}
          status="pending"
          onEdit={editTask}
        />
        <TaskContent
          title="In progress"
          list={props.progress}
          status="progress"
          onEdit={editTask}
        />
        <TaskContent
          title="Completed"
          list={props.completed}
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
