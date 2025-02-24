'use client'

import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'

import { taskPriority } from '@/utils/constants'
import {
  type PriorityOptions,
  type TaskFormProps,
} from '@/domain/types/types-ui'
import { taskFormSchema, TaskFormType } from '@/domain/model/ui'
import useFileUpload from '@/hooks/useFileUpload'
import { useAddTaskMutation, useUpdateTaskMutation } from '@/redux/slice/task'

import PreviewZone from './PreviewZone'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './SelectC'
import Input from './Input'
import DateTime from './DateTime'
import uploadIcon from '../../../public/icons/upload.svg'
import calendarIcon from '../../../public/icons/calendar.svg'
import timerIcon from '../../../public/icons/timer.svg'
import { getUpdatedTime } from '@/utils/format'
import { SpinnerLoader } from './Loaders'
import { notify } from '@/lib/notification'

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
      <label className="mb-[6px] inline-block text-sm font-medium text-gray-700">
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
  onClose,
}: TaskFormProps) => {
  const [priority, setPriority] = useState<TaskPriority>(
    defaultData?.priority || 'low'
  )
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

  const { image, progress, getInputProps, getRootProps, deleteUploadedImg } =
    useFileUpload()
  const [addTask, { isLoading: addingTask }] = useAddTaskMutation()
  const [updateTask, { isLoading: updatingTask }] = useUpdateTaskMutation()

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
      image: image?.url || defaultData?.image || '',
      priority: priority,
      status: defaultData?.status || status || 'pending',
      timestamp: time,
    }

    if (!date && !time) {
      notify('Please enter a valid date and time', 'error')
    }

    let error = ''

    if (endpoint.includes('edit') && defaultData?.id) {
      updateTask({ task: taskData, id: defaultData?.id })
        .unwrap()
        .then((response) => {
          if (response) {
            onClose?.()
          }
        })
        .catch(() => {
          error = 'Failed to update task'
        })
        .finally(() => {
          notify(
            error ? error : 'Successfully updated the selected tasks',
            error ? 'error' : 'success'
          )
        })
    } else {
      addTask(taskData)
        .unwrap()
        .then((response) => {
          if (response) {
            onClose?.()
          }
        })
        .catch(() => {
          error = 'Failed to add task'
        })
        .finally(() => {
          notify(
            error ? error : 'Successfully added a task',
            error ? 'error' : 'success'
          )
        })
    }
  }

  const loading = addingTask || updatingTask

  return (
    <form className="flex flex-col gap-y-5" onSubmit={handleSubmit(onSubmit)}>
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
      <section>
        <label
          htmlFor="taskImg"
          className="mb-[6px] inline-block text-sm font-medium text-gray-700"
        >
          <span>Upload cover</span>{' '}
          <span className="text-gray-300">(Optional)</span>
        </label>
        <section className="">
          {progress || image || defaultData?.image ? (
            <PreviewZone
              {...image}
              defaultUrl={defaultData?.image}
              progress={progress}
              onDelete={deleteUploadedImg}
            />
          ) : (
            <section className="drop-container flex h-32 max-w-80 cursor-pointer items-center justify-center rounded-lg border border-gray-200 p-4">
              <div {...getRootProps({ className: 'dropzone' })}>
                <Image src={uploadIcon} className="mx-auto" alt="Upload Icon" />
                <input {...getInputProps()} />
                <p className="font-inter text-sm font-normal leading-[150%] text-gray-400">
                  <span className="text-primary-500">Click to upload</span> or
                  drag and drop
                </p>
              </div>
            </section>
          )}
        </section>
      </section>
      <section className="relative flex items-center gap-x-4">
        <DateTime
          type="date"
          label="Deadline"
          placeholderText="Due date"
          minDate={new Date()}
          selected={date}
          onChange={handleDate}
          icon={<Image src={calendarIcon} alt="Calendar icon" />}
        />{' '}
        <DateTime
          type="time"
          label="Time"
          placeholderText="Due time"
          minTime={
            new Date(getUpdatedTime(date || new Date(), time || new Date()))
          }
          maxTime={new Date(new Date(date || new Date()).setHours(23, 45))}
          selected={time}
          onChange={handleTime}
          icon={<Image src={timerIcon} alt="Timer icon" />}
        />
      </section>
      <button
        type="submit"
        className="mb-2.5 mt-6 w-full rounded-xl bg-primary-500 py-2.5 text-center font-inter text-base font-medium text-white"
        disabled={loading}
      >
        {loading ? <SpinnerLoader /> : btnLabel}
      </button>
    </form>
  )
}

export default TaskForm
