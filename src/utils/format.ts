import { DateFormatOptions } from '@/domain/model/utils'

export const getFormatedDate = (
  date: Date | string | number | undefined,
  countCode: 'en-NG' | 'en-GB' | 'en-US' = 'en-NG'
) => {
  if (typeof date === 'string' || typeof date === 'number')
    date = new Date(date)

  if (typeof date === 'undefined') {
    return ''
  }

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

  if (typeof date === 'undefined') {
    return ''
  }

  return date.toLocaleTimeString(countCode, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: is12HourType,
  })
}

export const getUpdatedTime = (date: Date, time: Date) => {
  const hourMins = getTimeFormat(
    date && date.getDate() === new Date().getDate()
      ? date.setHours(new Date().getHours())
      : new Date(),
    'en-GB',
    false
  ).split(':')

  const updtdStartTime =
    date.getDate() > new Date().getDate()
      ? time.setHours(0, 0)
      : time.setHours(Number(hourMins[0]), Number(hourMins[1]))

  return updtdStartTime
}