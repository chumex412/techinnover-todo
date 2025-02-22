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
    image?: string
    priority: TaskPriority
    timestamp?: Timestamp
  }
}
