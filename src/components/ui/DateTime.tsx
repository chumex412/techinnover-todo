'use client'

import { memo } from 'react'
import DatePicker, { DatePickerProps } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type DateTimePickerProps = {
  type?: 'date' | 'time' | 'date-time'
  label: string
} & DatePickerProps

const DateTime = memo(function DateTime({
  type = 'date',
  label,
  ...props
}: DateTimePickerProps) {
  if (type === 'date-time' || type === 'time') {
    props.showTimeSelect = true
    props.timeIntervals = 15
    props.timeFormat = 'HH:mm'
    props.timeClassName = () => 'date-time'
  }

  if (type === 'time') {
    props.showTimeSelectOnly = true
    props.timeCaption = 'Time'
    props.dateFormat = 'h:mm aa'
  }

  return (
    <div>
      <label className="mb-[6px] text-sm font-medium text-gray-700">
        {label}
      </label>
      <DatePicker
        className="tt-date-picker relative z-10 w-full cursor-pointer rounded-xl border border-gray-100 bg-transparent px-3.5 py-3 text-base leading-[150%] text-gray-500 placeholder:text-gray-300"
        calendarIconClassName="tt-date-picker-icon"
        showIcon
        {...props}
      />
    </div>
  )
})

export default DateTime
