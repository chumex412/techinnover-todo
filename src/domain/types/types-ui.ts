export interface TaskContentProps<T> {
  title: string
  list: T[]
  status: TaskStatus
  activeOnSD: boolean
  onEdit?: (id: string, status: TaskStatus) => void
  onDelete?: (id: string) => void
}

export interface ModalProps<T> {
  title: string
  trigger?: T
  children: T
  isOpen?: boolean
  onOpen?: (value: boolean) => void
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
  onClose?: VoidFunction
}

export interface FileAdditionProps {
  name: string
  onPreviewImg: (img: ImgData) => void
}

export interface ImgData {
  id?: string
  name?: string
  url?: string
  size?: string
}

export interface PreviewProps extends ImgData {
  defaultUrl?: string
  progress: number
  onDelete: (id: string) => void
}
