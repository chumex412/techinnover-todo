'use client'

import Image from 'next/image'
import { useCallback, useState } from 'react'
import clsx from 'clsx'

import { TaskContentProps } from '@/domain/types/types-ui'

import TaskCard from './TaskCard'
import plusIcon from '../../../public/icons/plus.svg'
import TaskForm from './TaskForm'
import Modal from './Dialog'
import { Droppable } from '@/lib/drag-n-drop/Droppable'

const TaskContent = ({
  title,
  list,
  status,
  onEdit,
  activeOnSD,
  onDelete,
}: TaskContentProps<Task>) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = useCallback(() => setIsOpen(false), [])

  return (
    <Droppable id={status}>
      <section
        className={clsx(
          'visible flex w-full flex-1 flex-col gap-y-4 rounded-lg bg-off-white px-2 py-4 opacity-100 xs:w-auto',
          !activeOnSD && 'hidden xs:flex xs:opacity-100'
        )}
      >
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
            isOpen={isOpen}
            onOpen={(value) => setIsOpen(value)}
          >
            <TaskForm
              btnLabel="Add"
              endpoint="/add-task"
              status={status}
              onClose={closeModal}
            />
          </Modal>
        </section>

        <section className="flex flex-col gap-y-4">
          {list.map((item, idx) => {
            return (
              <TaskCard
                key={item.id || idx + 1}
                {...item}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            )
          })}
        </section>
      </section>
    </Droppable>
  )
}

export default TaskContent
