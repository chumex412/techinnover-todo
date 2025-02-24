import { getTimeFormat } from './format'

const checkIsTaskDue = (date: Timestamp) => {
  return new Date().getTime() > new Date(date).getTime()
}

export const checkIsTaskCompleted = (
  status: TaskStatus,
  timestamp?: Timestamp
) => {
  return timestamp &&
    ((status === 'pending' && checkIsTaskDue(timestamp)) ||
      (status === 'progress' && checkIsTaskDue(timestamp)))
    ? '#F76659'
    : status === 'completed'
      ? '#4F9C20'
      : '#6E7C87'
}

export const getUpdatedTime = (date: Timestamp) => {
  const newDate = new Date(date)
  const hourMins = getTimeFormat(
    newDate.setHours(newDate.getHours()),
    'en-GB',
    false
  ).split(':')

  const updtdStartTime =
    newDate.getDate() === new Date().getDate()
      ? new Date()
      : newDate.getDate() > new Date().getDate()
        ? new Date(newDate.setHours(0, 0))
        : new Date(newDate.setHours(Number(hourMins[0]), Number(hourMins[1])))

  return updtdStartTime
}
