'use client'

import Image from 'next/image'

import { Task } from '@/domain/entities/global'
import { getFormatedDate, getTimeFormat } from '@/utils/format'

import Flag from '../icons/Flag'
import dotIcon from '../../../public/icons/dots.svg'

interface TaskProps extends Task {
  onClick: VoidFunction
}

const taskPriority = {
  low: {
    color: 'text-red-400',
    background: 'bg-red-50',
  },
  medium: {
    color: 'text-blue-400',
    background: 'bg-blue-50',
  },
  high: {
    color: 'text-green-400',
    background: 'bg-green-50',
  },
}

const TaskCard = ({
  title,
  description,
  image,
  priority,
  timestamp,
}: TaskProps) => {
  return (
    <article className="p-4">
      <p className="font-inter text-xs font-medium leading-[150%] xl:leading-6">
        <span
          className={`rounded px-2 uppercase ${taskPriority[priority].color} ${taskPriority[priority].background}`}
        >
          {priority}
        </span>
      </p>
      <section className="py-4">
        <section className="mb-2 flex gap-4">
          <h4 className="flex-1 font-sf-pro-text text-base font-medium leading-[150%] text-gray-700">
            {title}
          </h4>
          <button onClick={() => {}}>
            <Image src={dotIcon} alt="Dot icon" />
          </button>
        </section>
        {image && (
          <Image
            src={image}
            className="h-[125px] w-full rounded object-cover"
            alt={`Image of ${title} task`}
          />
        )}
        {description && (
          <p className="mt-2 font-inter text-sm font-normal leading-[150%] text-gray-500">
            {description}
          </p>
        )}
      </section>
      <section className="flex items-center gap-x-2">
        <Flag />
        <section className="flex flex-1 items-center justify-between">
          <p className="font-inter text-xs font-medium text-gray-300">
            {getFormatedDate(timestamp)}
          </p>
          <p className="font-inter text-xs font-medium text-gray-300">
            {getTimeFormat(timestamp)}
          </p>
        </section>
      </section>
    </article>
  )
}

export default TaskCard
