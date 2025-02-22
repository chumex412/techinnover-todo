'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'

import { taskPriority } from '@/utils/constants'
import { PriorityOptions, TaskFormProps } from '@/domain/types/types-ui'
import { taskFormSchema, TaskFormType } from '@/domain/model/ui'

import calendarIcon from '../../../public/icons/calendar.svg'
import timerIcon from '../../../public/icons/timer.svg'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './select'
import Input from './Input'
import DateTime from './DateTime'

const priorities: PriorityOptions[] = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

const PrioritySelect = ({
  label,
  onSelect,
}: {
  label: string
  onSelect: (value: TaskPriority) => void
}) => {
  const [value, setValue] = useState<TaskPriority>('low')

  return (
    <section>
      <label className="mb-[6px] text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select defaultValue={value}>
        <SelectTrigger className="w-full rounded-xl px-3.5 py-3 text-base leading-[150%] text-gray-300">
          <SelectValue
            style={{
              backgroundColor: taskPriority[value].background,
              color: taskPriority[value].color,
            }}
            placeholder="Select the priority of the task"
          />
        </SelectTrigger>
        <SelectContent className="w-[189px]" align="end">
          {priorities.map((priority) => {
            const option = taskPriority[priority.value]

            return (
              <SelectItem
                key={priority.label}
                className="text-xs font-medium"
                style={{
                  backgroundColor: option.background,
                  color: option.color,
                }}
                onClick={() => {
                  setValue(priority.value)
                  onSelect(priority.value)
                }}
                value={priority.value}
              >
                {priority.label}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>
    </section>
  )
}

const TaskForm = ({
  defaultData,
  btnLabel,
  status,
  endpoint,
  // onSubmitData,
}: TaskFormProps) => {
  const [image, setImage] = useState('')
  const [priority, setPriority] = useState<TaskPriority>('low')
  const [date, setDate] = useState<Date | undefined>(
    defaultData?.timestamp ? new Date(defaultData.timestamp) : undefined
  )
  const [time, setTime] = useState<Date | undefined>(
    defaultData?.timestamp ? new Date(defaultData.timestamp) : undefined
  )
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TaskFormType>({
    resolver: yupResolver(taskFormSchema),
    defaultValues: {
      taskName: defaultData?.title,
      taskDesc: defaultData?.description,
    },
  })

  const handlePrioritySelect = (value: TaskPriority) => {
    setPriority(value)
  }

  const handleDate = (selectedDate: Date | null) => {
    if (selectedDate) setDate(selectedDate)
  }

  const handleTime = (time: Date | null) => {
    if (time) setTime(time)
  }

  const onSubmit: SubmitHandler<TaskFormType> = (data) => {
    const taskData: Task = {
      title: data.taskName,
      description: data.taskDesc,
      image,
      priority: priority || 'low',
      status: defaultData?.status || status || 'pending',
    }
    // onSubmitData && onSubmitData()
  }

  return (
    <form className="flex flex-col gap-y-5">
      <Input
        label="Task Name"
        name="taskName"
        placeholder="Enter task name"
        errors={errors}
        validate={{ ...register('taskName') }}
      />
      <Input
        label={
          <>
            <span>Description</span>{' '}
            <span className="text-gray-300">(Optional)</span>
          </>
        }
        name="taskDesc"
        placeholder="Write more on the task..."
        multiline
        validate={{ ...register('taskDesc') }}
        errors={errors}
      />
      <PrioritySelect label="Priority" onSelect={handlePrioritySelect} />
      <section className="flex items-center gap-x-4">
        <DateTime
          type="date"
          label="Deadline"
          placeholderText="Due date"
          minDate={new Date()}
          value={date?.toString()}
          onChange={handleDate}
          icon={<Image src={calendarIcon} alt="Calendar icon" />}
        />{' '}
        <DateTime
          type="time"
          label="Time"
          placeholderText="Due time"
          minTime={new Date()}
          maxTime={new Date(new Date().setHours(23, 45))}
          value={time?.toString()}
          onChange={handleTime}
          icon={<Image src={timerIcon} alt="Timer icon" />}
        />
      </section>
      <button
        type="submit"
        className="w-full rounded-xl bg-primary-500 py-3 text-center font-inter text-base font-medium text-white"
        onClick={handleSubmit(onSubmit)}
      >
        {btnLabel}
      </button>
    </form>
  )
}

export default TaskForm
