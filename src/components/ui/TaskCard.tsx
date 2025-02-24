'use client'

import Image from 'next/image'
import { memo } from 'react'

import { Draggable } from '@/lib/drag-n-drop/Draggable'
import { getFormatedDate, getTimeFormat } from '@/utils/format'
import { taskPriority } from '@/utils/constants'
import { checkIsTaskCompleted } from '@/utils/handlers'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu'
import Flag from '../icons/Flag'
import dotIcon from '../../../public/icons/dots.svg'

interface TaskProps extends Task {
  onEdit: (id: string, status: TaskStatus) => void
  onDelete: (id: string) => void
}

const TaskCard = memo(function Card({
  id,
  status,
  title,
  description,
  image,
  priority,
  timestamp,
  onEdit,
  onDelete,
}: TaskProps) {
  return (
    <Draggable id={id || ''}>
      <article className="rounded-md bg-white p-4 shadow-sm">
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
              <DropdownMenuTrigger className="flex w-6 items-center justify-center rounded-md border border-gray-100 shadow-md transition-shadow duration-300 hover:shadow-sm">
                <Image
                  src={dotIcon}
                  className="h-4 w-4"
                  alt="Three dots icon"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onPointerDown={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                  asChild
                >
                  <button
                    onClick={() => {
                      onEdit(id || '', status)
                    }}
                    className="flex w-full font-inter text-xs font-normal text-gray-700"
                  >
                    Edit
                  </button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onPointerDown={(e) => e.stopPropagation()}
                  className="cursor-pointer"
                  asChild
                >
                  <button
                    onClick={() => onDelete(id || '')}
                    className="flex w-full font-inter text-xs font-normal text-red-400"
                  >
                    Delete
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </section>
          {image?.url && image?.url?.includes('https') && (
            <Image
              src={image.url}
              width={304}
              height={125}
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
          <Flag fill={checkIsTaskCompleted(status, timestamp)} />
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
    </Draggable>
  )
})

export default TaskCard
