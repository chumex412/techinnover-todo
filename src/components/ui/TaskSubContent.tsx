'use client'

import { Task } from '@/domain/entities/global'
import { TaskContentProps } from '@/domain/entities/types-ui'

import plusIcon from '../../../public/icons/plus.svg'
import TaskCard from './TaskCard'
import Image from 'next/image'

const TaskContent = ({ title, list }: TaskContentProps<Task>) => {
  return (
    <section className="bg-off-white flex flex-1 flex-col gap-y-4 rounded-lg p-2">
      <section className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <h3 className="font-inter text-base font-medium text-gray-200">
            {title}
          </h3>
          <p className="inline-flex h-6 w-[22px] items-center justify-center rounded bg-gray-100 font-inter text-sm font-medium text-gray-200">
            {list.length}
          </p>
        </div>
        <button className="bg-transparent focus:border-gray-700">
          <Image src={plusIcon} alt="Plus icon" />
        </button>
      </section>
      <section className="bg-white">
        {list.map((item, idx) => {
          return (
            <TaskCard key={item.id || idx + 1} onClick={() => {}} {...item} />
          )
        })}
      </section>
    </section>
  )
}

export default TaskContent
