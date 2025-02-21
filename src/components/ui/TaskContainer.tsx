import { Task } from '@/domain/entities/global'
import React from 'react'
import TaskContent from './TaskSubContent'

const Content = ({
  pending,
  progress,
  completed,
}: Record<TaskStatus, Task[]>) => {
  return (
    <section className="flex gap-4 bg-white">
      <TaskContent title="To do" list={pending} />
      <TaskContent title="In progress" list={progress} />
      <TaskContent title="Completed" list={completed} />
    </section>
  )
}

export default Content
