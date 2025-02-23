'use client'

import Image from 'next/image'

import { TaskContentProps } from '@/domain/types/types-ui'

import TaskCard from './TaskCard'
import plusIcon from '../../../public/icons/plus.svg'
import TaskForm from './TaskForm'
import Modal from './Dialog'

const TaskContent = ({
  title,
  list,
  status,
  onEdit,
}: TaskContentProps<Task>) => {
  return (
    <>
      <section className="bg-off-white flex flex-1 flex-col gap-y-4 rounded-lg px-2 py-4">
        <section className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <h3 className="font-inter text-base font-medium text-gray-200">
              {title}
            </h3>
            <p className="inline-flex h-6 w-[22px] items-center justify-center rounded bg-gray-100 font-inter text-sm font-medium text-gray-200">
              {list.length}
            </p>
          </div>
          <Modal
            title="Add Task"
            trigger={<Image src={plusIcon} alt="Plus icon" />}
          >
            <TaskForm btnLabel="Add" endpoint="/add-task" status={status} />
          </Modal>
        </section>
        <section className="bg-white">
          {list.map((item, idx) => {
            return (
              <TaskCard
                key={item.id || idx + 1}
                onEdit={() => {
                  onEdit?.(item.id || '', item.status)
                }}
                {...item}
              />
            )
          })}
        </section>
      </section>
    </>
  )
}

export default TaskContent
