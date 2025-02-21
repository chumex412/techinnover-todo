import { DateFormatOptions } from '@/domain/model/utils'

export const getFormatedDate = (
  date: Date | string | number | undefined,
  countCode: 'en-NG' | 'en-GB' | 'en-US' = 'en-NG'
) => {
  if (typeof date === 'string' || typeof date === 'number')
    date = new Date(date)

  if (typeof date === 'undefined') date = new Date()

  return new Intl.DateTimeFormat(
    countCode,
    new DateFormatOptions('2-digit', 'short', 'numeric').useFormat()
  ).format(date)
}

export const getTimeFormat = (
  date: Date | string | number | undefined,
  countCode: 'en-NG' | 'en-GB' | 'en-US' = 'en-NG',
  is12HourType: boolean = true
) => {
  if (typeof date === 'string' || typeof date === 'number')
    date = new Date(date)

  if (typeof date === 'undefined') date = new Date()

  return date.toLocaleTimeString(countCode, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: is12HourType,
  })
}
