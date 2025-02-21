import Content from '@/components/ui/TaskContainer'
import { Header } from '@/components/ui/Header'
import { Sidebar } from '@/components/ui/Sidebar'
import { Task } from '@/domain/entities/global'

const todoList: Task[] = [
  {
    title: 'Start washing',
    priority: 'low',
    status: 'pending',
    timestamp: new Date(),
  },
]
let progressList: Task[] = []
let completedList: Task[] = []

export default function Home() {
  const searchHandler = async () => {
    'use server'
  }

  return (
    <div className="flex">
      <Sidebar />
      <section className="flex-1 px-4 lg:px-5 xl:px-8">
        <Header onSearch={searchHandler} />
        <Content pending={todoList} progress={[]} completed={[]} />
      </section>
    </div>
  )
}
