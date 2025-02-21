declare global {
  type Timestamp = string | number | Date
  type TaskStatus = 'pending' | 'progress' | 'completed'
}

export interface Task {
  id?: string
  title: string
  description?: string
  status: TaskStatus
  image?: string
  priority: 'low' | 'medium' | 'high'
  timestamp: Timestamp
}
