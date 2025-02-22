'use client'

import Image from 'next/image'
import { getFormatedDate, getTimeFormat } from '@/utils/format'
import { taskPriority } from '@/utils/constants'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import Flag from '../icons/Flag'
import dotIcon from '../../../public/icons/dots.svg'

interface TaskProps extends Task {
  onEdit: VoidFunction
}

const TaskCard = ({
  title,
  description,
  image,
  priority,
  timestamp,
  onEdit,
}: TaskProps) => {
  return (
    <article className="p-4">
      <p className="font-inter text-xs font-medium leading-[150%] xl:leading-6">
        <span
          className="rounded p-2 uppercase"
          style={{
            backgroundColor: taskPriority[priority].background,
            color: taskPriority[priority].color,
          }}
        >
          {priority}
        </span>
      </p>
      <section className="py-4">
        <section className="mb-2 flex gap-4">
          <h4 className="flex-1 font-sf-pro-text text-base font-medium leading-[150%] text-gray-700">
            {title}
          </h4>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-md border border-gray-100 px-2 shadow-md">
              <Image src={dotIcon} alt="Three dots icon" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={onEdit}>
                <span className="font-inter text-xs font-normal text-gray-700">
                  Edit
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="font-inter text-xs font-normal text-red-400">
                  Delete
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          <p className="font-inter text-xs font-medium text-gray-400">
            {getFormatedDate(timestamp)}
          </p>
          <p className="font-inter text-xs font-medium text-gray-400">
            {getTimeFormat(timestamp)}
          </p>
        </section>
      </section>
    </article>
  )
}

export default TaskCard
