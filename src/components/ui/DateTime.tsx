'use client'

import { memo } from 'react'
import DatePicker, { type DatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import '@/styles/ui.css'

type DateTimePickerProps = {
  type?: 'date' | 'time' | 'date-time'
  label: string
} & DatePickerProps

const DateTime = memo(function DateTime({
  type = 'date',
  label,
  ...props
}: DateTimePickerProps) {
  const dateProps: DatePickerProps = { ...props }

  if (type === 'time') {
    dateProps.showTimeSelectOnly = true
    dateProps.timeCaption = 'Time'
    dateProps.dateFormat = 'h:mm aa'
    dateProps.showTimeSelect = true
    dateProps.timeIntervals = 15
    dateProps.timeFormat = 'HH:mm'
    dateProps.timeClassName = () => 'date-time'
  } else {
    dateProps.dateFormat = 'MMMM d, yyyy'
    dateProps.showTimeInput = false
  }

  return (
    <div>
      <label className="mb-[6px] inline-block text-sm font-medium text-gray-700">
        {label}
      </label>
      <DatePicker
        className="tt-date-picker relative z-50 w-full cursor-pointer rounded-xl border border-gray-100 bg-transparent px-2 py-3 text-base leading-[150%] text-gray-500 placeholder:text-gray-300 sm:px-3.5"
        calendarIconClassName="tt-date-picker-icon"
        showIcon
        {...dateProps}
      />
    </div>
  )
})

export default DateTime
