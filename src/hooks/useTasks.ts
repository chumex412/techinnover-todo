import { useCallback, useEffect, useMemo, useState } from 'react'

import { useGetTasksQuery, useUpdateTaskMutation } from '@/redux/slice/task'

import { useAppSelector } from './redux'

export default function useTask() {
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([])
  const { data, isLoading } = useGetTasksQuery('')
  const [updateTask] = useUpdateTaskMutation()

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

  const updateFilteredTasks = useCallback((newTasks: Task[]) => {
    setFilteredTasks(newTasks)
  }, [])

  const handleFilter = useCallback(
    (type: 'date' | 'search', value: string) => {
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
    },
    [data]
  )

  return useMemo(
    () => ({
      originalTasks: data,
      filteredTasks,
      isLoading,
      handleFilter,
      updateTask,
      updateFilteredTasks,
    }),
    [
      data,
      filteredTasks,
      isLoading,
      handleFilter,
      updateTask,
      updateFilteredTasks,
    ]
  )
}
