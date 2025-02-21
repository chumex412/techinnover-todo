export interface HeaderProps {
  onSearch: VoidFunction
}

export interface TaskContentProps<T> {
  title: string
  list: T[]
}
