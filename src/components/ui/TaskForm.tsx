'use client'

import { KeyboardEvent, useEffect, useState } from 'react'
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
import { notify } from '@/lib/notification'
import { getUpdatedTime } from '@/utils/handlers'

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
import { SpinnerLoader } from './Loaders'

const priorities: PriorityOptions[] = [
  { label: 'High', value: 'high' },
  { label: 'Medium', value: 'medium' },
  { label: 'Low', value: 'low' },
]

export const preventDatepickerManualInput = (e: KeyboardEvent) => {
  e.preventDefault()
}

const PrioritySelect = ({
  label,
  onSelect,
  value,
}: {
  label: string
  value: TaskPriority
  onSelect: (value: TaskPriority) => void
}) => {
  return (
    <section>
      <label className="mb-[6px] inline-block text-sm font-medium text-gray-700">
        {label}
      </label>
      <Select
        defaultValue={value}
        onValueChange={(value: TaskPriority) => {
          onSelect(value)
        }}
      >
        <SelectTrigger className="w-full rounded-xl px-2 py-3 text-base leading-[150%] text-gray-300 sm:px-3.5">
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
                // onPointerDown={(e) => e.stopPropagation()}
                className="text-xs font-medium"
                style={{
                  backgroundColor: option.background,
                  color: option.color,
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

  const {
    image,
    progress,
    updateImg,
    getInputProps,
    getRootProps,
    deleteUploadedImg,
  } = useFileUpload()
  const [addTask, { isLoading: addingTask }] = useAddTaskMutation()
  const [updateTask, { isLoading: updatingTask }] = useUpdateTaskMutation()

  useEffect(() => {
    if (defaultData?.image && defaultData.image.url?.includes('https')) {
      updateImg({ ...defaultData.image })
    }
  }, [defaultData?.image, updateImg])

  const handlePrioritySelect = (value: TaskPriority) => {
    setPriority(value)
  }

  const onSubmit: SubmitHandler<TaskFormType> = (data) => {
    const taskData: Task = {
      title: data.taskName,
      description: data.taskDesc,
      image:
        image ||
        (defaultData?.image?.url?.includes('https') ? defaultData?.image : {}),
      priority: priority,
      status: defaultData?.status || status || 'pending',
      timestamp: date?.toString(),
    }

    if (!date) {
      notify('Date should not be empty', 'error')
      return
    } else if (date.getTime() < new Date().getTime()) {
      notify('Please enter a valid date and time', 'error')
      return
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
      <PrioritySelect
        label="Priority"
        value={priority}
        onSelect={handlePrioritySelect}
      />
      <section>
        <label
          htmlFor="taskImg"
          className="mb-[6px] inline-block text-sm font-medium text-gray-700"
        >
          <span>Upload cover</span>{' '}
          <span className="text-gray-300">(Optional)</span>
        </label>
        <section className="">
          {progress || (image?.url && image?.url?.includes('https')) ? (
            <PreviewZone
              id={image?.id}
              size={image?.size}
              name={image?.name}
              url={image?.url}
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
          onChange={(selectedDate) => {
            if (selectedDate) {
              setDate(selectedDate)
            }
          }}
          onKeyDown={preventDatepickerManualInput}
          icon={<Image src={calendarIcon} alt="Calendar icon" />}
        />{' '}
        <DateTime
          type="time"
          label="Time"
          placeholderText="Due time"
          minTime={new Date(getUpdatedTime(date || new Date()))}
          maxTime={new Date(new Date(date || new Date()).setHours(23, 45))}
          selected={date}
          onChange={(time) => {
            if (time) {
              setDate(time)
            }
          }}
          onKeyDown={preventDatepickerManualInput}
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
