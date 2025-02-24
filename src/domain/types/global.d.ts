export {}

declare global {
  type Timestamp = string | number | Date
  type TaskStatus = 'pending' | 'progress' | 'completed'
  type TaskPriority = 'low' | 'medium' | 'high'

  interface Task {
    id?: string
    title: string
    description?: string
    status: TaskStatus
    image?: {
      id?: string
      name?: string
      url?: string
      size?: string
    }
    priority: TaskPriority
    timestamp?: Timestamp
  }

  interface NetworkResponse<T> {
    data?: T
    success?: boolean
    error?: string
    message?: string
  }
}
