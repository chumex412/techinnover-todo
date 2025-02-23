export interface TaskContentProps<T> {
  title: string
  list: T[]
  status: TaskStatus
  onEdit?: (id: string, status: TaskStatus) => void
}

export interface ModalProps<T> {
  title: string
  trigger?: T
  children: T
  isOpen?: boolean
  onOpen?: VoidFunction
}

export interface InputProps<S, T, U> {
  name: string
  multiline?: boolean
  className?: string
  placeholder?: string
  error?: string
  errors?: S
  validate?: T
  label?: U
}

export interface PickerWithIconProps<T> {
  className?: string
  value?: string
  icon: T
  onClick?: VoidFunction
}

export interface PriorityOptions {
  label: string
  value: TaskPriority
}

export interface TaskFormProps {
  defaultData?: Task
  btnLabel: string
  endpoint: string
  status?: TaskStatus
  onSubmitData?: (data: Task) => void
}
