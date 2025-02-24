import { useEffect, useState } from 'react'

import { useGetTasksQuery, useRemoveTaskMutation } from '@/redux/slice/task'

import { useAppSelector } from './redux'

export default function useTask() {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const { data, isLoading } = useGetTasksQuery('')
  const [removeTask] = useRemoveTaskMutation()

  const filterActions = useAppSelector((state) => state.actions)

  useEffect(() => {
    if (data) {
      setFilteredTasks(data)
    }
  }, [data])

  useEffect(() => {
    let filtered: Task[] = []

    if (filterActions.date && data) {
      filtered = data.filter((task) =>
        task.timestamp
          ? new Date(task.timestamp).toDateString() ===
            new Date(filterActions.date).toDateString()
          : false
      )
    }

    if (filterActions.search && data) {
      filtered = data.filter(
        (task) =>
          task.title
            .toLowerCase()
            .includes(filterActions.search.toLowerCase()) ||
          task.description
            ?.toLowerCase()
            ?.includes(filterActions.search.toLowerCase())
      )
    }

    setFilteredTasks(filtered)
  }, [data, filterActions.date, filterActions.search])

  const handleFilter = (type: 'date' | 'search', value: string) => {
    let filtered: Task[] = []

    if (type === 'date' && data) {
      filtered = data.filter((task) =>
        task.timestamp
          ? new Date(task.timestamp).toDateString() ===
            new Date(value).toDateString()
          : false
      )
    } else if (type === 'search' && data) {
      filtered = data.filter(
        (task) =>
          task.title.includes(value) || task.description?.includes(value)
      )
    }

    setFilteredTasks(filtered)
  }

  const handleTaskDelete = (id: string) => {
    removeTask(id)
  }

  const pending = filteredTasks?.filter((task) => task.status === 'pending')
  const progress = filteredTasks?.filter((task) => task.status === 'progress')
  const completed = filteredTasks?.filter((task) => task.status === 'completed')

  return {
    tasks: { pending, progress, completed },
    isLoading,
    handleFilter,
    handleTaskDelete,
  }
}
